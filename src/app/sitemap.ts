import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/mentions-legales/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/politique-de-confidentialite/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/cgu/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}

export const dynamic = "force-static";
