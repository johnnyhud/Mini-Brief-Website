import { Reveal } from "@/components/effects/reveal-on-scroll";

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
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
    a: "Gmail today, with Outlook coming soon. The panel runs inside your existing webmail — there is no separate app to open.",
  },
  {
    q: "Do I need to bring my own AI key?",
    a: "No. Mini Brief works with a built-in model from the moment you sign in. Power users can optionally add their own Anthropic API key in Settings, but it is not required.",
  },
  {
    q: "Does the AI train on my email?",
    a: (
      <>
        Email content is sent only to Anthropic to generate the response you
        asked for. Per Anthropic&rsquo;s API terms, inputs sent through the API
        are not used to train its models. You can review{" "}
        <a
          href="https://www.anthropic.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-b hover:underline"
        >
          Anthropic&rsquo;s privacy policy
        </a>{" "}
        for details.
      </>
    ),
  },
  {
    q: "When does it launch, and what will it cost?",
    a: "Mini Brief is launching soon for Chrome and Firefox. Pricing will be announced before launch — join the waitlist and you'll be the first to hear, with no other emails in between.",
  },
];

function Chevron() {
  return (
    <svg
      className="faq-chevron shrink-0 text-fg-3"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Faq() {
  return (
    <Reveal as="section" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        FAQ
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        Questions, answered straight.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-10 max-w-[520px] mx-auto leading-relaxed">
        The things people ask before they trust an extension with their inbox.
      </p>

      <div className="max-w-[760px] mx-auto rounded-2xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)] overflow-hidden">
        {FAQS.map((f) => (
          <details key={f.q} className="faq-item group">
            <summary className="faq-q flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none">
              <span className="font-display text-[15px] sm:text-[16px] font-semibold text-white">
                {f.q}
              </span>
              <Chevron />
            </summary>
            <div className="faq-a px-6 pb-5 -mt-1 font-body text-[14px] text-fg-2 leading-[1.7] max-w-[640px]">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
