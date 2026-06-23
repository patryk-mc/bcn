"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible FAQ accordion. One panel open at a time. Used both in the
 * homepage FAQ section and on the dedicated `/faq` page so the two stay
 * visually and behaviourally consistent.
 */
export function FaqAccordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: readonly FaqItem[];
  className?: string;
  /** Index of the item open on first render, or `null` for all closed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-faq-btn-${i}`;
        const panelId = `${baseId}-faq-panel-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "rounded-[20px] border bg-white transition-colors",
              isOpen ? "border-primary/30 clean-elevation" : "border-outline-variant/50"
            )}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-headline text-base md:text-lg text-primary leading-snug">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 grid place-items-center w-8 h-8 rounded-full border transition-colors",
                    isOpen
                      ? "bg-primary text-white border-primary"
                      : "text-primary border-outline-variant"
                  )}
                >
                  <Plus
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 -mt-1 text-on-surface-variant leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
