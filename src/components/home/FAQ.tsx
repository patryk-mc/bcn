import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqs } from "@/lib/site";

export function FAQ() {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center mb-12 md:mb-14">
            <p className="text-eyebrow text-accent-gold mb-3">Frequently asked questions</p>
            <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
              Questions, answered.
            </h2>
            <p className="text-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
              The things expat and UHNW households ask us most. Can&apos;t find what you need? We&apos;re a message away.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <FaqAccordion items={faqs} />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              See all FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
