import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { calculatePoints } from "@/lib/utils";
import { Match, Prediction } from "@/types";

const WC_2026_ID = 2000; // football-data.org competition ID for FIFA World Cup 2026

async function syncFromApi() {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) return { synced: 0, error: "API key não configurada." };

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${WC_2026_ID}/matches?status=FINISHED`,
    { headers: { "X-Auth-Token": apiKey }, next: { revalidate: 0 } }
  );

  if (!res.ok) return { synced: 0, error: `API error: ${res.status}` };

  const json = await res.json();
  const apiMatches = json.matches ?? [];

  const supabase = createAdminClient();
  let synced = 0;

  for (const apiMatch of apiMatches) {
    const homeScore = apiMatch.score?.fullTime?.home;
    const awayScore = apiMatch.score?.fullTime?.away;

    if (homeScore === null || awayScore === null) continue;

    // Find match by API ID or by team names
    const { data: match } = await supabase
      .from("matches")
      .select("*")
      .or(`api_match_id.eq.${apiMatch.id}`)
      .neq("status", "finished")
      .single();

    if (!match) continue;

    await supabase
      .from("matches")
      .update({ home_score: homeScore, away_score: awayScore, status: "finished" })
      .eq("id", match.id);

    // Recalculate points
    const { data: preds } = await supabase
      .from("predictions")
      .select("*")
      .eq("match_id", match.id);

    const updatedMatch: Match = { ...match, home_score: homeScore, away_score: awayScore, status: "finished" };

    for (const pred of preds ?? []) {
      const pts = calculatePoints(updatedMatch, pred as Prediction);
      await supabase.from("predictions").update({ points_earned: pts }).eq("id", pred.id);
    }

    synced++;
  }

  return { synced };
}

export async function POST(req: NextRequest) {
  // Allow both admin UI and cron-job.org webhook (via secret header)
  const cronSecret = req.headers.get("x-cron-secret");
  const isAdmin = await isAdminAuthenticated();
  const isCron = cronSecret === process.env.ADMIN_PASSWORD;

  if (!isAdmin && !isCron) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const result = await syncFromApi();
  return NextResponse.json(result);
}
