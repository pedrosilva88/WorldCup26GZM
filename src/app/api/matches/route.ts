import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("match_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erro ao carregar jogos." }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
