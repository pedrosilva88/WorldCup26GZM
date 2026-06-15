"use client";

import { Match, Prediction1x2 } from "@/types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface MatchCardProps {
  match: Match;
  prediction_1x2: Prediction1x2 | null;
  home_goals: string;
  away_goals: string;
  disabled: boolean;
  onChange: (field: "prediction_1x2" | "home_goals" | "away_goals", value: string) => void;
  showResult?: boolean;
}

const OPTIONS: { value: Prediction1x2; label: string }[] = [
  { value: "1", label: "1" },
  { value: "x", label: "X" },
  { value: "2", label: "2" },
];

export default function MatchCard({
  match,
  prediction_1x2,
  home_goals,
  away_goals,
  disabled,
  onChange,
  showResult = false,
}: MatchCardProps) {
  const isFinished = match.status === "finished";

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all",
        disabled
          ? "bg-wc-blue/20 border-wc-blue-mid/20 opacity-60"
          : "bg-wc-blue-mid/20 border-wc-blue-mid/40 hover:border-wc-gold/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-wc-white/30">
          {match.group ? `Grupo ${match.group}` : "Eliminatória"}
        </span>
        {disabled && (
          <div className="flex items-center gap-1 text-wc-white/30">
            <Lock size={10} />
            <span className="text-[10px]">
              {isFinished
                ? `${match.home_score} - ${match.away_score}`
                : "Encerrado"}
            </span>
          </div>
        )}
      </div>

      {/* Teams row */}
      <div className="flex items-center gap-2 mb-4">
        {/* Home team */}
        <div className="flex-1 text-right">
          <p className={cn(
            "font-semibold text-sm leading-tight",
            disabled ? "text-wc-white/50" : "text-wc-white"
          )}>
            {match.home_team}
          </p>
        </div>

        {/* VS / Score */}
        <div className="flex items-center justify-center w-10 shrink-0">
          {showResult && isFinished ? (
            <span className="text-xs font-bold text-wc-gold tabular-nums">
              {match.home_score}-{match.away_score}
            </span>
          ) : (
            <span className="text-xs text-wc-white/30 font-medium">vs</span>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1">
          <p className={cn(
            "font-semibold text-sm leading-tight",
            disabled ? "text-wc-white/50" : "text-wc-white"
          )}>
            {match.away_team}
          </p>
        </div>
      </div>

      {/* 1X2 buttons */}
      <div className="flex gap-2 mb-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange("prediction_1x2", opt.value)}
            className={cn(
              "flex-1 h-10 rounded-xl font-bold text-sm transition-all active:scale-95",
              prediction_1x2 === opt.value
                ? "bg-wc-gold text-wc-dark shadow-lg"
                : disabled
                ? "bg-wc-blue/30 text-wc-white/20 cursor-not-allowed"
                : "bg-wc-blue-mid/40 text-wc-white/60 hover:bg-wc-blue-mid/70 hover:text-wc-white"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Score inputs */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          max="20"
          disabled={disabled}
          value={home_goals}
          onChange={(e) => onChange("home_goals", e.target.value)}
          placeholder="0"
          className={cn(
            "flex-1 h-12 text-center text-xl font-bold rounded-xl border transition-all outline-none",
            disabled
              ? "bg-wc-blue/20 border-wc-blue-mid/20 text-wc-white/20 cursor-not-allowed"
              : "bg-wc-blue/40 border-wc-blue-mid/50 text-wc-white focus:border-wc-gold focus:bg-wc-blue-mid/40"
          )}
        />
        <span className="text-wc-white/40 font-bold text-lg">—</span>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="0"
          max="20"
          disabled={disabled}
          value={away_goals}
          onChange={(e) => onChange("away_goals", e.target.value)}
          placeholder="0"
          className={cn(
            "flex-1 h-12 text-center text-xl font-bold rounded-xl border transition-all outline-none",
            disabled
              ? "bg-wc-blue/20 border-wc-blue-mid/20 text-wc-white/20 cursor-not-allowed"
              : "bg-wc-blue/40 border-wc-blue-mid/50 text-wc-white focus:border-wc-gold focus:bg-wc-blue-mid/40"
          )}
        />
      </div>
    </div>
  );
}
