"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Match, Prediction1x2, User } from "@/types";
import MatchCard from "@/components/MatchCard";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
  ChevronDown,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface PredictionState {
  prediction_1x2: Prediction1x2 | null;
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

        if (!userRes.ok) {
          router.push("/");
          return;
        }

        const { user: u, has_predictions } = await userRes.json();
        const matchData: Match[] = await matchRes.json();

        setUser(u);
        setMatches(matchData);

        if (has_predictions) {
          setSubmitted(true);
        }

        // Initialize prediction state
        const init: Record<string, PredictionState> = {};
        matchData.forEach((m: Match) => {
          init[m.id] = { prediction_1x2: null, home_goals: "", away_goals: "" };
        });
        setPredictions(init);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [token, router]);

  const updatePrediction = useCallback(
    (matchId: string, field: "prediction_1x2" | "home_goals" | "away_goals", value: string) => {
      setPredictions((prev) => ({
        ...prev,
        [matchId]: { ...prev[matchId], [field]: field === "prediction_1x2" ? (value as Prediction1x2) : value },
      }));
    },
    []
  );

  const groupMatches = (group: string) =>
    matches.filter((m) => m.phase === "group" && m.group === group);

  const isMatchDisabled = (match: Match) =>
    match.status === "finished" || match.status === "live";

  const openGroupMatches = matches.filter(
    (m) => m.phase === "group" && !isMatchDisabled(m)
  );

  const completionCount = openGroupMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.prediction_1x2 && p.home_goals !== "" && p.away_goals !== "";
  }).length;

  const canSubmit = completionCount === openGroupMatches.length && openGroupMatches.length > 0;

  const groupCompletion = (group: string) => {
    const gm = groupMatches(group).filter((m) => !isMatchDisabled(m));
    const filled = gm.filter((m) => {
      const p = predictions[m.id];
      return p?.prediction_1x2 && p.home_goals !== "" && p.away_goals !== "";
    }).length;
    return { filled, total: gm.length };
  };

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const rows = openGroupMatches
      .map((m) => {
        const p = predictions[m.id];
        return {
          match_id: m.id,
          prediction_1x2: p?.prediction_1x2,
          home_goals: parseInt(p?.home_goals ?? "0"),
          away_goals: parseInt(p?.away_goals ?? "0"),
        };
      })
      .filter((p) => p.prediction_1x2);

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, predictions: rows }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao submeter. Tenta novamente.");
        return;
      }

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
          <h2 className="text-2xl font-bold text-wc-white mb-2">Previsões submetidas!</h2>
          <p className="text-wc-white/50 text-sm mb-6 leading-relaxed">
            As tuas previsões foram guardadas, {user?.name}.
            <br />
            Acompanha a classificação na página principal.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-wc-gold hover:bg-wc-gold-light text-wc-dark font-bold px-6 py-3 rounded-xl transition-all"
          >
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
      <div
        className="sticky top-0 z-50 border-b border-wc-blue-mid/40 backdrop-blur-md"
        style={{ background: "rgba(6,14,26,0.95)" }}
      >
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
            <p className="text-xs text-wc-white/30">Preenchido</p>
            <p className="text-sm font-bold text-wc-gold tabular-nums">
              {completionCount}/{openGroupMatches.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-wc-blue-mid/30">
          <div
            className="h-full bg-wc-gold transition-all duration-300"
            style={{ width: openGroupMatches.length > 0 ? `${(completionCount / openGroupMatches.length) * 100}%` : "0%" }}
          />
        </div>

        {/* Group tabs */}
        <div className="flex overflow-x-auto scrollbar-none px-4 gap-1 py-2">
          {GROUPS.map((g) => {
            const { filled, total } = groupCompletion(g);
            const allDone = total > 0 && filled === total;
            const hasFinished = groupMatches(g).some((m) => isMatchDisabled(m));
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeGroup === g
                    ? "bg-wc-gold text-wc-dark"
                    : allDone
                    ? "bg-wc-blue-mid/40 text-emerald-400 border border-emerald-400/30"
                    : "bg-wc-blue-mid/20 text-wc-white/50 hover:text-wc-white"
                )}
              >
                {g}
                {total > 0 && !allDone && (
                  <span className="ml-1 opacity-60">{filled}/{total}</span>
                )}
                {allDone && <span className="ml-1">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matches for active group */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-wc-white/30">
            {PHASE_LABELS.group}
          </span>
          <span className="text-wc-gold font-bold">Grupo {activeGroup}</span>
        </div>

        <div className="space-y-3">
          {groupMatches(activeGroup).map((match) => {
            const pred = predictions[match.id] ?? { prediction_1x2: null, home_goals: "", away_goals: "" };
            const disabled = isMatchDisabled(match);

            return (
              <MatchCard
                key={match.id}
                match={match}
                prediction_1x2={pred.prediction_1x2}
                home_goals={pred.home_goals}
                away_goals={pred.away_goals}
                disabled={disabled}
                onChange={(field, value) => updatePrediction(match.id, field, value)}
                showResult={disabled}
              />
            );
          })}
        </div>

        {/* Next group button */}
        {activeGroup !== "L" && (
          <button
            onClick={() => {
              const idx = GROUPS.indexOf(activeGroup);
              if (idx < GROUPS.length - 1) setActiveGroup(GROUPS[idx + 1]);
            }}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-sm text-wc-white/40 hover:text-wc-gold transition-colors border border-wc-blue-mid/20 rounded-xl hover:border-wc-gold/20"
          >
            Grupo {GROUPS[GROUPS.indexOf(activeGroup) + 1]}
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Sticky bottom submit bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-wc-blue-mid/40 backdrop-blur-md"
        style={{ background: "rgba(6,14,26,0.97)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-wc-red mb-3 bg-wc-red/10 border border-wc-red/30 rounded-xl px-3 py-2">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="w-full h-13 py-3.5 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-blue-mid/40 text-wc-dark disabled:text-wc-white/20 font-bold rounded-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                A guardar...
              </>
            ) : canSubmit ? (
              <>
                <Trophy size={20} />
                Submeter Previsões
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                Preenche todos os jogos ({openGroupMatches.length - completionCount} em falta)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
