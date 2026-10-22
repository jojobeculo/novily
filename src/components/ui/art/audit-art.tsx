/** Hairline browser window under audit (scan line, focus brackets) overlapped by a compliance panel: score gauge and checklist of standards. */
export function AuditArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 300" fill="none" className={className}>
      <style>{`
        .art-audit-art *, .art-audit-ping { vector-effect: non-scaling-stroke; }
        .art-audit-scan { animation: art-audit-sweep 7s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .art-audit-ping {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: art-audit-ping 3.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes art-audit-sweep {
          0% { transform: translateY(-116px); opacity: 0; }
          14% { opacity: 1; }
          82% { opacity: 1; }
          100% { transform: translateY(44px); opacity: 0; }
        }
        @keyframes art-audit-ping {
          0% { transform: scale(1); opacity: 0.8; }
          70%, 100% { transform: scale(3.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-audit-scan, .art-audit-ping { animation: none; }
        }
        html[data-motion="reduce"] .art-audit-scan,
        html[data-motion="reduce"] .art-audit-ping { animation: none; }
      `}</style>
      <g className="art-audit-art" stroke="var(--color-cream)" strokeWidth="1">
        {/* Browser window */}
        <rect x="22.5" y="36.5" width="250" height="198" rx="8" strokeOpacity="0.3" />
        <path d="M22.5 58.5h250" strokeOpacity="0.2" />
        <circle cx="35.5" cy="47.5" r="2" strokeOpacity="0.32" />
        <circle cx="43.5" cy="47.5" r="2" strokeOpacity="0.32" />
        <circle cx="51.5" cy="47.5" r="2" strokeOpacity="0.32" />
        <rect x="68.5" y="42.5" width="124" height="10" rx="5" strokeOpacity="0.18" />
        <path d="M78 47.5h38" strokeOpacity="0.22" />
        {/* Page skeleton, with focus brackets around the button */}
        <rect x="38.5" y="72.5" width="24" height="6" rx="3" strokeOpacity="0.3" />
        <path d="M124 75.5h14M146 75.5h14M168 75.5h12" strokeOpacity="0.2" />
        <rect x="38.5" y="94.5" width="128" height="8" rx="4" strokeOpacity="0.32" />
        <rect x="38.5" y="108.5" width="92" height="8" rx="4" strokeOpacity="0.32" />
        <path d="M38.5 128.5h134M38.5 137.5h122M38.5 146.5h82" strokeOpacity="0.18" />
        <rect x="38.5" y="158.5" width="46" height="13" rx="6.5" strokeOpacity="0.3" />
        <path d="M34.5 158.5v-4h4M84.5 154.5h4v4M88.5 171.5v4h-4M38.5 175.5h-4v-4" strokeOpacity="0.45" />
        <rect x="38.5" y="190.5" width="68" height="30" rx="4" strokeOpacity="0.2" fill="var(--color-cream)" fillOpacity="0.03" />
        <rect x="114.5" y="190.5" width="68" height="30" rx="4" strokeOpacity="0.2" fill="var(--color-cream)" fillOpacity="0.03" />
        <path
          d="M46.5 213.5l12-8 8 5 10-7 20 10M122.5 213.5l14-9 9 4.5 9-5.5 20 10"
          strokeOpacity="0.18"
          strokeLinejoin="round"
        />
        {/* Scan line: rests between the button and the images */}
        <g className="art-audit-scan">
          <path d="M23 183.5h249" strokeOpacity="0.34" />
          <circle cx="22.5" cy="183.5" r="1.75" fill="var(--color-cream)" fillOpacity="0.6" stroke="none" />
        </g>
        {/* Audit panel: the ink fill hides the browser behind it */}
        <rect x="193.5" y="66.5" width="184" height="193" rx="10" fill="var(--color-ink, #000)" stroke="none" />
        <rect x="193.5" y="66.5" width="184" height="193" rx="10" strokeOpacity="0.32" fill="var(--color-cream)" fillOpacity="0.025" />
        <circle cx="232" cy="106" r="22" strokeOpacity="0.16" />
        <path d="M232 84A22 22 0 1 1 221.4 86.72" stroke="var(--color-accent)" strokeLinecap="round" />
        <path d="M209.5 142.5h152" strokeOpacity="0.14" />
        <path
          d="M211 161l3 3 6-6M211 181l3 3 6-6M211 201l3 3 6-6M211 221l3 3 6-6M211 241l3 3 6-6"
          strokeOpacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle className="art-audit-ping" cx="271" cy="114.5" r="2" stroke="var(--color-accent)" strokeWidth="1" />
      <circle cx="271" cy="114.5" r="2" fill="var(--color-accent)" />
      <g fontFamily="var(--font-sans)" fill="var(--color-cream)">
        <text
          x="232"
          y="113"
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontWeight="300"
          fontSize="20"
          fillOpacity="0.85"
        >
          96
        </text>
        <text x="268" y="102" fontSize="11" fillOpacity="0.7">
          Conformité
        </text>
        <text x="278" y="118" fontSize="9.5" fillOpacity="0.5">
          Suivi en continu
        </text>
        <g fontSize="10.5" fillOpacity="0.66">
          <text x="230" y="164.7">WCAG 2.2 AA</text>
          <text x="230" y="184.7">RGAA 4.1</text>
          <text x="230" y="204.7">RGPD</text>
          <text x="230" y="224.7">Cookies CNIL</text>
          <text x="230" y="244.7">EAA</text>
        </g>
        <g fontSize="9.5" fillOpacity="0.5" textAnchor="end">
          <text x="361.5" y="164.5">98</text>
          <text x="361.5" y="184.5">96</text>
          <text x="361.5" y="204.5">100</text>
          <text x="361.5" y="224.5">100</text>
          <text x="361.5" y="244.5">94</text>
        </g>
      </g>
    </svg>
  );
}
