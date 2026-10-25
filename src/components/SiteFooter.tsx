/** Shared footer for the blog pages. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:px-5 md:flex-row md:text-left">
        <div>
          <p className="font-display text-xl font-medium">roe</p>
          <p className="text-sm text-muted-foreground">
            Stop hidden prompts before your agent acts on them.
          </p>
        </div>
        <a
          href="https://github.com/WindSecurity/roe"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          github.com/WindSecurity/roe
        </a>
        <p className="text-xs text-muted-foreground">© 2026 Windsec · AI agent threat visibility</p>
      </div>
    </footer>
  );
}
