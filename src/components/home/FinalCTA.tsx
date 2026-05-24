"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal, FloatingBubbles, MagneticHover } from "@/components/Motion";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background video, premium aerial villas */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/photos/lifestyle-9.jpg"
          aria-hidden
          className="w-full h-full object-cover scale-105"
        >
          <source src="/videos/linkedin-apr.mp4" type="video/mp4" />
        </video>
        {/* Lighter veil so the aerial is unmistakable */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/30 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
      </div>

      <FloatingBubbles count={6} className="z-0 opacity-35" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 text-center">
        <Reveal>
          <p className="text-eyebrow text-accent-gold-soft mb-4">Ready when you are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-display text-white text-4xl md:text-6xl lg:text-7xl text-balance mb-6 leading-[1.05]">
            Reclaim your time.
            <br />
            <span className="text-accent-gold-soft italic font-light">Enjoy Barcelona.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join the international community who trust BCN Ideal Services for the people they invite into their homes.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticHover>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-accent-gold text-white px-8 py-4 rounded-2xl text-base font-semibold shadow-2xl hover:brightness-110 transition-all"
              >
                Get a free quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticHover>
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white text-base font-semibold backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
