"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Building2, Diamond } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { services } from "@/lib/site";

const ICONS = {
  sparkles: Sparkles,
  "building-2": Building2,
  diamond: Diamond,
} as const;

export function ServicesOverview() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent-gold mb-3">What we do</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
                What we do at BCN
              </h2>
              <p className="text-lg text-on-surface-variant mt-4">
                Home cleaning for residences. Office cleaning for businesses. Discreet lifestyle management for UHNW clients. Every quote is free, because every property is different.
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gold text-white font-semibold text-sm hover:brightness-110 transition-all shadow-lg"
            >
              Get a free quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
            const isGold = s.color === "gold";
            return (
              <StaggerItem key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block h-full group">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="relative h-full overflow-hidden rounded-[28px] bg-white border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-shadow"
                  >
                    {/* Video preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-primary">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={s.poster}
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      >
                        <source src={s.heroVideo} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/45 via-transparent to-primary/30" />
                      <div
                        className={`absolute top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                          isGold ? "bg-accent-gold" : "bg-primary"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="absolute top-5 right-5 text-xs uppercase tracking-[0.14em] text-white font-semibold drop-shadow">
                        {s.eyebrow}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex flex-col h-[200px]">
                      <h3 className="text-headline text-2xl text-primary mb-3">{s.title}</h3>
                      <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">
                        {s.short}
                      </p>
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                          isGold ? "text-accent-gold" : "text-primary"
                        }`}
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
