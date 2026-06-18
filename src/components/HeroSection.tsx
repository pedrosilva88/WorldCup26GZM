"use client";

import { useEffect, useRef } from "react";

const AVATAR_SRCS = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
];

const R = 38; // radius px
const SPEED = 0.03; // px/ms base — slow, space-like drift

type Ball = { x: number; y: number; vx: number; vy: number; el: HTMLDivElement };

function spawnBalls(els: NodeListOf<Element>, W: number, H: number): Ball[] {
  const balls: Ball[] = [];
  for (let i = 0; i < els.length; i++) {
    let x = 0, y = 0, tries = 0;
    do {
      x = R + Math.random() * (W - 2 * R);
      y = R + Math.random() * (H - 2 * R);
      tries++;
    } while (tries < 60 && balls.some((b) => Math.hypot(b.x - x, b.y - y) < 2 * R + 12));

    const angle = Math.random() * 2 * Math.PI;
    const speed = SPEED * (0.5 + Math.random() * 1.0);
    balls.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      el: els[i] as HTMLDivElement,
    });
  }
  return balls;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth || 375;
    const H = container.clientHeight || 500;

    const els = container.querySelectorAll("[data-avatar]");
    if (!els.length) return;

    const balls = spawnBalls(els, W, H);
    for (const b of balls) {
      b.el.style.transform = `translate(${b.x - R}px, ${b.y - R}px)`;
    }

    let last = 0;
    let raf = 0;

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = Math.min(t - last, 32); // cap delta so lag doesn't explode
      last = t;

      // Integrate positions
      for (const b of balls) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      // Wall bounces
      for (const b of balls) {
        if (b.x - R < 0)  { b.x = R;     b.vx =  Math.abs(b.vx); }
        if (b.x + R > W)  { b.x = W - R; b.vx = -Math.abs(b.vx); }
        if (b.y - R < 0)  { b.y = R;     b.vy =  Math.abs(b.vy); }
        if (b.y + R > H)  { b.y = H - R; b.vy = -Math.abs(b.vy); }
      }

      // Ball–ball elastic collisions (equal mass)
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i], b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d === 0 || d >= 2 * R) continue;

          // Separate overlapping circles
          const nx = dx / d, ny = dy / d;
          const push = (2 * R - d) * 0.5;
          a.x -= nx * push; a.y -= ny * push;
          b.x += nx * push; b.y += ny * push;

          // Transfer normal-axis velocity (only if approaching)
          const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
          if (dvn > 0) {
            a.vx -= dvn * nx; a.vy -= dvn * ny;
            b.vx += dvn * nx; b.vy += dvn * ny;
          }
        }
      }

      // Write transforms
      for (const b of balls) {
        b.el.style.transform = `translate(${b.x - R}px, ${b.y - R}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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

      {/* Physics avatars */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
        style={{
          maskImage: "radial-gradient(ellipse 88% 78% at 50% 50%, black 15%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 88% 78% at 50% 50%, black 15%, transparent 100%)",
        }}
      >
        {AVATAR_SRCS.map((src, i) => (
          <div
            key={i}
            data-avatar={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: R * 2,
              height: R * 2,
              borderRadius: "50%",
              overflow: "hidden",
              opacity: 0.12,
              willChange: "transform",
              userSelect: "none",
              background: "#0c0f13",
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "143%",
                objectFit: "cover",
                objectPosition: "50% 0%",
              }}
            />
          </div>
        ))}
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
          <img
            src="/logos/crest.png"
            alt="GZM Crest"
            width={120}
            height={140}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 14px 34px rgba(0,0,0,0.5))",
            }}
          />
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
            { pts: "1pt",   label: "1X2 correto",    color: "bg-white/5 border-white/10 text-wc-white/50" },
            { pts: "3pts",  label: "Resultado exato", color: "bg-wc-green/15 border-wc-green/30 text-wc-green" },
            { pts: "10pts", label: "Vencedor",        color: "bg-wc-gold/15 border-wc-gold/30 text-wc-gold" },
            { pts: "15pts", label: "Melhor marcador", color: "bg-wc-red/15 border-wc-red/30 text-wc-red" },
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
