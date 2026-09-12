import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [45, 50, 60, 75],
    unoptimized: true,
  },
};

export default nextConfig;
