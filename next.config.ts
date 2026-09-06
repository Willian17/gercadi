import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [45, 50, 60, 75],
  },
  async redirects() {
    return [
      {
        source: "/unidades/juina",
        destination: "/unidades/sinop?cidade=juina",
        permanent: true,
      },
      {
        source: "/cidade/:slug",
        destination: "/unidades/:slug",
        permanent: true,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
