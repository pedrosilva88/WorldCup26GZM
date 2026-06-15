import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const { token, predictions } = await req.json();

  if (!token || !predictions || !Array.isArray(predictions)) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Validate token
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("token", token)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  // Check if user already submitted predictions for group stage
  const { count } = await supabase
    .from("predictions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Já submeteste as tuas previsões." }, { status: 409 });
  }

  // Get open (non-finished) group stage matches
  const { data: openMatches } = await supabase
    .from("matches")
    .select("id")
    .eq("phase", "group")
    .neq("status", "finished");

  const openMatchIds = new Set((openMatches ?? []).map((m) => m.id));

  // Only insert predictions for open matches
  const rows = predictions
    .filter((p: { match_id: string }) => openMatchIds.has(p.match_id))
    .map((p: { match_id: string; prediction_1x2: string; home_goals: number; away_goals: number }) => ({
      user_id: user.id,
      match_id: p.match_id,
      prediction_1x2: p.prediction_1x2,
      home_goals: p.home_goals,
      away_goals: p.away_goals,
      points_earned: 0,
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "Sem jogos disponíveis para prever." }, { status: 400 });
  }

  const { error } = await supabase.from("predictions").insert(rows);

  if (error) {
    return NextResponse.json({ error: "Erro ao guardar previsões." }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: rows.length });
}
