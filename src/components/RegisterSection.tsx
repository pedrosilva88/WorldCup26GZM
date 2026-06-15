"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { ALL_TEAMS } from "@/lib/matches-data";
import { cn } from "@/lib/utils";

export default function RegisterSection() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [topScorer, setTopScorer] = useState("");
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !topScorer.trim() || !winner.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          top_scorer: topScorer.trim(),
          tournament_winner: winner,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao registar. Tenta novamente.");
        return;
      }

      setSuccess(true);
      // Redirect to predictions page after short delay
      setTimeout(() => router.push(`/prever/${data.token}`), 800);
    } catch {
      setError("Erro de ligação. Verifica a tua internet.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section id="inscricao" className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center py-12">
          <CheckCircle2 size={48} className="mx-auto text-wc-gold mb-4" />
          <h3 className="text-xl font-bold text-wc-white mb-2">Inscrito com sucesso!</h3>
          <p className="text-wc-white/50 text-sm">A redirecionar para o formulário de previsões...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inscricao" className="max-w-lg mx-auto px-4 py-12">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <UserPlus size={20} className="text-wc-gold" />
        <h2 className="text-xl font-bold text-wc-white">Inscrição</h2>
      </div>

      <div className="bg-wc-blue-mid/20 border border-wc-blue-mid/40 rounded-2xl p-5 sm:p-6">
        <p className="text-sm text-wc-white/50 mb-6 leading-relaxed">
          Escolhe um nome único, prevê o melhor marcador e o vencedor do torneio.
          Depois preenches os resultados jogo a jogo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
              Nome único *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Pedro Silva"
              maxLength={40}
              required
              className={cn(
                "w-full h-12 px-4 rounded-xl border bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none transition-all",
                error.includes("nome")
                  ? "border-wc-red/60 focus:border-wc-red"
                  : "border-wc-blue-mid/50 focus:border-wc-gold"
              )}
            />
          </div>

          {/* Top Scorer */}
          <div>
            <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
              Melhor marcador <span className="text-wc-gold">(15 pts)</span>
            </label>
            <input
              type="text"
              value={topScorer}
              onChange={(e) => setTopScorer(e.target.value)}
              placeholder="Ex: Cristiano Ronaldo"
              maxLength={60}
              required
              className="w-full h-12 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all"
            />
          </div>

          {/* Winner */}
          <div>
            <label className="block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2">
              Vencedor do Mundial <span className="text-wc-gold">(10 pts)</span>
            </label>
            <select
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
              required
              className={cn(
                "w-full h-12 px-4 rounded-xl border bg-wc-blue/40 text-wc-white outline-none transition-all appearance-none cursor-pointer",
                winner
                  ? "border-wc-gold/50 text-wc-white"
                  : "border-wc-blue-mid/50 text-wc-white/30",
                "focus:border-wc-gold"
              )}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23c9a84c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
            >
              <option value="" disabled>Escolhe uma seleção...</option>
              {ALL_TEAMS.map((team) => (
                <option key={team} value={team} style={{ background: "#0a2240" }}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-wc-red bg-wc-red/10 border border-wc-red/30 rounded-xl px-4 py-3">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !name.trim() || !topScorer.trim() || !winner}
            className="w-full h-13 py-3.5 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark disabled:text-wc-dark/40 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                A registar...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Inscrever e Prever Jogos
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
