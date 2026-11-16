import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_CATEGORIES } from "@/data/articles";

export const metadata = {
  title: "Página no encontrada (404) | MinoxidilTop.com",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
            Error 404
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
            No encontramos esta página
          </h1>
          <p className="mt-3 text-slate-600">
            Puede que el enlace haya cambiado. Explora el ranking o nuestras
            categorías de guías:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-extrabold text-white hover:bg-primary"
            >
              🏆 Ir al Ranking
            </Link>
            <Link
              href="/blog/"
              className="rounded-xl bg-primary px-5 py-3 text-xs font-extrabold text-white"
            >
              📚 Ver las 500 Guías
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/blog/categoria/${slug}/`}
                className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
