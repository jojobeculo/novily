/**
 * The studio's services: the panels of the home page and their detail pages
 * at /services/<id>/. Examples are illustrative scenarios, not client work.
 */

import type { ProjectType } from "./contact";

/** Illustration of a service: portfolio images (web) or a drawn artwork. */
export type ServiceArtKind = "web" | "audit" | "ai" | "motion" | "software";

type Item = { title: string; text: string };

export type Service = {
  /** Also the address of the service page: /services/<id>/. */
  id: string;
  title: string;
  /** Part of the title set in italic periwinkle on the service page. */
  accent: string;
  /** Label under the progress bar of the 3D stage. */
  shortTitle: string;
  /** One-line hook, in italics under the title. */
  hook: string;
  description: string;
  deliverables: readonly string[];
  /** Label of the panel button that opens the service page. */
  cta: string;
  /** Preselected in the contact form. */
  projectType: ProjectType;
  art: ServiceArtKind;
  upcoming?: boolean;
  page: {
    metaDescription: string;
    intro: string;
    examplesTitle: string;
    examplesIntro: string;
    examples: readonly (Item & { tag: string })[];
    capabilitiesTitle: string;
    capabilities: readonly Item[];
    frameworkTitle: string;
    frameworkIntro: string;
    framework: readonly { name: string; text: string }[];
    process: readonly Item[];
    faq: readonly { question: string; answer: string }[];
    closing: string;
  };
};

const placeholder = (title: string): Service["page"] => ({
  metaDescription: `${title} — Novéo, studio digital à Clermont-Ferrand.`,
  intro: "Texte à venir.",
  examplesTitle: "Exemples",
  examplesIntro: "Texte à venir.",
  examples: [1, 2, 3, 4].map((n) => ({ tag: `Tag ${n}`, title: `Exemple ${n}`, text: "Texte à venir." })),
  capabilitiesTitle: "Ce que nous faisons",
  capabilities: [1, 2, 3, 4, 5, 6].map((n) => ({ title: `Expertise ${n}`, text: "Texte à venir." })),
  frameworkTitle: "Références",
  frameworkIntro: "Texte à venir.",
  framework: [1, 2, 3, 4, 5, 6].map((n) => ({ name: `Référence ${n}`, text: "Texte à venir." })),
  process: [1, 2, 3, 4].map((n) => ({ title: `Étape ${n}`, text: "Texte à venir." })),
  faq: [1, 2, 3].map((n) => ({ question: `Question ${n} ?`, answer: "Réponse à venir." })),
  closing: "Texte à venir.",
});

export const services: readonly Service[] = [
  {
    id: "conception-site-web",
    title: "Conception de sites web",
    accent: "sites web",
    shortTitle: "Sites web",
    hook: "Accroche à venir.",
    description: "Description à venir.",
    deliverables: ["Direction artistique", "UX / UI", "SEO", "CMS"],
    cta: "Voir des exemples",
    projectType: "Site web",
    art: "web",
    page: placeholder("Conception de sites web"),
  },
  {
    id: "accessibilite-conformite",
    title: "Accessibilité numérique et conformité",
    accent: "conformité",
    shortTitle: "Accessibilité",
    hook: "Accroche à venir.",
    description: "Description à venir.",
    deliverables: ["WCAG 2.2", "RGAA", "RGPD"],
    cta: "Voir un exemple d'audit",
    projectType: "Accessibilité et conformité",
    art: "audit",
    page: placeholder("Accessibilité numérique et conformité"),
  },
  {
    id: "transition-ia",
    title: "Transition IA pour les entreprises",
    accent: "IA",
    shortTitle: "Transition IA",
    hook: "Accroche à venir.",
    description: "Description à venir.",
    deliverables: ["Diagnostic", "Intégration", "Formation"],
    cta: "Voir des cas d'usage",
    projectType: "Transition IA",
    art: "ai",
    page: placeholder("Transition IA pour les entreprises"),
  },
  {
    id: "marketing-motion-design",
    title: "Marketing digital et motion design",
    accent: "motion design",
    shortTitle: "Marketing",
    hook: "Accroche à venir.",
    description: "Description à venir.",
    deliverables: ["Motion design", "Photographie", "Réseaux sociaux"],
    cta: "Voir des exemples",
    projectType: "Marketing et motion design",
    art: "motion",
    page: placeholder("Marketing digital et motion design"),
  },
  {
    id: "logiciels-sur-mesure",
    title: "Conception de logiciels professionnels sur mesure",
    accent: "sur mesure",
    shortTitle: "Logiciels",
    hook: "Accroche à venir.",
    description: "Description à venir.",
    deliverables: ["Outils métier", "SaaS", "Intégrations"],
    cta: "En savoir plus",
    projectType: "Logiciel sur mesure",
    art: "software",
    upcoming: true,
    page: placeholder("Conception de logiciels professionnels sur mesure"),
  },
];

export const serviceHref = (service: Service) => `/services/${service.id}/`;
