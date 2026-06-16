"use client";


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background blobs — WC2026 vibrant color style */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Electric blue blob — bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #2352f0 0%, transparent 65%)" }} />
        {/* Red blob — top right */}
        <div className="absolute -top-24 -right-20 w-[380px] h-[380px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e63312 0%, transparent 65%)" }} />
        {/* Green blob — mid left */}
        <div className="absolute top-1/2 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #00a652 0%, transparent 65%)" }} />
        {/* Gold blob — center */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f5c300 0%, transparent 60%)" }} />
      </div>

      {/* Diagonal stripe accent — top right corner */}
      <div className="absolute top-0 right-0 w-48 h-48 overflow-hidden pointer-events-none opacity-30" aria-hidden>
        <div className="absolute inset-0" style={{
          background: "repeating-linear-gradient(135deg, #e63312 0px, #e63312 4px, transparent 4px, transparent 16px)",
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-wc-red/30"
          style={{ background: "rgba(230,51,18,0.08)" }}>
          <span className="w-2 h-2 rounded-full bg-wc-red animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-wc-red">
            A Decorrer · Jun / Jul 2026
          </span>
        </div>

        {/* Main title */}
        <div className="mb-4">
          <h1 className="font-display leading-none tracking-wide">
            <span className="block text-wc-white" style={{ fontSize: "clamp(3.5rem, 14vw, 8rem)" }}>
              BOLÃO
            </span>
            <span className="block text-gold-gradient" style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)" }}>
              MUNDIAL 2026
            </span>
          </h1>
        </div>

        {/* Host nations flags */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            { code: "us", name: "EUA" },
            { code: "ca", name: "Canadá" },
            { code: "mx", name: "México" },
          ].map((n, i) => (
            <div key={n.code} className="flex items-center gap-2">
              {i > 0 && <span className="text-wc-white/20 text-xs">·</span>}
              <img
                src={`https://flagcdn.com/w40/${n.code}.png`}
                alt={n.name}
                width={24}
                height={16}
                className="rounded-[3px] shadow-sm"
              />
              <span className="text-wc-white/40 text-sm font-medium">{n.name}</span>
            </div>
          ))}
        </div>

        {/* Scoring pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { pts: "1pt", label: "1X2 correto", color: "bg-wc-electric/15 border-wc-electric/30 text-wc-electric" },
            { pts: "3pts", label: "Resultado exato", color: "bg-wc-green/15 border-wc-green/30 text-wc-green" },
            { pts: "10pts", label: "Vencedor", color: "bg-wc-gold/15 border-wc-gold/30 text-wc-gold" },
            { pts: "15pts", label: "Melhor marcador", color: "bg-wc-red/15 border-wc-red/30 text-wc-red" },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-1.5 border rounded-full px-3 py-1.5 ${item.color}`}>
              <span className="font-bold text-xs tabular-nums">{item.pts}</span>
              <span className="text-wc-white/40 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z"
            fill="rgba(35,82,240,0.08)" />
        </svg>
      </div>
    </section>
  );
}
