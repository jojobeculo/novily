import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${siteConfig.url}${serviceHref(s)}`,
      changeFrequency: "monthly" as const,
      priority: s.upcoming ? 0.5 : 0.8,
    })),
    { url: `${siteConfig.url}/mentions-legales/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/politique-de-confidentialite/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/cgu/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/accessibilite/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}

export const dynamic = "force-static";
