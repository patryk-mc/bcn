"use client";

import { motion } from "motion/react";
import { Reveal, Parallax } from "@/components/Motion";
import { ShieldCheck, Languages, Scale } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Selective matching",
    body:
      "Introductions made on careful consideration of family values, interests, language and personality, not just availability.",
  },
  {
    icon: Languages,
    title: "International focus",
    body:
      "Bilingual professionals (English & Spanish, often Filipino) who understand the realities of moving to and living in Barcelona.",
  },
  {
    icon: Scale,
    title: "Legal support",
    body:
      "Our legal team handles Spanish labour regulations end-to-end. Contracts, social security, the works.",
  },
];

export function MissionValues() {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      {/* Subtle background bubble accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full bg-primary/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full bg-accent-gold/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-eyebrow text-accent-gold mb-3">Why families trust us</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance mb-6 leading-[1.1]">
                Long-term relationships, built on quality and mutual trust.
              </h2>
              <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                We match international and national families with our hand-picked, mainly Filipino high-end employees, building long-term relationships through service quality, discretion and care. Each introduction is selective and one-to-one.
              </p>
            </Reveal>

            <div className="space-y-7">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-headline text-xl text-primary mb-1.5">
                        {p.title}
                      </h4>
                      <p className="text-on-surface-variant leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mixed video + image grid with parallax */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <Parallax speed={0.12} className="space-y-4 pt-12">
                <VideoCard src="/videos/nov-23.mp4" poster="/photos/interior-3.jpg" h="h-56 md:h-72" />
                <ImageCard src="/photos/interior-5.jpg" alt="Calm living room" h="h-72 md:h-96" />
              </Parallax>
              <Parallax speed={-0.12} className="space-y-4">
                <ImageCard src="/photos/lifestyle-2.jpg" alt="Hosting at home" h="h-72 md:h-96" />
                <VideoCard src="/videos/ad-5.mp4" poster="/photos/cleaning-2.jpg" h="h-56 md:h-72" />
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageCard({ src, alt, h }: { src: string; alt: string; h: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={`relative rounded-[24px] overflow-hidden shadow-xl ${h}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[24px] pointer-events-none" />
    </motion.div>
  );
}

function VideoCard({ src, poster, h }: { src: string; poster: string; h: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={`relative rounded-[24px] overflow-hidden shadow-xl bg-primary ${h}`}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[24px] pointer-events-none" />
    </motion.div>
  );
}
