import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveComparator from "@/components/InteractiveComparator";
import PhotoShowcaseGallery from "@/components/PhotoShowcaseGallery";
import {
  TOP_5_RANKING,
  EXTENDED_WORLD_MINOXIDIL,
  FORMAT_COMPARISON_ROWS,
  ZONE_COMPARISON_DATA,
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
} from "@/data/brands";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type CategorySlug,
} from "@/data/articles";
import { YOU_MINOX_PHOTOS } from "@/data/photos";

const HOME_FAQS = [
  {
    q: "¿Cuál es el mejor Minoxidil en el Perú actualmente?",
    a: "El #1 indiscutible del ranking en el Perú es You Minox (disponible en youminox.com y Saga Falabella), con una puntuación de 9.9/10. Es el único formulado en crema dermo-hidratante de 60 g con Minoxidil y Oxothiazolidinecarboxylate que no reseca ni irrita la piel, y cuenta con Notificación Sanitaria Obligatoria vigente ante DIGEMID a través de la droguería MINOXIDIL PERU S.A.C.",
  },
  {
    q: "¿Por qué en el Perú solo se consideran dos marcas (You Minox y Kirkland)?",
    a: "En el mercado peruano únicamente destacan You Minox (#1) y Kirkland Signature (#2, importado de EE. UU.). No existen más opciones recomendables en el país porque todo producto tópico legítimo requiere Notificación Sanitaria Obligatoria (DIGEMID) que respalde su pureza y seguridad. Las lociones informales sin registro sanitario exponen al usuario a adulteraciones y dermatitis severa.",
  },
  {
    q: "¿Por qué You Minox en Crema es superior al Minoxidil líquido tradicional?",
    a: "El minoxidil líquido tradicional contiene altos niveles de alcohol y propilenglicol que queman la barrera cutánea del rostro, produciendo picazón, enrojecimiento y descamación blanca ('caspa de barba'). You Minox en crema hidrata la piel, se absorbe en 2 minutos sin dejar brillo graso y no se escurre, permitiendo aplicarlo con precisión en barba, entradas capilares y cejas.",
  },
  {
    q: "¿Cuáles son los mejores Minoxidil de Estados Unidos y Amazon USA?",
    a: "Dentro del mercado de Estados Unidos y Amazon.com destacan Kirkland Signature (#2 de nuestro ranking general), Men's Rogaine Foam (#3), Hims Topical Minoxidil (#4) y Foligain / Keeps (#5), además de marcas de supermercado como Amazon Basic Care y Equate (Walmart). Sin embargo, en Perú resultan costosos de importar o sufren un alto riesgo de falsificación en reventa informal.",
  },
  {
    q: "¿Dónde comprar You Minox 100% original con envío a todo el Perú?",
    a: "Puedes comprarlo directamente en la tienda oficial https://youminox.com con envíos rápidos a Lima y todas las provincias del Perú, así como en tiendas por departamento autorizadas como Saga Falabella.",
  },
];

