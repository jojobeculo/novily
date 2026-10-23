# Novéo — site du studio

Site vitrine du studio digital Novéo. Une seule page éditoriale (Hero, Services, Pourquoi nous,
Réalisations, Méthode, Témoignages, FAQ, Contact), les pages légales (mentions légales,
politique de confidentialité, CGU, déclaration d'accessibilité), une page par service et une
page 404.

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
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Facultatif : autre formulaire [Formspree](https://formspree.io) que celui du site (`https://formspree.io/f/mpppakvq`) |
| `NEXT_PUBLIC_GA_ID` | Identifiant de mesure Google Analytics 4 (`G-XXXXXXXXXX`), vide pour ne rien mesurer |

Le formulaire de contact envoie les demandes à Formspree, sans recharger la page. L'adresse qui
reçoit les messages se règle dans le tableau de bord Formspree, pas dans le code. Chaque message
a pour objet `[NOVYLI — NOUVEAU PROSPECT]` suivi du type de projet choisi, et la réponse part
directement vers l'adresse du visiteur.

Ces variables sont publiques par nature : elles finissent dans le HTML envoyé au visiteur. N'y
mettez jamais une clé secrète (clé d'API privée, mot de passe). Le site n'en utilise aucune.

## Déploiement sur GitHub Pages

Le site est exporté en HTML statique (`output: "export"`) et publié par
`.github/workflows/deploy.yml` à chaque push sur `main` ou sur la branche de développement
`claude/tender-tesla-anxi5f` (ou à la main depuis l'onglet Actions).

1. Dans **Settings → Pages**, choisissez **Source : GitHub Actions**.
2. Optionnel : dans **Settings → Secrets and variables → Actions → Variables**, créez
   `CONTACT_ENDPOINT` pour utiliser un autre formulaire Formspree, et `GA_ID` avec votre
   identifiant Google Analytics.
3. Poussez sur `main`. Le site est publié sur `https://<compte>.github.io/novily/`.
4. Toujours dans **Settings → Pages**, cochez **Enforce HTTPS** (coché d'office sur
   `github.io`, à cocher avec un domaine personnalisé).

Le workflow récupère le sous-chemin et l'URL auprès de GitHub Pages. Avec un domaine
personnalisé, le sous-chemin devient vide sans autre réglage.

Un site statique n'a pas de serveur : pas de route API ni d'optimisation d'images à la volée.
Les images des réalisations sont donc fournies en WebP à quatre largeurs (voir ci-dessous).

Sur un hébergement Apache (mutualisé), `public/.htaccess` est copié à la racine du site : il force
le HTTPS (redirection 301 et HSTS), sert la page 404 personnalisée, compresse les textes et règle
le cache. Les autres hébergeurs l'ignorent.

## Déploiement sur OVHcloud (hébergement mutualisé)

1. Construisez le site avec l'adresse de votre domaine, sans sous-chemin :

   ```bash
   rm -rf .next out
   NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr npm run build
   ```

2. Ouvrez votre espace FTP (identifiants dans l'espace client OVHcloud, **Web Cloud →
   Hébergements → votre hébergement → FTP - SSH**), par exemple avec FileZilla, port 21 (FTP)
   ou 22 (SFTP selon l'offre).
3. Dans le dossier `www/`, déposez **le contenu** du dossier `out/` (pas le dossier lui-même),
   y compris le fichier caché `.htaccess` : activez l'affichage des fichiers cachés dans votre
   client FTP. Remplacez les fichiers existants ; supprimez ceux d'une ancienne version qui
   n'existent plus dans `out/`.
4. Dans l'espace client, vérifiez que le certificat SSL est actif (**Hébergements → Informations
   générales → Certificat SSL**) : le `.htaccess` redirige tout le trafic vers HTTPS.

## Structure

```
src/
  app/                 routes, layout, SEO (metadata, sitemap, robots, manifest, OG image)
    services/[slug]/   une page par service (générée pour chaque entrée de services.ts)
    mentions-legales/, politique-de-confidentialite/, cgu/, accessibilite/
    not-found.tsx      page 404
  components/
    layout/            Navbar, Footer, MotionProvider (réglage des animations),
                       SmoothScrollProvider (Lenis), Cursor, PageTransition,
                       CookieConsent, LegalDocument (gabarit des pages légales)
    sections/          une section de la page d'accueil par fichier ; services-showcase.tsx
                       porte la scène 3D des services, service-detail.tsx les pages service,
                       service-art.tsx leurs illustrations
    ui/art/            illustrations dessinées des services (SVG animés)
    ui/                briques réutilisables : Button, SectionLink, TextReveal, Reveal,
                       ImageReveal, Magnetic, Accordion, SectionHeader, Logo, CountUp
    seo/               données structurées JSON-LD
  lib/
    content.ts         textes de l'accueil : projets, témoignages, FAQ…
    services.ts        les services : panneaux de l'accueil et contenu de leurs pages
    site.ts            nom, URL, e-mail, ville, réseaux, navigation
    contact.ts         validation du formulaire
    consent.ts         choix du visiteur sur la mesure d'audience
    motion-preference.ts  choix du visiteur sur les animations
    image-loader.ts    choisit la bonne largeur d'image WebP
    motion.ts          courbes et réglages d'animation
public/work/           visuels des réalisations
brand/                 logos pour l'impression (PNG transparents, SVG)
```

## Modifier le contenu

Les textes sont dans `src/lib/content.ts`, `src/lib/services.ts` et `src/lib/site.ts`. Pour
ajouter une réalisation, ajoutez une image 4:3 dans `public/work/` en quatre largeurs,
`<nom>-640.webp`, `<nom>-828.webp`, `<nom>-1080.webp` et `<nom>-1600.webp` (qualité WebP autour
de 75), puis une entrée dans `projects` avec `image: "/work/<nom>.webp"` et un `alt` qui décrit
l'image. Le filtre se met à jour seul selon la catégorie (`vitrine`, `e-commerce`, `conceptuel`).

Les projets et témoignages actuels sont des exemples fictifs. Les photos des maquettes viennent
d'Unsplash. Avant la mise en ligne :

- complétez les champs entre crochets de `src/app/mentions-legales/page.tsx` et de
  `src/app/politique-de-confidentialite/page.tsx` ;
- ajoutez vos réseaux dans `socials` (`src/lib/site.ts`) : ils apparaissent alors dans le pied de
  page et les données structurées.

## Appel à l'action

Un seul appel à l'action dans tout le site : « Parlons de votre projet », qui mène au formulaire
de contact (barre de navigation, hero, services, réalisations). Gardez ce libellé pour tout
nouveau bouton de contact.

## Formulaire

Avant tout envoi, `src/lib/contact.ts` vérifie les champs (nom, format de l'e-mail, longueur du
message) et le formulaire affiche l'erreur sous le champ concerné. Les champs limitent aussi la
longueur de la saisie. Contre le spam : un champ
caché que seuls les robots remplissent, et un envoi refusé s'il arrive moins de 3 secondes après
l'affichage du formulaire. Dans les deux cas, le robot croit que le message est parti.

## Cookies et mesure d'audience

Sans `NEXT_PUBLIC_GA_ID`, le site ne dépose aucun cookie et n'affiche aucun bandeau. Avec un
identifiant, un bandeau propose « Refuser » et « Accepter », à égalité comme le demande la CNIL.
Google Analytics ne se charge qu'après « Accepter ». Le choix est gardé 13 mois dans le navigateur
(`localStorage`), et le lien « Cookies » du pied de page permet d'en changer. La politique de
confidentialité décrit Google Analytics seulement quand il est activé.

## Liens internes

Tout lien vers une section de l'accueil s'écrit `/#<id>` et passe par `SectionLink` (déjà utilisé
par `Button`). Sur l'accueil, il fait glisser la page jusqu'à la section, même si l'URL contient
déjà ce `#`. Depuis une autre page, il ramène sur l'accueil. Les id de section sont listés dans
`navigation` (`src/lib/site.ts`).

## Services

Cinq services, dans l'ordre de `src/lib/services.ts` : conception de sites web, accessibilité
numérique et conformité, transition IA, marketing digital et motion design, logiciels sur mesure
(`upcoming: true` : badge « Prochainement », textes au futur).

Sur ordinateur et tablette, ils défilent dans une scène 3D pilotée par le scroll
(`services-showcase.tsx`, styles `services-*` dans `globals.css`) ; la hauteur de la section suit
leur nombre. Ils s'affichent en liste sur mobile, avec les animations réduites, sans support de la
3D CSS, et dès qu'un panneau ne tient pas dans l'écran (écran court, grand texte) : la scène se
mesure avant l'affichage et cède la place à la liste. Chaque panneau a un bouton (`cta`) vers la page du service,
`/services/<id>/` : exemples, expertises, cadre et outils, méthode, questions, puis « Parlons de
votre projet », qui ouvre le formulaire avec le type de projet (`projectType`) déjà choisi.

Pour ajouter un service : une entrée dans `services`, un `projectType` dans `src/lib/contact.ts`
si besoin, et une illustration (`art`) : `web` reprend trois réalisations, les autres sont des
composants de `src/components/ui/art/`. La page, le sitemap et les données structurées suivent
seuls. Les exemples sont des cas types : ne les présentez pas comme des clients réels.

## Curseur

Une flèche fine aux couleurs du site (pointe crème, base pervenche), dessinée par
`src/components/layout/cursor.tsx` dès que la souris bouge. Elle penche légèrement dans le sens du
mouvement, devient noire cerclée de pervenche sur tout ce qui se clique (lisible sur les boutons
crème et pervenche comme sur le noir), s'enfonce avec une onde au clic et s'efface quand la souris
quitte la fenêtre. Les champs de texte gardent le curseur texte du système. Avant le premier
mouvement, ou sans JavaScript, la même flèche en CSS (fin de `globals.css`) prend le relais. Les
écrans tactiles ne sont pas concernés.

## Animations et accessibilité

- **Réglage des animations** : le site suit le réglage « réduire les animations » de l'appareil,
  et l'interrupteur « Réduire les animations » du pied de page permet de choisir (choix gardé dans
  le navigateur). Animations réduites : défilement natif, services en liste, bandeau immobile,
  animations CSS figées. `useMotionPreference()` donne l'état aux composants, `html[data-motion]`
  au CSS.
- **Entrée des pages** : `PageTransition` fait apparaître chaque page secondaire par un court fondu
  en CSS. L'API View Transitions avait été essayée : elle retient le changement d'adresse pendant
  l'animation (environ 0,7 s) et donne l'impression que les liens sont lents.
- **Clavier** : après un lien d'ancre, le focus passe sur la section ; le menu mobile garde le
  focus tant qu'il est ouvert et le rend au bouton à la fermeture ; l'en-tête réapparaît quand il
  reçoit le focus.
- **Formulaire** : le focus va au premier champ en erreur, les erreurs se mettent à jour pendant
  la saisie, la confirmation est lue par les lecteurs d'écran.
- **Vérifications** : axe-core (WCAG 2.2 AA) sur toutes les pages, parcours au clavier, écran de
  320 px, animations réduites. Mettez à jour `src/app/accessibilite/page.tsx` après chaque
  évolution notable.

## Logo

Le logo reprend le motif du hero : cinq anneaux concentriques en traits fins, plus marqués vers
l'extérieur, la croix de repère, l'orbite inclinée et son satellite pervenche.

`brand/` réunit les fichiers pour l'impression (carte de visite, papeterie), sur fond transparent :

| Fichier | Contenu |
|---|---|
| `noveo-symbole-*.png` | Le symbole seul, 3000 × 3000 px |
| `noveo-horizontal-*.png` | Le symbole et « Novéo » côte à côte |
| `noveo-vertical-*.png` | Le symbole, « Novéo » et « Studio digital » centrés |
| `noveo-symbole-*.svg` | Le symbole en vectoriel, pour un imprimeur ou un logiciel de mise en page |

`-fond-sombre` : traits crème, pour un support noir ou foncé. `-fond-clair` : traits noirs, pour un
support blanc ou clair. Imprimez le symbole à 16 mm de large au minimum : en dessous, les traits
passent sous 0,09 mm et risquent de disparaître.

Pour le site, `public/` garde les mêmes dessins en SVG (viewBox sans taille fixe) :
`logo-noveo.svg` (crème), `logo-noveo-fond-sombre.svg` (blanc) et `logo-noveo-fond-clair.svg`
(noir, utilisé par les données structurées). Dans l'en-tête, trop petit pour cinq anneaux,
`LogoMark` (`src/components/ui/logo-mark.tsx`) en dessine une version allégée à trois anneaux.

## Charte

| Jeton | Valeur | Usage |
|---|---|---|
| `ink` | `#000000` | Fond |
| `cream` | `#F4EFD4` | Texte, filets |
| `accent` | `#84ACFB` | Mots en italique, CTA principal, états actifs — avec parcimonie |

Titres en IBM Plex Serif 300, textes en IBM Plex Sans 300/400/500.
