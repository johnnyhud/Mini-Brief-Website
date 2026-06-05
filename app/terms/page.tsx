import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service — MiniBrief",
  description:
    "The terms for using the MiniBrief website, waitlist, and browser extension.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 3, 2026">
      <section>
        <p>
          These terms govern your use of MiniBrief — the website, the waitlist,
          and the MiniBrief browser extension. By using any of them, you agree
          to these terms and to our <a href="/privacy">Privacy Policy</a>. If
          you do not agree, please do not use MiniBrief.
        </p>
      </section>

      <section>
        <h2>1. What MiniBrief is</h2>
        <p>
          MiniBrief is an AI-powered browser extension that brings your Gmail
          and Outlook email, together with your Google Calendar, into a single
          side panel and uses AI to generate summaries, meeting briefs, action
          items, and triage. We may add, change, or remove features over time.
        </p>
      </section>

      <section>
        <h2>2. Eligibility, accounts, and license</h2>
        <p>
          You must be at least 16 years old and able to form a binding contract
          to use MiniBrief. By using MiniBrief, you represent that you meet
          these requirements.
        </p>
        <p>
          Using the extension requires a MiniBrief account. We grant you a
          personal, revocable, non-exclusive, non-transferable license to use
          the extension for its intended purpose. You are responsible for
          keeping your credentials secure and for activity under your account.
          You agree not to reverse engineer, resell, or misuse the extension,
          and not to use it to violate the terms of your email provider or any
          law.
        </p>
      </section>

      <section>
        <h2>3. Connected accounts</h2>
        <p>
          To work, MiniBrief connects to your Google and/or Microsoft accounts
          with your permission, as described in our{" "}
          <a href="/privacy">Privacy Policy</a>. You may revoke that access at
          any time.
        </p>
      </section>

      <section>
        <h2>4. Subscriptions and billing</h2>
        <p>Some features require a paid subscription.</p>
        <ul>
          <li>
            New users may begin with a <strong>7-day free trial</strong>. You
            will not be charged during the trial, and you may cancel before it
            ends to avoid being charged.
          </li>
          <li>
            After the trial, your subscription begins and is billed in advance
            on a recurring basis through our payment processor,{" "}
            <strong>Stripe</strong>, and renews automatically until you cancel.
          </li>
          <li>
            You can cancel at any time, effective at the end of the current
            billing period.
          </li>
          <li>Except where required by law, fees are non-refundable once charged.</li>
          <li>Prices may change with notice.</li>
        </ul>
      </section>

      <section>
        <h2>5. Acceptable use</h2>
        <p>
          You agree not to: submit other people&rsquo;s data without
          permission; attempt to disrupt, overload, or gain unauthorized access
          to MiniBrief or its providers; or use MiniBrief for any unlawful or
          abusive purpose.
        </p>
      </section>

      <section>
        <h2>6. AI-generated content</h2>
        <p>
          Summaries, briefs, action items, and triage categories are generated
          by AI and may be incomplete or inaccurate. They are meant to assist
          you, not replace your own review. Do not rely on AI output for
          decisions requiring accuracy without checking the underlying messages
          yourself.
        </p>
      </section>

      <section>
        <h2>7. Fair use</h2>
        <p>
          To keep the Service reliable and affordable for everyone, AI features
          are subject to a fair-use limit of 120 AI requests per user per day.
          We may adjust this limit, and we may throttle, suspend, or limit
          accounts that materially exceed normal individual use or that attempt
          to circumvent the limit.
        </p>
      </section>

      <section>
        <h2>8. Intellectual property</h2>
        <p>
          The MiniBrief name, logo, site content, and design are owned by us
          and may not be copied or reused without permission. Third-party names
          (such as Gmail, Outlook, Chrome, and Firefox) belong to their
          respective owners and are used only for description. You keep all
          rights to your own email and content; we claim no ownership of it.
        </p>
      </section>

      <section>
        <h2>9. Third-party services</h2>
        <p>
          MiniBrief relies on third-party services including Google, Microsoft,
          Anthropic, Supabase, and Stripe. Your use of those services is also
          subject to their terms, and we are not responsible for their acts or
          omissions.
        </p>
      </section>

      <section>
        <h2>10. No warranty</h2>
        <p>
          MiniBrief is provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, express or implied,
          including merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the service will be
          uninterrupted, error-free, or secure, or that AI output will be
          accurate.
        </p>
      </section>

      <section>
        <h2>11. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, MiniBrief and its operators
          will not be liable for any indirect, incidental, special, or
          consequential damages, or any loss of data, profits, or revenue,
          arising from your use of or inability to use MiniBrief. Our total
          liability for any claim will not exceed the greater of the amount you
          paid us in the 12 months before the claim or US $100.
        </p>
      </section>

      <section>
        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless MiniBrief and its operators
          from any claims, losses, liabilities, damages, and expenses
          (including reasonable legal fees) arising out of or related to your
          misuse of MiniBrief, your violation of these terms or any law, your
          infringement of any third party&rsquo;s rights, or any data or
          content you submit through MiniBrief.
        </p>
      </section>

      <section>
        <h2>13. Termination</h2>
        <p>
          You may stop using MiniBrief and disconnect your accounts at any time.
          We may suspend or terminate access if you violate these terms or to
          protect the service or other users. Sections that by their nature
          should survive termination (intellectual property, disclaimers,
          limitation of liability, indemnification, dispute resolution, and the
          general terms below) will continue to apply.
        </p>
      </section>

      <section>
        <h2>14. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of New York, United
          States, without regard to its conflict-of-laws rules. Subject to the
          dispute-resolution section below, any disputes will be resolved in the
          state and federal courts located in the State of New York, unless
          applicable law requires otherwise.
        </p>
      </section>

      <section>
        <h2>15. Dispute resolution; arbitration and class-action waiver</h2>
        <p>
          <em>
            Please read this section carefully — it affects how disputes are
            resolved and limits your right to sue in court or participate in a
            class action.
          </em>
        </p>
        <p>
          Except as set out below, you and MiniBrief agree to resolve any
          dispute arising out of or relating to these terms or MiniBrief through
          final and binding individual arbitration, rather than in court,
          governed by the Federal Arbitration Act. You and MiniBrief waive any
          right to a jury trial and agree that disputes will be brought only in
          an individual capacity, and not as a plaintiff or class member in any
          class, consolidated, or representative proceeding.
        </p>
        <p>
          This does not apply to: claims that qualify for small-claims court, or
          requests for injunctive or equitable relief to stop infringement or
          misuse of intellectual property. You may opt out of this arbitration
          agreement by emailing{" "}
          <a href="mailto:legal@minibrief.app">legal@minibrief.app</a> within 30
          days of first accepting these terms; opting out will not affect the
          other terms. Where applicable law prohibits binding arbitration or a
          class-action waiver, this section does not apply to you to that
          extent.
        </p>
      </section>

      <section>
        <h2>16. General</h2>
        <p>
          These terms, together with our{" "}
          <a href="/privacy">Privacy Policy</a>, are the entire agreement
          between you and MiniBrief and supersede any prior understandings. If
          any provision is found unenforceable, the rest will remain in full
          force, and the unenforceable provision will be applied to the maximum
          extent permitted. Our failure to enforce any provision is not a waiver
          of it. You may not assign or transfer these terms without our consent;
          we may assign them, for example as part of a merger, acquisition, or
          sale of assets, with notice to you.
        </p>
      </section>

      <section>
        <h2>17. Changes and contact</h2>
        <p>
          We may update these terms as the product develops; the &ldquo;Last
          updated&rdquo; date above will change accordingly. Questions can be
          sent to <a href="mailto:legal@minibrief.app">legal@minibrief.app</a>.
        </p>
      </section>
    </LegalShell>
  );
}
