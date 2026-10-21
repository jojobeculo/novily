import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site ${siteConfig.name}.`,
  alternates: { canonical: "/mentions-legales" },
};

const sections = [
  {
    title: "Éditeur du site",
    body: `${siteConfig.legalName} — [forme juridique, capital social]. Siège social : [adresse], ${siteConfig.city}, France. SIRET : [numéro]. Directeur de la publication : [nom]. Contact : ${siteConfig.email}.`,
  },
  {
    title: "Hébergement",
    body: "Le site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur].",
  },
  {
    title: "Propriété intellectuelle",
    body: `L'ensemble des contenus de ce site (textes, visuels, logo, code) est la propriété exclusive de ${siteConfig.legalName}, sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite.`,
  },
  {
    title: "Données personnelles",
    body: `Les informations transmises via le formulaire de contact servent uniquement à répondre à votre demande. Elles ne sont ni cédées ni revendues. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données : écrivez à ${siteConfig.email}.`,
  },
  {
    title: "Cookies",
    body: "Ce site n'utilise aucun cookie publicitaire ni traceur tiers.",
  },
  {
    title: "Crédits",
    body: "Photographies des projets présentés : Unsplash. Les projets et témoignages présentés sont des exemples de démonstration.",
  },
];

export default function LegalPage() {
  return (
    <article className="container-page pt-40 pb-32 md:pt-52">
      <h1 className="max-w-3xl font-serif text-headline font-light">
        Mentions <em className="text-accent">légales</em>
      </h1>
      <div className="mt-20 max-w-3xl border-t border-line">
        {sections.map((s) => (
          <section key={s.title} className="grid gap-4 border-b border-line py-10 md:grid-cols-3 md:gap-8">
            <h2 className="font-serif text-xl font-light">{s.title}</h2>
            <p className="text-base leading-relaxed text-muted md:col-span-2">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
