import { SectionLink } from "./section-link";

/** Serif wordmark with a periwinkle full stop — the brand signature. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <SectionLink
      href="/#accueil"
      onClick={onClick}
      aria-label="Novily — retour à l'accueil"
      className={`inline-flex items-baseline font-serif text-[1.625rem] leading-none font-light tracking-[-0.02em] text-cream ${className ?? ""}`}
    >
      Novily
      <span aria-hidden className="text-accent">
        .
      </span>
    </SectionLink>
  );
}
