import type { Segment } from "../../lib/segments.ts";

export const segment: Segment = {
  slug: "trades-and-local-services",
  name: "Trades and local services",
  title: "MiniBrief for trades and local services",
  description:
    "Keep quote requests from getting buried, reply with drafts you approve, and see who is waiting on you. One brief across Gmail and Outlook, in any modern browser.",
  intro:
    "When the inbox is also your job board, a quote request buried under newer mail is lost work. MiniBrief puts what needs a reply at the top of your brief.",
  pains: [
    {
      pain: "Quote requests buried in the inbox",
      body: "The morning brief email leads with \"Needs you today\", and the people you can't miss go in Never miss so they're pinned to the top of your brief. If MiniBrief puts an email in the wrong place, correct it in one tap and it learns that sender for next time.",
    },
    {
      pain: "Replying fast, from wherever you are",
      body: "MiniBrief is a web app, so there is nothing to install and it opens in any modern browser. It drafts replies for you to review, and you can add an optional \"Include…\" line to steer a draft. Nothing is sent until you press Send. If a draft needs a detail it couldn't know, it leaves a [[fill: …]] marker and won't send until you fill it in.",
    },
    {
      pain: "Knowing who's waiting on you",
      body: "MiniBrief shows who is waiting on your reply, and lists the promises you made in Open Loops as \"I owe\", with what others owe you as \"Owed to me\". Snooze a loop that can wait.",
    },
  ],
  guides: ["morning-brief-email", "see-what-you-promised-in-email", "one-daily-brief-for-gmail-and-outlook"],
};
