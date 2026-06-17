import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const isAdmin = await isAdminAuthenticated();
  const cronSecret = req.headers.get("x-cron-secret");
  if (!isAdmin && cronSecret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key não configurada." }, { status: 500 });

  const res = await fetch(
    "https://api.football-data.org/v4/competitions/WC/matches?stage=GROUP_STAGE",
    { headers: { "X-Auth-Token": apiKey }, next: { revalidate: 0 } }
  );
  if (!res.ok) return NextResponse.json({ error: `API error: ${res.status}` }, { status: 500 });

  const json = await res.json();
  const apiMatches: Array<{ id: number; matchday: number }> = json.matches ?? [];

  const supabase = createAdminClient();
  let updated = 0;

  for (const m of apiMatches) {
    if (!m.matchday || !m.id) continue;
    const { error } = await supabase
      .from("matches")
      .update({ matchday: m.matchday })
      .eq("api_match_id", m.id)
      .eq("phase", "group");
    if (!error) updated++;
  }

  return NextResponse.json({ updated, total: apiMatches.length });
}
