"use client";

import { AnimatePresence, m, type Variants } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { testimonials } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

// `custom` carries the direction so the leaving quote exits the right way.
const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction * 28 }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({ opacity: 0, y: direction * -20 }),
};

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Témoignage précédent" : "Témoignage suivant"}
      className="group flex size-12 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 hover:border-cream hover:bg-cream hover:text-ink"
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className={`size-4 transition-transform duration-500 ease-out-expo ${
          direction === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <path d="M1 8h13M9 3l5 5-5 5" />
      </svg>
    </button>
  );
}

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, 1 | -1]>([0, 1]);
  const count = testimonials.length;
  const current = testimonials[index];

  const go = (step: 1 | -1) => setState(([i]) => [(i + step + count) % count, step]);

  return (
    <section aria-labelledby="testimonials-title" className="section-space">
      <div className="container-page">
        <Reveal className="flex justify-center">
          <Eyebrow index="05" label="Témoignages" />
        </Reveal>
        <h2 id="testimonials-title" className="sr-only">
          Ce que disent nos clients
        </h2>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-5xl text-center md:mt-20">
          <span aria-hidden className="block font-serif text-7xl leading-none text-accent md:text-8xl">
            &ldquo;
          </span>

          <div aria-live="polite" className="relative mt-4 grid min-h-[22rem] md:min-h-[20rem]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <m.figure
                key={index}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="flex flex-col items-center"
              >
                <blockquote className="font-serif text-[clamp(1.625rem,1.1rem+2.2vw,3.25rem)] leading-[1.2] font-light text-balance">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-10 text-sm">
                  <span className="font-medium">{current.name}</span>
                  <span className="mx-3 text-faint">—</span>
                  <span className="text-muted">{current.role}</span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <ArrowButton direction="prev" onClick={() => go(-1)} />
            <p className="flex items-center gap-4 text-xs text-faint tabular-nums">
              <span className="text-cream">{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden className="relative h-px w-16 bg-line">
                <m.span
                  className="absolute inset-y-0 left-0 bg-cream"
                  animate={{ width: `${((index + 1) / count) * 100}%` }}
                  transition={{ duration: 0.8, ease: easeOutExpo }}
                />
              </span>
              <span>{String(count).padStart(2, "0")}</span>
            </p>
            <ArrowButton direction="next" onClick={() => go(1)} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
