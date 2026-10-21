import type { ReactNode } from "react";
import type { RichText } from "@/lib/content";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: RichText;
  intro?: ReactNode;
  /** Id of the heading, used by the section's aria-labelledby. */
  id: string;
  className?: string;
};

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 text-eyebrow uppercase text-faint">
      <span className="text-cream">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{label}</span>
    </p>
  );
}

export function SectionHeader({ index, label, title, intro, id, className }: SectionHeaderProps) {
  return (
    <header className={`grid gap-10 md:grid-cols-12 md:gap-6 ${className ?? ""}`}>
      <Reveal className="md:col-span-12">
        <Eyebrow index={index} label={label} />
      </Reveal>
      <div className="md:col-span-8">
        <TextReveal
          as="h2"
          id={id}
          text={title}
          className="font-serif text-headline font-light text-balance"
        />
      </div>
      {intro ? (
        <Reveal delay={0.15} className="self-end text-lead text-muted md:col-span-4">
          {intro}
        </Reveal>
      ) : null}
    </header>
  );
}
