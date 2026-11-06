"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type BlogPost,
  type CategorySlug,
} from "@/data/articles";
import { YOU_MINOX_URL } from "@/data/brands";

function BlogListInner() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("categoria") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat && BLOG_CATEGORIES[cat as CategorySlug]) {
      setSelectedCategory(cat);
    } else if (!cat) {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const filteredPosts = BLOG_POSTS.filter((post: BlogPost) => {
    const matchesCat =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Search + Category Filters (Exact Dinamica.pe Style) */}
      <div className="mb-10 space-y-6">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar entre los 100 artículos (ej. You Minox, Kirkland, barba, cejas, DIGEMID)..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pl-11 text-sm text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos ({BLOG_POSTS.length})
          </button>
          {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => {
            const count = BLOG_POSTS.filter(
              (p) => p.categorySlug === slug
            ).length;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setSelectedCategory(slug)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === slug
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Category Description Banner */}
        {selectedCategory !== "all" &&
          CATEGORY_DESCRIPTIONS[selectedCategory as CategorySlug] && (
            <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center text-xs sm:text-sm text-emerald-950">
              <strong className="font-extrabold">
                {BLOG_CATEGORIES[selectedCategory as CategorySlug]}:
              </strong>{" "}
              {CATEGORY_DESCRIPTIONS[selectedCategory as CategorySlug]}{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-primary underline ml-1"
              >
                Visitar YouMinox.com ↗
              </a>
            </div>
          )}
      </div>

      {/* Posts Grid (Dinamica.pe Style) */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No se encontraron artículos para tu búsqueda.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary/95 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white shadow">
                  {post.categoryName}
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-slate-950/80 px-2 py-0.5 text-[10px] font-extrabold text-emerald-300">
                  Guía #{post.id}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime} de lectura</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600 flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Leer guía completa
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogListClient() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-gray-400">
          Cargando los 100 artículos...
        </div>
      }
    >
      <BlogListInner />
    </Suspense>
  );
}
