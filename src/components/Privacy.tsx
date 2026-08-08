import { SITE } from "../site";

export function Privacy() {
  return (
    <section id="privacy" className="scroll-mt-28 bg-paper py-14 sm:py-16">
      <div className="gv-container max-w-[800px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          privacy
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-ink-light">
          No tracking by GitView.
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-[1.7] text-fg-light">
          <p>
            This website sets no cookies and loads no analytics or advertising
            services. The extension sends no product telemetry.
          </p>
          <p>
            Local Git operations stay on your machine. Hosted review connects
            only to the GitHub or GitLab API that you explicitly configure, and
            credentials are stored in the editor&apos;s Secret Storage.
          </p>
          <p>
            Questions or security reports: {" "}
            <a
              className="underline decoration-muted/40 underline-offset-4 hover:text-ink-light"
              href={`mailto:${SITE.supportEmail}`}
            >
              {SITE.supportEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
