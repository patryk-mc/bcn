"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-3 pt-3 md:pt-5"
      >
        <nav
          className={cn(
            "flex items-center gap-2 md:gap-6 px-3 py-2 md:px-3 md:py-2 rounded-full",
            "border border-white/40 transition-all duration-300",
            scrolled
              ? "glass-strong shadow-[0_18px_50px_-12px_rgba(28,59,111,0.18)]"
              : "glass shadow-[0_8px_30px_-8px_rgba(28,59,111,0.12)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="pl-2 pr-1 md:pr-2 flex items-center gap-2 group"
            aria-label="BCN Ideal Services home"
          >
            <Logo className="h-7 md:h-9" />
          </Link>

          {/* Divider */}
          <span className="hidden md:block w-px h-6 bg-outline-variant/60" />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className={cn(
              "hidden md:inline-flex ml-1 items-center gap-2 px-5 py-2 rounded-full",
              "bg-primary text-white text-sm font-semibold tracking-wide",
              "shadow-[0_8px_20px_-6px_rgba(28,59,111,0.45)]",
              "hover:bg-primary-container transition-all hover:-translate-y-px active:scale-[0.98]"
            )}
          >
            Free Quote
          </Link>

          {/* Phone (compact CTA on mobile) */}
          <a
            href={`tel:${site.phoneRaw}`}
            className="md:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-[0_6px_16px_-4px_rgba(28,59,111,0.45)]"
            aria-label={`Call ${site.phone}`}
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-primary"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-primary/10 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-24 left-3 right-3 glass-strong rounded-3xl p-4 border border-white/40 shadow-2xl"
            >
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 rounded-2xl bg-primary text-white font-semibold"
                  >
                    Free Quote
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
