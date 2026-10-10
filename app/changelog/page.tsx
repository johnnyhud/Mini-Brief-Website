import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { pageMetadata } from "@/lib/seo";
import { siteChangelog } from "@/lib/site-changelog";

const base = pageMetadata({
  title: "Changelog — MiniBrief",
  description: "What's new in MiniBrief.",
  path: "/changelog",
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, types: { "application/rss+xml": "/changelog/rss.xml" } },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
  return (
    <div data-page="light" className="flex min-h-screen flex-col bg-white text-brand-ink">
      <header className="border-b border-brand-ink/[0.06]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <TextLink href="/" className="inline-flex min-h-11 items-center">
            Back to home
          </TextLink>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Section>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">Changelog</h1>
            <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">What&apos;s new in MiniBrief.</p>
            <ul className="mt-12 space-y-12">
              {siteChangelog.map((entry) => (
                <li key={entry.slug} id={entry.slug}>
                  <p className="text-sm text-[#64748b]">
                    <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  </p>
                  <h2 className="mt-1 text-2xl font-medium tracking-[-0.03em]">{entry.title}</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#475569] sm:text-lg">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
