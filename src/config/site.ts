/**
 * Central content & configuration file.
 *
 * Every visitor-facing string and link lives here. Nothing in the components
 * should hardcode copy, URLs, or the contract address — edit this file only.
 *
 * Anything still set to `null` is a real value we do not have yet. The UI
 * renders an explicit "not provided" state for each of these instead of
 * guessing, linking to a generic homepage, or inventing a placeholder that
 * could be mistaken for real data.
 */

export interface SiteConfig {
  /** Project name shown in the wordmark, title tag, and footer. */
  projectName: string;
  /** Token ticker, e.g. "$FRUIT". Null if not supplied. */
  tokenTicker: string | null;
  /** Short hero headline. Use "\n" for a deliberate manual line break. */
  headline: string;
  /** One-sentence supporting description under the headline. */
  description: string;
  /** Telegram group URL. Null if not supplied. */
  telegramUrl: string | null;
  /** X / Twitter profile URL. Null if not supplied. */
  twitterUrl: string | null;
  /** Chart URL (e.g. DEX Screener / Birdeye). Null if not supplied. */
  chartUrl: string | null;
  /** Full contract address. Null if not supplied. */
  contractAddress: string | null;
  /** Blockchain / network name, e.g. "Solana". Null if not supplied. */
  network: string | null;
  /** Footer copyright line year. */
  year: number;
}

export const site: SiteConfig = {
  projectName: "Sharmaine",
  tokenTicker: "$SHARM",
  headline: "$SHARM IS COMING —\nTHE ORANGE ERA BEGINS",
  description:
    "$SHARM is a community-driven Solana meme coin focused on building a strong, recognizable brand and a sustainable long-term community. 🍊",
  telegramUrl: "https://t.me/sharmcoin",
  twitterUrl: "https://x.com/sharminecoinsol?s=11",
  chartUrl: null,
  contractAddress: null,
  network: "Solana",
  year: new Date().getFullYear(),
};
