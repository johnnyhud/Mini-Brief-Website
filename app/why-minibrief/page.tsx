import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { why, whyMetadata } from "@/content/why";

export const metadata: Metadata = {
  title: whyMetadata.title,
  description: whyMetadata.description,
  alternates: { canonical: "/why-minibrief" },
};

export default function WhyMiniBriefPage() {
  return (
    <div
      data-page="light"
      className="flex min-h-screen flex-col bg-white text-brand-ink"
    >
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
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">
              {why.h1}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#475569]">
              {why.intro}
            </p>
            <div className="mt-12 space-y-10">
              {why.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-medium tracking-[-0.03em]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#475569] sm:text-lg">
                    {section.body}
                    {"note" in section ? ` ${section.note}` : null}
                  </p>
                </section>
              ))}
            </div>
            <p className="mt-14 border-t border-brand-ink/10 pt-8 text-lg leading-relaxed text-brand-ink">
              {why.closing}
            </p>
            <a
              href={why.cta.href}
              className="landing-action mt-6 inline-flex min-h-12 items-center justify-center gap-5 rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-blue-hover"
            >
              {why.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
