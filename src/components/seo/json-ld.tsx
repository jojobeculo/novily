import { faqs, services } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const organizationId = `${siteConfig.url}/#organization`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": organizationId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo-noveo-fond-clair.svg`,
      image: `${siteConfig.url}/opengraph-image.jpg`,
      description: siteConfig.description,
      email: siteConfig.email,
      areaServed: { "@type": "Country", name: "France" },
      sameAs: siteConfig.socials.map((s) => s.href),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services
          .filter((s) => !s.upcoming)
          .map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "fr-FR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

/** Structured data for the home page. Content is static and trusted. */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
