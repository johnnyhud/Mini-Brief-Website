import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/breadcrumbs";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { Button } from "@/components/ui/button";
import { segmentClosing } from "@/content/for";
import { hero } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { getSiteGuide } from "@/lib/site-guides";
import { getSiteSegment, siteSegments } from "@/lib/site-segments";

type Params = { slug: string };

// Only the pages that exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return siteSegments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const segment = getSiteSegment((await params).slug);
  if (!segment) return {};
  return pageMetadata({
    title: `${segment.title} — MiniBrief`,
    description: segment.description,
    path: `/for/${segment.slug}`,
  });
}

export default async function SegmentPage({ params }: { params: Promise<Params> }) {
  const segment = getSiteSegment((await params).slug);
  if (!segment) notFound();
  const guides = segment.guides.flatMap((slug) => getSiteGuide(slug) ?? []);
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
          <article className="max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: segment.name, path: `/for/${segment.slug}` },
              ]}
            />
            <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">{segment.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#475569]">{segment.intro}</p>
            {segment.pains.map((item) => (
              <section key={item.pain}>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{item.pain}</h2>
                <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">{item.body}</p>
              </section>
            ))}
            <section aria-labelledby="segment-next">
              <h2 id="segment-next" className="mt-10 text-2xl font-medium tracking-[-0.03em]">
                Read next
              </h2>
              <ul className="mt-4 space-y-2 text-base sm:text-lg">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <TextLink href={`/guides/${guide.slug}`}>{guide.title}</TextLink>
                  </li>
                ))}
                <li>
                  <TextLink href="/how-it-works">How MiniBrief works, step by step</TextLink>
                </li>
              </ul>
            </section>
            <p className="mt-10 text-base leading-relaxed text-[#475569] sm:text-lg">
              {segmentClosing} For what MiniBrief reads and keeps, see the <TextLink href="/security">Security page</TextLink>.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href={hero.primary.href}>{hero.primary.label}</a>
              </Button>
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
