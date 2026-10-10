import type { Segment } from "../../lib/segments.ts";

export const segment: Segment = {
  slug: "real-estate-agents",
  name: "Real estate agents",
  title: "MiniBrief for real estate agents",
  description:
    "One brief across Gmail and Outlook for agents with many client threads at once: what needs you today, the deadlines you promised, and a guard on Send.",
  intro:
    "Client threads, agent threads and deadlines promised in email all share one inbox. MiniBrief builds one brief across every mailbox you connect and keeps the important parts in view.",
  pains: [
    {
      pain: "Many client and agent threads at once",
      body: "Connect Gmail and Outlook side by side and get one brief across every mailbox. The morning brief email leads with \"Needs you today\", and the people you can't miss go in Never miss so they're pinned to the top. If MiniBrief puts an email in the wrong place, correct it in one tap and it learns that sender for next time.",
    },
    {
      pain: "Deadlines you promised in email",
      body: "MiniBrief finds promises in your email, both ways, and lists them in Open Loops as \"I owe\" and \"Owed to me\". Snooze a loop that can wait. Done, snooze and due dates sync across your devices.",
    },
    {
      pain: "Look-alike domains and changed bank details",
      body: "Each incoming message gets a risk rating with reasons, and links and attachments are checked before you open the message. When you send, a guard stops a look-alike of a domain you write to, or bank details and credentials headed to an outside address, until you confirm. It is a second pair of eyes, not a guarantee.",
    },
    {
      pain: "Replies that take longer than they should",
      body: "MiniBrief drafts replies for you to review, and you can add an optional \"Include…\" line to steer a draft. Nothing is sent until you press Send. If a draft needs a detail it couldn't know, it leaves a [[fill: …]] marker and won't send until you fill it in.",
    },
  ],
  guides: ["see-what-you-promised-in-email", "spot-phishing-in-gmail-and-outlook", "morning-brief-email"],
};
