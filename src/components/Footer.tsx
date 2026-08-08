import { SITE } from "../site";
import { BrandMark } from "./BrandMark";
import { InstallLink } from "./InstallLink";

/** Multi-column footer + self-aware footnote. */

const COLUMNS = [
  {
    title: "Project",
    links: [
      { label: "GitHub", href: SITE.github, sub: "source, MIT" },
      {
        label: "Marketplace",
        href: SITE.marketplaceLive ? SITE.marketplaceUrl : "#install",
        sub: SITE.marketplaceLive ? "install free" : "publishing next",
      },
      {
        label: "Changelog",
        href: `${SITE.github}/blob/main/CHANGELOG.md`,
        sub: "what shipped",
      },
      { label: "Issues", href: `${SITE.github}/issues`, sub: "bug or request" },
      { label: "Roadmap", href: "#changelog", sub: "shipped / building / queued" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs VS Code stock", href: "#magic", sub: "before / after" },
      { label: "vs vimdiff", href: "#why", sub: "three panes" },
      { label: "vs Meld", href: "#why", sub: "in-editor, not GTK" },
    ],
  },
  {
    title: "Build",
    links: [
      {
        label: "Download VSIX",
        href: SITE.downloadUrl,
        sub: `v${SITE.version} release`,
      },
      { label: "From source", href: "#install", sub: "pnpm package" },
      {
        label: "Editor support",
        href: "#install",
        sub: "VS Code tested",
      },
      {
        label: "Design docs",
        href: `${SITE.github}/tree/main/docs/design`,
        sub: "product specs",
      },
    ],
  },
  {
    title: "Trust",
    links: [
      {
        label: SITE.qualityLabel,
        href: `${SITE.github}/actions`,
        sub: "CI status",
      },
      {
        label: "0 telemetry",
        href: "#privacy",
        sub: "privacy details",
      },
      {
        label: "Local first",
        href: `${SITE.github}#readme`,
        sub: "shells out to git",
      },
      {
        label: "Security",
        href: `${SITE.github}/blob/main/SECURITY.md`,
        sub: "report privately",
      },
      {
        label: "Contact",
        href: `mailto:${SITE.supportEmail}`,
        sub: SITE.supportEmail,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-faint lg:py-16">
      <div className="gv-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_3fr]">
          {/* Brand block */}
          <div>
            <BrandMark variant="reverse" />
            <p className="mt-3 max-w-xs text-[13.5px] leading-[1.6] text-faint/75">
              {SITE.descriptor} 3-way merge, history, workspace, and review for
              VS Code and compatible editors.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <InstallLink
                source="footer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-accent/90"
              >
                {SITE.primaryLabel} →
              </InstallLink>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-white/15 px-4 py-2 text-[12.5px] font-medium text-faint transition-colors hover:border-white/30 hover:text-paper"
              >
                Star on GitHub ↗
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              v{SITE.version} · MIT · local first
            </p>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-dim">
                  {col.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={
                          l.href.startsWith("http") &&
                          l.href !== SITE.downloadUrl
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          l.href.startsWith("http") &&
                          l.href !== SITE.downloadUrl
                            ? "noreferrer noopener"
                            : undefined
                        }
                        className="group block"
                      >
                        <span className="block text-[13.5px] text-faint transition-colors group-hover:text-paper">
                          {l.label}
                        </span>
                        <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                          {l.sub}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-faint/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            © {new Date().getFullYear()} {SITE.name} ·{" "}
            <span className="italic normal-case tracking-normal text-faint/50">
              not affiliated with Microsoft, Cursor, Windsurf, VSCodium, or
              Antigravity*
            </span>
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim/70">
            *we were also not affiliated with this footnote until now
          </p>
        </div>
      </div>
    </footer>
  );
}
