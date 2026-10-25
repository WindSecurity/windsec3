import { Link } from "@tanstack/react-router";

/**
 * Shared top bar. Section links use "/#id" so they also work from other pages (e.g. /blogs).
 */
export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <Link to="/" className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-roe" />
        <span className="font-display text-xl font-bold">roe</span>
        <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          by Windsec
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <a href="/#how" className="hidden hover:text-roe sm:inline">
          How it works
        </a>
        <a href="/#editions" className="hidden hover:text-roe sm:inline">
          Editions
        </a>
        <a href="/#faq" className="hidden hover:text-roe sm:inline">
          FAQ
        </a>
        <Link
          to="/blogs"
          className="hidden hover:text-roe sm:inline"
          activeProps={{ className: "text-roe" }}
        >
          Blogs
        </Link>
        <a href="/#install" className="rounded-md border border-navy px-3 py-1.5 hover:bg-cream">
          Download
        </a>
      </nav>
    </header>
  );
}
