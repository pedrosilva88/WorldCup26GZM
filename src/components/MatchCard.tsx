"use client";

import { Match } from "@/types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface MatchCardProps {
  match: Match;
  home_goals: string;
  away_goals: string;
  disabled: boolean;
  onChange: (field: "home_goals" | "away_goals", value: string) => void;
  showResult?: boolean;
}

function inferResult(home: string, away: string): { label: string; color: string } | null {
  const h = parseInt(home);
  const a = parseInt(away);
  if (isNaN(h) || isNaN(a) || home === "" || away === "") return null;
  if (h > a) return { label: "Vitória " + "1", color: "text-emerald-400" };
  if (h < a) return { label: "Vitória " + "2", color: "text-sky-400" };
  return { label: "Empate", color: "text-wc-gold" };
}

function sanitizeGoals(raw: string): string {
  // Strip everything except digits, clamp to 0-20
  const digits = raw.replace(/\D/g, "");
  if (digits === "") return "";
  const n = Math.min(parseInt(digits, 10), 20);
  return String(n);
}

const BLOCKED_KEYS = ["e", "E", "+", "-", ".", ",", " "];

export default function MatchCard({
  match,
  home_goals,
  away_goals,
  disabled,
  onChange,
  showResult = false,
}: MatchCardProps) {
  const isFinished = match.status === "finished";
  const result = inferResult(home_goals, away_goals);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (BLOCKED_KEYS.includes(e.key)) e.preventDefault();
  }

  function handleChange(field: "home_goals" | "away_goals", raw: string) {
    onChange(field, sanitizeGoals(raw));
  }

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all",
        disabled
          ? "bg-wc-blue/20 border-wc-blue-mid/20 opacity-70"
          : "bg-wc-blue-mid/20 border-wc-blue-mid/40 hover:border-wc-gold/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-wc-white/30">
          {match.group ? `Grupo ${match.group}` : "Eliminatória"}
        </span>
        <div className="flex items-center gap-1.5">
          {result && !disabled && (
            <span className={cn("text-[10px] font-bold", result.color)}>
              {result.label}
            </span>
          )}
          {disabled && (
            <div className="flex items-center gap-1 text-wc-white/30">
              <Lock size={10} />
              {isFinished && match.home_score !== null && (
                <span className="text-[10px]">
                  Real: {match.home_score}–{match.away_score}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Teams + score inputs */}
      <div className="flex items-center gap-3">
        {/* Home team */}
        <p className={cn(
          "flex-1 text-right font-semibold text-sm leading-tight",
          disabled ? "text-wc-white/40" : "text-wc-white"
        )}>
          {match.home_team}
        </p>

        {/* Score inputs */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="0"
            max="20"
            disabled={disabled}
            value={home_goals}
            onKeyDown={handleKey}
            onChange={(e) => handleChange("home_goals", e.target.value)}
            placeholder="0"
            className={cn(
              "w-14 h-14 text-center text-2xl font-black rounded-xl border transition-all outline-none",
              disabled
                ? home_goals !== ""
                  ? "bg-wc-blue-mid/30 border-wc-blue-mid/30 text-wc-white/50 cursor-not-allowed"
                  : "bg-wc-blue/20 border-wc-blue-mid/20 text-wc-white/20 cursor-not-allowed"
                : "bg-wc-blue/40 border-wc-blue-mid/50 text-wc-white focus:border-wc-gold focus:bg-wc-blue-mid/40 focus:scale-105"
            )}
          />

          <span className={cn(
            "font-black text-xl",
            disabled ? "text-wc-white/20" : "text-wc-white/50"
          )}>
            –
          </span>

          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="0"
            max="20"
            disabled={disabled}
            value={away_goals}
            onKeyDown={handleKey}
            onChange={(e) => handleChange("away_goals", e.target.value)}
            placeholder="0"
            className={cn(
              "w-14 h-14 text-center text-2xl font-black rounded-xl border transition-all outline-none",
              disabled
                ? away_goals !== ""
                  ? "bg-wc-blue-mid/30 border-wc-blue-mid/30 text-wc-white/50 cursor-not-allowed"
                  : "bg-wc-blue/20 border-wc-blue-mid/20 text-wc-white/20 cursor-not-allowed"
                : "bg-wc-blue/40 border-wc-blue-mid/50 text-wc-white focus:border-wc-gold focus:bg-wc-blue-mid/40 focus:scale-105"
            )}
          />
        </div>

        {/* Away team */}
        <p className={cn(
          "flex-1 font-semibold text-sm leading-tight",
          disabled ? "text-wc-white/40" : "text-wc-white"
        )}>
          {match.away_team}
        </p>
      </div>
    </div>
  );
}
