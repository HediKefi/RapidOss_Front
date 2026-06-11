import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a quote — RAPIDOSS",
  description:
    "Tell us what you ship and where. Costed proposal and onboarding date within 48 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="04"
        kicker="Open a lane"
        title="Get a quote"
        lede="Five fields, two minutes. A lane engineer — a human one — replies with real numbers within 48 hours."
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.6fr] md:py-28">
        <Reveal>
          <div className="space-y-10 md:sticky md:top-28">
            <div>
              <h2 className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {[
                  ["T+0H", "Your request lands on the dispatch desk — not in a CRM queue."],
                  ["T+24H", "A lane engineer calls to walk your flows and constraints."],
                  ["T+48H", "Costed proposal with committed SLAs and an onboarding date."],
                ].map(([t, body]) => (
                  <li key={t} className="flex gap-4 border-l-2 border-edge pl-4 transition-colors hover:border-volt">
                    <span className="shrink-0 font-mono text-xs font-semibold text-volt">{t}</span>
                    <span className="text-sm leading-relaxed text-ash">{body}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-edge bg-panel p-6 clip-tag">
              <p className="font-mono text-[10px] tracking-[0.3em] text-volt uppercase">
                Urgent freight?
              </p>
              <p className="mt-3 text-sm text-ash">
                Skip the form. The dispatch desk answers around the clock.
              </p>
              <p className="mt-4 font-mono text-lg font-semibold tracking-wider text-bone">
                +33 1 84 00 26 26
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <QuoteForm />
        </Reveal>
      </div>
    </>
  );
}
