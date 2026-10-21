import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SectionLink } from "./section-link";

type Variant = "primary" | "light" | "outline";
type Size = "sm" | "md";

// active: a short press (scale down fast, release slowly) gives each click a visual answer.
const base =
  "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans font-medium whitespace-nowrap transition-[background-color,border-color,color,scale] duration-500 ease-out-expo active:scale-[0.96] active:duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-cream",
  light: "bg-cream text-ink hover:bg-accent",
  outline: "border border-ash text-cream hover:border-cream hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-14 px-7 text-[0.9375rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof SectionLink>, "className" | "children">;
type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };

/** Text that rolls up to a copy of itself on hover. */
function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-700 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-3.5 transition-transform duration-700 ease-out-expo group-hover:translate-x-0.5 group-hover:-rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", size = "md", arrow = false, className, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
  const content = (
    <>
      {variant === "outline" ? (
        // Cream fill that rises from the bottom edge on hover.
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-[101%] rounded-full bg-cream transition-transform duration-700 ease-out-expo group-hover:translate-y-0"
        />
      ) : null}
      <RollingLabel>{children}</RollingLabel>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <SectionLink className={classes} {...(rest as Omit<LinkButtonProps, keyof CommonProps>)}>
        {content}
      </SectionLink>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<NativeButtonProps, keyof CommonProps>)}>
      {content}
    </button>
  );
}
