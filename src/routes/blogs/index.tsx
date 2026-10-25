import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { POSTS, formatPostDate } from "@/lib/blog-posts";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs — Roe by Windsec" },
      {
        name: "description",
        content:
          "Research and writing from Windsec on AI agent security, prompt injection and browser security.",
      },
      { property: "og:title", content: "Blogs — Roe by Windsec" },
      {
        property: "og:description",
        content:
          "Research and writing from Windsec on AI agent security, prompt injection and browser security.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.windsec.space/blogs" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="relative mx-auto min-h-[calc(100vh-74px)] max-w-6xl overflow-x-clip px-4 sm:px-5">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] dot-grid opacity-50"
          aria-hidden
        />
        <section className="pb-10 pt-14 sm:pt-20 md:pb-14 md:pt-24">
          <p className="eyebrow">Windsec research</p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] text-balance sm:text-5xl md:text-7xl">
            Blogs
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Notes on AI agent security, prompt injection and what your agent reads that you can't
            see.
          </p>
        </section>

        <section className="mb-16 grid gap-5 md:mb-24">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="group relative grid gap-8 border border-border bg-card p-5 transition-colors hover:border-primary/60 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                  {formatPostDate(post.date)} · {post.readMinutes} min read
                </p>
                <h2 className="mt-4 max-w-5xl font-display text-2xl font-semibold leading-tight text-balance sm:text-3xl md:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-5xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {post.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform group-hover:-translate-y-0.5">
                Read the post <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
