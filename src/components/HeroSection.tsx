"use client";

function GzmCrest({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: 120,
        aspectRatio: "6/7",
        position: "relative",
        background: "linear-gradient(180deg, #1c2433, #11161f)",
        clipPath: "polygon(50% 0,100% 0,100% 62%,50% 100%,0 62%,0 0)",
        filter: "drop-shadow(0 14px 34px rgba(0,0,0,0.5))",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 7,
          clipPath: "polygon(50% 0,100% 0,100% 62%,50% 100%,0 62%,0 0)",
          background: "linear-gradient(180deg, #222c3d, #141a24)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 18,
          gap: 5,
          boxShadow: "inset 0 0 0 2px rgba(233,177,58,0.45)",
        }}
      >
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ color: "#e9b13a", fontSize: 7 }}>★</span>
          ))}
        </div>
        <div
          className="font-display"
          style={{ fontSize: 38, lineHeight: 0.85, letterSpacing: "0.02em", color: "#f4f0e7" }}
        >
          GZM
        </div>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%, #fff, #c2c8d1 72%, #a3a9b3)",
            position: "relative",
            marginTop: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "36%",
              aspectRatio: "1",
              transform: "translate(-50%,-50%)",
              background: "#13171d",
              clipPath: "polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%)",
            }}
          />
        </div>
        <div style={{ fontSize: 6.5, letterSpacing: "0.28em", color: "#e9b13a", fontWeight: 800, textTransform: "uppercase" }}>
          Est. 2026
        </div>
      </div>
      {/* Banner */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "19%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#dd4a3b",
          color: "#fff",
          fontSize: 8,
          letterSpacing: "0.12em",
          padding: "2px 10px",
          whiteSpace: "nowrap",
        }}
      >
        MUNDIAL 26
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #1fa45f 0%, transparent 65%)" }} />
        <div className="absolute -top-24 -right-20 w-[380px] h-[380px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #dd4a3b 0%, transparent 65%)" }} />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #e9b13a 0%, transparent 60%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-wc-red/30"
          style={{ background: "rgba(221,74,59,0.08)" }}>
          <span className="w-2 h-2 rounded-full bg-wc-red animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-wc-red">
            A Decorrer · Jun / Jul 2026
          </span>
        </div>

        {/* Crest + title */}
        <div className="flex flex-col items-center gap-6 mb-6">
          <GzmCrest />
          <div>
            <h1 className="font-display leading-none tracking-wide">
              <span className="block text-wc-white" style={{ fontSize: "clamp(3.5rem, 14vw, 8rem)" }}>
                BOLÃO
              </span>
              <span className="block text-gold-gradient" style={{ fontSize: "clamp(2.8rem, 11vw, 6.5rem)" }}>
                MUNDIAL 2026
              </span>
            </h1>
          </div>
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
            { pts: "1pt",  label: "1X2 correto",     color: "bg-white/5 border-white/10 text-wc-white/50" },
            { pts: "3pts", label: "Resultado exato",  color: "bg-wc-green/15 border-wc-green/30 text-wc-green" },
            { pts: "10pts",label: "Vencedor",         color: "bg-wc-gold/15 border-wc-gold/30 text-wc-gold" },
            { pts: "15pts",label: "Melhor marcador",  color: "bg-wc-red/15 border-wc-red/30 text-wc-red" },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-1.5 border rounded-full px-3 py-1.5 ${item.color}`}>
              <span className="font-bold text-xs tabular-nums">{item.pts}</span>
              <span className="text-wc-white/40 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z"
            fill="rgba(233,177,58,0.05)" />
        </svg>
      </div>
    </section>
  );
}
