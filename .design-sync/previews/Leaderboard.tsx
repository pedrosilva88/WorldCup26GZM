import { Leaderboard } from 'worldcupgzm';

const entries = [
  { user_id: "1", user_name: "Pedro Silva", total_points: 127, correct_1x2: 31, correct_scores: 14, bonus_points: 25 },
  { user_id: "2", user_name: "João Santos", total_points: 98, correct_1x2: 26, correct_scores: 10, bonus_points: 10 },
  { user_id: "3", user_name: "Ana Costa", total_points: 84, correct_1x2: 22, correct_scores: 8, bonus_points: 10 },
  { user_id: "4", user_name: "Miguel Rodrigues", total_points: 71, correct_1x2: 19, correct_scores: 6, bonus_points: 0 },
  { user_id: "5", user_name: "Sofia Fernandes", total_points: 63, correct_1x2: 17, correct_scores: 5, bonus_points: 0 },
  { user_id: "6", user_name: "Carlos Pereira", total_points: 55, correct_1x2: 15, correct_scores: 4, bonus_points: 0 },
];

export function WithEntries() {
  return (
    <div style={{ background: "#060d1e", padding: 24, maxWidth: 600 }}>
      <Leaderboard entries={entries} />
    </div>
  );
}

export function Empty() {
  return (
    <div style={{ background: "#060d1e", padding: 24, maxWidth: 600 }}>
      <Leaderboard entries={[]} />
    </div>
  );
}
