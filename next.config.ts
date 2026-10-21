import type { NextConfig } from "next";

// Sub-path of the site, e.g. "/novily" on a GitHub Pages project site. Empty on a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // "/novily/" and "/novily/mentions-legales/": the URLs GitHub Pages serves without a redirect.
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  experimental: {
    // The stylesheet is small: inlining it removes a render-blocking request.
    inlineCss: true,
  },
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
