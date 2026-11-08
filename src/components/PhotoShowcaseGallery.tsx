"use client";

import { useState } from "react";
import Link from "next/link";
import { YOU_MINOX_URL } from "@/data/brands";

interface EditorialShowcaseCard {
  id: number;
  src: string;
  alt: string;
  badge: string;
  title: string;
  caption: string;
  articleSlug: string;
  articleLabel: string;
  category: "barba" | "aplicacion";
  isProductPhoto?: boolean;
}

/**
 * 8 tarjetas editoriales para el Home:
 * - 6 fotos de hombres reales con barba, perfilado y cuidado capilar (75%)
 * - Máximo 2 fotos donde aparece el envase/crema en uso real (25%)
 */
const EDITORIAL_SHOWCASE_CARDS: EditorialShowcaseCard[] = [
  {
    id: 1,
    src: "/images/lifestyle/hombre-barba-incipiente-mes-2-09.webp",
    alt: "Hombre con barba corta uniforme en etapa inicial de estimulación folicular sin irritación",
    badge: "🧔 Mes 1–2 · Despertar Folicular",
    title: "Activación de Folículos en Mejillas y Candado",
    caption:
      "Durante las primeras 8 semanas se activa la microcirculación periférica y brotan los primeros vellos finos sin enrojecer ni descamar la piel.",
    articleSlug: "resultados-minoxidil-en-barba-mes-a-mes-cronologia-real",
    articleLabel: "Ver evolución mes a mes →",
    category: "barba",
  },
  {
    id: 2,
    src: "/images/lifestyle/hombre-barba-densa-madura-05.webp",
    alt: "Primer plano de barba densa y gruesa recibiendo recorte con tijera en barbería",
    badge: "🧬 Mes 3–4 · Engrosamiento",
    title: "Cierre de Huecos y Transición a Vello Terminal",
    caption:
      "El vello velloso gana queratina, grosor y pigmentación oscura, conectando el bigote con las patillas y rellenando los claros faciales.",
    articleSlug: "como-cerrar-huecos-en-la-barba-y-mejillas-con-you-minox",
    articleLabel: "Cómo cerrar huecos en mejillas →",
    category: "barba",
  },
  {
    id: 3,
    src: "/images/you-minox/you-minox-crema-barba-hielo-fresco-02.webp",
    alt: "Hombre con barba sosteniendo el tubo de You Minox Crema para Barba 60g",
    badge: "🇵🇪 #1 Ranking Perú · Sin Alcohol",
    title: "Por Qué el Formato en Crema Supera al Líquido",
    caption:
      "A diferencia de las lociones líquidas con propilenglicol que queman la cara, el vehículo dermo-hidratante cuida la barrera cutánea.",
    articleSlug: "minoxidil-en-crema-vs-minoxidil-liquido-diferencias-y-ganador",
    articleLabel: "Comparativa Crema vs Líquido →",
    category: "aplicacion",
    isProductPhoto: true,
  },
  {
    id: 4,
    src: "/images/lifestyle/hombre-barba-perfilado-profesional-01.webp",
    alt: "Barbero profesional perfilando una barba completa y tupida en cliente",
    badge: "✂️ Mes 5–6 · Barba Consolidada",
    title: "Maduración Folicular y Perfilado en Barbería",
    caption:
      "Una vez que el folículo se vuelve terminal definitivo, permite el diseño de líneas limpias en pómulos y cuello con acabado profesional.",
    articleSlug: "barba-candado-lenador-o-corporativa-como-perfilar-tus-avances-con-you-minox",
    articleLabel: "Guía de recorte y visagismo →",
    category: "barba",
  },
  {
    id: 5,
    src: "/images/lifestyle/cuidado-piel-sensible-barba-hidratacion-03.webp",
    alt: "Cuidado e hidratación profunda en piel con barba densa libre de descamación",
    badge: "🛡️ Dermatología · Cero Caspa",
    title: "Piel Hidratada y Libre de 'Caspa de Barba'",
    caption:
      "Mantener el estrato córneo nutrido evita la dermatitis de contacto y el prurito facial, logrando que el usuario complete los 6 meses.",
    articleSlug: "como-aliviar-el-ardor-picazon-y-rojez-en-la-cara-por-minoxidil",
    articleLabel: "Cómo evitar picazón y rojez →",
    category: "barba",
  },
  {
    id: 6,
    src: "/images/lifestyle/hombre-barba-ejecutiva-cabello-sano-12.webp",
    alt: "Hombre con barba ejecutiva definida y cabello grueso con excelente volumen frontal",
    badge: "💆‍♂️ Doble Acción · Barba y Cabello",
    title: "Densidad en Línea Frontal, Entradas y Barba",
    caption:
      "La estimulación vasodilatadora fortalece tanto los folículos de la barba como las entradas capilares y la coronilla sin apelmazar el pelo.",
    articleSlug: "minoxidil-para-entradas-capilares-como-recuperar-la-linea-frontal",
    articleLabel: "Protocolo para entradas y cabello →",
    category: "barba",
  },
  {
    id: 7,
    src: "/images/you-minox/you-minox-textura-crema-aplicacion-18.webp",
    alt: "Demostración de aplicación de la crema blanca You Minox junto al Manual para una Barba Poblada",
    badge: "🧴 Textura Real · Cero Goteo",
    title: "Dosificación Exacta en Menos de 60 Segundos",
    caption:
      "Consistencia en crema blanca con Minoxidil y Oxothiazolidinecarboxylate: se absorbe rápido en barba, entradas o cejas sin escurrirse.",
    articleSlug: "manual-para-una-barba-poblada-guia-oficial-you-minox",
    articleLabel: "Ver rutina paso a paso →",
    category: "aplicacion",
    isProductPhoto: true,
  },
  {
    id: 8,
    src: "/images/lifestyle/cepillado-y-direccion-vello-terminal-08.webp",
    alt: "Cepillado de barba abundante con cepillo de cerdas naturales para direccionar el vello",
    badge: "🔥 Rutina Diaria · Mantenimiento",
    title: "Cepillado, Higiene y Hábitos que Multiplican el Grosor",
    caption:
      "Combinar la aplicación tópica nocturna con limpieza térmica y cepillado de cerdas naturales mejora la oxigenación del bulbo piloso.",
    articleSlug: "como-engrosar-la-barba-delgada-y-darle-mas-densidad-con-you-minox",
    articleLabel: "Ver rutina de mantenimiento →",
    category: "barba",
  },
];

