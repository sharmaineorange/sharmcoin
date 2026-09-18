import { ChartIcon, XIcon } from "./icons";
import { site } from "../config/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="site-header__wordmark">
          <span className="site-header__name">{site.projectName}</span>
          {site.tokenTicker ? (
            <span className="site-header__ticker">{site.tokenTicker}</span>
          ) : null}
        </span>

        <nav className="site-header__links" aria-label="Secondary links">
          {site.chartUrl ? (
            <a
              href={site.chartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__link"
            >
              <ChartIcon width={16} height={16} />
              <span className="site-header__link-text">Chart</span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          ) : (
            <span
              className="site-header__link site-header__link--disabled"
              aria-label="Chart link unavailable"
            >
              <ChartIcon width={16} height={16} />
              <span className="site-header__link-text">Chart</span>
            </span>
          )}

          {site.twitterUrl ? (
            <a
              href={site.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__link"
            >
              <XIcon width={15} height={15} />
              <span className="site-header__link-text">X</span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          ) : (
            <span
              className="site-header__link site-header__link--disabled"
              aria-label="X link unavailable"
            >
              <XIcon width={15} height={15} />
              <span className="site-header__link-text">X</span>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
