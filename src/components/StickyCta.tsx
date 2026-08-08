import { useEffect, useState } from "react";
import { SITE } from "../site";
import { InstallLink } from "./InstallLink";

/** Mobile-only sticky install bar. Shows after hero scroll; hides when the
 *  install section is in view so it doesn't stack on the real CTAs. */

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const install = document.getElementById("install");
    let pastHero = false;
    let installInView = false;

    const update = () => {
      const show = pastHero && !installInView;
      setVisible(show);
      document.body.classList.toggle("has-sticky-cta", show);
    };

    const onScroll = () => {
      pastHero = window.scrollY > 520;
      update();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (install) {
      io = new IntersectionObserver(
        ([entry]) => {
          installInView = entry.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -15% 0px", threshold: 0.12 }
      );
      io.observe(install);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      document.body.classList.remove("has-sticky-cta");
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-3 py-2.5 backdrop-blur-lg transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{
        paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0px))",
      }}
      aria-hidden={!visible}
    >
      <InstallLink
        source="sticky"
        tabIndex={visible ? 0 : -1}
        className="flex w-full min-h-[48px] items-center justify-between rounded-md bg-accent px-4 py-3 text-[13.5px] font-semibold text-white shadow-md shadow-accent/25 transition-colors hover:bg-accent/90 active:scale-[0.99]"
      >
        <span className="flex items-center gap-2">
          {SITE.primaryLabel}
          <span aria-hidden>→</span>
        </span>
        <span className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-white/70">
          v{SITE.version} · MIT
        </span>
      </InstallLink>
    </div>
  );
}
