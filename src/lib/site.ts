export const siteConfig = {
  name: "Novéo",
  legalName: "Novéo Studio",
  /** Public URL, base path included (e.g. https://user.github.io/novily). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://noveo.fr",
  /** Sub-path the site is served from. Next adds it to links, not to manifest icons. */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  /** Form service URL (e.g. Formspree). Without it, the form opens the visitor's e-mail app. */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  locale: "fr_FR",
  title: "Novéo — Studio digital : sites vitrines, e-commerce et expériences web",
  description:
    "Novéo conçoit des sites web haut de gamme : sites vitrines, boutiques e-commerce et expériences digitales conceptuelles. Design éditorial, SEO et performance maximale.",
  email: "novyli.digital@gmail.com",
  /** The studio works fully remote: never tie it to a city. */
  location: "Studio 100 % à distance — partout en France",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/noveo.studio" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/noveo" },
    { label: "Behance", href: "https://www.behance.net/noveo" },
  ],
} as const;

export const navigation = [
  { label: "Accueil", href: "/#accueil", id: "accueil" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Réalisations", href: "/#realisations", id: "realisations" },
  { label: "À propos", href: "/#a-propos", id: "a-propos" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
