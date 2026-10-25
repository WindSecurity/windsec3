import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";

/**
 * Shared top bar. Section links use "/#id" so they also work from other pages (e.g. /blogs).
 */
export function SiteHeader() {
  const closeMobileMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link to="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-display text-2xl font-medium tracking-tight">roe</span>
          <span className="eyebrow hidden sm:inline">by Windsec</span>
        </Link>
        <details className="relative md:hidden">
          <summary className="flex list-none cursor-pointer items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
            Menu
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full z-50 mt-2 grid min-w-48 gap-1 border border-border bg-background p-2 text-sm shadow-lg">
            <a
              href="/#how"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="/#threats"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Threats
            </a>
            <a
              href="/#editions"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Editions
            </a>
            <a
              href="/#faq"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              FAQ
            </a>
            <Link
              to="/blogs"
              onClick={closeMobileMenu}
              className="px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary font-semibold text-primary" }}
            >
              Blogs
            </Link>
          </nav>
        </details>
        <nav className="hidden items-center gap-3 text-xs text-muted-foreground md:flex lg:gap-4 lg:text-sm xl:gap-6">
          <a href="/#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="/#threats" className="transition-colors hover:text-foreground">
            Threats
          </a>
          <a href="/#editions" className="transition-colors hover:text-foreground">
            Editions
          </a>
          <a href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
          <Link
            to="/blogs"
            className="transition-colors hover:text-foreground"
            activeProps={{ className: "font-semibold text-primary" }}
          >
            Blogs
          </Link>
        </nav>
        <a
          href="/#download"
          className="shrink-0 bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:px-4 sm:text-sm"
        >
          Download ROE
        </a>
      </div>
    </header>
  );
}
