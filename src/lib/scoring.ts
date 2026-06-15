import { Match, Prediction } from "@/types";

export function infer1x2(homeGoals: number, awayGoals: number): "1" | "x" | "2" {
  if (homeGoals > awayGoals) return "1";
  if (homeGoals < awayGoals) return "2";
  return "x";
}

export function calculatePoints(match: Match, prediction: Prediction): number {
  if (
    match.status !== "finished" ||
    match.home_score === null ||
    match.away_score === null ||
    prediction.home_goals === null ||
    prediction.away_goals === null
  ) return 0;

  const actual1x2 = infer1x2(match.home_score, match.away_score);
  const pred1x2 = prediction.prediction_1x2 ?? infer1x2(prediction.home_goals, prediction.away_goals);

  let points = 0;
  if (pred1x2 === actual1x2) points += 1;
  if (prediction.home_goals === match.home_score && prediction.away_goals === match.away_score) points += 3;
  return points;
}
