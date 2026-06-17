import { Phase } from "@/types";

const BASE = "https://api.football-data.org/v4";
const WC_CODE = "WC";

// Maps our internal phase to football-data.org stage strings
const PHASE_TO_STAGE: Record<string, string> = {
  round_of_32: "LAST_32",
  round_of_16: "LAST_16",
  quarter_final: "QUARTER_FINALS",
  semi_final: "SEMI_FINALS",
  third_place: "THIRD_PLACE",
  final: "FINAL",
};

export interface ApiMatch {
  id: number;
  utcDate: string;
  status: string;
  stage: string;
  homeTeam: { name: string; shortName: string };
  awayTeam: { name: string; shortName: string };
  score: {
    fullTime: { home: number | null; away: number | null };
    extraTime: { home: number | null; away: number | null } | null;
  };
}

async function fetchWC(path: string, apiKey: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`football-data.org ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function getKnockoutMatches(
  phase: Phase,
  apiKey: string
): Promise<ApiMatch[]> {
  const stage = PHASE_TO_STAGE[phase];
  if (!stage) return [];

  const json = await fetchWC(
    `/competitions/${WC_CODE}/matches?stage=${stage}`,
    apiKey
  );
  return json.matches ?? [];
}

export async function getFinishedMatches(apiKey: string): Promise<ApiMatch[]> {
  const json = await fetchWC(
    `/competitions/${WC_CODE}/matches?status=FINISHED`,
    apiKey
  );
  return json.matches ?? [];
}

// Translate team name from API (English) to Portuguese
const TEAM_NAME_MAP: Record<string, string> = {
  "Mexico": "México",
  "South Africa": "África do Sul",
  // API returns "South Korea" (also "Korea Republic" in some endpoints)
  "South Korea": "Korea do Sul",
  "Korea Republic": "Korea do Sul",
  // API returns "Czechia" (also "Czech Republic")
  "Czechia": "República Checa",
  "Czech Republic": "República Checa",
  // API returns "Bosnia-Herzegovina" (also "Bosnia and Herzegovina")
  "Bosnia-Herzegovina": "Bósnia H.",
  "Bosnia and Herzegovina": "Bósnia H.",
  "Switzerland": "Suíça",
  "Morocco": "Marrocos",
  "Scotland": "Escócia",
  "United States": "Estados Unidos",
  "Paraguay": "Paraguai",
  "Australia": "Austrália",
  "Turkey": "Turquia",
  "Germany": "Alemanha",
  "Curaçao": "Curaçau",
  "Ivory Coast": "Costa do Marfim",
  "Ecuador": "Equador",
  "Netherlands": "Holanda",
  "Japan": "Japão",
  "Sweden": "Suécia",
  "Tunisia": "Tunísia",
  "Belgium": "Bélgica",
  "Egypt": "Egito",
  "Iran": "Irão",
  "New Zealand": "Nova Zelândia",
  "Spain": "Espanha",
  "Cape Verde": "Cabo Verde",
  "Cape Verde Islands": "Cabo Verde",
  "Saudi Arabia": "Arábia Saudita",
  "Uruguay": "Uruguai",
  "France": "França",
  "Senegal": "Senegal",
  "Iraq": "Iraque",
  "Norway": "Noruega",
  "Argentina": "Argentina",
  "Algeria": "Argélia",
  "Austria": "Áustria",
  "Jordan": "Jordânia",
  "Portugal": "Portugal",
  "Congo DR": "Congo",
  "Congo": "Congo",
  "Uzbekistan": "Uzbequistão",
  "Colombia": "Colômbia",
  "England": "Inglaterra",
  "Croatia": "Croácia",
  "Ghana": "Gana",
  "Panama": "Panamá",
  "Canada": "Canadá",
  "Qatar": "Qatar",
  "Haiti": "Haiti",
  "Brazil": "Brasil",
};

export function translateTeam(name: string): string {
  return TEAM_NAME_MAP[name] ?? name;
}

// Fallback bracket for Round of 32 (FIFA 2026 official bracket)
// Source: FIFA official draw (Dec 2025)
export const WC2026_R32_BRACKET = [
  { home_placeholder: "1º Grupo A", away_placeholder: "2º Grupo B", match_order: 73 },
  { home_placeholder: "1º Grupo C", away_placeholder: "2º Grupo D", match_order: 74 },
  { home_placeholder: "1º Grupo E", away_placeholder: "2º Grupo F", match_order: 75 },
  { home_placeholder: "1º Grupo G", away_placeholder: "2º Grupo H", match_order: 76 },
  { home_placeholder: "1º Grupo I", away_placeholder: "2º Grupo J", match_order: 77 },
  { home_placeholder: "1º Grupo K", away_placeholder: "2º Grupo L", match_order: 78 },
  { home_placeholder: "Melhor 3º (A/B/C/D)", away_placeholder: "2º Grupo A", match_order: 79 },
  { home_placeholder: "Melhor 3º (E/F/G/H)", away_placeholder: "2º Grupo E", match_order: 80 },
  { home_placeholder: "Melhor 3º (I/J/K/L)", away_placeholder: "2º Grupo I", match_order: 81 },
  { home_placeholder: "Melhor 3º (A/B/C)", away_placeholder: "2º Grupo C", match_order: 82 },
  { home_placeholder: "1º Grupo B", away_placeholder: "Melhor 3º (D/E/F)", match_order: 83 },
  { home_placeholder: "1º Grupo D", away_placeholder: "Melhor 3º (G/H/I)", match_order: 84 },
  { home_placeholder: "1º Grupo F", away_placeholder: "Melhor 3º (J/K/L)", match_order: 85 },
  { home_placeholder: "1º Grupo H", away_placeholder: "2º Grupo G", match_order: 86 },
  { home_placeholder: "1º Grupo J", away_placeholder: "2º Grupo K", match_order: 87 },
  { home_placeholder: "1º Grupo L", away_placeholder: "2º Grupo I ou J", match_order: 88 },
];
