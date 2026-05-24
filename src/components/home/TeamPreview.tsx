import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { team } from "@/lib/site";
import { teamWithPhotos } from "@/lib/team-photos";

const palette = [
  { from: "#1c3b6f", to: "#365388" },
  { from: "#365388", to: "#5774a9" },
  { from: "#c5a059", to: "#e6c98a" },
  { from: "#2f4f7d", to: "#4a6794" },
];

export function TeamPreview() {
  const members = teamWithPhotos(team);

  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="relative mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent-gold mb-3">The team</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
                Meet the people behind the service
              </h2>
              <p className="text-lg text-on-surface-variant mt-4">
                You always speak to a human on our team, never a call centre. This is the small core team that runs operations day-to-day.
              </p>
            </div>
            <Link
              href="/about"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              Meet the full team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {members.map((m, i) => {
              const c = palette[i % palette.length];
              const initials = m.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("");
              return (
                <article
                  key={m.slug}
                  className="group h-full rounded-[24px] overflow-hidden bg-surface-container-low border border-outline-variant/40 clean-elevation hover:clean-elevation-hover hover:-translate-y-1 transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden flex items-end p-5"
                    style={!m.photo ? { background: `linear-gradient(140deg, ${c.from} 0%, ${c.to} 100%)` } : undefined}
                  >
                    {m.photo ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ objectPosition: "center 20%" }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/15 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div
                          aria-hidden
                          className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-30 blur-3xl"
                          style={{ background: "rgba(255,255,255,0.55)" }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-[0.10]"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "26px 26px",
                          }}
                        />
                        <span
                          aria-hidden
                          className="absolute top-6 right-7 text-white/15 select-none"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "120px",
                            lineHeight: 1,
                            letterSpacing: "-0.05em",
                          }}
                        >
                          {initials}
                        </span>
                      </>
                    )}
                    <div className="relative text-white">
                      <p className="text-xs uppercase tracking-[0.14em] text-white/85 font-semibold mb-1">
                        {m.role}
                      </p>
                      <p className="text-headline text-xl leading-tight">{m.name}</p>
                    </div>
                  </div>
                  <p className="p-5 text-sm text-on-surface-variant leading-relaxed flex-1">
                    {m.shortBio}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
