"use client";

import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SmoothScroll = {
  /** Glides to an element or a y position. */
  scrollTo: (target: HTMLElement | number) => void;
  /** Freezes the page scroll, e.g. while the mobile menu is open. */
  setLocked: (locked: boolean) => void;
  /** True while a scrollTo glide runs, so the navbar can stay in view. */
  isAutoScrolling: () => boolean;
};

const SmoothScrollContext = createContext<SmoothScroll | null>(null);

const GLIDE_SECONDS = 1.4;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Inertial page scroll (Lenis) and eased anchor navigation.
 * With "reduce motion", the page keeps the native scroll and jumps to anchors.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const autoRef = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  const [api] = useState<SmoothScroll>(() => ({
    scrollTo(target) {
      const lenis = lenisRef.current;
      const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY;
      if (!lenis) {
        window.scrollTo({ top, behavior: "auto" });
        return;
      }
      // A link in the mobile menu scrolls as the menu closes: release the lock first,
      // because a later start() would reset the glide.
      if (lenis.isStopped) lenis.start();
      // A native scroll (focus, find in page) can leave Lenis on a stale position, and a
      // glide would then start from it. Resync on the real position first.
      lenis.scrollTo(window.scrollY, { immediate: true });
      autoRef.current = true;
      lenis.scrollTo(top, { duration: GLIDE_SECONDS, easing: easeInOutCubic });
      // A timer, not onComplete: a wheel event can cut the glide short and skip onComplete.
      window.setTimeout(() => {
        autoRef.current = false;
      }, GLIDE_SECONDS * 1000 + 100);
    },
    setLocked(locked) {
      const lenis = lenisRef.current;
      if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
      }
      document.documentElement.style.overflow = locked ? "hidden" : "";
    },
    isAutoScrolling: () => autoRef.current,
  }));

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  return context;
}
