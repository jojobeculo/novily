"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { easeOutExpo } from "@/lib/motion";

// Only for a real mouse, and never for visitors who ask for reduced motion.
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const INTERACTIVE = "a, button, [role='button'], label, summary, select";
// Text fields keep the native caret: a custom pointer would hide where the text goes.
const TEXT_FIELD = "input, textarea, [contenteditable='true']";

type State = "hidden" | "default" | "interactive" | "text";

/** Translucent gradient ring that trails the pointer, with a precise dot at its center. */
export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  return enabled ? <Cursor /> : null;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });
  const [state, setState] = useState<State>("hidden");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      // React skips the render when the state does not change.
      setState(
        target?.closest(TEXT_FIELD) ? "text" : target?.closest(INTERACTIVE) ? "interactive" : "default",
      );
    };
    const onLeave = () => setState("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const visible = state === "default" || state === "interactive";
  const ringScale = (state === "interactive" ? 1.75 : 1) * (pressed ? 0.8 : 1);
  const transition = { duration: 0.45, ease: easeOutExpo };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <m.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
        <m.div
          data-active={state === "interactive"}
          className="custom-cursor-ring size-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          animate={{ scale: visible ? ringScale : 0.4, opacity: visible ? 1 : 0 }}
          transition={transition}
        />
      </m.div>
      <m.div style={{ x, y }} className="absolute top-0 left-0">
        <m.div
          className="custom-cursor-dot size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          animate={{
            scale: state === "default" ? (pressed ? 0.6 : 1) : 0,
            opacity: state === "default" ? 1 : 0,
          }}
          transition={transition}
        />
      </m.div>
    </div>
  );
}
