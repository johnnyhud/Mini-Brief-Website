import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Security — MiniBrief",
  description:
    "How MiniBrief is built to protect your email: processed in your browser, never stored on our servers, least-privilege access, and encryption in transit.",
};

export default function SecurityPage() {
  return (
    <LegalShell title="Security" updated="June 3, 2026">
      <section>
        <p>
          MiniBrief is designed around a simple idea: the safest data is the
          data we never hold. Your email is read and processed{" "}
          <strong>inside your browser</strong> and is never sent to or stored on
          our servers. This page explains, in plain terms, how that works and
          how we protect the limited account data we do keep. It complements our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li>Your email content never reaches our servers — it is processed in your browser and sent only to the AI provider that generates your results.</li>
          <li>We request the minimum access needed (least privilege), and you can revoke it at any time.</li>
          <li>All connections use encryption in transit (HTTPS/TLS); account data is encrypted at rest by our infrastructure providers.</li>
          <li>No analytics, telemetry, or behavioral tracking in the extension.</li>
          <li>We never use your email — or any Google or Microsoft user data — to train AI models.</li>
        </ul>
      </section>

      <section>
        <h2>How your email flows</h2>
        <p>
          When you use a feature, here is the exact path your email content
          takes:
        </p>
        <ul>
          <li><strong>1. In your browser</strong> — the extension reads the relevant messages directly from Gmail or Outlook in the page you are already signed in to.</li>
          <li><strong>2. To the AI provider</strong> — only the content needed for the feature you triggered (for example, a subject and preview for triage, or a message body for a draft) is sent directly from your browser to our AI provider, Anthropic, over an encrypted connection.</li>
          <li><strong>3. Back to you</strong> — the generated result is returned to your browser and shown in the side panel.</li>
        </ul>
        <p>
          Our backend is never in this path. It does not receive, see, or store
          your email content at any step.
        </p>
      </section>

      <section>
        <h2>What we can and can&rsquo;t see</h2>
        <p><strong>We can see:</strong> the account details needed to run the product — your account identifier and authentication details, your settings and preferences (such as your VIP list), and your plan or licensing status.</p>
        <p><strong>We cannot see:</strong> the contents of your emails, your attachments, who you email, what you read, or how you use the extension. Because the extension contains no tracking and your mail never reaches us, there is nothing on our side to leak, sell, or hand over.</p>
      </section>

      <section>
        <h2>Access and authentication</h2>
        <p>
          When you connect a Google or Microsoft account, MiniBrief uses
          standard OAuth and requests only the scopes needed for the features
          you use — reading messages, the specific changes needed to apply
          triage actions, basic mailbox settings, and read-only calendar access
          for meeting prep. We never ask for more than the product needs, and
          you can review and revoke access at any time — for Google at{" "}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>,
          and for Microsoft in your account settings.
        </p>
      </section>

      <section>
        <h2>How account data is protected</h2>
        <p>
          The limited account data described above is stored with our
          application backend provider (Supabase). It is transmitted over
          encrypted connections (HTTPS/TLS) and encrypted at rest by the
          provider. Access is restricted to the systems and personnel required
          to operate the service. Uninstalling the extension removes its local
          data from your browser; when you ask us to delete your account, we
          remove the associated data within 30 days, except where we are legally
          required to retain it.
        </p>
      </section>

      <section>
        <h2>Payments</h2>
        <p>
          Subscription payments are processed by Stripe, a PCI-DSS Level 1
          certified payment provider. Your card details are entered with Stripe
          directly — we never receive or store your full card number.
        </p>
      </section>

      <section>
        <h2>Subprocessors</h2>
        <p>
          We rely on a small number of vetted providers, each for a narrow
          purpose: <strong>Anthropic</strong> (AI processing of the limited
          content described above), <strong>Supabase</strong> (account,
          settings, and licensing data — never email content),{" "}
          <strong>Stripe</strong> (payments), <strong>Resend</strong> (waitlist
          and launch emails), and our hosting provider (serving the website).
          See our <a href="/privacy">Privacy Policy</a> for details on what each
          one handles.
        </p>
      </section>

      <section>
        <h2>Reporting a vulnerability</h2>
        <p>
          We welcome reports from the security community. If you believe you
          have found a security issue, please email{" "}
          <a href="mailto:security@minibrief.ai">security@minibrief.ai</a> with
          enough detail to reproduce it. We ask that you give us a reasonable
          opportunity to investigate and address the issue before any public
          disclosure, and that you avoid accessing or modifying other people&rsquo;s
          data. We will acknowledge your report and keep you updated as we work
          on a fix.
        </p>
      </section>
    </LegalShell>
  );
}
