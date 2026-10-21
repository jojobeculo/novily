"use client";

import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { useMotionPreference } from "@/components/layout/motion-provider";

const items = [
  "Site web et logiciel sur mesure",
  "Accessibilité numérique et conformité",
  "Intelligence artificielle",
  "Marketing digital et motion design",
];

/** Drift, in percent of one copy of the list per second. */
const SPEED = 2.2;

/** Keeps v inside [min, max), wrapping around like a loop. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row() {
  return (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          <span className={i % 2 ? "font-serif italic text-cream/45" : "font-serif text-cream/90"}>
            {item}
          </span>
          <span className="mx-[0.6em] size-[0.16em] rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
}

/**
 * A band of the studio's expertise that drifts sideways, speeds up with the
 * scroll and follows its direction. It pauses under the pointer and stays
 * still when animations are reduced. Decorative: the services section already
 * says all of this to assistive technology.
 */
export function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const { reduced } = useMotionPreference();
  const paused = useRef(false);
  const direction = useRef(-1);

  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const x = useTransform(offset, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || paused.current || !inView) return;
    const b = boost.get();
    if (b > 0.05) direction.current = -1;
    else if (b < -0.05) direction.current = 1;
    const step = direction.current * SPEED * (delta / 1000) * (1 + Math.abs(b));
    offset.set(offset.get() + step);
  });

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      className="overflow-hidden border-y border-line py-8 select-none md:py-12"
    >
      <m.div
        style={{ x }}
        className="flex w-max text-[clamp(2.5rem,1.6rem+4.4vw,6.5rem)] leading-none font-light tracking-[-0.02em] whitespace-nowrap"
      >
        <Row />
        <Row />
      </m.div>
    </div>
  );
}
