import { SITE } from "../site";
import { HeroEditor } from "./HeroEditor";
import { EditorMarquee } from "./EditorMarquee";
import { InstallLink } from "./InstallLink";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-10 pb-0 sm:pt-14 lg:pt-20">
      {/* Stage lighting — brand orange + soft conflict wash */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute right-[-8%] top-[8%] h-[min(520px,70vh)] w-[min(720px,90vw)] rounded-full bg-accent/20 blur-[60px]" />
        <div className="absolute bottom-[12%] right-[18%] h-[min(360px,50vh)] w-[min(420px,60vw)] rounded-full bg-git-conflict/10 blur-[60px]" />
        <div className="absolute bottom-[-80px] left-1/2 h-[280px] w-[min(900px,100vw)] -translate-x-[20%] rounded-full bg-accent/[0.08] blur-[80px]" />
      </div>

      <div className="gv-container relative z-10">
        <div className="grid items-center gap-10 pb-12 sm:gap-12 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10 lg:pb-16 lg:pt-6 xl:gap-14">
          <div className="relative z-10 max-w-[560px] min-w-0 lg:pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dim sm:mb-5 sm:text-[11.5px] sm:tracking-[0.2em]">
              <span>v{SITE.version}</span>
              <span className="text-dim/50">·</span>
              <span>MIT</span>
              <span className="text-dim/50">·</span>
              <span>{SITE.qualityLabel}</span>
              <span className="hidden text-dim/50 sm:inline">·</span>
              <span className="hidden sm:inline">local-first</span>
            </div>

            <h1 className="text-[clamp(2.15rem,6.5vw,3.85rem)] font-bold leading-[1.04] tracking-[-0.045em] text-faint">
              See Git{" "}
              <em className="text-accent not-italic">clearly</em>.
            </h1>

            <p className="mt-5 max-w-[34rem] text-[15.5px] leading-[1.65] text-dim sm:text-[17px]">
              Resolve conflicts in a true 3-way editor, then inspect history,
              branches, changes, and diffs without leaving VS Code. Powered by
              your local <code className="rounded-sm bg-white/8 px-1.5 py-0.5 font-mono text-[12.5px] text-git-add sm:text-[13px]">git</code> CLI.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <InstallLink
                source="hero"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-accent/40 active:scale-[0.98]"
              >
                {SITE.primaryLabel}
                <span aria-hidden>↓</span>
              </InstallLink>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.03] px-5 py-3.5 text-[13.5px] font-medium text-dim backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-faint"
              >
                View source <span aria-hidden>↗</span>
              </a>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-dim/70">
              <span className="text-faint/80">MIT · no account</span>
              <span className="text-dim/40" aria-hidden>
                ·
              </span>
              <span>VS Code 1.85+ · local Git · no telemetry</span>
            </p>
          </div>

          {/* Product stage — 3D tilt only on lg+ */}
          <div className="relative min-w-0 lg:[perspective:1400px]">
            <div
              className="
                relative rounded-2xl border border-white/10 p-3 sm:p-[1.15rem]
                bg-[linear-gradient(160deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_50%,rgba(241,90,41,0.06)_100%)]
                shadow-[0_4px_8px_-2px_rgba(0,0,0,0.3),0_24px_48px_-12px_rgba(0,0,0,0.55),0_48px_96px_-24px_rgba(15,17,21,0.7),0_0_0_1px_rgba(241,90,41,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]
                transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                motion-reduce:transform-none
                lg:[transform:rotateY(-3.5deg)_rotateX(2.5deg)] lg:[transform-style:preserve-3d]
                lg:hover:[transform:rotateY(-1.5deg)_rotateX(1deg)]
              "
            >
              <HeroEditor />
            </div>
          </div>
        </div>
      </div>

      <EditorMarquee />
    </section>
  );
}
