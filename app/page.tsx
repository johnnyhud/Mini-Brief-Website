import { AtAGlance } from "@/components/landing/at-a-glance";
import { Comparison } from "@/components/landing/comparison";
import { CtaSection } from "@/components/landing/cta-section";
import { DemoVideo } from "@/components/landing/demo-video";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { FounderNote } from "@/components/landing/founder-note";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { IntroSplash } from "@/components/landing/intro-splash";
import { Nav } from "@/components/landing/nav";
import { NewsletterProvider } from "@/components/landing/newsletter-dialog";
import { OutcomeBand } from "@/components/landing/outcome-band";
import { Privacy } from "@/components/landing/privacy";
import { Showcase } from "@/components/landing/showcase";
import { TrustBand } from "@/components/landing/trust-band";
import { VideoProvider } from "@/components/landing/video-dialog";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <NewsletterProvider>
      <VideoProvider>
        <FaqJsonLd />
        <IntroSplash />
        <div className="site-backdrop" aria-hidden="true" />

        <main className="relative min-h-screen flex flex-col">
          <Nav />
          <Hero />
          <OutcomeBand />
          <AtAGlance />
          <TrustBand />
          <Comparison />
          <Showcase />
          <Features />
          <DemoVideo />
          <HowItWorks />
          <Privacy />
          <FounderNote />
          <Faq />
          <CtaSection />
          <Footer />
        </main>
      </VideoProvider>
    </NewsletterProvider>
  );
}
