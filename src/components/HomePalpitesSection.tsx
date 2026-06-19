"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Trophy } from "lucide-react";
import { getFlagUrl } from "@/lib/flags";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayUser { id: string; name: string; }

interface UserPred {
  user_id: string; user_name: string;
  home_goals: number | null; away_goals: number | null;
  prediction_1x2: string | null; points_earned: number | null;
}

interface DayMatch {
  id: string; home_team: string; away_team: string;
  match_date: string; status: string;
  home_score: number | null; away_score: number | null;
  group: string; match_order: number;
  matchday?: number | null;
  predictions: UserPred[];
}

interface GroupedScorer { player: string; users: string[]; goals: number | null; photo_url?: string | null; }
interface GroupedWinner { team: string; users: string[]; }

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── UserBadge ────────────────────────────────────────────────────────────────

function UserBadge({ name }: { name: string }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      color: "#bbb", whiteSpace: "nowrap",
    }}>
      {name}
    </span>
  );
}

// ─── UserChip ─────────────────────────────────────────────────────────────────

function UserChip({ pred, match }: { pred: UserPred; match: DayMatch }) {
  const state = chipState(pred, match);
  const hasScore = pred.home_goals !== null;
  const score = hasScore ? `${pred.home_goals}–${pred.away_goals}` : "–";
  const pts = pred.points_earned ?? 0;
  const bet = pred.prediction_1x2;
  const showBadge = hasScore && state !== "pending";

  const styles = {
    exact:   { bg: "#100e00", border: "#2e2600", scoreColor: "#e9b13a", ptsBg: "#342b00", ptsTxt: "#e9b13a", betTxt: "#e0a830", betBg: "#2a2200" },
    partial: { bg: "#0d1608", border: "#1e3010", scoreColor: "#5ed46a", ptsBg: "#1a3a1a", ptsTxt: "#5ed46a", betTxt: "#4caf74", betBg: "#1a3a1a" },
    wrong:   { bg: "#0e0e0e", border: "#1a1a1a", scoreColor: "#2e2e2e", ptsBg: "#1c1c1c", ptsTxt: "#444",    betTxt: "#aaa",    betBg: "#333" },
    pending: { bg: "#0e0e0e", border: "#1e1e1e", scoreColor: "#555",    ptsBg: "transparent", ptsTxt: "#2a2a2a", betTxt: "#bbb", betBg: "#333" },
  }[state];

  return (
    <div className="w-full h-[72px]" style={{
      flexShrink: 0, position: "relative",
      background: styles.bg, border: `1px solid ${styles.border}`,
      borderRadius: 8, padding: "7px 9px 6px",
      opacity: state === "pending" ? 0.5 : 1,
    }}>
      <p style={{ fontSize: 9, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>
        {pred.user_name}
      </p>
      <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 17, fontWeight: 800, color: styles.scoreColor, lineHeight: 1, whiteSpace: "nowrap" }}>
        {score}
      </p>
      {showBadge && (
        <div style={{
          position: "absolute", top: -7, right: -7,
          minWidth: 18, height: 18,
          background: pts > 0 ? styles.ptsBg : "#1c1c1c",
          color: pts > 0 ? styles.ptsTxt : "#3a3a3a",
          border: `2px solid ${styles.bg}`, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 800, letterSpacing: "0.02em",
          padding: "0 4px", lineHeight: 1, zIndex: 10,
        }}>
          {pts > 0 ? `+${pts}` : "0"}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }}>
        {(["1", "x", "2"] as const).map((opt, i) => {
          const isSelected = bet === opt;
          return (
            <span key={opt} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <span style={{ fontSize: 8, color: styles.betTxt, padding: "0 1px", opacity: 0.2 }}>·</span>}
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "1px 3px", borderRadius: 3,
                color: styles.betTxt, background: isSelected ? styles.betBg : "transparent",
                opacity: isSelected ? 1 : 0.2,
              }}>{opt.toUpperCase()}</span>
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
    <div className="w-[96px] sm:w-[180px]" style={{
      flexShrink: 0, alignSelf: "stretch",
      background: "rgba(22,22,22,0.9)", border: "1px solid #222",
      borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {match.matchday && (
            <span style={{ fontSize: 9, fontWeight: 800, color: "#444", letterSpacing: "0.04em" }}>J{match.matchday}</span>
          )}
          <p style={{ fontSize: 10, color: "#555", lineHeight: 1 }}>{matchTimeStr(match.match_date)}</p>
        </div>
        {([
          { team: match.home_team, score: match.home_score },
          { team: match.away_team, score: match.away_score },
        ] as const).map((t, i) => {
          const flagUrl = getFlagUrl(t.team, "w40");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {flagUrl && <img src={flagUrl} alt={t.team} width={16} height={11} style={{ borderRadius: 2, flexShrink: 0 }} />}
              <span className="hidden sm:block" style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#bbb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.team}</span>
              <span className="sm:hidden" style={{ flex: 1, fontSize: 10, fontWeight: 700, color: "#888", overflow: "hidden", whiteSpace: "nowrap" }}>{t.team.substring(0, 3).toUpperCase()}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: finished ? "#fff" : "#2a2a2a", minWidth: 10, textAlign: "right", flexShrink: 0 }}>
                {finished ? String(t.score ?? "?") : "–"}
              </span>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
          {(["1", "x", "2"] as const).map((opt) => (
            <span key={opt} style={{
              fontSize: 10, fontWeight: 800, padding: "1px 4px", borderRadius: 3,
              color: actual1x2 === opt ? "#e8c94a" : finished ? "#2e2e2e" : "#1e1e1e",
              background: actual1x2 === opt ? "rgba(30,25,0,1)" : "transparent",
            }}>{opt.toUpperCase()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HomePalpitesSection() {
  const today = new Date().toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });

  const dayOptions = [
    { label: "Ontem", date: new Date(Date.now() - 86400000).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" }) },
    { label: "Hoje",  date: today },
    { label: "Amanhã", date: new Date(Date.now() + 86400000).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" }) },
  ];

  const [section, setSection] = useState<"jogos" | "marcador" | "campeao">("jogos");

  // ── Jogos state ───────────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(today);
  const [dayMatches, setDayMatches] = useState<DayMatch[]>([]);
  const [dayUsers, setDayUsers] = useState<DayUser[]>([]);
  const [loading, setLoading] = useState(false);

  // ── Global predictions state ──────────────────────────────────────────────
  const [groupedScorers, setGroupedScorers] = useState<GroupedScorer[]>([]);
  const [groupedWinners, setGroupedWinners] = useState<GroupedWinner[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [globalLoaded, setGlobalLoaded] = useState(false);

  useEffect(() => {
    if (section !== "jogos") return;
    setLoading(true);
    fetch(`/api/palpites/day?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => { setDayMatches(data.matches ?? []); setDayUsers(data.users ?? []); })
      .finally(() => setLoading(false));
  }, [selectedDate, section]);

  useEffect(() => {
    if (section !== "marcador" && section !== "campeao") return;
    if (globalLoaded) return;
    setLoadingGlobal(true);
    fetch("/api/palpites/global")
      .then((r) => r.json())
      .then((data) => {
        setGroupedScorers(data.groupedScorers ?? []);
        setGroupedWinners(data.groupedWinners ?? []);
        setGlobalLoaded(true);
      })
      .finally(() => setLoadingGlobal(false));
  }, [section, globalLoaded]);

  const matchesByGroup = (() => {
    const sections: { group: string; matches: DayMatch[] }[] = [];
    for (const m of dayMatches) {
      const last = sections[sections.length - 1];
      if (last?.group === m.group) last.matches.push(m);
      else sections.push({ group: m.group, matches: [m] });
    }
    return sections;
  })();

  return (
    <section className="px-4 py-12 lg:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-wc-electric" />
          <h2 className="font-display text-2xl text-wc-white tracking-wider">PALPITES</h2>
        </div>
        <Link href="/palpites" className="flex items-center gap-1 text-xs text-wc-white/30 hover:text-wc-gold transition-colors">
          Ver tudo <ArrowRight size={12} />
        </Link>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-4">
        {([
          { key: "jogos",    label: "Jogos" },
          { key: "marcador", label: "Marcador" },
          { key: "campeao",  label: "Campeão" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all",
              section === key
                ? "bg-wc-gold text-[#0c0f13] border-wc-gold"
                : "bg-transparent text-wc-white/30 border-white/8 hover:text-wc-white/60"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Jogos ──────────────────────────────────────────────────────────── */}
      {section === "jogos" && (
        <>
          {/* Day tabs */}
          <div className="flex gap-1.5 mb-5">
            {dayOptions.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={
                  selectedDate === d.date
                    ? { background: "rgba(233,177,58,0.12)", color: "#e9b13a", borderColor: "rgba(233,177,58,0.3)", fontWeight: 700 }
                    : { background: "transparent", color: "#555", borderColor: "#1e1e1e" }
                }
              >
                {d.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
            </div>
          ) : dayMatches.length === 0 ? (
            <p className="text-center py-12 text-sm text-wc-white/20">Sem jogos neste dia</p>
          ) : (
            <div className="space-y-6">
              {matchesByGroup.map(({ group, matches: gms }, gi) => (
                <div key={`${group}-${gi}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/20">Fase de Grupos</span>
                    <span className="font-display text-wc-gold text-base tracking-wider">GRUPO {group}</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                  <div className="space-y-2">
                    {gms.map((match) => (
                      <div key={match.id} className="flex gap-2 items-stretch">
                        <GameInfoCard match={match} />
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-1.5" style={{ paddingTop: 9, paddingRight: 9, paddingBottom: 4 }}>
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
            </div>
          )}
        </>
      )}

      {/* ── Marcador ───────────────────────────────────────────────────────── */}
      {section === "marcador" && (
        loadingGlobal ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
          </div>
        ) : groupedScorers.length === 0 ? (
          <p className="text-center py-12 text-sm text-wc-white/20">Sem palpites ainda</p>
        ) : (
          <div className="space-y-3">
            {groupedScorers.map(({ player, users, goals, photo_url }) => (
              <div key={player} className="rounded-xl border p-4"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    {photo_url ? (
                      <img src={photo_url} alt={player} width={28} height={28} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "#1a1a1a" }} />
                    ) : (
                      <Star size={12} className="text-wc-gold" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-wc-white">{player}</p>
                      {goals !== null && <p className="text-[11px] text-wc-white/40">⚽ {goals}</p>}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#888" }}>
                    {users.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {users.map((u) => <UserBadge key={u} name={u} />)}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Campeão ────────────────────────────────────────────────────────── */}
      {section === "campeao" && (
        loadingGlobal ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" />
          </div>
        ) : groupedWinners.length === 0 ? (
          <p className="text-center py-12 text-sm text-wc-white/20">Sem palpites ainda</p>
        ) : (
          <div className="space-y-3">
            {groupedWinners.map(({ team, users }) => {
              const flagUrl = getFlagUrl(team, "w40");
              return (
                <div key={team} className="rounded-xl border p-4"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <Trophy size={12} className="text-wc-gold" />
                      {flagUrl && <img src={flagUrl} alt={team} width={18} height={13} style={{ borderRadius: 2 }} />}
                      <span className="text-sm font-bold text-wc-white">{team}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "#888" }}>
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
        )
      )}
    </section>
  );
}
