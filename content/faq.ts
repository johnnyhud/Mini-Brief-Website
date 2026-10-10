/**
 * Home page FAQ. Kept free of path-alias imports so the node:test suite can
 * import it directly; content/home.ts re-exports it.
 */
export interface FaqItem {
  q: string;
  /** Plain text, verbatim. Also what the FAQ JSON-LD emits. */
  a: string;
  /** A phrase inside `a` to render as a link. */
  link?: { text: string; href: string };
}

export const faq = {
  id: "faq",
  h2: "Questions, answered straight.",
  items: [
    {
      q: "Do you store or read my email?",
      a: "Our server reads the mailboxes you connect so your brief is ready whenever you open it. It keeps a rolling 90 days of metadata: subjects, senders, previews, dates and what MiniBrief worked out about each message. Message bodies are not stored; one is fetched from your mailbox when you open it. The AI sees a subject and a short preview per message for sorting, which runs in the background, and the message you opened for the features you use on it; some results, like your daily Brief, are kept so you can read them back. The Privacy page lists exactly what. The full picture is on the Security page.",
      link: { text: "Security page", href: "/security" },
    },
    {
      q: "Does it work on my phone?",
      a: "MiniBrief is a web app, so there is nothing to install and it opens in any modern browser. It's designed for the desktop browser first.",
    },
    {
      q: "Can my team use it on shared inboxes?",
      a: "Not yet. Today MiniBrief connects the Gmail and Outlook mailboxes you sign into yourself and builds one brief across all of them; a team edition with shared mailboxes is planned.",
    },
    {
      q: "Why not just use Gemini or Copilot?",
      a: "They're useful assistants inside Gmail and Outlook. MiniBrief gives you one daily brief across all your mailboxes, tracks who's waiting on you, and flags risky email. Read the full comparison",
      link: { text: "Read the full comparison", href: "/why-minibrief" },
    },
    {
      q: "What does it cost?",
      a: "Every account starts with a free trial. After that, one paid plan unlocks everything. Email michael@minibrief.app and we'll walk you through it.",
    },
    {
      q: "Do I need my own AI key?",
      a: "No. The AI is built in. There is no key to manage and no separate AI bill.",
    },
    {
      q: "Does it work with both Gmail and Outlook?",
      a: "Yes. Connect Gmail and Outlook mailboxes, including work Microsoft 365 accounts, and MiniBrief builds one brief across all of them. See the guide to one daily brief.",
      link: { text: "See the guide to one daily brief", href: "/guides/one-daily-brief-for-gmail-and-outlook" },
    },
    {
      q: "What if my work Outlook needs IT approval?",
      a: "Some Microsoft 365 organisations require an administrator to approve new apps. MiniBrief gives you a ready-to-send message for your IT admin. See the admin approval guide.",
      link: { text: "See the admin approval guide", href: "/guides/outlook-admin-approval" },
    },
    {
      q: "What if MiniBrief puts an email in the wrong place?",
      a: "Correct it in one tap and MiniBrief learns that sender for next time. You can see and undo what it learned in Settings. Add the people you can't miss to Never miss and they're pinned to the top of your brief. See the morning brief guide.",
      link: { text: "See the morning brief guide", href: "/guides/morning-brief-email" },
    },
    {
      q: "Will it send email without me?",
      a: "No. MiniBrief drafts replies for you to review, and nothing is sent until you press Send. If a draft needs a detail it couldn't know, it leaves a [[fill: …]] marker and won't send until you fill it in.",
    },
    {
      q: "How does it keep track of what I promised?",
      a: "MiniBrief finds promises in your email, both ways, and lists them in Open Loops as I owe and Owed to me. Done, snooze and due dates sync across your devices. See how open loops stay in sync.",
      link: { text: "See how open loops stay in sync", href: "/guides/open-loops-sync" },
    },
    {
      q: "Does it warn me about phishing?",
      a: "Yes. MiniBrief gives each incoming message a risk rating and checks links and attachments before you open the message, in Gmail and Outlook. High-risk mail is flagged before you act on it. See the phishing guide.",
      link: { text: "See the phishing guide", href: "/guides/spot-phishing-in-gmail-and-outlook" },
    },
  ] satisfies readonly FaqItem[],
} as const;
