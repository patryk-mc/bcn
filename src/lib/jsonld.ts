/**
 * Structured data (schema.org JSON-LD) for blog posts and news articles.
 *
 * Every post automatically gets correct `BlogPosting` / `NewsArticle` markup
 * built from its frontmatter, so Google can show rich results (author, date,
 * image). Authors can additionally attach a custom JSON-LD block per post via
 * the admin panel (the optional `jsonld` frontmatter field).
 */

import { site } from "./site";

const organization = {
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo/banner.png`,
  },
};

type ArticleInput = {
  kind: "blog" | "news";
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  /** Blog posts carry an author; news falls back to the organization. */
  author?: string;
};

function absolute(pathOrUrl: string): string {
  if (!pathOrUrl) return `${site.url}/opengraph-image`;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${site.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** Build the auto-generated Article schema for a post. */
export function articleJsonLd(input: ArticleInput): Record<string, unknown> {
  const basePath = input.kind === "blog" ? "blog" : "news";
  const url = `${site.url}/${basePath}/${input.slug}`;
  const isOrgAuthor = !input.author || /bcn ideal services/i.test(input.author);

  return {
    "@context": "https://schema.org",
    "@type": input.kind === "news" ? "NewsArticle" : "BlogPosting",
    headline: input.title,
    description: input.excerpt,
    image: [absolute(input.cover)],
    datePublished: input.date,
    dateModified: input.date,
    author: isOrgAuthor
      ? { "@type": "Organization", name: site.name, url: site.url }
      : { "@type": "Person", name: input.author },
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/**
 * Serialise an object for safe embedding inside a <script> tag (escapes `<` so
 * a `</script>` inside any string can't break out of the tag).
 */
export function jsonLdToString(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/**
 * Parse a custom JSON-LD string (from frontmatter). Returns the object/array,
 * or null if it's missing or not valid JSON — so a bad value is simply ignored
 * rather than breaking the page.
 */
export function parseCustomJsonLd(raw: string | undefined): object | null {
  if (!raw || !raw.trim()) return null;
  try {
    const value = JSON.parse(raw);
    return value && typeof value === "object" ? (value as object) : null;
  } catch {
    return null;
  }
}
