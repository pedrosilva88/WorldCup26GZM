"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b border-white/8"
      style={{ background: "rgba(12,15,19,0.95)" }}
    >
      {/* Brand stripe — gold / green / red */}
      <div className="h-0.5 w-full flex">
        <div className="flex-1 bg-wc-gold" />
        <div className="flex-1 bg-wc-green" />
        <div className="flex-1 bg-wc-red" />
      </div>
      <div className="max-w-5xl mx-auto px-4 h-13 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
              src="/logos/emblem-512.png"
              alt="Bolão GZM"
              width={34}
              height={34}
              style={{ borderRadius: "50%", objectFit: "contain", flexShrink: 0 }}
            />
          <div className="flex flex-col leading-none">
            <span className="font-display text-wc-white text-lg tracking-wide leading-none">
              BOLÃO <span className="text-wc-gold">GZM</span>
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-wc-white/30 leading-none mt-0.5">
              Mundial 2026
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
