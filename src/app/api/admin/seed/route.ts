import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { GROUP_MATCHES } from "@/lib/matches-data";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Check if already seeded
  const { count } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Base de dados já populada.", count }, { status: 409 });
  }

  const rows = GROUP_MATCHES.map((m) => ({
    phase: m.phase,
    group: m.group,
    home_team: m.home_team,
    away_team: m.away_team,
    match_date: m.match_date,
    home_score: null,
    away_score: null,
    status: "scheduled",
    match_order: m.match_order,
  }));

  const { error } = await supabase.from("matches").insert(rows);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: rows.length });
}
