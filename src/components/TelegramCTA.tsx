import { TelegramIcon, ExternalLinkIcon } from "./icons";
import { site } from "../config/site";

interface TelegramCTAProps {
  className?: string;
}

export function TelegramCTA({ className }: TelegramCTAProps) {
  if (!site.telegramUrl) {
    return (
      <div className={`telegram-cta telegram-cta--disabled ${className ?? ""}`}>
        <span className="telegram-cta__icon">
          <TelegramIcon width={22} height={22} />
        </span>
        Telegram link not provided
      </div>
    );
  }

  return (
    <a
      href={site.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`telegram-cta ${className ?? ""}`}
    >
      <span className="telegram-cta__icon">
        <TelegramIcon width={22} height={22} />
      </span>
      Join the Telegram
      <ExternalLinkIcon width={16} height={16} className="telegram-cta__ext" />
      <span className="visually-hidden">(opens in a new tab)</span>
    </a>
  );
}
