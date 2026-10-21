import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so that moving to another page cross-fades the content (the
 * old page lifts away, the new one settles in) while the header stays still.
 * Styles: `page-enter` and `page-exit` in globals.css. Browsers without the
 * View Transitions API simply swap the pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
