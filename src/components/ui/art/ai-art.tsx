/** Hairline orbit of a company's data (documents, CRM, e-mails, team) feeding an AI core that answers in a chat card. */
export function AiArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 300" fill="none" className={className}>
      <style>{`
        .art-ai-flow {
          stroke-dasharray: 0.01 200;
          stroke-dashoffset: -50;
          animation: art-ai-flow 8s cubic-bezier(0.45, 0, 0.25, 1) infinite backwards;
        }
        .art-ai-flow-2 { stroke-dashoffset: -58; animation-delay: 1.4s; }
        .art-ai-flow-3 { stroke-dashoffset: -32; animation-delay: 3.4s; }
        @keyframes art-ai-flow {
          0% { stroke-dashoffset: 0; opacity: 0; }
          8% { opacity: 1; }
          48% { opacity: 1; }
          56% { stroke-dashoffset: -100; opacity: 0; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-ai-flow { animation: none; }
        }
        html[data-motion="reduce"] .art-ai-flow { animation: none; }
      `}</style>

      <g stroke="var(--color-cream)" strokeWidth="1">
        {/* Orbits */}
        <circle vectorEffect="non-scaling-stroke" cx="152" cy="150" r="30" strokeOpacity="0.14" strokeDasharray="2 4" />
        <circle vectorEffect="non-scaling-stroke" cx="152" cy="150" r="66" strokeOpacity="0.2" />
        <circle vectorEffect="non-scaling-stroke" cx="152" cy="150" r="106" strokeOpacity="0.16" />

        {/* Links: sources to the core, between nodes, core to the conversation */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M137.1 136.6L77.3 82.8M156.8 130.6L176.3 52.4M135.4 161.2L68.7 206.2M158.2 169L183.1 245.6"
          strokeOpacity="0.2"
        />
        <path
          vectorEffect="non-scaling-stroke"
          d="M74.4 84.5L85.4 135.4M78.6 80.1L121.9 87.8M173.4 50.6L131.5 85.3M65.8 204.1L84.9 146M69.6 209.3L117.6 209.3M180.2 247.7L127.7 212.4"
          strokeOpacity="0.14"
        />
        <path vectorEffect="non-scaling-stroke" d="M290 110L171.2 144.4M172 151L274 156" strokeOpacity="0.24" />

        {/* Core and nodes */}
        <circle
          vectorEffect="non-scaling-stroke"
          cx="152"
          cy="150"
          r="17"
          strokeOpacity="0.45"
          fill="var(--color-cream)"
          fillOpacity="0.04"
        />
        <circle vectorEffect="non-scaling-stroke" cx="73.2" cy="79.1" r="4" strokeOpacity="0.45" />
        <circle vectorEffect="non-scaling-stroke" cx="177.6" cy="47.1" r="4" strokeOpacity="0.45" />
        <circle vectorEffect="non-scaling-stroke" cx="64.1" cy="209.3" r="4" strokeOpacity="0.45" />
        <circle vectorEffect="non-scaling-stroke" cx="184.8" cy="250.8" r="4" strokeOpacity="0.45" />
        <circle vectorEffect="non-scaling-stroke" cx="86.6" cy="140.8" r="3" strokeOpacity="0.3" />
        <circle vectorEffect="non-scaling-stroke" cx="127.3" cy="88.8" r="3" strokeOpacity="0.3" />
        <circle vectorEffect="non-scaling-stroke" cx="123.1" cy="209.3" r="3" strokeOpacity="0.3" />

        {/* Prompt card */}
        <rect
          vectorEffect="non-scaling-stroke"
          x="290"
          y="94"
          width="92"
          height="32"
          rx="9"
          strokeOpacity="0.3"
          fill="var(--color-cream)"
          fillOpacity="0.03"
        />
        <rect vectorEffect="non-scaling-stroke" x="302" y="107.5" width="48" height="5" rx="2.5" strokeOpacity="0.3" />
        <circle vectorEffect="non-scaling-stroke" cx="366" cy="110" r="7" strokeOpacity="0.3" />
        <path
          vectorEffect="non-scaling-stroke"
          d="M366 113v-6m-2.5 2.5l2.5-2.5 2.5 2.5"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Answer card */}
        <rect
          vectorEffect="non-scaling-stroke"
          x="274"
          y="138"
          width="108"
          height="76"
          rx="9"
          strokeOpacity="0.3"
          fill="var(--color-cream)"
          fillOpacity="0.03"
        />
        <rect vectorEffect="non-scaling-stroke" x="297" y="153.5" width="34" height="5" rx="2.5" strokeOpacity="0.4" />
        <rect vectorEffect="non-scaling-stroke" x="286" y="172" width="84" height="5" rx="2.5" strokeOpacity="0.22" />
        <rect vectorEffect="non-scaling-stroke" x="286" y="184" width="72" height="5" rx="2.5" strokeOpacity="0.22" />
        <rect vectorEffect="non-scaling-stroke" x="286" y="196" width="46" height="5" rx="2.5" strokeOpacity="0.22" />
      </g>

      {/* Accent: an arc of the outer orbit, and the answer's marker */}
      <path
        d="M201.8 56.4A106 106 0 0 1 247.3 103.5"
        stroke="var(--color-accent)"
        strokeOpacity="0.8"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
      <circle cx="288" cy="156" r="3" fill="var(--color-accent)" />

      <g
        fontFamily="var(--font-sans)"
        fontSize="11"
        fill="var(--color-cream)"
        fillOpacity="0.6"
        letterSpacing="0.01em"
      >
        <text x="76.2" y="67.1" textAnchor="end">
          Documents
        </text>
        <text x="186.6" y="41.1" textAnchor="start">
          CRM
        </text>
        <text x="58.1" y="225.3" textAnchor="end">
          E-mails
        </text>
        <text x="194.8" y="265.8" textAnchor="start">
          Équipe
        </text>
      </g>
      <text
        x="152"
        y="150"
        fontFamily="var(--font-serif)"
        fontWeight="300"
        fontSize="15"
        fill="var(--color-cream)"
        fillOpacity="0.7"
        textAnchor="middle"
        dominantBaseline="central"
      >
        IA
      </text>

      {/* Travelling dots: the question and the documents reach the core, the answer leaves it */}
      <g stroke="var(--color-accent)" strokeWidth="4.5" strokeLinecap="round">
        <path className="art-ai-flow" pathLength={100} d="M290 110L171.2 144.4" />
        <path className="art-ai-flow art-ai-flow-2" pathLength={100} d="M77.3 82.8L137.1 136.6" />
        <path className="art-ai-flow art-ai-flow-3" pathLength={100} d="M172 151L274 156" />
      </g>
    </svg>
  );
}
