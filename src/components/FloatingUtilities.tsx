"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingUtilities() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 left-6 z-40 group inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-10px_rgba(37,211,102,0.55)] hover:shadow-[0_22px_55px_-12px_rgba(37,211,102,0.75)] transition-all hover:-translate-y-0.5"
      >
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5" />
        </span>
        <span className="text-sm font-semibold whitespace-nowrap pr-1">WhatsApp us</span>
      </a>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-[0_18px_40px_-10px_rgba(28,59,111,0.55)] flex items-center justify-center hover:bg-primary-container transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
