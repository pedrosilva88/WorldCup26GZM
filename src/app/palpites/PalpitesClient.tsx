"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Match } from "@/types";
import MatchCard from "@/components/MatchCard";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import { Trophy, Star, ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  total_points: number;
}

interface PredEntry {
  match_id: string;
  home_goals: number | null;
  away_goals: number | null;
  prediction_1x2: string | null;
  points_earned: number | null;
}

interface GlobalPred {
  top_scorer: string;
  tournament_winner: string;
}

export default function PalpitesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [users, setUsers] = useState<LeaderboardEntry[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(searchParams.get("user") ?? "");
  const [activeGroup, setActiveGroup] = useState("A");
  const [matches, setMatches] = useState<Match[]>([]);
  const [predMap, setPredMap] = useState<Record<string, PredEntry>>({});
  const [globalPred, setGlobalPred] = useState<GlobalPred | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data: LeaderboardEntry[]) => setUsers(data));
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    setLoading(true);
    fetch(`/api/palpites?user_id=${selectedUserId}`)
      .then((r) => r.json())
      .then((data) => {
        setMatches(data.matches ?? []);
        const map: Record<string, PredEntry> = {};
        for (const p of (data.predictions ?? []) as PredEntry[]) {
          map[p.match_id] = p;
        }
        setPredMap(map);
        setGlobalPred(data.global ?? null);
      })
      .finally(() => setLoading(false));

    router.replace(`/palpites?user=${selectedUserId}`, { scroll: false });
  }, [selectedUserId, router]);

  const selectedUser = users.find((u) => u.user_id === selectedUserId);
  const groupMatches = (g: string) => matches.filter((m) => m.phase === "group" && m.group === g);

  return (
    <div className="min-h-screen pb-16">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(6,13,30,0.96)" }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-wc-white/40 hover:text-wc-white transition-colors p-1">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="text-sm font-bold text-wc-white leading-tight">
                {selectedUser?.user_name ?? "Palpites"}
              </p>
              <p className="text-xs text-wc-white/30">Previsões · Fase de Grupos</p>
            </div>
          </div>
          {selectedUser && (
            <div className="text-right">
              <p className="text-xs text-wc-white/30">Pontos</p>
              <p className="font-display text-xl text-wc-gold tabular-nums">{selectedUser.total_points}</p>
            </div>
          )}
        </div>

        {/* Group tabs */}
        {selectedUserId && (
          <div className="flex overflow-x-auto scrollbar-none px-4 gap-1 py-2">
            {GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeGroup === g
                    ? "text-wc-dark"
                    : "text-wc-white/50 hover:text-wc-white"
                )}
                style={
                  activeGroup === g
                    ? { background: "linear-gradient(135deg, #f5c300, #ffd93d)" }
                    : { background: "rgba(255,255,255,0.05)" }
                }
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-6">
        {/* User selector */}
        <div className="relative">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full appearance-none rounded-xl border px-4 py-3.5 text-sm font-semibold outline-none transition-all"
            style={{
              background: "rgba(35,82,240,0.1)",
              borderColor: selectedUserId ? "rgba(35,82,240,0.4)" : "rgba(255,255,255,0.1)",
              color: selectedUserId ? "#fff" : "rgba(255,255,255,0.35)",
              textAlignLast: "center",
            }}
          >
            <option value="">Escolhe um participante…</option>
            {users.map((u) => (
              <option key={u.user_id} value={u.user_id} style={{ background: "#0d1b3e", color: "#fff" }}>
                {u.user_name} · {u.total_points} pts
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-wc-white/30" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!selectedUserId && !loading && (
          <p className="text-center py-12 text-sm text-wc-white/20">
            Escolhe um participante para ver os seus palpites
          </p>
        )}

        {/* Match predictions */}
        {selectedUserId && !loading && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">
                  {PHASE_LABELS.group}
                </span>
                <span className="font-display text-wc-gold text-lg tracking-wider">
                  GRUPO {activeGroup}
                </span>
              </div>

              <div className="space-y-3">
                {groupMatches(activeGroup).map((match) => {
                  const pred = predMap[match.id];
                  const pts = pred?.points_earned ?? 0;
                  const finished = match.status === "finished";

                  return (
                    <div key={match.id} className="relative">
                      <MatchCard
                        match={match}
                        home_goals={pred ? String(pred.home_goals ?? "") : ""}
                        away_goals={pred ? String(pred.away_goals ?? "") : ""}
                        bet_1x2={pred?.prediction_1x2 ?? ""}
                        disabled
                        onChange={() => {}}
                        showResult
                      />
                      {finished && pred && (
                        <div
                          className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={
                            pts > 0
                              ? { background: "rgba(245,195,0,0.2)", color: "#f5c300", border: "1px solid rgba(245,195,0,0.3)" }
                              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.08)" }
                          }
                        >
                          {pts} pts
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Global predictions */}
            {globalPred && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-wc-white/25">Previsões</span>
                  <span className="font-display text-wc-gold text-lg tracking-wider">TORNEIO</span>
                </div>
                <div
                  className="rounded-2xl border p-5 space-y-4"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
                      <Trophy size={12} className="text-wc-gold" />
                      Vencedor
                    </div>
                    <span className="text-sm font-bold text-wc-white">{globalPred.tournament_winner || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
                      <Star size={12} className="text-wc-electric" />
                      Melhor Marcador
                    </div>
                    <span className="text-sm font-bold text-wc-white">{globalPred.top_scorer || "—"}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
