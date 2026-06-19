"use client";

import { LeaderboardEntry } from "@/types";
import { Trophy, Star, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const RANK_CONFIG = [
  {
    bg: "border-wc-gold/40",
    cardStyle: { background: "rgba(233,177,58,0.08)" },
    numStyle: { color: "#e9b13a" },
  },
  {
    bg: "border-slate-400/25",
    cardStyle: { background: "rgba(148,163,184,0.06)" },
    numStyle: { color: "#cbd5e1" },
  },
  {
    bg: "border-amber-700/25",
    cardStyle: { background: "rgba(180,83,9,0.06)" },
    numStyle: { color: "#d97706" },
  },
];

function Avatar({ entry, idx }: { entry: LeaderboardEntry; idx: number }) {
  const index = entry.avatar_index;
  if (index) {
    return (
      <div
        style={{
          width: 44, height: 44, flexShrink: 0,
          backgroundImage: `url(/avatars/avatar${index}.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-label={entry.user_name}
      />
    );
  }
  // fallback — number badge
  const isTop = idx < 3;
  if (idx === 0) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #e9b13a, #f2c56a)" }}>
        <Trophy size={14} className="text-wc-dark" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: isTop ? "rgba(148,163,184,0.15)" : "rgba(255,255,255,0.05)" }}>
      <span className="font-display text-wc-white/30 text-base">{idx + 1}</span>
    </div>
  );
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-wc-white/30">
        <Trophy size={48} className="mx-auto mb-3 opacity-20" />
        <p className="text-sm">A classificação estará disponível quando começar o torneio.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => {
        const cfg = RANK_CONFIG[idx];
        const isTop = idx < 3;

        return (
          <div
            key={entry.user_id}
            className={cn(
              "flex items-center gap-3 p-3.5 rounded-2xl border transition-all",
              isTop ? cfg.bg : "border-white/6",
              idx === 0 && "glow-gold"
            )}
            style={isTop ? cfg.cardStyle : { background: "rgba(255,255,255,0.03)" }}
          >
            {/* Avatar */}
            <div className="shrink-0">
              <Avatar entry={entry} idx={idx} />
            </div>

            {/* Name + stats */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-bold truncate leading-tight",
                idx === 0 ? "text-wc-gold" : idx < 3 ? "text-wc-white" : "text-wc-white/60"
              )}>
                {entry.user_name}
              </p>
              <div className="flex gap-3 mt-0.5">
                <span className="text-[11px] text-wc-white/30 flex items-center gap-1">
                  <Target size={9} /> {entry.correct_1x2} 1x2
                </span>
                <span className="text-[11px] text-wc-white/30 flex items-center gap-1">
                  <Star size={9} /> {entry.correct_scores} exatos
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right shrink-0">
              <p className="font-display tabular-nums leading-none"
                style={{
                  fontSize: "1.75rem",
                  ...(isTop ? cfg.numStyle : { color: "rgba(255,255,255,0.4)" }),
                }}>
                {entry.total_points}
              </p>
              <p className="text-[10px] text-wc-white/25 tracking-widest uppercase">pts</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
