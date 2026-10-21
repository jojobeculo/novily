import type { ImageLoaderProps } from "next/image";
import { siteConfig } from "./site";

/**
 * Static export has no image optimizer. Each image in public/ is pre-resized
 * to these widths as `<name>-<width>.webp`, and this loader picks the
 * smallest variant that covers the requested width.
 */
const widths = [640, 1080, 1600];

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const variant = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `${siteConfig.basePath}${src.replace(/\.webp$/, `-${variant}.webp`)}`;
}
