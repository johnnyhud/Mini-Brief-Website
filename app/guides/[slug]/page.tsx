import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/breadcrumbs";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { GuideFaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/home";
import type { GuideBlock } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
import { getSiteGuide, siteGuides } from "@/lib/site-guides";

type Params = { slug: string };

// Only the guides that exist; anything else is a 404. With zero guides this
// is an empty list, and (for the empty array) no article route is built.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return siteGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const guide = getSiteGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({
    title: `${guide.title} — MiniBrief`,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#475569] sm:text-lg">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-[#475569] sm:text-lg">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    default:
      return <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">{block.text}</p>;
  }
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const guide = getSiteGuide((await params).slug);
  if (!guide) notFound();
  const related = (guide.related ?? []).flatMap((slug) => getSiteGuide(slug) ?? []);
  return (
    <div data-page="light" className="flex min-h-screen flex-col bg-white text-brand-ink">
      <header className="border-b border-brand-ink/[0.06]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <TextLink href="/guides" className="inline-flex min-h-11 items-center">
            All guides
          </TextLink>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Section>
          <article className="max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Guides", path: "/guides" },
                { name: guide.title, path: `/guides/${guide.slug}` },
              ]}
            />
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">{guide.title}</h1>
            <p className="mt-4 text-sm text-[#475569]">
              <time dateTime={guide.date}>{guide.date}</time>
            </p>
            <div className="mt-8">
              {guide.body.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>
            {guide.faq && (
              <section aria-labelledby="guide-faq">
                <h2 id="guide-faq" className="mt-10 text-2xl font-medium tracking-[-0.03em]">
                  Questions, answered straight.
                </h2>
                <dl className="mt-4 space-y-6">
                  {guide.faq.map((item) => (
                    <div key={item.q}>
                      <dt className="text-lg font-medium">{item.q}</dt>
                      <dd className="mt-2 text-base leading-relaxed text-[#475569] sm:text-lg">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {related.length > 0 && (
              <section aria-labelledby="guide-related">
                <h2 id="guide-related" className="mt-10 text-2xl font-medium tracking-[-0.03em]">
                  Related guides
                </h2>
                <ul className="mt-4 space-y-2 text-base sm:text-lg">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <TextLink href={`/guides/${item.slug}`}>{item.title}</TextLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <p className="mt-10 text-base leading-relaxed text-[#475569] sm:text-lg">
              For what MiniBrief reads and keeps, see the <TextLink href="/security">Security page</TextLink>.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href={hero.primary.href}>{hero.primary.label}</a>
              </Button>
            </div>
          </article>
          {guide.faq && <GuideFaqJsonLd items={guide.faq} />}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
