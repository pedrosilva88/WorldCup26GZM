"use client";

import { useEffect, useState, useCallback } from "react";
import { Match } from "@/types";
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
  Swords,
  Play,
  PauseCircle,
  Zap,
} from "lucide-react";
import { Phase } from "@/types";

type AdminView = "results" | "knockout" | "users" | "settings";

const KNOCKOUT_PHASES: { phase: Phase; label: string; matches: number }[] = [
  { phase: "round_of_32", label: "16 Avos de Final", matches: 16 },
  { phase: "round_of_16", label: "Oitavos de Final", matches: 8 },
  { phase: "quarter_final", label: "Quartos de Final", matches: 4 },
  { phase: "semi_final", label: "Meias-Finais", matches: 2 },
  { phase: "third_place", label: "3º e 4º Lugar", matches: 1 },
  { phase: "final", label: "Final", matches: 1 },
];

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [view, setView] = useState<AdminView>("results");
  const [matches, setMatches] = useState<Match[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [activeGroup, setActiveGroup] = useState("A");
  const [resultInputs, setResultInputs] = useState<Record<string, { home: string; away: string }>>({});
  const [savingMatch, setSavingMatch] = useState<string | null>(null);
  const [savedMatch, setSavedMatch] = useState<string | null>(null);

  // Knockout state
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const [generatingPhase, setGeneratingPhase] = useState<string | null>(null);
  const [generateMsg, setGenerateMsg] = useState<Record<string, string>>({});
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [slotEdits, setSlotEdits] = useState<Record<string, { home: string; away: string }>>({});
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [activeKOPhase, setActiveKOPhase] = useState<Phase>("round_of_32");

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
      if (res.ok) setAuthed(true);
      else setLoginError("Password incorreta.");
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
      const [mRes, uRes, phaseRes] = await Promise.all([
        fetch("/api/admin/matches"),
        fetch("/api/leaderboard"),
        fetch("/api/admin/knockout-phase"),
      ]);
      const mData = await mRes.json();
      const uData = await uRes.json();
      const { phase } = await phaseRes.json();

      setMatches(Array.isArray(mData) ? mData : []);
      setUsers(Array.isArray(uData) ? uData : []);
      setOpenPhase(phase);

      const inputs: Record<string, { home: string; away: string }> = {};
      (Array.isArray(mData) ? mData : []).forEach((m: Match) => {
        inputs[m.id] = {
          home: m.home_score !== null ? String(m.home_score) : "",
          away: m.away_score !== null ? String(m.away_score) : "",
        };
      });
      setResultInputs(inputs);

      const slots: Record<string, { home: string; away: string }> = {};
      (Array.isArray(mData) ? mData : []).filter((m: Match) => m.phase !== "group").forEach((m: Match) => {
        slots[m.id] = { home: m.home_team, away: m.away_team };
      });
      setSlotEdits(slots);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => { if (authed) loadData(); }, [authed, loadData]);

  async function saveResult(matchId: string) {
    const inp = resultInputs[matchId];
    if (!inp || inp.home === "" || inp.away === "") return;
    setSavingMatch(matchId);
    try {
      await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id: matchId, home_score: parseInt(inp.home), away_score: parseInt(inp.away) }),
      });
      setSavedMatch(matchId);
      setTimeout(() => setSavedMatch(null), 2000);
      await loadData();
    } finally {
      setSavingMatch(null);
    }
  }

  async function generateKnockout(phase: Phase) {
    setGeneratingPhase(phase);
    setGenerateMsg((p) => ({ ...p, [phase]: "" }));
    try {
      const res = await fetch("/api/admin/generate-knockout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGenerateMsg((p) => ({ ...p, [phase]: data.error }));
      } else {
        const src = data.source === "api" ? "via API" : "com placeholders";
        setGenerateMsg((p) => ({ ...p, [phase]: `✓ ${data.inserted} jogos gerados ${src}` }));
        await loadData();
      }
    } finally {
      setGeneratingPhase(null);
    }
  }

  async function setKnockoutPhaseOpen(phase: string | null) {
    await fetch("/api/admin/knockout-phase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phase }),
    });
    setOpenPhase(phase);
  }

  async function saveSlot(matchId: string) {
    const s = slotEdits[matchId];
    if (!s) return;
    setSavingSlot(matchId);
    try {
      await fetch("/api/admin/generate-knockout", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id: matchId, home_team: s.home, away_team: s.away }),
      });
      setEditingSlot(null);
      await loadData();
    } finally {
      setSavingSlot(null);
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

  async function copyLink(userId: string, phase?: string) {
    const base = phase ? `/eliminatoria` : `/prever`;
    const res = await fetch(`/api/admin/generate-link?user_id=${userId}`);
    const data = await res.json();
    const link = phase
      ? data.link.replace("/prever/", "/eliminatoria/")
      : data.link;
    await navigator.clipboard.writeText(link);
    const key = phase ? `${userId}-${phase}` : userId;
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2000);
  }

  const groupMatches = (g: string) =>
    matches.filter((m) => m.phase === "group" && m.group === g);

  const knockoutPhaseMatches = (phase: Phase) =>
    matches.filter((m) => m.phase === phase);

  const phaseGenerated = (phase: Phase) =>
    knockoutPhaseMatches(phase).length > 0;

  // ── LOGIN ──────────────────────────────────────────────────
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
                <AlertCircle size={14} />{loginError}
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

  // ── DASHBOARD ──────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-8">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-wc-blue-mid/40 backdrop-blur-md" style={{ background: "rgba(6,14,26,0.95)" }}>
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            {([["results", "Resultados"], ["knockout", "Eliminatórias"], ["users", "Utilizadores"], ["settings", "Definições"]] as [AdminView, string][]).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  view === v ? "bg-wc-gold text-wc-dark" : "text-wc-white/50 hover:text-wc-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-wc-white/30 hover:text-wc-red transition-colors ml-2 shrink-0">
            <LogOut size={14} />
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
            {/* ── RESULTADOS ── */}
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
                {syncMsg && <p className="text-xs text-wc-white/50 mb-4 bg-wc-blue-mid/20 px-3 py-2 rounded-lg">{syncMsg}</p>}

                <div className="flex overflow-x-auto gap-1 mb-4 pb-1">
                  {GROUPS.map((g) => (
                    <button key={g} onClick={() => setActiveGroup(g)}
                      className={cn("shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        activeGroup === g ? "bg-wc-gold text-wc-dark" : "bg-wc-blue-mid/20 text-wc-white/50 hover:text-wc-white")}>
                      Grp {g}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {groupMatches(activeGroup).map((match) => {
                    const inp = resultInputs[match.id] ?? { home: "", away: "" };
                    const isSaving = savingMatch === match.id;
                    const isSaved = savedMatch === match.id;
                    return (
                      <div key={match.id} className={cn("flex items-center gap-3 p-3 rounded-xl border",
                        match.status === "finished" ? "bg-emerald-900/10 border-emerald-700/20" : "bg-wc-blue-mid/20 border-wc-blue-mid/30")}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-wc-white truncate">
                            {match.home_team} <span className="text-wc-white/30">vs</span> {match.away_team}
                          </p>
                          {match.status === "finished" && (
                            <p className="text-xs text-emerald-400 mt-0.5">Resultado: {match.home_score}-{match.away_score}</p>
                          )}
                        </div>
                        <input type="number" inputMode="numeric" min="0" max="20" value={inp.home}
                          onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], home: e.target.value } }))}
                          placeholder="0" className="w-12 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                        <span className="text-wc-white/30 text-sm">-</span>
                        <input type="number" inputMode="numeric" min="0" max="20" value={inp.away}
                          onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], away: e.target.value } }))}
                          placeholder="0" className="w-12 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                        <button onClick={() => saveResult(match.id)} disabled={isSaving || inp.home === "" || inp.away === ""}
                          className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0",
                            isSaved ? "bg-emerald-700/30 text-emerald-400" : "bg-wc-gold/20 hover:bg-wc-gold text-wc-gold hover:text-wc-dark disabled:opacity-30")}>
                          {isSaving ? <Loader2 size={14} className="animate-spin" /> : isSaved ? <CheckCircle2 size={14} /> : <Check size={14} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── ELIMINATÓRIAS ── */}
            {view === "knockout" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Swords size={18} className="text-wc-gold" />
                  <h2 className="text-lg font-bold text-wc-white">Eliminatórias</h2>
                </div>

                {/* Phase open banner */}
                {openPhase && (
                  <div className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-700/30 rounded-xl px-4 py-2.5 mb-5 text-sm">
                    <Play size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">
                      Fase aberta: <strong>{PHASE_LABELS[openPhase]}</strong>
                    </span>
                    <button
                      onClick={() => setKnockoutPhaseOpen(null)}
                      className="ml-auto text-xs text-wc-white/30 hover:text-wc-red transition-colors flex items-center gap-1"
                    >
                      <PauseCircle size={12} /> Fechar
                    </button>
                  </div>
                )}

                {/* Phase tabs */}
                <div className="flex overflow-x-auto gap-1 mb-5 pb-1">
                  {KNOCKOUT_PHASES.map(({ phase, label }) => (
                    <button key={phase} onClick={() => setActiveKOPhase(phase)}
                      className={cn("shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        activeKOPhase === phase ? "bg-wc-gold text-wc-dark" :
                          phaseGenerated(phase) ? "bg-emerald-900/20 text-emerald-400 border border-emerald-700/20" :
                          "bg-wc-blue-mid/20 text-wc-white/50 hover:text-wc-white")}>
                      {label.split(" ")[0]}
                      {phaseGenerated(phase) && " ✓"}
                    </button>
                  ))}
                </div>

                {/* Active phase content */}
                {(() => {
                  const phaseInfo = KNOCKOUT_PHASES.find((p) => p.phase === activeKOPhase)!;
                  const generated = phaseGenerated(activeKOPhase);
                  const phaseMatches = knockoutPhaseMatches(activeKOPhase);
                  const isOpen = openPhase === activeKOPhase;

                  return (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-wc-white">{phaseInfo.label}</h3>
                          <p className="text-xs text-wc-white/30">{phaseInfo.matches} jogos</p>
                        </div>
                        <div className="flex gap-2">
                          {generated && !isOpen && (
                            <button
                              onClick={() => setKnockoutPhaseOpen(activeKOPhase)}
                              className="flex items-center gap-1.5 text-xs bg-emerald-700/20 text-emerald-400 border border-emerald-700/30 px-3 py-1.5 rounded-lg hover:bg-emerald-700/30 transition-all"
                            >
                              <Play size={12} /> Abrir previsões
                            </button>
                          )}
                          {!generated && (
                            <button
                              onClick={() => generateKnockout(activeKOPhase)}
                              disabled={generatingPhase === activeKOPhase}
                              className="flex items-center gap-1.5 text-xs bg-wc-gold/20 text-wc-gold border border-wc-gold/30 px-3 py-1.5 rounded-lg hover:bg-wc-gold/30 transition-all disabled:opacity-40"
                            >
                              {generatingPhase === activeKOPhase ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <Zap size={12} />
                              )}
                              Gerar via API
                            </button>
                          )}
                        </div>
                      </div>

                      {generateMsg[activeKOPhase] && (
                        <p className="text-xs text-wc-white/50 mb-3 bg-wc-blue-mid/20 px-3 py-2 rounded-lg">
                          {generateMsg[activeKOPhase]}
                        </p>
                      )}

                      {!generated ? (
                        <div className="text-center py-10 text-wc-white/20 border border-dashed border-wc-blue-mid/30 rounded-2xl">
                          <Swords size={32} className="mx-auto mb-2 opacity-30" />
                          <p className="text-sm">Fase ainda não gerada</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {phaseMatches.map((match) => {
                            const isEditing = editingSlot === match.id;
                            const slot = slotEdits[match.id] ?? { home: match.home_team, away: match.away_team };
                            const inp = resultInputs[match.id] ?? { home: "", away: "" };
                            const isSaving = savingMatch === match.id;
                            const isSaved = savedMatch === match.id;

                            return (
                              <div key={match.id} className={cn("rounded-xl border p-3 space-y-2",
                                match.status === "finished" ? "bg-emerald-900/10 border-emerald-700/20" : "bg-wc-blue-mid/20 border-wc-blue-mid/30")}>
                                {/* Team names row */}
                                {isEditing ? (
                                  <div className="flex items-center gap-2">
                                    <input value={slot.home} onChange={(e) => setSlotEdits((p) => ({ ...p, [match.id]: { ...p[match.id], home: e.target.value } }))}
                                      className="flex-1 h-8 px-2 text-xs rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <span className="text-wc-white/30 text-xs">vs</span>
                                    <input value={slot.away} onChange={(e) => setSlotEdits((p) => ({ ...p, [match.id]: { ...p[match.id], away: e.target.value } }))}
                                      className="flex-1 h-8 px-2 text-xs rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <button onClick={() => saveSlot(match.id)} disabled={savingSlot === match.id}
                                      className="w-8 h-8 rounded-lg bg-wc-gold/20 hover:bg-wc-gold text-wc-gold hover:text-wc-dark flex items-center justify-center transition-all shrink-0">
                                      {savingSlot === match.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                    </button>
                                    <button onClick={() => setEditingSlot(null)} className="w-8 h-8 rounded-lg bg-wc-blue-mid/30 text-wc-white/30 flex items-center justify-center shrink-0 text-xs">✕</button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <p className="flex-1 text-sm font-medium text-wc-white truncate">
                                      {match.home_team} <span className="text-wc-white/30">vs</span> {match.away_team}
                                    </p>
                                    <button onClick={() => setEditingSlot(match.id)} className="text-xs text-wc-white/30 hover:text-wc-gold transition-colors px-2">
                                      editar
                                    </button>
                                  </div>
                                )}

                                {/* Result row */}
                                <div className="flex items-center gap-2">
                                  {match.status === "finished" && (
                                    <span className="text-xs text-emerald-400 flex-1">Resultado: {match.home_score}-{match.away_score}</span>
                                  )}
                                  <div className="flex items-center gap-2 ml-auto">
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.home}
                                      onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], home: e.target.value } }))}
                                      placeholder="0" className="w-11 h-8 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <span className="text-wc-white/30 text-xs">-</span>
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.away}
                                      onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], away: e.target.value } }))}
                                      placeholder="0" className="w-11 h-8 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <button onClick={() => saveResult(match.id)} disabled={isSaving || inp.home === "" || inp.away === ""}
                                      className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0",
                                        isSaved ? "bg-emerald-700/30 text-emerald-400" : "bg-wc-gold/20 hover:bg-wc-gold text-wc-gold hover:text-wc-dark disabled:opacity-30")}>
                                      {isSaving ? <Loader2 size={12} className="animate-spin" /> : isSaved ? <CheckCircle2 size={12} /> : <Check size={12} />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ── UTILIZADORES ── */}
            {view === "users" && (
              <div>
                <h2 className="text-lg font-bold text-wc-white mb-4">
                  Utilizadores <span className="text-wc-white/30 text-base font-normal">({users.length})</span>
                </h2>
                <div className="space-y-2">
                  {users.map((u: any) => (
                    <div key={u.user_id} className="rounded-xl border border-wc-blue-mid/30 bg-wc-blue-mid/20 p-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-wc-white/30 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-wc-white truncate">{u.user_name}</p>
                          <p className="text-xs text-wc-white/30">{u.total_points} pts</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pl-7">
                        {/* Group stage link */}
                        <button onClick={() => copyLink(u.user_id)}
                          className={cn("flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                            copiedLink === u.user_id
                              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                              : "border-wc-blue-mid/40 text-wc-white/40 hover:text-wc-gold hover:border-wc-gold/30")}>
                          {copiedLink === u.user_id ? <><CheckCircle2 size={12} /> Copiado</> : <><Copy size={12} /> Link Grupos</>}
                        </button>
                        {/* Knockout link */}
                        {openPhase && (
                          <button onClick={() => copyLink(u.user_id, openPhase)}
                            className={cn("flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                              copiedLink === `${u.user_id}-${openPhase}`
                                ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                                : "border-wc-gold/30 text-wc-gold/70 hover:text-wc-gold hover:border-wc-gold/60")}>
                            {copiedLink === `${u.user_id}-${openPhase}` ? <><CheckCircle2 size={12} /> Copiado</> : <><Swords size={12} /> Link {PHASE_LABELS[openPhase]?.split(" ")[0]}</>}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── DEFINIÇÕES ── */}
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
                      <input type="text" value={topScorerResult} onChange={(e) => setTopScorerResult(e.target.value)}
                        placeholder="Nome do jogador"
                        className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
                        Vencedor real
                      </label>
                      <input type="text" value={winnerResult} onChange={(e) => setWinnerResult(e.target.value)}
                        placeholder="Nome da seleção"
                        className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all" />
                    </div>
                    <button onClick={saveGlobal} disabled={savingGlobal}
                      className="w-full h-11 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2">
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
