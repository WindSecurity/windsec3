/**
 * Blog content. To add a post, append an entry to POSTS; the /blogs list and
 * /blogs/$slug pages pick it up automatically. Use **double asterisks** for bold.
 */

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "pull"; text: string }
  | { type: "note"; text: string }
  | { type: "refs"; items: { label: string; href: string }[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  readMinutes: number;
  tags: string[];
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "untrusted-web-content-and-ai-agents-going-rogue",
    title: "Untrusted web content and AI agents going rogue",
    description:
      "How indirect prompt injection turns ordinary pages, emails and documents into instructions an AI agent obeys, and the controls that reduce the risk.",
    author: "WindSec Research",
    date: "2026-10-25",
    readMinutes: 5,
    tags: ["AI Security", "Browser Security", "Prompt Injection"],
    blocks: [
      { type: "h2", text: "What is untrusted web content?" },
      {
        type: "p",
        text: "AI agents can browse websites, read emails, analyze documents, and interact with applications to complete tasks automatically. However, the content they process is not always trustworthy.",
      },
      {
        type: "p",
        text: "Attackers can place malicious instructions inside webpages, emails, documents, code repositories, and other external sources. When an AI agent interprets these instructions as part of its task, it may behave in ways the user never intended.",
      },
      {
        type: "p",
        text: "This is known as **indirect prompt injection**. Instead of directly attacking the AI system, an attacker hides instructions in content that the agent later reads.",
      },

      { type: "h2", text: "What sources can make AI agents vulnerable?" },
      {
        type: "p",
        text: "AI agents often rely on external information to make decisions. Common untrusted sources include:",
      },
      {
        type: "ul",
        items: [
          "**Websites:** Hidden or visible instructions embedded in webpage content.",
          "**Emails:** Malicious messages that attempt to influence an agent handling an inbox.",
          "**Documents and PDFs:** Instructions hidden in reports, invoices, or uploaded files.",
          "**Code repositories:** Untrusted README files, comments, issues, and project documentation.",
          "**APIs and tool outputs:** External responses containing instructions that an agent was not meant to follow.",
          "**Images and multimedia:** Content that may contain instructions interpreted through OCR or other AI processing.",
        ],
      },
      {
        type: "p",
        text: "The problem is not that all external content is malicious. The risk arises when an agent treats untrusted data as instructions it should obey.",
      },

      { type: "h2", text: "How does an AI agent go rogue?" },
      { type: "p", text: "A typical indirect prompt injection attack follows four steps:" },
      {
        type: "steps",
        items: [
          "**Malicious content is introduced:** An attacker places instructions in a webpage, document, email, or another external source.",
          "**The agent reads the content:** The AI processes the source while completing a legitimate user request.",
          "**The agent is manipulated:** The malicious instructions influence its reasoning or intended actions.",
          "**An unsafe action occurs:** Depending on the agent's permissions and safeguards, it may disclose information, invoke an unintended tool, or perform an unauthorized operation.",
        ],
      },
      {
        type: "p",
        text: "For example, a user asks an AI browser agent to summarize a webpage. The page contains hidden instructions telling the agent to search for confidential information and send it elsewhere.",
      },
      {
        type: "p",
        text: "If the agent follows those instructions and has access to sensitive data or messaging tools, a simple browsing task could become a security incident.",
      },
      {
        type: "callout",
        text: "**The key risk is the combination of untrusted instructions, excessive permissions, and insufficient action controls.**",
      },

      { type: "h2", text: "Why traditional security tools may miss it" },
      {
        type: "p",
        text: "Traditional security tools are designed to detect specific threats, such as malware, known vulnerabilities, suspicious network activity, or malicious files.",
      },
      {
        type: "p",
        text: "Prompt injection presents a different challenge. A webpage may contain no malware and still manipulate an AI agent through natural-language instructions.",
      },
      { type: "p", text: "For example:" },
      {
        type: "ul",
        items: [
          "A browser security tool may consider a website safe because it has no known malicious indicators.",
          "A content scanner may detect suspicious wording without knowing whether an agent will act on it.",
          "An AI agent may recognize an instruction as suspicious but still have access to sensitive tools.",
          "A logging system may record an action after it has already happened.",
        ],
      },
      { type: "p", text: "These controls serve different purposes:" },
      {
        type: "ul",
        items: [
          "**Content detection** identifies potentially malicious instructions.",
          "**Source-to-sink analysis** investigates whether untrusted content could influence sensitive operations.",
          "**Action enforcement** restricts or blocks unauthorized operations.",
          "**Audit logging** records supported actions and policy decisions for investigation.",
        ],
      },
      {
        type: "p",
        text: "Effective AI security requires more than identifying suspicious text. It also requires controlling what an agent can do with that information.",
      },

      { type: "h2", text: "How organizations can reduce the risk" },
      {
        type: "p",
        text: "Organizations can reduce prompt injection risks through several practical controls.",
      },
      {
        type: "ul",
        items: [
          "**Treat external content as untrusted:** Do not automatically promote webpage text, emails, or tool outputs into trusted instructions.",
          "**Apply least privilege:** Give agents access only to the information and tools required for their tasks.",
          "**Control sensitive actions:** Require explicit authorization before high-risk operations, such as sending confidential files or changing account settings.",
          "**Separate data from instructions:** Design agent workflows to distinguish user-approved tasks from instructions found in external content.",
          "**Monitor agent activity:** Record supported tool calls, policy decisions, and blocked actions.",
          "**Test against attack scenarios:** Evaluate agents using malicious webpages, documents, and other realistic prompt injection examples.",
        ],
      },
      {
        type: "p",
        text: "No single technique can guarantee complete protection. Detection, permissions, enforcement, and continuous testing should work together.",
      },

      { type: "h2", text: "Untrusted content and the future of AI security" },
      {
        type: "p",
        text: "As AI agents gain access to browsers, business applications, files, and external tools, their security depends on more than the model itself.",
      },
      {
        type: "p",
        text: "Every webpage, document, email, and tool response can become a potential source of untrusted instructions. Organizations need to understand where those instructions originate, what actions they could influence, and which controls can prevent unwanted behavior.",
      },
      {
        type: "p",
        text: "Protecting AI agents means securing both the information they consume and the actions they perform.",
      },

      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Untrusted web content can turn an ordinary AI-assisted task into a security risk when malicious instructions influence an agent's behavior.",
      },
      {
        type: "p",
        text: "Organizations should combine prompt injection detection, least-privilege access, action authorization, and activity monitoring to reduce this risk.",
      },
      {
        type: "pull",
        text: "AI agents should follow the user's **intent**, not instructions secretly embedded in the content they read.",
      },

      { type: "h2", text: "References" },
      {
        type: "refs",
        items: [
          {
            label: "OWASP GenAI Security Project, Prompt Injection",
            href: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
          },
          {
            label: "Microsoft Security, Prompt Injection",
            href: "https://learn.microsoft.com/en-us/security/zero-trust/catalog-ai-attack-techniques/prompt-injection",
          },
          {
            label: "NIST, Strengthening AI Agent Hijacking Evaluations",
            href: "https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations",
          },
        ],
      },
      {
        type: "note",
        text: "Prompt injection does not automatically mean an AI agent has been compromised. The outcome depends on the agent's design, permissions, safeguards, and whether an unsafe action is actually performed.",
      },
    ],
  },
];

export const getPost = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug);

export const formatPostDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
