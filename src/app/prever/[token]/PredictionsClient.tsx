"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Match, User } from "@/types";
import MatchCard from "@/components/MatchCard";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface PredictionState {
  home_goals: string;
  away_goals: string;
  bet_1x2: string;
  bet_1x2_manual: boolean;
}

interface GlobalState {
  top_scorer: string;
  tournament_winner: string;
}

const WC2026_TEAMS = [
  "África do Sul", "Alemanha", "Arábia Saudita", "Argentina", "Argélia",
  "Austrália", "Áustria", "Bélgica", "Bósnia H.", "Brasil",
  "Cabo Verde", "Canadá", "Colômbia", "Congo", "Costa do Marfim",
  "Croácia", "Curaçau", "Egito", "Equador", "Escócia",
  "Espanha", "Estados Unidos", "França", "Gana", "Haiti",
  "Holanda", "Inglaterra", "Irão", "Iraque", "Japão",
  "Jordânia", "Korea do Sul", "Marrocos", "México", "Nova Zelândia",
  "Noruega", "Panamá", "Paraguai", "Portugal", "Qatar",
  "República Checa", "Senegal", "Suécia", "Suíça", "Tunísia",
  "Turquia", "Uruguai", "Uzbequistão",
];

interface Props {
  token: string;
}

export default function PredictionsClient({ token }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, PredictionState>>({});
  const [activeGroup, setActiveGroup] = useState<string>("A");
  const [loading, setLoading] = useState(true);
  const [globalPred, setGlobalPred] = useState<GlobalState>({ top_scorer: "", tournament_winner: "" });
  const [preFilledIds, setPreFilledIds] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const [userRes, matchRes] = await Promise.all([
          fetch(`/api/user?token=${token}`),
          fetch("/api/matches"),
        ]);

        if (!userRes.ok) { router.push("/"); return; }

        const { user: u, has_predictions } = await userRes.json();
        const matchData: Match[] = await matchRes.json();

        setUser(u);
        setMatches(matchData);

        if (has_predictions) setSubmitted(true);

        // Always load predictions — pre-filled (admin) or submitted (user)
        const predRes = await fetch(`/api/user-predictions?token=${token}`);
        const predData = predRes.ok ? await predRes.json() : { predictions: [], global: null };
        const existingPreds: Array<{ match_id: string; home_goals: number | null; away_goals: number | null; prediction_1x2: string | null }> =
          predData.predictions ?? [];

        if (predData.global) {
          setGlobalPred({
            top_scorer: predData.global.top_scorer ?? "",
            tournament_winner: predData.global.tournament_winner ?? "",
          });
        }

        const predMap: Record<string, PredictionState> = {};
        const filledIds = new Set<string>();
        existingPreds.forEach((p) => {
          predMap[p.match_id] = {
            home_goals: p.home_goals !== null ? String(p.home_goals) : "",
            away_goals: p.away_goals !== null ? String(p.away_goals) : "",
            bet_1x2: p.prediction_1x2 ?? "",
            bet_1x2_manual: !!p.prediction_1x2,
          };
          if (p.home_goals !== null && p.away_goals !== null && p.prediction_1x2) {
            filledIds.add(p.match_id);
          }
        });
        setPreFilledIds(filledIds);

        const init: Record<string, PredictionState> = {};
        matchData.forEach((m: Match) => {
          init[m.id] = predMap[m.id] ?? { home_goals: "", away_goals: "", bet_1x2: "", bet_1x2_manual: false };
        });
        setPredictions(init);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [token, router]);

  const updatePrediction = useCallback(
    (matchId: string, field: "home_goals" | "away_goals", value: string) => {
      setPredictions((prev) => {
        const current = prev[matchId];
        const updated = { ...current, [field]: value };
        if (!current.bet_1x2_manual) {
          const h = parseInt(field === "home_goals" ? value : current.home_goals);
          const a = parseInt(field === "away_goals" ? value : current.away_goals);
          if (!isNaN(h) && !isNaN(a) && value !== "") {
            updated.bet_1x2 = h > a ? "1" : h < a ? "2" : "x";
          } else if (value === "") {
            updated.bet_1x2 = "";
          }
        }
        return { ...prev, [matchId]: updated };
      });
    },
    []
  );

  const updateBet = useCallback(
    (matchId: string, value: "1" | "x" | "2") => {
      setPredictions((prev) => ({
        ...prev,
        [matchId]: { ...prev[matchId], bet_1x2: value, bet_1x2_manual: true },
      }));
    },
    []
  );

  const groupMatches = (group: string) =>
    matches.filter((m) => m.phase === "group" && m.group === group);

  const isMatchLocked = (match: Match) =>
    submitted || match.status === "finished" || match.status === "live" || preFilledIds.has(match.id);

  const openGroupMatches = matches.filter(
    (m) => m.phase === "group" && !isMatchLocked(m)
  );

  const completionCount = openGroupMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.home_goals !== "" && p?.away_goals !== "" && p?.bet_1x2 !== "";
  }).length;

  const globalFilled = globalPred.top_scorer.trim() !== "" && globalPred.tournament_winner !== "";
  const canSubmit = completionCount === openGroupMatches.length && openGroupMatches.length > 0 && globalFilled;

  const groupCompletion = (group: string) => {
    const open = groupMatches(group).filter((m) => !isMatchLocked(m));
    const filled = open.filter((m) => {
      const p = predictions[m.id];
      return p?.home_goals !== "" && p?.away_goals !== "" && p?.bet_1x2 !== "";
    }).length;
    return { filled, total: open.length };
  };

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const rows = openGroupMatches.map((m) => {
      const p = predictions[m.id];
      const h = parseInt(p?.home_goals ?? "0");
      const a = parseInt(p?.away_goals ?? "0");
      return {
        match_id: m.id,
        home_goals: isNaN(h) ? 0 : h,
        away_goals: isNaN(a) ? 0 : a,
        bet_1x2: p?.bet_1x2 || null,
      };
    });

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          predictions: rows,
          top_scorer: globalPred.top_scorer.trim(),
          tournament_winner: globalPred.tournament_winner,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erro ao submeter."); return; }
      setSubmitted(true);
    } catch {
      setError("Erro de ligação. Verifica a tua internet.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="text-wc-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(6,13,30,0.96)" }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-wc-white/40 hover:text-wc-white transition-colors p-1">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="text-sm font-bold text-wc-white leading-tight">{user?.name}</p>
              <p className="text-xs text-wc-white/30">Previsões · Fase de Grupos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-wc-white/30">Em falta</p>
            <p className="font-display text-xl text-wc-gold tabular-nums">
              {openGroupMatches.length - completionCount}/{openGroupMatches.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5" style={{ background: "rgba(35,82,240,0.2)" }}>
          <div className="h-full transition-all duration-300"
            style={{ background: "linear-gradient(90deg, #2352f0, #f5c300)", width: openGroupMatches.length > 0 ? `${(completionCount / openGroupMatches.length) * 100}%` : "0%" }} />
        </div>

        {/* Group tabs */}
        <div className="flex overflow-x-auto scrollbar-none px-4 gap-1 py-2">
          {GROUPS.map((g) => {
            const { filled, total } = groupCompletion(g);
            const allDone = total === 0 || filled === total;
            return (
              <button key={g} onClick={() => setActiveGroup(g)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeGroup === g
                    ? "text-wc-dark"
                    : allDone && total > 0
                    ? "text-wc-green border border-wc-green/30"
                    : "text-wc-white/50 hover:text-wc-white border border-transparent"
                )}
                style={
                  activeGroup === g
                    ? { background: "linear-gradient(135deg, #f5c300, #ffd93d)" }
                    : allDone && total > 0
                    ? { background: "rgba(0,166,82,0.1)" }
                    : { background: "rgba(255,255,255,0.05)" }
                }>
                {g}
                {total > 0 && !allDone && <span className="ml-1 opacity-60">{filled}/{total}</span>}
                {allDone && total > 0 && <span className="ml-1">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matches */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">
            {PHASE_LABELS.group}
          </span>
          <span className="font-display text-wc-gold text-lg tracking-wider">GRUPO {activeGroup}</span>
        </div>

        <div className="space-y-3">
          {groupMatches(activeGroup).map((match) => {
            const pred = predictions[match.id] ?? { home_goals: "", away_goals: "", bet_1x2: "", bet_1x2_manual: false };
            const locked = isMatchLocked(match);
            return (
              <MatchCard
                key={match.id}
                match={match}
                home_goals={pred.home_goals}
                away_goals={pred.away_goals}
                bet_1x2={pred.bet_1x2}
                disabled={locked}
                onChange={(field, value) => updatePrediction(match.id, field, value)}
                onChangeBet={(value) => updateBet(match.id, value)}
                showResult={locked}
              />
            );
          })}
        </div>

        {activeGroup !== "L" && (
          <button
            onClick={() => { const idx = GROUPS.indexOf(activeGroup); if (idx < GROUPS.length - 1) setActiveGroup(GROUPS[idx + 1]); }}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-xl border border-white/8 hover:border-wc-electric/40 text-wc-white/40 hover:text-wc-white"
            style={{ background: "rgba(35,82,240,0.05)" }}
          >
            Grupo {GROUPS[GROUPS.indexOf(activeGroup) + 1]}
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Global predictions */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">Previsões</span>
          <span className="font-display text-wc-gold text-lg tracking-wider">TORNEIO</span>
        </div>
        <div
          className="rounded-2xl border p-5 space-y-5"
          style={
            submitted
              ? { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }
              : { background: "rgba(35,82,240,0.06)", borderColor: "rgba(35,82,240,0.2)" }
          }
        >
          {/* Vencedor */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
              <Trophy size={12} className="text-wc-gold" />
              Vencedor do Torneio
            </label>
            <div className="relative">
              <select
                disabled={submitted}
                value={globalPred.tournament_winner}
                onChange={(e) => setGlobalPred((g) => ({ ...g, tournament_winner: e.target.value }))}
                className="w-full appearance-none rounded-xl border px-4 py-3 text-sm font-semibold transition-all outline-none pr-10"
                style={
                  submitted
                    ? { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "not-allowed" }
                    : { background: "rgba(35,82,240,0.15)", borderColor: "rgba(35,82,240,0.3)", color: globalPred.tournament_winner ? "#fff" : "rgba(255,255,255,0.3)" }
                }
              >
                <option value="" disabled>Escolhe uma seleção…</option>
                {WC2026_TEAMS.map((t) => (
                  <option key={t} value={t} style={{ background: "#0d1b3e", color: "#fff" }}>{t}</option>
                ))}
              </select>
              <ChevronRight
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
                style={{ color: submitted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)" }}
              />
            </div>
          </div>

          {/* Melhor marcador */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
              <Trophy size={12} className="text-wc-electric" />
              Melhor Marcador
            </label>
            <input
              type="text"
              disabled={submitted}
              value={globalPred.top_scorer}
              onChange={(e) => setGlobalPred((g) => ({ ...g, top_scorer: e.target.value }))}
              placeholder="Nome do jogador…"
              className="w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-all outline-none"
              style={
                submitted
                  ? { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "not-allowed" }
                  : { background: "rgba(35,82,240,0.15)", borderColor: globalPred.top_scorer ? "rgba(35,82,240,0.5)" : "rgba(35,82,240,0.3)", color: "#fff" }
              }
            />
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 backdrop-blur-md" style={{ background: "rgba(6,13,30,0.97)" }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          {submitted ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-wc-green shrink-0" />
                <span className="text-sm font-bold text-wc-white">Previsões submetidas</span>
                <span className="text-xs text-wc-white/30">· modo leitura</span>
              </div>
              <Link href="/"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-wc-dark transition-all"
                style={{ background: "linear-gradient(135deg, #f5c300, #ffd93d)" }}>
                Classificação
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 text-sm text-wc-red mb-3 border border-wc-red/30 rounded-xl px-3 py-2"
                  style={{ background: "rgba(230,51,18,0.1)" }}>
                  <AlertCircle size={14} className="shrink-0" />{error}
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full py-3.5 disabled:text-wc-white/20 font-bold rounded-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base text-wc-dark"
                style={
                  canSubmit && !submitting
                    ? { background: "linear-gradient(135deg, #f5c300, #ffd93d)" }
                    : { background: "rgba(255,255,255,0.08)" }
                }
              >
                {submitting ? (
                  <><Loader2 size={20} className="animate-spin text-wc-dark" /> A guardar...</>
                ) : canSubmit ? (
                  <><Trophy size={20} /> Submeter Previsões</>
                ) : (
                  <span className="text-wc-white/30">
                    {openGroupMatches.length - completionCount > 0
                      ? `Preenche todos os jogos (${openGroupMatches.length - completionCount} em falta)`
                      : "Preenche o vencedor e melhor marcador"}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
