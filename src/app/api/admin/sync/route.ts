import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { calculatePoints } from "@/lib/scoring";
import { translateTeam } from "@/lib/football-api";
import { Match, Prediction } from "@/types";

const WC_2026_CODE = "WC";

async function syncFromApi() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) return { synced: 0, error: "API key não configurada." };

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${WC_2026_CODE}/matches?status=FINISHED`,
    { headers: { "X-Auth-Token": apiKey }, next: { revalidate: 0 } }
  );

  if (!res.ok) return { synced: 0, error: `API error: ${res.status}` };

  const json = await res.json();
  const apiMatches = json.matches ?? [];

  const supabase = createAdminClient();
  let synced = 0;
  const errors: string[] = [];

  for (const apiMatch of apiMatches) {
    // Use extraTime score if available (knockout with ET/penalties); fallback to fullTime (group stage or 90-min KO wins)
    const homeScore = apiMatch.score?.extraTime?.home ?? apiMatch.score?.fullTime?.home;
    const awayScore = apiMatch.score?.extraTime?.away ?? apiMatch.score?.fullTime?.away;
    if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) continue;

    // 1. Try to find by api_match_id (no status filter — check below)
    let { data: match } = await supabase
      .from("matches")
      .select("*")
      .eq("api_match_id", apiMatch.id)
      .maybeSingle();

    // Already synced — skip silently
    if (match?.status === "finished") continue;

    // 2. Fall back to Portuguese team name lookup
    if (!match) {
      const homePT = translateTeam(apiMatch.homeTeam.name);
      const awayPT = translateTeam(apiMatch.awayTeam.name);

      const { data: byName } = await supabase
        .from("matches")
        .select("*")
        .eq("home_team", homePT)
        .eq("away_team", awayPT)
        .maybeSingle();

      if (byName?.status === "finished") {
        // Already synced via name; cache api_match_id and skip
        await supabase.from("matches").update({ api_match_id: apiMatch.id }).eq("id", byName.id);
        continue;
      }

      match = byName ?? null;

      if (match) {
        // Cache the api_match_id for future syncs
        await supabase.from("matches")
          .update({ api_match_id: apiMatch.id })
          .eq("id", match.id);
      } else {
        errors.push(`Not found: ${apiMatch.homeTeam.name} (${homePT}) vs ${apiMatch.awayTeam.name} (${awayPT})`);
        continue;
      }
    }

    // Update result (also cache match_date if not yet set)
    const { data: updatedMatch, error: updateErr } = await supabase
      .from("matches")
      .update({
        home_score: homeScore,
        away_score: awayScore,
        status: "finished",
        ...(match.match_date ? {} : { match_date: apiMatch.utcDate }),
      })
      .eq("id", match.id)
      .select()
      .single();

    if (updateErr || !updatedMatch) continue;

    // Recalculate points for all predictions on this match
    const { data: preds } = await supabase
      .from("predictions")
      .select("*")
      .eq("match_id", match.id);

    const fullMatch: Match = { ...updatedMatch, home_score: homeScore, away_score: awayScore, status: "finished" };

    for (const pred of preds ?? []) {
      const pts = calculatePoints(fullMatch, pred as Prediction);
      await supabase.from("predictions").update({ points_earned: pts }).eq("id", pred.id);
    }

    synced++;
  }

  return { synced, errors: errors.length > 0 ? errors : undefined };
}

export async function GET(req: NextRequest) {
  return handleSync(req);
}

export async function POST(req: NextRequest) {
  return handleSync(req);
}

async function handleSync(req: NextRequest) {
  const cronSecret = req.headers.get("x-cron-secret");
  const authHeader = req.headers.get("authorization");
  const isAdmin = await isAdminAuthenticated();
  const isCron =
    cronSecret === process.env.ADMIN_PASSWORD ||
    authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (!isAdmin && !isCron) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const result = await syncFromApi();
  return NextResponse.json(result);
}