const FILTERS = [
  { id: "all", label: "Todos los Casos y Etapas (8)" },
  { id: "barba", label: "🧔 Hombres con Barba y Evolución (6)" },
  { id: "aplicacion", label: "🧴 Textura y Aplicación en Crema (2)" },
] as const;

export default function PhotoShowcaseGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredCards =
    activeFilter === "all"
      ? EDITORIAL_SHOWCASE_CARDS
      : EDITORIAL_SHOWCASE_CARDS.filter((c) => c.category === activeFilter);

  return (
    <section
      id="galeria-you-minox"
      className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
            🧔 Resultados, Estilos de Barba y Cuidado Dermatológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Evolución Folicular Real: De Piel sin Huecos a{" "}
            <span className="text-primary">Barba Poblada y Definida</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Conoce las etapas reales del crecimiento de barba y cuidado capilar: desde el despertar de los primeros folículos en el mes 2 hasta el perfilado profesional en barbería y la aplicación sin irritación.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition cursor-pointer ${
                activeFilter === f.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-primary/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Editorial 8-Card Grid (6 Bearded Men + 2 Cream Application/Product) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCards.map((card) => (
            <article
              key={card.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-xl hover:border-primary/40"
            >
              <Link
                href={`/blog/${card.articleSlug}/`}
                className="aspect-[4/3] overflow-hidden bg-slate-100 relative block"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2.5 left-2.5 rounded-full backdrop-blur-xs px-2.5 py-1 text-[10px] font-extrabold ${
                    card.isProductPhoto
                      ? "bg-emerald-950/90 text-emerald-300 border border-emerald-400/30"
                      : "bg-slate-950/80 text-white"
                  }`}
                >
                  {card.badge}
                </span>
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${card.articleSlug}/`}>
                      {card.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {card.caption}
                  </p>
                </div>
                <Link
                  href={`/blog/${card.articleSlug}/`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-primary hover:underline"
                >
                  {card.articleLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Clean Editorial Footer Bar */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-extrabold text-slate-900">
              ¿Buscas iniciar tu tratamiento sin sufrir picazón, acné ni descamación facial?
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Conoce por qué el formato en crema con Notificación Sanitaria DIGEMID lidera el ranking en Perú o explora nuestras 500 guías clínicas y geolocalizadas.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/blog/"
              className="rounded-xl border border-slate-300 bg-slate-50 px-5 py-2.5 text-xs font-extrabold text-slate-800 transition hover:border-primary hover:text-primary"
            >
              📚 Explorar las 500 Guías
            </Link>
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-primary-dark"
            >
              🥇 Ver #1 YouMinox.com ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
