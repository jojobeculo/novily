"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { serviceHref, services } from "@/lib/services";

type Filter = ProjectCategory | "all";

export function ProjectCard({ project }: { project: Project }) {
  return (
    // Not a link: no hover zoom or highlight, so the mockup's drawn buttons never look live.
    <article>
      <ImageReveal
        src={project.image}
        alt={project.imageAlt}
        sizes="(min-width: 768px) 46vw, 100vw"
        className="aspect-[4/3] rounded-card"
      />
      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          {/* No link-style underline: the cards show work, they do not lead anywhere. */}
          <h3 className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-tight font-light">
            {project.name}
          </h3>
          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
            {project.summary}
          </p>
        </div>
        <p className="shrink-0 pt-2 text-right text-xs text-faint">
          <span className="block uppercase tracking-[0.14em]">{project.categoryLabel}</span>
          <span className="mt-1.5 block tabular-nums">{project.year}</span>
        </p>
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  // "Sélection" keeps the home page short; each category shows all of its projects.
  const visible = projects.filter((p) => (filter === "all" ? p.featured : p.category === filter));

  return (
    <section id="realisations" aria-labelledby="work-title" className="section-space">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          index="03"
          label="Réalisations"
          title={["Des projets ", { accent: "qui comptent." }]}
          intro="Une sélection de sites imaginés et développés pour des marques exigeantes."
        />

        <div
          role="group"
          aria-label="Filtrer les réalisations"
          className="mt-16 flex flex-wrap gap-2 md:mt-24"
        >
          {projectCategories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-[color,background-color,border-color,scale] duration-500 active:scale-95 active:duration-150 ${
                  active
                    ? "border-cream bg-cream text-ink"
                    : "border-line text-muted hover:border-line-strong hover:text-cream"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* The whole grid cross-fades when the filter changes. */}
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={filter}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35 } }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24 lg:gap-x-10"
          >
            {visible.map((project, i) => (
              <li key={project.slug} className={i % 2 === 1 ? "md:mt-40" : undefined}>
                <ProjectCard project={project} />
              </li>
            ))}
          </m.ul>
        </AnimatePresence>

        <Reveal className="mt-24 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-32">
          <p className="max-w-md text-body text-muted">
            Votre projet pourrait être le prochain. Parlons de vos objectifs.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 self-start sm:self-auto">
            <SectionLink
              href={`${serviceHref(services.find((s) => s.art === "web")!)}#exemples`}
              className="inline-block py-2 text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-accent"
            >
              Toutes nos réalisations ({projects.length})
            </SectionLink>
            <Button href="/#contact" variant="light" arrow>
              Parlons de votre projet
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
