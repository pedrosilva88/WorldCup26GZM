import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

// Get current open knockout phase
export async function GET() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "knockout_open_phase")
    .single();

  return NextResponse.json({ phase: data?.value ?? null });
}

// Set which knockout phase is open for predictions
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { phase } = await req.json();
  const supabase = createAdminClient();

  await supabase
    .from("settings")
    .upsert({ key: "knockout_open_phase", value: phase ?? null, updated_at: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
