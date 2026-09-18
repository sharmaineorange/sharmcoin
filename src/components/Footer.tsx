import { site } from "../config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>
          © {site.year} {site.projectName}
        </span>
        <span className="site-footer__disclaimer">
          Community project. Not financial advice.
        </span>
      </div>
    </footer>
  );
}