export default function HomePage() {
  const featuredArticles = BLOG_POSTS.slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Portal Oficial de Ranking y Comparativa de los Mejores Minoxidil de Perú y Estados Unidos.",
        inLanguage: "es-PE",
      },
      {
        "@type": "ItemList",
        name: "Top 5 Mejores Minoxidil del Mercado (Perú y Estados Unidos)",
        description:
          "Ranking clínico de las 5 mejores marcas de Minoxidil evaluando eficacia folicular, tolerancia en piel y respaldo sanitario DIGEMID.",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: TOP_5_RANKING.length,
        itemListElement: TOP_5_RANKING.map((b) => ({
          "@type": "ListItem",
          position: b.rank,
          item: {
            "@type": "Product",
            name: `${b.name} (${b.country})`,
            description: b.summary,
            image: `${SITE_URL}${b.imageUrl}`,
            brand: {
              "@type": "Brand",
              name: b.name.split("(")[0].trim(),
            },
            ...(b.officialUrl ? { url: b.officialUrl } : {}),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: b.score.toString(),
              bestRating: "10",
              worstRating: "1",
              ratingCount: b.rank === 1 ? "15400" : "4200",
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: HOME_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        {/* ─────────────────────────────────────────────────────────────────
            1. HERO — PORTAL DE RANKING OFICIAL + SNAPSHOT TOP 5 CON BANDERAS
            ───────────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#042f2e] to-slate-950 text-white pt-12 pb-20 border-b border-emerald-500/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Left 7 Cols: Ranking Title & Top 5 Quick Podium */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-4 py-1.5 text-xs font-extrabold text-emerald-300">
                  <span>🏆 PÁGINA OFICIAL DE RANKING Y COMPARATIVA DE MINOXIDIL</span>
                  <span className="text-amber-300">• PERÚ 🇵🇪 & USA 🇺🇸</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                  Ranking de los{" "}
                  <span className="text-emerald-400">Mejores Minoxidil</span>{" "}
                  para Barba, Cabello y Cejas
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Analizamos clínica y dermatológicamente todas las marcas de
                  Minoxidil de <strong>Perú, Estados Unidos y Amazon</strong>.
                  En el Perú solo destacan dos marcas referentes:{" "}
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 font-extrabold underline hover:text-white"
                  >
                    #1 You Minox (Crema con Notificación Sanitaria DIGEMID)
                  </a>{" "}
                  y <strong>#2 Kirkland Signature</strong>, seguidas por el Top
                  3 del mercado estadounidense.
                </p>

                {/* Quick Summary Table of Top 5 with Flags */}
                <div className="rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                      📊 Resumen Oficial: Top 5 Mejores Minoxidil
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Evaluación Dermatológica & DIGEMID
                    </span>
                  </div>
                  <div className="space-y-2">
                    {TOP_5_RANKING.map((item) => (
                      <a
                        key={item.id}
                        href={`#puesto-${item.rank}`}
                        className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition ${
                          item.rank === 1
                            ? "bg-gradient-to-r from-emerald-500/25 via-emerald-500/15 to-amber-500/20 border border-emerald-400/50 shadow-md"
                            : "bg-slate-950/60 hover:bg-slate-950 border border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                              item.rank === 1
                                ? "bg-amber-400 text-slate-950"
                                : item.rank === 2
                                ? "bg-slate-300 text-slate-950"
                                : item.rank === 3
                                ? "bg-amber-700 text-white"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            #{item.rank}
                          </span>
                          <span
                            className="text-xl shrink-0"
                            title={`País: ${item.country}`}
                          >
                            {item.flag}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {item.country} • {item.format}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {item.rank === 1 && (
                            <span className="hidden sm:inline-block rounded-full bg-emerald-400/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-300">
                              ✓ DIGEMID PERÚ
                            </span>
                          )}
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-black ${
                              item.rank === 1
                                ? "bg-emerald-400 text-slate-950"
                                : "bg-slate-800 text-emerald-300"
                            }`}
                          >
                            {item.score}/10
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber-400 hover:bg-amber-300 px-6 py-3.5 text-xs sm:text-sm font-black text-slate-950 shadow-lg transition hover:scale-[1.02]"
                  >
                    🥇 Visitar el #1 del Perú: YouMinox.com ↗
                  </a>
                  <a
                    href="#cuadros-comparativos"
                    className="rounded-xl border border-white/25 bg-white/10 hover:bg-white/15 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition"
                  >
                    📊 Ver Cuadros Comparativos
                  </a>
                  <Link
                    href="/blog/"
                    className="rounded-xl border border-emerald-400/40 bg-emerald-950/60 hover:bg-emerald-900/60 px-5 py-3.5 text-xs sm:text-sm font-bold text-emerald-300 transition"
                  >
                    📚 Explorar 500 Artículos SEO
                  </Link>
                </div>
              </div>

              {/* Right 5 Cols: #1 Winner Spotlight Card with Real Studio Photo */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-7 shadow-2xl relative">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1 text-xs font-black uppercase text-slate-950 shadow">
                      🥇 Puesto #1 • Top Perú 🇵🇪
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-extrabold text-emerald-300">
                      ★ 9.9 / 10 Puntos
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 aspect-[4/3] mb-5">
                    <img
                      src={YOU_MINOX_PHOTOS[26].src}
                      alt="You Minox #1 Mejor Minoxidil del Perú en Crema para Barba, Cabello y Cejas"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-slate-950/85 backdrop-blur-md p-3 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-white">
                          🇵🇪 You Minox — Crema para Barba (60 g)
                        </p>
                        <p className="text-[11px] text-emerald-300">
                          Minoxidil + Oxothiazolidinecarboxylate • Sin Irritación
                        </p>
                      </div>
                      <span className="text-lg">🏆</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                    ¿Por Qué <span className="text-emerald-400">You Minox</span>{" "}
                    es el Mejor Minoxidil del Perú?
                  </h2>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-black">✓</span>
                      <span>
                        <strong>Formato en Crema Dermo-Hidratante:</strong> No
                        reseca, no pica ni deja caspa blanca como los líquidos.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-black">✓</span>
                      <span>
                        <strong>Notificación Sanitaria DIGEMID:</strong>{" "}
                        Respaldo formal de Droguería{" "}
                        <strong>MINOXIDIL PERU S.A.C.</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-black">✓</span>
                      <span>
                        <strong>Triple Zona sin Goteo:</strong> Barba, entradas
                        capilares y cejas con +600,000 seguidores en redes.
                      </span>
                    </li>
                  </ul>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-emerald-400 hover:bg-emerald-300 py-3 text-center text-xs sm:text-sm font-black text-slate-950 shadow-md transition"
                    >
                      Ir a YouMinox.com ↗
                    </a>
                    <Link
                      href="/blog/you-minox-el-mejor-minoxidil-del-peru-analisis-completo/"
                      className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 py-3 text-center text-xs sm:text-sm font-bold text-white transition"
                    >
                      Leer Reseña #1 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            2. ALERTA SANITARIA PERÚ: POR QUÉ SOLO HAY 2 MINOXIDIL EN PERÚ
            ───────────────────────────────────────────────────────────────── */}
        <section className="bg-emerald-950 text-white py-6 px-4 border-b border-emerald-800/60">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-lg">
                🇵🇪
              </span>
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                <strong className="text-amber-300 uppercase tracking-wide">
                  Nota Regulatoria para el Perú (DIGEMID):
                </strong>{" "}
                En el Perú únicamente destacan dos marcas:{" "}
                <strong className="text-white">#1 You Minox</strong> (con
                Notificación Sanitaria Obligatoria vigente ante DIGEMID) y{" "}
                <strong className="text-white">#2 Kirkland Signature</strong>{" "}
                (importado de EE. UU.). No recomendamos ninguna otra marca local
                porque es obligatorio contar con{" "}
                <strong>Notificación Sanitaria</strong> para garantizar que el
                producto sea seguro para tu piel.
              </p>
            </div>
            <Link
              href="/blog/por-que-en-peru-solo-destacan-dos-marcas-de-minoxidil-you-minox-y-kirkland/"
              className="shrink-0 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-extrabold text-amber-300 transition"
            >
              Ver Guía DIGEMID →
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            3. RANKING TOP 5 DETALLADO CON BANDERAS (1° YOU MINOX, 2° KIRKLAND, 3-5° USA)
            ───────────────────────────────────────────────────────────────── */}
        <section id="top-5-ranking" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
                🏆 Ranking Oficial Actualizado • Perú 🇵🇪 y Estados Unidos 🇺🇸
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Top 5 Mejores Minoxidil del Mercado
              </h2>
              <p className="mt-4 text-slate-600 text-base sm:text-lg">
                Cada marca ha sido evaluada en 5 pilares clínicos:{" "}
                <strong>
                  Eficacia Folicular, Cuidado Dermatológico de la Piel,
                  Facilidad de Aplicación, Respaldo Sanitario (DIGEMID / FDA) y
                  Relación Precio-Resultados
                </strong>
                .
              </p>
            </div>

            <div className="space-y-10">
              {TOP_5_RANKING.map((brand) => (
                <article
                  key={brand.id}
                  id={`puesto-${brand.rank}`}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    brand.rank === 1
                      ? "border-2 border-primary bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 shadow-2xl ring-4 ring-primary/10"
                      : "border-slate-200 bg-white shadow-md hover:shadow-lg"
                  }`}
                >
                  {/* Top Ribbon */}
                  <div
                    className={`px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold ${
                      brand.rank === 1
                        ? "bg-slate-950 text-white"
                        : brand.rank === 2
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          brand.rank === 1 ? "text-amber-400" : "text-emerald-400"
                        }
                      >
                        {brand.badgeText}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold">
                        <span className="text-base">{brand.flag}</span> País de
                        Origen: <strong>{brand.country}</strong>
                      </span>
                      <span className="hidden sm:inline text-[11px] opacity-80">
                        {brand.reviewsCount}
                      </span>
                    </div>
                  </div>

                  {/* Main Card Body */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-12 items-start">
                      {/* Left 4 Cols: Product Visual + Country Flag + Score Box */}
                      <div className="lg:col-span-4 flex flex-col items-center">
                        <div
                          className={`w-full rounded-2xl border p-6 flex flex-col items-center justify-center relative ${
                            brand.rank === 1
                              ? "border-emerald-200 bg-white shadow-inner"
                              : "border-slate-100 bg-slate-50"
                          }`}
                        >
                          {/* Rank Number Badge */}
                          <div
                            className={`absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl font-black text-lg shadow-md ${
                              brand.rank === 1
                                ? "bg-amber-400 text-slate-950"
                                : brand.rank === 2
                                ? "bg-slate-800 text-white"
                                : "bg-slate-200 text-slate-800"
                            }`}
                          >
                            #{brand.rank}
                          </div>

                          {/* Country Flag Pill */}
                          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1 text-xs font-extrabold text-slate-800 shadow-2xs">
                            <span className="text-lg">{brand.flag}</span>
                            <span>{brand.country}</span>
                          </div>

                          <img
                            src={brand.imageUrl}
                            alt={`${brand.name} — ${brand.country}`}
                            className="h-56 w-auto object-contain my-4 drop-shadow-md"
                            loading={brand.rank <= 2 ? "eager" : "lazy"}
                          />

                          {/* Score Meter */}
                          <div className="w-full mt-2 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div>
                              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Calificación Clínica
                              </span>
                              <span className="text-xs font-bold text-slate-700">
                                {brand.rank === 1
                                  ? "Excelente • Top #1 Perú"
                                  : brand.rank === 2
                                  ? "Bueno • #2 en Perú / USA"
                                  : "Mercado EE. UU. (Amazon)"}
                              </span>
                            </div>
                            <div
                              className={`rounded-2xl px-4 py-2 text-center ${
                                brand.rank === 1
                                  ? "bg-primary text-white"
                                  : "bg-slate-900 text-white"
                              }`}
                            >
                              <span className="text-xl font-black">
                                {brand.score}
                              </span>
                              <span className="text-xs opacity-75"> / 10</span>
                            </div>
                          </div>
                        </div>

                        {/* Mini 4-Photo Studio Strip for #1 You Minox */}
                        {brand.galleryImages && (
                          <div className="mt-4 w-full">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 mb-2 text-center">
                              📸 Fotos Reales de Estudio You Minox:
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                              {brand.galleryImages.map((imgSrc, i) => (
                                <a
                                  key={i}
                                  href="#galeria-you-minox"
                                  className="aspect-square rounded-xl overflow-hidden border border-emerald-200 bg-slate-100 hover:opacity-90 transition"
                                >
                                  <img
                                    src={imgSrc}
                                    alt={`You Minox foto profesional ${i + 1}`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right 8 Cols: Detailed Specs, Pros/Cons & Verdict */}
                      <div className="lg:col-span-8 space-y-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-extrabold text-slate-800">
                              {brand.flag} {brand.country}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-800">
                              Formato: {brand.format}
                            </span>
                            {brand.hasDigemidNotification && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-extrabold text-amber-900">
                                ✓ Notificación Sanitaria DIGEMID
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                            #{brand.rank}. {brand.name}{" "}
                            <span className="text-2xl">{brand.flag}</span>
                          </h3>
                          <p className="text-sm font-bold text-primary mt-0.5">
                            {brand.subtitle}
                          </p>
                          <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                            {brand.summary}
                          </p>
                        </div>

                        {/* Technical Specs Grid */}
                        <div className="grid gap-3 sm:grid-cols-2 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-xs">
                          <div>
                            <span className="font-bold text-slate-400 uppercase block">
                              Fórmula y Vehículo:
                            </span>
                            <span className="font-bold text-slate-900">
                              {brand.concentration} ({brand.vehicleBase})
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-400 uppercase block">
                              Tolerancia en Piel y Barba:
                            </span>
                            <span className="font-bold text-slate-900">
                              {brand.skinTolerance}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-400 uppercase block">
                              Situación Sanitaria en Perú:
                            </span>
                            <span
                              className={`font-bold ${
                                brand.hasDigemidNotification
                                  ? "text-emerald-700"
                                  : "text-slate-800"
                              }`}
                            >
                              {brand.sanitaryStatusPeru}
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-400 uppercase block">
                              Disponibilidad y Precio Ref.:
                            </span>
                            <span className="font-bold text-slate-900">
                              {brand.estimatedPricePeru}
                            </span>
                          </div>
                        </div>

                        {/* 5 Sub-scores Breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                          {[
                            {
                              label: "Eficacia",
                              val: brand.scoresBreakdown.efficacy,
                            },
                            {
                              label: "Cuidado Piel",
                              val: brand.scoresBreakdown.skinCare,
                            },
                            {
                              label: "Fácil Uso",
                              val: brand.scoresBreakdown.easeOfUse,
                            },
                            {
                              label: "Seguridad",
                              val: brand.scoresBreakdown.safetyAndLegality,
                            },
                            {
                              label: "Calidad/Precio",
                              val: brand.scoresBreakdown.valueForMoney,
                            },
                          ].map((sc) => (
                            <div
                              key={sc.label}
                              className="rounded-xl border border-slate-200 bg-white p-2.5 text-center"
                            >
                              <div className="text-[11px] font-bold text-slate-500">
                                {sc.label}
                              </div>
                              <div className="text-base font-black text-slate-900 mt-0.5">
                                {sc.val.toFixed(1)}
                              </div>
                              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    brand.rank === 1
                                      ? "bg-primary"
                                      : "bg-slate-600"
                                  }`}
                                  style={{ width: `${sc.val * 10}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Pros & Cons Columns */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-2.5">
                              👍 Ventajas Destacadas
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-800">
                              {brand.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="font-black text-emerald-600">
                                    ✓
                                  </span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-2.5">
                              ⚠️ Puntos a Considerar
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-800">
                              {brand.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="font-black text-amber-600">
                                    •
                                  </span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Verdict + CTA Bar */}
                        <div className="rounded-2xl bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            <strong className="text-emerald-400">
                              Veredicto Oficial:
                            </strong>{" "}
                            {brand.verdict}
                          </p>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                            {brand.officialUrl && (
                              <a
                                href={brand.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-3 text-center text-xs font-black text-slate-950 shadow-md transition"
                              >
                                Visitar YouMinox.com ↗
                              </a>
                            )}
                            <Link
                              href={`/blog/${brand.relatedArticleSlug}/`}
                              className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3 text-center text-xs font-bold text-white transition"
                            >
                              Ver Análisis Completo →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            4. SECCIÓN DE CUADROS COMPARATIVOS (3 TABLAS ESPECIALIZADAS)
            ───────────────────────────────────────────────────────────────── */}
        <section
          id="cuadros-comparativos"
          className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
                📊 Cuadros Comparativos Clínicos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Comparativas de Marcas, Formatos y Zonas de Aplicación
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Compara de un vistazo por qué el formato en{" "}
                <strong>crema dermo-hidratante de You Minox (#1 en Perú)</strong>{" "}
                supera a las soluciones líquidas y espumas importadas.
              </p>
            </div>

            {/* CUADRO 1: MATRIZ DEL TOP 5 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                    Cuadro Comparativo #1
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Top 5 Mejores Minoxidil: Perú 🇵🇪 vs. Estados Unidos 🇺🇸
                  </h3>
                </div>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-primary hover:underline"
                >
                  Ir a la tienda oficial del #1: YouMinox.com ↗
                </a>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-4 py-3.5 font-extrabold">Puesto & Marca</th>
                      <th className="px-4 py-3.5 font-extrabold">País</th>
                      <th className="px-4 py-3.5 font-extrabold">Formato</th>
                      <th className="px-4 py-3.5 font-extrabold">Efecto en la Piel</th>
                      <th className="px-4 py-3.5 font-extrabold">Notificación Sanitaria Perú</th>
                      <th className="px-4 py-3.5 font-extrabold">Zonas Ideales</th>
                      <th className="px-4 py-3.5 font-extrabold">Puntaje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {TOP_5_RANKING.map((b) => (
                      <tr
                        key={b.id}
                        className={
                          b.rank === 1 ? "bg-emerald-50/80 font-semibold" : ""
                        }
                      >
                        <td className="px-4 py-3.5 font-extrabold text-slate-900">
                          #{b.rank} {b.name.split("(")[0].trim()}
                          {b.rank === 1 && (
                            <span className="block text-[11px] text-primary font-extrabold">
                              ★ Ganador Top Perú (youminox.com)
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-base mr-1">{b.flag}</span>
                          {b.country}
                        </td>
                        <td className="px-4 py-3.5">{b.format}</td>
                        <td className="px-4 py-3.5">{b.skinTolerance}</td>
                        <td className="px-4 py-3.5">
                          {b.hasDigemidNotification ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-900">
                              ✅ Sí (DIGEMID - MINOXIDIL PERU S.A.C.)
                            </span>
                          ) : (
                            <span className="text-slate-600">
                              {b.sanitaryStatusPeru}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          {b.bestFor.join(", ")}
                        </td>
                        <td className="px-4 py-3.5 font-black text-emerald-700 whitespace-nowrap">
                          {b.score} / 10
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CUADRO 2: CREMA VS LÍQUIDO VS ESPUMA */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Cuadro Comparativo #2
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Comparativa de Vehículos: Crema (You Minox) vs. Líquido vs. Espuma (Foam)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Descubre por qué la textura en crema elimina los efectos secundarios del alcohol y el propilenglicol.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="px-4 py-3.5 font-extrabold">Característica Clínica</th>
                      <th className="px-4 py-3.5 font-extrabold bg-emerald-900 text-emerald-100">
                        🥇 Formato Crema (You Minox 60 g 🇵🇪)
                      </th>
                      <th className="px-4 py-3.5 font-extrabold">
                        Formato Líquido Tradicional (Kirkland / Genéricos 🇺🇸)
                      </th>
                      <th className="px-4 py-3.5 font-extrabold">
                        Formato Espuma Aerosol (Rogaine Foam 🇺🇸)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {FORMAT_COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3.5 font-extrabold text-slate-900">
                          {row.feature}
                        </td>
                        <td className="px-4 py-3.5 bg-emerald-50/60 font-bold text-emerald-950">
                          {row.youMinoxCream}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700">
                          {row.liquidGeneric}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700">
                          {row.foamAerosol}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CUADRO 3: COMPARATIVA POR ZONA (BARBA, CABELLO, CEJAS) */}
            <div>
              <div className="mb-6 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Cuadro Comparativo #3
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  ¿Qué Minoxidil Elegir Según la Zona (Barba, Cabello o Cejas)?
                </h3>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {ZONE_COMPARISON_DATA.map((item) => (
                  <div
                    key={item.zone}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                          Ganador: {item.recommendedBrand}
                        </span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                        {item.zone}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {item.whyWinner}
                      </p>
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                      <strong>⚠️ Precaución:</strong> {item.avoidWarning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            5. COMPARADOR INTERACTIVO 1 VS 1 + DIAGNOSTICADOR
            ───────────────────────────────────────────────────────────────── */}
        <InteractiveComparator />

        {/* ─────────────────────────────────────────────────────────────────
            6. DIRECTORIO MUNDIAL Y AMAZON USA (#6 AL #15 CON BANDERAS)
            ───────────────────────────────────────────────────────────────── */}
        <section id="marcas-mundo" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
                🌎 Catálogo Internacional y Amazon Estados Unidos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Otros Minoxidil de Estados Unidos (Amazon), Europa y México (Puestos #6 al #15)
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Hemos recopilado <strong>todos los Minoxidil existentes</strong>{" "}
                en Amazon USA y farmacias internacionales. Recuerda que en el{" "}
                <strong>Perú solo cuentan con presencia referente You Minox (#1) y Kirkland (#2)</strong>,
                pues las demás marcas extranjeras no poseen distribución ni
                Notificación Sanitaria DIGEMID en territorio peruano.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-4 py-3.5 font-extrabold">#</th>
                    <th className="px-4 py-3.5 font-extrabold">Marca de Minoxidil</th>
                    <th className="px-4 py-3.5 font-extrabold">País</th>
                    <th className="px-4 py-3.5 font-extrabold">Dónde se Vende</th>
                    <th className="px-4 py-3.5 font-extrabold">Formato</th>
                    <th className="px-4 py-3.5 font-extrabold">Estado en Perú (DIGEMID)</th>
                    <th className="px-4 py-3.5 font-extrabold">Comparativa vs. You Minox 🇵🇪</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {EXTENDED_WORLD_MINOXIDIL.map((m) => (
                    <tr key={m.rank} className="hover:bg-slate-50">
                      <td className="px-4 py-3.5 font-black text-slate-500">
                        #{m.rank}
                      </td>
                      <td className="px-4 py-3.5 font-extrabold text-slate-900">
                        {m.name}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-semibold">
                        <span className="text-base mr-1.5">{m.flag}</span>
                        {m.country}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {m.channel}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700">{m.format}</td>
                      <td className="px-4 py-3.5 text-amber-800 font-medium">
                        {m.sanitaryNote}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">
                        {m.verdictVsYouMinox}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            7. GALERÍA DE LAS 34 FOTOS PROFESIONALES DE YOU MINOX
            ───────────────────────────────────────────────────────────────── */}
        <PhotoShowcaseGallery />

        {/* ─────────────────────────────────────────────────────────────────
            8. SECCIÓN DE ARTÍCULOS Y CATEGORÍAS SOBRE MINOXIDIL, BARBA Y CABELLO
            ───────────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
                  📚 Enciclopedia Capilar & Barba • 500 Artículos SEO
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Artículos y Guías sobre Minoxidil, Barba, Cabello, Cejas y Barberías
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base">
                  Explora nuestras <strong>12 categorías temáticas</strong> y{" "}
                  <strong>500 artículos especializados</strong> sobre cómo
                  poblar tu barba, recuperar entradas capilares, poblar cejas,
                  guías por distritos de Lima, ciudades del Perú, países del
                  mundo y barberías verificadas.
                </p>
              </div>
              <Link
                href="/blog/"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white transition hover:bg-primary"
              >
                Ver los 500 Artículos Completos →
              </Link>
            </div>

            {/* 8 Category Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
              {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => {
                const count = BLOG_POSTS.filter(
                  (p) => p.categorySlug === slug
                ).length;
                return (
                  <Link
                    key={slug}
                    href={`/blog/categoria/${slug}/`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:bg-white hover:border-primary hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-[11px] font-extrabold text-primary">
                          {count} Artículos
                        </span>
                        <span className="text-slate-400 group-hover:text-primary transition">
                          →
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition">
                        {label}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {CATEGORY_DESCRIPTIONS[slug as CategorySlug]}
                      </p>
                    </div>
                    <span className="mt-4 inline-block text-xs font-bold text-primary">
                      Explorar categoría →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* 12 Featured Articles Grid (Dinamica.pe Style) */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((post) => (
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
                    <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-white shadow">
                      {post.categoryName}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "es-PE",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
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

            <div className="mt-12 text-center">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-primary-dark"
              >
                📚 Ver el Directorio Completo de 500 Artículos y 12 Categorías →
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            9. PREGUNTAS FRECUENTES (FAQ) & BANNER FINAL YOUMINOX.COM
            ───────────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                Preguntas Frecuentes Verificadas
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Dudas Comunes sobre el Ranking de Minoxidil en Perú y USA
              </h2>
            </div>

            <div className="space-y-4">
              {HOME_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
                >
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Final CTA Banner */}
            <div className="mt-14 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-8 sm:p-12 text-center text-white shadow-2xl border border-emerald-500/30">
              <span className="inline-block rounded-full bg-amber-400 px-4 py-1 text-xs font-black uppercase text-slate-950 mb-4">
                🥇 Ganador #1 del Ranking en Perú 🇵🇪
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                Empieza tu Tratamiento con You Minox en Crema (60 g)
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
                Adquiere el único Minoxidil en crema del Perú con{" "}
                <strong>Oxothiazolidinecarboxylate</strong> y{" "}
                <strong>Notificación Sanitaria DIGEMID</strong> directamente en
                su tienda oficial con envío rápido a Lima y provincias.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-400 hover:bg-emerald-300 px-8 py-4 text-sm font-black text-slate-950 shadow-lg transition"
                >
                  Ir a la Web Oficial: YouMinox.com ↗
                </a>
                <Link
                  href="/blog/"
                  className="rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 px-8 py-4 text-sm font-bold text-white transition"
                >
                  Explorar las 500 Guías de Minoxidil
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
