import { whoItsFor } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function WhoItsFor() {
  return (
    <Section
      id="who-its-for"
      className="border-t border-brand-ink/10 bg-white text-[#07091A]"
    >
      <SectionHeader eyebrow={whoItsFor.eyebrow} title={whoItsFor.h2} tone="light" />
      <ul role="list" className="mt-12 grid list-none gap-4 md:grid-cols-3">
        {whoItsFor.cards.map((card) => (
          <li
            key={card.title}
            className="rounded-2xl border border-brand-ink/10 bg-[#F5F5F7] p-6 sm:p-7"
          >
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-[#07091A]">
              {card.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">
              {card.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
