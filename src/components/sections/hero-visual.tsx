"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { easeOutExpo } from "@/lib/motion";

const rings = [110, 170, 230, 290, 350];

/**
 * Hairline orbits that draw themselves in, turn slowly and follow the pointer
 * with a light parallax. Purely decorative.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 40, damping: 20 });
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 900], [0, 160]);
  const scrollFade = useTransform(scrollY, [0, 700], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * -28);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * -28);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, pointerX, pointerY]);

  return (
    <m.div
      aria-hidden
      style={{ y: scrollShift, opacity: scrollFade }}
      className="pointer-events-none absolute top-[8%] -right-[45%] w-[130vw] max-w-[60rem] sm:-right-[25%] sm:w-[90vw] lg:top-1/2 lg:-right-[12%] lg:w-[50vw] lg:-translate-y-1/2"
    >
      <m.div style={{ x, y }} className="opacity-60 lg:opacity-100">
        <svg viewBox="0 0 800 800" className="w-full" fill="none">
          {rings.map((r, i) => (
            <m.circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              stroke="var(--color-cream)"
              strokeOpacity={0.07 + i * 0.025}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: easeOutExpo, delay: 0.4 + i * 0.12 }}
            />
          ))}

          <g className="origin-center animate-[spin_90s_linear_infinite] motion-reduce:animate-none">
            <m.ellipse
              cx="400"
              cy="400"
              rx="350"
              ry="120"
              stroke="var(--color-cream)"
              strokeOpacity="0.16"
              vectorEffect="non-scaling-stroke"
              transform="rotate(-24 400 400)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: easeOutExpo, delay: 1 }}
            />
          </g>

          <g className="origin-center animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
            <m.circle
              cx="400"
              cy="50"
              r="5"
              fill="var(--color-accent)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: easeOutExpo, delay: 1.8 }}
            />
          </g>

          <m.line
            x1="400"
            y1="0"
            x2="400"
            y2="800"
            stroke="var(--color-cream)"
            strokeOpacity="0.08"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: easeOutExpo, delay: 0.6 }}
          />
          <m.line
            x1="0"
            y1="400"
            x2="800"
            y2="400"
            stroke="var(--color-cream)"
            strokeOpacity="0.08"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: easeOutExpo, delay: 0.7 }}
          />
        </svg>
      </m.div>
    </m.div>
  );
}
