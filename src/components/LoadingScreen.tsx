import { useEffect, useRef, useState } from "react";
import { site } from "../config/site";

const RAY_COUNT = 12;
const MIN_VISIBLE_MS = 1100;
const EXIT_MS = 550;

export function LoadingScreen() {
  const [progress, setProgress] = useState(4);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const startRef = useRef(performance.now());
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (done) return;

    if (reducedMotion.current) {
      setProgress(100);
      setExiting(true);
      const t = window.setTimeout(() => setDone(true), 50);
      return () => window.clearTimeout(t);
    }

    let raf = 0;
    const tick = () => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.06));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [done]);

  useEffect(() => {
    if (done) return;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      const elapsed = performance.now() - startRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setProgress(100);
        window.setTimeout(() => setExiting(true), 180);
        window.setTimeout(() => setDone(true), 180 + EXIT_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const failsafe = window.setTimeout(finish, 4000);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(failsafe);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`loading-screen ${exiting ? "loading-screen--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${site.projectName}`}
    >
      <div className="loading-screen__bar" aria-hidden="true">
        <div
          className="loading-screen__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="loading-screen__mark" aria-hidden="true">
        <div className="loading-screen__ring" />
        <div className="loading-screen__rays">
          {Array.from({ length: RAY_COUNT }, (_, i) => (
            <span
              key={i}
              className="loading-screen__ray"
              style={{
                transform: `rotate(${(360 / RAY_COUNT) * i}deg) translateY(-46px)`,
                animationDelay: `${i * 55}ms`,
              }}
            />
          ))}
        </div>
        <div className="loading-screen__core" />
      </div>

      <p className="loading-screen__label">{site.projectName}</p>
    </div>
  );
}
