# Novily — site du studio

Site vitrine du studio digital Novily. Une seule page éditoriale (Hero, Services, Pourquoi nous,
Réalisations, Méthode, Témoignages, FAQ, Contact) et une page de mentions légales.

## Stack

- Next.js 16 (App Router, Cache Components) et React 19
- TypeScript
- Tailwind CSS 4 (jetons de design dans `src/app/globals.css`)
- Framer Motion (chargé via `LazyMotion`, respecte `prefers-reduced-motion`)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint
npm run typecheck
```

Copiez `.env.example` vers `.env.local` et renseignez les variables :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique : liens canoniques, Open Graph, sitemap |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour envoyer le formulaire de contact |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les demandes |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié dans Resend) |

Sans clé Resend, le formulaire affiche l'adresse e-mail du studio comme solution de repli.

## Structure

```
src/
  app/                 routes, layout, SEO (metadata, sitemap, robots, manifest, OG image)
    api/contact/       réception du formulaire
    mentions-legales/
  components/
    layout/            Navbar, Footer, MotionProvider
    sections/          une section de la page d'accueil par fichier
    ui/                briques réutilisables : Button, TextReveal, Reveal, ImageReveal,
                       Magnetic, Accordion, SectionHeader, Logo
    seo/               données structurées JSON-LD
  lib/
    content.ts         tous les textes : services, projets, témoignages, FAQ…
    site.ts            nom, URL, e-mail, réseaux, navigation
    contact.ts         validation partagée du formulaire (client et serveur)
    motion.ts          courbes et réglages d'animation
public/work/           visuels des réalisations
```

## Modifier le contenu

Tous les textes sont dans `src/lib/content.ts` et `src/lib/site.ts`. Pour ajouter une réalisation,
ajoutez une image 4:3 dans `public/work/` et une entrée dans `projects`. Le filtre se met à jour
seul selon la catégorie (`vitrine`, `e-commerce`, `conceptuel`).

Les projets et témoignages actuels sont des exemples fictifs. Les photos des maquettes viennent
d'Unsplash. Complétez aussi les champs entre crochets de `src/app/mentions-legales/page.tsx`.

## Charte

| Jeton | Valeur | Usage |
|---|---|---|
| `ink` | `#000000` | Fond |
| `cream` | `#F4EFD4` | Texte, filets |
| `accent` | `#84ACFB` | Mots en italique, CTA principal, états actifs — avec parcimonie |

Titres en IBM Plex Serif 300, textes en IBM Plex Sans 300/400/500.
