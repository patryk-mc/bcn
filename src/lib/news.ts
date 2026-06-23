/**
 * MDX news loader. News items live under `content/news/*.mdx`.
 *
 * News works just like the blog (so the team already knows the workflow) but is
 * for shorter community moments: awards, events, recognitions and milestones.
 *
 * To add a news item:
 *   1. Create `content/news/your-slug.mdx`
 *   2. Add frontmatter:
 *        ---
 *        title: "Headline"
 *        excerpt: "One-sentence summary shown in the news list."
 *        date: "2026-06-12"
 *        category: "Recognition"
 *        cover: "/photos/lifestyle-3.jpg"
 *        ---
 *   3. Write MDX (markdown + JSX) under it.
 *   4. That's it. The item shows up automatically, newest first.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  readingTimeMinutes: number;
  content: string;
};

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export function getAllNews(): NewsItem[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  const files = fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".mdx"));
  const items = files.map((file) => loadNewsItem(file.replace(/\.mdx$/, "")));
  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function loadNewsItem(slug: string): NewsItem {
  const file = path.join(NEWS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    category: String(data.category ?? "News"),
    cover: String(data.cover ?? "/photos/barcelona-1.jpg"),
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    content,
  };
}

export function getRelatedNews(slug: string, limit = 2): NewsItem[] {
  return getAllNews()
    .filter((n) => n.slug !== slug)
    .slice(0, limit);
}
