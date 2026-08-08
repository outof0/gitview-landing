import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../site";
import { InstallLink } from "./InstallLink";

/** Before / After scrub — drag to reveal GitView over stock markers. */

const STOCK_ROWS = [
  { n: 1, txt: "async function loadUser(id: string) {", cls: "ctx" },
  { n: 2, txt: "  const user = await api.get(`/u/${id}`)", cls: "ctx" },
  { n: 3, txt: "<<<<<<< HEAD", cls: "marker" },
  { n: 4, txt: "  return user.profile", cls: "yours" },
  { n: 5, txt: "=======", cls: "marker" },
  { n: 6, txt: "  return user.data", cls: "theirs" },
  { n: 7, txt: ">>>>>>> feature/login", cls: "marker" },
  { n: 8, txt: "  metrics.track('user.loaded')", cls: "ctx" },
  { n: 9, txt: "}", cls: "ctx" },
];

const OURS_ROWS = [
  { n: 1, txt: "loadUser(id) {", cls: "ctx" },
  { n: 2, txt: "  user = get(id)", cls: "modified" },
  { n: 3, txt: "  return profile", cls: "modified" },
  { n: 4, txt: "  metrics.track()", cls: "added" },
  { n: 5, txt: "}", cls: "ctx" },
];

const CENTER_ROWS = [
  { n: 1, txt: "loadUser(id) {", cls: "ctx" },
  { n: 2, txt: "  user = get(id)", cls: "magic" },
  { n: 3, txt: "  return profile // ✦", cls: "magic" },
  { n: 4, txt: "  metrics.track()", cls: "magic" },
  { n: 5, txt: "}", cls: "ctx" },
];

const THEIRS_ROWS = [
  { n: 1, txt: "loadUser(id) {", cls: "ctx" },
  { n: 2, txt: "  user = get(id)", cls: "modified" },
  { n: 3, txt: "  return profile // ✦", cls: "modified" },
  { n: 4, txt: "  metrics.track()", cls: "added" },
  { n: 5, txt: "}", cls: "ctx" },
];

