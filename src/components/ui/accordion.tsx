"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useState } from "react";
import { easeOutExpo } from "@/lib/motion";

type AccordionItem = { question: string; answer: string };

/** Single-open accordion with hairline separators. */
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-center justify-between gap-8 py-7 text-left transition-opacity active:opacity-70 md:py-8"
              >
                <span
                  className={`font-serif text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] leading-snug font-light transition-colors duration-500 ${
                    expanded ? "text-cream" : "text-cream/80 group-hover:text-cream"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`relative flex size-10 shrink-0 items-center justify-center rounded-full border transition-[border-color,transform,background-color] duration-700 ease-out-expo ${
                    expanded ? "rotate-45 border-accent" : "border-line-strong group-hover:border-cream"
                  }`}
                >
                  <span className={`absolute h-px w-3.5 ${expanded ? "bg-accent" : "bg-cream"}`} />
                  <span className={`absolute h-3.5 w-px ${expanded ? "bg-accent" : "bg-cream"}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pr-14 pb-9 text-body text-muted">
                    {item.answer}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
