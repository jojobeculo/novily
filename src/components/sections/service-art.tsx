import Image from "next/image";
import { AiArt } from "@/components/ui/art/ai-art";
import { AuditArt } from "@/components/ui/art/audit-art";
import { MotionArt } from "@/components/ui/art/motion-art";
import { projects } from "@/lib/content";
import type { Service } from "@/lib/services";

/** "stage": fills the 3D panel's grid row, however short. "list" and "page": 4:3 box. */
type Layout = "stage" | "list" | "page";

const box = (layout: Layout) => (layout === "stage" ? "h-full min-h-0" : "aspect-[4/3]");

/** Hairline wireframe of a business application: dashboard, menu and chart. */
function SoftwareArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 260" className={className} fill="none">
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
  );
}

const drawn = { audit: AuditArt, ai: AiArt, motion: MotionArt, software: SoftwareArt } as const;

/** Three portfolio sites, overlapping like prints on a table. */
function WebArt({ layout }: { layout: Layout }) {
  const [main, second, third] = ["atelier-linea", "seve", "orbe-festival"].map(
    (slug) => projects.find((p) => p.slug === slug)!,
  );
  const shot = "absolute overflow-hidden rounded-md border bg-surface";
  return (
    <figure className={`relative overflow-hidden rounded-[10px] bg-ink ${box(layout)}`}>
      <div className={`${shot} top-1/2 left-[5%] aspect-[4/3] w-[62%] -translate-y-1/2 border-line`}>
        <Image src={main.image} alt="" fill sizes="(min-width: 1024px) 34vw, 62vw" className="object-cover" />
      </div>
      <div className={`${shot} top-[12%] right-[5%] aspect-[4/3] w-[40%] border-line-strong`}>
        <Image src={second.image} alt="" fill sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
      </div>
      <div className={`${shot} right-[13%] bottom-[11%] aspect-[4/3] w-[36%] border-line-strong`}>
        <Image src={third.image} alt="" fill sizes="(min-width: 1024px) 20vw, 36vw" className="object-cover" />
      </div>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3.5 py-1.5 text-xs text-cream/85">
        Réalisations — {main.name}, {second.name}, {third.name}
      </figcaption>
    </figure>
  );
}

/** The illustration of a service, shared by the home page panels and the service pages. */
export function ServiceArt({ service, layout }: { service: Service; layout: Layout }) {
  if (service.art === "web") return <WebArt layout={layout} />;
  const Art = drawn[service.art];
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-[10px] border border-line bg-ink ${box(layout)}`}
    >
      <Art className="max-h-[86%] w-[82%] max-w-xl" />
    </div>
  );
}
