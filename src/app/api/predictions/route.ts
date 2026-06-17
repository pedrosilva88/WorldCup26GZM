import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { infer1x2, calculatePoints } from "@/lib/scoring";
import { Match, Prediction } from "@/types";

const LOCK_OFFSET_MS = 2 * 60 * 60 * 1000; // 2h before first match of matchday

function validateGoals(v: unknown): number | null {
  if (typeof v !== "number") return null;
  if (!Number.isInteger(v) || v < 0 || v > 20) return null;
  return v;
}

export async function POST(req: NextRequest) {
  const { token, predictions, top_scorer, tournament_winner } = await req.json();

  if (!token || !Array.isArray(predictions)) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("token", token)
    .single();

  if (!user) return NextResponse.json({ error: "Token inválido." }, { status: 401 });

  // Load all group matches with matchday + status
  const { data: allMatches } = await supabase
    .from("matches")
    .select("id, matchday, match_date, status")
    .eq("phase", "group");

  // Compute lock time per matchday
  const earliest: Record<number, number> = {};
  for (const m of allMatches ?? []) {
    if (!m.matchday || !m.match_date) continue;
    const t = new Date(m.match_date).getTime();
    if (!earliest[m.matchday] || t < earliest[m.matchday]) {
      earliest[m.matchday] = t;
    }
  }

  const now = Date.now();
  const isMatchdayLocked = (matchday: number | null) => {
    if (!matchday || !earliest[matchday]) return true;
    return now >= earliest[matchday] - LOCK_OFFSET_MS;
  };

  // Build editable match set: not finished/live, matchday not locked
  const editableMatchIds = new Set(
    (allMatches ?? [])
      .filter((m) => m.status !== "finished" && m.status !== "live" && !isMatchdayLocked(m.matchday))
      .map((m) => m.id)
  );

  const VALID_1X2 = new Set(["1", "x", "2"]);
  const matchById = new Map((allMatches ?? []).map((m) => [m.id, m]));

  const rows = [];
  for (const p of predictions) {
    if (!editableMatchIds.has(p.match_id)) continue;

    const home = validateGoals(p.home_goals);
    const away = validateGoals(p.away_goals);
    if (home === null || away === null) continue;

    const bet1x2 = VALID_1X2.has(p.bet_1x2) ? p.bet_1x2 : infer1x2(home, away);

    rows.push({
      user_id: user.id,
      match_id: p.match_id,
      prediction_1x2: bet1x2,
      home_goals: home,
      away_goals: away,
      points_earned: 0,
    });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: "Sem jogos válidos ou jornada já encerrada." }, { status: 400 });
  }

  // Upsert — allows updating existing predictions for open matchdays
  const { data: upserted, error } = await supabase
    .from("predictions")
    .upsert(rows, { onConflict: "user_id,match_id" })
    .select();

  if (error) {
    return NextResponse.json({ error: "Erro ao guardar previsões." }, { status: 500 });
  }

  // Recalculate points for any already-finished matches (shouldn't happen but just in case)
  const upsertedMatchIds = (upserted ?? []).map((p) => p.match_id);
  if (upsertedMatchIds.length > 0) {
    const { data: finishedMatches } = await supabase
      .from("matches")
      .select("*")
      .in("id", upsertedMatchIds)
      .eq("status", "finished");

    for (const match of finishedMatches ?? []) {
      const predsForMatch = (upserted ?? []).filter((p) => p.match_id === match.id);
      for (const pred of predsForMatch) {
        const pts = calculatePoints(match as Match, pred as Prediction);
        if (pts > 0) {
          await supabase.from("predictions").update({ points_earned: pts }).eq("id", pred.id);
        }
      }
    }
  }

  // Upsert global predictions
  if (typeof top_scorer === "string" && typeof tournament_winner === "string") {
    await supabase.from("global_predictions").upsert(
      { user_id: user.id, top_scorer: top_scorer.trim(), tournament_winner },
      { onConflict: "user_id" }
    );
  }

  return NextResponse.json({ success: true, count: rows.length });
}
