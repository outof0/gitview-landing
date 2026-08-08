import { useEffect, useState } from "react";
import { SITE } from "../site";
import { useToast } from "../hooks/useToast";
import { InstallLink } from "./InstallLink";

interface Tab {
  id: string;
  label: string;
  short: string;
  binary: string;
  command: (id: string) => string;
  hint: string;
  recommended?: boolean;
}

function commandFor(binary: string, id: string, fallback: string): string {
  if (!SITE.marketplaceLive) {
    return `${binary} --install-extension ~/Downloads/${SITE.downloadFilename}\n# or Extensions → … → Install from VSIX…`;
  }
  return `${binary} --install-extension ${id}\n# ${fallback}`;
}

const TABS: Tab[] = [
  {
    id: "vscode",
    label: "VS Code",
    short: "code",
    binary: "code",
    command: (id) =>
      commandFor("code", id, 'Extensions sidebar → search "GitView"'),
    hint: "Release-tested on VS Code 1.85 and newer.",
    recommended: true,
  },
  {
    id: "cursor",
    label: "Cursor",
    short: "cursor",
    binary: "cursor",
    command: (id) =>
      commandFor("cursor", id, "Extensions → Install from VSIX"),
    hint: "Uses the compatible VS Code extension API exposed by the editor.",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    short: "windsurf",
    binary: "windsurf",
    command: (id) => commandFor("windsurf", id, "use the Extensions sidebar"),
    hint: "Availability depends on the editor's extension API and registry.",
  },
  {
    id: "vscodium",
    label: "VSCodium",
    short: "codium",
    binary: "codium",
    command: (id) =>
      commandFor("codium", id, "or install the VSIX from GitHub Releases"),
    hint: "Install the same VSIX when the editor API version is compatible.",
  },
  {
    id: "antigravity",
    label: "Antigravity",
    short: "ag",
    binary: "antigravity",
    command: (id) =>
      commandFor("antigravity", id, "or install the VSIX from disk"),
    hint: "Install support depends on the editor's current extension API.",
  },
];

const NEEDED = [
  {
    name: "VS Code 1.85+",
    body: "Release-tested on VS Code. Compatible forks can install the same VSIX.",
  },
  {
    name: "Git on PATH",
    body: "Shells out to the local git CLI at runtime.",
  },
];

