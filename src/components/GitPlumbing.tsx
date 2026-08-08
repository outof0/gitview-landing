/** Full-bleed dark chapter — trust beat after the pains. */

interface Claim {
  n: string;
  claim: string;
  proof: string;
  command?: string;
}

const CLAIMS: Claim[] = [
  {
    n: "01",
    claim: "Shell-out. No daemon.",
    proof:
      "One process per conflict. Calls git, reads :1: :2: :3: from the index, returns. No filesystem watcher. No boot service.",
    command: "git merge-file --ours --theirs --base …",
  },
  {
    n: "02",
    claim: "Strict byte-equality.",
    proof:
      "✦ only when both sides wrote the same line byte-for-byte. No fuzzy match. No ML. Just sha1(left) === sha1(right).",
    command: "if (sha1(ours) === sha1(theirs)) accept()",
  },
  {
    n: "03",
    claim: "No product telemetry.",
    proof:
      "Nothing phones home to GitView servers. Git ops stay on your machine; optional hosted review only talks to the GitHub/GitLab API you configure.",
  },
];

export function GitPlumbing() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-faint sm:py-24 lg:py-32">
      {/* Soft stage light */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(241,90,41,0.12), transparent 70%)",
        }}
      />

      <div className="gv-container relative">
        <div className="reveal mb-12 max-w-3xl lg:mb-16">
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
            under the hood
          </p>
          <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-paper">
            We don&apos;t reimplement merge.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.7] text-faint/75 sm:text-[16.5px]">
            Conflicts build from index stages and run through{" "}
            <code className="font-mono text-git-add">git merge-file</code>.
            History, commit, remotes, and review shell out to the same{" "}
            <code className="font-mono text-git-add">git</code> CLI — no
            parallel SCM model.
          </p>
        </div>

        <ol className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {CLAIMS.map((c, idx) => (
            <li
              key={c.n}
              className="reveal flex flex-col gap-4 rounded-xl bg-white/[0.03] p-6 ring-1 ring-inset ring-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:ring-white/[0.14] sm:p-7"
              style={{ ["--reveal-delay" as string]: `${idx * 70}ms` }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                {c.n}
              </span>
              <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.02em] text-paper sm:text-[20px]">
                {c.claim}
              </h3>
              <p className="text-[13.5px] leading-[1.7] text-faint/70">
                {c.proof}
              </p>
              {c.command && (
                <pre className="mt-auto overflow-x-auto whitespace-pre-wrap rounded-md border border-white/[0.08] bg-[#0a0b10] px-3.5 py-3 font-mono text-[11.5px] leading-[1.6] text-faint/80 sm:text-[12px]">
                  {c.command}
                </pre>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
