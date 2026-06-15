import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { calculatePoints, infer1x2 } from "@/lib/scoring";
import { Match, Prediction } from "@/types";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { match_id, home_score, away_score } = await req.json();

  if (!match_id || home_score === undefined || away_score === undefined) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (
    !Number.isInteger(home_score) || !Number.isInteger(away_score) ||
    home_score < 0 || away_score < 0 || home_score > 20 || away_score > 20
  ) {
    return NextResponse.json({ error: "Resultado inválido." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .update({ home_score, away_score, status: "finished" })
    .eq("id", match_id)
    .select()
    .single();

  if (matchError || !match) {
    return NextResponse.json({ error: "Erro ao atualizar jogo." }, { status: 500 });
  }

  // Recalculate points for all predictions on this match
  const { data: preds } = await supabase
    .from("predictions")
    .select("*")
    .eq("match_id", match_id);

  for (const pred of preds ?? []) {
    const pts = calculatePoints(match as Match, pred as Prediction);
    await supabase.from("predictions").update({ points_earned: pts }).eq("id", pred.id);
  }

  return NextResponse.json({ success: true, match });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { top_scorer_result, tournament_winner_result } = await req.json();
  const supabase = createAdminClient();

  if (top_scorer_result !== undefined) {
    await supabase.from("settings")
      .update({ value: top_scorer_result, updated_at: new Date().toISOString() })
      .eq("key", "top_scorer_result");

    // Reset first to avoid double-awarding
    await supabase.from("global_predictions").update({ top_scorer_points: 0 });

    if (top_scorer_result) {
      const { data: correct } = await supabase
        .from("global_predictions").select("id").ilike("top_scorer", top_scorer_result);
      for (const gp of correct ?? []) {
        await supabase.from("global_predictions").update({ top_scorer_points: 15 }).eq("id", gp.id);
      }
    }
  }

  if (tournament_winner_result !== undefined) {
    await supabase.from("settings")
      .update({ value: tournament_winner_result, updated_at: new Date().toISOString() })
      .eq("key", "tournament_winner_result");

    await supabase.from("global_predictions").update({ tournament_winner_points: 0 });

    if (tournament_winner_result) {
      const { data: correct } = await supabase
        .from("global_predictions").select("id").ilike("tournament_winner", tournament_winner_result);
      for (const gp of correct ?? []) {
        await supabase.from("global_predictions").update({ tournament_winner_points: 10 }).eq("id", gp.id);
      }
    }
  }

  return NextResponse.json({ success: true });
}
