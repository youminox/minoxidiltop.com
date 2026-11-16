import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy SEO (Next.js 16): normaliza URLs de categorías para Google Search Console.
 *
 * - /blog/?categoria=X               → 308 → /blog/categoria/X/   (SIN query string)
 * - /blog/categoria/X/?categoria=X   → 308 → /blog/categoria/X/   (limpia query heredado)
 * - /blog/categoria/                 → 308 → /blog/               (evita 404 en ruta padre)
 * - /blog/categoria/slug-invalido/   → 308 → /blog/               (evita 404)
 */
const VALID_CATEGORIES = new Set([
  "rankings-y-comparativas",
  "distritos-de-lima",
  "ciudades-del-peru",
  "barberias-y-estilo-peru",
  "marcas-usa-y-amazon",
  "paises-del-mundo",
  "minoxidil-para-barba",
  "minoxidil-para-cabello",
  "minoxidil-para-cejas-y-piel",
  "you-minox-crema",
  "cuidado-barba-y-rutinas",
  "regulacion-digemid-peru",
]);

function cleanRedirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const categoriaParam = searchParams.get("categoria");

  // 1. /blog/?categoria=X
  if (pathname === "/blog" || pathname === "/blog/") {
    if (categoriaParam !== null) {
      return VALID_CATEGORIES.has(categoriaParam)
        ? cleanRedirect(request, `/blog/categoria/${categoriaParam}/`)
        : cleanRedirect(request, "/blog/");
    }
    return NextResponse.next();
  }

  // 2. /blog/categoria/ (ruta padre sin slug)
  if (pathname === "/blog/categoria" || pathname === "/blog/categoria/") {
    return cleanRedirect(request, "/blog/");
  }

  // 3. /blog/categoria/X/...
  const match = pathname.match(/^\/blog\/categoria\/([^/]+)\/?$/);
  if (match) {
    const slug = match[1];
    if (!VALID_CATEGORIES.has(slug)) {
      return cleanRedirect(request, "/blog/");
    }
    if (request.nextUrl.search) {
      return cleanRedirect(request, `/blog/categoria/${slug}/`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/", "/blog/categoria", "/blog/categoria/:path*"],
};
