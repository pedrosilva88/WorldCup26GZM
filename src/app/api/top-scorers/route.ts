import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("top_scorers")
    .select("player_name, team_name, goals, photo_url")
    .order("goals", { ascending: false })
    .limit(3);

  if (error) {
    return NextResponse.json({ error: "Erro ao carregar marcadores." }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
