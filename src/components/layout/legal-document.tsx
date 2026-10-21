import type { ReactNode } from "react";

export type LegalSection = { title: string; body: ReactNode };

type LegalDocumentProps = {
  title: string;
  /** Last word of the title, set in the italic accent. */
  accent: string;
  updated: string;
  intro?: ReactNode;
  sections: readonly LegalSection[];
};

/** Shared layout of the legal pages: title, update date, then one row per section. */
export function LegalDocument({ title, accent, updated, intro, sections }: LegalDocumentProps) {
  return (
    <article className="container-page pt-40 pb-32 md:pt-52">
      <h1 className="max-w-3xl font-serif text-headline font-light text-balance">
        {title} <em className="text-accent">{accent}</em>
      </h1>
      <p className="mt-6 text-sm text-faint">Dernière mise à jour : {updated}</p>
      {intro ? <div className="mt-10 max-w-2xl text-lead text-muted">{intro}</div> : null}
      <div className="mt-20 max-w-3xl border-t border-line">
        {sections.map((s) => (
          <section
            key={s.title}
            className="grid gap-4 border-b border-line py-10 md:grid-cols-3 md:gap-8"
          >
            <h2 className="font-serif text-xl font-light">{s.title}</h2>
            <div className="flex flex-col gap-4 text-body text-muted md:col-span-2 [&_a]:text-cream [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 [&_a:hover]:decoration-accent [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
