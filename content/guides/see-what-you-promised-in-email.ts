import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "see-what-you-promised-in-email",
  title: "How to see what you promised in email",
  description:
    "Find the replies you owe and the answers you are waiting on, with Open Loops and the Promise Ledger in MiniBrief. You review every draft; nothing is sent without you.",
  date: "2026-10-09",
  body: [
    {
      type: "p",
      text: "You said you would send the proposal on Friday. A client said they would send over the signed form. Both promises live in email threads, and a few days later both threads are buried under newer mail. Nobody forgets on purpose. The promise just stops being visible.",
    },
    {
      type: "p",
      text: "This guide shows how to keep those promises in view with MiniBrief, in both directions: what you owe other people, and what other people owe you.",
    },
    { type: "h2", text: "Why promises slip in email" },
    {
      type: "p",
      text: "An inbox is sorted by time, not by commitment. A message from last Tuesday that says \"I'll get back to you by Thursday\" looks exactly like any other old message. Searching for it only works if you remember it exists.",
    },
    {
      type: "p",
      text: "A simple habit helps even without any tool: at the end of each day, scan your sent mail for sentences that start with \"I will\", \"I'll\" or \"we can\". Write each one down with a date. MiniBrief does the same job for you, continuously, across your connected mailboxes.",
    },
    { type: "h2", text: "Step 1: Open your Open Loops" },
    {
      type: "p",
      text: "Open Loops is the place in MiniBrief where follow-ups are tracked. It covers two directions at once: what you owe, and what others owe you. Anything that is overdue comes first, so the thing most likely to have slipped is the first thing you see.",
    },
    {
      type: "ol",
      items: [
        "Open MiniBrief and go to Open Loops.",
        "Look at the top of the list first. Overdue items are listed before everything else.",
        "Read each item against its thread. The point is to decide, quickly, whether it still needs action.",
      ],
    },
    { type: "h2", text: "Step 2: Read the Promise Ledger" },
    {
      type: "p",
      text: "The Promise Ledger lays your commitments out in two columns. \"I owe\" holds what you told someone you would do. \"Owed to me\" holds what someone else said they would send or do for you. Seeing both side by side makes it easy to spot a week where you are carrying much more than you are waiting on, or the reverse.",
    },
    {
      type: "p",
      text: "Each item in the ledger can be marked Done once it is dealt with, or snoozed if it is not the right moment. Snooze is kept on the device you are using, so a snoozed item on one computer is not snoozed on another.",
    },
    {
      type: "ul",
      items: [
        "Done: the promise has been kept, or the thing you were waiting for has arrived. It leaves the active list.",
        "Snooze: you know about it and want it out of the way for now. It comes back later, on this device.",
      ],
    },
    { type: "h2", text: "Step 3: Check who is waiting on your reply" },
    {
      type: "p",
      text: "Not every owed reply is a formal promise. Sometimes a person simply wrote to you and is waiting. MiniBrief shows who is waiting on your reply, so a polite question from a client does not sit unanswered because it was not phrased as a deadline.",
    },
    {
      type: "p",
      text: "Open the same view each morning. The daily habit is more useful than any single clean-up.",
    },
    { type: "h2", text: "Step 4: Draft the reply, the delivery or the chase" },
    {
      type: "p",
      text: "Seeing a promise is half the work. The other half is doing something about it. From an open loop, MiniBrief's drafting agent can prepare one of three things for you:",
    },
    {
      type: "ul",
      items: [
        "A reply, when someone is waiting on you.",
        "A delivery, when you owe something and are ready to send it.",
        "A chase, when someone owes you something and the date has passed.",
      ],
    },
    {
      type: "p",
      text: "Drafts are written in your style, so they read like you wrote them. Read the draft, change what you want, and send it only if you are happy with it.",
    },
    {
      type: "p",
      text: "You review every draft. Nothing is sent without you.",
    },
    { type: "h2", text: "A simple daily routine" },
    {
      type: "ol",
      items: [
        "Open Loops first thing, and clear anything overdue.",
        "Glance at the Promise Ledger. Mark Done what is done and snooze what is not for today.",
        "Check who is waiting on your reply and answer the quick ones straight away.",
        "Use the drafting agent for the rest, review each draft, and send the ones you approve.",
      ],
    },
    {
      type: "p",
      text: "Five minutes at the start of the day is usually enough to know where you stand.",
    },
    { type: "h2", text: "A note on privacy" },
    {
      type: "p",
      text: "Message bodies are not stored on our servers. For the full picture of what MiniBrief reads and keeps, see the Security page at /security.",
    },
  ],
  faq: [
    {
      q: "Does MiniBrief show promises from both directions?",
      a: "Yes. Open Loops tracks what you owe and what others owe you, with overdue items first, and the Promise Ledger lays them out as I owe and Owed to me.",
    },
    {
      q: "Does MiniBrief send replies for me?",
      a: "No. The drafting agent prepares a reply, delivery or chase in your style, but you review every draft and nothing is sent without you.",
    },
    {
      q: "Is snooze shared between my devices?",
      a: "No. Snooze applies on the device you are using.",
    },
  ],
};
