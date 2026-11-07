"use client";

import { useState } from "react";
import Link from "next/link";
import { YOU_MINOX_URL } from "@/data/brands";
import { BLOG_CATEGORIES } from "@/data/articles";

const MAIN_NAV = [
  { label: "🏆 Ranking Top 5", href: "/#top-5-ranking" },
  { label: "📊 Cuadros Comparativos", href: "/#cuadros-comparativos" },
  { label: "⚡ Comparador 1 vs 1", href: "/#comparador-interactivo" },
  { label: "🇺🇸 Marcas USA & Amazon", href: "/#marcas-mundo" },
  { label: "🧔 Evolución y Barba", href: "/#galeria-you-minox" },
  { label: "📚 100 Artículos y Guías", href: "/blog/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Official Ranking & You Minox Authority Bar */}
      <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-emerald-500/25">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              🇵🇪 Ranking Oficial de Minoxidil en Perú y USA —{" "}
              <strong className="text-white">#1 Ganador Absoluto:</strong>{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-emerald-400 hover:text-emerald-300 underline"
              >
                You Minox (youminox.com)
              </a>{" "}
              con Notificación Sanitaria DIGEMID
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span>🎵 +500K TikTok @You_minox</span>
            <span>·</span>
            <span>📸 +100K Instagram @youminox</span>
            <span>·</span>
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold text-amber-400 hover:text-amber-300"
            >
              Tienda Oficial YouMinox.com ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-emerald-400 font-black text-lg shadow-sm border border-emerald-500/30 transition group-hover:bg-primary group-hover:text-white">
            🏆
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Minoxidil<span className="text-primary">Top</span>.com
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
              Ranking Oficial Perú 🇵🇪 & USA 🇺🇸
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-bold text-slate-700 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/blog/"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-extrabold text-slate-800 transition hover:border-primary hover:text-primary"
          >
            📚 Ver 100 Guías
          </Link>
          <a
            href={YOU_MINOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-primary-dark"
          >
            🥇 #1 YouMinox.com ↗
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex xl:hidden items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Abrir menú de navegación"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <p className="px-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Navegación Principal
          </p>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-slate-100">
            <p className="px-2 mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Categorías de Artículos (100 Guías)
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/blog/?categoria=${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-primary truncate"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-primary px-4 py-3 text-center text-xs font-extrabold text-white shadow-sm"
            >
              🥇 Ir a la Web Oficial del #1: YouMinox.com ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
