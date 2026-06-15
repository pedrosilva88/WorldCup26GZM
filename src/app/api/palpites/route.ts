import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) return NextResponse.json({ predictions: [], global: null, matches: [] });

  const supabase = createAdminClient();

  const [{ data: predictions }, { data: globalPred }, { data: matches }] = await Promise.all([
    supabase
      .from("predictions")
      .select("match_id, home_goals, away_goals, prediction_1x2, points_earned")
      .eq("user_id", userId),
    supabase
      .from("global_predictions")
      .select("top_scorer, tournament_winner")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("matches")
      .select("*")
      .order("match_order"),
  ]);

  return NextResponse.json({
    predictions: predictions ?? [],
    global: globalPred ?? null,
    matches: matches ?? [],
  });
}
