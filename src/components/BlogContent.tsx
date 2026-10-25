import { Fragment, type ReactNode } from "react";
import type { Block } from "@/lib/blog-posts";

/** Renders **bold** segments inside a string. */
function Inline({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-[17px] leading-relaxed text-foreground/90">
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3 text-[17px] leading-relaxed text-foreground/90">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-roe" />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-6 grid gap-3">
          {block.items.map((item, i) => (
            <li key={item} className="rounded-lg border border-border bg-foam p-5">
              <span className="font-mono text-xs text-roe">0{i + 1}</span>
              <p className="mt-2 text-[16px] leading-relaxed text-foreground/90">
                <Inline text={item} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-lg bg-cream p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-roe-ink">
            The key risk
          </p>
          <p className="mt-2 font-display text-xl leading-snug text-navy-deep">
            <Inline text={block.text} />
          </p>
        </div>
      );
    case "pull":
      return (
        <p className="mt-10 border-y border-border py-8 font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl [&_strong]:underline [&_strong]:decoration-roe [&_strong]:decoration-dotted [&_strong]:underline-offset-4">
          <Inline text={block.text} />
        </p>
      );
    case "refs":
      return (
        <ol className="mt-5 space-y-2 text-sm">
          {block.items.map((r, i) => (
            <li key={r.href} className="flex gap-3">
              <span className="font-mono text-xs text-roe">0{i + 1}</span>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words underline decoration-roe decoration-dotted underline-offset-4 hover:text-roe"
              >
                {r.label}
              </a>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="mt-8 rounded-lg border border-dashed border-roe/50 p-5 text-sm text-muted-foreground">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-widest text-roe">
            Note
          </span>
          {block.text}
        </p>
      );
  }
}

export function BlogContent({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}
