import type { Guide } from "@/lib/guides";

export const guide: Guide = {
  slug: "spot-phishing-in-gmail-and-outlook",
  title: "How to spot phishing in Gmail and Outlook",
  description:
    "General warning signs of phishing email in Gmail and Outlook, and how MiniBrief's risk rating, link and attachment checks, mailbox audit and block that sticks help.",
  date: "2026-10-09",
  body: [
    {
      type: "p",
      text: "Phishing email works because it looks ordinary. It arrives in the same inbox as your real mail, in the middle of a busy day, asking for something that seems reasonable. The good news is that most phishing shares a handful of warning signs, and they are the same in Gmail and in Outlook.",
    },
    { type: "h2", text: "Warning signs to look for" },
    {
      type: "p",
      text: "None of these proves a message is dangerous on its own. Together, they are a good reason to slow down.",
    },
    {
      type: "ul",
      items: [
        "A sender you do not know, or a familiar name on an unfamiliar address.",
        "A Reply-To address that does not match the sender.",
        "A domain that is almost, but not quite, the one you expect: a swapped letter, an added word, a different ending.",
        "Pressure to act now, or a threat if you do not.",
        "A request for a password, a code or a sign-in.",
        "New or changed bank details on an invoice.",
        "An attachment you were not expecting, or a link whose text does not match where it goes.",
      ],
    },
    { type: "h2", text: "Habits that protect you in any email app" },
    {
      type: "ul",
      items: [
        "Do not sign in through a link in an email. Open the website yourself instead.",
        "If a message asks for money or changed payment details, confirm with the sender using a phone number or address you already had.",
        "Hover over a link to see where it really goes before you click.",
        "Be careful with attachments you did not ask for, even from someone you know, because their account may have been taken over.",
        "If something feels off, ask a colleague before you act.",
      ],
    },
    { type: "h2", text: "What MiniBrief adds" },
    {
      type: "p",
      text: "MiniBrief reads the mailboxes you connect and checks incoming mail the way a security team would. You still make the decisions; MiniBrief makes the signs easier to see.",
    },
    { type: "h3", text: "A risk rating, with reasons" },
    {
      type: "p",
      text: "Each incoming message gets a risk rating, with plain-English reasons and short evidence, judged against a baseline built from your own mail: who writes to you, how often, and whether their mail passes authentication. A first contact, a Reply-To that does not match, a request for credentials, pressure to act now, or bank details that differ from what a domain sent before all count. High-risk mail is flagged before you act on it, and you can overturn any verdict.",
    },
    { type: "h3", text: "Links and attachments checked before you open" },
    {
      type: "p",
      text: "For the messages a phish usually arrives as, such as money, a sign-in request, an attachment or personal mail from a stranger, links and attachments are judged on the server before you open the message. A high-risk finding is pushed to your browser within minutes, if you have notifications on.",
    },
    { type: "h3", text: "A mailbox audit, on Gmail today" },
    {
      type: "p",
      text: "A common sign that an account has been taken over is a filter that forwards, deletes or hides your mail. MiniBrief's mailbox audit checks a Gmail mailbox for filters like these, for forwarding addresses, and for send-as aliases that answer to a different address. A new high-risk finding is pushed to you, and a bad filter can be removed with one click or kept if it is yours.",
    },
    {
      type: "p",
      text: "The mailbox audit works for Gmail today. If you use Outlook, the warning signs and habits above still apply, and so do the risk rating and the link and attachment checks.",
    },
    { type: "h3", text: "Unsubscribe and block that sticks" },
    {
      type: "p",
      text: "For senders you simply do not want, one click attempts the sender's one-click unsubscribe and creates a real filter in your mailbox that trashes their future mail. You can undo it under Settings, in Blocked senders.",
    },
    { type: "h2", text: "What to do when a message looks wrong" },
    {
      type: "ol",
      items: [
        "Do not click links or open attachments.",
        "Look at the sender address and Reply-To, not just the display name.",
        "Check the risk rating and its reasons in MiniBrief, if the message is in your brief.",
        "If it claims to be from someone you know, contact them another way.",
        "Block the sender if you never want to hear from them again.",
        "If you clicked or entered a password, change that password straight away and tell whoever manages your account.",
      ],
    },
    { type: "h2", text: "What no tool can promise" },
    {
      type: "p",
      text: "MiniBrief sees mail after delivery, on a schedule, and it is not a mail gateway. It is a second pair of eyes, not a guarantee. Your own judgment is still the most important check.",
    },
    { type: "h2", text: "A note on privacy" },
    {
      type: "p",
      text: "Message bodies are not stored on our servers. For the details of what MiniBrief reads and keeps, see the Security page at /security.",
    },
  ],
  faq: [
    {
      q: "Does MiniBrief check links and attachments?",
      a: "For the messages a phish usually arrives as, links and attachments are judged on the server before you open the message, and a high-risk finding is pushed to your browser within minutes.",
    },
    {
      q: "Does the mailbox audit work for Outlook?",
      a: "Not yet. The mailbox audit works for Gmail today. The risk rating and the link and attachment checks apply to both Gmail and Outlook.",
    },
    {
      q: "What does MiniBrief's unsubscribe and block do?",
      a: "One click attempts the sender's one-click unsubscribe and creates a real filter in your mailbox that trashes their future mail. You can undo it under Settings, in Blocked senders.",
    },
  ],
};
