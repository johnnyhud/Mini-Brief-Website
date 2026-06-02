import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service — MiniBrief",
  description:
    "The terms for using the Mini Brief website and waitlist ahead of launch.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="May 15, 2026">
      <section>
        <p>
          These terms govern your use of the Mini Brief website and the
          pre-launch waitlist. By using this site or joining the waitlist, you
          agree to them. If you do not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2>1. What this site is</h2>
        <p>
          Today, this site is an informational page and a waitlist for a
          browser extension that has not yet launched. Joining the waitlist
          does not create an account, guarantee access, or guarantee that the
          product will ship on any particular date, or at all. Descriptions of
          features reflect current plans and may change before launch.
        </p>
      </section>

      <section>
        <h2>2. The extension, once available</h2>
        <p>
          When the Mini Brief extension is released, using it will require a
          Mini Brief account, and we will grant you a personal, revocable,
          non-exclusive, non-transferable license to use it for its intended
          purpose. You are responsible for keeping your account credentials
          secure. You agree not to reverse engineer, resell, or misuse the
          extension, and not to use it to violate the terms of your email
          provider or any law.
        </p>
      </section>

      <section>
        <h2>3. Acceptable use</h2>
        <p>When using this site you agree not to:</p>
        <ul>
          <li>submit other people&rsquo;s email addresses without their permission;</li>
          <li>attempt to disrupt, overload, or gain unauthorized access to the site or its providers; or</li>
          <li>use the site for any unlawful or abusive purpose.</li>
        </ul>
      </section>

      <section>
        <h2>4. Intellectual property</h2>
        <p>
          The Mini Brief name, logo, site content, and design are owned by us.
          You may not copy or reuse them without permission. Third-party names
          (such as Gmail, Outlook, Chrome, and Firefox) belong to their
          respective owners and are used only for description.
        </p>
      </section>

      <section>
        <h2>5. Third-party services</h2>
        <p>
          The site and product rely on third-party services described in our{" "}
          <a href="/privacy">Privacy Policy</a>. Their availability and terms
          are outside our control, and we are not responsible for their acts
          or omissions.
        </p>
      </section>

      <section>
        <h2>6. No warranty</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, whether express or
          implied, including fitness for a particular purpose. We do not
          warrant that the site will be uninterrupted, error-free, or secure.
        </p>
      </section>

      <section>
        <h2>7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Mini Brief and its operators
          will not be liable for any indirect, incidental, or consequential
          damages arising from your use of, or inability to use, the site or
          waitlist.
        </p>
      </section>

      <section>
        <h2>8. Changes and contact</h2>
        <p>
          We may update these terms as the product develops; the
          &ldquo;Last updated&rdquo; date above will change accordingly. The
          governing law and jurisdiction for these terms will be confirmed
          before launch. Questions can be sent to{" "}
          <a href="mailto:legal@minibrief.ai">legal@minibrief.ai</a>.
        </p>
      </section>
    </LegalShell>
  );
}
