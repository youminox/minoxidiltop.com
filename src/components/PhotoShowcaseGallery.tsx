"use client";

import { useState } from "react";
import { YOU_MINOX_PHOTOS, type YouMinoxPhoto } from "@/data/photos";
import { YOU_MINOX_URL } from "@/data/brands";

const COLLECTIONS = [
  { id: "all", label: `Todas las Fotos (${YOU_MINOX_PHOTOS.length})` },
  { id: "premium", label: "🏆 Estudio & Barberías (8)" },
  { id: "crema", label: "🧴 Textura en Crema (9)" },
  { id: "kit", label: "📦 Unboxing & Manual (7)" },
  { id: "hielo", label: "❄️ Frescura sin Irritación (10)" },
] as const;

export default function PhotoShowcaseGallery() {
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredPhotos: YouMinoxPhoto[] =
    activeCollection === "all"
      ? YOU_MINOX_PHOTOS
      : YOU_MINOX_PHOTOS.filter((p) => p.collection === activeCollection);

  const displayedPhotos = showAll ? filteredPhotos : filteredPhotos.slice(0, 12);

  return (
    <section
      id="galeria-you-minox"
      className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
            📸 Galería Oficial de Producto (#1 en Perú)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Conoce al Detalle <span className="text-primary">You Minox</span>: Textura en Crema, Empaque y Manual
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Inspecciona las <strong>{YOU_MINOX_PHOTOS.length} fotografías reales de estudio</strong> del mejor Minoxidil del Perú: desde su consistencia en crema blanca que no irrita la piel hasta su caja oficial con el{" "}
            <em>Manual para una Barba Poblada</em>.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => {
                setActiveCollection(col.id);
                setShowAll(false);
              }}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition cursor-pointer ${
                activeCollection === col.id
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-primary/40"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-xl hover:border-primary/40"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-slate-950/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  🇵🇪 You Minox #{photo.id}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {photo.caption}
                </p>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary hover:underline"
                >
                  Ver en YouMinox.com ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Toggle + Direct CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!showAll && filteredPhotos.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-xl border-2 border-slate-900 bg-white px-6 py-3 text-xs sm:text-sm font-extrabold text-slate-900 transition hover:bg-slate-900 hover:text-white cursor-pointer"
            >
              Ver las {filteredPhotos.length} Fotografías Profesionales Completa ↓
            </button>
          )}
          <a
            href={YOU_MINOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-primary px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition hover:bg-primary-dark"
          >
            🥇 Comprar You Minox Original en YouMinox.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}
