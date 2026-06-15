import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token em falta." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: user } = await supabase
    .from("users")
    .select("id, name, token, created_at")
    .eq("token", token)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Utilizador não encontrado." }, { status: 404 });
  }

  // has_predictions = true only when ALL open group matches have a prediction
  // (allows admin to pre-fill past matches without locking the form for future ones)
  const { data: openMatches } = await supabase
    .from("matches")
    .select("id")
    .eq("phase", "group")
    .neq("status", "finished")
    .neq("status", "live");

  const openIds = (openMatches ?? []).map((m) => m.id);
  let has_predictions = false;

  if (openIds.length === 0) {
    // All group matches finished — check if any predictions exist
    const { count } = await supabase
      .from("predictions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    has_predictions = (count ?? 0) > 0;
  } else {
    const { count } = await supabase
      .from("predictions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("match_id", openIds);
    has_predictions = (count ?? 0) >= openIds.length;
  }

  return NextResponse.json({ user, has_predictions });
}
