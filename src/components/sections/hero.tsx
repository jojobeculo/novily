"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/ui/text-reveal";
import { siteConfig } from "@/lib/site";
import { HeroVisual } from "./hero-visual";

/** CSS entrance, so the first screen paints without waiting for JavaScript. */
const enter = "animate-[fade-up_1.2s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none";
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={ref}
      id="accueil"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden pt-28 pb-10 tall:pb-14"
    >
      <HeroVisual />

      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative flex flex-1 flex-col justify-end"
      >
        <div className={enter} style={delay(0.1)}>
          <p className="mb-8 text-eyebrow uppercase text-faint tall:mb-12">
            Création de sites web sur mesure
          </p>
        </div>

        <TextReveal
          as="h1"
          id="hero-title"
          immediate
          delay={0.1}
          stagger={0.05}
          text={[
            "Nous concevons des expériences digitales qui ",
            { accent: "marquent les esprits." },
          ]}
          className="max-w-[15ch] font-serif text-hero font-light text-balance"
        />

        <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end md:gap-6 tall:mt-16 tall:pt-10">
          <div className={`md:col-span-5 ${enter}`} style={delay(0.6)}>
            <p className="max-w-md text-lead text-muted">
              Novéo imagine et développe des sites web élégants, rapides et pensés pour
              transformer vos visiteurs en clients.
            </p>
          </div>

          <div
            style={delay(0.72)}
            className={`flex flex-col items-start gap-4 md:col-span-7 md:items-end ${enter}`}
          >
            {/* One call to action across the site: every conversion button says the same thing. */}
            <Magnetic>
              <Button href="/#contact" variant="light" arrow>
                Parlons de votre projet
              </Button>
            </Magnetic>
            <p className="flex items-center gap-2.5 text-sm text-faint">
              <span aria-hidden className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {siteConfig.location}
            </p>
          </div>
        </div>
      </m.div>

      <div
        aria-hidden
        style={delay(1.3)}
        className={`absolute bottom-0 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden md:block ${enter}`}
      >
        <span className="block h-full w-full animate-[scroll-cue_2.4s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-cream/50 motion-reduce:animate-none" />
      </div>
    </section>
  );
}
