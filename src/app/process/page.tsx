import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { processSteps } from "@/lib/site";
import { ArrowRight, ShieldCheck, FileSignature, Handshake, Sparkles, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our process · How a match becomes a long-term hire",
  description:
    "Five steps, fully transparent: from initial brief to ongoing support. Plus the legal and contracting work we handle for you.",
};

const stepIcons = [MessageCircle, Sparkles, Handshake, FileSignature, ShieldCheck];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title={
          <>
            From a quick brief to a <span className="text-accent-gold italic font-light">long-term match</span>.
          </>
        }
        description="Five steps. Same approach for a one-off cleaner and for a full household. Tight, transparent, and built for the long term."
        videoSrc="/videos/holiday.mp4"
        imageSrc="/photos/lifestyle-9.jpg"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <div className="relative">
            {/* Vertical timeline line */}
            <div
              aria-hidden
              className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2"
            />

            <ol className="space-y-12 md:space-y-24">
              {processSteps.map((s, i) => {
                const Icon = stepIcons[i];
                const reversed = i % 2 === 1;
                return (
                  <Reveal key={s.n}>
                    <li
                      className={`relative grid grid-cols-[56px,1fr] md:grid-cols-2 gap-6 md:gap-16 items-center ${
                        reversed ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Number bubble */}
                      <div
                        className={`relative md:absolute md:left-1/2 md:-translate-x-1/2 z-10 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold ring-8 ring-background ${
                          reversed ? "" : ""
                        }`}
                      >
                        {s.n}
                      </div>
                      {/* Content card */}
                      <div className={`md:max-w-md ${reversed ? "md:justify-self-end md:text-right" : "md:justify-self-start"}`}>
                        <div className="bg-surface-container-low border border-outline-variant/40 rounded-[24px] p-7 clean-elevation">
                          {Icon && (
                            <div className={`w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 ${reversed ? "md:ml-auto" : ""}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                          )}
                          <h3 className="text-headline text-xl text-primary mb-2">{s.title}</h3>
                          <p className="text-on-surface-variant leading-relaxed">{s.body}</p>
                        </div>
                      </div>
                      {/* Spacer for opposite column */}
                      <div className="hidden md:block" />
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-surface-container-low">
        <div className="mx-auto max-w-[var(--container-max)] px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow text-accent-gold mb-3">Behind the scenes</p>
              <h2 className="text-display text-primary text-3xl md:text-4xl mb-6 text-balance leading-[1.15]">
                What you don&apos;t see, and why it matters.
              </h2>
              <div className="prose-bcn">
                <p>
                  Behind every match we make, a small but careful pipeline runs to make sure the person walking into your home is the right one. We handle:
                </p>
                <ul>
                  <li>Background and reference verification</li>
                  <li>Right-to-work documentation under Spanish law</li>
                  <li>Social Security registration (Empleados de Hogar)</li>
                  <li>Contract drafting and signing</li>
                  <li>Payroll and IRPF withholding where applicable</li>
                  <li>Ongoing training and case management</li>
                  <li>Replacement coverage when staff are sick or on holiday</li>
                </ul>
                <p>
                  You get one transparent monthly invoice. We get peace of mind that the people working in your home are protected, declared, and supported.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/lifestyle-12.jpg"
              alt=""
              className="rounded-[28px] aspect-[4/5] w-full object-cover clean-elevation"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-6 text-center">
          <h2 className="text-display text-3xl md:text-4xl mb-4 text-balance">
            Ready to start step 1?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            One short brief. We&apos;ll take it from there.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent-gold text-white font-semibold shadow-lg hover:brightness-110 transition-all"
          >
            Get a free quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
