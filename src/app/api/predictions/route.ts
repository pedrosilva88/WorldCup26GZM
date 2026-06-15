import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { infer1x2, calculatePoints } from "@/lib/scoring";
import { Match, Prediction } from "@/types";

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

  // Get open group stage matches
  const { data: openMatches } = await supabase
    .from("matches")
    .select("id")
    .eq("phase", "group")
    .neq("status", "finished")
    .neq("status", "live");

  const openMatchIds = new Set((openMatches ?? []).map((m) => m.id));

  // Only accept predictions for open matches that this user doesn't already have
  const submittedIds = predictions.map((p: { match_id: string }) => p.match_id).filter((id: string) => openMatchIds.has(id));
  if (submittedIds.length > 0) {
    const { count } = await supabase
      .from("predictions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("match_id", submittedIds);

    if ((count ?? 0) > 0) {
      return NextResponse.json({ error: "Já submeteste as tuas previsões." }, { status: 409 });
    }
  }

  const VALID_1X2 = new Set(["1", "x", "2"]);

  const rows = [];
  for (const p of predictions) {
    if (!openMatchIds.has(p.match_id)) continue;

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
    return NextResponse.json({ error: "Sem jogos válidos para submeter." }, { status: 400 });
  }

  const { data: inserted, error } = await supabase.from("predictions").insert(rows).select();

  if (error) {
    return NextResponse.json({ error: "Erro ao guardar previsões." }, { status: 500 });
  }

  // Recalculate points for predictions whose match is already finished
  const insertedMatchIds = (inserted ?? []).map((p) => p.match_id);
  if (insertedMatchIds.length > 0) {
    const { data: finishedMatches } = await supabase
      .from("matches")
      .select("*")
      .in("id", insertedMatchIds)
      .eq("status", "finished");

    for (const match of finishedMatches ?? []) {
      const predsForMatch = (inserted ?? []).filter((p) => p.match_id === match.id);
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
