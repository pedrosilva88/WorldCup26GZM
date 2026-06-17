"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFlagUrl } from "@/lib/flags";

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
  predictions: UserPred[];
}

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

// ─── UserChip ─────────────────────────────────────────────────────────────────

function UserChip({ pred, match }: { pred: UserPred; match: DayMatch }) {
  const state = chipState(pred, match);
  const hasScore = pred.home_goals !== null;
  const score = hasScore ? `${pred.home_goals}–${pred.away_goals}` : "–";
  const pts = pred.points_earned ?? 0;
  const bet = pred.prediction_1x2;
  const firstName = pred.user_name.split(" ")[0];
  const showBadge = hasScore && state !== "pending";

  const styles = {
    exact:   { bg: "#100d00", border: "#2e2200", scoreColor: "#f5c300", ptsBg: "#3a2e00", ptsTxt: "#f5c300", betTxt: "#e8c94a", betBg: "#2a2200" },
    partial: { bg: "#0d1608", border: "#1e3010", scoreColor: "#5ed46a", ptsBg: "#1a3a1a", ptsTxt: "#5ed46a", betTxt: "#4caf74", betBg: "#1a3a1a" },
    wrong:   { bg: "#0e0e0e", border: "#1a1a1a", scoreColor: "#2e2e2e", ptsBg: "#1c1c1c", ptsTxt: "#444",    betTxt: "#666",    betBg: "#2a2a2a" },
    pending: { bg: "#0e0e0e", border: "#1e1e1e", scoreColor: "#555",    ptsBg: "transparent", ptsTxt: "#2a2a2a", betTxt: "#777", betBg: "#2a2a2a" },
  }[state];

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
      <p style={{ fontSize: 9, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888", maxWidth: 62, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>
        {firstName}
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
          border: `2px solid ${styles.bg}`,
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 800, letterSpacing: "0.02em",
          padding: "0 4px", lineHeight: 1, zIndex: 10,
        }}>
          {pts > 0 ? `+${pts}` : "0"}
        </div>
      )}

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
      className="w-[96px] sm:w-[180px]"
      style={{
        flexShrink: 0, alignSelf: "stretch",
        background: "rgba(22,22,22,0.9)", border: "1px solid #222",
        borderRadius: 8, padding: "8px 10px",
        display: "flex", alignItems: "center",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
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
              {flagUrl && <img src={flagUrl} alt={t.team} width={16} height={11} style={{ borderRadius: 2, flexShrink: 0 }} />}
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

export default function HomePalpitesSection() {
  const today = new Date().toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });

  const dayOptions = [
    {
      label: "Ontem",
      date: new Date(Date.now() - 86400000).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" }),
    },
    { label: "Hoje", date: today },
    {
      label: "Amanhã",
      date: new Date(Date.now() + 86400000).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" }),
    },
  ];

  const [selectedDate, setSelectedDate] = useState(today);
  const [dayMatches, setDayMatches] = useState<DayMatch[]>([]);
  const [dayUsers, setDayUsers] = useState<DayUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/palpites/day?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => {
        setDayMatches(data.matches ?? []);
        setDayUsers(data.users ?? []);
      })
      .finally(() => setLoading(false));
  }, [selectedDate]);

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-wc-electric" />
          <h2 className="font-display text-2xl text-wc-white tracking-wider">PALPITES</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Day tabs */}
          <div className="flex gap-1.5">
            {dayOptions.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={
                  selectedDate === d.date
                    ? { background: "#f5c300", color: "#060d1e", borderColor: "#f5c300", fontWeight: 700 }
                    : { background: "transparent", color: "#555", borderColor: "#1e1e1e" }
                }
              >
                {d.label}
              </button>
            ))}
          </div>
          <Link
            href="/palpites"
            className="flex items-center gap-1 text-xs text-wc-white/30 hover:text-wc-gold transition-colors"
          >
            Ver tudo <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Content */}
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
                <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/20">
                  Fase de Grupos
                </span>
                <span className="font-display text-wc-gold text-base tracking-wider">
                  GRUPO {group}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>

              <div className="space-y-2">
                {gms.map((match) => (
                  <div key={match.id} className="flex gap-2 items-stretch">
                    <GameInfoCard match={match} />
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
        </div>
      )}
    </section>
  );
}
