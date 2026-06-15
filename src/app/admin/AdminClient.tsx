"use client";

import { useEffect, useState, useCallback } from "react";
import { Match, User } from "@/types";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import {
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trophy,
  Users,
  Copy,
  Check,
  LogOut,
} from "lucide-react";

type AdminView = "results" | "users" | "settings";

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [view, setView] = useState<AdminView>("results");
  const [matches, setMatches] = useState<Match[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [activeGroup, setActiveGroup] = useState("A");
  const [resultInputs, setResultInputs] = useState<Record<string, { home: string; away: string }>>({});
  const [savingMatch, setSavingMatch] = useState<string | null>(null);
  const [savedMatch, setSavedMatch] = useState<string | null>(null);

  const [topScorerResult, setTopScorerResult] = useState("");
  const [winnerResult, setWinnerResult] = useState("");
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setLoginError("Password incorreta.");
      }
    } finally {
      setLoginLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  }

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [mRes, uRes] = await Promise.all([
        fetch("/api/admin/matches"),
        fetch("/api/leaderboard"),
      ]);
      const mData = await mRes.json();
      const uData = await uRes.json();
      setMatches(Array.isArray(mData) ? mData : []);
      setUsers(Array.isArray(uData) ? uData : []);

      const inputs: Record<string, { home: string; away: string }> = {};
      (Array.isArray(mData) ? mData : []).forEach((m: Match) => {
        inputs[m.id] = {
          home: m.home_score !== null ? String(m.home_score) : "",
          away: m.away_score !== null ? String(m.away_score) : "",
        };
      });
      setResultInputs(inputs);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  async function saveResult(matchId: string) {
    const inp = resultInputs[matchId];
    if (!inp || inp.home === "" || inp.away === "") return;

    setSavingMatch(matchId);
    try {
      await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match_id: matchId,
          home_score: parseInt(inp.home),
          away_score: parseInt(inp.away),
        }),
      });
      setSavedMatch(matchId);
      setTimeout(() => setSavedMatch(null), 2000);
      await loadData();
    } finally {
      setSavingMatch(null);
    }
  }

  async function saveGlobal() {
    setSavingGlobal(true);
    await fetch("/api/admin/results", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        top_scorer_result: topScorerResult || undefined,
        tournament_winner_result: winnerResult || undefined,
      }),
    });
    setSavingGlobal(false);
    await loadData();
  }

  async function syncApi() {
    setSyncing(true);
    setSyncMsg("");
    const res = await fetch("/api/admin/sync", { method: "POST" });
    const data = await res.json();
    setSyncMsg(data.error ?? `${data.synced} jogos sincronizados.`);
    setSyncing(false);
    await loadData();
  }

  async function copyLink(userId: string) {
    const res = await fetch(`/api/admin/generate-link?user_id=${userId}`);
    const data = await res.json();
    await navigator.clipboard.writeText(data.link);
    setCopiedLink(userId);
    setTimeout(() => setCopiedLink(null), 2000);
  }

  const groupMatches = (g: string) =>
    matches.filter((m) => m.phase === "group" && m.group === g);

  // ── LOGIN SCREEN ──────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Lock size={36} className="mx-auto text-wc-gold mb-3" />
            <h1 className="text-2xl font-bold text-wc-white">Área de Admin</h1>
            <p className="text-sm text-wc-white/40 mt-1">Mundial 2026 · GZM</p>
          </div>

          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full h-12 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all"
            />
            {loginError && (
              <p className="text-sm text-wc-red flex items-center gap-2">
                <AlertCircle size={14} />
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full h-12 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ADMIN DASHBOARD ───────────────────────────────────────
  return (
    <div className="min-h-screen pb-8">
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 border-b border-wc-blue-mid/40 backdrop-blur-md"
        style={{ background: "rgba(6,14,26,0.95)" }}
      >
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {(["results", "users", "settings"] as AdminView[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  view === v
                    ? "bg-wc-gold text-wc-dark"
                    : "text-wc-white/50 hover:text-wc-white"
                )}
              >
                {v === "results" ? "Resultados" : v === "users" ? "Utilizadores" : "Definições"}
              </button>
            ))}
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-wc-white/30 hover:text-wc-red transition-colors"
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {loadingData ? (
          <div className="flex justify-center py-16">
            <Loader2 size={28} className="text-wc-gold animate-spin" />
          </div>
        ) : (
          <>
            {/* ── RESULTS VIEW ── */}
            {view === "results" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-wc-white">Resultados dos Jogos</h2>
                  <button
                    onClick={syncApi}
                    disabled={syncing}
                    className="flex items-center gap-1.5 text-xs text-wc-gold border border-wc-gold/30 px-3 py-1.5 rounded-lg hover:bg-wc-gold/10 transition-all disabled:opacity-40"
                  >
                    <RefreshCw size={12} className={syncing ? "animate-spin" : ""} />
                    Sincronizar API
                  </button>
                </div>

                {syncMsg && (
                  <p className="text-xs text-wc-white/50 mb-4 bg-wc-blue-mid/20 px-3 py-2 rounded-lg">
                    {syncMsg}
                  </p>
                )}

                {/* Group tabs */}
                <div className="flex overflow-x-auto gap-1 mb-4 pb-1">
                  {GROUPS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setActiveGroup(g)}
                      className={cn(
                        "shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        activeGroup === g
                          ? "bg-wc-gold text-wc-dark"
                          : "bg-wc-blue-mid/20 text-wc-white/50 hover:text-wc-white"
                      )}
                    >
                      Grupo {g}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {groupMatches(activeGroup).map((match) => {
                    const inp = resultInputs[match.id] ?? { home: "", away: "" };
                    const isSaving = savingMatch === match.id;
                    const isSaved = savedMatch === match.id;

                    return (
                      <div
                        key={match.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border",
                          match.status === "finished"
                            ? "bg-emerald-900/10 border-emerald-700/20"
                            : "bg-wc-blue-mid/20 border-wc-blue-mid/30"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-wc-white truncate">
                            {match.home_team} <span className="text-wc-white/30">vs</span> {match.away_team}
                          </p>
                          {match.status === "finished" && (
                            <p className="text-xs text-emerald-400 mt-0.5">
                              Resultado: {match.home_score}-{match.away_score}
                            </p>
                          )}
                        </div>

                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="20"
                          value={inp.home}
                          onChange={(e) =>
                            setResultInputs((prev) => ({
                              ...prev,
                              [match.id]: { ...prev[match.id], home: e.target.value },
                            }))
                          }
                          placeholder="0"
                          className="w-12 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold"
                        />
                        <span className="text-wc-white/30 text-sm">-</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="20"
                          value={inp.away}
                          onChange={(e) =>
                            setResultInputs((prev) => ({
                              ...prev,
                              [match.id]: { ...prev[match.id], away: e.target.value },
                            }))
                          }
                          placeholder="0"
                          className="w-12 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold"
                        />

                        <button
                          onClick={() => saveResult(match.id)}
                          disabled={isSaving || inp.home === "" || inp.away === ""}
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0",
                            isSaved
                              ? "bg-emerald-700/30 text-emerald-400"
                              : "bg-wc-gold/20 hover:bg-wc-gold text-wc-gold hover:text-wc-dark disabled:opacity-30"
                          )}
                        >
                          {isSaving ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : isSaved ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Check size={14} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── USERS VIEW ── */}
            {view === "users" && (
              <div>
                <h2 className="text-lg font-bold text-wc-white mb-4">
                  Utilizadores <span className="text-wc-white/30 text-base font-normal">({users.length})</span>
                </h2>
                <div className="space-y-2">
                  {users.map((u: any) => (
                    <div
                      key={u.user_id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-wc-blue-mid/30 bg-wc-blue-mid/20"
                    >
                      <Users size={16} className="text-wc-white/30 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-wc-white truncate">{u.user_name}</p>
                        <p className="text-xs text-wc-white/30">{u.total_points} pts</p>
                      </div>
                      <button
                        onClick={() => copyLink(u.user_id)}
                        title="Copiar link de previsões"
                        className={cn(
                          "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                          copiedLink === u.user_id
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                            : "border-wc-blue-mid/40 text-wc-white/40 hover:text-wc-gold hover:border-wc-gold/30"
                        )}
                      >
                        {copiedLink === u.user_id ? (
                          <><CheckCircle2 size={12} /> Copiado</>
                        ) : (
                          <><Copy size={12} /> Link</>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SETTINGS VIEW ── */}
            {view === "settings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-wc-white mb-4">
                    <Trophy size={18} className="inline mr-2 text-wc-gold" />
                    Resultados Globais
                  </h2>

                  <div className="bg-wc-blue-mid/20 border border-wc-blue-mid/40 rounded-2xl p-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
                        Melhor marcador real
                      </label>
                      <input
                        type="text"
                        value={topScorerResult}
                        onChange={(e) => setTopScorerResult(e.target.value)}
                        placeholder="Nome do jogador"
                        className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
                        Vencedor real
                      </label>
                      <input
                        type="text"
                        value={winnerResult}
                        onChange={(e) => setWinnerResult(e.target.value)}
                        placeholder="Nome da seleção"
                        className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all"
                      />
                    </div>

                    <button
                      onClick={saveGlobal}
                      disabled={savingGlobal}
                      className="w-full h-11 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {savingGlobal ? <Loader2 size={16} className="animate-spin" /> : "Guardar e Calcular Pontos"}
                    </button>
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
