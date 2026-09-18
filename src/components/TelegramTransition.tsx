import { createPortal } from "react-dom";
import { TelegramIcon } from "./icons";

interface TelegramTransitionProps {
  visible: boolean;
}

export function TelegramTransition({ visible }: TelegramTransitionProps) {
  if (!visible) return null;

  return createPortal(
    <div
      className="telegram-transition"
      role="status"
      aria-live="polite"
      aria-label="Opening Telegram"
    >
      <div className="telegram-transition__mark">
        <div className="telegram-transition__ring" />
        <TelegramIcon
          width={30}
          height={30}
          className="telegram-transition__icon"
        />
      </div>
      <p className="telegram-transition__label">Opening Telegram…</p>
    </div>,
    document.body,
  );
}
