"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useSmoothScroll } from "@/components/layout/smooth-scroll";

type SectionLinkProps = ComponentPropsWithoutRef<typeof Link> & { href: string };

const trimSlash = (path: string) => path.replace(/\/+$/, "") || "/";

/**
 * A Link that glides to its `#section` when the section is on the current
 * page, also when the URL already holds that hash. From another page, it
 * navigates as a normal Link.
 */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const [path, hash] = href.split("#");
    if (!hash || trimSlash(path || "/") !== trimSlash(pathname)) return;
    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    scrollTo(target);
    window.history.replaceState(window.history.state, "", `#${hash}`);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
