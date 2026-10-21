import { Reveal, RevealLine } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { TextReveal } from "@/components/ui/text-reveal";
import { commitments, strengths } from "@/lib/content";

export function WhyUs() {
  return (
    <section id="a-propos" aria-labelledby="why-title" className="section-space scroll-mt-10">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="02" label="Pourquoi nous" />
            </Reveal>
            <TextReveal
              as="h2"
              id="why-title"
              text={["L'exigence d'un studio, ", { accent: "l'engagement" }, " d'un partenaire."]}
              className="mt-10 max-w-[14ch] font-serif text-headline font-light"
            />
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-md text-lead text-muted">
                Novily est un studio digital indépendant fondé sur une conviction simple : un site
                web doit être aussi beau qu&apos;efficace. Nous travaillons avec peu de clients à la
                fois, pour donner à chacun toute notre attention.
              </p>
            </Reveal>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {commitments.map((c, i) => (
                <Reveal key={c.label} delay={0.1 * i}>
                  <dt className="sr-only">{c.label}</dt>
                  <dd>
                    <span className="block font-serif text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-none font-light">
                      {c.value}
                    </span>
                    <span className="mt-3 block text-xs leading-snug text-faint">{c.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {strengths.map((item, i) => (
            <li key={item.title}>
              <RevealLine />
              <Reveal y={20}>
                <div className="group grid grid-cols-[3rem_1fr] gap-x-4 py-9 md:grid-cols-[4rem_1fr] md:py-11">
                  <span className="pt-2 text-sm text-faint tabular-nums transition-colors duration-500 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="transition-transform duration-1000 ease-out-expo group-hover:translate-x-2">
                    <h3 className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-tight font-light">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
          <li aria-hidden>
            <RevealLine />
          </li>
        </ol>
      </div>
    </section>
  );
}
