import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/sections/service-detail";
import { serviceHref, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

// Static export: one page per service, any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

const find = (slug: string) => services.find((s) => s.id === slug);

/** Same text as src/app/opengraph-image.alt.txt, the image shared by every page. */
const shareImageAlt = "Novéo — Nous concevons des expériences digitales qui marquent les esprits.";

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = find((await params).slug);
  if (!service) return {};
  const url = `${siteConfig.url}${serviceHref(service)}`;
  const title = `${service.seoTitle} — ${siteConfig.name}`;
  const description = service.page.metaDescription;
  // A page's openGraph replaces the layout's whole object, image included: restate it all.
  const image = {
    url: `${siteConfig.url}/opengraph-image.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: shareImageAlt,
  };
  return {
    title: service.seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = find((await params).slug);
  if (!service) notFound();
  const url = `${siteConfig.url}${serviceHref(service)}`;

  // Structured data: the service, where it sits in the site, and its questions.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.seoTitle,
        description: service.page.metaDescription,
        url,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: [
          { "@type": "City", name: siteConfig.city },
          { "@type": "Country", name: "France" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `${service.seoTitle} — ${siteConfig.name}`,
        description: service.page.metaDescription,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.page.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
