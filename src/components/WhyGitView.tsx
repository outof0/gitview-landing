/** Why GitView — three sharp pains only (mid-page trimmed for rhythm). */

const PAINS = [
  {
    n: "01",
    title: "Markers force you to scroll, squint, and guess.",
    detail:
      "Three panes from real Git stages — Local, editable Result, Repository. Word-level highlighting. ✦ clears identical edits.",
  },
  {
    n: "02",
    title: "History, blame, and staging live in three different places.",
    detail:
      "One Git Workspace tool window — changes, commit, branches, log, diff, temporary work — plus Explorer Git menu actions.",
  },
  {
    n: "03",
    title: "Cloud tools upload your code. Visual tools can drift from Git.",
    detail:
      "No product telemetry. Shells out to your local git CLI — same operations, same credentials, trusted workspace only.",
  },
] as const;

export function WhyGitView() {
  return (
    <section id="why" className="scroll-mt-28 bg-paper py-16 sm:py-20 lg:py-24">
      <div className="gv-container max-w-[1080px]">
        <div className="reveal mb-10 max-w-2xl lg:mb-12">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            why GitView
          </p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink-light">
            You know the pain.
            <br />
            <span className="text-accent">Here&apos;s the fix.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PAINS.map((p, idx) => (
            <div
              key={p.n}
              className="reveal group flex flex-col gap-3 rounded-lg border border-ink-light/[0.1] bg-white px-5 py-6 transition-shadow duration-300 hover:shadow-md hover:shadow-ink-light/[0.06] sm:px-6"
              style={{ ["--reveal-delay" as string]: `${idx * 70}ms` }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                {p.n}
              </span>
              <h3 className="text-[15.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink-light">
                {p.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-fg-light">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
