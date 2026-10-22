/** Motion design and marketing: an easing curve run by a dot, a timeline whose playhead follows it, and a video post above a rising campaign chart. */
export function MotionArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 300" fill="none" className={className}>
      <style>{`
        .art-motion-playhead {
          animation: art-motion-play 4.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transform-box: view-box;
        }
        .art-motion-still { display: none; }
        @keyframes art-motion-play {
          0% { transform: translateX(0); }
          70%, 100% { transform: translateX(176px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-motion-playhead { animation: none; transform: translateX(176px); }
          .art-motion-moving { display: none; }
          .art-motion-still { display: inline; }
        }
        html[data-motion="reduce"] .art-motion-playhead { animation: none; transform: translateX(176px); }
        html[data-motion="reduce"] .art-motion-moving { display: none; }
        html[data-motion="reduce"] .art-motion-still { display: inline; }
      `}</style>
      <g stroke="var(--color-cream)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {/* Graph editor: frame and grid */}
        <rect x="24.5" y="34.5" width="212" height="152" rx="8" strokeOpacity="0.22" />
        <path d="M44.5 58.5h172M44.5 98.5h172M44.5 138.5h172" strokeOpacity="0.08" />
        <path d="M88.5 50.5v120M132.5 50.5v120M176.5 50.5v120" strokeOpacity="0.08" />
        {/* Bezier handles */}
        <path d="M44 162H112M216 58H148" strokeOpacity="0.32" />
        <rect x="109" y="159" width="6" height="6" strokeOpacity="0.5" />
        <rect x="145" y="55" width="6" height="6" strokeOpacity="0.5" />
        {/* Easing curve */}
        <path id="art-motion-curve" d="M44 162C112 162 148 58 216 58" strokeOpacity="0.55" />
        <circle cx="44" cy="162" r="2.5" fill="var(--color-cream)" fillOpacity="0.6" stroke="none" />
        <circle cx="216" cy="58" r="2.5" fill="var(--color-cream)" fillOpacity="0.6" stroke="none" />
        {/* Timeline: ruler, then keyframes */}
        <path d="M44 218.5h172" strokeOpacity="0.3" />
        <path d="M44 214.5v8M88 216.5v4M132 214.5v8M176 216.5v4M216 214.5v8" strokeOpacity="0.3" />
        <path d="M44 246.5h172" strokeOpacity="0.12" />
        <path
          d="M44 241.5l5 5-5 5-5-5zM102 241.5l5 5-5 5-5-5zM158 241.5l5 5-5 5-5-5zM216 241.5l5 5-5 5-5-5z"
          strokeOpacity="0.5"
          fill="var(--color-ink, #000)"
        />
      </g>
      <text x="44" y="268" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--color-cream)" fillOpacity="0.5">
        00:00
      </text>
      <text x="216" y="268" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--color-cream)" fillOpacity="0.5">
        00:04
      </text>
      {/* Playhead, in step with the dot */}
      <g className="art-motion-playhead">
        <path d="M40 212v42" stroke="var(--color-accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M36 208h8l-4 5z" fill="var(--color-accent)" />
      </g>
      {/* Dot travelling along the curve (SMIL); a still dot replaces it when motion is reduced */}
      <g className="art-motion-moving">
        <circle r="4" fill="var(--color-accent)">
          <animateMotion
            dur="4.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keyPoints="0;1;1"
            keyTimes="0;0.7;1"
            keySplines="0.45 0 0.55 1;0 0 1 1"
          >
            <mpath href="#art-motion-curve" />
          </animateMotion>
        </circle>
      </g>
      <circle className="art-motion-still" cx="216" cy="58" r="4" fill="var(--color-accent)" />
      {/* Social post: a video over a photo */}
      <g stroke="var(--color-cream)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <rect x="256.5" y="34.5" width="120" height="146" rx="8" strokeOpacity="0.3" fill="var(--color-ink, #000)" />
        <rect x="264.5" y="42.5" width="104" height="82" rx="4" strokeOpacity="0.22" fill="var(--color-cream)" fillOpacity="0.025" />
        <path d="M268 118l24-24 16 15 14-12 42 21" strokeOpacity="0.28" strokeLinejoin="round" />
        <circle cx="346.5" cy="60.5" r="6" strokeOpacity="0.28" />
        <circle cx="316.5" cy="83.5" r="12" strokeOpacity="0.5" fill="var(--color-ink, #000)" fillOpacity="0.6" />
        <path d="M312.5 77.5v12l10-6z" strokeOpacity="0.6" strokeLinejoin="round" />
        <rect x="264.5" y="136.5" width="64" height="6" rx="3" strokeOpacity="0.3" />
        <rect x="264.5" y="150.5" width="44" height="6" rx="3" strokeOpacity="0.18" />
        <path d="M264.5 168.5h104" strokeOpacity="0.1" />
      </g>
      <circle cx="366" cy="139.5" r="3" fill="var(--color-accent)" />
      {/* Ad card: a rising results line */}
      <g stroke="var(--color-cream)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <rect x="268.5" y="166.5" width="112" height="92" rx="8" strokeOpacity="0.32" fill="var(--color-ink, #000)" />
        <path d="M280.5 236.5h88" strokeOpacity="0.14" />
        <path d="M281 232l18-9 15 4 18-15 18 3 16-19" strokeOpacity="0.5" strokeLinejoin="round" />
      </g>
      <text x="280" y="186" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--color-cream)" fillOpacity="0.55">
        Campagne
      </text>
      <circle cx="366" cy="196" r="3" fill="var(--color-accent)" />
      <text x="280" y="250" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--color-cream)" fillOpacity="0.4">
        Conversions
      </text>
    </svg>
  );
}
