/**
 * MDX blog loader. Posts live under `content/blog/*.mdx`.
 *
 * To add a post:
 *   1. Create `content/blog/your-slug.mdx`
 *   2. Add frontmatter:
 *        ---
 *        title: "Post title"
 *        excerpt: "One-sentence excerpt for the cards."
 *        date: "2026-05-24"
 *        author: "Lyn Lozano"
 *        category: "Cleaning"
 *        cover: "/photos/cleaning-1.jpg"
 *        ---
 *   3. Write MDX (markdown + JSX) under it.
 *   4. That's it. The post shows up automatically.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  readingTimeMinutes: number;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => loadPost(file.replace(/\.mdx$/, "")));
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function loadPost(slug: string): Post {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    author: String(data.author ?? "BCN Ideal Services"),
    category: String(data.category ?? "General"),
    cover: String(data.cover ?? "/photos/interior-1.jpg"),
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    content,
  };
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}
