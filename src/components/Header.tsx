"use client";

import Link from "next/link";

function BallEmblem({ size = 32 }: { size?: number }) {
  const s = size;
  const ball = s * 0.44;
  return (
    <div
      className="rounded-full border-2 border-wc-gold flex items-center justify-center shrink-0"
      style={{
        width: s,
        height: s,
        background: "linear-gradient(145deg, #1b2230, #10151d)",
        boxShadow: "inset 0 0 0 4px rgba(233,177,58,0.07)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: ball,
          height: ball,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #ffffff, #cfd4dc 70%, #aab0ba)",
          boxShadow: "inset -2px -3px 6px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "35%",
            aspectRatio: "1",
            transform: "translate(-50%,-50%)",
            background: "#13171d",
            clipPath: "polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%)",
          }}
        />
      </div>
    </div>
  );
}

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
          <BallEmblem size={34} />
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
