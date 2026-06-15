import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { infer1x2, calculatePoints } from "@/lib/scoring";
import { Match, Prediction } from "@/types";

// Get all predictions for a user (to populate admin UI)
export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) return NextResponse.json({ error: "user_id em falta." }, { status: 400 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("predictions")
    .select("*, matches(phase, group, home_team, away_team, status, home_score, away_score)")
    .eq("user_id", userId);

  return NextResponse.json(data ?? []);
}

// Admin sets predictions for a user (past/locked matches)
// Accepts an array of { match_id, home_goals, away_goals }
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { user_id, predictions } = await req.json();

  if (!user_id || !Array.isArray(predictions)) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Validate user exists
  const { data: user } = await supabase.from("users").select("id").eq("id", user_id).single();
  if (!user) return NextResponse.json({ error: "Utilizador não encontrado." }, { status: 404 });

  let upserted = 0;

  for (const p of predictions) {
    const { match_id, home_goals, away_goals } = p;

    if (
      !match_id ||
      typeof home_goals !== "number" ||
      typeof away_goals !== "number" ||
      home_goals < 0 || home_goals > 20 ||
      away_goals < 0 || away_goals > 20
    ) continue;

    const { data: match } = await supabase
      .from("matches")
      .select("*")
      .eq("id", match_id)
      .single();

    if (!match) continue;

    const prediction_1x2 = infer1x2(home_goals, away_goals);

    const predData = {
      user_id,
      match_id,
      prediction_1x2,
      home_goals,
      away_goals,
      points_earned: calculatePoints(match as Match, {
        home_goals,
        away_goals,
        prediction_1x2,
      } as Prediction),
    };

    // Upsert (insert or update if already exists)
    await supabase
      .from("predictions")
      .upsert(predData, { onConflict: "user_id,match_id" });

    upserted++;
  }

  return NextResponse.json({ success: true, upserted });
}
