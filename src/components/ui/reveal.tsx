"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo, inViewOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
};

/** Fade + translate into place when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 1.1, ease: easeOutExpo, delay }}
    >
      {children}
    </m.div>
  );
}

/** A hairline that draws itself from left to right. */
export function RevealLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.div
      aria-hidden
      className={`h-px origin-left bg-line ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inViewOnce}
      transition={{ duration: 1.4, ease: easeOutExpo, delay }}
    />
  );
}
