/**
 * Roadmap timeline — kept honest against the extension repo at
 * ~/workspace/lab/js/nexusdiff (package gitview@0.1.0).
 *
 * Sources of truth:
 * - README.md features list (what v0.1.0 ships)
 * - docs/guide/features/* (merge, workspace, history, hosted review)
 * - docs/design/README.md P0 wireframes (what's next)
 * - docs/design/specs/feature-coverage-matrix.md gaps
 *
 * Do not list already-shipped capabilities (e.g. editable Result pane,
 * merge/rebase menu actions, cherry-pick from history) as "building".
 */

interface Entry {
  version: string;
  date: string;
  status: "shipped" | "building" | "queued";
  title: string;
  detail: string;
}

const ENTRIES: Entry[] = [
  {
    version: "v0.1.0",
    date: "shipped",
    status: "shipped",
    title: "GitView — full surface",
    detail:
      "True 3-way merge studio from Git stages :1: / :2: / :3: (editable Result, ✦ auto-resolve, F7). Git Workspace tool window — changes, commit, branches, log, diff, temporary work. History, blame, compare. Explorer Git menu (stage, remotes, stash/shelve, merge, rebase…). Hosted GitHub/GitLab review with Secret Storage tokens. CI-verified, MIT, no product telemetry.",
  },
  {
    version: "v0.2.0",
    date: "next",
    status: "building",
    title: "Denser IDE ops dialogs",
    detail:
      "Branch popup with search and groups. Push / pull-update dialogs with strategy and impact preview. Reset soft·mixed·hard with a clear impact view. Multi-file conflict overview with bulk accept — the P0 wireframes (W05–W08, W10–W11).",
  },
  {
    version: "v0.3.0",
    date: "queued",
    status: "queued",
    title: "Interactive rebase editor",
    detail:
      "Visual rebase todo list with preview (W09). Pick, squash, fixup, reorder — see the resulting history before you run it. Same mental model as the rest of GitView.",
  },
  {
    version: "later",
    date: "queued",
    status: "queued",
    title: "Compare branches & polish",
    detail:
      "Dedicated compare-branches screen, richer stash details, commit message history, and hosted-review density polish. The menu actions already work — these are the deeper IDE surfaces.",
  },
];

const STATUS: Record<Entry["status"], { label: string; className: string }> = {
  shipped: {
    label: "shipped",
    className: "text-git-add border-git-add/30 bg-git-add/10",
  },
  building: {
    label: "building",
    className: "text-accent border-accent/30 bg-accent/10",
  },
  queued: {
    label: "queued",
    className: "text-muted border-ink-light/10 bg-paper",
  },
};

export function Changelog() {
  return (
    <section id="changelog" className="scroll-mt-28 bg-paper-2 py-16 sm:py-20 lg:py-28">
      <div className="gv-container max-w-[920px]">
        <div className="reveal mb-12 lg:mb-16">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            the roadmap
          </p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink-light">
            Shipped · Building · Queued.
          </h2>
          <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.6] text-fg-light">
            You&apos;re on v0.1.0. Merge, history, workspace, and review already
            ship. Next up: denser dialogs and interactive rebase — no dark
            patterns, no &quot;pro&quot; tier.
          </p>
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[88px] top-2 bottom-2 hidden w-px bg-ink-light/10 lg:block"
          />
          {ENTRIES.map((e) => {
            const s = STATUS[e.status];
            const isBuilding = e.status === "building";
            return (
              <li
                key={`${e.version}-${e.title}`}
                className="reveal grid grid-cols-[72px_1fr] gap-4 border-b border-ink-light/[0.08] py-6 last:border-b-0 transition-colors duration-300 hover:bg-paper/60 lg:grid-cols-[88px_36px_1fr] lg:gap-6"
                style={{ ["--reveal-delay" as string]: "60ms" }}
              >
                <div className="font-mono text-[11.5px] leading-[1.4] text-muted">
                  <div className="font-semibold text-ink-light">{e.version}</div>
                  <div>{e.date}</div>
                </div>
                <span
                  aria-hidden
                  className={`relative hidden h-3 w-3 self-center justify-self-center rounded-full border-2 border-paper-2 lg:block ${
                    e.status === "shipped"
                      ? "bg-git-add"
                      : e.status === "building"
                        ? "bg-accent"
                        : "bg-muted/40"
                  } ${isBuilding ? "ring-2 ring-accent/25" : ""}`}
                />
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-[16.5px] font-semibold tracking-[-0.01em] text-ink-light">
                      {e.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${s.className}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[640px] text-[14px] leading-[1.65] text-fg-light">
                    {e.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
