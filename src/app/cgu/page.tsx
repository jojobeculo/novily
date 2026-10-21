import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/layout/legal-document";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: `Conditions générales d'utilisation du site ${siteConfig.name} : accès, contenus, responsabilité et droit applicable.`,
  alternates: { canonical: `${siteConfig.url}/cgu/` },
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Conditions générales"
      accent="d'utilisation"
      updated="21 octobre 2026"
      intro="Ces conditions encadrent l'utilisation du site. En le consultant, vous les acceptez."
      sections={[
        {
          title: "Objet",
          body: `Les présentes conditions générales d'utilisation (CGU) définissent les modalités d'accès et d'utilisation du site ${siteConfig.url.replace(/^https?:\/\//, "")}, édité par ${siteConfig.legalName}.`,
        },
        {
          title: "Éditeur",
          body: (
            <p>
              Les informations sur l&apos;éditeur et l&apos;hébergeur figurent dans les{" "}
              <Link href="/mentions-legales/">mentions légales</Link>.
            </p>
          ),
        },
        {
          title: "Accès au site",
          body: "Le site est accessible gratuitement, à tout moment, sauf interruption pour maintenance ou cas de force majeure. L'éditeur ne garantit pas une disponibilité continue et peut faire évoluer le site sans préavis.",
        },
        {
          title: "Propriété intellectuelle",
          body: `Les textes, visuels, logos, animations et le code du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation ou adaptation, totale ou partielle, sans l'accord écrit de ${siteConfig.legalName} est interdite.`,
        },
        {
          title: "Formulaire de contact",
          body: "Vous vous engagez à fournir des informations exactes. L'envoi d'une demande n'engage aucune des deux parties : seul un devis signé vaut engagement. Tout usage abusif du formulaire (envois automatisés, contenus illicites) est interdit.",
        },
        {
          title: "Responsabilité",
          body: "Les informations publiées sont fournies à titre indicatif et peuvent être modifiées à tout moment. L'éditeur ne saurait être tenu responsable d'un dommage indirect lié à l'utilisation du site, ni du contenu des sites tiers vers lesquels il renvoie.",
        },
        {
          title: "Données personnelles",
          body: (
            <p>
              Le traitement de vos données est décrit dans la{" "}
              <Link href="/politique-de-confidentialite/">politique de confidentialité</Link>.
            </p>
          ),
        },
        {
          title: "Liens vers le site",
          body: "Vous pouvez créer un lien vers la page d'accueil du site, à condition de ne pas porter atteinte à son image ni de laisser croire à un partenariat qui n'existe pas.",
        },
        {
          title: "Modification des CGU",
          body: "Les CGU peuvent être modifiées à tout moment. La version en vigueur est celle publiée sur le site à la date de votre visite.",
        },
        {
          title: "Droit applicable",
          body: "Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut d'accord amiable, les tribunaux français sont seuls compétents.",
        },
      ]}
    />
  );
}
