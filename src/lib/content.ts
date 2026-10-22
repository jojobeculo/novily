/**
 * Editorial content of the home page.
 * Projects and testimonials are fictitious showcase examples.
 */

/** A headline made of plain segments and accent segments (italic, periwinkle). */
export type RichText = ReadonlyArray<string | { accent: string }>;

export const strengths = [
  {
    title: "Design haut de gamme",
    description:
      "Une direction artistique sur mesure, pensée pour élever votre marque et inspirer confiance dès la première seconde.",
  },
  {
    title: "SEO optimisé",
    description:
      "Structure sémantique, données structurées, contenus travaillés : votre site est conçu pour être trouvé.",
  },
  {
    title: "Performance maximale",
    description:
      "Des scores Lighthouse supérieurs à 95 et des Core Web Vitals au vert. Chaque milliseconde compte.",
  },
  {
    title: "Responsive",
    description:
      "Une expérience irréprochable sur chaque écran, du smartphone au grand moniteur.",
  },
  {
    title: "Rapidité",
    description:
      "Des délais maîtrisés et tenus. Un site vitrine peut être en ligne en quatre à six semaines.",
  },
  {
    title: "Accompagnement",
    description:
      "Un interlocuteur unique et disponible, qui vous guide à chaque étape du projet.",
  },
  {
    title: "Maintenance",
    description:
      "Mises à jour, sécurité, sauvegardes et évolutions : nous veillons sur votre site après sa mise en ligne.",
  },
] as const;

export const commitments = [
  { value: "95+", label: "Score Lighthouse visé sur chaque projet" },
  { value: "< 1 s", label: "Pour afficher l'essentiel de vos pages" },
  { value: "100 %", label: "Design et code conçus sur mesure" },
] as const;

export type ProjectCategory = "vitrine" | "e-commerce" | "conceptuel";

export const projectCategories: ReadonlyArray<{ id: ProjectCategory | "all"; label: string }> = [
  { id: "all", label: "Sélection" },
  { id: "vitrine", label: "Sites vitrines" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "conceptuel", label: "Conceptuels" },
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: number;
  image: string;
  imageAlt: string;
  /** Shown under "Sélection" on the home page. Every project appears on the web design service page. */
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "maison-aubrac",
    featured: true,
    name: "Maison Aubrac",
    summary: "Restaurant gastronomique — réservation en ligne et identité éditoriale.",
    category: "vitrine",
    categoryLabel: "Site vitrine",
    year: 2026,
    image: "/work/maison-aubrac.webp",
    imageAlt: "Page d'accueil du site Maison Aubrac : salle de restaurant tamisée et titre en serif.",
  },
  {
    slug: "seve",
    featured: true,
    name: "Sève",
    summary: "Cosmétiques naturels — boutique en ligne et rituels de soin.",
    category: "e-commerce",
    categoryLabel: "E-commerce",
    year: 2026,
    image: "/work/seve.webp",
    imageAlt: "Boutique en ligne Sève : flacon ambré sur fond clair et titre « L'essentiel, rien de plus ».",
  },
  {
    slug: "orbe-festival",
    featured: true,
    name: "Orbe Festival",
    summary: "Festival de musiques électroniques — expérience immersive et billetterie.",
    category: "conceptuel",
    categoryLabel: "Site conceptuel",
    year: 2025,
    image: "/work/orbe.webp",
    imageAlt: "Site du festival Orbe : foule de concert sous les lumières et titre monumental.",
  },
  {
    slug: "atelier-linea",
    featured: true,
    name: "Atelier Linéa",
    summary: "Cabinet d'architecture — portfolio de projets et prise de contact.",
    category: "vitrine",
    categoryLabel: "Site vitrine",
    year: 2025,
    image: "/work/linea.webp",
    imageAlt: "Site de l'Atelier Linéa : maison contemporaine en bois et titre « Architecture du calme ».",
  },
  {
    slug: "halden-audio",
    featured: true,
    name: "Halden Audio",
    summary: "Casques audio premium — fiche produit immersive et tunnel d'achat.",
    category: "e-commerce",
    categoryLabel: "E-commerce",
    year: 2025,
    image: "/work/halden.webp",
    imageAlt: "Boutique Halden Audio : casque noir sur fond jaune et bouton « Ajouter au panier ».",
  },
  {
    slug: "galerie-vantal",
    featured: true,
    name: "Galerie Vantal",
    summary: "Galerie d'art contemporain — site d'exposition et catalogue en ligne.",
    category: "conceptuel",
    categoryLabel: "Site conceptuel",
    year: 2024,
    image: "/work/vantal.webp",
    imageAlt: "Site de la Galerie Vantal : peinture abstraite colorée et titre « Couleur brute ».",
  },
  {
    slug: "fournil-montjuzet",
    name: "Fournil Montjuzet",
    summary: "Boulangerie artisanale — horaires, pains du jour et commande à emporter.",
    category: "vitrine",
    categoryLabel: "Site vitrine",
    year: 2026,
    image: "/work/fournil.webp",
    imageAlt: "Site du Fournil Montjuzet : pains au levain sur fond crème et titre « Le pain prend son temps ».",
  },
  {
    slug: "atelier-gres",
    name: "Atelier Grès",
    summary: "Céramiques tournées à la main — boutique en ligne par collection.",
    category: "e-commerce",
    categoryLabel: "E-commerce",
    year: 2026,
    image: "/work/gres.webp",
    imageAlt: "Boutique Atelier Grès : assiettes émaillées bleu pâle, titre « Tourné, émaillé, cuit à la main » et liste de prix.",
  },
  {
    slug: "nebula",
    name: "Nébula",
    summary: "Observatoire et planétarium — récit interactif et réservation des séances.",
    category: "conceptuel",
    categoryLabel: "Site conceptuel",
    year: 2026,
    image: "/work/nebula.webp",
    imageAlt: "Site conceptuel Nébula : nébuleuse dans un cercle sur fond noir et titre monumental.",
  },
  {
    slug: "compagnie-des-cimes",
    name: "Compagnie des Cimes",
    summary: "Bureau des guides de haute montagne — courses, stages et réservation.",
    category: "vitrine",
    categoryLabel: "Site vitrine",
    year: 2025,
    image: "/work/cimes.webp",
    imageAlt: "Site de la Compagnie des Cimes : sommets au-dessus d'une mer de nuages et titre « Au-dessus des nuages ».",
  },
  {
    slug: "pantaz-cycles",
    name: "Pantaz Cycles",
    summary: "Vélos de route sur mesure — configurateur de taille et commande en ligne.",
    category: "e-commerce",
    categoryLabel: "E-commerce",
    year: 2025,
    image: "/work/pantaz.webp",
    imageAlt: "Boutique Pantaz Cycles : vélo de route noir, choix de la taille du cadre et prix.",
  },
  {
    slug: "ondes-courtes",
    name: "Ondes Courtes",
    summary: "Podcast de société — lecteur intégré et archive des épisodes.",
    category: "conceptuel",
    categoryLabel: "Site conceptuel",
    year: 2025,
    image: "/work/ondes.webp",
    imageAlt: "Site du podcast Ondes Courtes : micro en noir et blanc, titre d'épisode et forme d'onde orange.",
  },
];

