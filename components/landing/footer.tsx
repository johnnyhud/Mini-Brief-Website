import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footer } from "@/content/home";
import { CONTACT_EMAIL, CONTACT_MAILTO, LINKEDIN_URL } from "@/lib/brand";
import { Logo } from "./logo";
import { Container } from "./section";

const heading =
  "text-[10px] font-medium uppercase tracking-[0.16em] text-[#64748b]";
const link =
  "-ml-2 inline-flex min-h-10 items-center rounded-md px-2 text-sm text-[#475569] transition-colors hover:text-[#3A5FDC]";

function LinkColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-labelledby={id}>
      <p id={id} className={heading}>
        {title}
      </p>
      <ul className="mt-4">
        {links.map((item) => (
          <li key={item.href}>
            {item.href.startsWith("/") ? (
              <Link href={item.href} className={link}>
                {item.label}
              </Link>
            ) : (
              <a href={item.href} className={link}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-brand-ink/10 bg-[#ffffff] text-[#07091A]">
      <Container className="pt-14 md:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.8fr_1fr]">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">
              {footer.tagline}
            </p>
          </div>
          <LinkColumn
            id="footer-product"
            title={footer.product.heading}
            links={footer.product.links}
          />
          <LinkColumn
            id="footer-who"
            title={footer.whoItsFor.heading}
            links={footer.whoItsFor.links}
          />
          <LinkColumn
            id="footer-legal"
            title={footer.legal.heading}
            links={footer.legal.links}
          />
          <nav
            aria-labelledby="footer-contact"
            className="col-span-2 lg:col-span-1"
          >
            <p id="footer-contact" className={heading}>
              {footer.contact.heading}
            </p>
            <ul className="mt-4">
              <li>
                <a href={CONTACT_MAILTO} className={`${link} gap-1.5`}>
                  {CONTACT_EMAIL}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link} gap-1.5`}
                >
                  {footer.contact.linkedInLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-brand-ink/10 pt-6 text-xs text-[#64748b]">
          <p>{footer.copyright}</p>
          <p>Less noise. More room for your day.</p>
        </div>
        <p
          aria-hidden="true"
          className="-mb-[0.1em] mt-8 select-none text-center text-[clamp(4rem,16.3vw,13rem)] font-semibold leading-[1.06] tracking-[-0.075em] text-[#e6eaf3]"
        >
          MiniBrief<span className="text-[#cdd6ed]">.</span>
        </p>
      </Container>
    </footer>
  );
}
