import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  getPostsByCategory,
  type CategorySlug,
} from "@/data/articles";
import { SITE_NAME, SITE_URL, YOU_MINOX_URL } from "@/data/brands";

type Props = {
  params: Promise<{ categoria: string }>;
};

export function generateStaticParams() {
  return Object.keys(BLOG_CATEGORIES).map((categoria) => ({
    categoria,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const categoryName = BLOG_CATEGORIES[categoria as CategorySlug];

  if (!categoryName) {
    return { title: `Categoría no encontrada | ${SITE_NAME}` };
  }

  const description =
    CATEGORY_DESCRIPTIONS[categoria as CategorySlug] ||
    `Artículos y guías especializadas en ${categoryName} sobre Minoxidil, barba, cabello y cejas en Perú y Estados Unidos.`;
  const posts = getPostsByCategory(categoria as CategorySlug);
  const canonicalUrl = `${SITE_URL}/blog/categoria/${categoria}/`;

  return {
    title: `${categoryName}: ${posts.length} Guías y Comparativas de Minoxidil | ${SITE_NAME}`,
    description: `${description} Explora nuestras ${posts.length} guías verificadas con análisis de You Minox (#1 en Perú con Notificación Sanitaria DIGEMID) y Kirkland (#2).`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryName} (${posts.length} Guías) | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "es_PE",
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { categoria } = await params;
  const categoryName = BLOG_CATEGORIES[categoria as CategorySlug];

  if (!categoryName) {
    notFound();
  }

  const categoryDescription = CATEGORY_DESCRIPTIONS[categoria as CategorySlug];
  const posts = getPostsByCategory(categoria as CategorySlug);
  const canonicalUrl = `${SITE_URL}/blog/categoria/${categoria}/`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} — ${SITE_NAME}`,
    description: categoryDescription,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/blog/${post.slug}/`,
        name: post.title,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ranking Minoxidil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "500 Artículos y Guías",
        item: `${SITE_URL}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
          >
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-primary">
              500 Artículos y Guías
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{categoryName}</span>
          </nav>

          {/* Category Hero Header */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-7 sm:p-10 text-white shadow-lg mb-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1 text-xs font-extrabold text-emerald-300">
                📂 Categoría Especializada • {posts.length} Artículos Verificados
              </span>
              <Link
                href="/blog/"
                className="text-xs font-bold text-amber-300 hover:underline"
              >
                ← Ver las 12 Categorías (500 Guías)
              </Link>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {categoryName}
            </h1>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
              {categoryDescription} En el Perú destacamos como{" "}
              <strong className="text-white">#1 del ranking</strong> a{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-emerald-300 underline hover:text-white"
              >
                You Minox en Crema (youminox.com)
              </a>{" "}
              con Notificación Sanitaria DIGEMID frente a{" "}
              <strong className="text-white">#2 Kirkland Signature</strong>.
            </p>

            {/* Category Switcher Navigation (Static SEO Links) */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                Explorar otras categorías del portal:
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blog/"
                  className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/20 transition"
                >
                  Todas (500)
                </Link>
                {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => {
                  const isActive = slug === categoria;
                  return (
                    <Link
                      key={slug}
                      href={`/blog/categoria/${slug}/`}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                        isActive
                          ? "bg-emerald-400 text-slate-950 font-extrabold shadow"
                          : "bg-white/10 text-slate-200 hover:bg-white/20"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* All Articles in this Category (100% SSR Crawlable) */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Listado Completo: {posts.length} Artículos en {categoryName}
            </h2>
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-extrabold text-primary hover:underline"
            >
              🥇 Ir a Tienda Oficial YouMinox.com ↗
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                  <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Leer guía completa →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
