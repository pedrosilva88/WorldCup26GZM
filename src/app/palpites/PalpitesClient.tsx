"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Match } from "@/types";
import MatchCard from "@/components/MatchCard";
import { cn } from "@/lib/utils";
import { Trophy, Star, ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getFlagUrl } from "@/lib/flags";

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
  group: string;
  match_order: number;
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
    exact:   { bg: "#100d00", border: "#2e2200", scoreColor: "#f5c300", ptsBg: "#3a2e00", ptsTxt: "#f5c300", betTxt: "#e8c94a", betBg: "#2a2200" },
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
        {(["1", "x", "2"] as const).map((opt, i) => (
          <span key={opt} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && <span style={{ fontSize: 8, color: "#1e1e1e", padding: "0 1px" }}>·</span>}
            <span style={{
              fontSize: 9, fontWeight: 700, padding: "1px 3px", borderRadius: 3,
              color: bet === opt ? styles.betTxt : "#252525",
              background: bet === opt ? styles.betBg : "transparent",
            }}>
              {opt.toUpperCase()}
            </span>
          </span>
        ))}
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
        {/* Time — same column, aligned with teams */}
        <p style={{ fontSize: 10, color: "#555", lineHeight: 1 }}>
          {matchTimeStr(match.match_date)}
        </p>

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function PalpitesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      .filter((m) => m.match_date && m.phase === "group")
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

  // Group day matches by group (preserving chronological order within group changes)
  const dayMatchesByGroup = (() => {
    const sections: { group: string; matches: DayMatch[] }[] = [];
    for (const m of dayMatches) {
      const last = sections[sections.length - 1];
      if (last?.group === m.group) last.matches.push(m);
      else sections.push({ group: m.group, matches: [m] });
    }
    return sections;
  })();

  const today = new Date().toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
  const selectedLbUser = lbUsers.find((u) => u.user_id === selectedUserId);

  return (
    <div className="min-h-screen pb-16">
      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md" style={{ background: "rgba(6,13,30,0.96)" }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-wc-white/40 hover:text-wc-white transition-colors p-1">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="text-sm font-bold text-wc-white leading-tight">
                {tab === "user" ? (selectedLbUser?.user_name ?? "Palpites") : "Palpites · " + (selectedDay ? dayLabel(selectedDay) : "")}
              </p>
              <p className="text-xs text-wc-white/30">
                {tab === "user" ? "Por Utilizador" : "Por Dia"}
              </p>
            </div>
          </div>
          {tab === "user" && selectedLbUser && (
            <div className="text-right">
              <p className="text-xs text-wc-white/30">Pontos</p>
              <p className="font-display text-xl text-wc-gold tabular-nums">{selectedLbUser.total_points}</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/6 px-4">
          {(["day", "user"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border-b-2 -mb-px",
                tab === t
                  ? "text-wc-gold border-wc-gold"
                  : "text-wc-white/30 border-transparent hover:text-wc-white/60"
              )}
            >
              {t === "user" ? "Por Utilizador" : "Por Dia"}
            </button>
          ))}
        </div>

        {/* Day strip (Por Dia only) */}
        {tab === "day" && days.length > 0 && (
          <div className="flex overflow-x-auto scrollbar-none px-4 gap-2 py-2.5">
            {days.map((d) => {
              const isPast = d < today;
              const isToday = d === today;
              const isSelected = d === selectedDay;
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className="flex-shrink-0 px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all"
                  style={
                    isSelected
                      ? { background: "#f5c300", color: "#060d1e", borderColor: "#f5c300", fontWeight: 700 }
                      : isPast
                      ? { background: "transparent", color: "#666", borderColor: "#222" }
                      : isToday
                      ? { background: "rgba(245,195,0,0.08)", color: "#e8c94a", borderColor: "rgba(245,195,0,0.25)" }
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

      {/* ── Por Utilizador ─────────────────────────────────────────────────── */}
      {tab === "user" && (
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
                        <Star size={12} className="text-wc-electric" /> Melhor Marcador
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
      {tab === "day" && (
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
              {dayMatchesByGroup.map(({ group, matches: gms }, gi) => (
                <div key={`${group}-${gi}`}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/20">
                      Fase de Grupos
                    </span>
                    <span className="font-display text-wc-gold text-base tracking-wider">
                      GRUPO {group}
                    </span>
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
