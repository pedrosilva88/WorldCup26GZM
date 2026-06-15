export const TEAM_CODES: Record<string, string> = {
  // Group A
  "México": "MEX",
  "África do Sul": "RSA",
  "Korea do Sul": "KOR",
  "República Checa": "CZE",
  // Group B
  "Canadá": "CAN",
  "Bósnia H.": "BIH",
  "Qatar": "QAT",
  "Suíça": "SUI",
  // Group C
  "Brasil": "BRA",
  "Marrocos": "MAR",
  "Haiti": "HAI",
  "Escócia": "SCO",
  // Group D
  "Estados Unidos": "USA",
  "Paraguai": "PAR",
  "Austrália": "AUS",
  "Turquia": "TUR",
  // Group E
  "Alemanha": "GER",
  "Curaçau": "CUW",
  "Costa do Marfim": "CIV",
  "Equador": "ECU",
  // Group F
  "Holanda": "NED",
  "Japão": "JPN",
  "Suécia": "SWE",
  "Tunísia": "TUN",
  // Group G
  "Bélgica": "BEL",
  "Egito": "EGY",
  "Irão": "IRN",
  "Nova Zelândia": "NZL",
  // Group H
  "Espanha": "ESP",
  "Cabo Verde": "CPV",
  "Arábia Saudita": "KSA",
  "Uruguai": "URU",
  // Group I
  "França": "FRA",
  "Senegal": "SEN",
  "Iraque": "IRQ",
  "Noruega": "NOR",
  // Group J
  "Argentina": "ARG",
  "Argélia": "ALG",
  "Áustria": "AUT",
  "Jordânia": "JOR",
  // Group K
  "Portugal": "POR",
  "Congo": "CGO",
  "Uzbequistão": "UZB",
  "Colômbia": "COL",
  // Group L
  "Inglaterra": "ENG",
  "Croácia": "CRO",
  "Gana": "GHA",
  "Panamá": "PAN",
};

export function getTeamCode(team: string): string {
  return TEAM_CODES[team] ?? team.slice(0, 3).toUpperCase();
}

const FLAG_CODES: Record<string, string> = {
  // Group A
  "México": "mx",
  "África do Sul": "za",
  "Korea do Sul": "kr",
  "República Checa": "cz",
  // Group B
  "Canadá": "ca",
  "Bósnia H.": "ba",
  "Qatar": "qa",
  "Suíça": "ch",
  // Group C
  "Brasil": "br",
  "Marrocos": "ma",
  "Haiti": "ht",
  "Escócia": "gb-sct",
  // Group D
  "Estados Unidos": "us",
  "Paraguai": "py",
  "Austrália": "au",
  "Turquia": "tr",
  // Group E
  "Alemanha": "de",
  "Curaçau": "cw",
  "Costa do Marfim": "ci",
  "Equador": "ec",
  // Group F
  "Holanda": "nl",
  "Japão": "jp",
  "Suécia": "se",
  "Tunísia": "tn",
  // Group G
  "Bélgica": "be",
  "Egito": "eg",
  "Irão": "ir",
  "Nova Zelândia": "nz",
  // Group H
  "Espanha": "es",
  "Cabo Verde": "cv",
  "Arábia Saudita": "sa",
  "Uruguai": "uy",
  // Group I
  "França": "fr",
  "Senegal": "sn",
  "Iraque": "iq",
  "Noruega": "no",
  // Group J
  "Argentina": "ar",
  "Argélia": "dz",
  "Áustria": "at",
  "Jordânia": "jo",
  // Group K
  "Portugal": "pt",
  "Congo": "cg",
  "Uzbequistão": "uz",
  "Colômbia": "co",
  // Group L
  "Inglaterra": "gb-eng",
  "Croácia": "hr",
  "Gana": "gh",
  "Panamá": "pa",
};

export function getFlagUrl(team: string, size: "w20" | "w40" | "w80" = "w40"): string {
  const code = FLAG_CODES[team];
  if (!code) return "";
  return `https://flagcdn.com/${size}/${code}.png`;
}
