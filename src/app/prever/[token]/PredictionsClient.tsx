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
}

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

        if (has_predictions) { setSubmitted(true); return; }

        // Load any pre-filled predictions (admin-entered for past matches)
        const predRes = await fetch(`/api/user-predictions?token=${token}`);
        const existingPreds: Array<{ match_id: string; home_goals: number | null; away_goals: number | null }> =
          predRes.ok ? await predRes.json() : [];

        const predMap: Record<string, PredictionState> = {};
        existingPreds.forEach((p) => {
          predMap[p.match_id] = {
            home_goals: p.home_goals !== null ? String(p.home_goals) : "",
            away_goals: p.away_goals !== null ? String(p.away_goals) : "",
          };
        });

        // Init all matches (use pre-filled where available)
        const init: Record<string, PredictionState> = {};
        matchData.forEach((m: Match) => {
          init[m.id] = predMap[m.id] ?? { home_goals: "", away_goals: "" };
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
      setPredictions((prev) => ({ ...prev, [matchId]: { ...prev[matchId], [field]: value } }));
    },
    []
  );

  const groupMatches = (group: string) =>
    matches.filter((m) => m.phase === "group" && m.group === group);

  const isMatchLocked = (match: Match) =>
    match.status === "finished" || match.status === "live";

  const openGroupMatches = matches.filter(
    (m) => m.phase === "group" && !isMatchLocked(m)
  );

  const completionCount = openGroupMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.home_goals !== "" && p?.away_goals !== "";
  }).length;

  const canSubmit = completionCount === openGroupMatches.length && openGroupMatches.length > 0;

  const groupCompletion = (group: string) => {
    const open = groupMatches(group).filter((m) => !isMatchLocked(m));
    const filled = open.filter((m) => {
      const p = predictions[m.id];
      return p?.home_goals !== "" && p?.away_goals !== "";
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
      };
    });

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, predictions: rows }),
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

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <CheckCircle2 size={56} className="mx-auto text-wc-gold mb-5" />
          <h2 className="font-display text-3xl text-wc-white tracking-wider mb-2">PREVISÕES SUBMETIDAS!</h2>
          <p className="text-sm text-wc-white/50 mb-6 leading-relaxed">
            As tuas previsões foram guardadas, {user?.name}.
            <br />
            Acompanha a classificação na página principal.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all text-wc-dark"
            style={{ background: "linear-gradient(135deg, #f5c300, #ffd93d)" }}>
            <Trophy size={18} />
            Ver Classificação
          </Link>
        </div>
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
            const pred = predictions[match.id] ?? { home_goals: "", away_goals: "" };
            const locked = isMatchLocked(match);
            return (
              <MatchCard
                key={match.id}
                match={match}
                home_goals={pred.home_goals}
                away_goals={pred.away_goals}
                disabled={locked}
                onChange={(field, value) => updatePrediction(match.id, field, value)}
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

      {/* Sticky submit */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 backdrop-blur-md" style={{ background: "rgba(6,13,30,0.97)" }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
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
              <span className="text-wc-white/30">{`Preenche todos os jogos (${openGroupMatches.length - completionCount} em falta)`}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
