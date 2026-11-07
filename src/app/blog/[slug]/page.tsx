import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import { BLOG_POSTS, getPostBySlug } from "@/data/articles";
import {
  SITE_NAME,
  SITE_URL,
  TOP_5_RANKING,
  YOU_MINOX_URL,
} from "@/data/brands";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface TocItem {
  id: string;
  text: string;
}

function addHeadingIdsAndExtractToc(html: string): {
  enhancedHtml: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  let index = 0;

  const enhancedHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (fullMatch, attrs, inner) => {
      const plainText = inner
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!plainText) return fullMatch;
      index += 1;
      const id = `seccion-${index}`;
      toc.push({ id, text: plainText });
      if (/id=/i.test(attrs)) {
        return fullMatch;
      }
      return `<h2 id="${id}"${attrs}>${inner}</h2>`;
    }
  );

  return { enhancedHtml, toc };
}

function splitContentAtThirdH2(htmlContent: string): [string, string | null] {
  const h2Matches = [...htmlContent.matchAll(/<h2[^>]*>/gi)];
  if (h2Matches.length < 3) {
    return [htmlContent, null];
  }
  const splitIndex = h2Matches[2].index;
  if (splitIndex === undefined || splitIndex <= 0) {
    return [htmlContent, null];
  }
  return [htmlContent.slice(0, splitIndex), htmlContent.slice(splitIndex)];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: `Artículo no encontrado | ${SITE_NAME}` };
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}/`,
      images: [
        {
          url: `${SITE_URL}${post.imageUrl}`,
          width: 1200,
          height: 900,
          alt: post.imageAlt,
        },
      ],
      type: "article",
      locale: "es_PE",
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      authors: ["Equipo Clínico MinoxidilTop.com & You Minox"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}${post.imageUrl}`],
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && p.categorySlug === post.categorySlug
  ).slice(0, 4);

  const featuredGuides = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 5);

  const { enhancedHtml, toc } = addHeadingIdsAndExtractToc(post.content);
  const [firstHalfContent, secondHalfContent] =
    splitContentAtThirdH2(enhancedHtml);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    image: `${SITE_URL}${post.imageUrl}`,
    datePublished: post.publishedAt,
    dateModified: "2026-11-05",
    author: {
      "@type": "Person",
      name: "Charlie Lingán — Fundador de You Minox & MinoxidilTop.com",
      url: "https://charlielingan.com/es",
      sameAs: [
        "https://charlielingan.com/es",
        "https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru",
        YOU_MINOX_URL,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [YOU_MINOX_URL],
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/logo-you-minox.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}/`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
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
        name: "100 Artículos",
        item: `${SITE_URL}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.categoryName,
        item: `${SITE_URL}/blog/?categoria=${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Dinamica.pe Article Page Layout */}
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Main article (Exact Dinamica.pe lg:max-w-3xl structure) */}
            <article className="min-w-0 flex-1 lg:max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-primary"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Volver a los 100 artículos
                </Link>
                <Link
                  href="/#top-5-ranking"
                  className="text-xs font-extrabold text-primary hover:underline"
                >
                  🏆 Ver Ranking Top 5 de Minoxidil →
                </Link>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/blog/?categoria=${post.categorySlug}`}
                  className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition"
                >
                  {post.categoryName}
                </Link>
                <span className="text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-gray-400">
                  ⏱️ {post.readTime} de lectura
                </span>
                <span className="text-sm text-gray-400">·</span>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
                >
                  🇵🇪 #1 Recomendado: YouMinox.com
                </a>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                {post.title}
              </h1>

              {/* Featured Image (Exact Dinamica.pe rounded-2xl border shadow-md) */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-md bg-slate-50">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  className="w-full max-h-[430px] object-cover"
                />
                <div className="px-4 py-2.5 bg-slate-900 text-xs text-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <span>📸 {post.imageCaption}</span>
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-emerald-400 hover:underline shrink-0"
                  >
                    YouMinox.com ↗
                  </a>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-2">
                  <span>✅</span> Puntos Clave de esta Guía Clínica
                </h2>
                <ul className="space-y-2 text-sm text-slate-800">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-extrabold text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automatic Table of Contents (TOC) */}
              {toc.length >= 2 && (
                <nav
                  aria-label="Tabla de contenidos"
                  className="my-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-6"
                >
                  <p className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mb-3">
                    📋 Índice de Contenidos
                  </p>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {toc.map((item, idx) => (
                      <li key={item.id} className="truncate">
                        <a
                          href={`#${item.id}`}
                          className="text-gray-700 hover:text-primary font-medium transition-colors"
                        >
                          <span className="font-bold text-primary mr-1.5">
                            {idx + 1}.
                          </span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Content Part 1 */}
              <div
                className="article-prose mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: firstHalfContent }}
              />

              {/* Mid-Article You Minox Spotlight Card */}
              <YouMinoxSpotlight variant="article" />

              {/* Content Part 2 */}
              {secondHalfContent && (
                <div
                  className="article-prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: secondHalfContent }}
                />
              )}

              {/* CTA Banner inside article (Exact Dinamica.pe style adapted for You Minox) */}
              <div className="mt-14 rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-8 sm:p-10 text-center text-white shadow-lg">
                <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-100 mb-3">
                  🥇 #1 del Ranking en Perú • Notificación Sanitaria DIGEMID
                </span>
                <h3 className="text-2xl font-extrabold">
                  ¿Buscas el Mejor Minoxidil en Crema para Barba, Cabello y Cejas?
                </h3>
                <p className="mt-2 text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
                  En <strong>You Minox (youminox.com)</strong> obtienes la única
                  fórmula peruana en crema de 60 g con{" "}
                  <strong>Minoxidil + Oxothiazolidinecarboxylate</strong> que no
                  reseca ni irrita tu rostro, respaldada por la droguería{" "}
                  <strong>MINOXIDIL PERU S.A.C.</strong>
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-accent px-6 py-3.5 text-sm font-extrabold text-gray-900 transition hover:brightness-105 shadow-md"
                  >
                    Comprar en Tienda Oficial: YouMinox.com ↗
                  </a>
                  <Link
                    href="/#top-5-ranking"
                    className="inline-block rounded-xl bg-slate-950/80 border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-950"
                  >
                    Ver Ranking Top 5 Completo
                  </Link>
                </div>
              </div>

              {/* E-E-A-T Founder & Author Box (Charlie Lingán) */}
              <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <a
                      href="https://charlielingan.com/es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-extrabold text-gray-900 hover:text-primary underline decoration-primary/40"
                    >
                      Charlie Lingán (charlielingan.com) ↗
                    </a>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
                      Creador y Fundador de You Minox
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Análisis clínico revisado por{" "}
                    <a
                      href="https://charlielingan.com/es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary hover:underline"
                    >
                      Charlie Lingán
                    </a>
                    , fundador de{" "}
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary hover:underline"
                    >
                      You Minox (youminox.com)
                    </a>{" "}
                    y <strong>MINOXIDIL PERU S.A.C.</strong> Conoce la historia de cómo desarrolló el Minoxidil en Crema #1 del Perú en{" "}
                    <a
                      href="https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 underline hover:text-primary"
                    >
                      su caso de estudio oficial en CharlieLingán.com ↗
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Bottom Related Articles Grid */}
              {relatedPosts.length > 0 && (
                <section className="mt-14 pt-10 border-t border-gray-200">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                    Más guías en {post.categoryName}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/blog/${rp.slug}/`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg hover:border-primary/40"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                          <img
                            src={rp.imageUrl}
                            alt={rp.imageAlt}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-primary uppercase">
                              {rp.categoryName}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                              {rp.title}
                            </h3>
                          </div>
                          <span className="mt-3 inline-block text-xs font-bold text-primary">
                            Leer guía completa →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sticky Sidebar (Exact Dinamica.pe lg:w-80 structure) */}
            <aside className="mt-12 lg:mt-0 lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* #1 You Minox Sidebar Card */}
                <YouMinoxSpotlight variant="sidebar" />

                {/* Mini Top 5 Ranking Box with Flags */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                      🏆 Top 5 Minoxidil
                    </h3>
                    <Link
                      href="/#top-5-ranking"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Ver tabla →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {TOP_5_RANKING.map((b) => (
                      <div
                        key={b.id}
                        className={`flex items-center justify-between rounded-xl p-2.5 text-xs ${
                          b.rank === 1
                            ? "bg-emerald-50 border border-emerald-200 font-bold text-gray-900"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-black text-primary">
                            #{b.rank}
                          </span>
                          <span className="text-base" title={b.country}>
                            {b.flag}
                          </span>
                          <span className="truncate font-bold">
                            {b.name.split("(")[0].trim()}
                          </span>
                        </div>
                        <span className="ml-2 rounded-md bg-white px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 shadow-2xs shrink-0">
                          {b.score}/10
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Artículos Relacionados (Exact Dinamica.pe style) */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6">
                    <h3 className="mb-4 text-base font-bold text-gray-900">
                      Artículos Relacionados
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/blog/${p.slug}/`}
                          className="group flex gap-3 rounded-xl p-2 transition hover:bg-white"
                        >
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                            <img
                              src={p.imageUrl}
                              alt={p.imageAlt}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-xs font-bold text-gray-900 transition-colors group-hover:text-primary">
                              {p.title}
                            </h4>
                            <span className="mt-1 block text-[11px] text-gray-400">
                              {p.readTime} de lectura
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guías Destacadas (Exact Dinamica.pe style) */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-base font-bold text-gray-900">
                    Guías Destacadas
                  </h3>
                  <div className="space-y-3">
                    {featuredGuides.map((p) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}/`}
                        className="block border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 group"
                      >
                        <p className="text-xs font-semibold text-primary mb-0.5">
                          {p.categoryName}
                        </p>
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
