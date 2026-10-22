import Link from "next/link";
import { PageTransition } from "@/components/layout/page-transition";
import { Accordion } from "@/components/ui/accordion";
import { ContactButton } from "@/components/ui/contact-button";
import { Reveal, RevealLine } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { TextReveal } from "@/components/ui/text-reveal";
import { projects, type RichText } from "@/lib/content";
import { serviceHref, services, type Service } from "@/lib/services";
import { AuditReport } from "./audit-report";
import { ServiceArt } from "./service-art";
import { ProjectCard } from "./work";

const pad = (n: number) => String(n).padStart(2, "0");

/** The title with its `accent` part in italic periwinkle, as on the home page headlines. */
function heading(service: Service): RichText {
  const at = service.title.lastIndexOf(service.accent);
  if (at < 0) return [service.title];
  const before = service.title.slice(0, at);
  const after = service.title.slice(at + service.accent.length);
  return [before, { accent: service.accent }, ...(after ? [after] : [])].filter(Boolean);
}

type SectionTitleProps = { id: string; index: string; label: string; title: string; intro?: string };

function SectionTitle({ id, index, label, title, intro }: SectionTitleProps) {
  return (
    <header className="grid gap-8 md:grid-cols-12 md:gap-6">
      <Reveal className="md:col-span-12">
        <Eyebrow index={index} label={label} />
      </Reveal>
      <Reveal className="md:col-span-7">
        <h2
          id={id}
          className="font-serif text-title font-light text-balance md:text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] md:leading-[1.08]"
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.15} className="self-end text-body text-muted md:col-span-5">
          <p className="max-w-md">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

/** Detail page of one service: examples, expertise, references, method and questions. */
export function ServiceDetail({ service }: { service: Service }) {
  const index = services.indexOf(service);
  const next = services[(index + 1) % services.length];
  const { page } = service;

  return (
    <PageTransition>
      <article>
        {/* Hero */}
        <header className="container-page pt-32 md:pt-40">
          <nav aria-label="Fil d'Ariane" className="text-sm text-faint">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="inline-block py-1 transition-colors hover:text-cream">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <SectionLink href="/#services" className="inline-block py-1 transition-colors hover:text-cream">
                  Services
                </SectionLink>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-muted">
                {service.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <p className="flex flex-wrap items-center gap-4 text-eyebrow uppercase text-faint">
                <span>
                  Service <span className="text-cream">{pad(index + 1)}</span> / {pad(services.length)}
                </span>
                {service.upcoming ? (
                  <span className="rounded-full border border-accent/50 px-3 py-1.5 text-accent">
                    Prochainement
                  </span>
                ) : null}
              </p>
              <TextReveal
                as="h1"
                immediate
                delay={0.05}
                stagger={0.04}
                text={heading(service)}
                className="mt-8 font-serif text-headline font-light text-balance"
              />
              <p className="mt-8 max-w-xl font-serif text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-snug font-light text-accent italic">
                {service.hook}
              </p>
              <p className="mt-6 max-w-xl text-lead text-muted">{page.intro}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ContactButton projectType={service.projectType} variant="light">
                  {service.upcoming ? "Être prévenu du lancement" : "Parlons de votre projet"}
                </ContactButton>
                <SectionLink
                  href="#exemples"
                  className="inline-block py-2 text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-accent"
                >
                  Voir les exemples
                </SectionLink>
              </div>
            </div>
            <Reveal delay={0.2} className="lg:col-span-6">
              <ServiceArt service={service} layout="page" />
            </Reveal>
          </div>

          <ul aria-label="Expertises" className="mt-14 flex flex-wrap gap-2 lg:mt-20">
            {service.deliverables.map((d) => (
              <li key={d} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
                {d}
              </li>
            ))}
          </ul>
        </header>

        {/* Examples */}
        <section id="exemples" aria-labelledby="exemples-title" className="section-space container-page">
          <SectionTitle id="exemples-title" index="01" label="Exemples" title={page.examplesTitle} intro={page.examplesIntro} />

          {service.art === "web" ? (
            <ul className="mt-16 grid gap-x-6 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-24 lg:gap-x-10">
              {projects.map((project, i) => (
                <li key={project.slug} className={i % 2 === 1 ? "md:mt-32" : undefined}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : null}

          {service.art === "audit" ? (
            <div className="mt-16 md:mt-24">
              <AuditReport />
            </div>
          ) : null}

          <ol
            className={`grid gap-4 md:grid-cols-2 ${
              service.art === "web" || service.art === "audit" ? "mt-24 md:mt-32" : "mt-16 md:mt-24"
            }`}
          >
            {page.examples.map((example, i) => (
              <li key={example.title}>
                <Reveal delay={(i % 2) * 0.1} className="h-full">
                  <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 transition-colors duration-700 hover:border-line-strong md:p-9">
                    <div className="flex items-center justify-between gap-6">
                      <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {example.tag}
                      </span>
                      <span className="text-sm text-faint tabular-nums">{pad(i + 1)}</span>
                    </div>
                    <h3 className="mt-10 font-serif text-[clamp(1.375rem,1.15rem+0.8vw,1.875rem)] leading-tight font-light text-balance">
                      {example.title}
                    </h3>
                    <p className="mt-4 text-body text-muted">{example.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Expertise */}
        <section aria-labelledby="expertises-title" className="section-space container-page border-t border-line">
          <SectionTitle id="expertises-title" index="02" label="Expertises" title={page.capabilitiesTitle} />
          <ol className="mt-16 grid gap-x-10 md:mt-24 md:grid-cols-2">
            {page.capabilities.map((item, i) => (
              <li key={item.title}>
                <RevealLine />
                <Reveal y={20}>
                  <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-9 md:py-11">
                    <span className="pt-1.5 text-sm text-faint tabular-nums">{pad(i + 1)}</span>
                    <div>
                      <h3 className="font-serif text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] leading-tight font-light">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-md text-body text-muted">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* References: standards, laws, tools */}
        <section aria-labelledby="cadre-title" className="section-space container-page border-t border-line">
          <SectionTitle id="cadre-title" index="03" label="Cadre et outils" title={page.frameworkTitle} intro={page.frameworkIntro} />
          <dl className="mt-16 border-t border-line md:mt-24">
            {page.framework.map((item) => (
              // The animated wrapper is itself the dt/dd group, as a <dl> requires.
              <Reveal
                key={item.name}
                y={16}
                className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-6"
              >
                <dt className="font-serif text-xl font-light md:col-span-4">{item.name}</dt>
                <dd className="max-w-2xl text-body text-muted md:col-span-8">{item.text}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* Method */}
        <section aria-labelledby="methode-title" className="section-space container-page border-t border-line">
          <SectionTitle id="methode-title" index="04" label="Méthode" title={service.upcoming ? "Comment se dérouleront les projets" : "Comment nous travaillons"} />
          <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {page.process.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08}>
                  <span className="block font-serif text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none font-light text-cream/40 tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-6 font-serif text-[1.5rem] leading-tight font-light">{step.title}</h3>
                  <p className="mt-3 text-body text-muted">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Questions */}
        <section aria-labelledby="questions-title" className="section-space container-page border-t border-line">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="05" label="Questions" />
              </Reveal>
              <h2 id="questions-title" className="mt-10 font-serif text-title font-light">
                Vos questions, <em className="text-accent">nos réponses.</em>
              </h2>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <Accordion items={page.faq} />
            </Reveal>
          </div>
        </section>

        {/* Closing */}
        <section aria-labelledby="closing-title" className="section-space container-page border-t border-line">
          <Reveal>
            <p id="closing-title" className="max-w-4xl font-serif text-headline font-light text-balance">
              {page.closing}
            </p>
          </Reveal>
          <div className="mt-14 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
            <ContactButton projectType={service.projectType} variant="light" className="self-start">
              {service.upcoming ? "Être prévenu du lancement" : "Parlons de votre projet"}
            </ContactButton>
            <nav aria-label="Autres services" className="flex flex-col gap-3 text-sm md:items-end">
              <Link
                href={serviceHref(next)}
                className="group inline-flex items-center gap-3 py-1 text-cream transition-opacity active:opacity-60"
              >
                <span className="text-faint">Service suivant</span>
                <span className="font-serif text-xl font-light">{next.title}</span>
                <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <SectionLink href="/#services" className="inline-block py-1 text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-accent">
                Tous nos services
              </SectionLink>
            </nav>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
