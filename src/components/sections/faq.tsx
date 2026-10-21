import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { TextReveal } from "@/components/ui/text-reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-space scroll-mt-10">
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
            <p className="mt-8 max-w-xs text-base leading-relaxed text-muted">
              Une autre question ?{" "}
              <Link
                href="/#contact"
                className="text-cream underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                Écrivez-nous
              </Link>
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
