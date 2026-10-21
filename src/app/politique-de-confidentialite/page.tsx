import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/layout/legal-document";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${siteConfig.name} collecte, utilise et protège vos données personnelles, et comment exercer vos droits (RGPD).`,
  alternates: { canonical: `${siteConfig.url}/politique-de-confidentialite/` },
};

const mail = <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>;
// The audience measurement paragraphs only exist when analytics is configured.
const analytics = Boolean(siteConfig.analyticsId);

const sections: LegalSection[] = [
  {
    title: "Responsable du traitement",
    body: (
      <p>
        {siteConfig.legalName}, [adresse], {siteConfig.city}. Pour toute question sur vos données : {mail}.
      </p>
    ),
  },
  {
    title: "Données collectées",
    body: (
      <>
        <p>Nous ne collectons que les données utiles :</p>
        <ul>
          <li>
            <strong className="font-normal text-cream">Formulaire de contact</strong> : nom,
            adresse e-mail, entreprise (facultatif), type de projet et message.
          </li>
          {analytics ? (
            <li>
              <strong className="font-normal text-cream">Mesure d&apos;audience</strong>, uniquement
              si vous l&apos;acceptez : pages consultées, durée de visite, type d&apos;appareil et
              provenance approximative, sous forme pseudonymisée.
            </li>
          ) : null}
        </ul>
        <p>Aucune donnée sensible n&apos;est collectée.</p>
      </>
    ),
  },
  {
    title: "Finalités et bases légales",
    body: (
      <ul>
        <li>
          Répondre à votre demande et préparer une proposition : mesures précontractuelles prises
          à votre demande (article 6.1.b du RGPD).
        </li>
        {analytics ? (
          <li>
            Mesurer l&apos;audience pour améliorer le site : votre consentement (article 6.1.a du
            RGPD), que vous pouvez retirer à tout moment.
          </li>
        ) : null}
      </ul>
    ),
  },
  {
    title: "Destinataires",
    body: (
      <>
        <p>
          Vos données sont destinées à {siteConfig.legalName} seul. Elles ne sont ni vendues ni
          cédées. Nos prestataires techniques n&apos;y accèdent que pour fournir leur service :
          l&apos;hébergeur du site, [nom de l&apos;hébergeur], et le service d&apos;envoi du
          formulaire, [nom du service, le cas échéant].
        </p>
        {analytics ? (
          <p>
            La mesure d&apos;audience est assurée par Google Analytics (Google Ireland Limited).
            Les transferts éventuels hors de l&apos;Union européenne sont encadrés par le Data
            Privacy Framework UE–États-Unis et les clauses contractuelles types de la Commission
            européenne.
          </p>
        ) : null}
      </>
    ),
  },
  {
    title: "Durée de conservation",
    body: (
      <ul>
        <li>Demandes de contact : 3 ans à compter de notre dernier échange.</li>
        {analytics ? (
          <li>
            Mesure d&apos;audience : cookies valables 13 mois au plus, données conservées 14 mois.
          </li>
        ) : null}
        {analytics ? (
          <li>Votre choix concernant les cookies : 13 mois, puis nous vous le redemandons.</li>
        ) : null}
        <li>
          Réglage « Réduire les animations » : jusqu&apos;à ce que vous le changiez ou effaciez
          les données de votre navigateur.
        </li>
      </ul>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        {analytics ? (
          <p>
            Aucun cookie n&apos;est déposé tant que vous n&apos;avez pas accepté la mesure
            d&apos;audience. Votre choix est enregistré dans votre navigateur, sans cookie. Vous
            pouvez le modifier à tout moment depuis le lien « Cookies » en bas de chaque page.
          </p>
        ) : (
          <p>Ce site ne dépose aucun cookie et n&apos;utilise aucun traceur.</p>
        )}
        <p>
          Si vous activez « Réduire les animations » en bas de page, ce réglage est gardé dans
          votre navigateur pour s&apos;appliquer à vos prochaines visites. Il ne quitte pas votre
          appareil et ne sert à rien d&apos;autre.
        </p>
      </>
    ),
  },
  {
    title: "Vos droits",
    body: (
      <>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          d&apos;opposition, de limitation et de portabilité de vos données
          {analytics ? ", ainsi que du droit de retirer votre consentement" : ""}. Pour les
          exercer, écrivez-nous à {mail}. Nous répondons sous un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
          réclamation à la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    title: "Sécurité",
    body: "Le site est servi exclusivement en HTTPS. L'accès aux demandes reçues est limité aux personnes qui les traitent.",
  },
  {
    title: "Modifications",
    body: (
      <p>
        Cette politique peut évoluer. La date de dernière mise à jour figure en haut de la page.
        Voir aussi les <Link href="/mentions-legales/">mentions légales</Link> et les{" "}
        <Link href="/cgu/">conditions générales d&apos;utilisation</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Politique de"
      accent="confidentialité"
      updated="21 octobre 2026"
      intro="Vos données vous appartiennent. Voici, simplement, ce que nous en faisons."
      sections={sections}
    />
  );
}
