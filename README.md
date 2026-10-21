# Novily — site du studio

Site vitrine du studio digital Novily. Une seule page éditoriale (Hero, Services, Pourquoi nous,
Réalisations, Méthode, Témoignages, FAQ, Contact) et une page de mentions légales.

## Stack

- Next.js 16 (App Router, export statique) et React 19
- TypeScript
- Tailwind CSS 4 (jetons de design dans `src/app/globals.css`)
- Framer Motion (chargé via `LazyMotion`, respecte `prefers-reduced-motion`)
- Lenis pour le défilement fluide et les ancres (désactivé si « réduire les animations »)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statique dans out/
npm run lint
npm run typecheck
```

Copiez `.env.example` vers `.env.local` et renseignez les variables :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique, sous-chemin compris : liens canoniques, Open Graph, sitemap |
| `NEXT_PUBLIC_BASE_PATH` | Sous-chemin du site (`/novily` sur GitHub Pages), vide avec un domaine personnalisé |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | URL d'un service de formulaire qui accepte du JSON (ex. [Formspree](https://formspree.io)) |

Sans `NEXT_PUBLIC_CONTACT_ENDPOINT`, le formulaire ouvre la messagerie du visiteur avec le
message pré-rempli.

## Déploiement sur GitHub Pages

Le site est exporté en HTML statique (`output: "export"`) et publié par
`.github/workflows/deploy.yml` à chaque push sur `main` (ou à la main depuis l'onglet Actions).

1. Dans **Settings → Pages**, choisissez **Source : GitHub Actions**.
2. Optionnel : dans **Settings → Secrets and variables → Actions → Variables**, créez
   `CONTACT_ENDPOINT` avec l'URL de votre service de formulaire.
3. Poussez sur `main`. Le site est publié sur `https://<compte>.github.io/novily/`.

Le workflow récupère le sous-chemin et l'URL auprès de GitHub Pages. Avec un domaine
personnalisé, le sous-chemin devient vide sans autre réglage.

Un site statique n'a pas de serveur : pas de route API ni d'optimisation d'images à la volée.
Les images des réalisations sont donc fournies en WebP à trois largeurs (voir ci-dessous).

## Structure

```
src/
  app/                 routes, layout, SEO (metadata, sitemap, robots, manifest, OG image)
    mentions-legales/
  components/
    layout/            Navbar, Footer, MotionProvider, SmoothScrollProvider (Lenis)
    sections/          une section de la page d'accueil par fichier ; services-showcase.tsx
                       porte la scène 3D des services
    ui/                briques réutilisables : Button, SectionLink, TextReveal, Reveal,
                       ImageReveal, Magnetic, Accordion, SectionHeader, Logo
    seo/               données structurées JSON-LD
  lib/
    content.ts         tous les textes : services, projets, témoignages, FAQ…
    site.ts            nom, URL, e-mail, réseaux, navigation
    contact.ts         validation du formulaire
    image-loader.ts    choisit la bonne largeur d'image WebP
    motion.ts          courbes et réglages d'animation
public/work/           visuels des réalisations
```

## Modifier le contenu

Tous les textes sont dans `src/lib/content.ts` et `src/lib/site.ts`. Pour ajouter une réalisation,
ajoutez une image 4:3 dans `public/work/` en trois largeurs, `<nom>-640.webp`, `<nom>-1080.webp`
et `<nom>-1600.webp`, puis une entrée dans `projects` avec `image: "/work/<nom>.webp"`. Le filtre
se met à jour seul selon la catégorie (`vitrine`, `e-commerce`, `conceptuel`).

Les projets et témoignages actuels sont des exemples fictifs. Les photos des maquettes viennent
d'Unsplash. Complétez aussi les champs entre crochets de `src/app/mentions-legales/page.tsx`.

## Liens internes

Tout lien vers une section de l'accueil s'écrit `/#<id>` et passe par `SectionLink` (déjà utilisé
par `Button`). Sur l'accueil, il fait glisser la page jusqu'à la section, même si l'URL contient
déjà ce `#`. Depuis une autre page, il ramène sur l'accueil. Les id de section sont listés dans
`navigation` (`src/lib/site.ts`).

## Services en 3D

Sur ordinateur et tablette, les services défilent dans une scène 3D pilotée par le scroll
(`services-showcase.tsx`, styles `services-*` dans `globals.css`). Chaque service ajouté dans
`services` (`src/lib/content.ts`) prend sa place sans autre réglage : la hauteur de la section
suit leur nombre. `showcase` choisit la réalisation qui illustre le service. Sur mobile, avec
« réduire les animations » ou sans support de la 3D CSS, les services s'affichent en liste.

## Curseur

Une flèche fine aux couleurs du site (pointe crème, base pervenche), en CSS pur à la fin de
`globals.css` : le navigateur la dessine lui-même, sans script ni décalage. Sur les liens et les
boutons, elle se remplit de la couleur d'accent. Les champs de texte gardent le curseur texte, et
les écrans tactiles ne sont pas concernés.

## Charte

| Jeton | Valeur | Usage |
|---|---|---|
| `ink` | `#000000` | Fond |
| `cream` | `#F4EFD4` | Texte, filets |
| `accent` | `#84ACFB` | Mots en italique, CTA principal, états actifs — avec parcimonie |

Titres en IBM Plex Serif 300, textes en IBM Plex Sans 300/400/500.
