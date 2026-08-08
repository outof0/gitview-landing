import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "./Editor";

/** Auto-cycling hero demo. conflict → auto-resolve → ready → repeat.
 *  Phase pills are clickable (pauses autoplay briefly). Respects
 *  prefers-reduced-motion and pauses when off-screen. */

type State = "conflict" | "magic" | "ready";

const STATES: { id: State; label: string; short: string; dot: string }[] = [
  { id: "conflict", label: "conflict", short: "conflict", dot: "#EF4444" },
  { id: "magic", label: "auto-resolve", short: "auto", dot: "#3882F6" },
  { id: "ready", label: "ready", short: "ready", dot: "#22C55E" },
];

const CYCLE_MS = 3400;
const RESUME_MS = 8000;

export function HeroEditor() {
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(true);
  const [dip, setDip] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof window === "undefined") {
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setI(STATES.length - 1);
      setPaused(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView || paused) {
      return;
    }
    const t = setInterval(
      () => setI((p) => (p + 1) % STATES.length),
      CYCLE_MS
    );
    return () => {
      clearInterval(t);
    };
  }, [inView, paused]);

  useEffect(() => {
    setDip(true);
    const id = setTimeout(() => setDip(false), 180);
    return () => {
      clearTimeout(id);
    };
  }, [i]);

  const selectPhase = useCallback((idx: number) => {
    setI(idx);
    setPaused(true);
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    },
    []
  );

  const current = STATES[i];

  return (
    <div ref={wrapRef} className="relative">
      {/* Phase indicator — clickable */}
      <div
        className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3"
        role="tablist"
        aria-label="Demo phases"
      >
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-1.5">
          {STATES.map((s, idx) => {
            const active = idx === i;
            return (
              <button
                key={s.id}
                id={`hero-demo-tab-${s.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="hero-demo-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectPhase(idx)}
                onKeyDown={(event) => {
                  let next = idx;
                  if (event.key === "ArrowRight") {
                    next = (idx + 1) % STATES.length;
                  } else if (event.key === "ArrowLeft") {
                    next = (idx - 1 + STATES.length) % STATES.length;
                  } else if (event.key === "Home") {
                    next = 0;
                  } else if (event.key === "End") {
                    next = STATES.length - 1;
                  } else {
                    return;
                  }
                  event.preventDefault();
                  selectPhase(next);
                  requestAnimationFrame(() => {
                    document.getElementById(`hero-demo-tab-${STATES[next].id}`)?.focus();
                  });
                }}
                className={`flex items-center gap-1 rounded-sm px-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all sm:gap-1.5 sm:px-2 sm:text-[11px] sm:tracking-[0.16em] ${
                  active
                    ? "bg-white/10 text-faint opacity-100"
                    : "text-muted opacity-50 hover:opacity-80"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: s.dot }}
                />
                <span className="sm:hidden">{s.short}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 gap-1 sm:gap-1.5" aria-hidden>
          {STATES.map((s, idx) => (
            <span
              key={s.id}
              className="relative h-1 w-5 overflow-hidden rounded-full bg-white/10 sm:w-8"
            >
              {idx === i && !paused && (
                <span
                  key={`${i}-${paused}`}
                  className="absolute inset-y-0 left-0 animate-seg-fill rounded-full"
                  style={{
                    background: s.dot,
                    animationDuration: `${CYCLE_MS}ms`,
                  }}
                />
              )}
              {idx === i && paused && (
                <span
                  className="absolute inset-y-0 left-0 w-full rounded-full"
                  style={{ background: s.dot }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <div
        id="hero-demo-panel"
        role="tabpanel"
        aria-labelledby={`hero-demo-tab-${current.id}`}
        className={`w-full transition-opacity duration-200 ease-out ${
          dip ? "opacity-50" : "opacity-100"
        }`}
      >
        <Editor state={current.id} />
      </div>

      <p
        className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-dim sm:mt-3 sm:text-[11px] sm:tracking-[0.16em]"
        aria-live="polite"
      >
        live demo · {current.label}
      </p>
    </div>
  );
}
