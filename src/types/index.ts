export type Phase =
  | "group"
  | "round_of_32"
  | "round_of_16"
  | "quarter_final"
  | "semi_final"
  | "third_place"
  | "final";

export type MatchStatus = "scheduled" | "live" | "finished";

export type Prediction1x2 = "1" | "x" | "2";

export interface Team {
  name: string;
  flag?: string;
}

export interface Match {
  id: string;
  phase: Phase;
  group?: string;
  home_team: string;
  away_team: string;
  match_date: string | null;
  home_score: number | null;
  away_score: number | null;
  status: MatchStatus;
  api_match_id?: number | null;
  match_order: number;
}

export interface User {
  id: string;
  name: string;
  token: string;
  created_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  match_id: string;
  prediction_1x2: Prediction1x2 | null;
  home_goals: number | null;
  away_goals: number | null;
  points_earned: number | null;
}

export interface GlobalPrediction {
  id: string;
  user_id: string;
  top_scorer: string;
  tournament_winner: string;
}

export interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  total_points: number;
  correct_1x2: number;
  correct_scores: number;
  bonus_points: number;
}
