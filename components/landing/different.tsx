import { different } from "@/content/home";
import { InlineCta } from "./inline-cta";
import { Container } from "./section";

const principles = [
  {
    title: "One brief. Both inboxes.",
    body: "Gmail and Outlook, side by side. MiniBrief brings your connected mailboxes into one brief, so you have one place to start.",
    detail: "Your work, brought together",
  },
  {
    title: "Your voice, when you choose.",
    body: "Drafts can learn from your own sent mail when you turn it on. A head start on the reply, with the words still yours to review.",
    detail: "Personalization is your call",
  },
  {
    title: "Keep both sides of a promise.",
    body: "The Promise Ledger tracks what you owe and what you’re waiting on. Commitments in both directions, kept in view.",
    detail: "Follow through with less effort",
  },
  {
    title: "Less context, by default.",
    body: "Sorting sends a subject line and about 120 preview characters to the AI. Full text is sent only for features you use on an opened message, capped in length.",
    detail: "A deliberate limit on data",
  },
] as const;

export function Different() {
  return (
    <section
      aria-labelledby="different-heading"
      className="bg-[#F5F5F7] py-20 text-[#07091A] md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#3A5FDC]">
              {different.eyebrow}
            </p>
            <h2
              id="different-heading"
              className="mt-6 max-w-3xl text-[clamp(2.25rem,4.3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.045em]"
            >
              Built around your day.
              <br />
              <span className="text-[#475569]">And your boundaries.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#475569] lg:pb-1">
            A useful assistant should fit the way you work. That means a clearer
            view of your inbox, a little less to remember, and control over what
            you share.
          </p>
        </div>

        <ul
          role="list"
          className="mt-12 grid list-none border-b border-[#07091A]/10 sm:mt-16 md:grid-cols-2"
        >
          {principles.map((principle) => (
            <li
              key={principle.title}
              className="border-t border-[#07091A]/10 py-8 md:py-10 md:odd:pr-10 md:even:border-l md:even:pl-10 lg:odd:pr-14 lg:even:pl-14"
            >
              <h3 className="max-w-lg text-[25px] font-medium leading-tight tracking-[-0.035em] sm:text-[29px]">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-[1.8] text-[#475569] sm:text-base">
                {principle.body}
              </p>
              <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.13em] text-[#475569]">
                {principle.detail}
              </p>
            </li>
          ))}
        </ul>
        <InlineCta className="mt-10" />
      </Container>
    </section>
  );
}
