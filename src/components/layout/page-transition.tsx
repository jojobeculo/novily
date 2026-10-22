import type { ReactNode } from "react";

/**
 * Wraps a page below the home page so it settles in (a short fade and rise, in
 * CSS) when it opens. The View Transitions API was tried first: it holds the
 * URL change for the length of the animation (about 0.7 s), which makes every
 * link feel slow. A CSS entrance starts at once and delays nothing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-[page-in_0.6s_var(--ease-out-expo)_both] motion-reduce:animate-none">{children}</div>;
}
