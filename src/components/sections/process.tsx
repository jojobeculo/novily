"use client";

import { m, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { processSteps } from "@/lib/content";

function Step({ index, title, description }: { index: number; title: string; description: string }) {
  const ref = useRef<HTMLLIElement>(null);
  // A step is "current" while it crosses the middle band of the viewport.
  const current = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li ref={ref} className="relative border-b border-line last:border-b-0">
      <span
        aria-hidden
        className={`absolute top-12 -left-px size-[3px] -translate-x-1/2 rounded-full transition-[background-color,transform] duration-700 md:top-16 ${
          current ? "scale-[2.5] bg-accent" : "bg-transparent"
        }`}
      />
      <Reveal y={24}>
        <div className="grid gap-4 py-10 pl-8 md:grid-cols-12 md:gap-6 md:py-14 md:pl-12">
          <span
            className={`font-serif text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-light tabular-nums transition-colors duration-700 md:col-span-3 ${
              current ? "text-cream" : "text-cream/20"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-title font-light md:col-span-4 md:pt-3">{title}</h3>
          <p className="max-w-md text-body text-muted md:col-span-5 md:pt-4">
            {description}
          </p>
        </div>
      </Reveal>
    </li>
  );
}

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 50%"] });

  return (
    <section id="methode" aria-labelledby="process-title" className="section-space">
      <div className="container-page">
        <SectionHeader
          id="process-title"
          index="04"
          label="Process"
          title={["Notre ", { accent: "méthode." }]}
          intro="Cinq étapes claires, un seul interlocuteur. Vous savez à chaque instant où en est votre projet."
        />

        <ol ref={listRef} className="relative mt-20 md:mt-28">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
          <m.span
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-cream/70"
          />
          {processSteps.map((step, i) => (
            <Step key={step.title} index={i} {...step} />
          ))}
        </ol>
      </div>
    </section>
  );
}
