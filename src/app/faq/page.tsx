import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ · Answers for expat & UHNW households in Barcelona",
  description:
    "Answers to the questions expats and UHNW families in Barcelona ask us most, from settling into a new home to discreet household and lifestyle management.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title={
          <>
            The questions we hear <span className="text-accent-gold italic font-light">most</span>.
          </>
        }
        description="From settling into a new home to discreet, fully-managed household support, here is what expat and UHNW families in Barcelona ask us most."
        imageSrc="/photos/lifestyle-7.jpg"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="sr-only">Frequently asked questions</h2>
          <Reveal>
            <FaqAccordion items={faqs} defaultOpen={null} />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-6 text-center">
          <h2 className="text-display text-3xl md:text-4xl mb-4 text-balance">
            Still have a question?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Tell us about your home and what you need. We&apos;ll come back with a tailored answer, usually within one working day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent-gold text-white font-semibold shadow-lg hover:brightness-110 transition-all"
            >
              Get a free quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
