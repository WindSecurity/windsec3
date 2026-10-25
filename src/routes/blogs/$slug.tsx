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

      <main className="mx-auto max-w-5xl px-6">
        <article className="mx-auto max-w-2xl pt-10">
          <Link
            to="/blogs"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-roe"
          >
            ← All blogs
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-navy-deep"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 border-b border-border pb-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            By {post.author} · {formatPostDate(post.date)} · {post.readMinutes} min read
          </p>

          <BlogContent blocks={post.blocks} />

          <section className="mt-16 rounded-xl bg-navy p-8 text-cream sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cream/70">
              see it yourself
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight">
              Ship with Roe.
            </h2>
            <p className="mt-3 text-sm text-cream/75">
              Roe shows what a page, email, issue, file or image says to your agent that you can't
              see, which attack it matches, and which sensitive actions it's aiming at.
            </p>
            <div className="mt-6">
              <a
                href="/#install"
                className="inline-block rounded-md bg-roe px-5 py-2.5 text-sm font-medium text-foam hover:bg-roe-ink"
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
