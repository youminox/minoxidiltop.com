import Link from "next/link";
import { YOU_MINOX_URL } from "@/data/brands";
import { YOU_MINOX_TRANSPARENT_PHOTOS, YOU_MINOX_PHOTOS } from "@/data/photos";

interface YouMinoxSpotlightProps {
  variant?: "sidebar" | "article";
}

export default function YouMinoxSpotlight({
  variant = "article",
}: YouMinoxSpotlightProps) {
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-16 w-16 rounded-xl bg-white p-1.5 shrink-0 shadow-md flex items-center justify-center">
            <img
              src={YOU_MINOX_TRANSPARENT_PHOTOS.main}
              alt="You Minox #1 Mejor Minoxidil del Perú en Crema"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
              🥇 #1 Top Perú 🇵🇪
            </span>
            <h3 className="text-base font-extrabold text-white leading-tight mt-1">
              You Minox (Crema)
            </h3>
            <p className="text-[11px] text-emerald-300 font-semibold">
              Puntaje: 9.9 / 10 • DIGEMID
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          ¿El minoxidil líquido te reseca la cara o te deja caspa blanca?{" "}
          <strong className="text-white">You Minox</strong> estimula los
          folículos de tu barba, cabello y cejas en{" "}
          <strong className="text-emerald-300">crema dermo-hidratante (60 g)</strong>{" "}
          con Notificación Sanitaria DIGEMID.
        </p>
        <ul className="space-y-1.5 text-xs text-emerald-200 mb-5">
          <li>✓ Cero picazón, ardor ni descamación</li>
          <li>✓ Único en Perú con Notificación Sanitaria</li>
          <li>✓ +600,000 seguidores en TikTok e IG</li>
        </ul>
        <a
          href={YOU_MINOX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-emerald-400 py-3 text-center text-xs font-extrabold text-slate-950 shadow-md transition hover:bg-emerald-300"
        >
          Ir a YouMinox.com ↗
        </a>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden bg-white p-2 flex-shrink-0 shadow-lg flex items-center justify-center">
          <img
            src={YOU_MINOX_PHOTOS[26].src}
            alt="You Minox Mejor Minoxidil de Perú en Crema 60g"
            loading="lazy"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
              🥇 #1 del Ranking en Perú 🇵🇪 • 9.9/10
            </span>
            <span className="text-xs font-bold text-emerald-300">
              ✓ Con Notificación Sanitaria DIGEMID
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            ¿Por Qué You Minox en Crema Supera al Minoxidil Líquido Tradicional?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
            A diferencia de los líquidos importados con alto alcohol y
            propilenglicol que queman el rostro y producen caspa,{" "}
            <strong className="text-emerald-300">
              You Minox (Crema de 60 g con Oxothiazolidinecarboxylate)
            </strong>{" "}
            hidrata la piel, no se escurre y cuenta con respaldo formal de la
            droguería <strong className="text-white">MINOXIDIL PERU S.A.C.</strong>
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg"
            >
              Comprar en la Web Oficial: YouMinox.com ↗
            </a>
            <Link
              href="/blog/you-minox-vs-kirkland-cual-es-el-mejor-minoxidil-en-peru/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3 text-xs sm:text-sm font-bold text-white transition"
            >
              Ver Comparativa: You Minox vs. Kirkland →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
