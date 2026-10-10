import { faq, metadata } from "@/content/home";
import { CONTACT_EMAIL, LINKEDIN_URL, WORDMARK } from "@/lib/brand";
import { faqPage } from "@/lib/faq-schema";
import { siteUrl } from "@/lib/seo";

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
    "@id": `${siteUrl}/#organization`,
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

/** SoftwareApplication schema for the home page. Deliberately no offers, price or ratings. */
export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: WORDMARK,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description: metadata.description,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
  return <JsonLd data={data} />;
}

/** FAQ schema, from the same array the FAQ section renders. Plain text only. */
export function FaqJsonLd() {
  return <JsonLd data={faqPage(faq.items)} />;
}

/** Breadcrumb trail as BreadcrumbList. Paths are site-relative; they are made absolute here. */
export function BreadcrumbJsonLd({ items }: { items: ReadonlyArray<{ name: string; path: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
  return <JsonLd data={data} />;
}

/** FAQ schema for a guide, from the same entries the article renders. Plain text only. */
export function GuideFaqJsonLd({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return <JsonLd data={faqPage(items)} />;
}
