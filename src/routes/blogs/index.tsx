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

      <main className="mx-auto max-w-5xl px-6">
        <section className="pt-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-roe">
            windsec research
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Blogs
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Notes on AI agent security, prompt injection and what your agent reads that you can't
            see.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-lg border border-border bg-foam p-6 transition-colors hover:border-navy"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {formatPostDate(post.date)} · {post.readMinutes} min read
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-navy-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-widest text-roe group-hover:underline group-hover:underline-offset-4">
                Read the post →
              </span>
            </Link>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
