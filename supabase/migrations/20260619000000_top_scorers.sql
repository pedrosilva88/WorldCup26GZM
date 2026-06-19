create table if not exists public.top_scorers (
  id serial primary key,
  player_name text not null,
  team_name text not null,
  goals integer not null default 0,
  assists integer default 0,
  penalties integer default 0,
  updated_at timestamptz not null default now()
);

alter table public.top_scorers enable row level security;

create policy "Public read top_scorers" on public.top_scorers for select using (true);
create policy "Service insert top_scorers" on public.top_scorers for insert with check (true);
create policy "Service delete top_scorers" on public.top_scorers for delete using (true);
