import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Returns lock status for each matchday (group stage only)
export async function GET() {
  const supabase = createAdminClient();

  const { data: matches } = await supabase
    .from("matches")
    .select("matchday, match_date")
    .eq("phase", "group")
    .not("matchday", "is", null)
    .not("match_date", "is", null);

  // Group by matchday → find earliest match_date
  const earliest: Record<number, number> = {};
  for (const m of matches ?? []) {
    if (!m.matchday || !m.match_date) continue;
    const t = new Date(m.match_date).getTime();
    if (!earliest[m.matchday] || t < earliest[m.matchday]) {
      earliest[m.matchday] = t;
    }
  }

  const LOCK_OFFSET_MS = 2 * 60 * 60 * 1000; // 2 hours before first match
  const now = Date.now();

  const lockInfo = Object.entries(earliest).map(([md, firstMs]) => {
    const lockTime = new Date(firstMs - LOCK_OFFSET_MS);
    return {
      matchday: Number(md),
      lock_time: lockTime.toISOString(),
      is_locked: now >= lockTime.getTime(),
    };
  });

  lockInfo.sort((a, b) => a.matchday - b.matchday);

  return NextResponse.json({ lockInfo });
}
