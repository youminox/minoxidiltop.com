import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import { BLOG_POSTS, getPostBySlug, type BlogPost } from "@/data/articles";
import { TOP_NATIONAL_BARBERIAS } from "@/data/barberias-peru";
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
      authors: ["Charlie Lingán — Equipo Clínico MinoxidilTop.com & You Minox"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}${post.imageUrl}`],
    },
  };
}

/**
 * Renderiza el módulo superior especializado según las 6 plantillas dinámicas (Diseño A..F)
 * para evitar cualquier repetición visual entre categorías.
 */
function VariantTopModule({ post }: { post: BlogPost }) {
  switch (post.layoutVariant) {
    case "geoperu": {
      const geo = post.geoPeruInfo;
      return (
        <div className="mt-8 space-y-6">
          {/* Ficha Geolocalizada estilo Dinamica.pe */}
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-extrabold text-emerald-300">
                📍 Guía Oficial Geolocalizada en {geo?.locationName || "Perú"}
              </span>
              <span className="text-xs font-bold text-amber-300">
                🇵🇪 Cobertura Directa: YouMinox.com + GuíaDeBarberías.com
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Zona / Región
                </span>
                <p className="mt-1 text-sm font-extrabold text-white">
                  {geo?.locationName}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {geo?.regionLabel}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Factor Climático Local
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-200 leading-relaxed">
                  {geo?.climateNote}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Ejes de Cobertura
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-200 leading-relaxed">
                  {geo?.avenuesNote}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/15 p-3.5 border border-emerald-400/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                  #1 Recomendado en {geo?.locationName}
                </span>
                <p className="mt-1 text-xs font-extrabold text-white">
                  You Minox Crema 60g (DIGEMID)
                </p>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  {geo?.deliveryTime}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjetas de Top Barberías Reales de esa Zona (Estilo GuíaDeBarberías.com) */}
          {post.localBarberias && post.localBarberias.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                    💈 Directorio Verificado por GuíaDeBarberías.com
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Top Barberías para Perfilar tu Barba en{" "}
                    {geo?.locationName || "Perú"}
                  </h2>
                </div>
                <a
                  href="https://guiadebarberias.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-primary transition"
                >
                  Ver Ranking en GuíaDeBarberías.com ↗
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {post.localBarberias.map((b) => (
                  <a
                    key={b.id}
                    href={`https://guiadebarberias.com/barberia/${b.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-primary hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {b.badge}
                        </span>
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-900">
                          ★ {b.rating.toFixed(1)} ({b.reviewCount})
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-extrabold text-slate-900 group-hover:text-primary">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📍 {b.address}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-700 mt-2">
                        ✂️ {b.styleTag}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>
                        Corte: {b.cutPrice} · Barba: {b.beardPrice}
                      </span>
                      <span className="text-primary font-extrabold group-hover:underline">
                        Ver ficha ↗
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    case "geomundo": {
      const world = post.geoMundoInfo;
      return (
        <div className="mt-8 rounded-2xl border-2 border-blue-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{world?.flag || "🌎"}</span>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Observatorio Internacional de Minoxidil y Barbería
                </span>
                <h2 className="text-lg font-extrabold text-white">
                  Mercado Analizado: {world?.locationName}
                </h2>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
              Regulador Oficial: {world?.regulator}
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
              <span className="text-[11px] font-bold uppercase text-blue-300 block">
                Marcas Locales Comercializadas
              </span>
              <p className="mt-1 text-xs font-bold text-white leading-relaxed">
                {world?.localBrands}
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
              <span className="text-[11px] font-bold uppercase text-blue-300 block">
                Moneda y Entorno Regulatorio
              </span>
              <p className="mt-1 text-xs font-bold text-white">
                {world?.currency} · Normativa {world?.regulator}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/20 p-3.5 border border-emerald-400/40">
              <span className="text-[11px] font-bold uppercase text-emerald-300 block">
                Referente en Formato Crema (Perú 🇵🇪)
              </span>
              <p className="mt-1 text-xs font-extrabold text-white">
                #1 You Minox Crema 60g (9.9/10)
              </p>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-emerald-300 underline mt-0.5 inline-block"
              >
                Conocer fórmula en YouMinox.com ↗
              </a>
            </div>
          </div>
        </div>
      );
    }

    case "comparativa": {
      return (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              🏆 Marcador Oficial de Laboratorio • MinoxidilTop.com
            </span>
            <span className="text-xs font-bold text-slate-500">
              Evaluación Clínica sobre 10 Puntos
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-emerald-900">
                  🥇 #1 Ganador en Perú 🇵🇪
                </span>
                <span className="rounded-lg bg-emerald-700 px-2.5 py-1 text-xs font-black text-white">
                  9.9 / 10
                </span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">
                You Minox en Crema (Tubo 60 g)
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-emerald-950 font-medium">
                <li>✓ Base en crema dermo-hidratante con Oxothiazolidinecarboxylate</li>
                <li>✓ Cero caspa, cero ardor y precisión en barba, cabello y cejas</li>
                <li>✓ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C.)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-slate-600">
                  🥈 #2 Alternativa Importada 🇺🇸
                </span>
                <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-black text-white">
                  8.5 / 10
                </span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">
                Kirkland Signature / Líquidos OTC
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 font-medium">
                <li>• Efectivo en cuero cabelludo pero contiene alto propilenglicol</li>
                <li>• Provoca resequedad y descamación blanca en piel sensible</li>
                <li>• Se escurre con facilidad y requiere 60 min para secar</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    case "timeline": {
      const stages = [
        {
          step: "Etapa 1 (Mes 1–2)",
          title: "Despertar Folicular",
          pct: "25%",
          desc: "Vasodilatación periférica y brote de los primeros vellos vellosos finos sin irritar la piel.",
        },
        {
          step: "Etapa 2 (Mes 3)",
          title: "Engrosamiento y Color",
          pct: "55%",
          desc: "Síntesis activa de queratina; los vellos ganan pigmento oscuro y cierran claros en mejillas.",
        },
        {
          step: "Etapa 3 (Mes 4–5)",
          title: "Conexión de Barba",
          pct: "85%",
          desc: "Unión de bigote, candado y patillas con recambio hacia fibras terminales resistentes.",
        },
        {
          step: "Etapa 4 (Mes 6+)",
          title: "Consolidación Terminal",
          pct: "100%",
          desc: "Raíz profunda y definitiva lista para perfilado profesional en barbería.",
        },
      ];
      return (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
              <span>⏱️</span> Cronología Clínica de Evolución Folicular (Mes 1 a Mes 6)
            </h2>
            <span className="text-xs font-bold text-primary">
              Constancia recomendada: 2 veces al día
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-emerald-200/80 bg-white p-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between text-[11px] font-extrabold text-primary">
                  <span>{s.step}</span>
                  <span>{s.pct}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-emerald-100 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: s.pct }}
                  />
                </div>
                <h3 className="mt-2 text-xs font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "barberia": {
      const faces = [
        {
          shape: "Rostro Redondo",
          tip: "Perfila pómulos en diagonal y deja mayor longitud en el mentón para estilizar y alargar el rostro.",
        },
        {
          shape: "Rostro Cuadrado",
          tip: "Suaviza los ángulos mandibulares con un degradado lateral (Beard Fade) y contornos limpios.",
        },
        {
          shape: "Rostro Ovalado",
          tip: "Proporción equilibrada que admite barba corporativa cerrada, estilo leñador o barba de 3 días.",
        },
        {
          shape: "Rostro Alargado",
          tip: "Mantén mayor densidad en patillas y mejillas con You Minox y recorta la base del mentón.",
        },
      ];
      return (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block">
                ✂️ Manual de Visagismo & Barbería Profesional
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Geometría Facial y Diseño de Barba según tu Rostro
              </h2>
            </div>
            <a
              href="https://guiadebarberias.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition"
            >
              Directorio GuíaDeBarberías.com ↗
            </a>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {faces.map((f) => (
              <div
                key={f.shape}
                className="rounded-xl bg-white/5 border border-white/10 p-3.5"
              >
                <h3 className="text-xs font-extrabold text-emerald-300">
                  🧔 {f.shape}
                </h3>
                <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
                  {f.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    default: {
      // "clinico" (Diseño E: Ficha Dermo-Científica)
      return (
        <div className="mt-8 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/50 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-teal-200/70">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
              🔬 Ficha Dermo-Científica y Biotipo Folicular
            </span>
            <span className="rounded-full bg-teal-900 px-3 py-0.5 text-[11px] font-bold text-teal-100">
              Revisión Farmacéutica • DIGEMID Perú
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Sinergia Molecular Activa
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Minoxidil + Oxothiazolidinecarboxylate
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Apertura de canales de potasio y protección antioxidante del bulbo.
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Vehículo Dermo-Compatible
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Emulsión en Crema 60 g (Cero Goteo)
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Evita la dermatitis de contacto inducida por propilenglicol líquido.
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Seguridad Oftálmica y Facial
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Fijación Localizada en Barba, Entradas y Cejas
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                No se licúa con el calor corporal ni migra hacia los párpados.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
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
  const sidebarBarberias =
    post.localBarberias && post.localBarberias.length > 0
      ? post.localBarberias
      : TOP_NATIONAL_BARBERIAS.slice(0, 4);

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
    dateModified: "2026-11-08",
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

  // Schema Geolocalizado adicional (como Dinamica.pe) cuando es de una ciudad/distrito o país
  const geoServiceSchema =
    post.geoPeruInfo || post.geoMundoInfo
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: post.title,
          description: post.excerpt,
          provider: {
            "@type": "Organization",
            name: "MINOXIDIL PERU S.A.C. — You Minox",
            url: YOU_MINOX_URL,
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: post.geoPeruInfo
              ? `${post.geoPeruInfo.locationName}, Perú`
              : post.geoMundoInfo?.locationName || "Perú y Estados Unidos",
          },
          serviceType:
            "Tratamiento Tópico Dermo-Hidratante de Minoxidil en Crema para Barba, Cabello y Cejas",
        }
      : null;

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
        name: "500 Artículos y Guías",
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
      {geoServiceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(geoServiceSchema),
          }}
        />
      )}
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

      {/* Dinamica.pe + GuíaDeBarberías.com Hybrid Article Layout */}
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Main article (lg:max-w-3xl structure) */}
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
                  Volver a las 500 guías especializadas
                </Link>
                <Link
                  href="/#top-5-ranking"
                  className="text-xs font-extrabold text-primary hover:underline"
                >
                  🏆 Ver Ranking Top 5 de Minoxidil →
                </Link>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-2.5">
                <Link
                  href={`/blog/?categoria=${post.categorySlug}`}
                  className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition"
                >
                  {post.categoryName}
                </Link>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-extrabold text-emerald-300">
                  {post.badgeLabel}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">
                  ⏱️ {post.readTime}
                </span>
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

              {/* Featured Image */}
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

              {/* Dynamic Layout Module (1 of 6 Distinct Designs) */}
              <VariantTopModule post={post} />

              {/* Key Takeaways Box */}
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-2">
                  <span>✅</span> Puntos Clave de esta Guía (#{post.id} de 500)
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

              {/* CTA Banner inside article */}
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

            {/* Sticky Sidebar (Hybrid Dinamica.pe + GuíaDeBarberías.com) */}
            <aside className="mt-12 lg:mt-0 lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* #1 You Minox Sidebar Card */}
                <YouMinoxSpotlight variant="sidebar" />

                {/* Mini Top 5 Ranking Box with Flags */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
                      🏆 Top 5 Minoxidil
                    </h3>
                    <Link
                      href="/#top-5-ranking"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Ver tabla →
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {TOP_5_RANKING.map((b) => (
                      <div
                        key={b.id}
                        className={`flex items-center justify-between rounded-xl p-2 text-xs ${
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

                {/* Top Barberías Widget (Estilo GuíaDeBarberías.com) */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      💈 Top Barberías en Perú
                    </h3>
                    <a
                      href="https://guiadebarberias.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Guía oficial ↗
                    </a>
                  </div>
                  <ul className="space-y-3">
                    {sidebarBarberias.map((b) => (
                      <li key={b.id}>
                        <a
                          href={`https://guiadebarberias.com/barberia/${b.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800 group-hover:text-primary block truncate">
                              {b.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              📍 {b.district}, {b.city} · {b.beardPrice}
                            </span>
                          </div>
                          <span className="shrink-0 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                            ★ {b.rating.toFixed(1)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://guiadebarberias.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-xl bg-slate-900 py-2.5 text-center text-xs font-extrabold text-white hover:bg-primary transition"
                  >
                    Ver +110 Barberías del Perú ↗
                  </a>
                </div>

                {/* Artículos Relacionados */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-gray-900">
                      Artículos Relacionados
                    </h3>
                    <div className="space-y-3">
                      {relatedPosts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/blog/${p.slug}/`}
                          className="group flex gap-3 rounded-xl p-1.5 transition hover:bg-white"
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

                {/* Guías Destacadas */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-gray-900">
                    Guías Destacadas
                  </h3>
                  <div className="space-y-3">
                    {featuredGuides.map((p) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}/`}
                        className="block border-b border-gray-100 pb-2.5 last:border-b-0 last:pb-0 group"
                      >
                        <p className="text-[11px] font-semibold text-primary mb-0.5">
                          {p.categoryName}
                        </p>
                        <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
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
