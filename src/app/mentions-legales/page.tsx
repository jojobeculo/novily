import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/layout/legal-document";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name} : éditeur, hébergeur, propriété intellectuelle et crédits.`,
  alternates: { canonical: `${siteConfig.url}/mentions-legales/` },
};

export default function LegalNoticePage() {
  return (
    <LegalDocument
      title="Mentions"
      accent="légales"
      updated="21 octobre 2026"
      sections={[
        {
          title: "Éditeur du site",
          body: `${siteConfig.legalName} — [forme juridique, capital social]. Siège social : [adresse], ${siteConfig.city}. SIRET : [numéro]. Directeur de la publication : [nom]. Contact : ${siteConfig.email}.`,
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
          title: "Données personnelles et cookies",
          body: (
            <p>
              Le traitement de vos données et l&apos;usage des cookies sont décrits dans la{" "}
              <Link href="/politique-de-confidentialite/">politique de confidentialité</Link>.
              L&apos;utilisation du site est encadrée par les{" "}
              <Link href="/cgu/">conditions générales d&apos;utilisation</Link>.
            </p>
          ),
        },
        {
          title: "Crédits",
          body: "Photographies des projets présentés : Unsplash. Les projets et témoignages présentés sont des exemples de démonstration.",
        },
      ]}
    />
  );
}
