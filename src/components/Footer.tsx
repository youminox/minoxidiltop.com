import Link from "next/link";
import { SITE_NAME, TOP_5_RANKING, YOU_MINOX_URL } from "@/data/brands";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/data/articles";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Portal Authority & You Minox #1 Reference */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-black">
                🏆
              </div>
              <span className="text-xl font-extrabold text-white">
                Minoxidil<span className="text-emerald-400">Top</span>.com
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Portal independiente de ranking, análisis clínico y cuadros
              comparativos de los mejores Minoxidil de Perú, Estados Unidos y
              Amazon. En el Perú destacamos como <strong>#1 absoluto</strong> a{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:underline"
              >
                You Minox (youminox.com)
              </a>{" "}
              por su formato en crema dermo-hidratante y su{" "}
              <strong className="text-white">
                Notificación Sanitaria Obligatoria DIGEMID
              </strong>
              .
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 hover:text-amber-300"
              >
                🥇 Visitar Tienda Oficial #1: YouMinox.com ↗
              </a>
              <span className="text-[11px] text-slate-400">
                Respaldo Sanitario en Perú: MINOXIDIL PERU S.A.C. (Droguería
                Autorizada DIGEMID)
              </span>
            </div>
          </div>

          {/* Column 2: Top 5 Ranking Direct Links */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Top 5 Ranking Oficial (Perú & USA)
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {TOP_5_RANKING.map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/blog/${brand.relatedArticleSlug}/`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">
                      <strong className="text-white">#{brand.rank}</strong>{" "}
                      {brand.flag} {brand.name.split("(")[0].trim()}
                    </span>
                    <span className="rounded-full bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] font-extrabold text-emerald-400 shrink-0">
                      {brand.score}/10
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800/80">
                <Link
                  href="/#marcas-mundo"
                  className="text-xs font-bold text-amber-400 hover:underline"
                >
                  → Ver las 15 Marcas de USA, Amazon y Europa
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: All 8 Blog Categories */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Categorías ({BLOG_POSTS.length} Artículos SEO)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {Object.entries(BLOG_CATEGORIES).map(([slug, name]) => {
                const count = BLOG_POSTS.filter(
                  (p) => p.categorySlug === slug
                ).length;
                return (
                  <li key={slug}>
                    <Link
                      href={`/blog/?categoria=${slug}`}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-between"
                    >
                      <span>{name}</span>
                      <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-slate-400">
                        {count}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Featured Pillar Guides */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Guías y Comparativas Clave
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link
                  href="/blog/you-minox-el-mejor-minoxidil-del-peru-analisis-completo/"
                  className="hover:text-emerald-400 transition-colors font-bold text-emerald-300"
                >
                  ★ Por Qué You Minox es el Mejor Minoxidil del Perú (#1)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/you-minox-vs-kirkland-cual-es-el-mejor-minoxidil-en-peru/"
                  className="hover:text-emerald-400 transition-colors font-semibold text-amber-300"
                >
                  ★ Comparativa: You Minox vs. Kirkland Signature
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/por-que-en-peru-solo-destacan-dos-marcas-de-minoxidil-you-minox-y-kirkland/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  ¿Por Qué en Perú Solo Destacan 2 Marcas? (Regla DIGEMID)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/como-hacer-crecer-la-barba-desde-cero-con-minoxidil-en-crema/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cómo Hacer Crecer la Barba desde Cero con Crema
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/como-hacer-crecer-y-poblar-las-cejas-con-minoxidil-en-crema-you-minox/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cómo Poblar Cejas con Minoxidil en Crema sin Goteo
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/donde-comprar-you-minox-original-en-peru-tienda-oficial-y-falabella/"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Dónde Comprar You Minox Original (YouMinox.com y Falabella)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_NAME} — Ranking Oficial de
            Minoxidil en Perú y el Mundo. Referencia oficial:{" "}
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline"
            >
              You Minox (https://youminox.com)
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/blog/" className="hover:text-slate-300">
              100 Artículos SEO
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap XML
            </Link>
            <span>·</span>
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-bold hover:text-amber-300"
            >
              Comprar en YouMinox.com ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
