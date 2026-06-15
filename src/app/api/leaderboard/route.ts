import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("leaderboard")
    .select("*");

  if (error) {
    return NextResponse.json({ error: "Erro ao carregar classificação." }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
