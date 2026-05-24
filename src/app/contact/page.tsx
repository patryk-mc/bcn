import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Calendar } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us · Get a free quote",
  description:
    "Tell us what you need. We come back with a tailored proposal, usually within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Talk to us"
        title={
          <>
            One short message. <span className="text-accent-gold italic font-light">We take it from there.</span>
          </>
        }
        description={
          <>
            Use the form on the left for a structured brief, or skip ahead and WhatsApp us. That&apos;s how most of our clients start.
          </>
        }
        videoSrc="/videos/linkedin-apr.mp4"
        imageSrc="/photos/interior-1.jpg"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <Suspense
                fallback={
                  <div className="rounded-[28px] border border-outline-variant/40 bg-white p-10 clean-elevation h-[520px]" />
                }
              >
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Card 1: Speak to us */}
            <Reveal delay={0.1}>
              <div className="rounded-[28px] bg-primary text-white overflow-hidden relative">
                {/* Video accent in corner */}
                <div className="absolute inset-0 opacity-20">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/anniversary.mp4" type="video/mp4" />
                  </video>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/70"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative p-8">
                  <p className="text-eyebrow text-accent-gold-soft mb-3">Direct line</p>
                  <h3 className="text-headline text-2xl text-white mb-2">
                    Real humans. Fast replies.
                  </h3>
                  <p className="text-white/75 mb-6 leading-relaxed">
                    No call centre. No bots. You&apos;re talking to the same small team that runs the service.
                  </p>
                  <ul className="space-y-4">
                    <ContactRow
                      Icon={MessageCircle}
                      label="WhatsApp · fastest"
                      value={site.phone}
                      href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                      external
                      accent
                    />
                    <ContactRow
                      Icon={Phone}
                      label="Call"
                      value={site.phone}
                      href={`tel:${site.phoneRaw}`}
                    />
                    <ContactRow
                      Icon={Mail}
                      label="Email"
                      value={site.email}
                      href={`mailto:${site.email}`}
                    />
                    <ContactRow Icon={MapPin} label="Based in" value={`${site.city}, Spain`} />
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Office hours */}
            <Reveal delay={0.2}>
              <div className="rounded-[24px] border border-outline-variant/50 bg-surface-container-low p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-eyebrow text-accent-gold mb-2">Office hours</p>
                    <div className="space-y-1.5 text-sm text-on-surface-variant">
                      <p className="flex justify-between border-b border-outline-variant/40 pb-1.5">
                        <span>Monday – Friday</span>
                        <span className="text-primary font-semibold">9:00 – 18:00 CET</span>
                      </p>
                      <p className="flex justify-between border-b border-outline-variant/40 pb-1.5">
                        <span>Saturday</span>
                        <span className="text-primary font-semibold">10:00 – 14:00 CET</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-on-surface-variant/70">WhatsApp only</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-outline-variant/40 flex items-center gap-2 text-sm text-on-surface-variant">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    <span className="text-primary font-semibold">Average reply time</span> · within
                    one working day
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Privacy note */}
            <Reveal delay={0.3}>
              <div className="rounded-[24px] border border-outline-variant/50 bg-white p-7">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-primary">A note on privacy.</strong> We use the details
                  you share only to scope your request and respond. We never sell data and never
                  auto-subscribe you to marketing. You can request deletion at any time via{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-primary underline underline-offset-2"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  external,
  accent,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  accent?: boolean;
}) {
  const content = (
    <>
      <span
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          accent ? "bg-accent-gold text-white" : "bg-white/15 text-white"
        }`}
      >
        <Icon className="w-4 h-4" />
      </span>
      <span className="flex-1">
        <span className="block text-xs uppercase tracking-widest text-white/55 font-semibold">
          {label}
        </span>
        <span
          className={`block text-base md:text-lg font-semibold transition-colors ${
            accent ? "text-white group-hover:text-accent-gold-soft" : "text-white group-hover:text-accent-gold-soft"
          }`}
        >
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group flex items-start gap-4"
        >
          {content}
        </a>
      </li>
    );
  }
  return <li className="flex items-start gap-4 group">{content}</li>;
}
