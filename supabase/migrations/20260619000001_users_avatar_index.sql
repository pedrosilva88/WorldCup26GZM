ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_index integer;

UPDATE public.users u
SET avatar_index = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.users
) sub
WHERE u.id = sub.id;

DROP VIEW IF EXISTS public.leaderboard;

CREATE VIEW public.leaderboard
WITH (security_invoker = true)
AS
SELECT
  u.id AS user_id,
  u.name AS user_name,
  u.avatar_index,
  COALESCE(SUM(p.points_earned), 0) +
    COALESCE(gp.top_scorer_points, 0) +
    COALESCE(gp.tournament_winner_points, 0) AS total_points,
  COUNT(CASE WHEN p.points_earned > 0 AND (
    p.prediction_1x2 = CASE
      WHEN m.home_score > m.away_score THEN '1'
      WHEN m.home_score < m.away_score THEN '2'
      ELSE 'x' END
  ) THEN 1 END) AS correct_1x2,
  COUNT(CASE WHEN p.home_goals = m.home_score AND p.away_goals = m.away_score AND m.status = 'finished' THEN 1 END) AS correct_scores,
  COALESCE(gp.top_scorer_points, 0) + COALESCE(gp.tournament_winner_points, 0) AS bonus_points
FROM public.users u
LEFT JOIN public.predictions p ON p.user_id = u.id
LEFT JOIN public.matches m ON m.id = p.match_id
LEFT JOIN public.global_predictions gp ON gp.user_id = u.id
GROUP BY u.id, u.name, u.avatar_index, gp.top_scorer_points, gp.tournament_winner_points
ORDER BY total_points DESC;
