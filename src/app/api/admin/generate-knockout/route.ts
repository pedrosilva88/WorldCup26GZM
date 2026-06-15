import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getKnockoutMatches,
  translateTeam,
  WC2026_R32_BRACKET,
} from "@/lib/football-api";
import { Phase } from "@/types";

const PHASE_ORDER: Phase[] = [
  "round_of_32",
  "round_of_16",
  "quarter_final",
  "semi_final",
  "third_place",
  "final",
];

// Match order start per phase
const PHASE_ORDER_START: Record<string, number> = {
  round_of_32: 73,
  round_of_16: 89,
  quarter_final: 97,
  semi_final: 101,
  third_place: 103,
  final: 104,
};

const PHASE_MATCH_COUNT: Record<string, number> = {
  round_of_32: 16,
  round_of_16: 8,
  quarter_final: 4,
  semi_final: 2,
  third_place: 1,
  final: 1,
};

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { phase } = await req.json() as { phase: Phase };

  if (!PHASE_ORDER.includes(phase)) {
    return NextResponse.json({ error: "Fase inválida." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Check if matches for this phase already exist
  const { count } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("phase", phase);

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { error: "Esta fase já foi gerada.", count },
      { status: 409 }
    );
  }

  const apiKey = process.env.FOOTBALL_API_KEY;
  let rows: object[] = [];
  let source = "placeholder";

  // Try API first
  if (apiKey) {
    try {
      const apiMatches = await getKnockoutMatches(phase, apiKey);

      if (apiMatches.length > 0) {
        source = "api";
        const orderStart = PHASE_ORDER_START[phase];

        rows = apiMatches.map((m, idx) => ({
          phase,
          home_team: translateTeam(m.homeTeam.name),
          away_team: translateTeam(m.awayTeam.name),
          match_date: m.utcDate ?? null,
          home_score:
            m.score?.fullTime?.home !== null && m.status === "FINISHED"
              ? m.score.fullTime.home
              : null,
          away_score:
            m.score?.fullTime?.away !== null && m.status === "FINISHED"
              ? m.score.fullTime.away
              : null,
          status:
            m.status === "FINISHED"
              ? "finished"
              : m.status === "IN_PLAY" || m.status === "PAUSED"
              ? "live"
              : "scheduled",
          api_match_id: m.id,
          match_order: orderStart + idx,
        }));
      }
    } catch (e) {
      console.error("API error, falling back to placeholders:", e);
    }
  }

  // Fallback: placeholders
  if (rows.length === 0) {
    if (phase === "round_of_32") {
      rows = WC2026_R32_BRACKET.map((slot) => ({
        phase,
        home_team: slot.home_placeholder,
        away_team: slot.away_placeholder,
        match_date: null,
        home_score: null,
        away_score: null,
        status: "scheduled",
        api_match_id: null,
        match_order: slot.match_order,
      }));
    } else {
      // Generic placeholders for later rounds
      const count = PHASE_MATCH_COUNT[phase];
      const orderStart = PHASE_ORDER_START[phase];
      const phaseName =
        phase === "round_of_16"
          ? "Oitavos"
          : phase === "quarter_final"
          ? "Quartos"
          : phase === "semi_final"
          ? "Meias"
          : phase === "third_place"
          ? "3º/4º Lugar"
          : "Final";

      rows = Array.from({ length: count }, (_, i) => ({
        phase,
        home_team: `Jogo ${i + 1} ${phaseName} A`,
        away_team: `Jogo ${i + 1} ${phaseName} B`,
        match_date: null,
        home_score: null,
        away_score: null,
        status: "scheduled",
        api_match_id: null,
        match_order: orderStart + i,
      }));
    }
    source = "placeholder";
  }

  const { error, data } = await supabase
    .from("matches")
    .insert(rows)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    phase,
    source,
    inserted: data?.length ?? rows.length,
  });
}

// Update team names in existing knockout match slots
export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { match_id, home_team, away_team } = await req.json();
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("matches")
    .update({ home_team, away_team })
    .eq("id", match_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
