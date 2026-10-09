import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — MiniBrief",
  description:
    "What MiniBrief holds about you and your mailbox, why, for how long, who else touches it, and what you can do about it. Message bodies are not stored; metadata is kept for a rolling 90 days.",
  alternates: { canonical: "/privacy" },
};

// The text below is the product's own privacy policy (PRIVACY.md in the
// product repository, September 2026), published here unchanged apart from
// markup, the wordmark's spelling, and one bullet about a retired, never
// used export that the draft itself marks as gone.
export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 22, 2026">
      <section>
        <p>MiniBrief is a web app that triages your inbox: it sorts what arrives, tells you who is waiting on you and who you are waiting on, files mail into folders you define, drafts replies in your voice, and writes you a morning brief. To do that when no browser of yours is open, our server reads the mailbox you connect. This document explains what we hold, why, for how long, who else touches it, and what you can do about it.</p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li><strong>You connect a mailbox on purpose.</strong> Signing up, subscribing or starting a trial does not connect one. Connecting is a separate step under Settings → Mailboxes, at Google&#39;s or Microsoft&#39;s own consent screen.</li>
          <li><strong>We store your mail&#39;s metadata, not its bodies.</strong> For each connected mailbox we keep a rolling 90-day window of subjects, senders, recipients, dates, short previews and flags, plus what our software works out about each message. Message bodies are fetched from your mailbox when you open a message and are not kept.</li>
          <li><strong>AI sees only what a feature needs.</strong> Sorting sends a subject and about 120 characters of preview per message. Reading features that need more (summaries, reply drafting, the Brief) send the message you opened or asked about, capped, and only when you use them. Nothing you send to the AI is logged or used to train models.</li>
          <li><strong>No analytics, no tracking, no selling.</strong> There is no analytics service and no telemetry in the product. We do not sell your data or use it for advertising.</li>
          <li><strong>Disconnecting a mailbox deletes what we read from it. Deleting your account deletes everything.</strong> Both are self-serve in Settings.</li>
        </ul>
      </section>

      <section>
        <h2>Your account</h2>
        <p>To offer paid accounts and a free trial we operate a backend (Supabase) that stores: your login email and account id, your subscription status, an integer count of AI calls per day for abuse prevention, the phone number you verified once to start a free trial, and — to prevent repeated free trials — the addresses of mailboxes you connect and the phone numbers that have already seeded a trial. Your password is held only as a hash by our authentication provider; if you turn on two-factor authentication, the secret is held there too.</p>
      </section>

      <section>
        <h2>The mailbox you connect</h2>
        <h3>The permission</h3>
        <p>The OAuth grant you give at Google&#39;s or Microsoft&#39;s consent screen is exchanged on our server, <strong>encrypted with AES-256-GCM before it is written</strong>, and stored only in that sealed form. The key that seals it lives only in the environment of our two server processes (the web app and the background worker) — never in the database, so a copy of the database alone cannot read any mailbox. Your browser never receives the grant. Disconnecting a mailbox in Settings revokes the grant at Google (Microsoft has no per-app revocation endpoint; you remove MiniBrief from your Microsoft account instead) <strong>and deletes the mailbox row together with every message row and verdict we read under it.</strong> You may connect more than one mailbox (two Gmail accounts, say); each is read through its own connection, shown as its own tab, and everything below applies to each of them separately.</p>
        <h3>What we store about your mail</h3>
        <p>For each connected mailbox, our background worker reads the mailbox through the Gmail API or Microsoft Graph and stores, per message: the subject, the sender&#39;s name and address, the recipients, a short preview (the first couple of hundred characters, as the provider supplies it), the date, read and starred flags, labels and categories, attachment names and sizes, a few header-derived signals (whether the message carries an unsubscribe header, whether its authentication checks passed), and the link back to the message in Gmail or Outlook. Alongside those we store what MiniBrief works out: importance and category, whether a reply is owed, order and delivery detection, the Sender Guard warning level, the risk layer&#39;s verdict (a tier, plain-English reasons and short evidence such as a domain — never a number from the message), and Smart Folder membership. For the risk layer we also keep, per connected mailbox, a relationship baseline: how often each address and domain has written to you or been written to, the display names an address has used, whether its mail passed authentication, and fingerprints (one-way hashes) of payment details a domain has sent before — never the details themselves. It personalises your own checks and trains nothing.</p>
        <p>We also store, because the app&#39;s features need them:</p>
        <ul>
          <li><strong>Per-thread bookkeeping</strong>: who wrote last and when, and whether a reply is awaited. Timestamps and flags, no content.</li>
          <li><strong>Sender memory</strong>: one person-or-automated verdict per correspondent address, so a sender is asked about once; and the addresses you have written to, with a count and a date, which is how we tell a stranger from someone you correspond with.</li>
          <li><strong>Your corrections</strong>: a message you filed by hand, and — for the triage corrections that teach the classifier — the sender, the change you made, the subject and a short preview of the message you corrected (the newest 100).</li>
          <li><strong>Senders you blocked</strong>, with the id of the Gmail filter that trashes their future mail, so the block can be listed and undone.</li>
          <li><strong>The Brief and meeting preps</strong>: the daily Brief as generated (the subjects, senders and previews it cites and the model&#39;s prose), kept so you can read it back and send it on; and, per calendar event, the event&#39;s title and attendees, the related mail&#39;s subjects and previews, and the model&#39;s notes.</li>
          <li><strong>A record that you have already been notified about something</strong>, so two open tabs or two devices stay quiet instead of telling you twice.</li>
        </ul>
        <p><strong>Message bodies are not stored.</strong> When you open a message on the web, its body is fetched live from your mailbox through our server and shown to you. The same is true of attachments: an attachment you open is fetched from your mailbox and handed to your browser (a large one through a link that works for five minutes and names only that file); it is not kept on our side. A short-lived body cache exists in our database schema for a future reading feature; it is evicted 21 days after a body was last read, and nothing writes to it at the time of this policy. If that changes, this paragraph will change first.</p>
        <h3>How long we keep it</h3>
        <p>Mail rows are kept for a rolling <strong>90 days</strong> from the message&#39;s date, capped at the newest 25,000 messages per mailbox; a message you delete or archive away is tombstoned and removed after 30 days; the body cache, when it is in use, is evicted 21 days after a body was last read. Disconnecting a mailbox deletes everything read under it immediately. Deleting your account deletes all of it.</p>
        <h3>Who can read it</h3>
        <p>Every table is protected by row-level security keyed to your account: the web app reads only your rows, with your session. The background worker connects as the database owner and is scoped in code to one mailbox at a time. No MiniBrief staff tool reads mail rows; the support tooling sees account and subscription fields only.</p>
      </section>

      <section>
        <h2>Things you tell us yourself</h2>
        <p>Some of what MiniBrief holds is not mail but your own words and choices, stored against your account so every browser you sign in from agrees:</p>
        <ul>
          <li><strong>Your client list</strong> (names, addresses, domains, tags and your own notes), your team&#39;s domains, your signature, your settings and preferences.</li>
          <li><strong>Your Smart Folder rules.</strong> A folder&#39;s name, your description of it, and the rule you built from it — which may quote a sender address or a subject word you typed or confirmed in the folder builder — plus your per-folder &quot;always file this sender&quot; / &quot;never this one&quot; choices and your muted senders (a mute is such a rule).</li>
          <li><strong>Your decisions about senders.</strong> The senders you rescued from Junk, the ones you marked safe, the ones you added to Orders, and the senders you told us are a person or a machine, or always a given priority. These are addresses and domains you chose, kept readable so arriving mail can be matched against them.</li>
          <li><strong>Which emails you stored under a client, and where.</strong> For each email you file into a client&#39;s Stored Correspondence we keep the client, the subfolder, when you filed it, and the identifier Gmail or Outlook uses for that message — an opaque code that means nothing without your mailbox — plus the names you gave your subfolders.</li>
          <li><strong>What you decided about a conversation</strong> — dismissed, or closed as dealt with — recorded against a one-way hash of the conversation&#39;s identifier, with no subject, sender or preview.</li>
        </ul>
        <p>Every row is protected by row-level security keyed to your account, and deleting your account deletes all of it.</p>
      </section>

      <section>
        <h2>AI features — exactly what the model sees</h2>
        <p>MiniBrief&#39;s AI features run on Anthropic&#39;s models. Two of our processes call them: our background worker, for the sorting that happens whether or not a browser is open, and the web app itself, for the things you ask for while reading. In both cases the request is scoped to the feature, <strong>neither the request nor the response is logged or stored</strong>, and we keep only token counts and operation labels per call. Google user data is not used to develop, improve or train generalized AI or machine-learning models, is not used for advertising, and is not sold.</p>
        <p>What each feature sends:</p>
        <ul>
          <li><strong>Sorting your inbox</strong> — importance, person-or-automated category, order and delivery detection, Sender Guard, and Smart Folder intents — sends the <strong>subject and a preview of at most about 120 characters</strong> per message. A sender is asked about once; a message is asked about once per folder wording.</li>
          <li><strong>The Brief and the executive report</strong> send the subject lines, senders and short previews of the mail in the window, and the model returns the prose the Brief shows.</li>
          <li><strong>Meeting prep</strong> sends calendar-event details — the event title, description (up to 500 characters), location, and the attendee names and addresses — from your connected calendar, and the subjects and previews of related mail.</li>
          <li><strong>Reply drafting</strong> sends up to <strong>4,000 characters of the cleaned thread you are replying into</strong>, plus any thread or client notes you yourself wrote (each capped at 2,000 characters).</li>
          <li><strong>Summaries and &quot;Ask about this thread&quot;</strong> send up to 3,000–4,000 characters of the cleaned body of the message or thread you opened, because that is the input. The thread assistant can see nothing but that one thread; your questions and its answers are held while you read and are not stored.</li>
          <li><strong>Commitment extraction and open-question analysis</strong> send up to 3,000 characters of the latest message you open, to surface follow-ups and unanswered questions.</li>
          <li><strong>Tone and writing checks</strong> send the draft text you are checking.</li>
          <li><strong>Ask your inbox</strong> sends the question you typed and, as the assistant works, the subjects, senders and previews of the messages it finds; a thread it opens is sent as the Brief would send it.</li>
          <li><strong>Smart Folder compilation</strong> sends the plain-English description you typed (up to 300 characters, plus your own address so &quot;my team&quot; resolves) once, to turn it into a rule.</li>
          <li><strong>Forwarding an email sends nothing to the AI</strong> — the message and your own typed note go straight to Gmail or Outlook.</li>
        </ul>
      </section>

      <section>
        <h2>What MiniBrief changes in your mailbox</h2>
        <p>With your permission, MiniBrief acts on your inbox through the Gmail API or Microsoft Graph. Every action below is initiated by you except where noted as background; all of them are carried out by our server with the sealed grant described above.</p>
        <div className="legal-table" role="region" aria-label="What MiniBrief changes in your mailbox" tabIndex={0}>
          <table>
            <thead><tr><th>Action</th><th>Trigger</th><th>Gmail API used</th></tr></thead>
            <tbody>
            <tr><td>Read emails, labels, threads, and your Drafts folder</td><td>Background sync, on demand; Drafts when you open the Drafts tab</td><td><code>gmail.modify</code> (read)</td></tr>
            <tr><td>Send replies, forwards and new mail</td><td>You click Send</td><td><code>gmail.modify</code></td></tr>
            <tr><td>Apply or remove labels (categorisation, archive)</td><td>You click an action; auto-categorisation on incoming mail when you have allowed the label mirror</td><td><code>gmail.modify</code></td></tr>
            <tr><td>Move messages to Trash</td><td>You click Delete</td><td><code>gmail.modify</code></td></tr>
            <tr><td><strong>Save a reply as a draft in your mailbox</strong></td><td>You click Draft in the composer</td><td><code>gmail.modify</code></td></tr>
            <tr><td>Update that draft in place when you save the same reply again</td><td>You click Draft again</td><td><code>gmail.modify</code></td></tr>
            <tr><td><strong>Create a server-side filter that auto-trashes future mail from a sender</strong></td><td>You click &quot;Unsubscribe &amp; block sender&quot;</td><td><code>gmail.settings.basic</code></td></tr>
            <tr><td><strong>Delete a previously created block filter</strong></td><td>You click &quot;Unblock&quot;</td><td><code>gmail.settings.basic</code></td></tr>
            <tr><td>Attempt one-click unsubscribe (RFC 8058) or send the prescribed unsubscribe email</td><td>You click &quot;Unsubscribe &amp; block sender&quot;</td><td><code>gmail.modify</code> for the <code>mailto:</code> form; a direct HTTPS POST to the sender&#39;s unsubscribe endpoint for one-click</td></tr>
            </tbody>
          </table>
        </div>
        <p>The block filter is a real Gmail server-side rule. It will continue to auto-trash mail from the sender even if you disconnect the mailbox or delete your account. You can remove it under Settings → Blocked senders or directly from <a href="https://mail.google.com/mail/u/0/#settings/filters" target="_blank" rel="noopener noreferrer">Gmail settings → Filters</a>. On Outlook the equivalent actions use Microsoft Graph with the same triggers.</p>
      </section>

      <section>
        <h2>Calendar</h2>
        <p>Connecting Gmail also grants <code>calendar.readonly</code>, and connecting Outlook the equivalent Graph permission, used by the Meetings view to show upcoming events and the mail history with their attendees. Calendar events are read by our server for that purpose and are not stored; a meeting prep, once generated, is stored as described above.</p>
      </section>

      <section>
        <h2>Notifications</h2>
        <p>The web app sends a private, per-account notice to your open browser tabs when your inbox changes. That notice carries counts only — never a subject, sender or preview.</p>
        <p><strong>Browser notifications.</strong> If you turn them on in Settings → Notifications, a MiniBrief server can alert your browser when new mail lands in your Inbox, Response Needed, Orders &amp; Deliveries or one of your Smart Folders, when a follow-up or a client check-in is due, an email has waited too long for your reply, a meeting is about to start, or your morning brief is ready. Each alert names the <strong>sender and the subject line</strong>, says <strong>where the message was filed</strong> (a tab, or the name you gave a Smart Folder) and links to the message — never a preview or a body. Alerts are encrypted to your browser before they are sent, so the push service your browser uses (Google&#39;s, Apple&#39;s or Mozilla&#39;s) relays them without being able to read them. Turn them off in the same place, or in your browser&#39;s site settings.</p>
        <p><strong>The morning briefing by email.</strong> Off unless you turn it on. At the hour and on the days you choose, in the time zone you set, we generate your Brief for the day and email it to your account address. <strong>That email contains the subject lines, senders and short previews the Brief cites, and what our AI wrote about them</strong> — the same content the Brief shows on screen. It is sent through Resend, our email provider, which processes it only to deliver it. The email carries an unsubscribe header, and the switch is in Settings → Notifications.</p>
      </section>

      <section>
        <h2>In your browser</h2>
        <p>The web app keeps a copy of your working state in your browser&#39;s own storage (IndexedDB), per account, so the inbox opens quickly: cached message metadata, your settings and folders, the AI outputs you have already seen, and your unsent drafts. Signing out of the web app on that browser clears it. Your session cookie is what keeps you signed in.</p>
      </section>

      <section>
        <h2>Third parties</h2>
        <ul>
          <li><strong>Google</strong> receives Gmail and Calendar API requests from our server, authenticated with your OAuth grant, for a connected Gmail mailbox. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&#39;s privacy policy</a>.</li>
          <li><strong>Microsoft</strong> likewise receives Microsoft Graph requests for a connected Outlook mailbox. See <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft&#39;s privacy statement</a>.</li>
          <li><strong>Anthropic</strong> receives AI requests, scoped as described above, from our worker and from the web app&#39;s AI proxy. See <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Anthropic&#39;s privacy policy</a>.</li>
          <li><strong>Supabase</strong> hosts MiniBrief&#39;s authentication, the account and subscription database, the mail store and everything else described above, and the AI proxy.</li>
          <li><strong>Vercel</strong> hosts the web app at cloud.minibrief.app, including the server-side routes that exchange your OAuth code and seal the grant, and the marketing site at www.minibrief.app.</li>
          <li><strong>Railway</strong> runs the background worker that reads connected mailboxes, classifies their mail, sends notifications and calls Anthropic.</li>
          <li><strong>Stripe</strong> processes subscription payments. MiniBrief never sees or stores your card details. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&#39;s privacy policy</a>.</li>
          <li><strong>Twilio</strong> delivers the one-time text message used to verify your phone number when you start a free trial. It receives your phone number and nothing else.</li>
          <li><strong>Resend</strong> delivers MiniBrief&#39;s own email: sign-up confirmation, password recovery, and — if you turn it on — the morning briefing described above. It receives your address and that message.</li>
          <li><strong>Sender unsubscribe endpoints</strong> receive a one-click POST or a <code>mailto:</code> email when you click &quot;Unsubscribe &amp; block sender&quot;. The HTTPS POST contains the literal body <code>List-Unsubscribe=One-Click</code> and no other identifying data; the email follows whatever address and subject the sender prescribed in the <code>List-Unsubscribe</code> header.</li>
        </ul>
        <p>There is no analytics service, no advertising network and no data broker in this list, because none is used.</p>
      </section>

      <section>
        <h2>Google API Services User Data Policy</h2>
        <p>MiniBrief&#39;s use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <ul>
          <li><strong>Disconnect a mailbox</strong> under Settings → Mailboxes: the grant is revoked at Google and every row read under that mailbox is deleted at once.</li>
          <li><strong>Delete your account</strong> under Settings: every row described in this policy is deleted.</li>
          <li><strong>Turn notifications and the briefing off</strong> under Settings → Notifications; <strong>remove a block filter</strong> under Settings → Blocked senders.</li>
          <li><strong>Ask us</strong> for a copy of what we hold, or to correct or delete it, at the address below. We answer from the same tables described here; there is no other store.</li>
        </ul>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>When what we store or send changes, this document changes first, and the &quot;Last updated&quot; line moves. A change that widens what leaves your mailbox will be announced in the app before it takes effect.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Questions, requests, or to exercise your rights over the data described here: <a href="mailto:support@minibrief.app">support@minibrief.app</a>.</p>
      </section>
    </LegalShell>
  );
}
