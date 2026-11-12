import type { MetadataRoute } from "next";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/articles";
import { SITE_URL } from "@/data/brands";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.keys(BLOG_CATEGORIES).map(
    (categoria) => ({
      url: `${SITE_URL}/blog/categoria/${categoria}/`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  const articlePages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date("2026-11-12"),
    changeFrequency: "weekly",
    priority: post.id <= 15 ? 0.9 : 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
