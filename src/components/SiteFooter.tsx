/** Shared footer with the large "roe" banner. */
export function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="overflow-hidden bg-navy">
        <div className="mx-auto flex max-w-5xl items-end justify-between px-6 pt-10">
          <p className="max-w-xs pb-6 text-sm text-cream/80">
            Stop hidden prompts before your agent acts on them.
          </p>
          <span className="h-4 w-4 rounded-full bg-roe" />
        </div>
        <p className="select-none text-center font-display text-[32vw] font-extrabold leading-[0.75] tracking-tighter text-cream">
          roe
        </p>
      </div>
      <div className="mx-auto flex max-w-5xl justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>© 2026 Windsec</span>
        <span>Roe · AI agent threat visibility</span>
      </div>
    </footer>
  );
}
