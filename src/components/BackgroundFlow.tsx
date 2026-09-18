import { useMemo, type CSSProperties } from "react";

interface Particle {
  id: number;
  kind: "coin" | "glyph";
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  peakOpacity: number;
}

const COUNT = 20;
const GLYPH = "$";

function makeParticles(): Particle[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    kind: i % 3 === 0 ? "glyph" : "coin",
    left: Math.random() * 100,
    size: 10 + Math.random() * 22,
    duration: 16 + Math.random() * 14,
    delay: -Math.random() * 26,
    drift: (Math.random() - 0.5) * 120,
    peakOpacity: 0.08 + Math.random() * 0.16,
  }));
}

export function BackgroundFlow() {
  const particles = useMemo(makeParticles, []);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) return null;

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
            } as CSSProperties
          }
        >
          {p.kind === "glyph" ? GLYPH : null}
        </span>
      ))}
    </div>
  );
}
