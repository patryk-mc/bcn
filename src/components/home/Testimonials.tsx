"use client";

import { motion } from "motion/react";
import { Star, Quote, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { testimonials, site } from "@/lib/site";

export function Testimonials() {
  // Duplicate the list for seamless marquee
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-primary text-white">
      {/* Background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(197,160,89,0.16), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-eyebrow text-accent-gold-soft mb-3">What clients say</p>
            <h2 className="text-display text-white text-4xl md:text-5xl text-balance">
              ★ 4.9 across 80+ verified Google reviews.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Every review below was lifted, untouched, from real clients across Barcelona. Click any card to read them on Google.
            </p>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/25 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Read all reviews on Google
            </a>
          </div>
        </Reveal>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="flex gap-5 [animation:marquee_42s_linear_infinite] w-fit">
          {loop.map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 - reverse direction */}
      <div className="relative mt-5">
        <div className="flex gap-5 [animation:marquee_50s_linear_infinite_reverse] w-fit">
          {loop.slice(2).concat(loop.slice(0, 2)).map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: { name: string; date: string; quote: string } }) {
  return (
    <motion.a
      href={site.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${t.name}'s review on Google`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group shrink-0 w-[340px] md:w-[420px] rounded-[24px] bg-white/10 border border-white/15 backdrop-blur-sm p-7 block hover:bg-white/15 hover:border-white/25 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-0.5 text-accent-gold-soft">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-white/30" />
      </div>
      <blockquote className="text-white/90 leading-relaxed text-[15px] md:text-base mb-5 line-clamp-6">
        “{t.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-white/15">
        <div className="w-9 h-9 rounded-full bg-accent-gold/30 border border-accent-gold/40 flex items-center justify-center text-accent-gold-soft text-xs font-bold">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-white/60 text-xs">Google review · {t.date}</p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-accent-gold-soft transition-colors" />
      </figcaption>
    </motion.a>
  );
}
