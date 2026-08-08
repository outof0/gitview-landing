import { useState } from "react";

// CSS-rebuilt 3-pane merge resolver for the landing page.
// Mobile (< sm): single pane with Yours / Result / Theirs tabs.
// sm+: full three-pane side-by-side.

type Kind = "ctx" | "added" | "modified" | "deleted" | "conflict" | "magic";

interface Row {
  n: number;
  text: string;
  kind: Kind;
}

const OURS: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "modified" },
  { n: 3, text: "  return profile", kind: "conflict" },
  { n: 4, text: "}", kind: "ctx" },
];

const OURS_MAGIC: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "modified" },
  { n: 3, text: "  return profile", kind: "modified" },
  { n: 4, text: "}", kind: "ctx" },
];

const CENTER: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "conflict" },
  { n: 3, text: "  return profile", kind: "conflict" },
  { n: 4, text: "}", kind: "ctx" },
];

const CENTER_MAGIC: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "magic" },
  { n: 3, text: "  return profile", kind: "conflict" },
  { n: 4, text: "}", kind: "ctx" },
];

const CENTER_READY: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "added" },
  { n: 3, text: "  return profile", kind: "added" },
  { n: 4, text: "  metrics.track()", kind: "added" },
  { n: 5, text: "}", kind: "ctx" },
];

const THEIRS: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "modified" },
  { n: 3, text: "  return data", kind: "modified" },
  { n: 4, text: "  metrics.track()", kind: "added" },
  { n: 5, text: "}", kind: "ctx" },
];

const THEIRS_READY: Row[] = [
  { n: 1, text: "loadUser(id) {", kind: "ctx" },
  { n: 2, text: "  user = get(id)", kind: "modified" },
  { n: 3, text: "  return profile", kind: "modified" },
  { n: 4, text: "  metrics.track()", kind: "added" },
  { n: 5, text: "}", kind: "ctx" },
];

interface State {
  ours: Row[];
  center: Row[];
  theirs: Row[];
  statusCount: { color: string };
  statusText: string;
  footerLeft: { dot: string; text: string; short: string };
  footerCta: string;
}

const STATES: Record<"conflict" | "magic" | "ready", State> = {
  conflict: {
    ours: OURS,
    center: CENTER,
    theirs: THEIRS,
    statusCount: { color: "#EF4444" },
    statusText: "1 conflict",
    footerLeft: {
      dot: "#EF4444",
      text: "1 conflict remaining",
      short: "1 conflict",
    },
    footerCta: "Apply",
  },
  magic: {
    ours: OURS_MAGIC,
    center: CENTER_MAGIC,
    theirs: THEIRS,
    statusCount: { color: "#3882F6" },
    statusText: "✦ 1 auto · 1 to decide",
    footerLeft: {
      dot: "#3882F6",
      text: "✦ 7 of 8 auto · 1 to decide",
      short: "✦ 1 left",
    },
    footerCta: "Apply",
  },
  ready: {
    ours: OURS_MAGIC,
    center: CENTER_READY,
    theirs: THEIRS_READY,
    statusCount: { color: "#22C55E" },
    statusText: "● ready",
    footerLeft: {
      dot: "#22C55E",
      text: "● 0 conflicts · ready to commit",
      short: "ready",
    },
    footerCta: "Apply & commit",
  },
};

const MAX_ROWS = 5;

type PaneKey = "ours" | "center" | "theirs";

const PANE_TABS: { key: PaneKey; label: string }[] = [
  { key: "ours", label: "Yours" },
  { key: "center", label: "Result" },
  { key: "theirs", label: "Theirs" },
];

