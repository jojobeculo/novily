"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SectionLink } from "@/components/ui/section-link";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { OPEN_CONSENT_EVENT } from "@/lib/consent";
import { serviceHref, services } from "@/lib/services";
import { navigation, siteConfig } from "@/lib/site";
import { useMotionPreference } from "./motion-provider";
import { useSmoothScroll } from "./smooth-scroll";

// Vertical padding: each link offers a comfortable touch target (28 px or more).
const linkClass =
  "inline-block py-1 text-sm text-muted transition-[color,translate,opacity] duration-500 ease-out-expo hover:translate-x-1 hover:text-cream active:opacity-60";

const bottomLinkClass =
  "min-w-6 py-1.5 text-center transition-[color,opacity] hover:text-cream active:opacity-60";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales/" },
  { label: "Confidentialité", href: "/politique-de-confidentialite/" },
  { label: "CGU", href: "/cgu/" },
  { label: "Accessibilité", href: "/accessibilite/" },
];

/** "Réduire les animations": stops every animation that moves on its own (WCAG 2.2.2). */
function MotionSwitch() {
  const { reduced, toggle } = useMotionPreference();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={toggle}
      className={`group flex items-center gap-2.5 ${bottomLinkClass}`}
    >
      Réduire les animations
      <span
        aria-hidden
        className={`relative h-4 w-7 rounded-full border transition-colors duration-500 ${
          reduced ? "border-accent bg-accent/20" : "border-line-strong group-hover:border-cream"
        }`}
      >
        <span
          className={`absolute top-1/2 left-0.5 size-2.5 -translate-y-1/2 rounded-full transition-[translate,background-color] duration-500 ease-out-expo ${
            reduced ? "translate-x-3 bg-accent" : "bg-cream/70"
          }`}
        />
      </span>
    </button>
  );
}

export function Footer({ year }: { year: number }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="overflow-hidden border-t border-line pt-20 md:pt-28">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs text-body text-muted">
              Studio digital indépendant. Site web et logiciel sur mesure, accessibilité numérique
              et conformité, intelligence artificielle, marketing digital et motion design.
            </p>
          </div>

          <nav aria-label="Pied de page" className="md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Navigation</p>
            <ul className="mt-5 flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <SectionLink href={item.href} className={linkClass}>
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nos services" className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Services</p>
            <ul className="mt-5 flex flex-col gap-1">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={serviceHref(s)} className={linkClass}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {siteConfig.socials.length > 0 ? (
            <div className="md:col-span-2">
              <p className="text-xs tracking-[0.14em] text-faint uppercase">Réseaux</p>
              <ul className="mt-5 flex flex-col gap-1">
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Contact</p>
            <ul className="mt-5 flex flex-col gap-1">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="py-1 text-sm text-muted">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p>
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className={bottomLinkClass}>
                {l.label}
              </Link>
            ))}
            <MotionSwitch />
            {siteConfig.analyticsId ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
                className={bottomLinkClass}
              >
                Cookies
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                scrollTo(0);
                window.history.replaceState(window.history.state, "", window.location.pathname);
              }}
              className={`group flex items-center gap-2 ${bottomLinkClass}`}
            >
              Haut de page
              <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark that rises into view as the page ends. Pure decoration, drawn
          by CSS so assistive technology and contrast checks skip it. */}
      <m.div
        aria-hidden
        initial={{ y: "35%", opacity: 0 }}
        whileInView={{ y: "10%", opacity: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 1.6, ease: easeOutExpo }}
        className="pointer-events-none text-center font-serif text-[27vw] leading-[0.8] font-light tracking-[-0.04em] text-cream/[0.06] select-none before:content-['Novéo']"
      />
    </footer>
  );
}
