"use client";

import { motion } from "motion/react";
import { FloatingBubbles } from "@/components/Motion";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  videoSrc?: string;
  imageSrc?: string;
  tone?: "navy" | "light";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Shared hero used on inner pages. Either a video or image background plus a
 * glassmorphism content card sitting on top.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  videoSrc,
  imageSrc,
  tone = "light",
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden",
        tone === "navy" ? "bg-[#0a1735] text-white" : "bg-background",
        className
      )}
    >
      {/* Bg */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={imageSrc}
            aria-hidden
            className="w-full h-full object-cover scale-105"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        ) : null}
        {/* Veils */}
        {tone === "navy" ? (
          <>
            <div className="absolute inset-0 bg-primary/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/95 via-white/75 to-white/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </>
        )}
      </div>

      <FloatingBubbles count={4} className="z-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "text-eyebrow mb-4",
              tone === "navy" ? "text-accent-gold-soft" : "text-accent-gold"
            )}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className={cn(
            "text-display text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl",
            tone === "navy" ? "text-white" : "text-primary"
          )}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={cn(
              "mt-6 max-w-2xl text-lg md:text-xl leading-relaxed",
              tone === "navy" ? "text-white/85" : "text-on-surface-variant"
            )}
          >
            {description}
          </motion.div>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
