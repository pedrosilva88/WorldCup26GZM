"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-wc-blue-mid/40"
      style={{ background: "rgba(6,14,26,0.92)" }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Trophy
            size={22}
            className="text-wc-gold group-hover:text-wc-gold-light transition-colors"
          />
          <span className="font-bold text-base tracking-wide text-gold-gradient">
            MUNDIAL 2026
          </span>
          <span className="text-xs font-medium text-wc-white/40 hidden sm:block ml-1">
            Bolão GZM
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/#classificacao"
            className="text-sm text-wc-white/70 hover:text-wc-gold px-3 py-1.5 rounded-lg hover:bg-wc-blue-mid/30 transition-all"
          >
            Classificação
          </Link>
          <Link
            href="/#inscricao"
            className="text-sm font-medium bg-wc-gold text-wc-dark px-3 py-1.5 rounded-lg hover:bg-wc-gold-light transition-all"
          >
            Inscrever
          </Link>
        </nav>
      </div>
    </header>
  );
}
