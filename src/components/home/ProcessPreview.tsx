"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { processSteps } from "@/lib/site";

export function ProcessPreview() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background video, half-visible behind soft veil */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/photos/interior-7.jpg"
          aria-hidden
          className="w-full h-full object-cover scale-110"
        >
          <source src="/videos/era-architects.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent-gold mb-3">How it works</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
                Five steps. Zero guesswork.
              </h2>
              <p className="text-lg text-on-surface-variant mt-4">
                The same process we&apos;ve refined with 200+ families. Tight, transparent, and built for the long term.
              </p>
            </div>
            <Link
              href="/process"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              See the full process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <ol className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Connecting line */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <motion.li
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative h-full rounded-[24px] bg-white border border-outline-variant/40 p-6 clean-elevation"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white text-headline font-semibold flex items-center justify-center text-base mb-5 ring-4 ring-background">
                  {s.n}
                </div>
                <h3 className="text-headline text-lg text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
              </motion.li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
