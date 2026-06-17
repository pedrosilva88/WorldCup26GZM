import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function lisboaDay(match_date: string): string {
  return new Date(match_date).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
}

export async function GET(req: NextRequest) {
  const dateStr = req.nextUrl.searchParams.get("date");
  const supabase = createAdminClient();

  const { data: allMatches } = await supabase
    .from("matches")
    .select("id, match_date, home_team, away_team, home_score, away_score, status, group, match_order, matchday")
    .eq("phase", "group")
    .not("match_date", "is", null)
    .order("match_date");

  // Build sorted unique day list (Lisbon timezone)
  const daySet = new Set<string>();
  for (const m of allMatches ?? []) {
    if (m.match_date) daySet.add(lisboaDay(m.match_date));
  }
  const days = Array.from(daySet).sort();

  if (!dateStr) {
    return NextResponse.json({ days, users: [], matches: [] });
  }

  const dayMatches = (allMatches ?? []).filter(
    (m) => m.match_date && lisboaDay(m.match_date) === dateStr
  );

  if (dayMatches.length === 0) {
    return NextResponse.json({ days, users: [], matches: [] });
  }

  const matchIds = dayMatches.map((m) => m.id);

  const [{ data: predictions }, { data: users }] = await Promise.all([
    supabase
      .from("predictions")
      .select("match_id, home_goals, away_goals, prediction_1x2, points_earned, user_id")
      .in("match_id", matchIds),
    supabase.from("users").select("id, name").order("name"),
  ]);

  const predsByMatch = new Map<string, Map<string, unknown>>();
  for (const p of predictions ?? []) {
    if (!predsByMatch.has(p.match_id)) predsByMatch.set(p.match_id, new Map());
    predsByMatch.get(p.match_id)!.set(p.user_id, p);
  }

  const sortedUsers = users ?? [];

  const matchesWithPreds = dayMatches.map((m) => ({
    ...m,
    predictions: sortedUsers.map((u) => {
      const p = predsByMatch.get(m.id)?.get(u.id) as Record<string, unknown> | undefined;
      return {
        user_id: u.id,
        user_name: u.name,
        home_goals: p?.home_goals ?? null,
        away_goals: p?.away_goals ?? null,
        prediction_1x2: p?.prediction_1x2 ?? null,
        points_earned: p?.points_earned ?? null,
      };
    }),
  }));

  return NextResponse.json({ days, users: sortedUsers, matches: matchesWithPreds });
}
