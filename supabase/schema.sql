-- WorldCupGZM Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- USERS
-- ============================================================
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now()
);

-- ============================================================
-- MATCHES
-- ============================================================
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  phase text not null check (phase in ('group','round_of_32','round_of_16','quarter_final','semi_final','third_place','final')),
  "group" text,
  home_team text not null,
  away_team text not null,
  match_date timestamptz,
  home_score integer,
  away_score integer,
  status text not null default 'scheduled' check (status in ('scheduled','live','finished')),
  api_match_id integer,
  match_order integer not null
);

-- ============================================================
-- PREDICTIONS (per match)
-- ============================================================
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  match_id uuid not null references public.matches(id) on delete cascade,
  prediction_1x2 text check (prediction_1x2 in ('1','x','2')),
  home_goals integer,
  away_goals integer,
  points_earned integer default 0,
  created_at timestamptz not null default now(),
  unique(user_id, match_id)
);

-- ============================================================
-- GLOBAL PREDICTIONS (top scorer + winner)
-- ============================================================
create table if not exists public.global_predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade unique,
  top_scorer text,
  tournament_winner text,
  top_scorer_points integer default 0,
  tournament_winner_points integer default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TOURNAMENT SETTINGS (admin controls)
-- ============================================================
create table if not exists public.settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

insert into public.settings (key, value) values
  ('top_scorer_result', null),
  ('tournament_winner_result', null),
  ('knockout_open_phase', null)   -- which knockout phase is open for predictions
on conflict (key) do nothing;

-- ============================================================
-- LEADERBOARD VIEW
-- ============================================================
create or replace view public.leaderboard as
select
  u.id as user_id,
  u.name as user_name,
  coalesce(sum(p.points_earned), 0) +
    coalesce(gp.top_scorer_points, 0) +
    coalesce(gp.tournament_winner_points, 0) as total_points,
  count(case when p.points_earned > 0 and (
    (p.prediction_1x2 = case
      when m.home_score > m.away_score then '1'
      when m.home_score < m.away_score then '2'
      else 'x' end)
  ) then 1 end) as correct_1x2,
  count(case when p.home_goals = m.home_score and p.away_goals = m.away_score and m.status = 'finished' then 1 end) as correct_scores,
  coalesce(gp.top_scorer_points, 0) + coalesce(gp.tournament_winner_points, 0) as bonus_points
from public.users u
left join public.predictions p on p.user_id = u.id
left join public.matches m on m.id = p.match_id
left join public.global_predictions gp on gp.user_id = u.id
group by u.id, u.name, gp.top_scorer_points, gp.tournament_winner_points
order by total_points desc;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.matches enable row level security;
alter table public.predictions enable row level security;
alter table public.global_predictions enable row level security;
alter table public.settings enable row level security;

-- Public read access
create policy "Public read users" on public.users for select using (true);
create policy "Public read matches" on public.matches for select using (true);
create policy "Public read predictions" on public.predictions for select using (true);
create policy "Public read global_predictions" on public.global_predictions for select using (true);
create policy "Public read settings" on public.settings for select using (true);

-- Insert/update via service role only (server-side API routes)
create policy "Service insert users" on public.users for insert with check (true);
create policy "Service insert predictions" on public.predictions for insert with check (true);
create policy "Service insert global_predictions" on public.global_predictions for insert with check (true);
create policy "Service update predictions" on public.predictions for update using (true);
create policy "Service update global_predictions" on public.global_predictions for update using (true);
create policy "Service update matches" on public.matches for update using (true);
create policy "Service insert matches" on public.matches for insert with check (true);
create policy "Service update settings" on public.settings for update using (true);
