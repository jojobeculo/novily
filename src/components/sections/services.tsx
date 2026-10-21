import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { services, type Service } from "@/lib/content";

function ServiceCardBody({ service, index }: { service: Service; index: number }) {
  return (
    <>
      {/* Soft fill that rises from the bottom edge on hover. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-cream/[0.035] transition-transform duration-1000 ease-out-expo group-hover:scale-y-100"
      />

      <div className="relative flex items-start justify-between gap-6">
        <span className="font-sans text-sm text-faint tabular-nums">0{index + 1}</span>
        {service.upcoming ? (
          <span className="rounded-full border border-accent/50 px-3 py-1.5 text-eyebrow uppercase text-accent">
            Prochainement
          </span>
        ) : (
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color,transform] duration-700 ease-out-expo group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M1 8h13M9 3l5 5-5 5" />
            </svg>
          </span>
        )}
      </div>

      <div className="relative mt-auto pt-24 md:pt-32">
        <h3 className="font-serif text-title font-light transition-transform duration-1000 ease-out-expo group-hover:translate-x-2">
          {service.title}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{service.description}</p>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Expertises">
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const cardClass =
  "group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-card border p-7 transition-[border-color,transform] duration-1000 ease-out-expo md:min-h-[32rem] md:p-10 lg:p-12";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-space scroll-mt-10">
      <div className="container-page">
        <SectionHeader
          id="services-title"
          index="01"
          label="Services"
          title={["Ce que nous ", { accent: "créons" }, " pour vous."]}
          intro="Quatre expertises, une même exigence : des sites qui servent votre image autant que vos résultats."
        />

        <ul className="mt-20 grid gap-4 md:mt-28 md:grid-cols-2 md:gap-5">
          {services.map((service, i) => (
            <li key={service.id}>
              <Reveal delay={(i % 2) * 0.12} className="h-full">
                {service.upcoming ? (
                  <article className={`${cardClass} border-line text-cream/80`}>
                    <ServiceCardBody service={service} index={i} />
                  </article>
                ) : (
                  <Link
                    href="/#contact"
                    className={`${cardClass} border-line hover:-translate-y-1 hover:border-line-strong`}
                  >
                    <ServiceCardBody service={service} index={i} />
                  </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
