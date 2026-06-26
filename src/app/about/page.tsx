import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Heart, Globe2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { team } from "@/lib/site";
import { teamWithPhotos } from "@/lib/team-photos";

export const metadata: Metadata = {
  title: "About us · Our team & values",
  description:
    "The Filipino-led, Barcelona-based team behind BCN Ideal Services. Meet Lyn, Nina and Dexter.",
};

// Same brand-tonal palette as the home team preview.
const palette = [
  { from: "#1c3b6f", to: "#365388" },
  { from: "#365388", to: "#5774a9" },
  { from: "#c5a059", to: "#e6c98a" },
  { from: "#2f4f7d", to: "#4a6794" },
];

const values = [
  {
    icon: BadgeCheck,
    title: "Quality over scale",
    body:
      "We could be twice as big, but we choose not to be. Selectivity is what protects the experience our families have.",
  },
  {
    icon: Heart,
    title: "People before process",
    body:
      "Our processes exist to serve the people we hire and the families we serve, never the other way around.",
  },
  {
    icon: Globe2,
    title: "Built for international families",
    body:
      "We understand what it's like to land in a new country, navigate the language and the paperwork, and need things to just work.",
  },
];

export default function AboutPage() {
  const members = teamWithPhotos(team);

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A small team. <span className="text-accent-gold italic font-light">Big care.</span>
          </>
        }
        description={
          <>
            We&apos;re a Filipino-led, Barcelona-based team that has been quietly running households and offices for the city&apos;s international community since 2020. This is the team you&apos;ll be speaking to.
          </>
        }
        videoSrc="/videos/linkedin-feb.mp4"
        imageSrc="/photos/barcelona-2.jpg"
      />

      {/* Story */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow text-accent-gold mb-3">Our story</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl mb-6 text-balance leading-[1.1]">
                Started in lockdown. Built on referrals.
              </h2>
            </Reveal>
            <div className="prose-bcn text-on-surface-variant">
              <p>
                BCN Ideal Services was founded by Lyn Lozano Galicia in 2020, in the middle of the pandemic, with the help of her long-time friend and confidant Manuel Silva Manzanero. Lyn had spent a decade catering to international clients in Barcelona, and saw the same problem repeating itself. Families arriving here couldn&apos;t find the safe, vetted, bilingual household help they were used to.
              </p>
              <p>
                Five years later we&apos;re still a tight team. We work mostly by referral, mostly with international families, and mostly with the same household staff year after year. We grew by being chosen, not by chasing.
              </p>
              <p>
                If you&apos;ve worked with us before, thank you. If you haven&apos;t yet, here is what you can expect. You will talk to a human. We will listen carefully. We will match you with the right person, or tell you honestly if we can&apos;t. And we will keep showing up.
              </p>
            </div>
          </div>

          {/* Mixed video + photo collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <Reveal>
              <div className="rounded-[24px] overflow-hidden shadow-lg h-64">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/photos/lifestyle-6.jpg"
                  aria-hidden
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/ad-5.mp4" type="video/mp4" />
                </video>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/lifestyle-8.jpg" alt="" className="rounded-[24px] w-full h-64 object-cover shadow-lg mt-10" />
            </Reveal>
            <Reveal delay={0.05}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/interior-6.jpg" alt="" className="rounded-[24px] w-full h-72 object-cover shadow-lg" />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-[24px] overflow-hidden shadow-lg h-72 mt-10">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/photos/interior-2.jpg"
                  aria-hidden
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/anniversary.mp4" type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface-container-low">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <Reveal>
            <h2 className="text-display text-primary text-3xl md:text-4xl mb-12 max-w-2xl">
              What we hold ourselves to.
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full bg-white border border-outline-variant/40 rounded-[24px] p-8 clean-elevation">
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 text-primary flex items-center justify-center mb-5">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-headline text-xl text-primary mb-2">{v.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team. Long-form bios. Real portraits load automatically when added to public/team/<slug>.jpg */}
      <section id="team" className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <Reveal>
            <p className="text-eyebrow text-accent-gold mb-3">Meet the team</p>
            <h2 className="text-display text-primary text-3xl md:text-5xl mb-12 max-w-3xl text-balance">
              The people you&apos;ll actually be talking to.
            </h2>
          </Reveal>

          <div className="space-y-20">
            {members.map((m, i) => {
              const c = palette[i % palette.length];
              const initials = m.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              const reversed = i % 2 === 1;
              return (
                <Reveal key={m.slug}>
                  <article
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="lg:col-span-5">
                      <div
                        className="relative aspect-[4/5] rounded-[28px] overflow-hidden clean-elevation flex items-end p-8"
                        style={!m.photo ? {
                          background: `linear-gradient(140deg, ${c.from} 0%, ${c.to} 100%)`,
                        } : undefined}
                      >
                        {m.photo ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={m.photo}
                              alt={m.name}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ objectPosition: "center 20%" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/15 to-transparent" />
                          </>
                        ) : (
                          <>
                            <div
                              aria-hidden
                              className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full opacity-30 blur-3xl"
                              style={{ background: "rgba(255,255,255,0.55)" }}
                            />
                            <div
                              aria-hidden
                              className="absolute inset-0 opacity-[0.10]"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                backgroundSize: "30px 30px",
                              }}
                            />
                            <span
                              aria-hidden
                              className="absolute top-10 right-10 text-white/15 select-none"
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "220px",
                                lineHeight: 1,
                                letterSpacing: "-0.06em",
                              }}
                            >
                              {initials}
                            </span>
                          </>
                        )}
                        <div className="relative text-white">
                          <p className="text-xs uppercase tracking-[0.18em] text-white/85 font-semibold mb-2">
                            {m.role}
                          </p>
                          <p className="text-headline text-3xl leading-tight">{m.name}</p>
                          {!m.photo && (
                            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/55 font-semibold">
                              Portrait coming soon
                            </p>
                          )}
                        </div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-[28px] pointer-events-none" />
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-eyebrow text-accent-gold mb-2">{m.role}</p>
                      <h3 className="text-display text-primary text-3xl md:text-4xl mb-5 leading-[1.1]">
                        {m.name}
                      </h3>
                      <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
                        {m.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply for a job */}
      <section id="careers" className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
        {/* Video accent */}
        <div className="absolute inset-0 opacity-25">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="w-full h-full object-cover"
          >
            <source src="/videos/ad-2.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[var(--container-max)] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow text-accent-gold-soft mb-3">We&apos;re hiring</p>
            <h2 className="text-display text-white text-4xl md:text-5xl mb-6 text-balance">
              Looking for meaningful work in Barcelona?
            </h2>
            <p className="text-lg text-white/80 max-w-xl leading-relaxed mb-8">
              We hire experienced housekeepers, nannies, tutors and assistants, primarily from the Filipino community, and always open to the right person. Stable schedules, fair wages, and a team that has your back.
            </p>
            <Link
              href="/contact?topic=careers"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-accent-gold text-white font-semibold shadow-lg hover:brightness-110 transition-all"
            >
              Apply now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-[28px] overflow-hidden shadow-2xl aspect-[4/3]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
                className="w-full h-full object-cover"
              >
                <source src="/videos/ad-nov-7.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
