import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { POSTS } from "@/lib/blog-posts";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const makeRouter = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = makeRouter();

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the blogs index at /blogs", () => {
    const matches = makeRouter().matchRoutes("/blogs");

    expect(matches.at(-1)?.routeId).toBe("/blogs/");
  });

  it("matches every blog post at /blogs/:slug", () => {
    const router = makeRouter();

    for (const post of POSTS) {
      const matches = router.matchRoutes(`/blogs/${post.slug}`);
      expect(matches.at(-1)?.routeId).toBe("/blogs/$slug");
    }
  });
});

describe("Blog posts", () => {
  it("have unique slugs and the requested title", () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    const rogue = POSTS.find((p) => p.slug === "untrusted-web-content-and-ai-agents-going-rogue");
    expect(rogue?.title).toBe("Untrusted web content and AI agents going rogue");
  });
});
