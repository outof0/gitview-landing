/** Vertical-timeline format (Cursor-style). Three steps with a left-rail
 *  step number, an estimated duration label, and a code/output block on
 *  the right. The same shape as Changelog.tsx but more narrative — these
 *  are actions; those are releases. */

const STEPS = [
  {
    n: "01",
    elapsed: "5s",
    title: "Run git merge like you always do.",
    body: "Same command, same terminal, same conflict. No new flag to remember.",
    output: (
      <>
        <span className="select-none text-accent">$ </span>git merge feature/login
        {"\n"}
        <span className="select-none text-muted/60">▸ </span>Auto-merging{" "}
        <span className="text-ink-light">src/api/user.ts</span>
        {"\n"}
        <span className="select-none text-git-conflict">! </span>
        <span className="text-git-conflict">
          CONFLICT (content): Merge conflict in src/api/user.ts
        </span>
        {"\n"}
        <span className="select-none text-git-conflict">! </span>
        <span className="text-git-conflict">
          Automatic merge failed; fix conflicts and then commit.
        </span>
      </>
    ),
  },
  {
    n: "02",
    elapsed: "~1s",
    title: "Open GitView. Three panes, no markers.",
    body: "Local · Result · Repository from index stages. Edit the Result pane, jump with F7, ✦ auto-resolve identical blocks.",
    output: (
      <>
        <span className="select-none text-accent">$ </span>
        GitView: Resolve conflict
        {"\n"}
        <span className="select-none text-muted/60">▸ </span>read{" "}
        <span className="font-bold text-git-add">:1:</span> base ·{" "}
        <span className="font-bold text-git-add">:2:</span> ours ·{" "}
        <span className="font-bold text-git-add">:3:</span> theirs
        {"\n"}
        <span className="select-none text-muted/60">▸ </span>
        <span className="text-git-conflict">1 conflict</span> ·{" "}
        <span className="text-git-mod">2 trivial</span>
        {"\n"}
        {"\n"}
        <span className="select-none text-muted/50">
          # F7 jump · ✦ auto-resolve · edit Result · Apply
        </span>
      </>
    ),
  },
  {
    n: "03",
    elapsed: "~30s",
    title: "Resolve, apply, commit.",
    body: "Accept Local / Incoming / both, edit Result if needed, Apply (optional auto-stage). Commit when you're ready.",
    output: (
      <>
        <span className="select-none text-accent">$ </span>git status
        {"\n"}
        <span className="select-none text-muted/60">▸ </span>On branch{" "}
        <span className="text-ink-light">feature/login</span>
        {"\n"}
        <span className="select-none text-git-add">● </span>
        All conflicts fixed but you are still merging
        {"\n"}
        {"\n"}
        <span className="select-none text-accent">$ </span>
        git commit -m "merge master"
        {"\n"}
        <span className="select-none text-muted/60">▸ </span>
        <span className="text-git-add">
          [feature/login abc1234]
        </span>{" "}
        merge master
      </>
    ),
  },
];

export function WhatItDoes() {
  return (
    <section id="what" className="scroll-mt-28 bg-paper py-16 sm:py-20 lg:py-24">
      <div className="gv-container max-w-[920px]">
        <div className="reveal mb-12 lg:mb-16 max-w-2xl">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            what happens
          </p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink-light">
            <span className="text-muted">From</span>{" "}
            <code className="font-mono text-git-add">git merge</code>{" "}
            <span className="text-muted">to</span> commit.
            <br />
            <span className="text-muted">Three terminal outputs.</span>
          </h2>
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[72px] top-2 bottom-2 hidden w-px bg-ink-light/10 lg:block"
          />
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="reveal grid grid-cols-1 gap-y-2.5 border-b border-ink-light/[0.06] py-8 last:border-b-0 sm:grid-cols-[60px_1fr] sm:gap-x-4 sm:gap-y-0 lg:grid-cols-[88px_1fr] lg:gap-x-6"
              style={{ ["--reveal-delay" as string]: "60ms" }}
            >
              <div className="flex items-baseline gap-2 font-mono text-[11.5px] uppercase leading-[1.4] tracking-[0.14em] text-muted sm:block sm:pt-1">
                <div className="font-semibold text-ink-light">{s.n}</div>
                <div>~ {s.elapsed}</div>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink-light lg:text-[20px]">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-[640px] text-[14.5px] leading-[1.6] text-fg-light">
                  {s.body}
                </p>
                <div className="mt-5 overflow-hidden rounded-md border border-ink-light/12 bg-ink shadow-[0_8px_28px_-12px_rgba(10,11,16,0.35)]">
                  <pre className="no-scrollbar overflow-x-auto [-webkit-overflow-scrolling:touch] p-4 font-mono text-[12px] leading-[1.78] text-faint sm:p-5 sm:text-[13px]">
                    {s.output}
                  </pre>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
