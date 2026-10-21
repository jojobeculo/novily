"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { easeInOutQuart, easeOutExpo } from "@/lib/motion";
import { navigation, siteConfig } from "@/lib/site";

/** Tracks which home page section sits in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("accueil");

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of navigation) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(usePathname() === "/");

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > previous + 2);
    if (y < previous - 2) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-700 ease-out-expo ${
          scrolled && !open
            ? "border-line bg-ink/55 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className="container-page flex h-20 items-center justify-between gap-6"
        >
          <Logo onClick={close} />

          <ul className="hidden items-center gap-9 lg:flex">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`group relative py-2 text-sm font-normal transition-colors duration-500 ${
                    active === item.id ? "text-accent" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Magnetic>
                <Button href="/#contact" size="sm">
                  Parlons de votre projet
                </Button>
              </Magnetic>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative flex size-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-cream transition-transform duration-500 ease-out-expo ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-cream transition-transform duration-500 ease-out-expo ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-28 pb-10 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: easeInOutQuart }}
          >
            <ul className="container-page flex flex-col gap-2">
              {navigation.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <m.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline gap-4 py-1 font-serif text-[clamp(2.5rem,11vw,4rem)] leading-tight font-light"
                    >
                      <span className="font-sans text-xs text-faint">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </m.div>
                </li>
              ))}
            </ul>
            <m.div
              className="container-page mt-auto flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Button href="/#contact" onClick={close} arrow className="self-start">
                Parlons de votre projet
              </Button>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted">
                {siteConfig.email}
              </a>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
