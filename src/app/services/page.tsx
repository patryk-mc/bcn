import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, Diamond, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { services } from "@/lib/site";

export const metadata: Metadata = {
    title: "Services · Home, Company & UHNW Lifestyle",
  description: "Three services. One promise. Home cleaning, company cleaning, and discreet UHNW lifestyle management in Barcelona.",
};

const ICONS = {
  sparkles: Sparkles,
  "building-2": Building2,
  diamond: Diamond,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Three services. <span className="text-accent-gold italic font-light">One promise.</span>
          </>
        }
        description={
          <>
            Home cleaning for residences. Office cleaning for businesses. Discreet lifestyle management for UHNW clients. Every quote is free, because every home is different.
          </>
        }
        videoSrc="/videos/linkedin-feb.mp4"
        imageSrc="/photos/lifestyle-9.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-2xl text-base font-semibold shadow-[0_18px_40px_-12px_rgba(28,59,111,0.55)] hover:shadow-[0_22px_50px_-12px_rgba(28,59,111,0.7)] transition-all"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${"+34604264911".replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass border border-primary/20 text-primary text-base font-semibold hover:bg-white transition-all"
          >
            WhatsApp us
          </a>
        </div>
      </PageHero>

      {/* Three service blocks, full-width, alternating */}
      <section className="bg-white">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
          const reversed = i % 2 === 1;
          const isGold = s.color === "gold";
          return (
            <div key={s.slug} className="border-b border-outline-variant/40 last:border-0">
              <div className="mx-auto max-w-[var(--container-max)] px-6 py-20 md:py-28">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Video panel */}
                  <Reveal className="lg:col-span-7">
                    <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden clean-elevation bg-primary">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={s.poster}
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={s.heroVideo} type="video/mp4" />
                      </video>
                      {/* Soft corner gradient for legibility of bottom badge */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
                      <div className={`absolute top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${isGold ? "bg-accent-gold" : "bg-primary"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                        <span className="text-xs uppercase tracking-[0.16em] font-semibold opacity-90">
                          {s.eyebrow}
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  {/* Copy panel */}
                  <Reveal delay={0.1} className="lg:col-span-5">
                    <p className={`text-eyebrow mb-3 ${isGold ? "text-accent-gold" : "text-accent-gold"}`}>
                      {`0${i + 1}`} · {s.eyebrow}
                    </p>
                    <h2 className="text-display text-primary text-3xl md:text-5xl mb-5 text-balance leading-[1.05]">
                      {s.title}
                    </h2>
                    <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                      {s.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {s.bullets.slice(0, 4).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-on-surface-variant">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/services/${s.slug}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isGold
                            ? "bg-accent-gold text-white hover:brightness-110"
                            : "bg-primary text-white hover:bg-primary-container"
                        } shadow-lg`}
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/contact?topic=${s.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                      >
                        Get a free quote
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quote emphasis band */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="w-full h-full object-cover"
          >
            <source src="/videos/linkedin-apr.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/85" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-eyebrow text-accent-gold-soft mb-3">No two homes are the same</p>
          <h2 className="text-display text-white text-3xl md:text-5xl text-balance mb-5 leading-[1.05]">
            Every quote is free. Every quote is yours.
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Tell us the property, the schedule and the priorities. We will come back with a tailored proposal, usually within one working day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent-gold text-white font-semibold shadow-2xl hover:brightness-110 transition-all"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
