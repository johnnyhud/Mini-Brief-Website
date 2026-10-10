import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "one-daily-brief-for-gmail-and-outlook",
  title: "One daily brief for Gmail and Outlook",
  description:
    "Connect a Gmail and an Outlook mailbox to MiniBrief and get one ranked brief across both, a daily brief email, and Ask Your Inbox, while you keep using your email app as you do today.",
  date: "2026-10-09",
  body: [
    {
      type: "p",
      text: "Plenty of people work across more than one mailbox: a Gmail account for one part of the job, an Outlook account for another. Checking each in turn means a lot of switching, and the important message is easy to miss in whichever one you opened second.",
    },
    {
      type: "p",
      text: "This guide shows how to connect both to MiniBrief and read one brief that covers them.",
    },
    { type: "h2", text: "Step 1: Connect your Gmail mailbox" },
    {
      type: "ol",
      items: [
        "Create your MiniBrief account and sign in.",
        "Go to Settings and open Mailboxes.",
        "Choose Connect Gmail and sign in with Google at Google's own consent screen.",
        "Approve access. MiniBrief asks only for what its features need.",
      ],
    },
    { type: "h2", text: "Step 2: Connect your Outlook mailbox" },
    {
      type: "p",
      text: "Repeat the same steps and choose Connect Outlook this time, signing in with Microsoft. If your Outlook account is a work or school account, connecting usually needs a one-time approval from your Microsoft 365 administrator. That is a Microsoft policy, and it is a one-off step. For what to send your admin, see the guide at /guides/outlook-admin-approval.",
    },
    {
      type: "p",
      text: "You can connect more than one of each if you like. Gmail and Outlook sit side by side.",
    },
    { type: "h2", text: "Step 3: Read the ranked brief" },
    {
      type: "p",
      text: "Once a mailbox is connected, MiniBrief reads it and builds your brief. The brief is ranked across all your connected mailboxes at once, not one mailbox at a time. It shows what needs a reply, what is waiting on someone else, and what can wait. Long threads come with the key points and the next step already pulled out.",
    },
    {
      type: "p",
      text: "The practical effect is that you open one place, read from the top, and know where your day starts.",
    },
    { type: "h2", text: "Step 4: Get the daily brief by email" },
    {
      type: "p",
      text: "You do not have to open MiniBrief first to see your brief. You can switch on Morning briefing by email under Settings, in Notifications, so the brief is waiting in your inbox in the morning. Read it over coffee, then open MiniBrief when something needs action. To change the hour, days or time zone, see the guide at /guides/morning-brief-email.",
    },
    { type: "h2", text: "Step 5: Ask Your Inbox" },
    {
      type: "p",
      text: "Sometimes you do not want the ranked list. You want one answer: what did a client say about the deadline, or which message had the invoice. Ask Your Inbox lets you type that question and get an answer from your mail.",
    },
    {
      type: "ul",
      items: [
        "What did a client say about the deadline?",
        "Which messages are waiting on me this week?",
        "Did anyone send an updated invoice?",
      ],
    },
    {
      type: "p",
      text: "Phrase the question the way you would ask a colleague. Check anything important against the original message before you rely on it.",
    },
    { type: "h2", text: "Keep using your email app" },
    {
      type: "p",
      text: "Connecting a mailbox to MiniBrief does not mean giving up Gmail or Outlook. Keep using your email app as you do today. MiniBrief sits alongside it, as a clearer view of the same mail, and the brief is where you start rather than where you have to stay.",
    },
    { type: "h2", text: "A simple morning routine" },
    {
      type: "ol",
      items: [
        "Read the daily brief email, or open the brief in MiniBrief.",
        "Start with the top-ranked items, which come from both mailboxes.",
        "Use Ask Your Inbox for anything you need to find.",
        "Go to Gmail or Outlook for anything you prefer to handle there.",
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
      q: "Can I connect Gmail and Outlook at the same time?",
      a: "Yes. Connect a Gmail mailbox and an Outlook mailbox side by side, more than one of each if you like, and get one brief across all of them.",
    },
    {
      q: "Do I have to stop using Gmail or Outlook?",
      a: "No. Keep using your email app as you do today. MiniBrief gives you a clearer view of the same mail.",
    },
    {
      q: "Can the brief come to me by email?",
      a: "Yes. Switch on Morning briefing by email under Settings, in Notifications, so the brief is waiting in your inbox.",
    },
  ],
};
