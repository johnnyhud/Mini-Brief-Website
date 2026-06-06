import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — MiniBrief",
  description:
    "How MiniBrief handles your data. Your email is processed in your browser and never stored on our servers; the waitlist collects only the email you submit.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 3, 2026">
      <section>
        <p>
          MiniBrief is built so that we hold as little of your data as
          possible. This policy explains, in plain terms, exactly what is and
          is not collected. It covers two separate things: <strong>this
          website</strong> (the waitlist) and <strong>the MiniBrief browser
          extension</strong> (the product). They are deliberately kept apart.
          See also our <a href="/terms">Terms of Service</a>.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li>Your email content never reaches our servers. It is processed in your browser and sent only to the AI provider that generates your results. We do not receive or store it.</li>
          <li>Using the extension requires a MiniBrief account. We store the account details needed to run the product — never the contents of your email.</li>
          <li>The extension contains no analytics, telemetry, or behavioral tracking.</li>
          <li>We do not sell, rent, or share your data for advertising. Ever.</li>
          <li>We never use your email content to train any AI model.</li>
        </ul>
      </section>

      <section>
        <h2>1. This website (the waitlist)</h2>
        <p>
          If you submit the waitlist form, we collect the email address you
          enter, the part of the page you submitted from, your browser&rsquo;s
          user-agent string, and the time of submission. We use this only to
          send you a confirmation and a single launch notification, and to
          prevent duplicate or abusive signups. Waitlist entries are stored
          with our database provider and emails are delivered through our email
          provider (see <strong>Service providers</strong>). We keep waitlist
          data until launch and a reasonable period afterward, or until you ask
          us to delete it. This site sets no advertising or analytics cookies
          and runs no third-party trackers.
        </p>
      </section>

      <section>
        <h2>2. The MiniBrief extension</h2>
        <p>
          The extension reads your inbox <strong>inside your browser</strong> to
          produce summaries, drafts, and triage. Using it requires a MiniBrief
          account, and we operate a backend for that account. Your email content
          is never sent to that backend — it is handled in your browser and sent
          only to the AI provider, as described below.
        </p>

        <h3>Permissions we request</h3>
        <p>
          When you connect a Google or Microsoft account, we request only the
          access needed to run the features you use:
        </p>
        <ul>
          <li><strong>Reading your messages</strong> — to display them and generate summaries, triage, and drafts.</li>
          <li><strong>Modifying your messages</strong> (applying or removing labels, archiving, and changing read/unread state) — to carry out the triage actions you take from the side panel.</li>
          <li><strong>Basic mailbox settings</strong> — to read the settings needed to display and organize your inbox correctly.</li>
          <li><strong>Calendar (read-only)</strong> — to build meeting prep.</li>
        </ul>
        <p>
          For Outlook we use the equivalent Microsoft Graph permissions. You can
          review and revoke this access at any time — for Google at{" "}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>,
          and for Microsoft in your account settings.
        </p>

        <h3>Your MiniBrief account</h3>
        <p>
          To use the extension you create an account. On our backend we store
          only the data needed to operate it: your account identifier and
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
          We do not store it, and our backend never receives it. We do not use
          your email content — or any Google or Microsoft user data — to train,
          develop, or improve any AI or machine-learning model, and Anthropic
          does not use data submitted through its API to train its models.
          Anthropic processes the request under its own terms; we encourage you
          to review{" "}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Anthropic&rsquo;s privacy policy</a>.
        </p>

        <h3>What stays on your device</h3>
        <p>
          Email parsing and AI prompts are built in your browser. Any local
          cache stays in your browser&rsquo;s local extension storage.
          Uninstalling the extension removes this local data; account data on
          our backend persists until you ask us to delete it.
        </p>
      </section>

      <section>
        <h2>3. Google API Services User Data Policy (Limited Use)</h2>
        <p>
          MiniBrief&rsquo;s use of information received from Google APIs adheres
          to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>,
          including the Limited Use requirements. In particular, MiniBrief:
        </p>
        <ul>
          <li>limits its use of Google user data to providing or improving the user-facing features described in this policy;</li>
          <li>does not transfer Google user data to others except as necessary to provide or improve those features, to comply with applicable law, or as part of a merger or acquisition with notice to users;</li>
          <li>does not use or transfer Google user data for advertising, including personalized or interest-based advertising;</li>
          <li>does not use Google user data to train generalized or non-personalized AI or machine-learning models, and does not transfer it for that purpose; and</li>
          <li>does not allow humans to read Google user data unless we have your affirmative consent to read specific messages, it is necessary for security or to comply with law, or the data has been aggregated and anonymized.</li>
        </ul>
      </section>

      <section>
        <h2>4. Service providers</h2>
        <p>We rely on a small number of third parties, each for a narrow purpose:</p>
        <ul>
          <li><strong>Anthropic</strong> — processes the limited email content described above to generate AI results.</li>
          <li><strong>Our application backend (Supabase)</strong> — stores your account, settings, and licensing status; it never receives your email content.</li>
          <li><strong>Resend</strong> — delivers waitlist confirmation and launch emails.</li>
          <li><strong>Stripe</strong> — processes subscription payments. We never receive or store your full card number.</li>
          <li><strong>Our hosting provider</strong> — serves this website and may process standard server request logs for security and reliability.</li>
        </ul>
      </section>

      <section>
        <h2>5. Your choices and rights</h2>
        <ul>
          <li>You can ask us to access or delete your waitlist data or account data at any time by emailing <a href="mailto:privacy@minibrief.app">privacy@minibrief.app</a>.</li>
          <li>You can uninstall the extension, which removes its local data from your browser; contact us to delete the account itself.</li>
          <li>Depending on where you live (for example, under GDPR or CCPA), you may have additional rights to access, correct, or delete personal data. Contact us and we will honor applicable requests.</li>
        </ul>
        <p>
          When you ask us to delete your account, we remove the associated data
          within 30 days, except where we are legally required to retain it.
        </p>
      </section>

      <section>
        <h2>6. Children</h2>
        <p>
          MiniBrief is intended for working professionals and is not directed
          to children. We do not knowingly collect data from anyone under 16.
        </p>
      </section>

      <section>
        <h2>7. Changes</h2>
        <p>
          We may update this policy as the product evolves. If we change how we
          use Google or Microsoft user data in a materially different way than
          disclosed here, we will notify you and, where required, ask for your
          consent before the new use takes effect. Material changes are
          reflected by the &ldquo;Last updated&rdquo; date above.
        </p>
        <p>
          Questions? Email{" "}
          <a href="mailto:privacy@minibrief.app">privacy@minibrief.app</a>.
        </p>
      </section>
    </LegalShell>
  );
}
