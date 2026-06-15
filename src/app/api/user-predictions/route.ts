import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ predictions: [], global: null });

  const supabase = createAdminClient();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("token", token)
    .single();

  if (!user) return NextResponse.json({ predictions: [], global: null });

  const [{ data: predictions }, { data: globalPred }] = await Promise.all([
    supabase
      .from("predictions")
      .select("match_id, home_goals, away_goals, prediction_1x2")
      .eq("user_id", user.id),
    supabase
      .from("global_predictions")
      .select("top_scorer, tournament_winner")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  return NextResponse.json({
    predictions: predictions ?? [],
    global: globalPred ?? null,
  });
}
