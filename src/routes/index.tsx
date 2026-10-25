import { createFileRoute } from "@tanstack/react-router";
import { BrowserDemo } from "@/components/BrowserDemo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  PILLARS, THREATS, FEATURES, SURFACES, FILES, PIPELINE, EDITIONS, ENTERPRISE, FAQ, LIMITS,
} from "@/lib/roe-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roe by Windsec — See what your AI agent sees" },
      { name: "description", content: "Roe is a browser extension by Windsec that reveals hidden instructions aimed at your AI agents in pages, email, files and images." },
      { property: "og:title", content: "Roe by Windsec — See what your AI agent sees" },
      { property: "og:description", content: "Find hidden prompt injections before your AI agent reads them." },
    ],
  }),
  component: Index,
});

const sev = (s: string) => (s === "High" ? "text-roe" : s === "Medium" ? "text-amber" : "text-muted-foreground");

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-widest ${light ? "text-cream/70" : "text-roe"}`}>{children}</p>
  );
}

function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl ${light ? "text-cream" : ""}`}>
      {children}
    </h2>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="pt-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">ROE 0.5.0 · Windsec</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            See what your AI agent sees
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Roe shows what a page, email, issue, file or image says to your agent{" "}
            <span className="underline decoration-roe decoration-dotted underline-offset-4">that you can't see</span>,
            which attack it matches, and which sensitive actions it's aiming at.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <a href="#install" className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy-deep">Download extension</a>
            <a href="#how" className="rounded-md bg-cream px-5 py-2.5 text-sm font-medium text-navy-deep hover:bg-paper-2">How it works</a>
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">∵ Because your agent reads every word ∵</p>
        </section>

        <section className="mt-12"><BrowserDemo /></section>

        {/* Pillars */}
        <section className="mt-28">
          <Eyebrow>not just visible text</Eyebrow>
          <H2>Your agent reads more than you do.</H2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Most tools only look at what's on screen. But text can be styled out of sight, tucked into attributes, or encoded in
            invisible characters. Roe narrows the question to the one that matters: <em className="text-navy">is this page trying to give my agent orders?</em>
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PILLARS.map(([tag, title, body]) => (
              <div key={title} className="rounded-lg border border-border bg-foam p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{tag}</p>
                <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-28 text-center">
          <Eyebrow>visibility, not guesswork</Eyebrow>
          <H2>You see a blog post. Your agent sees orders.</H2>
          <p className="mt-3 text-sm text-muted-foreground">From the demo page above.</p>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
            <div className="rounded-lg bg-navy p-8 text-cream">
              <p className="font-mono text-[11px] uppercase tracking-widest text-cream/70">With Roe</p>
              <p className="mt-4 font-display text-7xl font-extrabold text-cream">4</p>
              <p className="mt-2">hidden instructions found and mapped to actions</p>
              <p className="mt-6 font-mono text-xs text-cream/70">2 high · 2 medium · highlight or remove in one click</p>
            </div>
            <div className="rounded-lg border border-border bg-foam p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Reading it yourself</p>
              <p className="mt-4 font-display text-7xl font-extrabold text-muted-foreground">0</p>
              <p className="mt-2">things look wrong on screen</p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">white-on-white · 0px text · your agent obeys</p>
            </div>
          </div>
        </section>

        {/* Threat table */}
        <section id="threats" className="mt-28">
          <Eyebrow>what it looks for</Eyebrow>
          <H2>Nine families of agent attack.</H2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-foam">
            <div className="flex justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Threat category</span><span>Severity · detection</span>
            </div>
            {THREATS.map(([name, ex, s, pct]) => (
              <div key={name} className="flex items-center gap-4 border-b border-border px-5 py-3 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">{ex}</p>
                </div>
                <span className={`w-16 font-mono text-[11px] uppercase ${sev(s)}`}>{s}</span>
                <div className="hidden h-1.5 w-28 rounded bg-paper-2 sm:block">
                  <div className="h-full rounded bg-roe" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Rules cite their source: Morris II, EchoLeak CVE-2025-32711, GitHub MCP issue injection, memory poisoning, Rules File Backdoor.
          </p>
        </section>

        {/* Features */}
        <section className="mt-28">
          <Eyebrow>built for the browser</Eyebrow>
          <H2>Roe reads the page the way an agent would.</H2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(([t, b], i) => (
              <div key={t} className="bg-foam p-6">
                <span className="font-mono text-[11px] text-roe">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline */}
        <section id="how" className="mt-28 rounded-xl bg-navy p-8 sm:p-12">
          <Eyebrow light>how it works</Eyebrow>
          <H2 light>One click, the whole scan.</H2>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((s, i) => (
              <li key={s} className="rounded-lg border border-cream/20 p-4">
                <span className="font-mono text-xs text-roe">0{i + 1}</span>
                <p className="mt-2 font-medium text-cream">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 overflow-hidden rounded-lg border border-cream/20">
            {SURFACES.map(([t, b]) => (
              <div key={t} className="flex flex-col gap-1 border-b border-cream/20 px-5 py-3 last:border-0 sm:flex-row sm:gap-6">
                <span className="w-36 shrink-0 font-mono text-xs uppercase tracking-widest text-cream">{t}</span>
                <span className="text-sm text-cream/75">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Files */}
        <section className="mt-28">
          <Eyebrow>files too, not just pages</Eyebrow>
          <H2>What it reads inside files.</H2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-foam">
            {FILES.map(([f, d]) => (
              <div key={f} className="flex flex-col gap-1 border-b border-border px-5 py-3 last:border-0 sm:flex-row sm:gap-6">
                <span className="w-40 shrink-0 text-sm font-semibold">{f}</span>
                <span className="text-sm text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Editions */}
        <section id="editions" className="mt-28">
          <Eyebrow>two editions</Eyebrow>
          <H2>Free for you. Enterprise for your fleet.</H2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-foam">
            <div className="flex border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex-1">Capability</span><span className="w-20 text-center">Free</span><span className="w-20 text-center">Enterprise</span>
            </div>
            {EDITIONS.map(([c, f, e]) => (
              <div key={c} className="flex items-center border-b border-border px-5 py-3 text-sm last:border-0">
                <span className="flex-1">{c}</span>
                <span className="w-20 text-center text-roe">{f ? "●" : "—"}</span>
                <span className="w-20 text-center text-roe">{e ? "●" : "—"}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISE.map(([t, b]) => (
              <div key={t} className="rounded-lg bg-cream p-5">
                <h3 className="font-display text-lg font-bold text-navy-deep">{t}</h3>
                <p className="mt-2 text-sm text-navy">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-28">
          <Eyebrow>we give a FAQ</Eyebrow>
          <H2>Questions, one at a time.</H2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold">
                  {q}
                  <span className="font-mono text-roe group-open:hidden">+</span>
                  <span className="hidden font-mono text-roe group-open:inline">–</span>
                </summary>
                <p className="mt-3 max-w-3xl text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-dashed border-roe/50 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-roe">Honest about limits</p>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {LIMITS.map((l) => <li key={l}>— {l}</li>)}
            </ul>
          </div>
        </section>

        {/* Install */}
        <section id="install" className="mx-auto mt-28 max-w-3xl rounded-xl bg-navy p-8 text-cream sm:p-10">
          <Eyebrow light>get started</Eyebrow>
          <H2 light>Ship with Roe.</H2>
          <pre className="mt-6 overflow-x-auto rounded-lg bg-navy-deep p-4 font-mono text-xs leading-6 text-cream/90">
{`1  unzip roe-extension.zip
2  open chrome://extensions  → Developer mode on
3  Load unpacked → pick the folder with manifest.json
4  click the Roe icon on any page`}
          </pre>
          <p className="mt-4 text-sm text-cream/75">
            For download scanning, open Roe's Details in chrome://extensions and turn on "Allow access to file URLs".
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/roe-free-0.2.zip" download className="rounded-md bg-roe px-5 py-2.5 text-sm font-medium text-foam hover:bg-roe-ink">Download Free · 0.2</a>
            <a href="/roe-enterprise-0.5.0.zip" download className="rounded-md bg-cream px-5 py-2.5 text-sm font-medium text-navy-deep hover:bg-paper">Enterprise · 0.5.0</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
