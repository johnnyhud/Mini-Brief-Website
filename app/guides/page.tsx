import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { siteGuides } from "@/lib/site-guides";

export const metadata: Metadata = {
  title: "Guides — MiniBrief",
  description: "Guides from MiniBrief.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  if (siteGuides.length === 0) notFound();
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
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">Guides</h1>
            <ul className="mt-12 space-y-10">
              {siteGuides.map((guide) => (
                <li key={guide.slug}>
                  <h2 className="text-2xl font-medium tracking-[-0.03em]">
                    <Link href={`/guides/${guide.slug}`} className="hover:underline hover:underline-offset-4">
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#475569] sm:text-lg">{guide.description}</p>
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
