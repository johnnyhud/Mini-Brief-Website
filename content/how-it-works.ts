/**
 * Copy for /how-it-works. Shipped features only; wording reused from the home
 * FAQ, the guides and /security. No prices, no trial wording, no verification
 * claims. The only storage line is "Email bodies aren't stored."
 * Relative imports so the node:test suite can load this file.
 */
import { PORTAL_GET_STARTED_URL } from "../lib/portal.ts";

export const howItWorksMetadata = {
  title: "How MiniBrief works, step by step",
  description:
    "From sign-up to your morning brief: connect Gmail and Outlook, triage that learns, drafts you approve, Open Loops and security checks.",
} as const;

export interface HowItWorksStep {
  title: string;
  body: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

export const howItWorksPage = {
  h1: "How MiniBrief works",
  intro:
    "Seven steps from sign-up to a brief you can act on. Each one is something MiniBrief does today.",
  steps: [
    {
      title: "Sign up",
      body: "Create an account with your email. Signing up connects nothing; connecting a mailbox is the next step.",
      links: [{ label: "Get started", href: PORTAL_GET_STARTED_URL }],
    },
    {
      title: "Connect Gmail and Outlook",
      body: "Connect Gmail and Outlook side by side, more than one of each if you like, and get one brief across every mailbox you connect. Some work Microsoft 365 accounts need an administrator to approve MiniBrief, and MiniBrief gives you a ready-to-send message for your IT admin.",
      links: [{ label: "Connecting Outlook when your IT admin must approve", href: "/guides/outlook-admin-approval" }],
    },
    {
      title: "Your morning brief",
      body: "The morning brief email leads with \"Needs you today\", and your Never miss senders are pinned first. In Settings you choose whether to get the email, the delivery time, the days and the time zone.",
      links: [{ label: "What's in the morning brief email and how to tune it", href: "/guides/morning-brief-email" }],
    },
    {
      title: "Triage that learns",
      body: "If MiniBrief puts an email in the wrong place, correct it in one tap and it learns that sender for next time. You can see and undo what it learned in Settings.",
      links: [],
    },
    {
      title: "Drafts you approve",
      body: "MiniBrief drafts replies for you to review, and you can add an optional \"Include…\" line to steer a draft. Nothing is sent until you press Send. If a draft needs a detail it couldn't know, it leaves a [[fill: …]] marker and won't send until you fill it in.",
      links: [],
    },
    {
      title: "Open Loops",
      body: "MiniBrief finds promises in your email, both ways, and lists them in Open Loops as \"I owe\" and \"Owed to me\". Snooze a loop that can wait. Done, snooze and due dates sync across your devices.",
      links: [{ label: "How your open loops stay in sync across devices", href: "/guides/open-loops-sync" }],
    },
    {
      title: "Security checks",
      body: "Each incoming message gets a risk rating with reasons, and links and attachments are checked before you open the message. When you send, a guard stops a look-alike of a domain you write to, or bank details and credentials headed to an outside address, until you confirm.",
      links: [
        { label: "Read the full Security page", href: "/security" },
        { label: "How to spot phishing in Gmail and Outlook", href: "/guides/spot-phishing-in-gmail-and-outlook" },
      ],
    },
  ] satisfies readonly HowItWorksStep[],
  closing: "Email bodies aren't stored.",
  closingLink: { label: "How it's built", href: "/security" },
  cta: { label: "Get started", href: PORTAL_GET_STARTED_URL },
} as const;
