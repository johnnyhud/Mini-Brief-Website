/**
 * Shared marketing copy for the home page. Portal URLs come from lib/portal.ts,
 * contact details from lib/brand.ts.
 */
import { PORTAL_GET_STARTED_URL, PORTAL_SIGN_IN_URL } from "../lib/portal.ts";
import type { ShotKey } from "./shots";

export const nav = {
  anchors: [
    { label: "Product", href: "#product" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Security", href: "#security" },
    { label: "FAQ", href: "#faq" },
  ],
  signIn: { label: "Sign in", href: PORTAL_SIGN_IN_URL },
  getStarted: { label: "Get started", href: PORTAL_GET_STARTED_URL },
} as const;

export const hero = {
  eyebrow: "Gmail & Outlook · Now in beta",
  h1: "Less inbox.",
  accent: "More headspace.",
  sub: "Turn Gmail and Outlook into one clear brief. Know what needs you, reply in your own voice, and keep every promise in view.",
  primary: { label: "Get started", href: PORTAL_GET_STARTED_URL },
  secondary: { label: "Try the interactive demo", href: "#interactive-demo" },
} as const;

export const inlineCta = {
  label: "Get started",
} as const;

export const whoItsFor = {
  eyebrow: "Who it's for",
  h2: "Made for work that runs on email.",
  cards: [
    {
      title: "Small professional-services teams",
      body: "Client email is the work. Your morning Brief shows what needs a reply, and the Promise Ledger keeps what you told each client you'd do in view.",
    },
    {
      title: "Brokers",
      body: "Sender Guard checks each message for risk, including look-alike domains, so you can act on a request with more confidence, and the Promise Ledger keeps follow-ups from slipping.",
    },
    {
      title: "Agencies",
      body: "Bring Gmail and Outlook into one brief, get replies drafted for you to review, and keep every client promise in view.",
    },
  ],
} as const;

export const whatItDoes = {
  eyebrow: "What it does",
  h2: "One place to move your day forward.",
  intro: "A clearer view of your email, with the next step already in reach.",
  tabs: ["Your brief", "Draft replies", "Promise Ledger", "Connected inboxes"],
  explore: "Try it in the demo",
  blocks: [
    {
      title: "One brief, not a pile.",
      body: "Open MiniBrief and get one ranked brief: what needs a reply, what's waiting on someone else, and what can wait. Long threads come with the key points and the next step already pulled out.",
      shot: "brief" satisfies ShotKey,
    },
    {
      title: "Replies, drafted.",
      body: "Approve, decline, follow up, or schedule. Choose your intent and MiniBrief drafts the reply for you to review. Turn on voice matching and it learns from your own sent mail.",
      shot: "reply" satisfies ShotKey,
    },
    {
      title: "Promise Ledger.",
      body: "MiniBrief spots commitments in both directions: what you told a client you'd do, and what they said they'd send you. It keeps the list so nothing slips because a thread went quiet.",
      shot: "promises" satisfies ShotKey,
    },
    {
      title: "Every inbox, one place.",
      body: "Connect Gmail and Outlook side by side, more than one of each if you like, and get one brief across all of them.",
      shot: "inboxes" satisfies ShotKey,
    },
  ],
  closing:
    "Also included: catch-up reports after time away, VIP alerts when someone important goes quiet, meeting prep from your calendar, a tone check before you send, and one-click unsubscribe.",
} as const;

export const privacy = {
  id: "privacy",
  eyebrow: "Private by design",
  h2: "Message bodies are not stored on our servers.",
  lines: [
    "Our server reads the mailboxes you connect, keeps a rolling 90 days of subjects, senders and previews, and never keeps a message body.",
    "AI requests go to one named provider, Anthropic, and Anthropic's terms forbid training on your data.",
    "No analytics, no telemetry, no tracking.",
    "Disconnect a mailbox and everything read from it is deleted at once; delete your account and everything goes.",
  ],
  link: { label: "How it's built", href: "/security" },
} as const;

/**
 * Every control here is documented on /security or in the evidence pack
 * for cloud.minibrief.app; the source is noted per item.
 */
export const security = {
  id: "security",
  eyebrow: "Security",
  h2: "Secure by construction.",
  intro: "These are not policies we promise to follow. They are how MiniBrief is built.",
  groups: [
    {
      title: "Protection in your inbox",
      items: [
        {
          title: "A risk verdict on every message.",
          body: "Sender Guard judges each incoming message against a baseline built from your own mail: who writes to you, how often, and whether their mail passes authentication. A tier, the reasons and the evidence, and you can overturn any verdict.",
          // security plan S0/S1 (shipped 2026-09-22); PRIVACY.md "What we store about your mail"
        },
        {
          title: "Look-alike domains, caught on arrival.",
          body: "A sender imitating a domain you correspond with is called out, and MiniBrief watches about 150 look-alikes of your own domain so mail from one that gets registered is high risk from its first message.",
          // security plan S4 (shipped, DNS-only)
        },
        {
          title: "Links and attachments checked first.",
          body: "For the messages a phish arrives as, links and attachments are judged on the server before you open the mail, and a high-risk finding is pushed to your browser within minutes.",
          // security plan S1 (shipped)
        },
        {
          title: "A guard on Send.",
          body: "A look-alike of a domain you write to, or bank details and credentials headed to an outside address, stop a send until you confirm. A normal reply adds no step.",
          // security plan S3 (shipped)
        },
        {
          title: "A mailbox audit every six hours.",
          body: "Filters that forward, delete or hide your mail are the classic sign of a compromised account. MiniBrief finds them in Gmail, tells you, and removes a bad one with one click.",
          // security plan S2 (shipped, Gmail-first)
        },
        {
          title: "Your domain's posture.",
          body: "SPF, DKIM, DMARC and MTA-STS for your own domain, checked weekly straight from DNS, with the record to add for each gap where there is one.",
          // security plan S4 (shipped)
        },
      ],
    },
    {
      title: "Under the hood",
      items: [
        {
          title: "Message bodies are not stored.",
          body: "Our server keeps a rolling 90 days of subjects, senders and previews so your brief is ready when you open it. A message's body is fetched from your mailbox only when you open it, and is not kept.",
          // PRIVACY.md "The short version", "How long we keep it"
        },
        {
          title: "A subject line and about 120 characters, by default.",
          body: "That is all sorting sends to the AI. Full message text goes out only for the features you use on a message you opened, capped in length.",
          // PRIVACY.md "AI features"
        },
        {
          title: "The AI sees only what a feature needs.",
          body: "Both the web app and the background worker call Anthropic, scoped to the feature: a subject and short preview for sorting, and the opened message for features you use. Anthropic's terms forbid training on your data.",
          // PRIVACY.md "AI features"
        },
        {
          title: "Mailbox grants are sealed at rest.",
          body: "The OAuth grant that connects Gmail or Outlook is encrypted with AES-256-GCM before it is written, under a key that never lives in the database, and your browser never receives it.",
          // PRIVACY.md "The permission"
        },
        {
          title: "Sign-in built to resist brute force.",
          body: "Passwords are at least 12 characters, checked against leaked-password lists, and stored only as bcrypt hashes by our auth provider. Two-factor authentication is a switch away. Sign-in and code entry are rate-limited.",
          // portal MfaSection
        },
        {
          title: "Short-lived access tokens.",
          body: "Access tokens expire after an hour and refresh tokens rotate; signing out revokes every session and wipes the local cache. Session cookies are HttpOnly, Secure, and SameSite.",
          // session and token handling
        },
        {
          title: "Every row is guarded in the database.",
          body: "Access control runs as PostgreSQL row-level security on every table, below the API, so the database itself decides what each signed-in user can see. No staff tool reads mail rows.",
          // PRIVACY.md "Who can read it"
        },
        {
          title: "Card details never touch us.",
          body: "Card details are entered on Stripe's own checkout page, a PCI-DSS Level 1 provider, and never reach MiniBrief.",
          // /security "Payments"
        },
      ],
    },
  ],
  alsoLead: "Also:",
  also: [
    "TLS 1.2 or better on every connection",
    "A Content Security Policy that forbids embedding MiniBrief in another site",
    "Only the OAuth scopes a feature needs, with access you can revoke at any time",
    "Dependencies audited for known vulnerabilities",
    "Secrets kept in a secrets store, never in the app",
    "Auto-quarantine of high-risk mail, if you switch it on",
  ],
  // security plan S1 (auto-quarantine opt-in)
  link: { label: "Read the full Security page", href: "/security" },
} as const;

export const different = {
  eyebrow: "Why MiniBrief",
} as const;

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "How it works",
  h2: "Up and running in a few minutes.",
  steps: [
    {
      title: "Create your account",
      body: "Sign up with your email. Every account starts with a trial.",
    },
    {
      title: "Connect Gmail or Outlook",
      body: "Sign in with Google or Microsoft. Work or school Outlook accounts usually need a one-time approval from a Microsoft 365 admin.",
    },
    {
      title: "Open your brief",
      body: "MiniBrief reads your inbox and hands you the first brief. Come back each morning, or whenever you need to know where things stand.",
    },
  ],
} as const;

