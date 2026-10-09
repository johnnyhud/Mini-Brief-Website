import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import type { GuideBlock } from "@/lib/guides";
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
  return {
    title: `${guide.title} — MiniBrief`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
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
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">{guide.title}</h1>
            <p className="mt-4 text-sm text-[#475569]">
              <time dateTime={guide.date}>{guide.date}</time>
            </p>
            <div className="mt-8">
              {guide.body.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </div>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
