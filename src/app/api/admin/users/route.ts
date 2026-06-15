import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

// List users
export async function GET() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("users")
    .select("id, name, token, created_at")
    .order("created_at", { ascending: true });
  return NextResponse.json(data ?? []);
}

// Create user
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Nome obrigatório." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .ilike("name", name.trim())
    .single();

  if (existing) {
    return NextResponse.json({ error: "Nome já em uso." }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("users")
    .insert({ name: name.trim() })
    .select("id, name, token")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Erro ao criar utilizador." }, { status: 500 });
  }

  // Create empty global predictions placeholder
  await supabase.from("global_predictions").insert({
    user_id: data.id,
    top_scorer: "",
    tournament_winner: "",
  });

  return NextResponse.json(data);
}

// Delete user
export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { user_id } = await req.json();
  const supabase = createAdminClient();
  await supabase.from("users").delete().eq("id", user_id);
  return NextResponse.json({ success: true });
}
