"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SectionLink } from "@/components/ui/section-link";
import { easeOutExpo, inViewOnce } from "@/lib/motion";
import { navigation, siteConfig } from "@/lib/site";
import { useSmoothScroll } from "./smooth-scroll";

const linkClass =
  "inline-block text-sm text-muted transition-[color,translate,opacity] duration-500 ease-out-expo hover:translate-x-1 hover:text-cream active:opacity-60";

export function Footer({ year }: { year: number }) {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="overflow-hidden border-t border-line pt-20 md:pt-28">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs text-body text-muted">
              Studio digital indépendant. Sites vitrines, e-commerce et expériences web sur mesure.
            </p>
          </div>

          <nav aria-label="Pied de page" className="md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Navigation</p>
            <ul className="mt-6 flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <SectionLink href={item.href} className={linkClass}>
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Réseaux</p>
            <ul className="mt-6 flex flex-col gap-3">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-faint uppercase">Contact</p>
            <ul className="mt-6 flex flex-col gap-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-sm text-muted">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p>
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/mentions-legales" className="transition-[color,opacity] hover:text-cream active:opacity-60">
              Mentions légales
            </Link>
            <button
              type="button"
              onClick={() => {
                scrollTo(0);
                window.history.replaceState(window.history.state, "", window.location.pathname);
              }}
              className="group flex items-center gap-2 transition-[color,opacity] hover:text-cream active:opacity-60"
            >
              Haut de page
              <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark that rises into view as the page ends. */}
      <m.p
        aria-hidden
        initial={{ y: "35%", opacity: 0 }}
        whileInView={{ y: "10%", opacity: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 1.6, ease: easeOutExpo }}
        className="pointer-events-none text-center font-serif text-[27vw] leading-[0.8] font-light tracking-[-0.04em] text-cream/[0.06] select-none"
      >
        Novily
      </m.p>
    </footer>
  );
}
