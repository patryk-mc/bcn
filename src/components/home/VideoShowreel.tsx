"use client";

import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem, Parallax } from "@/components/Motion";

/**
 * Replaces the old "All Services" grid with an animated video showreel
 * showcasing BCN team work in action. Pulls directly from the brand video reel.
 */
/**
 * Bento layout math (8 cols × 3 rows = 24 cells):
 *
 *   Row 1: [   tile 01 (5×2)   ][ tile 02 (3×1) ]
 *   Row 2: [   tile 01 cont    ][ tile 03 (3×1) ]
 *   Row 3: [ tile 04 (4×1) ][ tile 05 (4×1)    ]
 *
 * Spans must sum to exactly 24, otherwise tiles wrap and collapse.
 */
const tiles = [
  {
    src: "/videos/linkedin-apr.mp4",
    poster: "/photos/lifestyle-9.jpg",
    label: "Aerial · UHNW properties",
    eyebrow: "Prestige",
    span: "lg:col-span-5 lg:row-span-2",
  },
  {
    src: "/videos/ad-1.mp4",
    poster: "/photos/interior-4.jpg",
    label: "Private villa · pool",
    eyebrow: "Residence",
    span: "lg:col-span-3 lg:row-span-1",
  },
  {
    src: "/videos/era-architects.mp4",
    poster: "/photos/interior-2.jpg",
    label: "Designer interiors",
    eyebrow: "Spaces",
    span: "lg:col-span-3 lg:row-span-1",
  },
  {
    src: "/videos/office.mp4",
    poster: "/photos/team-work.jpg",
    label: "Office cleaning",
    eyebrow: "Business",
    span: "lg:col-span-4 lg:row-span-1",
  },
  {
    src: "/videos/ad-nov-7.mp4",
    poster: "/photos/cleaning-1.jpg",
    label: "Turnover detail",
    eyebrow: "Field",
    span: "lg:col-span-4 lg:row-span-1",
  },
];

export function VideoShowreel() {
  return (
    <section className="relative py-28 md:py-36 bg-surface-container-low overflow-hidden">
      {/* Pattern bg */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent-gold mb-3">In motion</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance leading-[1.1]">
                The properties. The people. The work.
              </h2>
              <p className="text-lg text-on-surface-variant mt-4">
                Real footage from BCN engagements, including private villas, designer interiors, office turnovers, and the field team that makes every visit consistent.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bento video grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4 lg:gap-5 auto-rows-[260px] lg:auto-rows-[300px]">
          {tiles.map((t, i) => (
            <StaggerItem key={t.src} className={t.span}>
              <motion.div
                whileHover={{ y: -4, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative group h-full overflow-hidden rounded-[24px] border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-shadow bg-primary"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={t.poster}
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                >
                  <source src={t.src} type="video/mp4" />
                </video>
                {/* Gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                {/* Soft sheen on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-accent-gold-soft font-semibold mb-1">
                    {t.eyebrow}
                  </p>
                  <p className="text-headline text-lg md:text-xl leading-tight">
                    {t.label}
                  </p>
                </div>
                {/* Top corner number badge */}
                <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white/90 text-xs font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Below: small parallax tagline */}
        <Reveal delay={0.2}>
          <div className="mt-12 max-w-xl mx-auto text-center">
            <p className="text-on-surface-variant italic">
              Most of this footage is just a regular week.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Decorative side parallax bubble */}
      <Parallax speed={0.15} className="absolute -bottom-32 -right-32 w-[420px] h-[420px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-accent-gold/[0.06] blur-3xl" />
      </Parallax>
    </section>
  );
}
