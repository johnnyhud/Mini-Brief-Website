import { faq, metadata } from "@/content/home";
import { CONTACT_EMAIL, LINKEDIN_URL, WORDMARK } from "@/lib/brand";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minibrief.app";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Static structured data with no user input, so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide schema: who we are and the site itself. Rendered once in the root layout. */
export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: WORDMARK,
    url: siteUrl,
    logo: `${siteUrl}/photos/MiniBrief-Icon-Mono-Ink.png`,
    description: metadata.description,
    email: CONTACT_EMAIL,
    sameAs: [LINKEDIN_URL],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WORDMARK,
    url: siteUrl,
  };
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}

function faqPage(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** FAQ schema, from the same array the FAQ section renders. Plain text only. */
export function FaqJsonLd() {
  return <JsonLd data={faqPage(faq.items)} />;
}

/** FAQ schema for a guide, from the same entries the article renders. Plain text only. */
export function GuideFaqJsonLd({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return <JsonLd data={faqPage(items)} />;
}
