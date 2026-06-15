"use client";

import { LeaderboardEntry } from "@/types";
import { Trophy, Medal, Star, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const RANK_STYLES = [
  { bg: "bg-wc-gold/20 border-wc-gold/50", text: "text-wc-gold", icon: <Trophy size={16} className="text-wc-gold" /> },
  { bg: "bg-slate-400/10 border-slate-400/30", text: "text-slate-300", icon: <Medal size={16} className="text-slate-300" /> },
  { bg: "bg-amber-700/10 border-amber-700/30", text: "text-amber-600", icon: <Medal size={16} className="text-amber-600" /> },
];

export default function Leaderboard({ entries }: LeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-wc-white/40">
        <Trophy size={48} className="mx-auto mb-3 opacity-20" />
        <p className="text-sm">Ainda sem participantes. Sê o primeiro a inscrever-te!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => {
        const style = RANK_STYLES[idx] ?? {
          bg: "bg-wc-blue-mid/20 border-wc-blue-mid/30",
          text: "text-wc-white/60",
          icon: <span className="text-xs font-bold text-wc-white/40">{idx + 1}</span>,
        };

        return (
          <div
            key={entry.user_id}
            className={cn(
              "flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all",
              style.bg,
              idx === 0 && "glow-gold"
            )}
          >
            {/* Rank */}
            <div className="w-7 flex items-center justify-center shrink-0">
              {style.icon}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className={cn("font-semibold truncate", style.text)}>
                {entry.user_name}
              </p>
              <div className="flex gap-3 mt-0.5">
                <span className="text-xs text-wc-white/40 flex items-center gap-1">
                  <Target size={10} /> {entry.correct_1x2} 1x2
                </span>
                <span className="text-xs text-wc-white/40 flex items-center gap-1">
                  <Star size={10} /> {entry.correct_scores} resultados
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right shrink-0">
              <p className={cn("text-xl font-bold tabular-nums", style.text)}>
                {entry.total_points}
              </p>
              <p className="text-xs text-wc-white/30">pts</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
