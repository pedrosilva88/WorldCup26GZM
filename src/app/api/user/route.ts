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

  // Check if predictions already submitted
  const { count } = await supabase
    .from("predictions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return NextResponse.json({ user, has_predictions: (count ?? 0) > 0 });
}
