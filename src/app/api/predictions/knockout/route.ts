import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const { token, phase, predictions } = await req.json();

  if (!token || !phase || !Array.isArray(predictions)) {
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

  // Confirm this phase is open
  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "knockout_open_phase")
    .single();

  if (setting?.value !== phase) {
    return NextResponse.json({ error: "Esta fase não está aberta." }, { status: 403 });
  }

  // Get open matches for this phase
  const { data: openMatches } = await supabase
    .from("matches")
    .select("id")
    .eq("phase", phase)
    .neq("status", "finished");

  const openIds = new Set((openMatches ?? []).map((m) => m.id));

  // Check user hasn't already submitted this phase
  const { count } = await supabase
    .from("predictions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .in("match_id", [...openIds]);

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Já submeteste previsões para esta fase." }, { status: 409 });
  }

  const rows = predictions
    .filter((p: { match_id: string }) => openIds.has(p.match_id))
    .map((p: { match_id: string; prediction_1x2: string; home_goals: number; away_goals: number }) => ({
      user_id: user.id,
      match_id: p.match_id,
      prediction_1x2: p.prediction_1x2,
      home_goals: p.home_goals,
      away_goals: p.away_goals,
      points_earned: 0,
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "Sem jogos disponíveis." }, { status: 400 });
  }

  const { error } = await supabase.from("predictions").insert(rows);

  if (error) {
    return NextResponse.json({ error: "Erro ao guardar previsões." }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: rows.length });
}

// GET: user predictions for a knockout phase
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const phase = req.nextUrl.searchParams.get("phase");

  if (!token || !phase) {
    return NextResponse.json({ error: "Parâmetros em falta." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("token", token)
    .single();

  if (!user) return NextResponse.json({ error: "Token inválido." }, { status: 401 });

  const { data: matches } = await supabase
    .from("matches")
    .select("id")
    .eq("phase", phase);

  const matchIds = (matches ?? []).map((m) => m.id);

  if (matchIds.length === 0) return NextResponse.json([]);

  const { data: preds } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", user.id)
    .in("match_id", matchIds);

  return NextResponse.json(preds ?? []);
}
