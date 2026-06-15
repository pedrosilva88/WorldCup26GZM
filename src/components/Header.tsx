"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/8"
      style={{ background: "rgba(6,13,30,0.95)" }}>
      {/* Colored top stripe — WC2026 style */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-wc-electric" />
        <div className="flex-1 bg-wc-red" />
        <div className="flex-1 bg-wc-green" />
        <div className="flex-1 bg-wc-gold" />
      </div>
      <div className="max-w-5xl mx-auto px-4 h-13 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-wc-navy text-xl leading-none"
            style={{ background: "linear-gradient(135deg, #f5c300, #ffd93d)" }}>
            26
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-wc-white text-lg tracking-wider leading-none">BOLÃO</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-wc-white/30 leading-none mt-0.5">
              GZM · Mundial 2026
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/palpites"
            className="text-sm font-bold text-wc-white/50 hover:text-wc-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all tracking-wide"
          >
            Palpites
          </Link>
          <Link
            href="/#classificacao"
            className="text-sm font-bold text-wc-white/50 hover:text-wc-gold px-3 py-1.5 rounded-lg hover:bg-wc-gold/10 transition-all tracking-wide"
          >
            Classificação
          </Link>
        </nav>
      </div>
    </header>
  );
}
