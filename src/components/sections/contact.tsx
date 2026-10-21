import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { TextReveal } from "@/components/ui/text-reveal";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-space scroll-mt-10 border-t border-line"
    >
      <div className="container-page">
        <Reveal>
          <Eyebrow index="07" label="Contact" />
        </Reveal>
        <TextReveal
          as="h2"
          id="contact-title"
          text={["Parlons de votre prochain ", { accent: "projet." }]}
          stagger={0.08}
          className="mt-10 max-w-[12ch] font-serif text-display font-light md:mt-14"
        />

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-6">
          <Reveal className="flex flex-col gap-10 lg:col-span-4">
            <p className="max-w-sm text-lead text-muted">
              Un projet, une idée, une question ? Racontez-nous. Nous revenons vers vous sous 24
              heures ouvrées avec un premier regard sur votre projet.
            </p>
            <div>
              <p className="text-xs tracking-[0.14em] text-faint uppercase">Écrivez-nous</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group relative mt-3 inline-block font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-light"
              >
                {siteConfig.email}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-line-strong transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:bg-accent"
                />
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.14em] text-faint uppercase">Studio</p>
              <p className="mt-3 text-base text-muted">
                {siteConfig.city}, France
                <br />
                Du lundi au vendredi, 9 h – 19 h
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
