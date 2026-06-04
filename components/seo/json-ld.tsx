const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minibrief.ai";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and contains no user input, so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Site-wide schema: who we are, the site itself, and the product.
 * Rendered once in the root layout so every page carries it.
 */
export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MiniBrief",
    url: siteUrl,
    logo: `${siteUrl}/photos/MiniBrief-Icon-Mono-Ink.png`,
    description:
      "Email intelligence for Gmail and Outlook. Catch-up reports, VIP alerts, voice-matched drafts, and one-click unsubscribe — your email is never stored on our servers.",
    email: "hello@minibrief.ai",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MiniBrief",
    url: siteUrl,
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MiniBrief",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome, Firefox",
    description:
      "An AI-powered browser extension that brings Gmail and Outlook into a single side panel with summaries, meeting briefs, action items, and triage — processed in your browser and never stored on our servers.",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "7-day free trial, then a paid subscription.",
    },
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <JsonLd data={software} />
    </>
  );
}

/**
 * FAQ schema — keep these answers in sync with components/landing/faq.tsx.
 * Plain text only (Google ignores markup inside answers).
 */
const FAQ_ENTRIES: Array<{ q: string; a: string }> = [
  {
    q: "Do I need a Mini Brief account?",
    a: "Yes. Creating an account takes about a minute and lets Mini Brief sync your settings and VIPs across devices and manage your plan. The account never stores the contents of your emails.",
  },
  {
    q: "Do you store or read my email?",
    a: "No. Your email is parsed in your browser and sent only to the AI provider that generates your results. It never reaches our servers, and Mini Brief contains no analytics, telemetry, or behavioral tracking.",
  },
  {
    q: "Which inboxes does it support?",
    a: "Gmail and Outlook today. The panel runs inside your existing webmail — there is no separate app to open.",
  },
  {
    q: "Do I need to bring my own AI key?",
    a: "No. Mini Brief works with a built-in model from the moment you sign in. Power users can optionally add their own Anthropic API key in Settings, but it is not required.",
  },
  {
    q: "Does the AI train on my email?",
    a: "Email content is sent only to Anthropic to generate the response you asked for. Per Anthropic's API terms, inputs sent through the API are not used to train its models.",
  },
  {
    q: "When does it launch, and what will it cost?",
    a: "Mini Brief is launching soon for Chrome and Firefox. Pricing will be announced before launch — join the waitlist and you'll be the first to hear, with no other emails in between.",
  },
];

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return <JsonLd data={data} />;
}
