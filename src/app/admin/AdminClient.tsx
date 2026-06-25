"use client";

import { useEffect, useState, useCallback } from "react";
import { Match } from "@/types";
import { GROUPS, PHASE_LABELS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";
import {
  Lock, Loader2, CheckCircle2, AlertCircle, RefreshCw,
  Trophy, Users, Copy, Check, LogOut, Swords, Play,
  PauseCircle, Zap, UserPlus, Trash2, ChevronDown, ChevronUp,
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

function sanitize(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") return "";
  return String(Math.min(parseInt(digits, 10), 20));
}
const BLOCKED_KEYS = ["e", "E", "+", "-", ".", ",", " "];

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [view, setView] = useState<AdminView>("results");
  const [matches, setMatches] = useState<Match[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Results view
  const [activeGroup, setActiveGroup] = useState("A");
  const [resultInputs, setResultInputs] = useState<Record<string, { home: string; away: string }>>({});
  const [savingMatch, setSavingMatch] = useState<string | null>(null);
  const [savedMatch, setSavedMatch] = useState<string | null>(null);

  // Knockout view
  const [openPhase, setOpenPhase] = useState<string | null>(null);
  const [generatingPhase, setGeneratingPhase] = useState<string | null>(null);
  const [generateMsg, setGenerateMsg] = useState<Record<string, string>>({});
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [slotEdits, setSlotEdits] = useState<Record<string, { home: string; away: string }>>({});
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [activeKOPhase, setActiveKOPhase] = useState<Phase>("round_of_32");

  // Users view
  const [newUserName, setNewUserName] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [createError, setCreateError] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userPredInputs, setUserPredInputs] = useState<Record<string, { home: string; away: string }>>({});
  const [savingUserPreds, setSavingUserPreds] = useState(false);
  const [savedUserPreds, setSavedUserPreds] = useState<string | null>(null);

  // Settings view
  const [topScorerResult, setTopScorerResult] = useState("");
  const [winnerResult, setWinnerResult] = useState("");
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [recalcMsg, setRecalcMsg] = useState("");
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
    } finally { setLoginLoading(false); }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  }

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [mRes, uRes, lbRes, phaseRes] = await Promise.all([
        fetch("/api/admin/matches"),
        fetch("/api/admin/users"),
        fetch("/api/leaderboard"),
        fetch("/api/admin/knockout-phase"),
      ]);
      const mData = await mRes.json();
      const uRaw = await uRes.json();
      const lbData = await lbRes.json();
      const { phase } = await phaseRes.json();

      const lbMap: Record<string, number> = {};
      (Array.isArray(lbData) ? lbData : []).forEach((e: any) => { lbMap[e.user_id] = e.total_points; });

      const usersWithPoints = (Array.isArray(uRaw) ? uRaw : []).map((u: any) => ({
        ...u, total_points: lbMap[u.id] ?? 0,
      }));

      setMatches(Array.isArray(mData) ? mData : []);
      setUsers(usersWithPoints);
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
    } finally { setLoadingData(false); }
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
    } finally { setSavingMatch(null); }
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUserName.trim()) return;
    setCreatingUser(true);
    setCreateError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setCreateError(data.error); return; }
      setNewUserName("");
      await loadData();
    } finally { setCreatingUser(false); }
  }

  async function deleteUser(userId: string, userName: string) {
    if (!confirm(`Apagar ${userName}? Esta ação é irreversível.`)) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });
    await loadData();
  }

  async function expandUser(userId: string) {
    if (expandedUser === userId) { setExpandedUser(null); return; }
    setExpandedUser(userId);
    // Load existing predictions for this user for finished matches
    const res = await fetch(`/api/admin/user-predictions?user_id=${userId}`);
    const preds = await res.json();
    const inputs: Record<string, { home: string; away: string }> = {};
    (Array.isArray(preds) ? preds : []).forEach((p: any) => {
      inputs[p.match_id] = {
        home: p.home_goals !== null ? String(p.home_goals) : "",
        away: p.away_goals !== null ? String(p.away_goals) : "",
      };
    });
    setUserPredInputs(inputs);
  }

  async function saveUserPreds(userId: string) {
    setSavingUserPreds(true);
    const predictions = Object.entries(userPredInputs)
      .filter(([, v]) => v.home !== "" && v.away !== "")
      .map(([match_id, v]) => ({
        match_id,
        home_goals: parseInt(v.home),
        away_goals: parseInt(v.away),
      }));

    await fetch("/api/admin/user-predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, predictions }),
    });
    setSavedUserPreds(userId);
    setTimeout(() => setSavedUserPreds(null), 2000);
    setSavingUserPreds(false);
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
      if (!res.ok) setGenerateMsg((p) => ({ ...p, [phase]: `✗ ${data.error}` }));
      else {
        const msg = data.mode === "refresh"
          ? `✓ ${data.updated ?? 0} jogos atualizados via API`
          : `✓ ${data.inserted ?? 0} jogos gerados ${data.source === "api" ? "via API" : "com placeholders"}`;
        setGenerateMsg((p) => ({ ...p, [phase]: msg }));
        await loadData();
      }
    } finally { setGeneratingPhase(null); }
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
    } finally { setSavingSlot(null); }
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

  async function recalculateScores() {
    setRecalculating(true);
    setRecalcMsg("");
    const res = await fetch("/api/admin/recalculate", { method: "POST" });
    const data = await res.json();
    setRecalcMsg(data.error ?? `✓ ${data.updated} previsões recalculadas.`);
    setRecalculating(false);
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

  async function copyLink(userId: string, isKnockout = false) {
    const res = await fetch(`/api/admin/generate-link?user_id=${userId}`);
    const data = await res.json();
    const link = isKnockout ? data.link.replace("/prever/", "/eliminatoria/") : data.link;
    await navigator.clipboard.writeText(link);
    const key = isKnockout ? `ko-${userId}` : userId;
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2000);
  }

  const groupMatches = (g: string) => matches.filter((m) => m.phase === "group" && m.group === g);
  const finishedGroupMatches = matches.filter((m) => m.phase === "group" && m.status === "finished");
  const knockoutPhaseMatches = (phase: Phase) => matches.filter((m) => m.phase === phase);
  const phaseGenerated = (phase: Phase) => knockoutPhaseMatches(phase).length > 0;

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
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" autoFocus
              className="w-full h-12 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all" />
            {loginError && <p className="text-sm text-wc-red flex items-center gap-2"><AlertCircle size={14} />{loginError}</p>}
            <button type="submit" disabled={loginLoading || !password}
              className="w-full h-12 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2">
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
      <div className="sticky top-0 z-50 border-b border-wc-blue-mid/40 backdrop-blur-md" style={{ background: "rgba(12,15,19,0.95)" }}>
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            {([["results", "Resultados"], ["knockout", "Eliminatórias"], ["users", "Utilizadores"], ["settings", "Definições"]] as [AdminView, string][]).map(([v, label]) => (
              <button key={v} onClick={() => setView(v)}
                className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  view === v ? "bg-wc-gold text-wc-dark" : "text-wc-white/50 hover:text-wc-white")}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={logout} className="text-wc-white/30 hover:text-wc-red transition-colors ml-2 shrink-0 p-1">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {loadingData ? (
          <div className="flex justify-center py-16"><Loader2 size={28} className="text-wc-gold animate-spin" /></div>
        ) : (
          <>
            {/* ── RESULTADOS ── */}
            {view === "results" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-wc-white">Resultados dos Jogos</h2>
                  <button onClick={syncApi} disabled={syncing}
                    className="flex items-center gap-1.5 text-xs text-wc-gold border border-wc-gold/30 px-3 py-1.5 rounded-lg hover:bg-wc-gold/10 transition-all disabled:opacity-40">
                    <RefreshCw size={12} className={syncing ? "animate-spin" : ""} /> Sincronizar API
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
                      <div key={match.id} className={cn("flex items-center gap-2 p-3 rounded-xl border",
                        match.status === "finished" ? "bg-emerald-900/10 border-emerald-700/20" : "bg-wc-blue-mid/20 border-wc-blue-mid/30")}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-wc-white truncate">
                            {match.home_team} <span className="text-wc-white/30">vs</span> {match.away_team}
                          </p>
                          {match.status === "finished" && <p className="text-xs text-emerald-400 mt-0.5">Resultado oficial: {match.home_score}–{match.away_score}</p>}
                        </div>
                        <input type="number" inputMode="numeric" min="0" max="20" value={inp.home}
                          onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                          onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], home: sanitize(e.target.value) } }))}
                          placeholder="0" className="w-11 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                        <span className="text-wc-white/30 text-xs">–</span>
                        <input type="number" inputMode="numeric" min="0" max="20" value={inp.away}
                          onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                          onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], away: sanitize(e.target.value) } }))}
                          placeholder="0" className="w-11 h-9 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
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
                {openPhase && (
                  <div className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-700/30 rounded-xl px-4 py-2.5 mb-5 text-sm">
                    <Play size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">Aberta: <strong>{PHASE_LABELS[openPhase]}</strong></span>
                    <button onClick={() => setKnockoutPhaseOpen(null)} className="ml-auto text-xs text-wc-white/30 hover:text-wc-red transition-colors flex items-center gap-1">
                      <PauseCircle size={12} /> Fechar
                    </button>
                  </div>
                )}
                <div className="flex overflow-x-auto gap-1 mb-5 pb-1">
                  {KNOCKOUT_PHASES.map(({ phase, label }) => (
                    <button key={phase} onClick={() => setActiveKOPhase(phase)}
                      className={cn("shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        activeKOPhase === phase ? "bg-wc-gold text-wc-dark" :
                          phaseGenerated(phase) ? "bg-emerald-900/20 text-emerald-400 border border-emerald-700/20" :
                          "bg-wc-blue-mid/20 text-wc-white/50 hover:text-wc-white")}>
                      {label.split(" ")[0]}{phaseGenerated(phase) && " ✓"}
                    </button>
                  ))}
                </div>
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
                            <button onClick={() => setKnockoutPhaseOpen(activeKOPhase)}
                              className="flex items-center gap-1.5 text-xs bg-emerald-700/20 text-emerald-400 border border-emerald-700/30 px-3 py-1.5 rounded-lg hover:bg-emerald-700/30 transition-all">
                              <Play size={12} /> Abrir
                            </button>
                          )}
                          <button onClick={() => generateKnockout(activeKOPhase)} disabled={generatingPhase === activeKOPhase}
                            className="flex items-center gap-1.5 text-xs bg-wc-gold/20 text-wc-gold border border-wc-gold/30 px-3 py-1.5 rounded-lg hover:bg-wc-gold/30 transition-all disabled:opacity-40">
                            {generatingPhase === activeKOPhase ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
                            {generated ? "Atualizar via API" : "Gerar via API"}
                          </button>
                        </div>
                      </div>
                      {generateMsg[activeKOPhase] && (
                        <p className="text-xs text-wc-white/50 mb-3 bg-wc-blue-mid/20 px-3 py-2 rounded-lg">{generateMsg[activeKOPhase]}</p>
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
                                    <button onClick={() => setEditingSlot(match.id)} className="text-xs text-wc-white/30 hover:text-wc-gold transition-colors px-2">editar</button>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  {match.status === "finished" && <span className="text-xs text-emerald-400 flex-1">Resultado: {match.home_score}–{match.away_score}</span>}
                                  <div className="flex items-center gap-2 ml-auto">
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.home}
                                      onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                                      onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], home: sanitize(e.target.value) } }))}
                                      placeholder="0" className="w-11 h-8 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <span className="text-wc-white/30 text-xs">–</span>
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.away}
                                      onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                                      onChange={(e) => setResultInputs((p) => ({ ...p, [match.id]: { ...p[match.id], away: sanitize(e.target.value) } }))}
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

                {/* Create user form */}
                <form onSubmit={createUser} className="flex gap-2 mb-6">
                  <input type="text" value={newUserName} onChange={(e) => { setNewUserName(e.target.value); setCreateError(""); }}
                    placeholder="Nome do participante" maxLength={40}
                    className="flex-1 h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all text-sm" />
                  <button type="submit" disabled={creatingUser || !newUserName.trim()}
                    className="h-11 px-4 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center gap-1.5 text-sm shrink-0">
                    {creatingUser ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                    Criar
                  </button>
                </form>
                {createError && <p className="text-xs text-wc-red mb-4 -mt-4 flex items-center gap-1"><AlertCircle size={12} />{createError}</p>}

                {/* User list */}
                <div className="space-y-2">
                  {users.map((u) => {
                    const isExpanded = expandedUser === u.id;
                    return (
                      <div key={u.id} className="rounded-xl border border-wc-blue-mid/30 bg-wc-blue-mid/20 overflow-hidden">
                        {/* User row */}
                        <div className="flex items-center gap-3 p-3">
                          <Users size={16} className="text-wc-white/30 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-wc-white truncate">{u.name}</p>
                            <p className="text-xs text-wc-white/30">{u.total_points} pts</p>
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => copyLink(u.id)}
                              className={cn("flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border transition-all",
                                copiedLink === u.id ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                                  "border-wc-blue-mid/40 text-wc-white/40 hover:text-wc-gold hover:border-wc-gold/30")}>
                              {copiedLink === u.id ? <><CheckCircle2 size={11} /> OK</> : <><Copy size={11} /> Link</>}
                            </button>
                            {openPhase && (
                              <button onClick={() => copyLink(u.id, true)}
                                className={cn("flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border transition-all",
                                  copiedLink === `ko-${u.id}` ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                                    "border-wc-gold/30 text-wc-gold/60 hover:text-wc-gold hover:border-wc-gold/60")}>
                                {copiedLink === `ko-${u.id}` ? <><CheckCircle2 size={11} /> OK</> : <><Swords size={11} /> KO</>}
                              </button>
                            )}
                            <button onClick={() => expandUser(u.id)}
                              className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-wc-blue-mid/40 text-wc-white/30 hover:text-wc-white hover:border-wc-blue-mid/60 transition-all">
                              {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                              Palpites
                            </button>
                            <button onClick={() => deleteUser(u.id, u.name)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-wc-white/20 hover:text-wc-red hover:bg-wc-red/10 transition-all border border-transparent hover:border-wc-red/20">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Expanded: past match predictions */}
                        {isExpanded && (
                          <div className="border-t border-wc-blue-mid/30 p-3 bg-wc-blue/20">
                            <p className="text-xs text-wc-white/40 mb-3 font-medium">
                              Palpites de jogos terminados · insere os valores do grupo do WhatsApp
                            </p>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                              {finishedGroupMatches.map((match) => {
                                const inp = userPredInputs[match.id] ?? { home: "", away: "" };
                                return (
                                  <div key={match.id} className="flex items-center gap-2">
                                    <p className="flex-1 text-xs text-wc-white/60 truncate">
                                      {match.home_team} vs {match.away_team}
                                      <span className="text-wc-white/30 ml-1">({match.home_score}–{match.away_score})</span>
                                    </p>
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.home}
                                      onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                                      onChange={(e) => setUserPredInputs((p) => ({ ...p, [match.id]: { ...p[match.id], home: sanitize(e.target.value) } }))}
                                      placeholder="?" className="w-10 h-8 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                    <span className="text-wc-white/30 text-xs">–</span>
                                    <input type="number" inputMode="numeric" min="0" max="20" value={inp.away}
                                      onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
                                      onChange={(e) => setUserPredInputs((p) => ({ ...p, [match.id]: { ...p[match.id], away: sanitize(e.target.value) } }))}
                                      placeholder="?" className="w-10 h-8 text-center text-sm font-bold rounded-lg border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white outline-none focus:border-wc-gold" />
                                  </div>
                                );
                              })}
                              {finishedGroupMatches.length === 0 && (
                                <p className="text-xs text-wc-white/20 text-center py-4">Nenhum jogo terminado ainda</p>
                              )}
                            </div>
                            {finishedGroupMatches.length > 0 && (
                              <button onClick={() => saveUserPreds(u.id)} disabled={savingUserPreds}
                                className={cn("mt-3 w-full h-9 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
                                  savedUserPreds === u.id
                                    ? "bg-emerald-700/20 text-emerald-400 border border-emerald-700/30"
                                    : "bg-wc-gold/20 hover:bg-wc-gold text-wc-gold hover:text-wc-dark border border-wc-gold/30 disabled:opacity-40")}>
                                {savingUserPreds ? <Loader2 size={14} className="animate-spin" /> :
                                  savedUserPreds === u.id ? <><CheckCircle2 size={14} /> Guardado!</> :
                                  <><Check size={14} /> Guardar palpites</>}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {users.length === 0 && (
                    <div className="text-center py-10 text-wc-white/20 border border-dashed border-wc-blue-mid/30 rounded-2xl">
                      <Users size={32} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Nenhum utilizador criado</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── DEFINIÇÕES ── */}
            {view === "settings" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-wc-white">
                  <Trophy size={18} className="inline mr-2 text-wc-gold" />Resultados Globais
                </h2>
                <div className="bg-wc-blue-mid/20 border border-wc-blue-mid/40 rounded-2xl p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">Melhor marcador real</label>
                    <input type="text" value={topScorerResult} onChange={(e) => setTopScorerResult(e.target.value)} placeholder="Nome do jogador"
                      className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">Vencedor real</label>
                    <input type="text" value={winnerResult} onChange={(e) => setWinnerResult(e.target.value)} placeholder="Nome da seleção"
                      className="w-full h-11 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all" />
                  </div>
                  <button onClick={saveGlobal} disabled={savingGlobal}
                    className="w-full h-11 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    {savingGlobal ? <Loader2 size={16} className="animate-spin" /> : "Guardar e Calcular Pontos"}
                  </button>
                </div>

                {/* Recalculate scores */}
                <div className="bg-wc-blue-mid/20 border border-wc-blue-mid/40 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-wc-white mb-1">Recalcular Pontuações</h3>
                  <p className="text-xs text-wc-white/40 mb-4">
                    Recalcula os pontos de todos os jogos terminados com base nos 1X2 e resultados actuais. Usa isto após corrigir apostas manualmente.
                  </p>
                  {recalcMsg && (
                    <p className="text-xs text-wc-white/50 mb-3 bg-wc-blue-mid/30 px-3 py-2 rounded-lg">{recalcMsg}</p>
                  )}
                  <button onClick={recalculateScores} disabled={recalculating}
                    className="w-full h-11 bg-wc-blue-mid/40 hover:bg-wc-electric/20 border border-wc-electric/30 hover:border-wc-electric/60 text-wc-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40">
                    {recalculating ? <><Loader2 size={16} className="animate-spin" /> A recalcular...</> : <><RefreshCw size={16} /> Recalcular tudo</>}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
