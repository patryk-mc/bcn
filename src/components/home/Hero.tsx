"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BadgeCheck, ChevronDown, Volume2, VolumeX, MessageCircle } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { FloatingBubbles, MagneticHover } from "@/components/Motion";
import { cn } from "@/lib/cn";

export function Hero() {
  const [muted, setMuted] = useState(true);
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden bg-[#0a1735]">
      {/* Premium background video. Tropical infinity pool by the sea. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          poster="/photos/lifestyle-9.jpg"
          aria-hidden
          className={cn(
            "w-full h-full object-cover scale-105",
            !reduced && "[animation:drift_38s_ease-in-out_infinite]"
          )}
        >
          <source src="/videos/linkedin-feb.mp4" type="video/mp4" />
        </video>

        {/* Lighter, more video-forward overlay: dark vignette + soft side fade for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1735]/85 via-[#0a1735]/55 to-[#0a1735]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <FloatingBubbles count={5} className="z-0 opacity-40" />

      {/* Mute toggle */}
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/40 text-primary text-xs font-medium shadow-md hover:shadow-lg transition-all"
        aria-label={muted ? "Unmute background video" : "Mute background video"}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        {muted ? "Sound off" : "Sound on"}
      </button>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-6">
        <div className="max-w-3xl">
          {/* Eyebrow chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong border border-white/40 text-primary text-xs font-semibold tracking-wide mb-7 shadow-sm"
          >
            <BadgeCheck className="w-4 h-4 text-primary" />
            <span>Trusted by Barcelona&apos;s international community since 2020</span>
          </motion.div>

          {/* Headline (white on darker video) */}
          <h1 className="text-display text-white text-[44px] leading-[1.05] sm:text-[60px] md:text-[76px] md:leading-[1.02] mb-7 text-balance">
            <AnimatedWords
              words={[
                "Reliable cleaning",
                "and lifestyle support",
                "for",
              ]}
            />
            <span className="block">
              <AnimatedWord delay={0.9} className="text-accent-gold-soft italic font-light">
                Barcelona&apos;s
              </AnimatedWord>{" "}
              <AnimatedWord delay={1.0}>international community.</AnimatedWord>
            </span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl text-white/85 max-w-xl mb-10 leading-relaxed"
          >
            Two-person cleaning teams, discreet lifestyle management, and one trusted point of contact. Every property is different, so every quote is tailored and free.
          </motion.p>

          {/* CTAs, quote-led */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <MagneticHover>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-accent-gold text-white px-7 py-4 rounded-2xl text-base font-semibold shadow-[0_18px_40px_-12px_rgba(197,160,89,0.55)] hover:shadow-[0_22px_50px_-12px_rgba(197,160,89,0.75)] hover:brightness-110 transition-all"
              >
                Get a free quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticHover>
            <a
              href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass-strong border border-white/40 text-primary text-base font-semibold hover:bg-white transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp us
            </a>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="flex items-center gap-4 text-white/85"
          >
            <div className="flex items-center gap-1 text-accent-gold-soft">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-semibold">4.9 from 80+ verified Google reviews</p>
              <p className="text-white/75">Two-person cleaning teams · Bilingual · WhatsApp support</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-white/70"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

function AnimatedWord({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

function AnimatedWords({ words }: { words: string[] }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="block">
          <AnimatedWord delay={0.5 + i * 0.1}>{w}</AnimatedWord>
        </span>
      ))}
    </>
  );
}
