"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { MOTION_KEY, type MotionChoice } from "@/lib/motion-preference";

type MotionPreference = {
  /** True when animations are reduced, by the system setting or the visitor's choice. */
  reduced: boolean;
  /** Flips the visitor's choice and remembers it. */
  toggle: () => void;
};

const MotionPreferenceContext = createContext<MotionPreference>({ reduced: false, toggle: () => {} });

const listeners = new Set<() => void>();
// Fallback when storage is blocked: the choice holds until the page reloads.
let memory: MotionChoice | null = null;

function readChoice(): MotionChoice | null {
  try {
    const value = localStorage.getItem(MOTION_KEY);
    return value === "reduce" || value === "full" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function saveChoice(choice: MotionChoice) {
  try {
    localStorage.setItem(MOTION_KEY, choice);
  } catch {
    // Storage blocked: `memory` keeps the choice.
  }
  memory = choice;
  listeners.forEach((l) => l());
}

const getChoice = () => readChoice() ?? memory;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeSystem(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSystem = () => window.matchMedia(REDUCE_QUERY).matches;

/**
 * Loads only the animation features the site uses (`m` components, no layout
 * animations) and decides whether the site animates: the system "reduce
 * motion" setting by default, the footer switch once the visitor uses it.
 * `html[data-motion]` carries the result for CSS.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  // Both read the static HTML's value while hydrating (no choice, full motion),
  // then the browser's, so the markup never mismatches.
  const system = useSyncExternalStore(subscribeSystem, getSystem, () => false);
  const choice = useSyncExternalStore(subscribe, getChoice, () => null);
  const reduced = choice ? choice === "reduce" : system;

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
  }, [reduced]);

  const value: MotionPreference = {
    reduced,
    toggle: () => saveChoice(reduced ? "full" : "reduce"),
  };

  return (
    <MotionPreferenceContext.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>
      </LazyMotion>
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}
