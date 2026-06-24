"use client";

import { useEffect, useState } from "react";

interface TopScorer {
  player_name: string;
  team_name: string;
  goals: number;
  photo_url?: string | null;
}

const RANK_COLORS = ["#e9b13a", "#cbd5e1", "#d97706"];

export default function TopScorersSection() {
  const [scorers, setScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/top-scorers")
      .then((r) => r.json())
      .then((data) => setScorers(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-2xl mx-auto px-4 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(180deg, #e9b13a, #e9b13a88)" }} />
        <h2 className="font-display text-2xl text-wc-white tracking-wider">MELHORES MARCADORES</h2>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      ) : scorers.length === 0 ? (
        <p className="text-sm text-wc-white/30">Ainda não há dados disponíveis.</p>
      ) : (
        <div className="space-y-2">
          {scorers.map((s, i) => (
            <div
              key={s.player_name}
              className="flex items-center gap-3 p-3.5 rounded-2xl border"
              style={{
                borderColor: i === 0 ? "rgba(233,177,58,0.4)" : i === 1 ? "rgba(148,163,184,0.25)" : "rgba(180,83,9,0.25)",
                background: i === 0 ? "rgba(233,177,58,0.08)" : i === 1 ? "rgba(148,163,184,0.06)" : "rgba(180,83,9,0.06)",
              }}
            >
              <span
                className="font-display text-lg tabular-nums w-6 text-right shrink-0"
                style={{ color: RANK_COLORS[i] }}
              >
                {i + 1}
              </span>

              {s.photo_url ? (
                <img
                  src={s.photo_url}
                  alt={s.player_name}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: "#1a1a1a" }}
                />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />
              )}

              <div className="flex-1 min-w-0">
                <p className="font-bold text-wc-white truncate leading-tight">{s.player_name}</p>
                <p className="text-[11px] text-wc-white/35">{s.team_name}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-display tabular-nums leading-none" style={{ fontSize: "1.75rem", color: RANK_COLORS[i] }}>
                  {s.goals}
                </p>
                <p className="text-[9px] text-wc-white/25 uppercase tracking-wider">golos</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
