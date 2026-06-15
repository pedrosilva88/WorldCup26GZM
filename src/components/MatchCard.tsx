"use client";

import { Match } from "@/types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { getFlagUrl } from "@/lib/flags";

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
  if (h > a) return { label: "Vitória 1", color: "text-wc-green" };
  if (h < a) return { label: "Vitória 2", color: "text-wc-electric" };
  return { label: "Empate", color: "text-wc-gold" };
}

function sanitizeGoals(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") return "";
  const n = Math.min(parseInt(digits, 10), 20);
  return String(n);
}

const BLOCKED_KEYS = ["e", "E", "+", "-", ".", ",", " "];

function TeamFlag({ team, align }: { team: string; align: "left" | "right" }) {
  const url = getFlagUrl(team, "w40");
  return (
    <div className={cn("flex-1 flex items-center gap-2 min-w-0", align === "right" ? "flex-row-reverse" : "flex-row")}>
      {url && (
        <img
          src={url}
          alt={team}
          width={22}
          height={15}
          className="rounded-[3px] shrink-0 shadow-sm"
        />
      )}
      <p className={cn(
        "font-semibold text-sm leading-tight truncate",
        align === "right" ? "text-right" : "text-left"
      )}>
        {team}
      </p>
    </div>
  );
}

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
          ? "border-white/6 opacity-70"
          : "border-white/10 hover:border-wc-electric/30"
      )}
      style={
        disabled
          ? { background: "rgba(255,255,255,0.02)" }
          : { background: "rgba(35,82,240,0.06)" }
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-wc-white/25">
          {match.group ? `Grupo ${match.group}` : "Eliminatória"}
        </span>
        <div className="flex items-center gap-1.5">
          {result && !disabled && (
            <span className={cn("text-[10px] font-bold", result.color)}>
              {result.label}
            </span>
          )}
          {disabled && (
            <div className="flex items-center gap-1 text-wc-white/25">
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
        <div className={disabled ? "text-wc-white/35" : "text-wc-white"}>
          <TeamFlag team={match.home_team} align="right" />
        </div>

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
                  ? "border-white/10 text-wc-white/40 cursor-not-allowed"
                  : "border-white/5 text-wc-white/15 cursor-not-allowed"
                : "border-wc-electric/30 text-wc-white focus:border-wc-gold focus:scale-105"
            )}
            style={
              disabled
                ? { background: "rgba(255,255,255,0.04)" }
                : { background: "rgba(35,82,240,0.15)" }
            }
          />

          <span className={cn(
            "font-black text-xl",
            disabled ? "text-wc-white/15" : "text-wc-white/40"
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
                  ? "border-white/10 text-wc-white/40 cursor-not-allowed"
                  : "border-white/5 text-wc-white/15 cursor-not-allowed"
                : "border-wc-electric/30 text-wc-white focus:border-wc-gold focus:scale-105"
            )}
            style={
              disabled
                ? { background: "rgba(255,255,255,0.04)" }
                : { background: "rgba(35,82,240,0.15)" }
            }
          />
        </div>

        {/* Away team */}
        <div className={disabled ? "text-wc-white/35" : "text-wc-white"}>
          <TeamFlag team={match.away_team} align="left" />
        </div>
      </div>
    </div>
  );
}
