import { Match } from "@/types";

// Group stage matches - all 72 games from the Excel
// Dates are approximate; admin/API will confirm exact times
export const GROUP_MATCHES: Omit<Match, "id" | "home_score" | "away_score" | "status" | "api_match_id">[] = [
  // GRUPO A
  { phase: "group", group: "A", home_team: "México", away_team: "África do Sul", match_date: null, match_order: 1 },
  { phase: "group", group: "A", home_team: "Korea do Sul", away_team: "República Checa", match_date: null, match_order: 2 },
  { phase: "group", group: "A", home_team: "México", away_team: "Korea do Sul", match_date: null, match_order: 3 },
  { phase: "group", group: "A", home_team: "República Checa", away_team: "África do Sul", match_date: null, match_order: 4 },
  { phase: "group", group: "A", home_team: "África do Sul", away_team: "Korea do Sul", match_date: null, match_order: 5 },
  { phase: "group", group: "A", home_team: "República Checa", away_team: "México", match_date: null, match_order: 6 },

  // GRUPO B
  { phase: "group", group: "B", home_team: "Canadá", away_team: "Bósnia H.", match_date: null, match_order: 7 },
  { phase: "group", group: "B", home_team: "Qatar", away_team: "Suíça", match_date: null, match_order: 8 },
  { phase: "group", group: "B", home_team: "Suíça", away_team: "Bósnia H.", match_date: null, match_order: 9 },
  { phase: "group", group: "B", home_team: "Canadá", away_team: "Qatar", match_date: null, match_order: 10 },
  { phase: "group", group: "B", home_team: "Suíça", away_team: "Canadá", match_date: null, match_order: 11 },
  { phase: "group", group: "B", home_team: "Bósnia H.", away_team: "Qatar", match_date: null, match_order: 12 },

  // GRUPO C
  { phase: "group", group: "C", home_team: "Brasil", away_team: "Marrocos", match_date: null, match_order: 13 },
  { phase: "group", group: "C", home_team: "Haiti", away_team: "Escócia", match_date: null, match_order: 14 },
  { phase: "group", group: "C", home_team: "Brasil", away_team: "Haiti", match_date: null, match_order: 15 },
  { phase: "group", group: "C", home_team: "Escócia", away_team: "Marrocos", match_date: null, match_order: 16 },
  { phase: "group", group: "C", home_team: "Marrocos", away_team: "Haiti", match_date: null, match_order: 17 },
  { phase: "group", group: "C", home_team: "Escócia", away_team: "Brasil", match_date: null, match_order: 18 },

  // GRUPO D
  { phase: "group", group: "D", home_team: "Estados Unidos", away_team: "Paraguai", match_date: null, match_order: 19 },
  { phase: "group", group: "D", home_team: "Austrália", away_team: "Turquia", match_date: null, match_order: 20 },
  { phase: "group", group: "D", home_team: "Estados Unidos", away_team: "Austrália", match_date: null, match_order: 21 },
  { phase: "group", group: "D", home_team: "Turquia", away_team: "Paraguai", match_date: null, match_order: 22 },
  { phase: "group", group: "D", home_team: "Paraguai", away_team: "Austrália", match_date: null, match_order: 23 },
  { phase: "group", group: "D", home_team: "Turquia", away_team: "Estados Unidos", match_date: null, match_order: 24 },

  // GRUPO E
  { phase: "group", group: "E", home_team: "Alemanha", away_team: "Curaçau", match_date: null, match_order: 25 },
  { phase: "group", group: "E", home_team: "Costa do Marfim", away_team: "Equador", match_date: null, match_order: 26 },
  { phase: "group", group: "E", home_team: "Alemanha", away_team: "Costa do Marfim", match_date: null, match_order: 27 },
  { phase: "group", group: "E", home_team: "Equador", away_team: "Curaçau", match_date: null, match_order: 28 },
  { phase: "group", group: "E", home_team: "Equador", away_team: "Alemanha", match_date: null, match_order: 29 },
  { phase: "group", group: "E", home_team: "Curaçau", away_team: "Costa do Marfim", match_date: null, match_order: 30 },

  // GRUPO F
  { phase: "group", group: "F", home_team: "Holanda", away_team: "Japão", match_date: null, match_order: 31 },
  { phase: "group", group: "F", home_team: "Suécia", away_team: "Tunísia", match_date: null, match_order: 32 },
  { phase: "group", group: "F", home_team: "Tunísia", away_team: "Japão", match_date: null, match_order: 33 },
  { phase: "group", group: "F", home_team: "Holanda", away_team: "Suécia", match_date: null, match_order: 34 },
  { phase: "group", group: "F", home_team: "Tunísia", away_team: "Holanda", match_date: null, match_order: 35 },
  { phase: "group", group: "F", home_team: "Japão", away_team: "Suécia", match_date: null, match_order: 36 },

  // GRUPO G
  { phase: "group", group: "G", home_team: "Bélgica", away_team: "Egito", match_date: null, match_order: 37 },
  { phase: "group", group: "G", home_team: "Irão", away_team: "Nova Zelândia", match_date: null, match_order: 38 },
  { phase: "group", group: "G", home_team: "Nova Zelândia", away_team: "Egito", match_date: null, match_order: 39 },
  { phase: "group", group: "G", home_team: "Bélgica", away_team: "Irão", match_date: null, match_order: 40 },
  { phase: "group", group: "G", home_team: "Nova Zelândia", away_team: "Bélgica", match_date: null, match_order: 41 },
  { phase: "group", group: "G", home_team: "Egito", away_team: "Irão", match_date: null, match_order: 42 },

  // GRUPO H
  { phase: "group", group: "H", home_team: "Espanha", away_team: "Cabo Verde", match_date: null, match_order: 43 },
  { phase: "group", group: "H", home_team: "Arábia Saudita", away_team: "Uruguai", match_date: null, match_order: 44 },
  { phase: "group", group: "H", home_team: "Espanha", away_team: "Arábia Saudita", match_date: null, match_order: 45 },
  { phase: "group", group: "H", home_team: "Uruguai", away_team: "Cabo Verde", match_date: null, match_order: 46 },
  { phase: "group", group: "H", home_team: "Uruguai", away_team: "Espanha", match_date: null, match_order: 47 },
  { phase: "group", group: "H", home_team: "Cabo Verde", away_team: "Arábia Saudita", match_date: null, match_order: 48 },

  // GRUPO I
  { phase: "group", group: "I", home_team: "França", away_team: "Senegal", match_date: null, match_order: 49 },
  { phase: "group", group: "I", home_team: "Iraque", away_team: "Noruega", match_date: null, match_order: 50 },
  { phase: "group", group: "I", home_team: "França", away_team: "Iraque", match_date: null, match_order: 51 },
  { phase: "group", group: "I", home_team: "Noruega", away_team: "Senegal", match_date: null, match_order: 52 },
  { phase: "group", group: "I", home_team: "Noruega", away_team: "França", match_date: null, match_order: 53 },
  { phase: "group", group: "I", home_team: "Senegal", away_team: "Iraque", match_date: null, match_order: 54 },

  // GRUPO J
  { phase: "group", group: "J", home_team: "Argentina", away_team: "Argélia", match_date: null, match_order: 55 },
  { phase: "group", group: "J", home_team: "Áustria", away_team: "Jordânia", match_date: null, match_order: 56 },
  { phase: "group", group: "J", home_team: "Argentina", away_team: "Áustria", match_date: null, match_order: 57 },
  { phase: "group", group: "J", home_team: "Jordânia", away_team: "Argélia", match_date: null, match_order: 58 },
  { phase: "group", group: "J", home_team: "Argélia", away_team: "Áustria", match_date: null, match_order: 59 },
  { phase: "group", group: "J", home_team: "Jordânia", away_team: "Argentina", match_date: null, match_order: 60 },

  // GRUPO K
  { phase: "group", group: "K", home_team: "Portugal", away_team: "Congo", match_date: null, match_order: 61 },
  { phase: "group", group: "K", home_team: "Uzbequistão", away_team: "Colômbia", match_date: null, match_order: 62 },
  { phase: "group", group: "K", home_team: "Portugal", away_team: "Uzbequistão", match_date: null, match_order: 63 },
  { phase: "group", group: "K", home_team: "Colômbia", away_team: "Congo", match_date: null, match_order: 64 },
  { phase: "group", group: "K", home_team: "Colômbia", away_team: "Portugal", match_date: null, match_order: 65 },
  { phase: "group", group: "K", home_team: "Congo", away_team: "Uzbequistão", match_date: null, match_order: 66 },

  // GRUPO L
  { phase: "group", group: "L", home_team: "Inglaterra", away_team: "Croácia", match_date: null, match_order: 67 },
  { phase: "group", group: "L", home_team: "Gana", away_team: "Panamá", match_date: null, match_order: 68 },
  { phase: "group", group: "L", home_team: "Inglaterra", away_team: "Gana", match_date: null, match_order: 69 },
  { phase: "group", group: "L", home_team: "Panamá", away_team: "Croácia", match_date: null, match_order: 70 },
  { phase: "group", group: "L", home_team: "Panamá", away_team: "Inglaterra", match_date: null, match_order: 71 },
  { phase: "group", group: "L", home_team: "Croácia", away_team: "Gana", match_date: null, match_order: 72 },
];

export const ALL_TEAMS = Array.from(
  new Set(GROUP_MATCHES.flatMap((m) => [m.home_team, m.away_team]))
).sort();

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const PHASE_LABELS: Record<string, string> = {
  group: "Fase de Grupos",
  round_of_32: "16 Avos de Final",
  round_of_16: "Oitavos de Final",
  quarter_final: "Quartos de Final",
  semi_final: "Meias-Finais",
  third_place: "3º e 4º Lugar",
  final: "Final",
};
