import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { getAllPosts } from "@/lib/blog";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="relative py-28 md:py-36 bg-surface-container-low">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-accent-gold mb-3">From the journal</p>
              <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
                Notes on running a home in Barcelona.
              </h2>
              <p className="text-lg text-on-surface-variant mt-4">
                Practical guides, behind-the-scenes notes, and the lessons we keep relearning.
              </p>
            </div>
            <Link
              href="/blog"
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block h-full rounded-[24px] overflow-hidden bg-white border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-primary text-xs font-semibold backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-3">
                    <time dateTime={p.date}>
                      {new Date(p.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="text-headline text-xl text-primary mb-3 leading-snug group-hover:text-primary-container transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-5 line-clamp-3">
                    {p.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
