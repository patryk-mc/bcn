import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site, services } from "@/lib/site";
import { Phone, Mail, MapPin } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden mt-32">
      {/* Top wave divider */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute -top-px left-0 w-full h-12 md:h-20"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
          fill="var(--color-background)"
        />
      </svg>

      {/* Decorative bubbles */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 pt-32 pb-12">
        {/* CTA strip */}
        <div className="rounded-[28px] bg-white/10 border border-white/20 backdrop-blur-md p-8 md:p-12 mb-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-eyebrow text-accent-gold-soft mb-3">
              No two homes are the same
            </p>
            <h2 className="text-display text-3xl md:text-4xl text-white mb-2 max-w-xl text-balance">
              Every quote is free. Every quote is yours.
            </h2>
            <p className="text-white/70 max-w-xl">
              Tell us the property, the schedule and the priorities. We will come back with a tailored proposal, usually within one working day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent-gold text-white font-semibold shadow-lg hover:brightness-110 transition-all"
            >
              Get a free quote
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-2 justify-center px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Logo tone="white" className="h-12 mb-6" />
            <p className="text-white/70 max-w-sm leading-relaxed">
              {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={site.social.instagram} label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </SocialLink>
              <SocialLink href={site.social.twitter} label="X (Twitter)">
                <XIcon className="w-4 h-4" />
              </SocialLink>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-eyebrow text-accent-gold-soft mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-1 border-t border-white/10">
                <Link
                  href="/contact"
                  className="text-accent-gold-soft hover:text-white text-sm font-semibold transition-colors"
                >
                  Get a free quote →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-eyebrow text-accent-gold-soft mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-white/80 hover:text-white transition-colors">
                  Our process
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about#careers" className="text-white/80 hover:text-white transition-colors">
                  Apply for a job
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-eyebrow text-accent-gold-soft mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <a href={`tel:${site.phoneRaw}`} className="text-white/80 hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <a href={`mailto:${site.email}`} className="text-white/80 hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className="text-white/80">{site.city}, Spain</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} BCN Ideal Services®. All rights reserved.</p>
          <p>
            Built with care for Barcelona's international community.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent-gold text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
