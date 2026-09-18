import { useRef, useState, type MouseEvent } from "react";
import { TelegramIcon, ExternalLinkIcon } from "./icons";
import { site } from "../config/site";
import { TelegramTransition } from "./TelegramTransition";

interface TelegramCTAProps {
  className?: string;
}

const TRANSITION_MS = 1300;

export function TelegramCTA({ className }: TelegramCTAProps) {
  const [showTransition, setShowTransition] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  if (!site.telegramUrl) {
    return (
      <div className={`telegram-cta telegram-cta--disabled ${className ?? ""}`}>
        <span className="telegram-cta__icon">
          <TelegramIcon width={22} height={22} />
        </span>
        Telegram <span className="coming-soon-badge">Coming soon</span>
      </div>
    );
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modifier-clicks / middle-click behave natively (open in new tab/window as the browser normally would).
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    // Fire window.open synchronously, inside the trusted click event, so it
    // isn't blocked as a popup. Everything after this is purely decorative.
    window.open(site.telegramUrl!, "_blank", "noopener,noreferrer");

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    setShowTransition(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(
      () => setShowTransition(false),
      TRANSITION_MS,
    );
  }

  return (
    <>
      <a
        href={site.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`telegram-cta ${className ?? ""}`}
        onClick={handleClick}
      >
        <span className="telegram-cta__icon">
          <TelegramIcon width={22} height={22} />
        </span>
        Join the Telegram
        <ExternalLinkIcon width={16} height={16} className="telegram-cta__ext" />
        <span className="visually-hidden">(opens in a new tab)</span>
      </a>
      <TelegramTransition visible={showTransition} />
    </>
  );
}
