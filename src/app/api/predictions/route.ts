import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { infer1x2 } from "@/lib/scoring";

function validateGoals(v: unknown): number | null {
  if (typeof v !== "number") return null;
  if (!Number.isInteger(v) || v < 0 || v > 20) return null;
  return v;
}

export async function POST(req: NextRequest) {
  const { token, predictions } = await req.json();

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

  // Check for existing predictions on open matches (prevent double-submit)
  if (openMatchIds.size > 0) {
    const { count } = await supabase
      .from("predictions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("match_id", [...openMatchIds]);

    if ((count ?? 0) > 0) {
      return NextResponse.json({ error: "Já submeteste as tuas previsões." }, { status: 409 });
    }
  }

  const rows = [];
  for (const p of predictions) {
    if (!openMatchIds.has(p.match_id)) continue;

    const home = validateGoals(p.home_goals);
    const away = validateGoals(p.away_goals);
    if (home === null || away === null) continue;

    rows.push({
      user_id: user.id,
      match_id: p.match_id,
      prediction_1x2: infer1x2(home, away),
      home_goals: home,
      away_goals: away,
      points_earned: 0,
    });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: "Sem jogos válidos para submeter." }, { status: 400 });
  }

  const { error } = await supabase.from("predictions").insert(rows);

  if (error) {
    return NextResponse.json({ error: "Erro ao guardar previsões." }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: rows.length });
}
