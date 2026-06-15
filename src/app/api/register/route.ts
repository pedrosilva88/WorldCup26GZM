import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const { name, top_scorer, tournament_winner } = await req.json();

  if (!name?.trim() || !top_scorer?.trim() || !tournament_winner?.trim()) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Check name uniqueness
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .ilike("name", name.trim())
    .single();

  if (existing) {
    return NextResponse.json({ error: "Este nome já está em uso. Escolhe outro." }, { status: 409 });
  }

  // Create user
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({ name: name.trim() })
    .select("id, token")
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: "Erro ao criar utilizador." }, { status: 500 });
  }

  // Save global predictions
  const { error: gpError } = await supabase.from("global_predictions").insert({
    user_id: user.id,
    top_scorer: top_scorer.trim(),
    tournament_winner: tournament_winner.trim(),
  });

  if (gpError) {
    return NextResponse.json({ error: "Erro ao guardar previsões globais." }, { status: 500 });
  }

  return NextResponse.json({ token: user.token });
}
