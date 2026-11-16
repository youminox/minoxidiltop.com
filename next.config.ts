import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      },
    ];
  },
  // Las redirecciones de ?categoria=X se gestionan en src/proxy.ts para
  // eliminar el query string (los redirects() de Next.js lo reenvían al destino).
};

export default nextConfig;
