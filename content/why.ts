/**
 * Copy for /why-minibrief. Wording is fixed (issue #9) and John approves any
 * change. Shipped features only; no prices; storage wording reused from home.ts.
 */
import { cta, privacy } from "./home";

export const whyMetadata = {
  title: "Why not just use Gemini or Copilot?",
  description:
    "Gemini and Copilot are useful AI helpers inside Gmail and Outlook. MiniBrief does a different job: one daily brief across all your mailboxes.",
} as const;

export const why = {
  h1: "Why not just use Gemini or Copilot?",
  intro:
    "Gemini in Gmail and Microsoft 365 Copilot in Outlook are useful assistants. Each one works inside its own email app, helping you with the message or thread in front of you. MiniBrief does a different job: it looks across your mailboxes and tells you what needs you today.",
  sections: [
    {
      title: "One brief across Gmail and Outlook",
      body: "If you use both a Gmail and an Outlook account, MiniBrief puts them in one ranked brief, so you don't have to check two places to know what matters.",
    },
    {
      title: "Built around who's waiting on you",
      body: "MiniBrief keeps track of the threads where someone is waiting on your reply, and the ones where you're waiting on someone else, so follow-ups don't slip.",
    },
    {
      title: "A second look at risky email",
      body: "MiniBrief flags messages that look like phishing, so you can stop and check before you click or reply.",
    },
    {
      title: "Drafts that sound like you",
      body: "When you want to reply, MiniBrief drafts it in your own style. You review every draft. Nothing is sent without you.",
    },
    {
      title: "Keep the email app you have",
      body: "You keep using Gmail or Outlook as you do today. MiniBrief works alongside them.",
      /** The site's existing storage sentence, verbatim. */
      note: privacy.h2,
    },
  ],
  closing:
    "Many people use both: their email app's assistant for the message in front of them, and MiniBrief for the day ahead.",
  cta: cta.primary,
} as const;
