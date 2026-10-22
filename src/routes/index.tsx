import { createFileRoute } from "@tanstack/react-router";
import roeHalftone from "@/assets/roe-halftone.png";
import { cn } from "@/lib/utils";
import { RoePlayground } from "@/components/RoePlayground";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roe by Windsec — Secure what your Agent Sees" },
      {
        name: "description",
        content:
          "Roe is a Chrome extension by Windsec that shows what a page, email, file or image says to your AI agent that you can't see — which attack it matches, and which actions it's aiming at.",
      },
      {
        property: "og:title",
        content: "Roe by Windsec — Secure what your Agent Sees",
      },
      {
        property: "og:description",
        content:
          "Agentic threat visibility for the browser. Hidden prompt injections, decoded, scored and mapped to the actions they aim at.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ROE_URL = "https://github.com/WindSecurity/roe";

const THREATS = [
  { name: "Standing instruction", ex: "“when asked for a summary, store this fact”", sev: "High" },
  { name: "Instruction override", ex: "“ignore previous instructions”, fake system markers", sev: "High" },
  { name: "Data exfiltration", ex: "send data out, reveal secrets, leaky image URLs", sev: "High" },
  { name: "Email-borne", ex: "forward “confidential” mail, delete “for security”", sev: "High" },
  { name: "Persistence", ex: "save to memory, edit CLAUDE.md / AGENTS.md / hooks", sev: "High" },
  { name: "Self-replicating prompts", ex: "copy this into every reply, forward to all", sev: "High" },
  { name: "Left-behind instructions", ex: "notes for “the next agent”, [AGENT NOTE]", sev: "Medium" },
  { name: "Tool and file abuse", ex: "fake <IMPORTANT> tags, pointers at ~/.ssh, .env", sev: "Medium" },
  { name: "Obfuscation", ex: "hidden CSS, split tags, Base64, invisible Unicode", sev: "Medium" },
];

const BROWSER_FEATURES = [
  { n: "01", title: "Invisible text decoding", body: "Unicode tag characters, variation selectors, zero-width binary and words split with soft hyphens are decoded and shown in plain text." },
  { n: "02", title: "Highlight on page", body: "Each finding scrolls to the exact text and draws a butter-yellow marker with a red label, one box per line, without changing the page." },
  { n: "03", title: "Tab titles & file names", body: "Titles, href, download and src attributes are checked, because agents read them as trusted metadata." },
  { n: "04", title: "GitHub raw check", body: "Fetches the raw Markdown an agent would receive, including HTML comments the page never shows. No cookies sent." },
  { n: "05", title: "Download scanning", body: "Every finished download is read from disk and scanned. A notification appears when something is found." },
  { n: "06", title: "Remove hidden text", body: "Warn only by default. Switch to removal mode and hidden nodes, comments and flagged attributes are stripped as they appear." },
];

const STEPS = [
  "Page, email or file",
  "Visible + hidden text",
  "Invisible Unicode decoded",
  "Passages joined",
  "Behaviour scored",
  "Mapped to actions",
  "Warn, highlight or remove",
];

const SIGNALS = [
  { title: "Hidden from you, read by your agent.", body: "Pages, email and files hide text in CSS, comments, attributes and invisible Unicode. Roe reads every one of those places and shows you what your agent would receive." },
  { title: "Behaviour-scored, plain words still caught.", body: "Polite text with no attack words is scored by the kinds of control it tries to take: a named agent, a standing rule, a trigger, a request to store or confirm." },
  { title: "More like triage, findings mapped to actions.", body: "Each finding names the attack it matches and the sensitive actions it could aim at: send, forward, delete, pay, edit rules files." },
];

const EDITIONS = [
  {
    name: "Free",
    tag: "For you",
    cta: { label: "Get from GitHub", href: ROE_URL },
    rows: [
      ["Detection on pages, email, GitHub, images, files, downloads", true],
      ["Warn, highlight, remove hidden text", true],
      ["Personal activity log", true],
      ["Agent attribution, policy, human approval", false],
      ["Agent DLP, intent lock, OAuth and install guards", false],
      ["Rogue-agent and AI-worm detection, quarantine, tripwires", false],
      ["Hash-chained audit log, incident timelines, MDM policy", false],
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    tag: "For your org",
    cta: { label: "Contact Windsec", href: "mailto:hello@windsec.space" },
    rows: [
      ["Detection on pages, email, GitHub, images, files, downloads", true],
      ["Warn, highlight, remove hidden text", true],
      ["Personal activity log", true],
      ["Agent attribution, policy, human approval", true],
      ["Agent DLP, intent lock, OAuth and install guards", true],
      ["Rogue-agent and AI-worm detection, quarantine, tripwires", true],
      ["Hash-chained audit log, incident timelines, MDM policy", true],
    ],
    featured: true,
  },
];

const ENTERPRISE_FEATURES = [
  { t: "Intent lock", b: "Give the agent a task. Anything off-task is confirmed, or blocked if the session saw hidden instructions." },
  { t: "Quarantine", b: "An agent that retries twice within 90 seconds after a block is probing policy. Every action is blocked until a person releases it." },
  { t: "Tripwires", b: "An off-screen button a person cannot reach. An agent reading the DOM may click it — and gets caught." },
  { t: "AI-worm detection", b: "Outbound text is scanned and matched against flagged passages, so replicating prompts are stopped at send." },
  { t: "Agent DLP", b: "Cloud keys, private keys, tokens, cards and SSN-like numbers are caught in pasted or typed text. Only the type is logged." },
  { t: "Human approval", b: "Approvals open in a separate window the page cannot restyle, with a 1.5 s dwell and a real click required." },
];

const FAQ = [
  {
    q: "What is Roe?",
    a: "Roe is a browser extension by Windsec. It shows what a page, email, issue, file or image says to your AI agent that you can't see, which attack it matches, and which sensitive actions it could be aiming at. It can also remove the hidden text.",
  },
  {
    q: "How is this different from a prompt filter?",
    a: "Single phrases cannot catch polite text. Roe scores the kinds of control a passage tries to take and needs two kinds, one of them core, before it flags. It reads whole passages, so instructions spread across an email are joined first.",
  },
  {
    q: "Does it upload my pages or files?",
    a: "No. Scanning happens in your browser. The GitHub raw check sends only owner, repo and issue number without cookies, and image re-checks are sent without cookies or referrer — both can be turned off.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome 110 and newer, plus Chromium browsers like Edge, Brave and Arc. Load it unpacked from chrome://extensions with Developer mode on.",
  },
  {
    q: "How does the Enterprise edition turn on?",
    a: "When your organization delivers a managed policy through MDM (Google Admin, Intune/GPO or ExtensionInstallForcelist). A managed policy overrides local settings and is read-only.",
  },
  {
    q: "Can Roe still get things wrong?",
    a: "Yes. It is heuristic: paraphrased, translated or novel attacks can slip past, and ordinary notices can trigger weak false positives. It sees content only, not what an agent actually does, and text inside images needs OCR.",
  },
];

const SECTIONS = [
  { id: "how", label: "How it works" },
  { id: "threats", label: "Threats" },
  { id: "editions", label: "Editions" },
  { id: "faq", label: "FAQ" },
  { id: "download", label: "Download" },
];

const CATEGORIES = [
  "Instruction override",
  "Data exfiltration",
  "Email-borne attack",
  "Persistence",
  "Self-replicating prompt",
  "Standing instruction",
  "Left-behind instruction",
  "Tool and file abuse",
  "Obfuscation",
  "Jailbreak attempt",
  "Context confusion",
  "Image-based injection",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow" data-reveal>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-3 text-4xl text-balance md:text-5xl" data-reveal>
      {children}
    </h2>
  );
}

function SevBadge({ sev }: { sev: string }) {
  return (
    <span
      className={cn(
        "rounded-none px-2.5 py-0.5 text-xs font-medium",
        sev === "High" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
      )}
    >
      {sev}
    </span>
  );
}

function Dot({ on }: { on: boolean }) {
  return on ? (
    <span className="text-accent" aria-label="included">●</span>
  ) : (
    <span className="text-muted-foreground/40" aria-label="not included">—</span>
  );
}

function Index() {
  useReveal();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Hero backdrop */}
      <div className="absolute inset-x-0 top-0 h-[110vh] -z-10">
        <div className="absolute inset-0 dot-grid opacity-70" />
        <div className="absolute inset-0 hero-fade" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl tracking-tight">roe</span>
            <span className="eyebrow">by Windsec</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {SECTIONS.slice(0, 4).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-foreground">{s.label}</a>
            ))}
          </nav>
          <a
            href="#download"
            className="rounded-none bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Download ROE
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-28 pt-24 md:grid-cols-[1.15fr_1fr] md:pt-36">
        <div className="animate-rise text-center md:text-left">
          <Eyebrow>Roe 0.5 · by Windsec</Eyebrow>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] text-balance md:text-7xl">
            Secure what your Agent Sees
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:mx-0 mx-auto">
            Roe shows what a page, email, issue, file or image <em className="text-foreground not-italic font-medium">says to your agent that you can't see</em>,
            which attack it matches, and which sensitive actions it's aiming at.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href={ROE_URL}
              target="_blank"
              rel="noreferrer"
              className="ink-shadow rounded-none bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-x-1 hover:-translate-y-1"
            >
              Download the extension
            </a>
            <a
              href="#how"
              className="rounded-none border border-input px-6 py-3 text-muted-foreground transition-colors hover:bg-secondary"
            >
              How it works
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground/70">
            open source · {ROE_URL.replace("https://", "")}
          </p>
        </div>
        <div className="relative animate-rise">
          <div className="absolute inset-0 -rotate-2 border border-primary/50 bg-card dot-grid" aria-hidden />
          <img
            src={roeHalftone}
            alt="Halftone artwork of the Roe bird"
            width={1600}
            height={1600}
            className="relative mx-auto w-64 rotate-3 rounded-none md:w-full"
          />
        </div>
      </section>

      {/* Live ticker: what Roe looks for */}
      <div className="overflow-hidden border-y border-border bg-secondary py-3">
        <div className="animate-marquee flex w-max font-mono text-xs tracking-[0.18em] whitespace-nowrap text-secondary-foreground uppercase">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center pr-10" aria-hidden={half === 1}>
              {CATEGORIES.map((c) => (
                <span key={c} className="flex items-center gap-10 pr-10">
                  {c}
                  <span className="text-primary">&#10005;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <RoePlayground />

      {/* Not just visible text */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Eyebrow>Not just visible text</Eyebrow>
          <SectionTitle>Your agent reads more than you do</SectionTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Most tools only look at what's on screen. But text can be styled out of sight, tucked into attributes, or encoded
            in invisible characters. Roe narrows the question to the one that matters: <span className="text-foreground">is this page trying to give my agent orders?</span>
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SIGNALS.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-step={i % 4}
                className="rounded-none border border-border bg-card p-6"
              >
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat table */}
      <section id="threats" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <Eyebrow>Nine families of agent attack</Eyebrow>
        <SectionTitle>Threat category, severity, detection</SectionTitle>
        <div className="mt-10 overflow-hidden rounded-none border border-border">
          {THREATS.map((t, i) => (
            <div
              key={t.name}
              className={cn("grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 md:grid-cols-[16rem_1fr_auto]", i % 2 === 1 && "bg-card")}
            >
              <span className="font-medium">{t.name}</span>
              <span className={`col-span-2 text-sm text-muted-foreground md:col-span-1 ${t.name === "Data exfiltration" ? "border-2 border-primary px-2 py-1" : ""}`}>{t.ex}</span>
              <SevBadge sev={t.sev} />
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Rules cite their source: Morris II, EchoLeak CVE-2025-32711, GitHub MCP issue injection, memory poisoning, Rules File Backdoor.
        </p>
      </section>

      {/* Built for the browser */}
      <section id="how" className="scroll-mt-20 border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Eyebrow>Built for the browser</Eyebrow>
          <SectionTitle>Roe reads the page the way an agent would</SectionTitle>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BROWSER_FEATURES.map((f, i) => (
              <div
                key={f.n}
                data-reveal
                data-step={i % 4}
                className="rounded-none border border-border bg-card p-6"
              >
                <span className="font-display text-3xl text-accent">{f.n}</span>
                <h3 className="mt-2 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works pipeline */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>One click, the whole scan</SectionTitle>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {STEPS.map((s, i) => (
            <li
              key={s}
              data-reveal
              data-step={i % 4}
              className="rounded-none border border-border bg-card p-4"
            >
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <p className="mt-1 text-sm leading-snug">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-4 text-sm md:grid-cols-3">
          <p className="rounded-none bg-card p-4 text-muted-foreground"><span className="text-foreground font-medium">Every page</span> — http, https and file pages, including iframes; aware of email, GitHub, chat, tickets, docs and forums.</p>
          <p className="rounded-none bg-card p-4 text-muted-foreground"><span className="text-foreground font-medium">Images & downloads</span> — up to 12 displayed images re-checked without cookies or referrer; results kept for the last 25 downloads.</p>
          <p className="rounded-none bg-card p-4 text-muted-foreground"><span className="text-foreground font-medium">File scanner</span> — drag in files or a whole folder. Nothing is uploaded.</p>
        </div>
      </section>

      {/* Editions */}
      <section id="editions" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <Eyebrow>Two editions</Eyebrow>
        <SectionTitle>Free for you. Enterprise for your org.</SectionTitle>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {EDITIONS.map((e) => (
            <div
              key={e.name}
              className={cn(
                "rounded-none border bg-card p-7",
                e.featured ? "border-primary/60 ink-shadow-soft" : "border-border",
              )}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl">{e.name}</h3>
                <span className="eyebrow">{e.tag}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {e.rows.map(([row, on]) => (
                  <li key={row as string} className="flex items-start gap-3">
                    <Dot on={on as boolean} />
                    <span className={on ? "" : "text-muted-foreground/70"}>{row}</span>
                  </li>
                ))}
              </ul>
              <a
                href={e.cta.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-7 inline-block rounded-none px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03]",
                  e.featured ? "bg-primary text-primary-foreground" : "border border-input text-muted-foreground hover:bg-secondary",
                )}
              >
                {e.cta.label}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENTERPRISE_FEATURES.map((f, i) => (
            <div
              key={f.t}
              data-reveal
              data-step={i % 4}
              className="rounded-none bg-card p-5"
            >
              <h4 className="font-semibold">{f.t}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{f.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-y border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <Eyebrow>We give a…</Eyebrow>
          <SectionTitle>Questions, one at a time</SectionTitle>
          <div className="mt-10 divide-y divide-border rounded-none border border-border bg-card">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium">
                  {f.q}
                  <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 rounded-none border border-accent/40 bg-accent/10 p-6">
            <h3 className="font-display text-2xl">Honest about limits</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>— Heuristic — novel or translated attacks can slip past.</li>
              <li>— Sees content, not what the agent reads or sends.</li>
              <li>— Text inside images needs OCR, which is not bundled.</li>
              <li>— Removal changes the page only; screenshot agents are unaffected.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Download / Get started */}
      <section id="download" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 text-center">
        <Eyebrow>Get started</Eyebrow>
        <SectionTitle>Ship with Roe</SectionTitle>
        <a
          href={ROE_URL}
          target="_blank"
          rel="noreferrer"
          className="ink-shadow mt-8 inline-block break-all rounded-none bg-primary px-6 py-4 font-mono text-sm font-semibold text-primary-foreground transition-transform hover:-translate-x-1 hover:-translate-y-1 md:text-base"
        >
          {ROE_URL}
        </a>
        <ol className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
          {[
            "Clone the repo and open the extension folder",
            "Open chrome://extensions → Developer mode on",
            "Load unpacked → pick the folder with manifest.json",
            "Click the Roe icon on any page",
          ].map((s, i) => (
            <li key={s} className="rounded-none border border-border bg-card p-4 text-sm">
              <span className="font-mono text-xs text-accent">{i + 1}</span>
              <p className="mt-1">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          For download scanning, open Roe's Details in chrome://extensions and turn on “Allow access to file URLs”.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-none border border-input px-4 py-1.5 font-mono">Free · 0.2</span>
          <span className="rounded-none bg-secondary px-4 py-1.5 font-mono">Enterprise · 0.5.0</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-10 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-xl">roe</p>
            <p className="text-sm text-muted-foreground">Stop hidden prompts before your agent acts on them.</p>
          </div>
          <a href={ROE_URL} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            github.com/WindSecurity/roe
          </a>
          <p className="text-xs text-muted-foreground">© 2026 Windsec Roe · AI agent threat visibility</p>
        </div>
      </footer>
    </div>
  );
}