export function PlatformPicker() {
  const [active, setActive] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const cmdText = tab.command(SITE.marketplaceId).split("\n")[0] ?? "";

  useEffect(() => {
    setCopied(false);
  }, [active]);

  const copyCmd = async () => {
    try {
      await navigator.clipboard.writeText(cmdText);
      setCopied(true);
      toast("Command copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Copy failed — select the command manually");
    }
  };

  const selectTabByIndex = (index: number, focus: boolean) => {
    const next = TABS[(index + TABS.length) % TABS.length];
    setActive(next.id);
    if (focus) {
      requestAnimationFrame(() => {
        document.getElementById(`editor-tab-${next.id}`)?.focus();
      });
    }
  };

  return (
    <section id="install" className="scroll-mt-28">
      {/* Finish-line band */}
      <div className="relative overflow-hidden bg-ink py-16 text-faint sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(55% 70% at 70% 40%, rgba(241,90,41,0.16), transparent 65%), radial-gradient(40% 50% at 15% 80%, rgba(34,197,94,0.08), transparent 60%)",
          }}
        />
        <div className="gv-container relative max-w-[1080px]">
          <div className="reveal max-w-2xl">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
              get GitView
            </p>
            <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-paper">
              Download today.{" "}
              <span className="text-faint/50">Marketplace next.</span>
            </h2>
            <p className="mt-4 max-w-[28rem] text-[15px] leading-[1.65] text-faint/75">
              Get the v{SITE.version} VSIX from GitHub Releases, then install it
              from your editor's Extensions menu or CLI. No account required.
            </p>
          </div>

          <div className="reveal mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <InstallLink
              source="install-vscode"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 active:scale-[0.98]"
            >
              {SITE.primaryLabel}
              <span aria-hidden>→</span>
            </InstallLink>
            {SITE.marketplaceLive ? (
              <InstallLink
                source="install-marketplace"
                href={SITE.marketplaceUrl}
                toastMessage="Opening Marketplace…"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-faint transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-paper"
              >
                Open Marketplace
                <span aria-hidden className="text-dim">
                  ↗
                </span>
              </InstallLink>
            ) : (
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-faint transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-paper"
              >
                View source <span aria-hidden>↗</span>
              </a>
            )}
          </div>

          <p className="reveal mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            v{SITE.version} · {SITE.qualityLabel} · MIT · VS Code tested
          </p>
        </div>
      </div>

      {/* CLI / editor details on paper */}
      <div className="bg-paper-2 py-14 sm:py-16 lg:py-20">
        <div className="gv-container max-w-[1080px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <ul className="flex flex-col gap-4 self-start">
              <li className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                What you need
              </li>
              {NEEDED.map((n) => (
                <li key={n.name} className="border-t border-ink-light/10 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-git-add" aria-hidden>
                      ✓
                    </span>
                    <span className="text-[14.5px] font-semibold text-ink-light">
                      {n.name}
                    </span>
                  </div>
                  <p className="ml-5 mt-1 text-[13px] leading-[1.6] text-fg-light">
                    {n.body}
                  </p>
                </li>
              ))}
              <li className="border-t border-ink-light/10 pt-4">
                <p className="text-[12.5px] leading-[1.6] text-muted">
                  Installing the VSIX needs neither Node nor pnpm. Building from
                  source remains available for audit and contribution.
                </p>
              </li>
            </ul>

            <div className="overflow-hidden rounded-lg border border-ink-light/12 shadow-sm">
              <div
                className="no-scrollbar flex overflow-x-auto border-b border-ink-light/10 bg-paper"
                role="tablist"
                aria-label="Editor"
              >
                {TABS.map((t, index) => (
                  <button
                    key={t.id}
                    id={`editor-tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={t.id === active}
                    aria-controls={`editor-panel-${t.id}`}
                    tabIndex={t.id === active ? 0 : -1}
                    onClick={() => setActive(t.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        selectTabByIndex(index + 1, true);
                      } else if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        selectTabByIndex(index - 1, true);
                      } else if (event.key === "Home") {
                        event.preventDefault();
                        selectTabByIndex(0, true);
                      } else if (event.key === "End") {
                        event.preventDefault();
                        selectTabByIndex(TABS.length - 1, true);
                      }
                    }}
                    className={`flex shrink-0 items-center justify-center gap-1.5 border-b-2 px-3 py-3 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors sm:flex-1 sm:px-4 sm:text-[11.5px] sm:tracking-[0.14em] ${
                      t.id === active
                        ? "border-ink-light bg-white text-ink-light"
                        : "border-transparent text-muted hover:text-ink-light"
                    }`}
                  >
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">{t.short}</span>
                    {t.recommended && (
                      <span className="rounded-full bg-git-add px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-paper">
                        rec
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div
                id={`editor-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`editor-tab-${tab.id}`}
                className="bg-ink"
              >
                <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
                  <pre className="no-scrollbar min-w-0 flex-1 overflow-x-auto font-mono text-[12px] leading-[1.85] text-faint sm:text-[13px]">
                    <span className="select-none text-accent">$ </span>
                    {tab.command(SITE.marketplaceId)}
                  </pre>
                  <button
                    type="button"
                    onClick={copyCmd}
                    className={`shrink-0 rounded border px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
                      copied
                        ? "border-git-add/40 bg-git-add/10 text-git-add"
                        : "border-white/10 text-dim hover:border-white/20 hover:text-faint"
                    }`}
                    aria-label={copied ? "Copied" : "Copy command"}
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
                <div className="mt-2 flex flex-col gap-1 border-t border-[#393b40] bg-[#2b2d30] px-4 py-3 font-mono text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <span className="leading-relaxed">{tab.hint}</span>
                  <span className="shrink-0">
                    binary: <code className="text-faint">{tab.binary}</code>
                  </span>
                </div>
              </div>

              <div className="bg-white px-4 py-3 sm:px-5 sm:py-4">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted">
                  Prefer to audit or contribute?
                </p>
                <pre className="no-scrollbar mt-2 overflow-x-auto font-mono text-[12px] leading-[1.7] text-fg-light sm:text-[12.5px]">
                  <span className="select-none text-muted/60">$ </span>
                  git clone {SITE.github}.git &&{" "}
                  <span className="text-ink-light">cd gitview</span>
                  {"\n"}
                  <span className="select-none text-muted/60">$ </span>
                  pnpm install &amp;&amp; pnpm run package
                  {"\n"}
                  <span className="select-none text-muted/60">▸ </span>
                  builds{" "}
                  <span className="text-git-add">
                    gitview-{SITE.version}.vsix
                  </span>
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink-light/10 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>VS Code tested · compatible forks supported</span>
            <a
              href={`${SITE.github}/issues`}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-muted/40 underline-offset-4 hover:text-ink-light hover:decoration-muted"
            >
              Questions? GitHub issues →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