// The FAQ lives in ./faq.ts so tests can import it without the "@/" alias.
export { faq, type FaqItem } from "./faq.ts";

export const cta = {
  h2: "Make room for the work that matters.",
  body: "MiniBrief is in beta for Gmail and Outlook. Create an account, connect a mailbox, and your first brief is minutes away.",
  primary: { label: "Get started", href: PORTAL_GET_STARTED_URL },
} as const;

export const footer = {
  tagline: "Email for Gmail and Outlook, private by design. Message bodies are not stored on our servers.",
  product: {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "How it works, step by step", href: "/how-it-works" },
      { label: "Why MiniBrief", href: "/why-minibrief" },
      { label: "Guides", href: "/guides" },
      { label: "Changelog", href: "/changelog" },
      { label: "Sign in", href: PORTAL_SIGN_IN_URL },
      { label: "Get started", href: PORTAL_GET_STARTED_URL },
    ],
  },
  whoItsFor: {
    heading: "Who it's for",
    links: [
      { label: "Real estate agents", href: "/for/real-estate-agents" },
      { label: "Agencies and consultancies", href: "/for/agencies-and-consultancies" },
      { label: "Trades and local services", href: "/for/trades-and-local-services" },
    ],
  },
  legal: {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Security", href: "/security" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  contact: { heading: "Contact", linkedInLabel: "LinkedIn" },
  copyright: "© 2026 MiniBrief",
} as const;

export const metadata = {
  title: "MiniBrief — Your Gmail and Outlook, in one brief",
  description:
    "MiniBrief reads your Gmail and Outlook, flags what needs a reply, drafts it, and tracks what you promised. Message bodies are not stored on our servers. Now in beta.",
} as const;

export interface DemoVideoConfig {
  enabled: boolean;
  /** Self-hosted URLs. */
  webm: string;
  mp4: string;
  /** A local file. */
  poster: string;
}

export const demoVideo: DemoVideoConfig = { enabled: false, webm: "", mp4: "", poster: "" };
