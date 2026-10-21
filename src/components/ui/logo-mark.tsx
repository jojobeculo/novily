/**
 * The Novéo mark: the hero orbit motif, reduced to three rings, the tilted
 * orbit and its satellite where the orbit meets the outer ring.
 * Same geometry as public/logo-noveo*.svg — change them together.
 * Lines take the current text color. Inside a `group`, the orbit tilts on hover.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 64" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="32" r="29" />
        <circle cx="32" cy="32" r="18.5" strokeOpacity=".6" />
        <circle cx="32" cy="32" r="7.5" strokeOpacity=".38" />
      </g>
      {/* The satellite rides with the orbit, so it stays on the outer ring as the orbit turns. */}
      <g className="origin-center transition-transform duration-1000 ease-out-expo group-hover:rotate-[16deg] motion-reduce:transition-none">
        <ellipse
          cx="32"
          cy="32"
          rx="29"
          ry="9.94"
          transform="rotate(-24 32 32)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="58.49" cy="20.2" r="2.5" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
