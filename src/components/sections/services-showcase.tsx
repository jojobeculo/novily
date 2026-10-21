"use client";

import {
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";
import { useMotionPreference } from "@/components/layout/motion-provider";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PROJECT_TYPE_EVENT } from "@/lib/contact";
import { projects, services, type Service } from "@/lib/content";

const COUNT = services.length;
const STEPS = COUNT - 1;
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Mode: immersive stage, or the plain list (mobile, reduced motion,    */
/* short screens, no CSS 3D).                                           */
/* ------------------------------------------------------------------ */

// Screen size and 3D support only: reduced motion comes from useMotionPreference.
const IMMERSIVE_QUERY = "(min-width: 768px) and (min-height: 600px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(IMMERSIVE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getImmersive = () =>
  window.matchMedia(IMMERSIVE_QUERY).matches && CSS.supports("transform-style", "preserve-3d");

// The static HTML holds the list. The stage replaces it after hydration, below the fold.
const getServerImmersive = () => false;

/* ------------------------------------------------------------------ */
/* Scroll → position along the services.                                */
/* ------------------------------------------------------------------ */

/** Share of each step held still at both ends, so every service rests long enough to read. */
const HOLD = 0.14;

/** Maps the raw position (0 → STEPS) to one that pauses on each service and eases between them. */
function settle(raw: number) {
  const index = Math.min(Math.floor(raw), STEPS);
  const x = Math.min(1, Math.max(0, (raw - index - HOLD) / (1 - 2 * HOLD)));
  return index + x * x * (3 - 2 * x);
}

type Depth = { rotate: number; depth: number; shrink: number; lift: number };

// Desktop gets the full depth; tablets a softer version.
const DEPTH_DESKTOP: Depth = { rotate: 14, depth: 240, shrink: 0.08, lift: 7 };
const DEPTH_TABLET: Depth = { rotate: 8, depth: 150, shrink: 0.06, lift: 5 };

/* ------------------------------------------------------------------ */
/* Panel content, shared by both modes.                                 */
/* ------------------------------------------------------------------ */

/** Placeholder art for a service with no project yet: a hairline web-app wireframe. */
function UpcomingArt() {
  return (
    <div className="flex h-full min-h-56 items-center justify-center rounded-[10px] border border-line bg-ink">
      <svg aria-hidden viewBox="0 0 400 260" className="w-[72%] max-w-md" fill="none">
        <g stroke="var(--color-cream)" strokeOpacity="0.22" vectorEffect="non-scaling-stroke">
          <rect x="0.5" y="0.5" width="399" height="259" rx="10" />
          <path d="M0.5 30.5h399M90.5 30.5v229" />
          <rect x="20" y="50" width="50" height="6" rx="3" />
          <rect x="20" y="68" width="40" height="6" rx="3" />
          <rect x="20" y="86" width="46" height="6" rx="3" />
          <rect x="110" y="50" width="130" height="80" rx="6" />
          <rect x="252" y="50" width="130" height="80" rx="6" />
          <rect x="110" y="144" width="272" height="96" rx="6" />
          <path d="M126 220l40-34 32 20 44-46 46 28 52-30 26 18" strokeOpacity="0.4" />
        </g>
        <circle cx="13" cy="15" r="3" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}

function ServiceArt({ service, layout }: { service: Service; layout: "stage" | "list" }) {
  const project = projects.find((p) => p.slug === service.showcase);
  if (!project) return <UpcomingArt />;
  return (
    <figure
      className={`relative overflow-hidden rounded-[10px] bg-ink ${
        layout === "stage" ? "h-full min-h-0" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3.5 py-1.5 text-xs text-cream/85">
        Réalisation — {project.name}
      </figcaption>
    </figure>
  );
}

function ServiceContent({
  service,
  index,
  layout,
}: {
  service: Service;
  index: number;
  layout: "stage" | "list";
}) {
  const stage = layout === "stage";
  return (
    <div
      className={
        stage
          ? "grid h-full grid-rows-[minmax(0,1fr)_auto] gap-8 p-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:p-7"
          : "flex flex-col gap-8 p-4 sm:p-6 md:grid md:grid-cols-12 md:items-center md:gap-10"
      }
    >
      <div className={stage ? "min-h-0 lg:order-2 lg:col-span-7" : "md:order-2 md:col-span-7"}>
        <ServiceArt service={service} layout={layout} />
      </div>

      <div
        className={`flex flex-col ${
          stage ? "lg:col-span-5 lg:py-5 lg:pl-3" : "px-1 pb-2 sm:px-2 md:col-span-5 md:py-4"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm text-faint tabular-nums">
            <span className="text-cream/80">{pad(index + 1)}</span> / {pad(COUNT)}
          </span>
          {service.upcoming ? (
            <span className="rounded-full border border-accent/50 px-3 py-1.5 text-eyebrow uppercase text-accent">
              Prochainement
            </span>
          ) : null}
        </div>

        <h3
          id={`service-${service.id}`}
          className={`font-serif font-light ${
            stage
              ? "mt-[3vh] text-[min(clamp(2.25rem,1.4rem+2.4vw,4.25rem),7.5vh)] leading-[1.02] tracking-[-0.02em] lg:mt-auto"
              : "mt-6 text-title"
          }`}
        >
          {service.title}
        </h3>
        <p className={`max-w-md text-body text-muted ${stage ? "mt-[2.2vh]" : "mt-5"}`}>
          {service.description}
        </p>
        <ul
          className={`flex flex-wrap gap-2 ${
            stage ? "mt-[3vh] [@media(max-height:760px)]:hidden" : "mt-7"
          }`}
          aria-label="Expertises"
        >
          {service.deliverables.map((d) => (
            <li key={d} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
              {d}
            </li>
          ))}
        </ul>
        {service.upcoming ? null : (
          <Button
            href="/#contact"
            variant="outline"
            arrow
            className={`self-start ${stage ? "mt-[4vh]" : "mt-9"}`}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent(PROJECT_TYPE_EVENT, { detail: service.projectType }),
              )
            }
          >
            Parlons de votre projet
          </Button>
        )}
      </div>
    </div>
  );
}

const panelClass = "overflow-hidden rounded-card border border-line bg-surface";

/* ------------------------------------------------------------------ */
/* Immersive stage.                                                      */
/* ------------------------------------------------------------------ */

function StagePanel({
  service,
  index,
  position,
  depth,
  onFocusPanel,
}: {
  service: Service;
  index: number;
  position: MotionValue<number>;
  depth: RefObject<Depth>;
  onFocusPanel: (index: number) => void;
}) {
  // d < 0: still to come (rises from below). d = 0: in front. d > 0: receding.
  const d = useTransform(position, (v) => v - index);
  const y = useTransform(d, (v) =>
    v < 0 ? `${Math.min(-v, 1) * 115}%` : `${-Math.min(v, 2) * depth.current.lift}%`,
  );
  const rotateX = useTransform(d, (v) => Math.min(Math.max(v, 0), 1) * depth.current.rotate);
  const z = useTransform(d, (v) => -Math.min(Math.max(v, 0), 2) * depth.current.depth);
  const scale = useTransform(d, (v) => 1 - Math.min(Math.max(v, 0), 2) * depth.current.shrink);
  // Two services back, the panel fades out so the stack never piles up.
  const opacity = useTransform(d, (v) => (v <= 1 ? 1 : Math.max(0, 2 - v)));
  // A dark veil, cheaper than a filter, dims the panel as it recedes.
  const veil = useTransform(d, (v) => Math.min(Math.max(v, 0), 1) * 0.62);

  return (
    <m.article
      aria-labelledby={`service-${service.id}`}
      style={{ y, rotateX, z, scale, opacity }}
      // Keyboard users tabbing into a hidden panel bring it to the front.
      onFocus={() => onFocusPanel(index)}
      className={`services-panel ${panelClass} absolute inset-0`}
    >
      <ServiceContent service={service} index={index} layout="stage" />
      <m.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-ink" />
    </m.article>
  );
}

function ProgressSegment({ position, index }: { position: MotionValue<number>; index: number }) {
  // Segment i fills while the stage travels from service i - 1 to service i.
  const fill = useTransform(position, (v) => Math.min(Math.max(v - index + 1, 0), 1));
  return (
    <span aria-hidden className="relative block h-px w-full bg-line">
      <m.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-cream/70" />
    </span>
  );
}

function StageProgress({
  position,
  onSelect,
}: {
  position: MotionValue<number>;
  onSelect: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(position, "change", (v) => setActive(Math.round(v)));
  const hint = useTransform(position, [0, 0.35], [1, 0]);

  return (
    // Opaque band: an incoming panel rises from behind it instead of over the labels.
    <div className="relative z-10 bg-ink">
      <div className="container-page flex items-end gap-8 pt-6 pb-8">
        <p className="shrink-0 text-sm text-faint tabular-nums">
          <span className="text-cream">{pad(active + 1)}</span> / {pad(COUNT)}
        </p>
        <ol className="flex flex-1 gap-3" aria-label="Services">
          {services.map((service, i) => (
            <li key={service.id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active === i ? "step" : undefined}
                aria-label={`Afficher : ${service.title}`}
                className="group block w-full pb-1 text-left transition-opacity active:opacity-60"
              >
                <ProgressSegment position={position} index={i} />
                <span
                  className={`mt-3 hidden truncate text-xs transition-colors duration-500 lg:block ${
                    active === i ? "text-cream" : "text-faint group-hover:text-muted"
                  }`}
                >
                  {service.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <m.p
          aria-hidden
          style={{ opacity: hint }}
          className="hidden shrink-0 items-center gap-3 text-eyebrow uppercase text-faint lg:flex"
        >
          Défiler
          <span className="relative block h-5 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-[scroll-cue_2.4s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-cream/60" />
          </span>
        </m.p>
      </div>
    </div>
  );
}

function ServicesStage() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<Depth>(DEPTH_DESKTOP);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, (p) => settle(p * STEPS));

  useEffect(() => {
    const update = () => {
      depthRef.current = window.innerWidth >= 1024 ? DEPTH_DESKTOP : DEPTH_TABLET;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /** Scrolls to the point where service `index` rests in front. */
  function showService(index: number) {
    const runway = runwayRef.current;
    if (!runway) return;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    const travel = runway.offsetHeight - window.innerHeight;
    scrollTo(top + (index / STEPS) * travel);
  }

  return (
    <div
      ref={runwayRef}
      className="services-runway mt-16 md:mt-24"
      style={{ "--steps": STEPS } as CSSProperties}
    >
      <div className="services-stage flex flex-col">
        <div className="container-page min-h-0 flex-1 pt-24">
          <div className="services-track relative h-full">
            {services.map((service, i) => (
              <StagePanel
                key={service.id}
                service={service}
                index={i}
                position={position}
                depth={depthRef}
                onFocusPanel={showService}
              />
            ))}
          </div>
        </div>
        <StageProgress position={position} onSelect={showService} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The services, presented as panels that pass one after another in a 3D
 * space as the page scrolls. Falls back to a vertical list where the effect
 * does not fit.
 */
export function ServicesShowcase() {
  const fits = useSyncExternalStore(subscribe, getImmersive, getServerImmersive);
  const { reduced } = useMotionPreference();
  const immersive = fits && !reduced;

  // The stage is taller than the list it replaces: keep a deep link (#faq…) on its target.
  useEffect(() => {
    if (!immersive || !window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [immersive]);

  if (immersive) return <ServicesStage />;

  return (
    <ul className="container-page mt-16 flex flex-col gap-5 md:mt-24">
      {services.map((service, i) => (
        <li key={service.id}>
          <Reveal>
            <article aria-labelledby={`service-${service.id}`} className={panelClass}>
              <ServiceContent service={service} index={i} layout="list" />
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
