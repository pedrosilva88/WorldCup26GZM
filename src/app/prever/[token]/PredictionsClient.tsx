"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Match, User } from "@/types";
import MatchCard from "@/components/MatchCard";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { Phase } from "@/types";
import { cn } from "@/lib/utils";
import {
  Trophy,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Lock,
  Swords,
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
  const [globalLocked, setGlobalLocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<"grupos" | "eliminatoria">("grupos");
  const [activeKOPhase, setActiveKOPhase] = useState<Phase>("round_of_32");
  const [savingKO, setSavingKO] = useState(false);
  const [saveKOSuccess, setSaveKOSuccess] = useState(false);
  const [errorKO, setErrorKO] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const [userRes, matchRes] = await Promise.all([
          fetch(`/api/user?token=${token}`),
          fetch("/api/matches"),
        ]);

        if (!userRes.ok) { router.push("/"); return; }

        const { user: u } = await userRes.json();
        const matchData: Match[] = await matchRes.json();

        setUser(u);
        setMatches(matchData);

        // Load existing predictions
        const predRes = await fetch(`/api/user-predictions?token=${token}`);
        const predData = predRes.ok ? await predRes.json() : { predictions: [], global: null };
        const existingPreds: Array<{ match_id: string; home_goals: number | null; away_goals: number | null; prediction_1x2: string | null }> =
          predData.predictions ?? [];

        if (predData.global) {
          setGlobalPred({
            top_scorer: predData.global.top_scorer ?? "",
            tournament_winner: predData.global.tournament_winner ?? "",
          });
          if (predData.global.top_scorer && predData.global.tournament_winner) {
            setGlobalLocked(true);
          }
        }

        const predMap: Record<string, PredictionState> = {};
        existingPreds.forEach((p) => {
          predMap[p.match_id] = {
            home_goals: p.home_goals !== null ? String(p.home_goals) : "",
            away_goals: p.away_goals !== null ? String(p.away_goals) : "",
            bet_1x2: p.prediction_1x2 ?? "",
            bet_1x2_manual: !!p.prediction_1x2,
          };
        });

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

  const LOCK_OFFSET_MS = 2 * 60 * 60 * 1000;

  const isMatchLocked = useCallback((match: Match): boolean => {
    if (match.status === "finished" || match.status === "live") return true;
    if (!match.match_date) return false;
    return Date.now() >= new Date(match.match_date).getTime() - LOCK_OFFSET_MS;
  }, []);

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

  // All open (editable) matches
  const openMatches = matches.filter((m) => m.phase === "group" && !isMatchLocked(m));

  const completionCount = openMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.home_goals !== "" && p?.away_goals !== "" && p?.bet_1x2 !== "";
  }).length;

  const globalFilled = globalLocked || (globalPred.top_scorer.trim() !== "" && globalPred.tournament_winner !== "");
  const canSave = completionCount === openMatches.length && openMatches.length > 0 && globalFilled;
  const hasOpenMatches = openMatches.length > 0;

  const groupCompletion = (group: string) => {
    const open = groupMatches(group).filter((m) => !isMatchLocked(m));
    const filled = open.filter((m) => {
      const p = predictions[m.id];
      return p?.home_goals !== "" && p?.away_goals !== "" && p?.bet_1x2 !== "";
    }).length;
    return { filled, total: open.length };
  };


  const KO_PHASES: Phase[] = ["round_of_32", "round_of_16", "quarter_final", "semi_final", "third_place", "final"];
  const isPlaceholder = (m: { home_team: string; away_team: string }) =>
    m.home_team.endsWith("Team A") || m.away_team.endsWith("Team B");

  const koMatches = matches.filter((m) => m.phase !== "group");
  const koPhases = KO_PHASES.filter((p) => koMatches.some((m) => m.phase === p));
  const editableKOMatches = koMatches.filter((m) => !isMatchLocked(m) && !isPlaceholder(m));
  const filledKOCount = editableKOMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.home_goals !== "" && p?.away_goals !== "";
  }).length;

  async function handleSaveKO() {
    setSavingKO(true);
    setErrorKO("");
    setSaveKOSuccess(false);

    const rows = editableKOMatches
      .filter((m) => {
        const p = predictions[m.id];
        return p?.home_goals !== "" && p?.away_goals !== "";
      })
      .map((m) => {
        const p = predictions[m.id];
        const h = parseInt(p.home_goals);
        const a = parseInt(p.away_goals);
        return { match_id: m.id, home_goals: isNaN(h) ? 0 : h, away_goals: isNaN(a) ? 0 : a, bet_1x2: null };
      });

    if (rows.length === 0) {
      setErrorKO("Preenche pelo menos um jogo.");
      setSavingKO(false);
      return;
    }

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, predictions: rows }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorKO(data.error ?? "Erro ao guardar."); return; }
      setSaveKOSuccess(true);
      setTimeout(() => setSaveKOSuccess(false), 3000);
    } catch {
      setErrorKO("Erro de ligação. Verifica a tua internet.");
    } finally {
      setSavingKO(false);
    }
  }

  async function handleSave() {
    setSubmitting(true);
    setError("");
    setSaveSuccess(false);

    const rows = openMatches.map((m) => {
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
      if (!res.ok) { setError(data.error ?? "Erro ao guardar."); return; }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
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
      <div className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(12,15,19,0.96)" }}>
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
          {hasOpenMatches ? (
            <div className="text-right">
              <p className="text-xs text-wc-white/30">Em falta</p>
              <p className="font-display text-xl text-wc-gold tabular-nums">
                {openMatches.length - completionCount}/{openMatches.length}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-wc-white/30">
              <Lock size={12} />
              Todas encerradas
            </div>
          )}
        </div>

        {/* Section tabs */}
        <div className="flex px-4 gap-2 pb-2">
          {[
            { key: "grupos", label: "GRUPOS" },
            { key: "eliminatoria", label: "ELIMINATÓRIA", disabled: koPhases.length === 0 },
          ].map(({ key, label, disabled }) => (
            <button
              key={key}
              disabled={disabled}
              onClick={() => setActiveSection(key as "grupos" | "eliminatoria")}
              className="px-3 py-1 rounded-lg text-xs font-black tracking-widest transition-all disabled:opacity-25 disabled:cursor-not-allowed"
              style={
                activeSection === key
                  ? { background: "linear-gradient(135deg, #e9b13a, #f2c56a)", color: "#0c0f13" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Progress bar — grupos only */}
        {activeSection === "grupos" && hasOpenMatches && (
          <div className="h-0.5" style={{ background: "rgba(233,177,58,0.15)" }}>
            <div className="h-full transition-all duration-300"
              style={{ background: "linear-gradient(90deg, #1fa45f, #e9b13a)", width: `${(completionCount / openMatches.length) * 100}%` }} />
          </div>
        )}

        {/* Group tabs — grupos only */}
        {activeSection === "grupos" && <div className="flex overflow-x-auto scrollbar-none px-4 gap-1 py-2">
          {GROUPS.map((g) => {
            const { filled, total } = groupCompletion(g);
            const allDone = total === 0 || filled === total;
            return (
              <button key={g} onClick={() => setActiveGroup(g)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeGroup === g
                    ? "text-wc-dark"
                    : allDone
                    ? "text-wc-green border border-wc-green/30"
                    : "text-wc-white/50 hover:text-wc-white border border-transparent"
                )}
                style={
                  activeGroup === g
                    ? { background: "linear-gradient(135deg, #e9b13a, #f2c56a)" }
                    : allDone
                    ? { background: "rgba(0,166,82,0.1)" }
                    : { background: "rgba(255,255,255,0.05)" }
                }>
                {g}
                {total > 0 && !allDone && <span className="ml-1 opacity-60">{filled}/{total}</span>}
                {allDone && <span className="ml-1">✓</span>}
              </button>
            );
          })}
        </div>}
      </div>

      {/* ── Grupos ─────────────────────────────────────────────────────────── */}
      {activeSection === "eliminatoria" && (
        <div className="max-w-2xl mx-auto pb-32">
          {/* KO phase sub-tabs */}
          <div className="flex overflow-x-auto scrollbar-none px-4 gap-1 py-2 border-b border-white/5">
            {KO_PHASES.map((phase) => {
              const hasMatches = koMatches.some((m) => m.phase === phase);
              const shortLabel: Record<string, string> = {
                round_of_32: "16 Avos",
                round_of_16: "Oitavos",
                quarter_final: "Quartos",
                semi_final: "Meias",
                third_place: "3º Lugar",
                final: "Final",
              };
              return (
                <button
                  key={phase}
                  onClick={() => setActiveKOPhase(phase)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={
                    activeKOPhase === phase
                      ? { background: "linear-gradient(135deg, #e9b13a, #f2c56a)", color: "#0c0f13" }
                      : hasMatches
                      ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }
                      : { background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.2)" }
                  }
                >
                  {shortLabel[phase]}
                </button>
              );
            })}
          </div>

          {/* Phase content */}
          <div className="px-4 pt-4">
            {(() => {
              const phaseMatches = koMatches.filter((m) => m.phase === activeKOPhase);
              if (phaseMatches.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Swords size={28} className="text-wc-white/10" />
                    <p className="text-sm text-wc-white/25 text-center">
                      {PHASE_LABELS[activeKOPhase]} ainda não gerada.
                    </p>
                  </div>
                );
              }
              return (
                <div className="space-y-3">
                  {phaseMatches.map((match) => {
                    const pred = predictions[match.id] ?? { home_goals: "", away_goals: "", bet_1x2: "", bet_1x2_manual: false };
                    const locked = isMatchLocked(match);
                    const placeholder = isPlaceholder(match);
                    return (
                      <MatchCard
                        key={match.id}
                        match={match}
                        home_goals={pred.home_goals}
                        away_goals={pred.away_goals}
                        disabled={locked || placeholder}
                        onChange={(field, value) => updatePrediction(match.id, field, value)}
                        showResult={locked}
                      />
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeSection === "grupos" && (
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">
              {PHASE_LABELS.group}
            </span>
            <span className="font-display text-wc-gold text-lg tracking-wider">GRUPO {activeGroup}</span>
          </div>
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
      )}

      {/* Global predictions — grupos only */}
      {activeSection === "grupos" && <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">Previsões</span>
          <span className="font-display text-wc-gold text-lg tracking-wider">TORNEIO</span>
        </div>
        <div
          className="rounded-2xl border p-5 space-y-5"
          style={{ background: "rgba(35,82,240,0.06)", borderColor: "rgba(35,82,240,0.2)" }}
        >
          {globalLocked && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase" style={{ color: "#555" }}>
              <Lock size={10} />
              Bloqueado — não pode ser alterado
            </div>
          )}

          {/* Vencedor */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
              <Trophy size={12} className="text-wc-gold" />
              Vencedor do Torneio
            </label>
            {globalLocked ? (
              <div className="rounded-xl border px-4 py-3 text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", color: "#fff" }}>
                {globalPred.tournament_winner}
              </div>
            ) : (
              <div className="relative">
                <select
                  value={globalPred.tournament_winner}
                  onChange={(e) => setGlobalPred((g) => ({ ...g, tournament_winner: e.target.value }))}
                  className="w-full appearance-none rounded-xl border px-4 py-3 text-sm font-semibold transition-all outline-none pr-10"
                  style={{ background: "rgba(35,82,240,0.15)", borderColor: "rgba(35,82,240,0.3)", color: globalPred.tournament_winner ? "#fff" : "rgba(255,255,255,0.3)" }}
                >
                  <option value="" disabled>Escolhe uma seleção…</option>
                  {WC2026_TEAMS.map((t) => (
                    <option key={t} value={t} style={{ background: "#0d1b3e", color: "#fff" }}>{t}</option>
                  ))}
                </select>
                <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }} />
              </div>
            )}
          </div>

          {/* Melhor marcador */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
              <Trophy size={12} className="text-wc-electric" />
              Melhor Marcador
            </label>
            {globalLocked ? (
              <div className="rounded-xl border px-4 py-3 text-sm font-semibold"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", color: "#fff" }}>
                {globalPred.top_scorer}
              </div>
            ) : (
              <input
                type="text"
                value={globalPred.top_scorer}
                onChange={(e) => setGlobalPred((g) => ({ ...g, top_scorer: e.target.value }))}
                placeholder="Nome do jogador…"
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-all outline-none"
                style={{ background: "rgba(35,82,240,0.15)", borderColor: globalPred.top_scorer ? "rgba(35,82,240,0.5)" : "rgba(35,82,240,0.3)", color: "#fff" }}
              />
            )}
          </div>
        </div>
      </div>}

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 backdrop-blur-md" style={{ background: "rgba(12,15,19,0.97)" }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          {activeSection === "grupos" ? (
            !hasOpenMatches ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-wc-white/30 shrink-0" />
                  <span className="text-sm text-wc-white/40">Jornadas encerradas</span>
                </div>
                <Link href="/"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg text-wc-dark"
                  style={{ background: "linear-gradient(135deg, #e9b13a, #f2c56a)" }}>
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
                  onClick={handleSave}
                  disabled={!canSave || submitting}
                  className="w-full py-3.5 disabled:text-wc-white/20 font-bold rounded-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base text-wc-dark"
                  style={canSave && !submitting ? { background: "linear-gradient(135deg, #e9b13a, #f2c56a)" } : { background: "rgba(255,255,255,0.08)" }}
                >
                  {submitting ? (
                    <><Loader2 size={20} className="animate-spin text-wc-dark" /> A guardar...</>
                  ) : saveSuccess ? (
                    <><CheckCircle2 size={20} className="text-wc-green" /> <span className="text-wc-white">Guardado!</span></>
                  ) : canSave ? (
                    <><Trophy size={20} /> Guardar Palpites</>
                  ) : (
                    <span className="text-wc-white/30">
                      {openMatches.length - completionCount > 0
                        ? `Preenche todos os jogos (${openMatches.length - completionCount} em falta)`
                        : "Preenche o vencedor e melhor marcador"}
                    </span>
                  )}
                </button>
              </>
            )
          ) : (
            <>
              {errorKO && (
                <div className="flex items-center gap-2 text-sm text-wc-red mb-3 border border-wc-red/30 rounded-xl px-3 py-2"
                  style={{ background: "rgba(230,51,18,0.1)" }}>
                  <AlertCircle size={14} className="shrink-0" />{errorKO}
                </div>
              )}
              <button
                onClick={handleSaveKO}
                disabled={filledKOCount === 0 || savingKO}
                className="w-full py-3.5 disabled:text-wc-white/20 font-bold rounded-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base text-wc-dark"
                style={filledKOCount > 0 && !savingKO ? { background: "linear-gradient(135deg, #e9b13a, #f2c56a)" } : { background: "rgba(255,255,255,0.08)" }}
              >
                {savingKO ? (
                  <><Loader2 size={20} className="animate-spin text-wc-dark" /> A guardar...</>
                ) : saveKOSuccess ? (
                  <><CheckCircle2 size={20} className="text-wc-green" /> <span className="text-wc-white">Guardado!</span></>
                ) : filledKOCount > 0 ? (
                  <><Swords size={20} /> Guardar Eliminatória ({filledKOCount})</>
                ) : (
                  <span className="text-wc-white/30">Preenche pelo menos um jogo</span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
