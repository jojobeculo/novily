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

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = find((await params).slug);
  if (!service) return {};
  const url = `${siteConfig.url}${serviceHref(service)}`;
  return {
    title: service.title,
    description: service.page.metaDescription,
    alternates: { canonical: url },
    openGraph: { url, title: `${service.title} — ${siteConfig.name}`, description: service.page.metaDescription },
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
        description: service.page.metaDescription,
        url,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: { "@type": "Country", name: "France" },
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
