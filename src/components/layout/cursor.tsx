"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./motion-provider";

const CLICKABLE = 'a[href], button:not(:disabled), [role="button"], [role="switch"], label, summary, select';
const TEXT_FIELD = 'input:not([type="checkbox"], [type="radio"], [type="submit"], [type="button"]), textarea, [contenteditable="true"]';
/** Largest lean, in degrees, when the mouse moves fast sideways. */
const MAX_LEAN = 14;

/**
 * The site's pointer: the slim arrow of the CSS cursor, drawn in the page so it
 * can respond. It leans with the movement, turns ink with an accent outline
 * over anything clickable (readable on cream and accent buttons as on black),
 * presses in with a ripple on click and fades out when the mouse leaves the
 * window. Text fields keep the system text cursor.
 *
 * Mouse only: touch screens never see it. Until the first mouse move (or
 * without JavaScript), the CSS arrow from globals.css stands in.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    let lean = 0;
    let target = 0;
    let lastX = 0;
    let frame = 0;

    // Eases the lean toward its target, then back to upright once the mouse rests.
    const tick = () => {
      lean += (target - lean) * 0.18;
      target *= 0.82;
      el.style.setProperty("--lean", `${lean.toFixed(2)}deg`);
      frame = Math.abs(lean) > 0.05 || Math.abs(target) > 0.05 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!el.dataset.visible) {
        el.dataset.visible = "";
        root.classList.add("has-cursor");
      }
      if (!reduced) {
        target = Math.max(-MAX_LEAN, Math.min(MAX_LEAN, target + (e.clientX - lastX) * 0.35));
        if (!frame) frame = requestAnimationFrame(tick);
      }
      lastX = e.clientX;
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element;
      el.dataset.state = t.closest(TEXT_FIELD) ? "text" : t.closest(CLICKABLE) ? "link" : "";
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.dataset.pressed = "";
      if (reduced) return;
      const ripple = document.createElement("span");
      ripple.className = "cursor-ripple";
      ripple.addEventListener("animationend", () => ripple.remove());
      el.appendChild(ripple);
    };
    const onUp = () => delete el.dataset.pressed;

    // The mouse left the window: hide until it moves in again (onMove shows it).
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) delete el.dataset.visible;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--lean", "0deg");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [reduced]);

  // Unmounting (never in practice) gives the system cursor back.
  useEffect(() => () => document.documentElement.classList.remove("has-cursor"), []);

  return (
    <div ref={ref} aria-hidden className="cursor">
      <svg viewBox="0 0 24 24" className="cursor-arrow">
        <defs>
          <linearGradient id="cursor-fill" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0.3" stopColor="#F4EFD4" />
            <stop offset="1" stopColor="#84ACFB" />
          </linearGradient>
        </defs>
        <path
          d="M4 3 L4 18.6 L8.1 14.9 L10.9 20.9 L13.1 19.9 L10.4 14 L15.9 13.8 Z"
          fill="url(#cursor-fill)"
          fillOpacity="0.94"
        />
        {/* Ink fill over clickable elements, faded in by CSS. */}
        <path
          className="cursor-ink"
          d="M4 3 L4 18.6 L8.1 14.9 L10.9 20.9 L13.1 19.9 L10.4 14 L15.9 13.8 Z"
          fill="#000"
        />
        {/* Outline: dark at rest, accent over clickable elements (colors in globals.css). */}
        <path
          className="cursor-outline"
          d="M4 3 L4 18.6 L8.1 14.9 L10.9 20.9 L13.1 19.9 L10.4 14 L15.9 13.8 Z"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
