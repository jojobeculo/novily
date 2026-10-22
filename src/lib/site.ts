export const siteConfig = {
  name: "Novéo",
  legalName: "Novéo Studio",
  /** Public URL, base path included (e.g. https://user.github.io/novily). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noveo.fr",
  /** Sub-path the site is served from. Next adds it to links, not to manifest icons. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  /**
   * Formspree form that receives the contact form. A form id is public by design (it sits in
   * the HTML): the recipient address is set in the Formspree dashboard, never here.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "https://formspree.io/f/mpppakvq",
  /** Google Analytics 4 measurement id (G-…). Empty: no analytics, no consent banner. */
  analyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  locale: "fr_FR",
  title: "Novéo — Sites web, accessibilité et IA à Clermont-Ferrand",
  description:
    "Studio digital basé à Clermont-Ferrand : conception de sites web, audits d'accessibilité et de conformité (RGPD, WCAG), transition IA et marketing digital, partout en France.",
  email: "novyli.digital@gmail.com",
  /** Where the studio is based, and the area it serves. */
  location: "Basé à Clermont-Ferrand — partout en France",
  city: "Clermont-Ferrand",
  /**
   * The studio's social profiles, e.g. { label: "Instagram", href: "https://…" }.
   * The footer column and the JSON-LD sameAs only appear when the list is not empty.
   */
  socials: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;

export const navigation = [
  { label: "Accueil", href: "/#accueil", id: "accueil" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Réalisations", href: "/#realisations", id: "realisations" },
  { label: "À propos", href: "/#a-propos", id: "a-propos" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
