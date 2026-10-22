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

export const services: readonly Service[] = [
  {
    id: "conception-site-web",
    title: "Conception de sites web",
    accent: "sites web",
    shortTitle: "Sites web",
    hook: "Le premier rendez-vous avec vos clients mérite la même exigence que votre métier.",
    description:
      "Direction artistique, UX, UI, SEO et CMS : nous concevons et développons des sites sur mesure, rapides et accessibles, que vos équipes font vivre en toute autonomie.",
    deliverables: [
      "Direction artistique",
      "UX & UI design",
      "SEO technique",
      "CMS headless",
      "Core Web Vitals",
    ],
    cta: "Voir des exemples",
    projectType: "Site web",
    art: "web",
    page: {
      metaDescription:
        "Conception de sites web à Clermont-Ferrand et partout en France : direction artistique, UX, UI, SEO et CMS pour sites vitrines, e-commerce et refontes.",
      intro:
        "Un site réussi tient à l'équilibre entre une image juste, un parcours clair et une technique solide. Nous menons ces trois chantiers ensemble, de la direction artistique à la mise en ligne. Le résultat : un site qui vous ressemble, se charge vite, se trouve facilement sur les moteurs de recherche et reste simple à faire évoluer.",
      examplesTitle: "Les formats que nous concevons",
      examplesIntro:
        "Quatre formats, une même exigence : une marque lisible, un parcours clair et une technique solide.",
      examples: [
        {
          tag: "Site vitrine",
          title: "Présenter votre activité avec clarté",
          text: "Quelques pages bien construites pour expliquer votre offre, rassurer et susciter des demandes. Pages services travaillées pour le référencement, formulaires suivis, contenus faciles à mettre à jour.",
        },
        {
          tag: "E-commerce",
          title: "Une boutique qui donne envie d'acheter",
          text: "Fiches produits soignées, tunnel de commande court, paiement sécurisé. Shopify ou architecture headless selon votre catalogue, vos volumes et vos outils de gestion.",
        },
        {
          tag: "Site conceptuel",
          title: "Une expérience qui marque les esprits",
          text: "Scroll narratif, animations et motion design pour un lancement, une marque premium ou un projet culturel. Sans sacrifier la vitesse de chargement ni l'accessibilité.",
        },
        {
          tag: "Refonte",
          title: "Moderniser sans perdre l'acquis",
          text: "Audit de l'existant, reprise des contenus et nouvelle architecture. Un plan de redirections 301 page à page préserve le référencement que vous avez construit.",
        },
      ],
      capabilitiesTitle: "Ce que nous prenons en charge",
      capabilities: [
        {
          title: "Direction artistique",
          text: "Positionnement visuel, typographie, couleurs, photographie et motion. Un univers pensé pour votre marque et votre marché, qui inspire confiance dès la première seconde.",
        },
        {
          title: "UX et UI design",
          text: "Arborescence, wireframes, maquettes Figma et prototypes cliquables. Chaque page a un objectif clair et un chemin court vers la prise de contact, le devis ou l'achat.",
        },
        {
          title: "Développement et performance",
          text: "Next.js, React et TypeScript. Objectif Lighthouse 95+ et Core Web Vitals (LCP, INP, CLS) au vert, pour un site rapide sur mobile comme sur desktop.",
        },
        {
          title: "SEO technique",
          text: "Balisage sémantique, données structurées, sitemap, métadonnées et maillage interne. En refonte, un plan de redirections 301 préserve le référencement acquis.",
        },
        {
          title: "CMS et autonomie",
          text: "CMS headless, WordPress ou Shopify selon vos contenus et vos équipes. Vous publiez et mettez à jour vos pages sans dépendre d'un développeur.",
        },
        {
          title: "Conformité et maintenance",
          text: "Accessibilité RGAA / WCAG intégrée dès la maquette, mesure d'audience conforme au RGPD, hébergement en France ou dans l'UE, maintenance et mises à jour de sécurité.",
        },
      ],
      frameworkTitle: "Standards et outils",
      frameworkIntro:
        "Nos sites s'appuient sur des standards publics et des outils éprouvés, choisis pour leur solidité dans le temps plutôt que pour l'effet de mode.",
      framework: [
        {
          name: "Figma",
          text: "Outil de conception collaboratif. Maquettes, prototypes et design system y sont partagés avec vos équipes, qui commentent et valident en ligne.",
        },
        {
          name: "Next.js, React et TypeScript",
          text: "Next.js, framework React créé par Vercel, permet le rendu serveur et la génération statique : des pages rapides et bien indexées. TypeScript fiabilise le code.",
        },
        {
          name: "Core Web Vitals",
          text: "Indicateurs de Google mesurés sur de vrais visiteurs : LCP (chargement), INP (réactivité, qui remplace le FID depuis mars 2024) et CLS (stabilité visuelle).",
        },
        {
          name: "Lighthouse",
          text: "Outil d'audit open source de Google. Il note sur 100 la performance, l'accessibilité, les bonnes pratiques et le SEO. Notre objectif : 95 et plus.",
        },
        {
          name: "Schema.org",
          text: "Vocabulaire de données structurées lancé en 2011 par Google, Microsoft et Yahoo. Il aide les moteurs à comprendre vos pages et peut enrichir leur affichage.",
        },
        {
          name: "RGAA et WCAG",
          text: "Le RGAA, référentiel général d'amélioration de l'accessibilité, s'appuie sur les WCAG du W3C. Nous appliquons leurs critères dès la conception.",
        },
        {
          name: "European Accessibility Act",
          text: "Directive (UE) 2019/882, applicable depuis le 28 juin 2025. Elle impose l'accessibilité de services comme le commerce en ligne, hors microentreprises.",
        },
        {
          name: "RGPD et CNIL",
          text: "Règlement (UE) 2016/679, applicable depuis le 25 mai 2018. Bandeau de cookies et mesure d'audience paramétrés selon les recommandations de la CNIL.",
        },
        {
          name: "CMS headless, WordPress, Shopify",
          text: "Un CMS headless pour une grande liberté de conception, WordPress ou Shopify pour un écosystème éprouvé. Le choix dépend de vos contenus et de vos équipes.",
        },
      ],
      process: [
        {
          title: "Cadrage",
          text: "Objectifs, cibles, contenus existants et contraintes techniques. Nous fixons ensemble le périmètre, l'arborescence et le calendrier.",
        },
        {
          title: "Conception",
          text: "Direction artistique, wireframes puis maquettes Figma. Vous validez chaque étape sur des prototypes cliquables, sur desktop comme sur mobile.",
        },
        {
          title: "Développement",
          text: "Intégration, CMS, SEO technique et accessibilité. Tests sur plusieurs navigateurs et appareils, audits Lighthouse avant la mise en ligne.",
        },
        {
          title: "Mise en ligne et suivi",
          text: "Déploiement, redirections et formation de vos équipes au CMS. Puis maintenance, mises à jour de sécurité et évolutions selon vos besoins.",
        },
      ],
      faq: [
        {
          question: "Combien de temps faut-il pour concevoir un site ?",
          answer: "Tout dépend du périmètre. Un site vitrine demande en général quelques semaines, une boutique e-commerce ou une expérience immersive davantage. Nous fixons un calendrier précis dès le cadrage, avec des étapes de validation datées.",
        },
        {
          question: "Pourrons-nous modifier le site nous-mêmes ?",
          answer: "Oui. Nous choisissons le CMS en fonction de vos équipes : headless, WordPress ou Shopify. Vous publiez et mettez à jour vos pages en autonomie, et nous vous formons à la prise en main lors de la mise en ligne.",
        },
        {
          question: "Une refonte risque-t-elle de faire perdre notre référencement ?",
          answer: "Une refonte mal préparée peut coûter des positions. Nous cartographions les URL existantes, établissons un plan de redirections 301 page à page et suivons l'indexation dans Google Search Console après la mise en ligne.",
        },
      ],
      closing:
        "Un site à créer ou à refondre ? Parlons de vos objectifs, de vos contraintes et de votre calendrier.",
    },
  },
  {
    id: "accessibilite-conformite",
    title: "Accessibilité numérique et conformité",
    accent: "conformité",
    shortTitle: "Conformité",
    hook: "La conformité ne se présume pas. Elle se vérifie, critère par critère.",
    description:
      "Accessibilité, RGPD, cookies, mentions légales : nous auditons votre site au regard des textes en vigueur, puis nous le mettons en conformité avec vous.",
    deliverables: [
      "Audit RGAA / WCAG 2.2",
      "RGPD et cookies",
      "Mentions légales et CGV",
      "Écoconception RGESN",
      "Mise en conformité",
    ],
    cta: "Voir un exemple d'audit",
    projectType: "Accessibilité et conformité",
    art: "audit",
    page: {
      metaDescription:
        "Audit d'accessibilité et de conformité web à Clermont-Ferrand : RGAA, WCAG 2.2, RGPD, cookies, mentions légales. Mise en conformité partout en France.",
      intro:
        "Accessibilité, données personnelles, cookies, mentions légales, CGV : un site d'entreprise obéit à des règles précises, contrôlées notamment par la CNIL et la DGCCRF. Depuis le 28 juin 2025, l'European Accessibility Act impose l'accessibilité à plusieurs services aux consommateurs, dont le commerce en ligne. Nous auditons votre site, hiérarchisons les risques, puis corrigeons.",
      examplesTitle: "Ce que révèle souvent un audit",
      examplesIntro:
        "Quatre écarts courants, sur des sites récents comme anciens. Chacun se corrige, à condition de le repérer.",
      examples: [
        {
          tag: "Cookies",
          title: "Un bandeau cookies sans moyen simple de refuser",
          text: "La CNIL attend que refuser soit aussi simple qu'accepter. Un bouton « Tout accepter » sans équivalent pour refuser expose l'éditeur à une sanction. La CNIL a déjà sanctionné de grands acteurs sur ce point.",
        },
        {
          tag: "Images",
          title: "Des images sans alternative textuelle",
          text: "Un lecteur d'écran annonce alors le nom du fichier, ou rien. Le RGAA consacre une thématique entière aux images : tout visuel porteur d'information doit être décrit, tout visuel décoratif ignoré.",
        },
        {
          tag: "Contrastes",
          title: "Un texte trop pâle sur son fond",
          text: "Au niveau AA, les WCAG exigent un rapport de contraste d'au moins 4,5 pour 1 pour le texte courant, 3 pour 1 pour le grand texte. Gris clair sur blanc, texte posé sur une photo : l'écart se mesure vite.",
        },
        {
          tag: "Services tiers",
          title: "Des services tiers chargés avant tout consentement",
          text: "Polices hébergées par un tiers, vidéos intégrées, outils de mesure d'audience : ils s'exécutent souvent dès l'arrivée sur la page. L'adresse IP du visiteur part alors vers d'autres serveurs, avant tout choix.",
        },
      ],
      capabilitiesTitle: "Ce que nous vérifions et corrigeons",
      capabilities: [
        {
          title: "Audit d'accessibilité",
          text: "Tests manuels et outillés selon le RGAA et les WCAG 2.2, niveau AA : navigation au clavier, lecteurs d'écran, contrastes, titres, formulaires, médias et documents.",
        },
        {
          title: "Données personnelles et cookies",
          text: "Inventaire des traceurs réellement déposés, contrôle du bandeau et du recueil du consentement, des finalités annoncées, des sous-traitants et des transferts hors de l'UE.",
        },
        {
          title: "Mentions légales, CGU et CGV",
          text: "Vérification des mentions exigées par la LCEN, de la cohérence des CGU et CGV, de l'information précontractuelle et du droit de rétractation en vente en ligne.",
        },
        {
          title: "Socle de sécurité",
          text: "HTTPS, en-têtes de sécurité, mises à jour du CMS et des extensions, protection des formulaires : des mesures de base pour répondre à l'article 32 du RGPD.",
        },
        {
          title: "Écoconception",
          text: "Poids des pages, requêtes, scripts tiers, hébergement : nous évaluons votre site au regard du RGESN et repérons les améliorations les plus simples à mettre en œuvre.",
        },
        {
          title: "Mise en conformité",
          text: "Corrections du code et des contenus, bandeau cookies conforme, déclaration d'accessibilité, schéma pluriannuel si vous y êtes tenu, politique de confidentialité à jour.",
        },
      ],
      frameworkTitle: "Lois, normes et référentiels",
      frameworkIntro:
        "Chaque écart relevé est rattaché au texte ou au critère qui le fonde. Voici les références que nous appliquons.",
      framework: [
        {
          name: "RGPD",
          text: "Règlement (UE) 2016/679, applicable depuis le 25 mai 2018. Amendes jusqu'à 20 M€ ou 4 % du chiffre d'affaires annuel mondial, le plus élevé des deux.",
        },
        {
          name: "Article 82 et recommandation CNIL",
          text: "L'article 82 de la loi Informatique et Libertés transpose la directive ePrivacy sur les traceurs. Selon la CNIL, refuser doit être aussi simple qu'accepter.",
        },
        {
          name: "WCAG 2.2",
          text: "Règles pour l'accessibilité des contenus web, recommandation du W3C publiée en octobre 2023. Trois niveaux, A, AA et AAA : nos audits visent le niveau AA.",
        },
        {
          name: "RGAA",
          text: "Référentiel général d'amélioration de l'accessibilité, publié par la DINUM : la méthode française pour vérifier, critère par critère, la conformité d'un site.",
        },
        {
          name: "Norme EN 301 549",
          text: "Norme européenne d'accessibilité des produits et services numériques, harmonisée au titre de la directive (UE) 2016/2102. Pour le web, elle reprend les WCAG.",
        },
        {
          name: "European Accessibility Act",
          text: "Directive (UE) 2019/882, transposée en France et applicable depuis le 28 juin 2025. Elle vise notamment le commerce en ligne, hors microentreprises de services.",
        },
        {
          name: "Loi n° 2005-102, article 47",
          text: "Impose aux organismes publics et aux entreprises de plus de 250 M€ de chiffre d'affaires en France une déclaration d'accessibilité et un schéma pluriannuel.",
        },
        {
          name: "LCEN et Code de la consommation",
          text: "La LCEN de 2004 fixe les mentions légales. Le Code de la consommation encadre l'information précontractuelle et le droit de rétractation de 14 jours à distance.",
        },
        {
          name: "RGESN",
          text: "Référentiel général de l'écoconception des services numériques, publié en mai 2024 par l'Arcep et l'Arcom : des critères pour alléger un service en ligne.",
        },
      ],
      process: [
        {
          title: "Cadrage",
          text: "Nous identifions les obligations qui s'appliquent à votre structure : taille, secteur, services en ligne, public visé. Puis nous fixons l'échantillon de pages à auditer.",
        },
        {
          title: "Audit",
          text: "Tests manuels et outillés, lecteurs d'écran, inventaire des traceurs, relecture des mentions et documents. Chaque écart est rattaché au critère ou au texte concerné.",
        },
        {
          title: "Rapport priorisé",
          text: "Écarts classés par niveau de risque, captures, recommandations de correction et effort estimé. Une synthèse courte pour la direction, le détail pour vos équipes.",
        },
        {
          title: "Mise en conformité",
          text: "Nous corrigeons ou guidons vos équipes, publions les documents requis, puis vérifions par un contre-audit. Un suivi reste possible à chaque évolution du site.",
        },
      ],
      faq: [
        {
          question: "Mon entreprise est-elle concernée par l'obligation d'accessibilité ?",
          answer: "Cela dépend de votre taille, de votre secteur et de vos services. Depuis le 28 juin 2025, l'European Accessibility Act couvre notamment le commerce en ligne et les services bancaires aux consommateurs. Les microentreprises de services en sont exemptées. Le cadrage de l'audit tranche cette question.",
        },
        {
          question: "Un outil de test automatique ne suffit-il pas ?",
          answer: "Non. Les outils automatiques ne détectent qu'une partie des erreurs : contraste, attribut alt absent, code mal structuré. La pertinence d'un texte alternatif, la navigation au clavier ou la compréhension d'un formulaire exigent une vérification humaine, que nous menons aussi avec des lecteurs d'écran.",
        },
        {
          question: "Remplacez-vous notre avocat ou notre DPO ?",
          answer: "Non, nous travaillons à leurs côtés. Nous vérifions la conformité technique du site et la présence des mentions obligatoires, puis nous mettons en œuvre les corrections. La rédaction de vos CGV ou l'analyse juridique d'un traitement relèvent de votre conseil, avec qui nous nous coordonnons.",
        },
      ],
      closing:
        "Un doute sur la conformité de votre site ? Faisons le point avant qu'un contrôle ne s'en charge.",
    },
  },
  {
    id: "transition-ia",
    title: "Transition IA pour les entreprises",
    accent: "IA",
    shortTitle: "Transition IA",
    hook: "Une IA qui travaille dans vos outils, sur vos données, et dans les règles.",
    description:
      "Nous accompagnons votre entreprise du diagnostic au déploiement : choix des outils, intégration à vos logiciels, formation des équipes. Vos données restent protégées, vos usages conformes à l'AI Act et au RGPD.",
    deliverables: [
      "Diagnostic des usages",
      "Assistants RAG",
      "Automatisations",
      "Formation des équipes",
      "AI Act et RGPD",
    ],
    cta: "Voir des cas d'usage",
    projectType: "Transition IA",
    art: "ai",
    page: {
      metaDescription:
        "Transition IA pour les entreprises : diagnostic, assistants, automatisations, formation, conformité AI Act et RGPD. Novéo, studio digital à Clermont-Ferrand.",
      intro:
        "L'intelligence artificielle n'apporte rien si elle reste un onglet ouvert à côté du travail. Nous l'intégrons là où vos équipes passent leur temps : messagerie, documents, CRM, site web. Chaque usage est choisi, testé et encadré, avec une attention constante à vos données et à vos obligations.",
      examplesTitle: "Cas d'usage types",
      examplesIntro:
        "Quatre situations courantes, présentées à titre d'illustration. Chaque projet part de vos processus réels.",
      examples: [
        {
          tag: "Assistant interne",
          title: "Un assistant qui répond à partir de vos documents",
          text: "Vos équipes interrogent en langage naturel les procédures, la documentation technique ou les contrats. L'assistant cite ses sources et ne consulte que les documents auxquels chacun a accès.",
        },
        {
          tag: "Relation client",
          title: "Tri et préparation des réponses aux e-mails",
          text: "Les messages entrants sont classés par sujet et par urgence, puis un brouillon de réponse est proposé. Un collaborateur relit et valide avant tout envoi.",
        },
        {
          tag: "Traitement documentaire",
          title: "Extraction des données de factures et de devis",
          text: "Montants, dates, références et fournisseurs sont extraits des PDF et des scans, contrôlés, puis transmis à votre ERP ou à votre outil comptable. Les cas incertains sont signalés.",
        },
        {
          tag: "Site web",
          title: "Un assistant pour les visiteurs de votre site",
          text: "Il répond aux questions fréquentes à partir de vos contenus validés, oriente vers le bon interlocuteur et indique clairement qu'il s'agit d'une IA, comme l'exige l'AI Act.",
        },
      ],
      capabilitiesTitle: "Ce que nous prenons en charge",
      capabilities: [
        {
          title: "Diagnostic des usages",
          text: "Nous analysons vos processus, repérons les tâches répétitives et classons les opportunités selon leur valeur, leur faisabilité et leur niveau de risque.",
        },
        {
          title: "Choix des outils et de l'hébergement",
          text: "Copilot, ChatGPT Enterprise, Claude, Mistral : nous comparons les options selon vos logiciels, la sensibilité de vos données et vos exigences d'hébergement en Europe.",
        },
        {
          title: "Assistants connectés à vos documents",
          text: "Un assistant qui répond à partir de vos procédures, contrats ou fiches produits, cite la source de chaque réponse et respecte les droits d'accès de chacun.",
        },
        {
          title: "Automatisations et documents",
          text: "Tri des e-mails, extraction de données de factures ou de devis, synthèses : nous relions l'IA à vos outils via n8n, Make ou des développements sur mesure.",
        },
        {
          title: "Protection des données et conformité",
          text: "Cartographie des données, analyse d'impact RGPD si nécessaire, revue des contrats fournisseurs, qualification de chaque système au regard de l'AI Act.",
        },
        {
          title: "Formation et gouvernance",
          text: "Ateliers adaptés à chaque métier, charte d'utilisation, règles de validation humaine : vos équipes savent quoi confier à l'IA, et comment le vérifier.",
        },
      ],
      frameworkTitle: "Cadre et outils de référence",
      frameworkIntro:
        "Les textes qui encadrent l'IA en entreprise et les outils que nous mobilisons, retenus selon votre contexte.",
      framework: [
        {
          name: "AI Act, règlement (UE) 2024/1689",
          text: "En vigueur depuis le 1er août 2024. Pratiques interdites et mesures de maîtrise de l'IA (art. 4) applicables depuis le 2 février 2025.",
        },
        {
          name: "Omnibus IA, règlement (UE) 2026/1744",
          text: "Modifie l'AI Act. Obligations des systèmes d'IA à haut risque reportées au 2 décembre 2027 (annexe III) et au 2 août 2028 (annexe I).",
        },
        {
          name: "Article 50 de l'AI Act",
          text: "Depuis le 2 août 2026, une personne qui échange avec un système d'IA doit en être informée, sauf si c'est évident. Un chatbot doit se présenter comme tel.",
        },
        {
          name: "RGPD, règlement (UE) 2016/679",
          text: "S'applique à toute donnée personnelle traitée par une IA : base légale, minimisation, analyse d'impact (art. 35), contrat de sous-traitance (art. 28).",
        },
        {
          name: "Recommandations de la CNIL sur l'IA",
          text: "Fiches pratiques publiées depuis 2024 pour appliquer le RGPD aux systèmes d'IA : base légale, information et droits des personnes, sécurité.",
        },
        {
          name: "ISO/IEC 42001",
          text: "Norme internationale publiée en 2023, dédiée au système de management de l'IA. Un cadre utile pour structurer rôles, politiques et contrôles.",
        },
        {
          name: "Mistral AI et hébergement européen",
          text: "Modèles d'une entreprise française, dont certains à poids ouverts, déployables sur vos serveurs ou chez un hébergeur qualifié SecNumCloud.",
        },
        {
          name: "Copilot, ChatGPT, Claude, Le Chat",
          text: "Microsoft 365 Copilot, ChatGPT Enterprise, Claude et Le Chat de Mistral AI : comparés selon vos outils et vos exigences sur les données.",
        },
        {
          name: "n8n, Make, Zapier",
          text: "Plateformes pour relier l'IA à votre CRM, votre messagerie ou votre ERP. n8n peut être auto-hébergé, sur vos serveurs ou chez un hébergeur européen.",
        },
      ],
      process: [
        {
          title: "Diagnostic",
          text: "Entretiens avec vos équipes, revue des processus et des données disponibles. Vous recevez une cartographie des usages possibles, classés par priorité.",
        },
        {
          title: "Pilote",
          text: "Un premier cas d'usage est déployé sur un périmètre restreint, avec des critères de réussite définis ensemble et évalués sur vos propres données.",
        },
        {
          title: "Déploiement",
          text: "Intégration à vos outils, gestion des accès, documentation technique. Les règles de sécurité et de conformité sont posées dès la mise en production.",
        },
        {
          title: "Formation et suivi",
          text: "Ateliers par métier, charte d'utilisation, points réguliers. Nous ajustons les usages à mesure que les outils et la réglementation évoluent.",
        },
      ],
      faq: [
        {
          question: "Nos données peuvent-elles servir à entraîner les modèles ?",
          answer: "Pas si l'outil est bien choisi et bien configuré. Les offres professionnelles des principaux éditeurs excluent par défaut l'entraînement sur les données clients. Nous vérifions les conditions contractuelles, le lieu d'hébergement et les options de résidence en Europe avant toute intégration.",
        },
        {
          question: "Notre entreprise est-elle concernée par l'AI Act ?",
          answer: "Oui, dès que vos équipes utilisent l'IA dans un cadre professionnel. Le règlement distingue fournisseurs et déployeurs, et module les obligations selon le niveau de risque. Les mesures de maîtrise de l'IA (art. 4) s'appliquent déjà aux uns comme aux autres, et un chatbot doit se présenter comme tel.",
        },
        {
          question: "Faut-il changer nos outils actuels ?",
          answer: "Rarement. Nous partons de votre environnement : Microsoft 365, Google Workspace, votre CRM, votre ERP. L'IA s'y branche par des connecteurs, des API ou des plateformes comme n8n. Un changement d'outil n'est proposé que s'il apporte un bénéfice clair et durable.",
        },
      ],
      closing:
        "Un usage à tester, une équipe à former, une question de conformité ? Racontez-nous.",
    },
  },
  {
    id: "marketing-motion-design",
    title: "Marketing digital et motion design",
    accent: "motion design",
    shortTitle: "Marketing & motion",
    hook: "Des images qui retiennent l'attention, des campagnes qui se mesurent.",
    description:
      "Motion design, photographie, réseaux sociaux et publicité en ligne : nous produisons vos contenus et pilotons vos campagnes, avec une mesure fiable de chaque action.",
    deliverables: ["Motion design", "Photographie", "Réseaux sociaux", "Publicité en ligne", "Mesure GA4"],
    cta: "Voir des exemples",
    projectType: "Marketing et motion design",
    art: "motion",
    page: {
      metaDescription:
        "Motion design, photographie, réseaux sociaux et Google Ads : Novéo, studio digital à Clermont-Ferrand, produit vos contenus et pilote vos campagnes en France.",
      intro:
        "Votre marque se joue souvent en quelques secondes, sur un écran de téléphone. Nous produisons les images, les animations et les campagnes qui la rendent lisible, cohérente et mémorable. Chaque action est mesurée, pour savoir ce qui fonctionne et décider sur des données fiables.",
      examplesTitle: "Exemples de missions",
      examplesIntro:
        "Quatre situations types, à titre d'illustration, pour visualiser concrètement ce que nous livrons.",
      examples: [
        {
          tag: "Motion design",
          title: "Animation de logo et kit de marque animé",
          text: "Votre logo prend vie en quelques secondes. Nous livrons des versions pour la vidéo et les réseaux, ainsi que des éléments animés réutilisables : titres, transitions, habillages.",
        },
        {
          tag: "Photographie",
          title: "Shooting produits pour un site e-commerce",
          text: "Prise de vue en studio ou en situation, éclairage maîtrisé, retouche homogène sur toute la série. Fichiers livrés aux bons formats pour les fiches produits, les réseaux et le print.",
        },
        {
          tag: "Réseaux sociaux",
          title: "Gestion mensuelle des réseaux sociaux",
          text: "Un calendrier validé chaque mois, des publications produites par le studio, des réponses aux commentaires et un bilan mensuel des indicateurs utiles à vos décisions.",
        },
        {
          tag: "Publicité",
          title: "Campagne Google Ads avec suivi des conversions",
          text: "Structure de campagne, mots-clés, annonces et pages de destination. Conversions suivies via GA4 et Consent Mode v2, pour piloter le budget sur des résultats mesurés.",
        },
      ],
      capabilitiesTitle: "Ce que nous prenons en charge",
      capabilities: [
        {
          title: "Motion design",
          text: "Animation de logo, kit de marque animé, vidéos explicatives, formats courts pour les réseaux. Conçus sous After Effects, avec de la 3D sous Blender quand le projet le demande.",
        },
        {
          title: "Photographie professionnelle",
          text: "Produits sur fond neutre ou en situation, portraits d'équipe, lieux, événements. Prise de vue, retouche et livraison aux formats web, print et réseaux sociaux.",
        },
        {
          title: "Gestion des réseaux sociaux",
          text: "Ligne éditoriale, calendrier de publication, création des contenus et animation de communauté sur LinkedIn, Instagram ou Facebook, selon votre cible.",
        },
        {
          title: "Publicité en ligne",
          text: "Campagnes Google Ads, Meta Ads et LinkedIn Ads : ciblage, annonces, budgets, suivi des conversions et optimisation continue à partir des données réelles.",
        },
        {
          title: "Contenus SEO et emailing",
          text: "Articles, pages piliers et newsletters écrits pour vos lecteurs comme pour les moteurs de recherche. Emailings conformes aux règles de consentement en vigueur.",
        },
        {
          title: "Mesure et tableaux de bord",
          text: "Configuration de GA4, de Google Consent Mode v2 et de la Search Console. Des tableaux de bord clairs pour suivre vos indicateurs, sans jargon.",
        },
      ],
      frameworkTitle: "Outils et références",
      frameworkIntro:
        "Des plateformes reconnues et un cadre légal respecté, pour des contenus soignés et des données fiables.",
      framework: [
        {
          name: "Google Ads",
          text: "Régie publicitaire de Google : annonces sur le Réseau de Recherche, YouTube, le Réseau Display et en Performance Max.",
        },
        {
          name: "Meta Ads et LinkedIn Ads",
          text: "Publicité sur Facebook et Instagram via le Gestionnaire de publicités de Meta, campagnes B2B via LinkedIn Campaign Manager.",
        },
        {
          name: "Google Analytics 4 (GA4)",
          text: "Outil de mesure de Google fondé sur les événements. Il a remplacé Universal Analytics, qui a cessé de traiter les données en juillet 2023.",
        },
        {
          name: "Google Consent Mode v2",
          text: "Exigé par Google depuis mars 2024 pour mesurer et personnaliser les annonces auprès des utilisateurs de l'Espace économique européen.",
        },
        {
          name: "Google Search Console",
          text: "Suivi de l'indexation, des requêtes, des impressions et des clics de votre site dans la recherche Google.",
        },
        {
          name: "Article 82 loi Informatique et Libertés",
          text: "Consentement préalable obligatoire pour les traceurs publicitaires et de mesure non exemptés, selon l'article 82 de la loi Informatique et Libertés.",
        },
        {
          name: "Adobe After Effects",
          text: "Logiciel de référence pour l'animation graphique et le compositing vidéo.",
        },
        {
          name: "Blender",
          text: "Logiciel libre de création 3D : modélisation, animation et rendu, pour les visuels produits et les séquences animées.",
        },
        {
          name: "Adobe Lightroom",
          text: "Développement et retouche photo, pour un rendu homogène sur toute une série d'images.",
        },
      ],
      process: [
        {
          title: "Écoute et audit",
          text: "Nous analysons votre marque, vos canaux actuels, vos données et vos concurrents. Nous fixons ensemble des objectifs clairs et des indicateurs mesurables.",
        },
        {
          title: "Stratégie et plan",
          text: "Ligne éditoriale, choix des canaux, calendrier, budget média. Vous validez un plan précis avant toute production.",
        },
        {
          title: "Production",
          text: "Tournage, prise de vue, animation, rédaction, paramétrage des campagnes. Chaque contenu est soumis à votre validation avant diffusion.",
        },
        {
          title: "Mesure et ajustement",
          text: "Suivi des indicateurs dans GA4 et les plateformes publicitaires, bilans réguliers, ajustement des messages et des budgets selon les résultats.",
        },
      ],
      faq: [
        {
          question: "Pouvez-vous intervenir sur un seul levier, comme la photo ou Google Ads ?",
          answer: "Oui. Chaque prestation peut être commandée seule : un shooting, une animation de logo, une campagne. Nous pouvons aussi tout prendre en charge, pour garder une cohérence visuelle et un suivi unique des résultats.",
        },
        {
          question: "Qui garde la main sur les comptes publicitaires ?",
          answer: "Vous. Les comptes Google Ads, Meta et LinkedIn sont ouverts au nom de votre entreprise, et nous y accédons en tant que gestionnaire. Les conditions d'utilisation des créations produites sont précisées dans le contrat.",
        },
        {
          question: "Pourquoi le Consent Mode v2 compte-t-il pour vos campagnes ?",
          answer: "Depuis mars 2024, Google l'exige pour mesurer et personnaliser les annonces auprès des utilisateurs de l'Espace économique européen. Sans lui, le remarketing et une partie du suivi des conversions sont limités. Nous l'intégrons à votre bannière cookies, dans le respect du choix de chaque visiteur.",
        },
      ],
      closing:
        "Un lancement, une campagne, des visuels à renouveler ? Racontez-nous ce que vous préparez.",
    },
  },
  {
    id: "logiciels-sur-mesure",
    title: "Conception de logiciels professionnels sur mesure",
    accent: "sur mesure",
    shortTitle: "Logiciels métier",
    hook: "Bientôt : des logiciels taillés pour vos processus, pas l'inverse.",
    description:
      "Outils métier, extranets, back-offices, applications SaaS : nous préparons une offre de développement sur mesure. Ce service n'est pas encore ouvert, mais vous pouvez déjà nous parler de votre besoin.",
    deliverables: [
      "Outils métier",
      "Portails clients",
      "Applications SaaS",
      "Intégrations ERP / CRM",
      "Automatisation",
    ],
    cta: "En savoir plus",
    projectType: "Logiciel sur mesure",
    art: "software",
    upcoming: true,
    page: {
      metaDescription:
        "Novéo, studio digital à Clermont-Ferrand, prépare une offre de logiciels professionnels sur mesure : outils métier, extranets, SaaS. Service à venir.",
      intro:
        "Bientôt, Novéo concevra des logiciels professionnels sur mesure : outils métier, portails clients, back-offices et applications SaaS. Notre conviction : un logiciel doit épouser vos processus, pas vous obliger à les contourner. Ce service n'est pas encore ouvert, mais vous pouvez déjà nous parler de votre besoin.",
      examplesTitle: "Ce qui sera possible",
      examplesIntro:
        "Quatre types de logiciels que nous pourrons concevoir, présentés à titre d'illustration.",
      examples: [
        {
          tag: "Outil métier",
          title: "Un outil de gestion des interventions",
          text: "Pour une entreprise de maintenance : planning des techniciens, fiches d'intervention sur mobile, signature du client et rapport généré automatiquement.",
        },
        {
          tag: "Portail client",
          title: "Un extranet pour vos clients professionnels",
          text: "Vos clients suivent leurs commandes, téléchargent factures et documents, et échangent avec vos équipes dans un espace sécurisé relié à votre ERP.",
        },
        {
          tag: "Application SaaS",
          title: "Un logiciel en ligne vendu par abonnement",
          text: "Inscription des utilisateurs, espace dédié à chaque client, paiement récurrent via une API et facturation automatique : de quoi proposer votre savoir-faire en ligne.",
        },
        {
          tag: "Tableau de bord",
          title: "Un tableau de bord de pilotage unifié",
          text: "Les données de votre CRM, de votre ERP et de vos outils marketing réunies dans une seule interface, avec des indicateurs mis à jour en continu.",
        },
      ],
      capabilitiesTitle: "Ce que nous proposerons",
      capabilities: [
        {
          title: "Outils métier",
          text: "Des applications internes construites autour de vos flux réels : gestion de dossiers, planification, suivi de production ou de stock.",
        },
        {
          title: "Portails clients et extranets",
          text: "Un espace sécurisé où vos clients et partenaires consulteront commandes, documents et échanges, avec des droits d'accès par profil.",
        },
        {
          title: "Back-offices et tableaux de bord",
          text: "Une interface d'administration claire pour gérer vos données, et des indicateurs lisibles pour piloter votre activité.",
        },
        {
          title: "Applications SaaS",
          text: "Un produit en ligne vendu à d'autres entreprises : comptes utilisateurs, abonnements, espaces séparés par client, évolutions continues.",
        },
        {
          title: "Intégrations ERP, CRM et paiement",
          text: "Votre logiciel dialoguera avec votre ERP, votre CRM ou une API de paiement, pour que les données circulent sans ressaisie.",
        },
        {
          title: "Automatisation des processus",
          text: "Génération de documents, relances, synchronisations, notifications : les tâches répétitives seront déclenchées automatiquement.",
        },
      ],
      frameworkTitle: "Technologies et standards",
      frameworkIntro:
        "Des technologies éprouvées et des standards ouverts, retenus pour la sécurité, la maintenabilité et la conformité de vos outils.",
      framework: [
        {
          name: "TypeScript",
          text: "Surcouche typée de JavaScript, développée par Microsoft. Le typage statique réduit les erreurs et facilite la maintenance du code dans la durée.",
        },
        {
          name: "Next.js",
          text: "Framework open source basé sur React, développé par Vercel. Il combine rendu côté serveur et côté client pour des interfaces rapides.",
        },
        {
          name: "Node.js",
          text: "Environnement d'exécution JavaScript côté serveur, adapté aux API, aux traitements asynchrones et aux échanges en temps réel.",
        },
        {
          name: "PostgreSQL",
          text: "Base de données relationnelle open source, reconnue pour sa robustesse, ses transactions ACID et la richesse de ses types de données.",
        },
        {
          name: "API REST et GraphQL",
          text: "Deux approches standard pour exposer et consommer des données, et relier votre logiciel à un ERP, un CRM ou un service de paiement.",
        },
        {
          name: "Hébergement dans l'UE",
          text: "Des serveurs situés dans l'Union européenne, pour éviter les transferts de données hors UE encadrés par le chapitre V du RGPD.",
        },
        {
          name: "RGPD dès la conception",
          text: "Article 25 du RGPD : protection des données dès la conception et par défaut. Minimisation, droits d'accès et durées de conservation prévus d'emblée.",
        },
        {
          name: "RGAA",
          text: "Référentiel général d'amélioration de l'accessibilité, publié par l'État. Il décline les critères WCAG en tests applicables aux interfaces.",
        },
      ],
      process: [
        {
          title: "Cadrage",
          text: "Nous étudierons vos processus avec les personnes qui les vivent au quotidien, pour définir les fonctionnalités utiles et les priorités.",
        },
        {
          title: "Prototype",
          text: "Avant le développement, une maquette interactive permettra de valider les écrans, les parcours et les droits d'accès avec vos équipes.",
        },
        {
          title: "Développement itératif",
          text: "Le logiciel sera livré par étapes courtes. Chaque version sera testée, présentée et ajustée selon vos retours.",
        },
        {
          title: "Mise en production",
          text: "Déploiement, reprise des données existantes, formation des utilisateurs, puis maintenance et évolutions dans la durée.",
        },
      ],
      faq: [
        {
          question: "Quand ce service sera-t-il disponible ?",
          answer: "Nous n'annonçons pas encore de date. Nous préparons cette offre avec soin et préférons l'ouvrir lorsqu'elle sera prête. Décrivez-nous votre besoin dès maintenant : nous vous préviendrons de son lancement.",
        },
        {
          question: "Pourquoi un logiciel sur mesure plutôt qu'une solution du marché ?",
          answer: "Une solution du marché convient souvent. Le sur-mesure se justifie quand vos processus sont spécifiques, quand plusieurs outils doivent dialoguer ou quand vous voulez maîtriser vos données et vos évolutions. Le cadrage servira aussi à trancher cette question.",
        },
        {
          question: "Le logiciel pourra-t-il se connecter à nos outils existants ?",
          answer: "C'est l'un des objectifs. Les échanges avec un ERP, un CRM ou une solution de paiement passeront par leurs API, lorsqu'elles existent. Le cadrage permettra de vérifier ce que chaque outil autorise et de choisir le bon mode de synchronisation.",
        },
      ],
      closing:
        "Ce service vous intéresse ? Parlez-nous de votre besoin, nous vous préviendrons dès son lancement.",
    },
  },
];

export const serviceHref = (service: Service) => `/services/${service.id}/`;
