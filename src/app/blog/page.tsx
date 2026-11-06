import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListClient from "./BlogListClient";
import { BLOG_POSTS } from "@/data/articles";
import { SITE_URL, YOU_MINOX_URL } from "@/data/brands";

export const metadata: Metadata = {
  title:
    "100 Artículos y Guías sobre Minoxidil, Barba, Cabello y Cejas | MinoxidilTop.com",
  description:
    "Biblioteca completa de 100 artículos especializados en Minoxidil para barba, cabello y cejas, comparativas entre You Minox (#1 en Perú) y Kirkland (#2), marcas de Amazon USA y regulación DIGEMID.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title:
      "100 Artículos y Guías sobre Minoxidil, Barba, Cabello y Cejas | MinoxidilTop.com",
    description:
      "Explora nuestras 100 guías clínicas y comparativas sobre los mejores Minoxidil de Perú (You Minox #1 y Kirkland #2) y Estados Unidos.",
    url: `${SITE_URL}/blog/`,
    type: "website",
    locale: "es_PE",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1 text-xs font-extrabold text-primary mb-4">
              <span>📚 Enciclopedia Oficial • {BLOG_POSTS.length} Guías Verificadas</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Centro de Artículos sobre{" "}
              <span className="text-primary">Minoxidil, Barba y Cabello</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Explora nuestras <strong>100 guías especializadas</strong> divididas en 8 categorías: comparativas del Ranking Top 5, crecimiento de barba y cejas sin irritación, marcas de Amazon USA, regulación sanitaria DIGEMID en Perú y todo sobre{" "}
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

          <BlogListClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