export const processSteps = [
  {
    title: "Découverte",
    description:
      "Nous écoutons. Vos objectifs, votre marché, vos clients : nous posons ensemble les fondations d'un projet juste.",
  },
  {
    title: "Stratégie",
    description:
      "Arborescence, parcours utilisateurs, contenus et référencement : nous définissons le plan qui servira vos ambitions.",
  },
  {
    title: "Design",
    description:
      "Direction artistique, maquettes, prototypes animés. Chaque écran est pensé, dessiné, puis affiné avec vous.",
  },
  {
    title: "Développement",
    description:
      "Un code propre, rapide et durable. Animations, intégrations et tests rigoureux sur tous les supports.",
  },
  {
    title: "Mise en ligne",
    description:
      "Lancement, suivi des performances et accompagnement. Votre site vit — et nous restons à vos côtés.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Novéo a compris notre maison mieux que nous-mêmes. Le site ressemble à notre cuisine : précis, généreux, sans artifice.",
    name: "Claire Vasseur",
    role: "Fondatrice, Maison Aubrac",
  },
  {
    quote:
      "Une exigence rare. Chaque détail a été pensé, chaque échéance tenue. Notre boutique en ligne est devenue notre premier point de vente.",
    name: "Thomas Revel",
    role: "Cofondateur, Sève",
  },
  {
    quote:
      "Ils ont transformé une intuition en une expérience que notre public n'oubliera pas. Un véritable partenaire de création.",
    name: "Inès Moreau",
    role: "Directrice artistique, Orbe Festival",
  },
] as const;

export const faqs = [
  {
    question: "Combien coûte un site avec Novéo ?",
    answer:
      "Chaque projet est unique. Après un premier échange, nous vous remettons une proposition détaillée et un devis précis, adaptés à vos objectifs et à votre budget. Aucun frais caché.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer:
      "Comptez quatre à six semaines pour un site vitrine, huit à douze semaines pour une boutique e-commerce. Un planning clair est établi dès le lancement et partagé avec vous.",
  },
  {
    question: "Mon site sera-t-il bien référencé sur Google ?",
    answer:
      "Oui. Structure sémantique, balisage Hn, métadonnées, données structurées, performances et contenus : chaque site est conçu dès le départ pour le référencement naturel.",
  },
  {
    question: "Pourrai-je modifier le contenu moi-même ?",
    answer:
      "Absolument. Nous intégrons un outil d'administration simple et vous formons à son utilisation. Vous restez autonome sur vos textes, images et actualités.",
  },
  {
    question: "Proposez-vous la maintenance après la mise en ligne ?",
    answer:
      "Oui. Nos formules de maintenance couvrent les mises à jour, la sécurité, les sauvegardes, le suivi des performances et les évolutions de votre site.",
  },
  {
    question: "Travaillez-vous avec des entreprises partout en France ?",
    answer:
      "Oui. Basé à Clermont-Ferrand, Novéo accompagne des entreprises dans toute la France. Les échanges se font en visioconférence, par téléphone et par e-mail, avec un interlocuteur unique du premier appel à la mise en ligne.",
  },
] as const;
