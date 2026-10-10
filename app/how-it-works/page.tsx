import type { Metadata } from "next";
import { ArrowUpRight, Link2, ListChecks, PenLine, ShieldCheck, Sunrise, Tags, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/landing/breadcrumbs";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/landing/logo";
import { Section } from "@/components/landing/section";
import { TextLink } from "@/components/landing/link";
import { HowToJsonLd } from "@/components/seo/json-ld";
import { howItWorksMetadata, howItWorksPage as page } from "@/content/how-it-works";
import { pageMetadata } from "@/lib/seo";

const PATH = "/how-it-works";

export const metadata: Metadata = pageMetadata({
  title: howItWorksMetadata.title,
  description: howItWorksMetadata.description,
  path: PATH,
});

// One decorative icon per step, in the same order as page.steps.
const stepIcons = [UserRound, Link2, Sunrise, Tags, PenLine, ListChecks, ShieldCheck];

export default function HowItWorksPage() {
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
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "How it works", path: PATH },
              ]}
            />
            <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl">{page.h1}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#475569]">{page.intro}</p>
            <ol role="list" className="mt-12 list-none space-y-10">
              {page.steps.map((step, index) => {
                const Icon = stepIcons[index];
                return (
                  <li key={step.title} id={`step-${index + 1}`} className="grid scroll-mt-16 grid-cols-[2.75rem_minmax(0,1fr)] gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-ink/10 bg-[#F5F5F7] text-brand-blue"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-medium tracking-[-0.03em]">
                        <span className="text-[#475569]">{index + 1}. </span>
                        {step.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-[#475569] sm:text-lg">{step.body}</p>
                      {step.links.length > 0 ? (
                        <ul className="mt-3 list-none space-y-1">
                          {step.links.map((link) => (
                            <li key={link.href}>
                              <TextLink href={link.href} className="inline-flex min-h-11 items-center">
                                {link.label}
                              </TextLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-14 border-t border-brand-ink/10 pt-8 text-lg leading-relaxed text-brand-ink">
              {page.closing}{" "}
              <TextLink href={page.closingLink.href}>{page.closingLink.label}</TextLink>
            </p>
            <a
              href={page.cta.href}
              className="landing-action mt-6 inline-flex min-h-12 items-center justify-center gap-5 rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-blue-hover"
            >
              {page.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Section>
      </main>
      <Footer />
      <HowToJsonLd
        name={howItWorksMetadata.title}
        description={howItWorksMetadata.description}
        path={PATH}
        steps={page.steps}
      />
    </div>
  );
}
