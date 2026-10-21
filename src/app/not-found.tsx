import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { SectionLink } from "@/components/ui/section-link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée. Retrouvez le studio Novéo sur l'accueil.",
  robots: { index: false, follow: true },
};

/** Where a lost visitor most likely wanted to go. */
const shortcuts = [
  { label: "Nos services", href: "/#services" },
  { label: "Nos réalisations", href: "/#realisations" },
  { label: "Nous contacter", href: "/#contact" },
];

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-page flex min-h-svh flex-col justify-center py-40">
        <p className="text-eyebrow uppercase text-faint">Erreur 404</p>
        <h1 className="mt-8 max-w-[14ch] font-serif text-display font-light">
          Cette page s&apos;est <em className="text-accent">égarée.</em>
        </h1>
        <p className="mt-10 max-w-md text-lead text-muted">
          Le lien est peut-être ancien, ou l&apos;adresse contient une faute de frappe.
        </p>
        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-12">
          <Button href="/" variant="outline" arrow className="self-start">
            Retour à l&apos;accueil
          </Button>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <SectionLink
                  href={s.href}
                  className="inline-block py-1.5 underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-accent"
                >
                  {s.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
