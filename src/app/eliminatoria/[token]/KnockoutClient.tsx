"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Match, User } from "@/types";
import MatchCard from "@/components/MatchCard";
import { PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
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

interface Props { token: string; }

export default function KnockoutClient({ token }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, PredictionState>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const userRes = await fetch(`/api/user?token=${token}`);
        if (!userRes.ok) { router.push("/"); return; }
        const { user: u } = await userRes.json();
        setUser(u);

        const phaseRes = await fetch("/api/admin/knockout-phase");
        const { phase } = await phaseRes.json();
        setOpenPhase(phase);
        if (!phase) { setLoading(false); return; }

        const matchRes = await fetch("/api/matches");
        const allMatches: Match[] = await matchRes.json();
        const phaseMatches = allMatches.filter((m) => m.phase === phase);
        setMatches(phaseMatches);

        const predRes = await fetch(`/api/predictions/knockout?token=${token}&phase=${phase}`);
        const existingPreds = predRes.ok ? await predRes.json() : [];

        if (Array.isArray(existingPreds) && existingPreds.length > 0) {
          setSubmitted(true);
          return;
        }

        const init: Record<string, PredictionState> = {};
        phaseMatches.forEach((m) => { init[m.id] = { home_goals: "", away_goals: "", bet_1x2: "", bet_1x2_manual: false }; });
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
    }, []
  );

  const updateBet = useCallback(
    (matchId: string, value: "1" | "x" | "2") => {
      setPredictions((prev) => ({
        ...prev,
        [matchId]: { ...prev[matchId], bet_1x2: value, bet_1x2_manual: true },
      }));
    }, []
  );

  const openMatches = matches.filter((m) => m.status !== "finished" && m.status !== "live");

  const completionCount = openMatches.filter((m) => {
    const p = predictions[m.id];
    return p?.home_goals !== "" && p?.away_goals !== "" && p?.bet_1x2 !== "";
  }).length;

  const canSubmit = completionCount === openMatches.length && openMatches.length > 0;

  async function handleSubmit() {
    if (!openPhase) return;
    setSubmitting(true);
    setError("");

    const rows = openMatches.map((m) => {
      const p = predictions[m.id];
      return {
        match_id: m.id,
        home_goals: parseInt(p?.home_goals ?? "0") || 0,
        away_goals: parseInt(p?.away_goals ?? "0") || 0,
        bet_1x2: p?.bet_1x2 || null,
      };
    });

    try {
      const res = await fetch("/api/predictions/knockout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, phase: openPhase, predictions: rows }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erro ao submeter."); return; }
      setSubmitted(true);
    } catch {
      setError("Erro de ligação.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="text-wc-gold animate-spin" />
    </div>
  );

  if (!openPhase) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <Lock size={48} className="mx-auto text-wc-white/20 mb-4" />
        <h2 className="text-xl font-bold text-wc-white mb-2">Previsões bloqueadas</h2>
        <p className="text-sm text-wc-white/40 mb-6 leading-relaxed">
          O admin ainda não abriu a próxima fase eliminatória.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-wc-gold text-sm">
          <ArrowLeft size={16} /> Ver classificação
        </Link>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <CheckCircle2 size={56} className="mx-auto text-wc-gold mb-5" />
        <h2 className="text-2xl font-bold text-wc-white mb-2">
          {PHASE_LABELS[openPhase] ?? "Eliminatórias"} submetidas!
        </h2>
        <p className="text-sm text-wc-white/50 mb-6">
          Previsões guardadas, {user?.name}. Aguarda o próximo link.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 bg-wc-gold hover:bg-wc-gold-light text-wc-dark font-bold px-6 py-3 rounded-xl transition-all">
          <Trophy size={18} /> Ver Classificação
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-0 z-50 border-b border-wc-blue-mid/40 backdrop-blur-md" style={{ background: "rgba(6,14,26,0.95)" }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-wc-white/40 hover:text-wc-white p-1"><ArrowLeft size={18} /></Link>
            <div>
              <p className="text-sm font-bold text-wc-white">{user?.name}</p>
              <p className="text-xs text-wc-white/30">{PHASE_LABELS[openPhase] ?? "Eliminatórias"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-wc-white/30">Em falta</p>
            <p className="text-sm font-bold text-wc-gold tabular-nums">
              {openMatches.length - completionCount}/{openMatches.length}
            </p>
          </div>
        </div>
        <div className="h-0.5 bg-wc-blue-mid/30">
          <div className="h-full bg-wc-gold transition-all duration-300"
            style={{ width: openMatches.length > 0 ? `${(completionCount / openMatches.length) * 100}%` : "0%" }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Swords size={18} className="text-wc-gold" />
          <h1 className="text-lg font-bold text-wc-white">{PHASE_LABELS[openPhase] ?? "Eliminatórias"}</h1>
          <span className="text-xs text-wc-white/30 ml-auto">{openMatches.length} jogos</span>
        </div>

        <div className="bg-wc-blue-mid/20 border border-wc-blue-mid/30 rounded-xl px-4 py-3 mb-4 text-xs text-wc-white/40 leading-relaxed">
          O resultado refere-se ao fim dos 90 min (ou prolongamento). A aposta 1X2 indica quem avança — podes prever empate no marcador mas apostar na vitória de uma equipa via penáltis.
        </div>

        <div className="space-y-3">
          {matches.map((match) => {
            const pred = predictions[match.id] ?? { home_goals: "", away_goals: "", bet_1x2: "", bet_1x2_manual: false };
            const locked = match.status === "finished" || match.status === "live";
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-wc-blue-mid/40 backdrop-blur-md" style={{ background: "rgba(6,14,26,0.97)" }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-wc-red mb-3 bg-wc-red/10 border border-wc-red/30 rounded-xl px-3 py-2">
              <AlertCircle size={14} className="shrink-0" />{error}
            </div>
          )}
          <button onClick={handleSubmit} disabled={!canSubmit || submitting}
            className={cn(
              "w-full py-3.5 font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base",
              canSubmit && !submitting
                ? "bg-wc-gold hover:bg-wc-gold-light text-wc-dark"
                : "bg-wc-blue-mid/40 text-wc-white/20 cursor-not-allowed"
            )}>
            {submitting ? <><Loader2 size={20} className="animate-spin" /> A guardar...</> :
              canSubmit ? <><Trophy size={20} /> Submeter Previsões</> :
              `Preenche todos os jogos (${openMatches.length - completionCount} em falta)`}
          </button>
        </div>
      </div>
    </div>
  );
}
