import { Reveal } from "@/components/ui/reveal";

/** Summary of a fictitious audit: one line per area checked. */
const areas = [
  { area: "Accessibilité", reference: "RGAA 4.1.2", result: "58 %", note: "des critères applicables respectés" },
  { area: "Cookies", reference: "Recommandations CNIL", result: "Non conforme", note: "traceurs déposés avant le choix" },
  { area: "Données personnelles", reference: "RGPD", result: "4 écarts", note: "information et durées de conservation" },
  { area: "Mentions légales", reference: "LCEN", result: "2 manques", note: "hébergeur et numéro d'immatriculation absents" },
];

/** Prioritised corrections, each tied to the criterion it answers. */
const actions = [
  {
    level: "Critique",
    action:
      "Bloquer les traceurs de mesure et publicitaires jusqu'au choix du visiteur, et rendre « Tout refuser » aussi visible que « Tout accepter ».",
    reference: "Loi Informatique et Libertés, art. 82 · CNIL",
  },
  {
    level: "Critique",
    action: "Associer chaque champ du formulaire de contact à une étiquette lue par les lecteurs d'écran.",
    reference: "RGAA 11.1 · WCAG 1.3.1",
  },
  {
    level: "Majeur",
    action: "Renforcer le gris des textes secondaires : contraste de 2,8:1 mesuré, 4,5:1 requis.",
    reference: "RGAA 3.2 · WCAG 1.4.3",
  },
  {
    level: "Majeur",
    action: "Compléter les mentions légales : identité de l'hébergeur et numéro d'immatriculation.",
    reference: "LCEN",
  },
  {
    level: "Mineur",
    action: "Donner une alternative vide aux images décoratives pour qu'elles soient ignorées.",
    reference: "RGAA 1.2 · WCAG 1.1.1",
  },
];

const levelClass: Record<string, string> = {
  Critique: "border-accent text-accent",
  Majeur: "border-line-strong text-cream",
  Mineur: "border-line text-muted",
};

/**
 * A sample compliance audit report, to show what the client receives: a
 * summary per area, then corrections ranked by priority with their reference.
 * Fictitious site, labelled as such.
 */
export function AuditReport() {
  return (
    <Reveal>
      <figure
        aria-labelledby="audit-report-title"
        className="overflow-hidden rounded-card border border-line-strong bg-surface"
      >
        <div className="flex flex-col gap-3 border-b border-line px-6 py-6 sm:flex-row sm:items-end sm:justify-between md:px-9">
          <div>
            <p className="text-eyebrow uppercase text-faint">Exemple de rapport d&apos;audit</p>
            <h3
              id="audit-report-title"
              className="mt-3 font-serif text-[clamp(1.375rem,1.15rem+0.8vw,1.875rem)] leading-tight font-light"
            >
              Conformité du site <em className="text-accent">entreprise-exemple.fr</em>
            </h3>
          </div>
          <p className="text-xs text-faint">Site fictif · données d&apos;illustration</p>
        </div>

        <dl className="grid border-b border-line sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <div key={a.area} className="border-line px-6 py-7 not-last:border-b sm:not-last:border-r md:px-9 lg:border-b-0">
              <dt className="text-sm text-muted">
                {a.area}
                <span className="mt-1 block text-xs text-faint">{a.reference}</span>
              </dt>
              <dd className="mt-5">
                <span className="block font-serif text-[1.75rem] leading-none font-light">{a.result}</span>
                <span className="mt-2 block text-xs leading-relaxed text-faint">{a.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="px-6 py-7 md:px-9 md:py-9">
          <h4 className="text-xs tracking-[0.14em] text-faint uppercase">Corrections prioritaires</h4>
          <ol className="mt-5">
            {actions.map((a) => (
              <li
                key={a.action}
                className="grid gap-3 border-t border-line py-5 md:grid-cols-[7rem_1fr_14rem] md:items-baseline md:gap-6"
              >
                <span
                  className={`justify-self-start rounded-full border px-3 py-1 text-xs ${levelClass[a.level]}`}
                >
                  {a.level}
                </span>
                <span className="text-body text-cream/90">{a.action}</span>
                <span className="text-xs text-faint md:text-right">{a.reference}</span>
              </li>
            ))}
          </ol>
        </div>
        <figcaption className="border-t border-line px-6 py-5 text-xs leading-relaxed text-faint md:px-9">
          Chaque écart est décrit, situé dans le site et accompagné de sa correction. Le rapport se
          termine par un plan d&apos;action chiffré en effort.
        </figcaption>
      </figure>
    </Reveal>
  );
}
