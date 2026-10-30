import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render estático + ISR simples para v1
  cacheComponents: false,

  // Turbopack (default no Next 16) + Tailwind v4
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
