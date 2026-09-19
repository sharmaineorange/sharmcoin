import { useMemo, type CSSProperties } from "react";

interface Particle {
  id: number;
  kind: "coin" | "glyph";
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  peakOpacity: number;
  rotate: number;
  spinDuration: number;
}

const COUNT = 30;
// Weighted toward "$" (the site's own ticker glyph) with other currency
// symbols mixed in for variety.
const GLYPHS = ["$", "$", "$", "◎", "₿", "Ξ", "€", "£", "¥"];

function makeParticles(): Particle[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    kind: i % 3 === 0 ? "glyph" : "coin",
    symbol: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    left: Math.random() * 100,
    size: 10 + Math.random() * 24,
    duration: 14 + Math.random() * 16,
    delay: -Math.random() * 28,
    drift: (Math.random() - 0.5) * 160,
    peakOpacity: 0.08 + Math.random() * 0.18,
    rotate: (Math.random() - 0.5) * 360,
    spinDuration: 2.5 + Math.random() * 3.5,
  }));
}

export function BackgroundFlow() {
  const particles = useMemo(makeParticles, []);

  return (
    <div className="background-flow" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`background-flow__particle background-flow__particle--${p.kind}`}
          style={
            {
              left: `${p.left}%`,
              width: p.kind === "coin" ? `${p.size}px` : undefined,
              height: p.kind === "coin" ? `${p.size}px` : undefined,
              fontSize: p.kind === "glyph" ? `${p.size}px` : undefined,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--peak-opacity": p.peakOpacity,
              "--rotate": `${p.rotate}deg`,
            } as CSSProperties
          }
        >
          {p.kind === "coin" ? (
            <span
              className="background-flow__coin-face"
              style={{ animationDuration: `${p.spinDuration}s` } as CSSProperties}
            />
          ) : (
            p.symbol
          )}
        </span>
      ))}
    </div>
  );
}
