import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "open-loops-sync",
  title: "How your open loops stay in sync across devices",
  description:
    "What syncs between your devices in Open Loops (done status, snooze and due dates you set), what does not (the promise text), and how to use the I owe and Owed to me columns and Snooze.",
  date: "2026-10-10",
  body: [
    {
      type: "p",
      text: "If you check Open Loops on a laptop in the morning and on a phone later, you want the same picture on both. This guide covers what carries across your devices and what does not.",
    },
    { type: "h2", text: "What syncs" },
    {
      type: "p",
      text: "Three things you set in Open Loops sync across your devices:",
    },
    {
      type: "ul",
      items: [
        "Done status: mark a loop done on one device and it is done on the others.",
        "Snooze: a snoozed loop is hidden on your other devices too.",
        "Due dates you set: a date you add to a loop follows you.",
      ],
    },
    { type: "h2", text: "What does not sync" },
    {
      type: "p",
      text: "Only status and dates sync. The text of a promise never does.",
    },
    { type: "h2", text: "Step 1: Open your Open Loops" },
    {
      type: "ol",
      items: [
        "Open MiniBrief and go to Open Loops.",
        "Use the layout toggle, labelled \"Sections\" and \"Promise Ledger\", to pick how loops are laid out.",
        "Choose Promise Ledger to see two columns: \"I owe\" and \"Owed to me\".",
      ],
    },
    {
      type: "p",
      text: "\"I owe\" holds what you told someone you would do. \"Owed to me\" holds what someone else said they would do for you.",
    },
    { type: "h2", text: "Step 2: Snooze a loop" },
    {
      type: "p",
      text: "If a loop is not for today, choose Snooze on it. Snooze hides the item for 3 days, and it comes back on its own. Because snooze syncs, you do not need to snooze it again on another device.",
    },
    { type: "h2", text: "A simple routine across devices" },
    {
      type: "ol",
      items: [
        "Open Open Loops and look at \"I owe\" first.",
        "Mark finished items done, and snooze the ones that can wait.",
        "Check \"Owed to me\" for anything you are still waiting on.",
        "Open Open Loops on another device later and the same done and snoozed items are there.",
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
      q: "What syncs between my devices in Open Loops?",
      a: "Done status, snooze and due dates you set. That is status and dates only.",
    },
    {
      q: "Does the text of a promise sync?",
      a: "No. Only status and dates sync, never the promise text.",
    },
    {
      q: "How long does Snooze hide a loop?",
      a: "Snooze hides an item for 3 days, and it comes back on its own.",
    },
  ],
  related: ["see-what-you-promised-in-email", "one-daily-brief-for-gmail-and-outlook"],
};
