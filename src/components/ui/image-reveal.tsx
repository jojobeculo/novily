"use client";

import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { easeInOutQuart, inViewOnce } from "@/lib/motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * An image uncovered by a rising curtain, with a light scroll parallax.
 * The image itself zooms in slightly when its parent `group` is hovered.
 */
export function ImageReveal({ src, alt, sizes, className, priority = false }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden bg-surface ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={inViewOnce}
      transition={{ duration: 1.4, ease: easeInOutQuart }}
    >
      <m.div style={{ y }} className="absolute -inset-y-[7%] inset-x-0">
        <m.div
          className="relative size-full"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 1.8, ease: easeInOutQuart }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.045]"
          />
        </m.div>
      </m.div>
    </m.div>
  );
}
