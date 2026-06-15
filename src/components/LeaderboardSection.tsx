"use client";

import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import { LeaderboardEntry } from "@/types";
import { BarChart3, RefreshCw } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-wc-gold" />
          <h2 className="text-xl font-bold text-wc-white">Classificação</h2>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs text-wc-white/40 hover:text-wc-gold transition-colors disabled:opacity-40 px-2 py-1"
        >
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-wc-blue-mid/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <Leaderboard entries={entries} />
      )}
    </section>
  );
}
