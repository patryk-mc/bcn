import { Reveal } from "@/components/Motion";
import { CountUp } from "@/components/Motion";
import { Globe2, Languages, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { label: "Years serving Barcelona", value: 5, suffix: "+" },
  { label: "International families", value: 200, suffix: "+" },
  { label: "Google review average", value: 49, suffix: "★", divider: 10 },
  { label: "Two-person teams", value: 100, suffix: "%" },
];

const pills = [
  { icon: Globe2, label: "International community" },
  { icon: Languages, label: "Bilingual EN / ES / FIL" },
  { icon: ShieldCheck, label: "Background-checked staff" },
  { icon: Sparkles, label: "Eco-friendly products on request" },
];

export function TrustStrip() {
  return (
    <section className="relative -mt-12 z-10">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="rounded-[28px] bg-white clean-elevation border border-outline-variant/40 p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className={i < 3 ? "md:border-r md:border-outline-variant/40 md:pr-8" : ""}>
                <div className="text-display text-primary text-[36px] md:text-[44px] leading-none mb-2">
                  {s.divider ? (
                    <CountUp to={s.value / s.divider} />
                  ) : (
                    <CountUp to={s.value} />
                  )}
                  <span className="text-accent-gold">{s.suffix}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-on-surface-variant">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {pills.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface-variant"
              >
                <p.icon className="w-3.5 h-3.5 text-primary" />
                {p.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
