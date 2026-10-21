"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/components/layout/motion-provider";
import { easeOutExpo } from "@/lib/motion";

/**
 * A figure such as "95+" or "100 %" that counts up from zero the first time it
 * comes into view. Values with no number worth counting (under 10) stay as
 * they are. The static HTML and assistive technology get the final value.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const { reduced } = useMotionPreference();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduced || target < 10) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: easeOutExpo,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, target]);

  if (!match || shown === null) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      <span aria-hidden>
        {match[1]}
        {shown}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
