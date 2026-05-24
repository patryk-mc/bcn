import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog · Notes on running a home in Barcelona",
  description: "Practical guides, behind-the-scenes notes and the lessons we keep relearning.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            Notes on running a home <span className="text-accent-gold italic font-light">in Barcelona</span>.
          </>
        }
        description="Practical guides for international families, behind-the-scenes notes on how we work, and the lessons we keep relearning."
        imageSrc="/photos/lifestyle-7.jpg"
      />

      {/* Featured */}
      {featured && (
        <section className="pt-16 md:pt-20 bg-white">
          <div className="mx-auto max-w-[var(--container-max)] px-6">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-[32px] overflow-hidden bg-surface-container-low border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/95 text-primary text-xs font-semibold backdrop-blur-sm">
                    Featured · {featured.category}
                  </span>
                </div>
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-4">
                    <time dateTime={featured.date}>
                      {new Date(featured.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-display text-primary text-3xl md:text-4xl leading-[1.15] mb-4 text-balance group-hover:text-primary-container transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read this post <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Rest */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
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
                        <span>{p.readingTimeMinutes} min read</span>
                      </div>
                      <h3 className="text-headline text-xl text-primary mb-3 leading-snug group-hover:text-primary-container transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant">No posts yet. First one is coming soon.</p>
          )}
        </div>
      </section>

      {/* Add a post helper */}
      <section className="py-20 bg-surface-container-low">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-eyebrow text-accent-gold mb-3">For the BCN team</p>
          <h3 className="text-display text-primary text-2xl md:text-3xl mb-3 text-balance">
            Want to publish a new post?
          </h3>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Drop a new <code className="px-1.5 py-0.5 rounded bg-surface-container text-sm text-primary">.mdx</code> file into
            <code className="px-1.5 py-0.5 rounded bg-surface-container text-sm text-primary mx-1">content/blog/</code>
            with the frontmatter shown in the <code className="px-1.5 py-0.5 rounded bg-surface-container text-sm text-primary">src/lib/blog.ts</code> header, and the post shows up automatically.
          </p>
        </div>
      </section>
    </>
  );
}
