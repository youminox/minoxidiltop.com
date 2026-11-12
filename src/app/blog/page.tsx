import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListClient from "./BlogListClient";
import {
  BLOG_CATEGORIES,
  BLOG_POST_SUMMARIES,
  CATEGORY_DESCRIPTIONS,
  type CategorySlug,
} from "@/data/articles";
import { SITE_NAME, SITE_URL, YOU_MINOX_URL } from "@/data/brands";

export const metadata: Metadata = {
  title:
    "500 Artículos y Guías sobre Minoxidil, Barba, Cabello, Cejas y Barberías | MinoxidilTop.com",
  description:
    "Enciclopedia completa de 500 artículos especializados en Minoxidil para barba, cabello y cejas, guías por distritos de Lima, ciudades del Perú, países del mundo, barberías (GuíaDeBarberías.com) y comparativas entre You Minox (#1 Perú) y Kirkland (#2).",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title:
      "500 Artículos y Guías sobre Minoxidil, Barba, Cabello y Barberías | MinoxidilTop.com",
    description:
      "Explora nuestras 500 guías clínicas, geolocalizadas y comparativas sobre los mejores Minoxidil de Perú (You Minox #1 y Kirkland #2), Estados Unidos y el mundo.",
    url: `${SITE_URL}/blog/`,
    type: "website",
    locale: "es_PE",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

export default function BlogIndexPage() {
  const categoryEntries = Object.entries(BLOG_CATEGORIES) as [
    CategorySlug,
    string,
  ][];

  const blogHubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Centro de 500 Artículos y 12 Categorías sobre Minoxidil — ${SITE_NAME}`,
    description:
      "Enciclopedia clínica y geolocalizada de 500 artículos sobre Minoxidil para barba, cabello y cejas en Perú, Estados Unidos y el mundo.",
    url: `${SITE_URL}/blog/`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: categoryEntries.map(([slug, label]) => ({
      "@type": "CollectionPage",
      name: label,
      url: `${SITE_URL}/blog/categoria/${slug}/`,
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogHubSchema) }}
      />
      <main className="min-h-screen bg-white pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1 text-xs font-extrabold text-primary mb-4">
              <span>
                📚 Enciclopedia Oficial • {BLOG_POST_SUMMARIES.length} Guías Verificadas en 12 Categorías
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Centro de Artículos sobre{" "}
              <span className="text-primary">
                Minoxidil, Barba, Cabello y Barberías
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Explora nuestras{" "}
              <strong>{BLOG_POST_SUMMARIES.length} guías especializadas</strong>{" "}
              divididas en 12 categorías con 6 formatos editoriales distintos:
              distritos de Lima, ciudades del Perú, países del mundo, visagismo
              en barberías (vía{" "}
              <a
                href="https://guiadebarberias.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 underline"
              >
                GuíaDeBarberías.com
              </a>
              ), marcas de Amazon USA y todo sobre{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary underline"
              >
                You Minox (youminox.com)
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/#top-5-ranking"
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-slate-800"
              >
                ← Volver al Ranking Top 5 en Home
              </Link>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-white transition hover:bg-primary-dark"
              >
                🥇 Visitar Tienda Oficial YouMinox.com ↗
              </a>
            </div>
          </div>

          <BlogListClient posts={BLOG_POST_SUMMARIES} />

          {/* SSR Crawlable Directory of All 12 Categories & 500 Guides */}
          <section className="mt-20 pt-14 border-t border-slate-200">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                🗂️ Índice General por Categorías (100% Indexable)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Directorio Completo de las 12 Categorías y 500 Guías Especializadas
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Accede directamente a cada categoría temática o selecciona
                cualquiera de nuestros 500 estudios clínicos, geolocalizados y
                comparativos sobre Minoxidil en Perú y el mundo.
              </p>
            </div>

            <div className="space-y-10">
              {categoryEntries.map(([slug, label]) => {
                const catPosts = BLOG_POST_SUMMARIES.filter(
                  (p) => p.categorySlug === slug
                );
                return (
                  <div
                    key={slug}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
                      <div>
                        <Link
                          href={`/blog/categoria/${slug}/`}
                          className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-primary transition"
                        >
                          {label} ({catPosts.length} artículos)
                        </Link>
                        <p className="text-xs text-slate-600 mt-1">
                          {CATEGORY_DESCRIPTIONS[slug]}
                        </p>
                      </div>
                      <Link
                        href={`/blog/categoria/${slug}/`}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white hover:bg-primary transition shrink-0"
                      >
                        Abrir categoría completa →
                      </Link>
                    </div>
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                      {catPosts.map((p) => (
                        <li key={p.id} className="truncate">
                          <Link
                            href={`/blog/${p.slug}/`}
                            className="text-slate-700 hover:text-primary hover:underline font-medium"
                          >
                            <span className="font-bold text-slate-400 mr-1">
                              #{p.id}
                            </span>
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
