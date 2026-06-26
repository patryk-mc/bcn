import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Reveal } from "@/components/Motion";
import { getNewsSlugs, getRelatedNews, loadNewsItem } from "@/lib/news";
import { articleJsonLd, jsonLdToString, parseCustomJsonLd } from "@/lib/jsonld";

export async function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const n = loadNewsItem(slug);
    return {
      title: n.title,
      description: n.excerpt,
      openGraph: {
        title: n.title,
        description: n.excerpt,
        type: "article",
        publishedTime: n.date,
        images: n.cover ? [{ url: n.cover }] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let item;
  try {
    item = loadNewsItem(slug);
  } catch {
    notFound();
  }
  const related = getRelatedNews(slug, 3);

  const customJsonLd = parseCustomJsonLd(item.jsonld);

  return (
    <article>
      {/* Structured data (schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdToString(
            articleJsonLd({
              kind: "news",
              slug,
              title: item.title,
              excerpt: item.excerpt,
              date: item.date,
              cover: item.cover,
            }),
          ),
        }}
      />
      {customJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdToString(customJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-white">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-white/85 hover:text-accent-gold-soft transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All news
          </Link>
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold mb-5">
            {item.category}
          </span>
          <h1 className="text-display text-4xl md:text-6xl text-white leading-[1.05] text-balance mb-6">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/85">
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {item.readingTimeMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-background pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="prose-bcn">
              <MDXRemote
                source={item.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </Reveal>

          <div className="mt-12 pt-8 border-t border-outline-variant flex flex-wrap items-center justify-between gap-4 text-sm">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> All news
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all"
            >
              Get a free quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 bg-surface-container-low">
          <div className="mx-auto max-w-[var(--container-max)] px-6">
            <h2 className="text-display text-primary text-3xl mb-8">More news</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group block rounded-[24px] overflow-hidden bg-white border border-outline-variant/40 clean-elevation hover:clean-elevation-hover transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={n.cover}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold mb-1">
                      {n.category}
                    </p>
                    <h3 className="text-headline text-lg text-primary leading-snug group-hover:text-primary-container transition-colors">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
