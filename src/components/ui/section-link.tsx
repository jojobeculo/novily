"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";

type SectionLinkProps = ComponentPropsWithoutRef<typeof Link> & { href: string };

/**
 * A Link that glides to its `#section` when the section is on the current
 * page, also when the URL already holds that hash. From another page (no such
 * section in the document), it navigates as a normal Link. The check looks at
 * the document, not the URL, so it holds under any base path or host.
 */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const { scrollTo } = useSmoothScroll();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const hash = href.split("#")[1];
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    scrollTo(target);
    window.history.replaceState(window.history.state, "", `#${hash}`);
    // Keyboard and screen reader users continue from the section, not from the link.
    // Deferred: a closing mobile menu makes the page focusable again first.
    window.setTimeout(() => {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }, 60);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
