import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Sparkles, Building2, Diamond } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { services, servicesBySlug, site, type ServiceSlug } from "@/lib/site";

const ICONS = {
  sparkles: Sparkles,
  "building-2": Building2,
  diamond: Diamond,
} as const;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = servicesBySlug[slug as ServiceSlug];
  if (!s) return {};
  return {
    title: `${s.title} · Services`,
    description: s.short,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicesBySlug[slug as ServiceSlug];
  if (!s) notFound();

  const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Sparkles;
  const isGold = s.color === "gold";
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        description={s.short}
        videoSrc={s.heroVideo}
        imageSrc={s.poster}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/contact?topic=${s.slug}`}
            className={`inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold transition-all shadow-lg ${
              isGold
                ? "bg-accent-gold text-white hover:brightness-110"
                : "bg-primary text-white hover:bg-primary-container"
            }`}
          >
            Get a free quote <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass border border-primary/20 text-primary text-base font-semibold hover:bg-white transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us
          </a>
        </div>
      </PageHero>

      {/* Long copy + bullets */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow text-accent-gold mb-3">How it works</p>
              <h2 className="text-display text-primary text-3xl md:text-5xl mb-6 text-balance leading-[1.1]">
                What you get when you hire us for {s.title.toLowerCase()}.
              </h2>
              <div className="prose-bcn">
                <p>{s.longCopy}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-[24px] border border-outline-variant/50 bg-surface-container-low p-7">
                <h3 className="text-headline text-lg text-primary mb-4">Included as standard</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-on-surface-variant">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/contact?topic=${s.slug}`}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-semibold shadow-lg transition-all ${
                    isGold ? "bg-accent-gold hover:brightness-110" : "bg-primary hover:bg-primary-container"
                  }`}
                >
                  Get a free quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-primary/30 text-primary font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>

          {/* Side video panel, accent */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden clean-elevation bg-primary">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={s.poster}
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={s.accentVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
              <div className={`absolute top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${isGold ? "bg-accent-gold" : "bg-primary"}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="rounded-[24px] bg-primary text-white p-7">
              <p className="text-eyebrow text-accent-gold-soft mb-2">Quick facts</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-white/15 pb-2">
                  <span className="text-white/70">Languages</span>
                  <span className="font-semibold">EN · ES · FIL</span>
                </li>
                <li className="flex justify-between border-b border-white/15 pb-2">
                  <span className="text-white/70">Vetting</span>
                  <span className="font-semibold">Background-checked</span>
                </li>
                <li className="flex justify-between border-b border-white/15 pb-2">
                  <span className="text-white/70">Quote</span>
                  <span className="font-semibold text-accent-gold-soft">Free</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Booking</span>
                  <span className="font-semibold">WhatsApp · Phone · Form</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Background video band */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={s.poster}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={s.backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-primary/40" />
        <div className="relative h-full mx-auto max-w-[var(--container-max)] px-6 flex items-end pb-12 md:pb-16">
          <div className="text-white max-w-2xl">
            <p className="text-eyebrow text-accent-gold-soft mb-3">{s.eyebrow}</p>
            <p className="text-display text-3xl md:text-5xl leading-[1.05] text-balance">
              {s.title}.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 bg-surface-container-low">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-headline text-primary text-2xl md:text-3xl">
              Our other services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> All services
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group block rounded-[24px] overflow-hidden bg-white border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-primary">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={o.poster}
                    aria-hidden
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  >
                    <source src={o.heroVideo} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/45 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-1.5">
                    {o.eyebrow}
                  </p>
                  <h3 className="text-headline text-xl text-primary mb-2">{o.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{o.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
