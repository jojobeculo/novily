import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/layout/legal-document";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibilité",
  description: `Déclaration d'accessibilité du site ${siteConfig.name} : niveau visé (WCAG 2.2 AA), mesures prises et contact pour signaler un problème.`,
  alternates: { canonical: `${siteConfig.url}/accessibilite/` },
};

const mail = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;

const sections: LegalSection[] = [
  {
    title: "Engagement",
    body: `${siteConfig.legalName} veut que ce site soit utilisable par toutes et tous, quels que soient l'appareil, le handicap ou l'aide technique utilisés (lecteur d'écran, navigation au clavier, zoom).`,
  },
  {
    title: "Niveau visé",
    body: "Le site vise le niveau AA des Règles pour l'accessibilité des contenus web (WCAG) 2.2. Il n'a pas encore fait l'objet d'un audit externe : cette déclaration repose sur nos propres vérifications, décrites ci-dessous.",
  },
  {
    title: "Ce qui est en place",
    body: (
      <ul>
        <li>
          Navigation complète au clavier, avec un lien « Aller au contenu » et un repère visible
          sur l&apos;élément actif.
        </li>
        <li>
          Structure claire : titres hiérarchisés, zones de page identifiées, libellé sur chaque
          champ et chaque bouton.
        </li>
        <li>Contrastes de couleurs conformes au niveau AA pour tous les textes.</li>
        <li>
          Textes alternatifs sur les images porteuses d&apos;information ; les éléments
          décoratifs sont ignorés par les lecteurs d&apos;écran.
        </li>
        <li>
          Formulaire de contact : erreurs décrites en toutes lettres, accès direct au champ à
          corriger, confirmation lue par les lecteurs d&apos;écran.
        </li>
        <li>
          Animations : le réglage « réduire les animations » de votre appareil est respecté, et
          l&apos;interrupteur « Réduire les animations », en bas de chaque page, arrête tout
          mouvement automatique.
        </li>
        <li>Mise en page lisible dès 320 pixels de large et avec un zoom jusqu&apos;à 200 %.</li>
      </ul>
    ),
  },
  {
    title: "Vérifications",
    body: "Tests automatisés (axe-core et Lighthouse) sur chaque page, en version ordinateur et mobile ; parcours complet au clavier ; contrôle avec les animations réduites et sur petit écran.",
  },
  {
    title: "Signaler un problème",
    body: (
      <p>
        Un contenu vous est inaccessible ? Écrivez-nous à {mail} en précisant la page
        concernée. Nous vous répondons rapidement et vous transmettons l&apos;information sous une
        autre forme si besoin.
      </p>
    ),
  },
  {
    title: "Voies de recours",
    body: (
      <p>
        Si notre réponse ne vous satisfait pas, vous pouvez saisir le Défenseur des droits depuis{" "}
        <a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener noreferrer">
          www.defenseurdesdroits.fr
        </a>
        .
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalDocument
      title="Déclaration"
      accent="d'accessibilité"
      updated="21 octobre 2026"
      intro="Un site doit pouvoir être lu, compris et utilisé par tout le monde. Voici où en est le nôtre."
      sections={sections}
    />
  );
}
