import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllNews } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const newsRoutes: MetadataRoute.Sitemap = getAllNews().map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...newsRoutes];
}
