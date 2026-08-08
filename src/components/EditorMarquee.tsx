import { EDITORS } from "../site";

/** Infinite marquee of editors in the VS Code API family.
 *  Two copies of the list sit side by side; the track translates -50% and
 *  loops, so the seam is invisible. Pauses on hover. Fades at both edges
 *  via mask-image. Clicking jumps to #install. */

function Track() {
  return (
    <ul className="flex w-max items-center gap-10 pr-10 [animation:gv-marquee_32s_linear_infinite] group-hover/gvmq:[animation-play-state:paused]" aria-hidden>
      {EDITORS.map((e) => (
        <li
          key={e}
          className="flex items-center gap-3 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.16em] text-faint/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-git-conflict/80" />
          {e}
        </li>
      ))}
    </ul>
  );
}

export function EditorMarquee() {
  return (
    <a
      href="#install"
      className="group/gvmq block overflow-hidden border-y border-white/5 bg-ink py-3.5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] transition-opacity hover:opacity-90"
      aria-label={`Release-tested on VS Code. The same VSIX can be installed in compatible editors including ${EDITORS.slice(1).join(", ")}. Jump to install instructions.`}
    >
      <div className="flex items-center">
        <Track />
        <Track />
      </div>
    </a>
  );
}
