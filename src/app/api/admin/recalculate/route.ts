import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { calculatePoints } from "@/lib/scoring";
import { Match, Prediction } from "@/types";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: finishedMatches } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "finished");

  if (!finishedMatches || finishedMatches.length === 0) {
    return NextResponse.json({ updated: 0 });
  }

  const matchIds = finishedMatches.map((m) => m.id);

  const { data: preds } = await supabase
    .from("predictions")
    .select("*")
    .in("match_id", matchIds);

  const matchMap = new Map(finishedMatches.map((m) => [m.id, m]));

  let updated = 0;
  for (const pred of preds ?? []) {
    const match = matchMap.get(pred.match_id);
    if (!match) continue;
    const pts = calculatePoints(match as Match, pred as Prediction);
    await supabase.from("predictions").update({ points_earned: pts }).eq("id", pred.id);
    updated++;
  }

  return NextResponse.json({ updated });
}
