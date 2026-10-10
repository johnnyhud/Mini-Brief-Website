import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "morning-brief-email",
  title: "What's in the morning brief email and how to tune it",
  description:
    "The morning brief email leads with Needs you today and pins your Never miss senders first. Here is how to switch it on or off, change the delivery time, days and time zone, and add Never miss senders.",
  date: "2026-10-10",
  body: [
    {
      type: "p",
      text: "The morning brief email puts your day's priorities in your inbox before you open anything else. It is on by default for new accounts, delivered at 7:00 in your local time. This guide covers what is in it and how to adjust it.",
    },
    { type: "h2", text: "What's in the email" },
    {
      type: "p",
      text: "The email leads with \"Needs you today\", which shows the top 3 items. Senders on your Never miss list are pinned first, so the people you cannot afford to miss are at the top.",
    },
    { type: "h2", text: "Step 1: Tune delivery in Settings" },
    {
      type: "ol",
      items: [
        "Open Settings and choose Notifications.",
        "Use the \"Morning briefing by email\" switch to turn the email on or off.",
        "Set Delivery time to the hour you want it to arrive.",
        "Set Time zone. A \"Use <your zone>\" shortcut fills in your current zone for you.",
        "Use Delivery days to choose which days of the week you get it.",
      ],
    },
    { type: "h2", text: "Step 2: Add Never miss senders" },
    {
      type: "ol",
      items: [
        "Open Settings and choose Never miss, under Email intelligence.",
        "Add an email address, or a company domain.",
        "To undo, choose Remove next to the entry.",
      ],
    },
    {
      type: "p",
      text: "Personal email domains such as gmail.com cannot be added as a domain. Add the individual email address instead.",
    },
    { type: "h2", text: "A simple setup" },
    {
      type: "ul",
      items: [
        "Add your most important clients and your manager to Never miss.",
        "Set Delivery time to just before you start work.",
        "Use Delivery days to skip the days you do not work.",
      ],
    },
    { type: "h2", text: "A note on privacy" },
    {
      type: "p",
      text: "Message bodies are not stored on our servers. For the details of what MiniBrief reads and keeps, see the Security page at /security.",
    },
  ],
  faq: [
    {
      q: "Is the morning brief email on by default?",
      a: "Yes, for new accounts, at 7:00 local time. Turn it off with the Morning briefing by email switch under Settings, in Notifications.",
    },
    {
      q: "What does the email lead with?",
      a: "Needs you today, which shows the top 3 items. Senders on your Never miss list are pinned first.",
    },
    {
      q: "Can I add a whole company to Never miss?",
      a: "Yes, add a company domain under Settings, in Never miss. Personal email domains such as gmail.com cannot be added as a domain, so add those addresses one by one.",
    },
  ],
};
