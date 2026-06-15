import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json({ error: "user_id em falta." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: user } = await supabase
    .from("users")
    .select("name, token")
    .eq("id", userId)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Utilizador não encontrado." }, { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;
  const link = `${baseUrl}/prever/${user.token}`;

  return NextResponse.json({ name: user.name, link });
}
