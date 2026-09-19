import { TelegramCTA } from "./TelegramCTA";
import { site } from "../config/site";
import mascotDesktop from "../assets/mascot/mascot-desktop.webp";
import mascotMobile from "../assets/mascot/mascot-mobile.webp";

export function Hero() {
  const headlineLines = site.headline.split("\n");

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__mascot hero__mascot--desktop">
        <img
          src={mascotDesktop}
          width={1185}
          height={1194}
          alt=""
          className="hero__mascot-img"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__content">
        <h1 className="hero__headline">
          {headlineLines.map((line, i) => (
            <span className="hero__headline-line" key={i}>
              {line}
            </span>
          ))}
        </h1>

        <div className="hero__mascot hero__mascot--mobile">
          <img
            src={mascotMobile}
            width={745}
            height={1022}
            alt=""
            className="hero__mascot-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        <TelegramCTA className="hero__cta" />

        <p className="hero__description">{site.description}</p>
      </div>
    </section>
  );
}
