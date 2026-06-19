import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const [{ data: globalPreds }, { data: officialScorers }, { data: allScorers }] = await Promise.all([
    supabase
      .from("global_predictions")
      .select("user_id, top_scorer, tournament_winner, users(name)")
      .not("top_scorer", "is", null),
    supabase
      .from("top_scorers")
      .select("player_name, team_name, goals, photo_url")
      .order("goals", { ascending: false })
      .limit(10),
    supabase
      .from("top_scorers")
      .select("player_name, goals, photo_url"),
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

  // officialMap covers all players in DB (for goals + photo lookup in grouped list)
  const officialMap: Record<string, { goals: number; photo_url: string | null }> = {};
  for (const s of allScorers ?? []) {
    officialMap[s.player_name] = { goals: s.goals, photo_url: s.photo_url ?? null };
  }

  const groupedScorers = Object.entries(scorerMap)
    .map(([player, users]) => ({
      player,
      users,
      goals: officialMap[player]?.goals ?? null,
      photo_url: officialMap[player]?.photo_url ?? null,
    }))
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
