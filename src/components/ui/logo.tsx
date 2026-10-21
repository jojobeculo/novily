import { LogoMark } from "./logo-mark";
import { SectionLink } from "./section-link";

/** The orbit mark beside the serif wordmark; the mark's satellite carries the accent. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <SectionLink
      href="/#accueil"
      onClick={onClick}
      aria-label="Novéo — retour à l'accueil"
      className={`group inline-flex items-center gap-2.5 font-serif text-[1.625rem] leading-none font-light tracking-[-0.02em] text-cream ${className ?? ""}`}
    >
      <LogoMark className="size-[1.875rem] shrink-0" />
      Novéo
    </SectionLink>
  );
}
