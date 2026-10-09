import { ArrowDown, ArrowUpRight } from "lucide-react";
import { privacy } from "@/content/home";
import { Container } from "./section";

export function Privacy() {
  return (
    <section
      id={privacy.id}
      aria-labelledby="privacy-heading"
      className="relative scroll-mt-24 border-y border-[#07091A]/[0.08] bg-white py-20 text-[#07091A] md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#3A5FDC]">
              {privacy.eyebrow}
            </p>
            <h2
              id="privacy-heading"
              className="mt-6 max-w-lg text-[clamp(2.35rem,4.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em]"
            >
              Your email.
              <br />
              <span className="text-[#475569]">A smaller footprint.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-[#475569] md:text-lg">
              Our server reads the mailboxes you connect to prepare your brief.
              It keeps a rolling 90 days of metadata. Message bodies are never
              stored on our servers.
            </p>

            <dl className="mt-10 max-w-md divide-y divide-[#07091A]/10 border-y border-[#07091A]/10">
              <div className="py-6">
                <dt className="text-sm font-medium text-[#07091A]">
                  No invisible audience.
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {privacy.lines[2]}
                </dd>
              </div>
              <div className="py-6">
                <dt className="text-sm font-medium text-[#07091A]">
                  Disconnect means delete.
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {privacy.lines[3]}
                </dd>
              </div>
            </dl>

            <a
              href={privacy.link.href}
              className="group mt-7 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-medium text-[#3A5FDC] underline decoration-[#3A5FDC]/30 underline-offset-8 transition-colors hover:text-[#07091A] hover:decoration-[#07091A]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3A5FDC] motion-reduce:transition-none"
            >
              {privacy.link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
          </div>

          <figure className="min-w-0 overflow-hidden rounded-2xl border border-[#07091A]/10 bg-[#F5F5F7] shadow-[0_20px_50px_-28px_rgba(7,9,26,0.2)]">
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-[#07091A]/[0.08] px-5 py-4 sm:px-7">
              <span className="text-xs font-medium text-[#07091A]">
                Your data, step by step
              </span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#475569]">
                Mail + AI processing
              </span>
            </figcaption>

            <ol
              role="list"
              className="list-none px-5 pb-6 pt-6 sm:px-7 sm:pb-7"
            >
              <li>
                <h3 className="text-sm font-medium text-[#07091A]">
                  Your connected mailboxes
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#475569]">
                  Only the Gmail and Outlook accounts you connect.
                </p>
                <div
                  aria-hidden="true"
                  className="my-4 flex items-center gap-3 text-[#475569]"
                >
                  <ArrowDown className="size-4" />
                  <span className="h-px flex-1 bg-[#07091A]/[0.08]" />
                </div>
              </li>

              <li>
                <h3 className="mb-4 text-sm font-medium text-[#07091A]">
                  Read by the MiniBrief server
                </h3>
                <dl className="grid overflow-hidden rounded-xl border border-[#07091A]/10 bg-white sm:grid-cols-2">
                  <div className="border-b border-[#07091A]/10 p-5 sm:border-b-0 sm:border-r">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569]">
                      Metadata
                    </dt>
                    <dd>
                      <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.04em] text-[#3A5FDC]">
                        90 days
                      </p>
                      <p className="mt-2 text-xs font-medium text-[#07091A]">
                        Rolling retention
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#475569]">
                        Subjects, senders, previews, dates and what MiniBrief
                        worked out about each message.
                      </p>
                    </dd>
                  </div>
                  <div className="p-5">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#475569]">
                      Message bodies
                    </dt>
                    <dd>
                      <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.04em] text-[#07091A]">
                        Not stored
                      </p>
                      <p className="mt-2 text-xs font-medium text-[#07091A]">
                        Fetched when you open
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#475569]">
                        A message body is fetched from your mailbox when you
                        open it, and is not kept on our servers.
                      </p>
                    </dd>
                  </div>
                </dl>
                <div
                  aria-hidden="true"
                  className="my-4 flex items-center gap-3 text-[#475569]"
                >
                  <ArrowDown className="size-4" />
                  <span className="h-px flex-1 bg-[#07091A]/[0.08]" />
                </div>
              </li>

              <li>
                <h3 className="text-sm font-medium text-[#07091A]">
                  AI requests go to Anthropic
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#475569]">
                  Sorting sends a subject and about 120 preview characters. Full
                  message text is sent only for features you use on a message
                  you opened, capped in length.
                </p>
                <p className="mt-4 border-l-2 border-[#3A5FDC]/50 pl-3 text-xs leading-relaxed text-[#475569]">
                  One named provider. Anthropic&apos;s terms forbid training on
                  your data.
                </p>
              </li>
            </ol>
          </figure>
        </div>
      </Container>
    </section>
  );
}
