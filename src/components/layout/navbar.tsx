"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionLink } from "@/components/ui/section-link";
import { easeInOutQuart, easeOutExpo } from "@/lib/motion";
import { navigation, siteConfig } from "@/lib/site";
import { useSmoothScroll } from "./smooth-scroll";

/**
 * Tracks which home page section sits in the middle of the viewport. On a page
 * without these sections (legal notice), nothing is active.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  // The navbar outlives page changes: observe again the sections of each new page.
  const pathname = usePathname();

  useEffect(() => {
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
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [pathname]);

  return active;
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { setLocked, isAutoScrolling } = useSmoothScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide while reading down, show again on the way up. Stay in view during anchor glides.
    if (isAutoScrolling() || y < previous - 2) setHidden(false);
    else if (y > 480 && y > previous + 2) setHidden(true);
  });

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    setLocked(true);
    window.addEventListener("keydown", onKey);
    // The page behind the menu can be neither reached with Tab nor read.
    const background = document.querySelectorAll<HTMLElement>('main, footer, a[href="#contenu"]');
    background.forEach((el) => (el.inert = true));
    const focusFirst = window.setTimeout(
      () => menu?.querySelector<HTMLElement>("a[href]")?.focus(),
      350,
    );
    return () => {
      setLocked(false);
      window.removeEventListener("keydown", onKey);
      background.forEach((el) => (el.inert = false));
      window.clearTimeout(focusFirst);
      // Closed without following a link (Escape, toggle): focus goes back to the toggle.
      const current = document.activeElement;
      if (!current || current === document.body || menu?.contains(current)) toggle?.focus();
    };
  }, [open, setLocked]);

  const close = () => setOpen(false);

  return (
    <>
      <m.header
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        // Keyboard focus inside the header brings it back into view.
        onFocus={() => setHidden(false)}
        // Named view transition: the header stays still while pages change beneath it.
        style={{ viewTransitionName: "site-header" }}
        // CSS entrance: the header shows on first paint, without waiting for hydration.
        className={`fixed inset-x-0 top-0 z-50 animate-[header-in_0.9s_cubic-bezier(0.16,1,0.3,1)_backwards] transition-[background-color,backdrop-filter] duration-700 ease-out-expo ${
          scrolled && !open ? "bg-ink/60 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className={`container-page flex items-center justify-between gap-6 transition-[height] duration-700 ease-out-expo ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Logo onClick={close} />

          <ul className="hidden items-center gap-9 lg:flex">
            {navigation.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <SectionLink
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={`group relative block py-2 text-sm font-normal transition-[color,opacity] duration-500 active:opacity-60 ${
                      current ? "text-cream" : "text-cream/65 hover:text-cream"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-px transition-transform duration-700 ease-out-expo ${
                        current
                          ? "origin-left scale-x-100 bg-accent"
                          : "origin-right scale-x-0 bg-current group-hover:origin-left group-hover:scale-x-100"
                      }`}
                    />
                  </SectionLink>
                </li>
              );
            })}
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
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative flex size-11 items-center justify-center rounded-full transition-[background-color,scale] duration-300 active:scale-90 active:bg-cream/10 lg:hidden"
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

        {/* Hairline that fills with the reading progress once the page scrolls. */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px bg-line transition-opacity duration-700 ${
            scrolled && !open ? "opacity-100" : "opacity-0"
          }`}
        >
          <m.div style={{ scaleX: progress }} className="h-full origin-left bg-cream/50" />
        </div>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-28 pb-10 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: easeInOutQuart }}
          >
            <nav aria-label="Menu" className="container-page">
              <ul className="flex flex-col gap-2">
                {navigation.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%", transition: { duration: 0.3 } }}
                      transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 + i * 0.06 }}
                    >
                      <SectionLink
                        href={item.href}
                        onClick={close}
                        className={`flex items-baseline gap-4 py-1 font-serif text-[clamp(2.5rem,11vw,4rem)] leading-tight font-light transition-opacity active:opacity-60 ${
                          active === item.id ? "text-cream" : "text-cream/70"
                        }`}
                      >
                        <span className="font-sans text-xs text-faint">0{i + 1}</span>
                        {item.label}
                      </SectionLink>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <m.div
              className="container-page mt-auto flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Button href="/#contact" onClick={close} arrow className="self-start">
                Parlons de votre projet
              </Button>
              <div className="flex flex-col gap-1.5 text-sm text-muted">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <span className="text-faint">{siteConfig.location}</span>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
