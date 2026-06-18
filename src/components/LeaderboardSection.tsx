"use client";

import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import { LeaderboardEntry } from "@/types";
import { RefreshCw } from "lucide-react";

export default function LeaderboardSection() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load(showRefresh = false) {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <section id="classificacao" className="max-w-2xl mx-auto px-4 py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Colored accent bar */}
          <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(180deg, #e9b13a, #dd4a3b)" }} />
          <h2 className="font-display text-2xl text-wc-white tracking-wider">CLASSIFICAÇÃO</h2>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs text-wc-white/30 hover:text-wc-gold transition-colors disabled:opacity-40 px-2 py-1"
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse"
              style={{ background: "rgba(255,255,255,0.04)" }} />
          ))}
        </div>
      ) : (
        <Leaderboard entries={entries} />
      )}
    </section>
  );
}
