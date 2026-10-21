export const siteConfig = {
  name: "Novily",
  legalName: "Novily Studio",
  /** Public URL, base path included (e.g. https://user.github.io/novily). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://novily.fr",
  /** Sub-path the site is served from. Next adds it to links, not to manifest icons. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  /** Form service URL (e.g. Formspree). Without it, the form opens the visitor's e-mail app. */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  locale: "fr_FR",
  title: "Novily — Studio digital : sites vitrines, e-commerce et expériences web",
  description:
    "Novily conçoit des sites web haut de gamme : sites vitrines, boutiques e-commerce et expériences digitales conceptuelles. Design éditorial, SEO et performance maximale.",
  email: "bonjour@novily.fr",
  city: "Paris",
  country: "FR",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/novily.studio" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/novily" },
    { label: "Behance", href: "https://www.behance.net/novily" },
  ],
} as const;

export const navigation = [
  { label: "Accueil", href: "/#accueil", id: "accueil" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Réalisations", href: "/#realisations", id: "realisations" },
  { label: "À propos", href: "/#a-propos", id: "a-propos" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
