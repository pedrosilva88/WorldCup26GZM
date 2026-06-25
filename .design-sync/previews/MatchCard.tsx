import React from 'react';
import { MatchCard } from 'worldcupgzm';

const noop = () => {};

const groupMatch = {
  id: "m1",
  phase: "group" as const,
  group: "A",
  matchday: 1,
  home_team: "Portugal",
  away_team: "Brasil",
  match_date: "2026-06-15T18:00:00Z",
  home_score: null,
  away_score: null,
  status: "scheduled" as const,
  match_order: 1,
};

const finishedMatch = {
  id: "m2",
  phase: "group" as const,
  group: "B",
  matchday: 2,
  home_team: "Argentina",
  away_team: "França",
  match_date: "2026-06-12T15:00:00Z",
  home_score: 2,
  away_score: 1,
  status: "finished" as const,
  match_order: 5,
};

const knockoutMatch = {
  id: "m3",
  phase: "quarter_final" as const,
  home_team: "Espanha",
  away_team: "Alemanha",
  match_date: "2026-07-03T20:00:00Z",
  home_score: null,
  away_score: null,
  status: "scheduled" as const,
  match_order: 65,
};

const darkBg: React.CSSProperties = { background: "#060d1e", padding: 16, maxWidth: 480 };

export function GroupMatchEmpty() {
  return (
    <div style={darkBg}>
      <MatchCard
        match={groupMatch}
        home_goals=""
        away_goals=""
        disabled={false}
        onChange={noop}
        onChangeBet={noop}
      />
    </div>
  );
}

export function GroupMatchFilled() {
  return (
    <div style={darkBg}>
      <MatchCard
        match={groupMatch}
        home_goals="2"
        away_goals="1"
        bet_1x2="1"
        disabled={false}
        onChange={noop}
        onChangeBet={noop}
        showResult
      />
    </div>
  );
}

export function GroupMatchLocked() {
  return (
    <div style={darkBg}>
      <MatchCard
        match={finishedMatch}
        home_goals="2"
        away_goals="1"
        bet_1x2="1"
        disabled={true}
        onChange={noop}
        onChangeBet={noop}
        showResult
      />
    </div>
  );
}

export function KnockoutMatchOpen() {
  return (
    <div style={darkBg}>
      <MatchCard
        match={knockoutMatch}
        home_goals="1"
        away_goals="1"
        disabled={false}
        onChange={noop}
        onChangeBet={noop}
      />
    </div>
  );
}
