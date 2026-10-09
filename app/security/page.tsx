import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security — MiniBrief",
  description:
    "How MiniBrief is built: what our server reads and keeps, what reaches the AI, how mailbox access is sealed, the protection built into your inbox, and how to report a vulnerability.",
  path: "/security",
});

// Every statement here is drawn from the product's privacy policy (September
// 2026) and its security plan (S0–S4 shipped 2026-09-22). List shipped
// protections only, with no status claims. Keep it that way: this page is
// read by people who check.
export default function SecurityPage() {
  return (
    <LegalShell title="Security" updated="September 23, 2026">
      <section>
        <p>
          MiniBrief is a web app. To sort your inbox, warn you about risky mail and have
          your brief ready before you open a browser, <strong>a MiniBrief server reads the
          mailboxes you connect</strong>, keeps the envelope of each message and never its
          body, and sends the AI only what a feature needs. This page explains how that
          works, what we hold, how it is protected, and what the product does to protect
          you. It complements our <a href="/privacy">Privacy Policy</a>, which lists every
          stored field.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li><strong>Message bodies are not stored.</strong> For each connected mailbox we keep a rolling 90-day window of subjects, senders, recipients, dates, short previews, flags and what MiniBrief worked out about each message. A body is fetched from your mailbox when you open the message and is not kept.</li>
          <li><strong>The AI sees only what a feature needs.</strong> Sorting sends a subject and about 120 characters of preview per message. Summaries, reply drafts and the Brief send the message you opened or asked about, capped, only when you use them. Nothing sent to the AI is used to train models. What is kept, like your daily Brief, is listed on the Privacy page.</li>
          <li><strong>Your mailbox grant never reaches your browser.</strong> The OAuth grant is exchanged on our server, encrypted with AES-256-GCM before it is written, and the key that seals it lives only in our two server processes, never in the database.</li>
          <li><strong>No analytics, no telemetry, no tracking.</strong> There is no analytics service in the product, and no data broker or advertising network in our subprocessor list.</li>
          <li><strong>Disconnecting a mailbox deletes what we read from it; deleting your account deletes everything.</strong> Both are self-serve in Settings.</li>
        </ul>
      </section>

      <section>
        <h2>Connecting Microsoft 365</h2>
        <p>
          On Microsoft 365, connecting MiniBrief usually needs a one-time approval from
          your administrator. That is a Microsoft tenant policy covering the mail and
          calendar permissions we ask for, not something we can or would want to route
          around.
        </p>
      </section>

      <section>
        <h2>How your email flows</h2>
        <ul>
          <li><strong>1. You connect a mailbox.</strong> Signing up or starting a trial connects nothing. Connecting is a separate step under Settings → Mailboxes, at Google&rsquo;s or Microsoft&rsquo;s own consent screen, and it asks only for the scopes the features need: reading mail, the changes needed for the actions you take, sending what you approve, and read-only calendar access.</li>
          <li><strong>2. Our worker reads it.</strong> A background worker reads the mailbox through the Gmail API or Microsoft Graph, on a schedule and on push, and stores the metadata described above along with its verdicts. It reads one mailbox at a time and keeps no store of its own; its only datastore is our database.</li>
          <li><strong>3. The AI is asked, narrowly.</strong> The worker classifies new mail with a subject and a short preview per message. When you open a message and ask for a summary, a draft or a question answered, the web app sends that one message or thread, capped in length. We keep token counts and operation labels per call; results some features save, like the Brief, are listed on the Privacy page.</li>
          <li><strong>4. Bodies stay in your mailbox.</strong> When you open a message, its body is fetched live from Gmail or Outlook through our server and shown to you. Attachments work the same way. Neither is written to our database.</li>
        </ul>
      </section>

      <section>
        <h2>What we keep, and for how long</h2>
        <p>
          Mail rows are kept for a rolling 90 days from the message&rsquo;s date, capped at the
          newest 25,000 messages per mailbox; a message you delete or archive away is
          removed after 30 days. Alongside the metadata we keep what MiniBrief works out:
          importance and category, whether a reply is owed, the Sender Guard level, the
          risk verdict with its plain-English reasons and short evidence such as a domain,
          and Smart Folder membership. For the risk layer we also keep a relationship
          baseline per mailbox: how often each address and domain writes to you, the
          display names an address has used, whether its mail passed authentication, and
          one-way fingerprints of payment details a domain has sent before, never the
          details themselves. Your own words and choices (client list, folder rules,
          senders you trusted or blocked, your settings) are stored against your account so
          every browser you sign in from agrees. Disconnecting a mailbox deletes everything
          read under it immediately; deleting your account deletes all of it.
        </p>
      </section>

      <section>
        <h2>Protection built into your inbox</h2>
        <p>
          MiniBrief sees your mail after delivery, through the same connection that sorts
          it, so it can read the mailbox the way a security team would. Every signal below
          is deterministic and readable: a verdict comes with its reasons and evidence,
          the model can only raise a tier, and every verdict is visible and reversible.
        </p>
        <ul>
          <li><strong>Sender Guard and a risk verdict on every message.</strong> Each incoming message gets a tier, plain-English reasons and short evidence, judged against a baseline built from your own mail: who writes to you and how often, the names an address has used, and whether its mail passes authentication. A first contact, a Reply-To that does not match, a request for credentials, pressure to act now, or bank details that differ from what a domain sent before all count. High-risk mail is flagged before you act on it.</li>
          <li><strong>Look-alike domains.</strong> A sender domain that imitates one you correspond with is called out on arrival, and MiniBrief watches roughly 150 look-alikes of your own domain (typos, homoglyphs, swapped endings, added words); when one is registered, mail from it is treated as high risk from its first message.</li>
          <li><strong>Links and attachments judged before you open.</strong> For the messages a phish arrives as (money, a sign-in request, an attachment, a stranger&rsquo;s personal mail) the worker scans links and attachments on the server, so a high-risk finding is pushed to your browser within minutes of the sync that saw it, if you have notifications on. A calendar invite from a stranger with links is treated the same way.</li>
          <li><strong>Send-time guard.</strong> When you send, MiniBrief checks the recipients against your baseline. A look-alike of a domain you write to, or bank details or credentials headed to an outside address, stop the send until you confirm; a first-ever outside recipient, or a contact who normally writes from a work address reached at a free-webmail one, gets a one-line notice. If the check itself is ever unavailable, sending is never blocked.</li>
          <li><strong>Mailbox audit.</strong> On connect and every six hours, MiniBrief checks a Gmail mailbox for filters that forward, delete, hide or mark mail as read, for forwarding addresses, and for send-as aliases that answer to a different address: the classic signs of a compromised account. A new high-risk finding is pushed to you, and a bad filter can be removed with one click (&ldquo;Remove this filter&rdquo;) or kept (&ldquo;This is mine&rdquo;). Gmail today.</li>
          <li><strong>Your domain&rsquo;s posture.</strong> For your own domain, MiniBrief checks SPF, DKIM, DMARC and MTA-STS weekly, straight from DNS, and shows each gap, with the record to add where there is one.</li>
          <li><strong>Auto-quarantine, if you want it.</strong> Off by default. Turn it on and high-risk mail moves to Spam or Junk automatically, with a ledger and a Restore button, and never for a sender you have trusted.</li>
          <li><strong>Unsubscribe &amp; block that sticks.</strong> One click attempts the sender&rsquo;s one-click unsubscribe and creates a real server-side filter in your mailbox that trashes their future mail. You can undo it under Settings → Blocked senders.</li>
        </ul>
      </section>

      <section>
        <h2>Access and authentication</h2>
        <ul>
          <li><strong>Mailbox access.</strong> Both OAuth flows use Authorization Code with PKCE; no provider access or refresh token is ever sent to the browser. The grant is sealed with AES-256-GCM under a key that exists only in the environment of our two server processes. Disconnecting a mailbox revokes the grant at Google (Microsoft has no per-app revocation endpoint, so you remove MiniBrief from your Microsoft account instead) and deletes every row read under it.</li>
          <li><strong>Your account.</strong> Passwords are at least 12 characters, checked against leaked-password lists, and held only as bcrypt hashes by our authentication provider; MiniBrief never sees a password. Sign-in and code entry are rate-limited. Two-factor authentication (TOTP) is optional and enforced on the server once you turn it on. A one-time phone verification, by text message, is required only to start a free trial.</li>
          <li><strong>Sessions.</strong> Access tokens expire after an hour and refresh tokens rotate; signing out revokes every session. Session cookies are HttpOnly, Secure and SameSite, and signing out also wipes the local cache in your browser.</li>
        </ul>
      </section>

      <section>
        <h2>How the platform is protected</h2>
        <ul>
          <li><strong>Row-level security on every table.</strong> Access control runs in PostgreSQL, below the API, keyed to your account: the web app reads only your rows, with your session, and no staff tool reads mail rows. The support tooling sees account and subscription fields only.</li>
          <li><strong>Encryption.</strong> TLS 1.2 or better on every connection; the database is encrypted at rest by our provider; the mailbox grant is additionally encrypted before it is written. No cryptography is implemented by hand.</li>
          <li><strong>Hardened web app.</strong> A Content Security Policy, frame-ancestors none so MiniBrief cannot be embedded in another site, an exact CORS allowlist, secrets held in a secrets store and never in the app bundle, and dependencies audited for known vulnerabilities.</li>
          <li><strong>Content-free logs.</strong> The AI path records only a call counter, the operation, the model and token counts. Worker logs carry counters and identifiers, never a subject. No credentials or payment details are ever logged.</li>
          <li><strong>Notifications.</strong> Browser alerts carry a sender and a subject line, never a preview or body, and are encrypted to your browser before they are sent, so the push service relays bytes it cannot read.</li>
        </ul>
      </section>

      <section>
        <h2>Payments</h2>
        <p>
          Subscription payments are processed by Stripe, a PCI-DSS Level 1 certified payment
          provider. Your card details are entered on Stripe&rsquo;s own checkout page and never
          reach MiniBrief.
        </p>
      </section>

      <section>
        <h2>Subprocessors</h2>
        <p>
          A short list, each doing one narrow thing. Only one of them ever receives
          content derived from your mailbox, and one more does if you switch the morning
          briefing on. Google and Microsoft are the sources of your mail, at your
          direction, not our subprocessors.
        </p>
        <div className="legal-table" role="region" aria-label="Subprocessors" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Receives mailbox content?</th>
                <th>Data processing agreement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anthropic</td>
                <td>The AI behind sorting, summaries, drafts and the Brief</td>
                <td>Yes. The only one, by default.</td>
                <td>In force, under its commercial terms</td>
              </tr>
              <tr>
                <td>Supabase</td>
                <td>Authentication, the account and mail-metadata database, the AI proxy</td>
                <td>Metadata, never a message body</td>
                <td>Executed July 2026</td>
              </tr>
              <tr>
                <td>Railway</td>
                <td>The background worker that reads your mailbox</td>
                <td>In transit, never stored there</td>
                <td>Being confirmed</td>
              </tr>
              <tr>
                <td>Vercel</td>
                <td>Hosting for the web app and this site</td>
                <td>In transit, never stored there</td>
                <td>Being confirmed</td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Payments, on Stripe-hosted pages</td>
                <td>No</td>
                <td>In force. PCI-DSS Level 1</td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Sign-up and recovery email, and the morning briefing if you turn it on</td>
                <td>Only in the briefing, which is off by default</td>
                <td>In force</td>
              </tr>
              <tr>
                <td>Twilio</td>
                <td>The one-time text that verifies a phone number for a free trial</td>
                <td>No. Your phone number and nothing else.</td>
                <td>In force, with standard contractual clauses</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          One honest note on Stripe: for payments it acts both as our processor and, for
          fraud screening and its own regulatory obligations, as an independent
          controller setting its own purposes. That is inherent to regulated payments
          rather than a gap. If you ask whether every subprocessor is purely a processor,
          the accurate answer is no, and Stripe is the exception.
        </p>
      </section>

      <section>
        <h2>Incident response</h2>
        <p>
          Our providers are contractually bound to tell us about a personal data breach;
          the windows are not uniform, and the database that holds your account and mail
          metadata commits to written notice within 48 hours. If an incident affected
          your data we would tell you what happened, what it touched and what we did,
          without waiting to have a tidy story. Because message bodies are never written
          to our database, the blast radius of a database incident is metadata and
          account records rather than your correspondence.
        </p>
      </section>

      <section>
        <h2>Deleting your data</h2>
        <p>
          Both paths are self-serve in Settings, and neither needs to go through us.
          Disconnecting a mailbox revokes the grant at Google and deletes the mailbox row
          together with every message row and verdict read under it, at once. Deleting
          your account removes everything described on this page and in the{" "}
          <a href="/privacy">Privacy Policy</a>. One thing deliberately outlives us: if
          you used &ldquo;Unsubscribe &amp; block sender&rdquo;, that filter is a real
          rule in your own mailbox and keeps working after you leave. You can remove it
          in Gmail&rsquo;s own settings.
        </p>
      </section>

      <section>
        <h2>What we do not have yet</h2>
        <p>
          A security page that lists only strengths is not much use, so here is the other
          column, accurate as of the date above.
        </p>
        <ul>
          <li>No SOC 2 report of our own. We rely on our providers&rsquo; certifications, not on one we hold.</li>
          <li>No published penetration test.</li>
          <li>Data processing agreements with the two providers added when the web app launched, our host and the worker&rsquo;s host, are being confirmed and recorded.</li>
          <li>The mailbox audit reads Gmail today. Outlook inbox rules need a further Microsoft permission and are not covered yet.</li>
          <li>We are not a mail gateway, we do not detonate attachments in a sandbox, and we are not watching your inbox in real time. MiniBrief sees mail after delivery, on the schedule described above.</li>
        </ul>
      </section>

      <section>
        <h2>Reporting a vulnerability</h2>
        <p>
          We welcome reports from the security community. If you believe you have found a
          security issue, please email{" "}
          <a href="mailto:security@minibrief.app">security@minibrief.app</a> with enough
          detail to reproduce it. We ask that you give us a reasonable opportunity to
          investigate and address the issue before any public disclosure, and that you
          avoid accessing or modifying other people&rsquo;s data. We will acknowledge your
          report and keep you updated as we work on a fix.
        </p>
      </section>
    </LegalShell>
  );
}
