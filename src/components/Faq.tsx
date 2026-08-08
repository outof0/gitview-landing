import { useState } from "react";

/** FAQ accordion. Answers audited against the gitview extension README + docs. */

interface FaqItem {
  q: string;
  a: string;
}

const ITEMS: FaqItem[] = [
  {
    q: "How do I install GitView before the Marketplace listing is live?",
    a: "Download the v0.1.0 VSIX from GitHub Releases, then run Extensions: Install from VSIX… from your editor's Command Palette. VS Code users can also run code --install-extension ~/Downloads/gitview-0.1.0.vsix.",
  },
  {
    q: "How is this different from VS Code's built-in merge editor?",
    a: "VS Code can show conflict markers or its built-in merge editor. GitView builds the three inputs directly from Git index stages (:1: base, :2: ours, :3: theirs), uses your installed Git for merge operations, and adds an editable Result pane, exact-match auto-resolve, a live conflict counter, and a full Git workspace.",
  },
  {
    q: "Is my code ever sent anywhere?",
    a: "No product telemetry — GitView does not phone home. Merge, history, and Git actions shell out to your local git CLI. Optional hosted review only talks to the GitHub/GitLab API you configure, with a token you store in Secret Storage.",
  },
  {
    q: "Why call Git instead of reimplementing merge?",
    a: "Reimplemented merge logic can drift from the Git version installed on your machine. GitView delegates merge operations to that Git CLI and presents the result inside your editor.",
  },
  {
    q: "What does the ✦ (magic) button do?",
    a: "It auto-resolves edits both sides made identically (byte-for-byte) — no fuzzy matching, no ML. The conflict counter drops live so you focus on real disagreements.",
  },
  {
    q: "Can I edit the result inline?",
    a: "Yes — the Result (center) pane is editable today. Accept Local / Incoming / both, jump with F7, hand-edit the result, then Apply. Optional auto-stage after resolve.",
  },
  {
    q: "What else ships besides merge?",
    a: "Git Workspace tool window (changes, commit, branches, log, diff, temporary work), file history, blame, compare, Explorer Git context menu, and hosted GitHub/GitLab pull-request review.",
  },
  {
    q: "Can I break my repo resolving a conflict?",
    a: "Apply writes the merged file and can stage it — it does not force a commit. A wrong accept can still ship bad code; use git merge --abort (or the Workspace Abort action) before you commit. Destructive ops ask for confirm when enabled.",
  },
  {
    q: "Does it work with Cursor / Windsurf / VSCodium?",
    a: "GitView targets the VS Code extension API 1.85+. VS Code is release-tested; compatible forks can install the same VSIX, while fork-specific behavior depends on the API and extension-install support each editor provides. A trusted workspace and Git on PATH are required.",
  },
  {
    q: "Is it really free?",
    a: "Yes. GitView is MIT licensed, has no paid tier, and requires no GitView account. The source and license text are available on GitHub for your own security and compliance review.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <section id="faq" className="scroll-mt-28 bg-paper py-16 sm:py-20 lg:py-28">
      <div className="gv-container max-w-[800px]">
        <div className="reveal mb-12 lg:mb-16">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            faq
          </p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink-light">
            You asked.{" "}
            <span className="text-muted">We shipped answers.</span>
          </h2>
        </div>

        <dl className="divide-y divide-ink-light/[0.08]">
          {ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-panel-${idx}`;
            const btnId = `faq-btn-${idx}`;
            return (
              <div
                key={idx}
                className="reveal py-5 first:pt-0 last:pb-0"
                style={{ ["--reveal-delay" as string]: `${idx * 50}ms` }}
              >
                <dt>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-start justify-between gap-4 text-left text-[15.5px] font-semibold leading-[1.45] tracking-[-0.01em] text-ink-light transition-colors hover:text-ink-light/80"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className={`mt-0.5 shrink-0 font-mono text-[13px] text-muted transition-transform duration-250 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14.5px] leading-[1.65] text-fg-light">
                      {item.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
