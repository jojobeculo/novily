import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { TextReveal } from "@/components/ui/text-reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-space">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow index="06" label="FAQ" />
          </Reveal>
          <TextReveal
            as="h2"
            id="faq-title"
            text={["Questions ", { accent: "fréquentes." }]}
            className="mt-10 font-serif text-headline font-light"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xs text-body text-muted">
              Une autre question ?{" "}
              <SectionLink
                href="/#contact"
                className="text-cream underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                Écrivez-nous
              </SectionLink>
              , nous répondons sous 24 heures ouvrées.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
