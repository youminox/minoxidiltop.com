import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/articles";
import { SITE_URL } from "@/data/brands";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-11-05"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date("2026-11-05"),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly",
    priority: post.id <= 15 ? 0.9 : 0.8,
  }));

  return [...staticPages, ...articlePages];
}
