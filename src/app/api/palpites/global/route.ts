import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const [{ data: globalPreds }, { data: officialScorers }] = await Promise.all([
    supabase
      .from("global_predictions")
      .select("user_id, top_scorer, tournament_winner, users(name)")
      .not("top_scorer", "is", null),
    supabase
      .from("top_scorers")
      .select("player_name, team_name, goals")
      .order("goals", { ascending: false })
      .limit(10),
  ]);

  // Group by top_scorer
  const scorerMap: Record<string, string[]> = {};
  const winnerMap: Record<string, string[]> = {};

  for (const gp of globalPreds ?? []) {
    const usersRaw = gp.users as unknown as { name: string } | null;
    const userName = usersRaw?.name ?? "?";
    if (gp.top_scorer) {
      if (!scorerMap[gp.top_scorer]) scorerMap[gp.top_scorer] = [];
      scorerMap[gp.top_scorer].push(userName);
    }
    if (gp.tournament_winner) {
      if (!winnerMap[gp.tournament_winner]) winnerMap[gp.tournament_winner] = [];
      winnerMap[gp.tournament_winner].push(userName);
    }
  }

  const goalsMap: Record<string, number> = {};
  for (const s of officialScorers ?? []) goalsMap[s.player_name] = s.goals;

  const groupedScorers = Object.entries(scorerMap)
    .map(([player, users]) => ({ player, users, goals: goalsMap[player] ?? null }))
    .sort((a, b) => (b.goals ?? -1) - (a.goals ?? -1));

  const groupedWinners = Object.entries(winnerMap)
    .map(([team, users]) => ({ team, users }))
    .sort((a, b) => b.users.length - a.users.length);

  return NextResponse.json({
    groupedScorers,
    groupedWinners,
    officialScorers: officialScorers ?? [],
  });
}
