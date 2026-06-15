import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Match, Prediction } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePoints(
  match: Match,
  prediction: Prediction
): number {
  if (
    match.status !== "finished" ||
    match.home_score === null ||
    match.away_score === null ||
    prediction.prediction_1x2 === null
  ) {
    return 0;
  }

  const actual1x2 =
    match.home_score > match.away_score
      ? "1"
      : match.home_score < match.away_score
      ? "2"
      : "x";

  let points = 0;

  if (prediction.prediction_1x2 === actual1x2) {
    points += 1;
  }

  // Exact score gives 3 additional points (on top of 1x2)
  if (
    prediction.home_goals === match.home_score &&
    prediction.away_goals === match.away_score
  ) {
    points += 3;
  }

  return points;
}

export function formatScore(home: number | null, away: number | null): string {
  if (home === null || away === null) return "? - ?";
  return `${home} - ${away}`;
}

export function getResult1x2(homeScore: number, awayScore: number): "1" | "x" | "2" {
  if (homeScore > awayScore) return "1";
  if (homeScore < awayScore) return "2";
  return "x";
}

export function generateToken(): string {
  return crypto.randomUUID();
}
