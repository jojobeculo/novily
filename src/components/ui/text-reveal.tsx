"use client";

import { m, type Variants } from "framer-motion";
import type { RichText } from "@/lib/content";
import { easeOutExpo, inViewOnce } from "@/lib/motion";

type TextRevealProps = {
  text: RichText;
  id?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /**
   * Play on first paint with a CSS animation instead of when the text scrolls
   * into view. Use it above the fold: the text does not wait for hydration.
   */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.2, ease: easeOutExpo } },
};

const accentClass = "inline-block pr-[0.06em] font-serif italic text-accent";

/**
 * Reveals a headline word by word, each word sliding up from behind a mask.
 * The full text stays in the DOM for crawlers and screen readers.
 */
export function TextReveal({
  text,
  id,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
  stagger = 0.06,
}: TextRevealProps) {
  const words = text.flatMap((segment) => {
    const accent = typeof segment !== "string";
    const value = accent ? segment.accent : segment;
    return value
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, accent }));
  });

  const content = words.map(({ w, accent }, i) => (
    <span key={i}>
      <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
        {immediate ? (
          <span
            className={`${accent ? accentClass : "inline-block"} animate-[word-in_1s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none`}
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            {w}
          </span>
        ) : (
          <m.span variants={word} className={accent ? accentClass : "inline-block"}>
            {w}
          </m.span>
        )}
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));

  if (immediate) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {content}
      </Tag>
    );
  }

  const Tag = m[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {content}
    </Tag>
  );
}
