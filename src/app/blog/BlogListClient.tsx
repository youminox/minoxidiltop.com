"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type BlogPostSummary,
  type CategorySlug,
} from "@/data/articles";
import { YOU_MINOX_URL } from "@/data/brands";

const PAGE_SIZE = 24;

export default function BlogListClient({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const filteredPosts = posts.filter((post: BlogPostSummary) => {
    const matchesCat =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.badgeLabel.toLowerCase().includes(q) ||
      post.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div>
      {/* Search + Category Filters */}
      <div className="mb-10 space-y-6">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Buscar entre los 500 artículos (ej. Miraflores, Arequipa, México, Miami, barba, cejas, DIGEMID)..."
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
            onClick={() => {
              setSelectedCategory("all");
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos ({posts.length})
          </button>
          {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => {
            const count = posts.filter((p) => p.categorySlug === slug).length;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(slug);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
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
              <Link
                href={`/blog/categoria/${selectedCategory}/`}
                className="font-extrabold text-slate-900 underline ml-1"
              >
                Ir a la página oficial de esta categoría →
              </Link>
              {" · "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-primary underline"
              >
                Visitar YouMinox.com ↗
              </a>
            </div>
          )}
      </div>

      {/* Results Counter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
        <span>
          Mostrando <strong>{displayedPosts.length}</strong> de{" "}
          <strong>{filteredPosts.length}</strong> artículos encontrados
        </span>
        {visibleCount < filteredPosts.length && (
          <button
            type="button"
            onClick={() => setVisibleCount(filteredPosts.length)}
            className="text-primary font-extrabold hover:underline cursor-pointer"
          >
            Desplegar los {filteredPosts.length} artículos completos ↓
          </button>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No se encontraron artículos para tu búsqueda.
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
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
                  <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-slate-950/85 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-300">
                    {post.badgeLabel}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-slate-900">
                    #{post.id}
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

          {/* Load More Controls */}
          {visibleCount < filteredPosts.length && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="rounded-xl bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition hover:bg-primary cursor-pointer"
              >
                Cargar 24 Guías Más ({filteredPosts.length - visibleCount} restantes) ↓
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(filteredPosts.length)}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-800 transition hover:border-primary hover:text-primary cursor-pointer"
              >
                Ver las {filteredPosts.length} Guías Completas
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
