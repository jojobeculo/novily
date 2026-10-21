import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesShowcase } from "./services-showcase";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-space">
      <div className="container-page">
        <SectionHeader
          id="services-title"
          index="01"
          label="Services"
          title={["Ce que nous ", { accent: "créons" }, " pour vous."]}
          intro="Quatre expertises, une même exigence : des sites qui servent votre image autant que vos résultats."
        />
      </div>

      <ServicesShowcase />

      <div className="container-page">
        <Reveal className="mt-16 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="max-w-md text-body text-muted">
            Chaque projet est conçu sur mesure, de la stratégie à la mise en ligne.
          </p>
          <Button href="/#realisations" variant="outline" arrow className="self-start sm:self-auto">
            Voir nos réalisations
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
