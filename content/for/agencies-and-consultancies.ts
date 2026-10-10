import type { Segment } from "../../lib/segments.ts";

export const segment: Segment = {
  slug: "agencies-and-consultancies",
  name: "Agencies and consultancies",
  title: "MiniBrief for agencies and consultancies",
  description:
    "Keep client promises in view both ways, see Gmail and Outlook in one brief, and get a ready-to-send message when a Microsoft 365 admin must approve.",
  intro:
    "Client work runs on promises, in both directions, and your clients don't all use the same email. MiniBrief gives you one brief and one list of what's owed.",
  pains: [
    {
      pain: "Promises to clients, and from them",
      body: "MiniBrief finds promises in your email, both ways, and lists them in Open Loops as \"I owe\" and \"Owed to me\". The proposal you said you'd send and the signed form a client said they'd return both stay visible.",
    },
    {
      pain: "Follow-ups that slip",
      body: "Snooze a loop that can wait. Done, snooze and due dates sync across your devices, so a follow-up you handled on one device doesn't come back on another.",
    },
    {
      pain: "Mailboxes split across Gmail and Microsoft 365",
      body: "Connect Gmail and Outlook mailboxes, including work Microsoft 365 accounts, and MiniBrief builds one brief across all of them. The morning brief email leads with \"Needs you today\", and your Never miss senders are pinned first.",
    },
    {
      pain: "Microsoft 365 organisations that need IT approval",
      body: "Some Microsoft 365 organisations require an administrator to approve new apps. MiniBrief gives you a ready-to-send message for your IT admin.",
    },
  ],
  guides: ["see-what-you-promised-in-email", "one-daily-brief-for-gmail-and-outlook", "outlook-admin-approval"],
};