function StockBody() {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-ink font-mono shadow-2xl">
      <div className="titlebar">
        <span className="truncate" style={{ color: "#bcbec4" }}>
          src/api/user.ts
        </span>
        <span className="ml-auto shrink-0" style={{ color: "#ef4444" }}>
          ● 1 conflict
        </span>
      </div>
      {/* Spacer matches GitView toolbar height */}
      <div
        className="flex h-9 shrink-0 items-center border-b border-[#393b40] bg-[#2b2d30] px-3 font-mono text-[11px] text-[#70727a]"
        aria-hidden
      >
        text editor · conflict markers
      </div>
      <div className="pane-body flex-1 py-2.5">
        {STOCK_ROWS.map((r) => (
          <div
            key={r.n}
            className={`row ${
              r.cls === "marker"
                ? "c-marker"
                : r.cls === "yours"
                  ? "c-yours"
                  : r.cls === "theirs"
                    ? "c-theirs"
                    : "c-ctx"
            }`}
          >
            <span className="ln">{r.n}</span>
            <span className="txt">{r.txt}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-[#393b40] bg-[#2b2d30] px-4 py-2.5 font-mono text-[11px] text-[#70727a]">
        <span style={{ color: "#ef4444" }}>●</span> fix conflicts to continue
      </div>
    </div>
  );
}

function DiffPane({
  label,
  sub,
  rows,
}: {
  label: string;
  sub: string;
  rows: { n: number; txt: string; cls: string }[];
}) {
  return (
    <div className="pane min-w-0">
      <div className="pane-h">
        <span className="from truncate">{label}</span>
        <span className="hidden truncate sm:inline" style={{ color: "#5a5d63" }}>
          {sub}
        </span>
      </div>
      <div className="pane-body">
        {rows.map((r) => (
          <div key={r.n} className={`row c-${r.cls}`}>
            <span className="ln">{r.n}</span>
            <span className="txt">{r.txt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GitViewBody() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-ink font-mono shadow-2xl">
      <div className="titlebar">
        <span className="truncate font-semibold" style={{ color: "#bcbec4" }}>
          Resolve Conflicts
        </span>
        <span className="shrink-0" style={{ color: "#3882f6" }}>
          ●
        </span>
        <span
          className="ml-auto shrink-0 text-[11px]"
          style={{ color: "#3882f6" }}
        >
          ✦ 7/8 auto
        </span>
      </div>
      <div className="toolbar no-scrollbar overflow-x-auto" aria-hidden>
        <span className="toolbtn toolbtn-static">▲</span>
        <span className="toolbtn toolbtn-static">▼</span>
        <span className="tsep" />
        <span className="toolbtn toolbtn-static">►</span>
        <span className="toolbtn toolbtn-static">◄</span>
        <span className="toolbtn toolbtn-static active">✦</span>
        <span
          className="ml-auto shrink-0 pr-1 text-[11px]"
          style={{ color: "#3882f6" }}
        >
          0 to decide
        </span>
      </div>
      <div className="grid min-w-0 grid-cols-[1fr_1.15fr_1fr] divide-x divide-[#393b40] sm:min-w-[min(100%,420px)] lg:min-w-0">
        <DiffPane label="Yours" sub=":2:" rows={OURS_ROWS} />
        <DiffPane label="Result" sub="merged" rows={CENTER_ROWS} />
        <DiffPane label="Theirs" sub=":3:" rows={THEIRS_ROWS} />
      </div>
      <div className="border-t border-[#393b40] bg-[#2b2d30] px-4 py-2.5 font-mono text-[11px] text-[#70727a]">
        <span style={{ color: "#22c55e" }}>●</span> ready to apply
      </div>
    </div>
  );
}

function CompareScrub() {
  const [pos, setPos] = useState(46);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(90, Math.max(10, x)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) {
        return;
      }
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  return (
    <div className="reveal" style={{ ["--reveal-delay" as string]: "60ms" }}>
      <div
        ref={trackRef}
        className="relative touch-none select-none rounded-xl outline-none"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("a,button,input")) {
            return;
          }
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
      >
        {/* After layer (full) */}
        <div className="relative">
          <div className="pointer-events-none absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-git-add/35 bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-git-add backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-git-add" />
              after · GitView
            </span>
          </div>
          <GitViewBody />
        </div>

        {/* Before layer — clip from the right so left `pos%` shows stock */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex flex-col"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-git-conflict/35 bg-ink/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-git-conflict backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-git-conflict" />
              before · stock
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <StockBody />
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="group absolute inset-y-0 z-20 flex w-12 -translate-x-1/2 cursor-ew-resize items-center justify-center outline-none"
          style={{ left: `${pos}%` }}
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={10}
          aria-valuemax={90}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setPos((p) => Math.max(10, p - 5));
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              setPos((p) => Math.min(90, p + 5));
            }
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
            setFromClientX(e.clientX);
          }}
        >
          <span
            className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(241,90,41,0.55)]"
            aria-hidden
          />
          <span
            className="relative z-[1] flex h-10 w-10 select-none items-center justify-center rounded-full bg-white text-[13px] font-bold tracking-tighter text-ink-light shadow-[0_2px_8px_rgba(0,0,0,0.25),0_0_0_4px_rgba(241,90,41,0.2)] group-focus-visible:shadow-[0_2px_8px_rgba(0,0,0,0.25),0_0_0_3px_#F15A29,0_0_0_5px_rgba(241,90,41,0.35)]"
            aria-hidden
          >
            ‹›
          </span>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        drag to compare · stock markers ↔ three panes
      </p>
    </div>
  );
}

export function MagicShowcase() {
  return (
    <section
      id="magic"
      className="scroll-mt-28 bg-paper-2 py-16 sm:py-20 lg:py-28"
    >
      <div className="gv-container max-w-[1100px]">
        <div className="reveal mb-10 max-w-2xl lg:mb-12">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            the same file · drag to compare
          </p>
          <h2 className="text-[clamp(1.65rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink-light">
            Markers in,{" "}
            <span className="text-muted">clarity out.</span>
          </h2>
          <p className="mt-4 max-w-[520px] text-[14.5px] leading-[1.65] text-fg-light">
            Stock VS Code drops{" "}
            <code className="font-mono text-git-conflict">{"<<<<<<<"}</code>{" "}
            into your file. GitView builds the same conflict from Git stages in
            three panes — editable Result, ✦ auto-resolve where both sides
            agree.
          </p>
        </div>

        <CompareScrub />

        <div className="reveal mt-10 flex flex-col items-start gap-4 rounded-xl border border-ink-light/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <p className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink-light">
              Ready to stop scrolling past markers?
            </p>
            <p className="mt-1 text-[13.5px] text-fg-light">
              Free · MIT · VS Code tested · compatible forks supported.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <InstallLink
              source="magic"
              className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-md bg-accent px-5 py-3 text-[13.5px] font-semibold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98]"
            >
              {SITE.primaryLabel} <span aria-hidden>→</span>
            </InstallLink>
            <a
              href="#install"
              className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-md border border-ink-light/15 px-4 py-3 text-[13px] font-medium text-fg-light transition-colors hover:border-ink-light/30 hover:text-ink-light"
            >
              Other editors →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
