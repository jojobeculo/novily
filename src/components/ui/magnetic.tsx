"use client";

import { m, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

const spring = { stiffness: 180, damping: 18, mass: 0.4 };
/** Share of the pointer offset the element follows. */
const strength = 0.22;

/** Lets its child lean slightly toward the pointer. Inactive on touch screens. */
export function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
