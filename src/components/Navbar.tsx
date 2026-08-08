import { useEffect, useId, useState } from "react";
import { SITE } from "../site";
import { BrandMark } from "./BrandMark";
import { InstallLink } from "./InstallLink";

/** Desktop: fewer, clearer labels. Mobile: full list in drawer. */
const DESKTOP_LINKS = [
  { label: "demo", href: "#magic" },
  { label: "how", href: "#what" },
  { label: "why", href: "#why" },
  { label: "faq", href: "#faq" },
  { label: "roadmap", href: "#changelog" },
] as const;

const MOBILE_LINKS = [
  { label: "demo", href: "#magic" },
  { label: "how it works", href: "#what" },
  { label: "why GitView", href: "#why" },
  { label: "faq", href: "#faq" },
  { label: "roadmap", href: "#changelog" },
  { label: "install", href: "#install" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-paper/92 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/80">
      <a
        href={SITE.releaseUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="block bg-ink py-1.5 font-mono text-[11px] text-faint transition-colors hover:bg-ink-2 focus-visible:ring-offset-ink sm:py-2 sm:text-[11.5px]"
      >
        <div className="gv-container flex items-center gap-2.5 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 text-git-add">
            <span className="h-1.5 w-1.5 rounded-full bg-git-add" />
            shipped
          </span>
          <span className="text-dim">·</span>
          <span className="hidden sm:inline">
            v{SITE.version} — VSIX available now
          </span>
          <span className="sm:hidden">v{SITE.version} · download</span>
          <span className="ml-auto text-faint/70" aria-hidden>
            ↓
          </span>
        </div>
      </a>

      <div className="border-b border-ink-light/10">
        <div className="gv-container flex h-[48px] items-center justify-between gap-2 sm:h-[52px] md:h-[56px]">
          <a
            href="#main"
            className="flex shrink-0 items-center gap-2"
            onClick={closeMenu}
            aria-label={SITE.name}
          >
            <BrandMark variant="primary" />
          </a>

          <nav
            className="hidden items-center gap-5 text-[13px] font-medium text-fg-light xl:flex xl:gap-6"
            aria-label="Primary"
          >
            {DESKTOP_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative transition-colors duration-200 hover:text-ink-light after:absolute after:left-1/2 after:-bottom-1 after:h-[1.5px] after:w-0 after:-translate-x-1/2 after:bg-ink-light after:transition-[width] after:duration-200 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden font-mono text-[13px] text-fg-light underline decoration-fg-light/40 underline-offset-4 transition-colors hover:text-ink-light hover:decoration-ink-light md:inline"
            >
              github →
            </a>

            <InstallLink
              source="nav"
              className="inline-flex min-h-[36px] items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-semibold tracking-[-0.01em] text-white shadow-sm shadow-accent/25 transition-all hover:bg-accent/90 active:scale-[0.98] sm:min-h-[40px] sm:gap-1.5 sm:px-4 sm:text-[13px]"
            >
              {SITE.primaryLabel}
              <span aria-hidden>→</span>
            </InstallLink>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
            >
              <span
                className={`block h-[2px] w-5 rounded bg-ink-light transition-all duration-200 ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded bg-ink-light transition-all duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded bg-ink-light transition-all duration-200 ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <nav
          id={menuId}
          className={`overflow-hidden border-t border-ink-light/10 transition-all duration-300 xl:hidden ${
            menuOpen ? "max-h-[28rem]" : "max-h-0 border-transparent"
          }`}
          aria-label="Mobile"
          aria-hidden={!menuOpen}
        >
          <div className="gv-container flex flex-col gap-0.5 py-3">
            {MOBILE_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className="rounded-md px-3 py-3 text-[15px] font-medium text-fg-light transition-colors hover:bg-ink-light/5 hover:text-ink-light"
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="rounded-md px-3 py-3 font-mono text-[14px] text-fg-light md:hidden"
            >
              github →
            </a>
            <InstallLink
              source="nav-mobile"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="mt-2 rounded-md bg-accent px-3 py-3.5 text-center text-[14px] font-semibold text-white"
            >
              {SITE.primaryLabel} →
            </InstallLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
