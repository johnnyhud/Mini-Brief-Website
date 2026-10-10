import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "outlook-admin-approval",
  title: "Connecting Outlook when your IT admin must approve MiniBrief",
  description:
    "What to do when a work Microsoft 365 account asks for administrator approval: send the ready-made message from MiniBrief's welcome page, what your admin sees, and which permissions MiniBrief asks for and why.",
  date: "2026-10-10",
  body: [
    {
      type: "p",
      text: "Some work and school Microsoft 365 accounts do not let people approve new apps on their own. When you try to connect Outlook, Microsoft stops and says an administrator has to approve the app first. That is a setting your organisation controls, and it is a one-off step.",
    },
    {
      type: "p",
      text: "MiniBrief gives you a ready-to-send message to pass to your admin, so you do not have to explain it from scratch.",
    },
    { type: "h2", text: "Step 1: Try to connect Outlook" },
    {
      type: "ol",
      items: [
        "Sign in to MiniBrief and choose Connect Outlook.",
        "Sign in with your work Microsoft account at Microsoft's own sign-in page.",
        "If your organisation requires admin approval, the connection fails and you come back to the MiniBrief welcome page.",
      ],
    },
    { type: "h2", text: "Step 2: Send the message to your admin" },
    {
      type: "p",
      text: "After a failed Outlook connection, the welcome page shows a section headed \"Ask your IT admin to approve MiniBrief\". It explains that your organisation's Microsoft 365 settings need an administrator to approve MiniBrief before it can read your mailbox, and asks you to send the message below it.",
    },
    {
      type: "ol",
      items: [
        "Find the message under \"Ask your IT admin to approve MiniBrief\". It is already filled in and includes a review-and-approve link for your admin.",
        "Choose Copy message. The button changes to \"Copied\" once the text is on your clipboard.",
        "Paste the message into an email or chat to your IT admin and send it.",
        "Wait for your admin to approve. Then come back to MiniBrief and connect Outlook again.",
      ],
    },
    { type: "h2", text: "What your admin sees" },
    {
      type: "p",
      text: "The link in the message takes your admin to a Microsoft page where they can review what MiniBrief is asking for and approve it for your organisation. They are approving the permissions listed below, nothing else.",
    },
    { type: "h2", text: "Which permissions MiniBrief asks for, and why" },
    {
      type: "p",
      text: "MiniBrief requests four Microsoft permissions when you connect Outlook, and no others:",
    },
    {
      type: "ul",
      items: [
        "offline_access: stay connected without signing in again.",
        "User.Read: your basic profile, meaning your name and email address.",
        "Mail.ReadWrite: read your mail, and file or label it when you act in MiniBrief.",
        "Mail.Send: send replies you write or approve in MiniBrief.",
      ],
    },
    { type: "h2", text: "After approval" },
    {
      type: "p",
      text: "Once your admin has approved MiniBrief, choose Connect Outlook again and sign in. The connection should now go through.",
    },
    { type: "h2", text: "A note on privacy" },
    {
      type: "p",
      text: "Message bodies are not stored on our servers. For the details of what MiniBrief reads and keeps, see the Security page at /security.",
    },
  ],
  faq: [
    {
      q: "Why does Outlook say I need an administrator?",
      a: "Your organisation's Microsoft 365 settings require an administrator to approve new apps before they can read a mailbox. MiniBrief shows a ready-to-send message you can pass to your admin.",
    },
    {
      q: "What does the message to my admin contain?",
      a: "A short request to approve MiniBrief, with a review-and-approve link. Choose Copy message on the welcome page to copy it.",
    },
    {
      q: "Which Microsoft permissions does MiniBrief request?",
      a: "Four: offline_access, User.Read, Mail.ReadWrite and Mail.Send. No other Microsoft permissions are requested.",
    },
  ],
  related: ["one-daily-brief-for-gmail-and-outlook", "morning-brief-email"],
};
