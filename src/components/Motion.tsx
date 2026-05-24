"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveal: simple fade-up on enter, respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      // When reduced motion is preferred, no entry transform / always visible.
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y }
      }
      transition={{
        duration: reduced ? 0 : 0.7,
        ease: [0.2, 0.8, 0.2, 1],
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger: container that staggers children using `RevealItem`.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial={reduced ? "show" : "hidden"}
      animate={reduced ? "show" : inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Parallax: translate Y based on scroll into the element.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 60}%`, `-${speed * 60}%`]);
  const reduced = useReducedMotion();

  return (
    <motion.div ref={ref} style={{ y: reduced ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Floating decorative bubbles for the glassmorphism vibe.
 */
export function FloatingBubbles({
  className,
  count = 6,
}: {
  className?: string;
  count?: number;
}) {
  // Deterministic layout to avoid hydration mismatch.
  const bubbles = Array.from({ length: count }).map((_, i) => {
    const seed = i * 13.37;
    return {
      x: ((seed * 73) % 100),
      y: ((seed * 37) % 100),
      size: 60 + ((seed * 9) % 220),
      delay: (seed * 0.3) % 4,
      duration: 7 + ((seed * 1.1) % 5),
      opacity: 0.04 + ((seed * 0.007) % 0.06),
    };
  });

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: b.opacity,
            x: [0, 18, -10, 0],
            y: [0, -22, 12, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
          }}
          className="absolute rounded-full bg-primary blur-2xl"
        />
      ))}
    </div>
  );
}

/**
 * MagneticHover: subtle pull toward cursor. Use for primary CTAs.
 */
export function MagneticHover({
  children,
  className,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "translate(0px, 0px)";
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts up a number when it enters the viewport.
 */
export function CountUp({
  to,
  suffix = "",
  className,
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <span ref={ref} className={className}>
      {inView && !reduced ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedNumber value={to} duration={duration} />
          {suffix}
        </motion.span>
      ) : (
        <>
          {to}
          {suffix}
        </>
      )}
    </span>
  );
}

function AnimatedNumber({ value, duration }: { value: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // simple requestAnimationFrame counter
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / (duration * 1000));
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(value * eased).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  return <span ref={ref}>0</span>;
}
