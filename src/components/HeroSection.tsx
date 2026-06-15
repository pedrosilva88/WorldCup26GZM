"use client";

import Link from "next/link";
import { Trophy, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background gradient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-5%] right-[10%] w-80 h-80 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #1e4d8c 0%, transparent 70%)" }} />
        <div className="absolute top-[30%] right-[30%] w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #c1272d 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-wc-gold/10 border border-wc-gold/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-wc-red animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-wc-gold">
            A Decorrer · Jun 2026
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 leading-none">
          <span className="text-wc-white">MUNDIAL</span>
          <br />
          <span className="text-gold-gradient">2026</span>
        </h1>
        <p className="text-base sm:text-lg text-wc-white/50 mb-2 font-medium">
          EUA · Canadá · México
        </p>
        <p className="text-sm text-wc-white/30 mb-10">
          Prevê os resultados, o melhor marcador e o vencedor.
          <br className="hidden sm:block" />
          Compete com os teus amigos e sobe na classificação.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#inscricao"
            className="inline-flex items-center justify-center gap-2 bg-wc-gold hover:bg-wc-gold-light text-wc-dark font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <Trophy size={18} />
            Inscrever e Prever
          </Link>
          <Link
            href="/#classificacao"
            className="inline-flex items-center justify-center gap-2 border border-wc-blue-mid/60 text-wc-white/70 hover:text-wc-white hover:border-wc-gold/40 px-8 py-3.5 rounded-xl transition-all"
          >
            Ver Classificação
          </Link>
        </div>

        {/* Scoring legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-6">
          {[
            { pts: "1 pt", label: "1X2 correto" },
            { pts: "3 pts", label: "Resultado exato" },
            { pts: "10 pts", label: "Vencedor" },
            { pts: "15 pts", label: "Melhor marcador" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-wc-blue-mid/20 border border-wc-blue-mid/30 rounded-lg px-3 py-2">
              <span className="text-wc-gold font-bold text-sm tabular-nums">{item.pts}</span>
              <span className="text-wc-white/40 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-14">
        <ChevronDown size={20} className="text-wc-white/20 animate-bounce" />
      </div>
    </section>
  );
}
