import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BlogContent } from "@/components/BlogContent";
import { formatPostDate, getPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = `https://www.windsec.space/blogs/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Roe by Windsec` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="relative mx-auto min-h-[calc(100vh-61px)] max-w-6xl overflow-x-clip px-4 sm:px-5">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] dot-grid opacity-50"
          aria-hidden
        />
        <article className="mx-auto max-w-4xl pb-16 pt-8 sm:pt-12 md:pb-24">
          <Link to="/blogs" className="eyebrow transition-colors hover:text-primary">
            <span aria-hidden>←</span> All blogs
          </Link>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
            Windsec research · {formatPostDate(post.date)} · {post.readMinutes} min read
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 border-b border-border pb-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
            By {post.author}
          </p>

          <BlogContent blocks={post.blocks} />

          <section className="mt-14 border border-border bg-card p-5 sm:mt-16 sm:p-8">
            <p className="eyebrow">see it yourself</p>
            <h2 className="font-display mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
              Ship with Roe.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Roe shows what a page, email, issue, file or image says to your agent that you can't
              see, which attack it matches, and which sensitive actions it's aiming at.
            </p>
            <div className="mt-6">
              <a
                href="/#download"
                className="inline-block bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Download extension
              </a>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
