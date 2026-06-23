import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: { absolute: "News | BCN Ideal - Stories from Our Community" },
  description:
    "Updates on the people, events, and milestones that shape BCN Ideal Services. Stories from our community in Barcelona and the moments worth sharing.",
  openGraph: {
    title: "News | BCN Ideal - Stories from Our Community",
    description:
      "Updates on the people, events, and milestones that shape BCN Ideal Services. Stories from our community in Barcelona and the moments worth sharing.",
    type: "website",
  },
};

export default function NewsIndexPage() {
  const items = getAllNews();

  return (
    <>
      <PageHero
        eyebrow="News"
        title={
          <>
            Moments worth <span className="text-accent-gold italic font-light">sharing</span>.
          </>
        }
        description="Community events, recognitions, team milestones, and the stories that happen beyond the day-to-day work. A glimpse into the people and experiences that continue to shape BCN Ideal Services."
        imageSrc="/photos/barcelona-2.jpg"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          {items.length > 0 ? (
            <div className="flex flex-col gap-10 md:gap-14">
              {items.map((n, i) => (
                <Reveal key={n.slug} delay={i * 0.05}>
                  <Link
                    href={`/news/${n.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center rounded-[28px] overflow-hidden bg-surface-container-low border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-all"
                  >
                    <div className="md:col-span-5 relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={n.cover}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading={i === 0 ? undefined : "lazy"}
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-primary text-xs font-semibold backdrop-blur-sm">
                        {n.category}
                      </span>
                    </div>
                    <div className="md:col-span-7 p-7 md:p-10">
                      <time
                        dateTime={n.date}
                        className="block text-sm font-semibold text-accent-gold mb-3"
                      >
                        {new Date(n.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <h2 className="text-headline text-2xl md:text-3xl text-primary leading-snug mb-4 text-balance group-hover:text-primary-container transition-colors">
                        {n.title}
                      </h2>
                      <p className="text-on-surface-variant leading-relaxed mb-6">{n.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Read this post <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant">No news yet. Check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
