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
  async redirects() {
    return [
      {
        source: "/blog/",
        has: [
          {
            type: "query",
            key: "categoria",
            value: "(?<categoria>.+)",
          },
        ],
        destination: "/blog/categoria/:categoria/",
        permanent: true,
      },
      {
        source: "/blog",
        has: [
          {
            type: "query",
            key: "categoria",
            value: "(?<categoria>.+)",
          },
        ],
        destination: "/blog/categoria/:categoria/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
