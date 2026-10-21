import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: `${siteConfig.basePath}/`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: `${siteConfig.basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" },
      { src: `${siteConfig.basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}

export const dynamic = "force-static";