function ChromeBtn({
  children,
  active,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`toolbtn toolbtn-static ${active ? "active" : ""} ${className}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

function EditorPane({
  from,
  sub,
  rows,
  highlight,
  showHeader = true,
}: {
  from: string;
  sub: string;
  rows: Row[];
  highlight?: "conflict" | "magic";
  showHeader?: boolean;
}) {
  const filler = Math.max(0, MAX_ROWS - rows.length);
  return (
    <div className="pane">
      {showHeader && (
        <div className="pane-h">
          <span className="from truncate">{from}</span>
          <span
            className="hidden truncate sm:inline"
            style={{ color: "#5a5d63" }}
          >
            {sub}
          </span>
        </div>
      )}
      <div className="pane-body">
        {rows.map((r) => {
          const isConflict =
            (highlight === "conflict" && r.kind === "conflict") ||
            (highlight === "magic" && r.kind === "magic");
          const cls = `row c-${r.kind === "magic" ? "modified" : r.kind}`;
          return (
            <div key={r.n} className={cls}>
              <span className="ln">{r.n}</span>
              <span className="txt">
                {isConflict ? <span className="word">{r.text}</span> : r.text}
              </span>
            </div>
          );
        })}
        {Array.from({ length: filler }).map((_, i) => (
          <div key={`pad-${i}`} className="row" aria-hidden />
        ))}
      </div>
    </div>
  );
}

interface EditorProps {
  state?: "conflict" | "magic" | "ready";
}

export function Editor({ state = "conflict" }: EditorProps) {
  const s = STATES[state];
  const highlight: "conflict" | "magic" | undefined =
    state === "conflict" ? "conflict" : state === "magic" ? "magic" : undefined;
  const [mobilePane, setMobilePane] = useState<PaneKey>("center");

  const paneRows: Record<PaneKey, Row[]> = {
    ours: s.ours,
    center: s.center,
    theirs: s.theirs,
  };
  const paneMeta: Record<PaneKey, { from: string; sub: string }> = {
    ours: { from: "Yours", sub: ":2:" },
    center: { from: "Result", sub: "merged" },
    theirs: { from: "Theirs", sub: ":3:" },
  };

  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-md border border-border bg-ink font-mono text-faint shadow-[0_24px_64px_-24px_rgba(10,11,16,0.6)]"
      role="region"
      aria-label={`Merge editor demo: ${s.statusText}`}
    >
      <div className="titlebar">
        <span className="hidden shrink-0 sm:inline">Resolve Conflicts</span>
        <span className="hidden sm:inline" style={{ color: "#70727a" }}>
          —
        </span>
        <span className="truncate font-semibold" style={{ color: "#bcbec4" }}>
          src/api/user.ts
        </span>
        <span className="shrink-0" style={{ color: s.statusCount.color }}>
          ●
        </span>
        <span
          className="ml-auto shrink-0"
          style={{ color: "#70727a" }}
          aria-hidden
        >
          ✕
        </span>
      </div>

      <div
        className="toolbar no-scrollbar overflow-x-auto whitespace-nowrap"
        aria-hidden
      >
        <ChromeBtn>▲</ChromeBtn>
        <ChromeBtn>▼</ChromeBtn>
        <span className="tsep" />
        <ChromeBtn>►</ChromeBtn>
        <ChromeBtn>◄</ChromeBtn>
        <ChromeBtn active>✦</ChromeBtn>
        <span className="ml-auto" />
        <span className="shrink-0 pr-1 text-[11px]" style={{ color: "#70727a" }}>
          {state === "conflict" && (
            <span style={{ color: "#EF4444" }}>1 conflict</span>
          )}
          {state === "magic" && (
            <>
              <span style={{ color: "#3882F6" }}>✦ 1</span>
              <span style={{ color: "#EF4444" }}> · 1</span>
            </>
          )}
          {state === "ready" && (
            <span style={{ color: "#22C55E" }}>● ready</span>
          )}
        </span>
      </div>

      {/* Mobile: single pane + tabs (readable at 320px) */}
      <div className="sm:hidden">
        <div
          className="flex border-b border-[#393b40] bg-[#2b2d30]"
          role="tablist"
          aria-label="Pane"
        >
          {PANE_TABS.map((t) => {
            const active = mobilePane === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMobilePane(t.key)}
                className={`flex-1 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-b-2 border-accent text-faint"
                    : "border-b-2 border-transparent text-[#70727a]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <EditorPane
          from={paneMeta[mobilePane].from}
          sub={paneMeta[mobilePane].sub}
          rows={paneRows[mobilePane]}
          highlight={mobilePane === "center" ? highlight : undefined}
          showHeader={false}
        />
      </div>

      {/* sm+: full three panes */}
      <div className="hidden min-w-0 grid-cols-[1fr_1.15fr_1fr] divide-x divide-[#393b40] sm:grid sm:min-w-[min(100%,420px)] lg:min-w-0">
        <EditorPane from="Yours" sub=":2:" rows={s.ours} />
        <EditorPane
          from="Result"
          sub="merged"
          rows={s.center}
          highlight={highlight}
        />
        <EditorPane from="Theirs" sub=":3:" rows={s.theirs} />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#393b40] bg-[#2b2d30] px-2.5 py-2 font-mono text-[10.5px] text-[#70727a] sm:px-4 sm:text-[11.5px]">
        <span className="min-w-0 truncate">
          <span style={{ color: s.footerLeft.dot }}>●</span>{" "}
          <span className="sm:hidden">{s.footerLeft.short}</span>
          <span className="hidden sm:inline">{s.footerLeft.text}</span>
        </span>
        <span className="flex shrink-0 gap-1 sm:gap-2" aria-hidden>
          <ChromeBtn className="!min-w-0 !px-2.5 hidden sm:inline-flex">
            Abort
          </ChromeBtn>
          <ChromeBtn active className="!min-w-0 !px-2.5 !font-semibold">
            {s.footerCta}
          </ChromeBtn>
        </span>
      </div>
    </div>
  );
}
