"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Match } from "@/types";
import MatchCard from "@/components/MatchCard";
import { cn } from "@/lib/utils";
import { Trophy, Star, ArrowLeft, ChevronDown } from "lucide-react";
import { PHASE_LABELS } from "@/lib/matches-data";
import Link from "next/link";
import { getFlagUrl } from "@/lib/flags";

// ─── Global prediction types ──────────────────────────────────────────────────

interface GroupedScorer { player: string; users: string[]; goals: number | null; photo_url?: string | null; }
interface GroupedWinner { team: string; users: string[]; }
interface OfficialScorer { player_name: string; team_name: string; goals: number; photo_url?: string | null; }

// ─── Types ───────────────────────────────────────────────────────────────────

interface LbUser { user_id: string; user_name: string; total_points: number; }

interface PredEntry {
  match_id: string;
  home_goals: number | null;
  away_goals: number | null;
  prediction_1x2: string | null;
  points_earned: number | null;
}

interface GlobalPred { top_scorer: string; tournament_winner: string; }

interface DayUser { id: string; name: string; }

interface UserPred {
  user_id: string;
  user_name: string;
  home_goals: number | null;
  away_goals: number | null;
  prediction_1x2: string | null;
  points_earned: number | null;
}

interface DayMatch {
  id: string;
  home_team: string;
  away_team: string;
  match_date: string;
  status: string;
  home_score: number | null;
  away_score: number | null;
  group: string | null;
  phase: string;
  match_order: number;
  matchday?: number | null;
  predictions: UserPred[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lisboaDay(match_date: string) {
  return new Date(match_date).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
}

function dayLabel(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("pt-PT", {
    day: "numeric", month: "short",
  });
}

function weekdayShort(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("pt-PT", { weekday: "short" });
}

function matchTimeStr(match_date: string) {
  return new Date(match_date).toLocaleTimeString("pt-PT", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon",
  });
}

function infer1x2(h: number, a: number): "1" | "x" | "2" {
  return h > a ? "1" : h < a ? "2" : "x";
}

function chipState(pred: UserPred, match: DayMatch): "exact" | "partial" | "wrong" | "pending" {
  if (match.status !== "finished" || pred.home_goals === null) return "pending";
  if (pred.home_goals === match.home_score && pred.away_goals === match.away_score) return "exact";
  if ((pred.points_earned ?? 0) > 0) return "partial";
  return "wrong";
}

// ─── UserChip ────────────────────────────────────────────────────────────────

function UserChip({ pred, match }: { pred: UserPred; match: DayMatch }) {
  const state = chipState(pred, match);
  const hasScore = pred.home_goals !== null;
  const score = hasScore ? `${pred.home_goals}–${pred.away_goals}` : "–";
  const pts = pred.points_earned ?? 0;
  const bet = pred.prediction_1x2;
  const firstName = pred.user_name.split(" ")[0];

  const styles = {
    exact:   { bg: "#100e00", border: "#2e2600", scoreColor: "#e9b13a", ptsBg: "#342b00", ptsTxt: "#e9b13a", betTxt: "#e0a830", betBg: "#2a2200" },
    partial: { bg: "#0d1608", border: "#1e3010", scoreColor: "#5ed46a", ptsBg: "#1a3a1a", ptsTxt: "#5ed46a", betTxt: "#4caf74", betBg: "#1a3a1a" },
    wrong:   { bg: "#0e0e0e", border: "#1a1a1a", scoreColor: "#2e2e2e", ptsBg: "#1c1c1c", ptsTxt: "#444",    betTxt: "#aaa",    betBg: "#333" },
    pending: { bg: "#0e0e0e", border: "#1e1e1e", scoreColor: "#555",    ptsBg: "transparent", ptsTxt: "#2a2a2a", betTxt: "#bbb", betBg: "#333" },
  }[state];

  const showBadge = hasScore && state !== "pending";

  return (
    <div
      className="w-full h-[72px]"
      style={{
        flexShrink: 0, position: "relative",
        background: styles.bg, border: `1px solid ${styles.border}`,
        borderRadius: 8, padding: "7px 9px 6px",
        opacity: state === "pending" ? 0.5 : 1,
      }}
    >
      {/* Name */}
      <p style={{ fontSize: 9, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888", maxWidth: 62, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>
        {firstName}
      </p>

      {/* Score — centred */}
      <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 17, fontWeight: 800, color: styles.scoreColor, lineHeight: 1, whiteSpace: "nowrap" }}>
        {score}
      </p>

      {/* Points — iOS badge style, corner overflow */}
      {showBadge && (
        <div style={{
          position: "absolute", top: -7, right: -7,
          minWidth: 18, height: 18,
          background: pts > 0 ? styles.ptsBg : "#1c1c1c",
          color: pts > 0 ? styles.ptsTxt : "#3a3a3a",
          border: `2px solid ${styles.bg}`,
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 800, letterSpacing: "0.02em",
          padding: "0 4px", lineHeight: 1,
          zIndex: 10,
        }}>
          {pts > 0 ? `+${pts}` : "0"}
        </div>
      )}

      {/* 1·X·2 — bottom centre */}
      <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }}>
        {(["1", "x", "2"] as const).map((opt, i) => {
          const isSelected = bet === opt;
          return (
            <span key={opt} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <span style={{ fontSize: 8, color: styles.betTxt, padding: "0 1px", opacity: 0.2 }}>·</span>}
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "1px 3px", borderRadius: 3,
                color: styles.betTxt,
                background: isSelected ? styles.betBg : "transparent",
                opacity: isSelected ? 1 : 0.2,
              }}>
                {opt.toUpperCase()}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── GameInfoCard ─────────────────────────────────────────────────────────────

function GameInfoCard({ match }: { match: DayMatch }) {
  const finished = match.status === "finished";
  const actual1x2 = finished && match.home_score !== null
    ? infer1x2(match.home_score!, match.away_score!)
    : null;

  return (
    <div
      className="w-[96px] sm:w-[210px]"
      style={{
        flexShrink: 0, alignSelf: "stretch",
        background: "rgba(22,22,22,0.9)", border: "1px solid #222",
        borderRadius: 8, padding: "8px 10px",
        display: "flex", alignItems: "center",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        {/* Jornada + time */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {match.matchday && (
            <span style={{ fontSize: 9, fontWeight: 800, color: "#444", letterSpacing: "0.04em" }}>
              J{match.matchday}
            </span>
          )}
          <p style={{ fontSize: 10, color: "#555", lineHeight: 1 }}>
            {matchTimeStr(match.match_date)}
          </p>
        </div>

        {([
          { team: match.home_team, score: match.home_score },
          { team: match.away_team, score: match.away_score },
        ] as const).map((t, i) => {
          const flagUrl = getFlagUrl(t.team, "w40");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {flagUrl && (
                <img src={flagUrl} alt={t.team} width={16} height={11} style={{ borderRadius: 2, flexShrink: 0 }} />
              )}
              {/* Full name on sm+, 3-char abbreviation on mobile */}
              <span className="hidden sm:block" style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#bbb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.team}
              </span>
              <span className="sm:hidden" style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#888", overflow: "hidden", whiteSpace: "nowrap" }}>
                {t.team.substring(0, 3).toUpperCase()}
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: finished ? "#fff" : "#2a2a2a", minWidth: 10, textAlign: "right", flexShrink: 0 }}>
                {finished ? String(t.score ?? "?") : "–"}
              </span>
            </div>
          );
        })}

        {/* 1·X·2 — centred, tight spacing */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
          {(["1", "x", "2"] as const).map((opt) => (
            <span key={opt} style={{
              fontSize: 10, fontWeight: 800, padding: "1px 4px", borderRadius: 3,
              color: actual1x2 === opt ? "#e8c94a" : finished ? "#2e2e2e" : "#1e1e1e",
              background: actual1x2 === opt ? "rgba(30,25,0,1)" : "transparent",
            }}>
              {opt.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GlobalPredCard ───────────────────────────────────────────────────────────

function UserBadge({ name }: { name: string }) {
  return (
    <span
      style={{
        fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        color: "#bbb", whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PalpitesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [section, setSection] = useState<"jogos" | "marcador" | "campeao">("jogos");
  const [tab, setTab] = useState<"user" | "day">("day");

  // ── Por Utilizador state ──────────────────────────────────────────────────
  const [lbUsers, setLbUsers] = useState<LbUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(searchParams.get("user") ?? "");
  const [userMatches, setUserMatches] = useState<Match[]>([]);
  const [predMap, setPredMap] = useState<Record<string, PredEntry>>({});
  const [globalPred, setGlobalPred] = useState<GlobalPred | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // ── Por Dia state ─────────────────────────────────────────────────────────
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [dayMatches, setDayMatches] = useState<DayMatch[]>([]);
  const [dayUsers, setDayUsers] = useState<DayUser[]>([]);
  const [loadingDay, setLoadingDay] = useState(false);
  const [daysLoaded, setDaysLoaded] = useState(false);

  // ── Global predictions state ───────────────────────────────────────────────
  const [groupedScorers, setGroupedScorers] = useState<GroupedScorer[]>([]);
  const [groupedWinners, setGroupedWinners] = useState<GroupedWinner[]>([]);
  const [officialScorers, setOfficialScorers] = useState<OfficialScorer[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [globalLoaded, setGlobalLoaded] = useState(false);

  // Fetch leaderboard on mount
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data: LbUser[]) => setLbUsers(data));
  }, []);

  // Fetch user predictions
  useEffect(() => {
    if (!selectedUserId) return;
    setLoadingUser(true);
    fetch(`/api/palpites?user_id=${selectedUserId}`)
      .then((r) => r.json())
      .then((data) => {
        setUserMatches(data.matches ?? []);
        const map: Record<string, PredEntry> = {};
        for (const p of (data.predictions ?? []) as PredEntry[]) map[p.match_id] = p;
        setPredMap(map);
        setGlobalPred(data.global ?? null);
      })
      .finally(() => setLoadingUser(false));
    router.replace(`/palpites?user=${selectedUserId}`, { scroll: false });
  }, [selectedUserId, router]);

  // Load global predictions when entering Marcador or Campeão
  useEffect(() => {
    if (section !== "marcador" && section !== "campeao") return;
    if (globalLoaded) return;
    setLoadingGlobal(true);
    fetch("/api/palpites/global")
      .then((r) => r.json())
      .then((data) => {
        setGroupedScorers(data.groupedScorers ?? []);
        setGroupedWinners(data.groupedWinners ?? []);
        setOfficialScorers(data.officialScorers ?? []);
        setGlobalLoaded(true);
      })
      .finally(() => setLoadingGlobal(false));
  }, [section, globalLoaded]);

  // Load days on mount (Por Dia is the default tab)
  useEffect(() => {
    if (daysLoaded) return;
    fetch("/api/palpites/day")
      .then((r) => r.json())
      .then((data) => {
        const d: string[] = data.days ?? [];
        setDays(d);
        setDaysLoaded(true);
        if (d.length > 0 && !selectedDay) {
          const today = new Date().toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
          const def = d.includes(today) ? today : d.findLast((x) => x <= today) ?? d[0];
          setSelectedDay(def);
        }
      });
  }, [daysLoaded, selectedDay]);

  // Fetch day data when selectedDay changes
  useEffect(() => {
    if (!selectedDay) return;
    setLoadingDay(true);
    fetch(`/api/palpites/day?date=${selectedDay}`)
      .then((r) => r.json())
      .then((data) => {
        setDayMatches(data.matches ?? []);
        setDayUsers(data.users ?? []);
        if (data.days?.length && !daysLoaded) {
          setDays(data.days);
          setDaysLoaded(true);
        }
      })
      .finally(() => setLoadingDay(false));
  }, [selectedDay]);

  // Group user matches by Lisbon day (date-ordered)
  const matchesByDay = (() => {
    const sorted = userMatches
      .filter((m) => m.match_date)
      .sort((a, b) => new Date(a.match_date!).getTime() - new Date(b.match_date!).getTime());
    const groups: { day: string; matches: Match[] }[] = [];
    for (const m of sorted) {
      const day = lisboaDay(m.match_date!);
      const last = groups[groups.length - 1];
      if (last?.day === day) last.matches.push(m);
      else groups.push({ day, matches: [m] });
    }
    return groups;
  })();

  // Group day matches by phase+group
  const dayMatchesByGroup = (() => {
    const sections: { key: string; phase: string; group: string | null; matches: DayMatch[] }[] = [];
    for (const m of dayMatches) {
      const key = m.phase === "group" ? `group-${m.group}` : m.phase;
      const last = sections[sections.length - 1];
      if (last?.key === key) last.matches.push(m);
      else sections.push({ key, phase: m.phase, group: m.group ?? null, matches: [m] });
    }
    return sections;
  })();

  const today = new Date().toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
  const selectedLbUser = lbUsers.find((u) => u.user_id === selectedUserId);

  const dayStripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selectedDay || !dayStripRef.current) return;
    const btn = dayStripRef.current.querySelector<HTMLElement>(`[data-date="${selectedDay}"]`);
    btn?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [selectedDay]);

  return (
    <div className="min-h-screen pb-16">
      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(12,15,19,0.96)" }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-wc-white/40 hover:text-wc-white transition-colors p-1">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="text-sm font-bold text-wc-white leading-tight">
                {section === "jogos"
                  ? tab === "user" ? (selectedLbUser?.user_name ?? "Palpites") : "Palpites · " + (selectedDay ? dayLabel(selectedDay) : "")
                  : section === "marcador" ? "Melhor Marcador"
                  : "Campeão"}
              </p>
              <p className="text-xs text-wc-white/30">
                {section === "jogos"
                  ? tab === "user" ? "Por Utilizador" : "Por Dia"
                  : section === "marcador" ? "Palpites + Lista Oficial"
                  : "Palpites do Grupo"}
              </p>
            </div>
          </div>
          {section === "jogos" && tab === "user" && selectedLbUser && (
            <div className="text-right">
              <p className="text-xs text-wc-white/30">Pontos</p>
              <p className="font-display text-xl text-wc-gold tabular-nums">{selectedLbUser.total_points}</p>
            </div>
          )}
        </div>

        {/* Top-level section tabs */}
        <div className="flex border-b border-white/6 px-4">
          {([
            { key: "jogos",    label: "Jogos" },
            { key: "marcador", label: "Marcador" },
            { key: "campeao",  label: "Campeão" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={cn(
                "px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border-b-2 -mb-px",
                section === key
                  ? "text-wc-gold border-wc-gold"
                  : "text-wc-white/30 border-transparent hover:text-wc-white/60"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sub-tabs (Por Dia / Por Utilizador) — Jogos only */}
        {section === "jogos" && (
          <div className="flex border-b border-white/4 px-4">
            {(["day", "user"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2 text-[11px] font-semibold tracking-wider uppercase transition-all border-b-2 -mb-px",
                  tab === t
                    ? "text-wc-white/80 border-wc-white/30"
                    : "text-wc-white/20 border-transparent hover:text-wc-white/40"
                )}
              >
                {t === "user" ? "Por Utilizador" : "Por Dia"}
              </button>
            ))}
          </div>
        )}

        {/* Day strip (Por Dia only) */}
        {section === "jogos" && tab === "day" && days.length > 0 && (
          <div ref={dayStripRef} className="flex overflow-x-auto scrollbar-none px-4 gap-2 py-2.5">
            {days.map((d) => {
              const isPast = d < today;
              const isToday = d === today;
              const isSelected = d === selectedDay;
              return (
                <button
                  key={d}
                  data-date={d}
                  onClick={() => setSelectedDay(d)}
                  className="flex-shrink-0 px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all"
                  style={
                    isSelected
                      ? { background: "#e9b13a", color: "#0c0f13", borderColor: "#e9b13a", fontWeight: 700 }
                      : isPast
                      ? { background: "transparent", color: "#666", borderColor: "#222" }
                      : isToday
                      ? { background: "rgba(233,177,58,0.08)", color: "#e9b13a", borderColor: "rgba(233,177,58,0.25)" }
                      : { background: "transparent", color: "#444", borderColor: "#1a1a1a" }
                  }
                >
                  {dayLabel(d)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Marcador ───────────────────────────────────────────────────────── */}
      {section === "marcador" && (
        <div className="max-w-5xl mx-auto px-4 pt-5 pb-12">
          {loadingGlobal && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          )}

          {!loadingGlobal && (
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* User predictions grouped by player */}
              <div className="w-full sm:flex-1">
                <p className="text-[10px] font-bold tracking-widest uppercase text-wc-white/25 mb-3">Palpites do grupo</p>
                {groupedScorers.length === 0 ? (
                  <p className="text-sm text-wc-white/20">Sem palpites ainda</p>
                ) : (
                  <div className="space-y-3">
                    {groupedScorers.map(({ player, users, goals, photo_url }) => (
                      <div
                        key={player}
                        className="rounded-xl border p-4"
                        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            {photo_url ? (
                              <img src={photo_url} alt={player} width={28} height={28} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "#1a1a1a" }} />
                            ) : (
                              <Star size={12} className="text-wc-gold" />
                            )}
                            <div>
                              <p className="text-sm font-bold text-wc-white">{player}</p>
                              {goals !== null && (
                                <p className="text-[11px] text-wc-white/40">⚽ {goals}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(255,255,255,0.06)", color: "#888" }}
                            >
                              {users.length}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {users.map((u) => <UserBadge key={u} name={u} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Official top scorers */}
              {officialScorers.length > 0 && (
                <div className="w-full sm:flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-wc-white/25 mb-3">Lista oficial</p>
                  <div
                    className="rounded-xl border overflow-hidden"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    {officialScorers.map((s, i) => (
                      <div
                        key={s.player_name}
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                          borderBottom: i < officialScorers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        }}
                      >
                        <span className="text-[11px] font-bold tabular-nums text-wc-white/20 w-5 text-right flex-shrink-0">
                          {i + 1}
                        </span>
                        {s.photo_url ? (
                          <img src={s.photo_url} alt={s.player_name} width={32} height={32} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "#1a1a1a" }} />
                        ) : (
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a1a1a", flexShrink: 0 }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-wc-white truncate">{s.player_name}</p>
                          <p className="text-[11px] text-wc-white/35">{s.team_name}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="font-display text-lg text-wc-gold tabular-nums leading-none">{s.goals}</p>
                          <p className="text-[9px] text-wc-white/25 uppercase tracking-wider">golos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {officialScorers.length === 0 && (
                <div className="w-full sm:flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-wc-white/25 mb-3">Lista oficial</p>
                  <p className="text-sm text-wc-white/20">Ainda não disponível</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Campeão ────────────────────────────────────────────────────────── */}
      {section === "campeao" && (
        <div className="max-w-2xl mx-auto px-4 pt-5 pb-12">
          {loadingGlobal && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          )}

          {!loadingGlobal && (
            <>
              <p className="text-[10px] font-bold tracking-widest uppercase text-wc-white/25 mb-3">Palpites do grupo</p>
              {groupedWinners.length === 0 ? (
                <p className="text-sm text-wc-white/20">Sem palpites ainda</p>
              ) : (
                <div className="space-y-3">
                  {groupedWinners.map(({ team, users }) => {
                    const flagUrl = getFlagUrl(team, "w40");
                    return (
                      <div
                        key={team}
                        className="rounded-xl border p-4"
                        style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <Trophy size={12} className="text-wc-gold" />
                            {flagUrl && (
                              <img src={flagUrl} alt={team} width={18} height={13} style={{ borderRadius: 2 }} />
                            )}
                            <span className="text-sm font-bold text-wc-white">{team}</span>
                          </div>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(233,177,58,0.1)", color: "#e9b13a" }}
                          >
                            {users.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {users.map((u) => <UserBadge key={u} name={u} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Por Utilizador ─────────────────────────────────────────────────── */}
      {section === "jogos" && tab === "user" && (
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
              {lbUsers.map((u) => (
                <option key={u.user_id} value={u.user_id} style={{ background: "#0d1b3e", color: "#fff" }}>
                  {u.user_name} · {u.total_points} pts
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-wc-white/30" />
          </div>

          {loadingUser && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          )}

          {!selectedUserId && !loadingUser && (
            <p className="text-center py-12 text-sm text-wc-white/20">
              Escolhe um participante para ver os seus palpites
            </p>
          )}

          {selectedUserId && !loadingUser && matchesByDay.length > 0 && (
            <>
              {matchesByDay.map(({ day, matches: dayMs }) => (
                <div key={day}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/20">
                      {weekdayShort(day)}
                    </span>
                    <span className="text-sm font-semibold text-wc-white/40">{dayLabel(day)}</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                  <div className="space-y-2">
                    {dayMs.map((match) => {
                      const pred = predMap[match.id];
                      return (
                        <MatchCard
                          key={match.id}
                          match={match}
                          home_goals={pred ? String(pred.home_goals ?? "") : ""}
                          away_goals={pred ? String(pred.away_goals ?? "") : ""}
                          bet_1x2={pred?.prediction_1x2 ?? ""}
                          disabled
                          onChange={() => {}}
                          showResult
                        />
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Global predictions */}
              {globalPred && (
                <div className="pb-4">
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
                        <Trophy size={12} className="text-wc-gold" /> Vencedor
                      </div>
                      <span className="text-sm font-bold text-wc-white">{globalPred.tournament_winner || "—"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-wc-white/40">
                        <Star size={12} className="text-wc-gold" /> Melhor Marcador
                      </div>
                      <span className="text-sm font-bold text-wc-white">{globalPred.top_scorer || "—"}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Por Dia ────────────────────────────────────────────────────────── */}
      {section === "jogos" && tab === "day" && (
        <div className="pt-4 pb-8 max-w-5xl mx-auto">
          {!selectedDay && days.length === 0 && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          )}

          {!selectedDay && days.length > 0 && (
            <p className="text-center py-12 text-sm text-wc-white/20">Seleciona um dia</p>
          )}

          {loadingDay && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          )}

          {selectedDay && !loadingDay && (
            <div className="space-y-6 px-4">
              {dayMatchesByGroup.map(({ key, phase, group, matches: gms }) => (
                <div key={key}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-3">
                    {phase === "group" ? (
                      <>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/20">
                          Fase de Grupos
                        </span>
                        <span className="font-display text-wc-gold text-base tracking-wider">
                          GRUPO {group}
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-wc-gold text-base tracking-wider uppercase">
                        {PHASE_LABELS[phase] ?? phase}
                      </span>
                    )}
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>

                  {/* Match rows */}
                  <div className="space-y-2">
                    {gms.map((match) => (
                      <div key={match.id} className="flex gap-2 sm:gap-3 items-stretch">
                        {/* Game info — fixed, stretches to match chips height */}
                        <GameInfoCard match={match} />

                        {/* User chips — 2-col on mobile, 4-col on desktop, grows vertically */}
                        <div
                          className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-1.5"
                          style={{ paddingTop: 9, paddingRight: 9, paddingBottom: 4 }}
                        >
                          {dayUsers.map((u) => {
                            const pred = match.predictions.find((p) => p.user_id === u.id) ?? {
                              user_id: u.id, user_name: u.name,
                              home_goals: null, away_goals: null,
                              prediction_1x2: null, points_earned: null,
                            };
                            return <UserChip key={u.id} pred={pred} match={match} />;
                          })}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {dayMatches.length === 0 && (
                <p className="text-center py-12 text-sm text-wc-white/20">Sem jogos neste dia</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
