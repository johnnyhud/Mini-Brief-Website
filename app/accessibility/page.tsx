import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Accessibility — MiniBrief",
  description:
    "Mini Brief's commitment to building an accessible website and product.",
};

export default function AccessibilityPage() {
  return (
    <LegalShell title="Accessibility" updated="May 15, 2026">
      <section>
        <p>
          We want Mini Brief to be usable by everyone, including people who
          rely on assistive technology. We are working toward conformance with
          the{" "}
          <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">
            Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
          </a>
          .
        </p>
      </section>

      <section>
        <h2>What we have done</h2>
        <ul>
          <li>Semantic HTML structure with a logical heading order and landmark regions.</li>
          <li>Full keyboard operability, with visible focus indicators on interactive elements.</li>
          <li>Respect for the operating system &ldquo;reduce motion&rdquo; setting — animations are minimized or removed when it is enabled.</li>
          <li>Restrained, low-motion visual design with attention to text color contrast.</li>
          <li>Text alternatives for meaningful images and descriptive labels for controls.</li>
        </ul>
      </section>

      <section>
        <h2>Known limitations</h2>
        <p>
          This is a pre-launch site under active development. The animated
          product preview is illustrative and primarily decorative; the
          information it shows is also described in the surrounding text. If
          you encounter any element that is difficult to use, we want to hear
          about it.
        </p>
      </section>

      <section>
        <h2>Giving feedback</h2>
        <p>
          If you run into an accessibility barrier on this site, please email{" "}
          <a href="mailto:accessibility@minibrief.app">accessibility@minibrief.app</a>{" "}
          with the page and a short description of the problem. We treat
          accessibility issues as priority fixes and will respond as quickly as
          we can.
        </p>
      </section>
    </LegalShell>
  );
}
