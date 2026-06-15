import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Returns the existing predictions for a user (pre-filled by admin for past matches)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json([]);

  const supabase = createAdminClient();

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("token", token)
    .single();

  if (!user) return NextResponse.json([]);

  const { data } = await supabase
    .from("predictions")
    .select("match_id, home_goals, away_goals, prediction_1x2")
    .eq("user_id", user.id);

  return NextResponse.json(data ?? []);
}
