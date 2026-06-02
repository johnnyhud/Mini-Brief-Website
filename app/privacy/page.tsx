import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — MiniBrief",
  description:
    "How Mini Brief handles your data. The extension stores nothing and runs in your browser; the waitlist collects only the email you submit.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="May 15, 2026">
      <section>
        <p>
          Mini Brief is built so that we hold as little of your data as
          possible. This policy explains, in plain terms, exactly what is and
          is not collected. It covers two separate things: <strong>this
          website</strong> (the waitlist) and <strong>the Mini Brief browser
          extension</strong> (the product). They are deliberately kept apart.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li>Your email content never reaches our servers. It is processed in your browser and sent only to the AI provider that generates your results. We do not receive or store it.</li>
          <li>Using the extension requires a Mini Brief account. We store the account details needed to run the product (described below) — never the contents of your email.</li>
          <li>The extension contains no analytics, telemetry, or behavioral tracking. It does not &ldquo;phone home&rdquo; with what you read.</li>
          <li>We do not sell, rent, or share your data for advertising. Ever.</li>
        </ul>
      </section>

      <section>
        <h2>1. This website (the waitlist)</h2>
        <p>
          If you submit the waitlist form, we collect the email address you
          enter, the part of the page you submitted from, your browser&rsquo;s
          user-agent string, and the time of submission. We use this only to:
        </p>
        <ul>
          <li>send you a confirmation and a single notification when Mini Brief launches; and</li>
          <li>prevent duplicate and abusive signups.</li>
        </ul>
        <p>
          Waitlist entries are stored with our database provider and emails are
          delivered through our email provider (see <strong>Service
          providers</strong> below). We keep waitlist data until launch and a
          reasonable period afterward, or until you ask us to delete it,
          whichever comes first. This site sets no advertising or analytics
          cookies and runs no third-party trackers.
        </p>
      </section>

      <section>
        <h2>2. The Mini Brief extension</h2>
        <p>
          The extension reads your inbox <strong>inside your browser</strong> to
          produce summaries, drafts, and triage. Using it requires a Mini Brief
          account, and we operate a backend for that account. Your email content
          is never sent to that backend — it is handled in your browser and sent
          only to the AI provider, as described next.
        </p>
        <h3>Your Mini Brief account</h3>
        <p>
          To use the extension you create an account. On our backend we store
          the data needed to operate it: your account identifier and
          authentication details, your settings and preferences (such as your
          VIP list), and your plan or licensing status. We use this only to
          authenticate you, sync your settings across devices, and provide the
          service. <strong>Your account never contains the contents of your
          emails.</strong>
        </p>
        <h3>What is sent for AI processing</h3>
        <p>
          To generate AI output, a limited amount of content is sent directly
          from your browser to our AI provider, Anthropic. The amount depends
          on the feature:
        </p>
        <ul>
          <li><strong>Triage, classification, briefings, VIP and meeting prep:</strong> the subject line and a short preview snippet only.</li>
          <li><strong>Reply drafting and summarization:</strong> the relevant email body, which is needed for the feature to work. These are opt-in actions you trigger.</li>
          <li><strong>Tone check:</strong> the draft text you wrote and asked us to check.</li>
        </ul>
        <p>
          This content is sent solely to generate the response you requested.
          We do not store it, and our backend never receives it. Anthropic
          processes the request under its own terms; we encourage you to review{" "}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Anthropic&rsquo;s privacy policy</a>.
        </p>
        <h3>What stays on your device</h3>
        <p>
          Email parsing and AI prompts are built in your browser. Any local
          cache and (if you choose to add one) your own API key stay in your
          browser&rsquo;s local extension storage. Uninstalling the extension
          removes this local data; account data on our backend persists until
          you ask us to delete it.
        </p>
      </section>

      <section>
        <h2>3. Service providers</h2>
        <p>We rely on a small number of third parties, each for a narrow purpose:</p>
        <ul>
          <li><strong>Anthropic</strong> — processes the limited email content described above to generate AI results.</li>
          <li><strong>Our application backend</strong> — stores your account, settings, and licensing status; it never receives your email content.</li>
          <li><strong>Resend</strong> — delivers the waitlist confirmation and launch emails.</li>
          <li><strong>Supabase</strong> — stores waitlist signups.</li>
          <li><strong>Our hosting provider</strong> — serves this website and may process standard server request logs for security and reliability.</li>
        </ul>
      </section>

      <section>
        <h2>4. Your choices and rights</h2>
        <ul>
          <li>You can simply not submit the waitlist form.</li>
          <li>You can ask us to access or delete your waitlist data, or your account data, at any time by emailing <a href="mailto:privacy@minibrief.ai">privacy@minibrief.ai</a>.</li>
          <li>You can uninstall the extension, which removes its local data from your browser; contact us to delete the account itself.</li>
        </ul>
        <p>
          Depending on where you live (for example, under GDPR or CCPA), you
          may have additional rights to access, correct, or delete personal
          data. Contact us and we will honor applicable requests.
        </p>
      </section>

      <section>
        <h2>5. Children</h2>
        <p>
          Mini Brief is intended for working professionals and is not directed
          to children. We do not knowingly collect data from anyone under 16.
        </p>
      </section>

      <section>
        <h2>6. Changes</h2>
        <p>
          We may update this policy as the product evolves. Material changes
          will be reflected by the &ldquo;Last updated&rdquo; date above, and
          the current version will always be posted here.
        </p>
      </section>
    </LegalShell>
  );
}
