/** Lightweight, language-neutral diagrams supporting the existing process copy. */
export default function ProcessVisual({ stage, className = '' }) {
  return (
    <svg className={`process-visual ${className}`} viewBox="0 0 320 144" fill="none" aria-hidden="true">
      <path d="M0 36H320M0 72H320M0 108H320M40 0V144M100 0V144M160 0V144M220 0V144M280 0V144" stroke="currentColor" opacity=".07" />
      {stage === 0 && <>
        <g stroke="#71877b" fill="#101c16">
          <rect x="35" y="39" width="66" height="71" rx="6" transform="rotate(-9 35 39)" />
          <rect x="119" y="22" width="70" height="87" rx="6" transform="rotate(7 119 22)" />
          <rect x="213" y="51" width="69" height="68" rx="6" transform="rotate(-5 213 51)" />
        </g>
        <path d="M48 56L83 50M48 67L77 62M135 42L168 46M134 55L159 58M226 69L260 66M227 81L252 79" stroke="#a5b9ad" strokeWidth="3" strokeLinecap="round" opacity=".6" />
        <circle cx="162" cy="91" r="24" fill="#08130d" stroke="currentColor" strokeWidth="2" />
        <path d="M179 108L197 126M151 91H173M162 80V102" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>}
      {stage === 1 && <>
        <path d="M66 72H122M198 72H254M160 45V22M160 122V99" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" opacity=".6" />
        <rect x="25" y="49" width="48" height="46" rx="8" fill="#101c16" stroke="#537461" />
        <rect x="247" y="49" width="48" height="46" rx="8" fill="#101c16" stroke="#537461" />
        <rect x="120" y="34" width="80" height="76" rx="14" fill="#122b1d" stroke="currentColor" />
        <path d="M143 59H177M143 72H169M143 85H177M38 65H60M38 77H54M260 71L267 78L282 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="19" r="4" fill="currentColor" /><circle cx="160" cy="125" r="4" fill="currentColor" />
      </>}
      {stage === 2 && <>
        <rect x="36" y="23" width="248" height="100" rx="9" fill="#0c1811" stroke="#537461" />
        <path d="M36 45H284M126 45V123" stroke="#537461" opacity=".6" />
        <circle cx="49" cy="34" r="2" fill="currentColor" /><circle cx="58" cy="34" r="2" fill="currentColor" opacity=".4" />
        <path d="M55 63H101M55 76H87M55 89H96M55 102H78" stroke="#71877b" strokeWidth="3" strokeLinecap="round" />
        <path d="M143 102L168 87L188 94L213 72L236 80L264 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M143 102L168 87L188 94L213 72L236 80L264 58V112H143Z" fill="currentColor" opacity=".08" />
        <circle cx="264" cy="58" r="4" fill="currentColor" />
      </>}
      {stage === 3 && <>
        <path d="M76 73H120M200 73H244" stroke="currentColor" strokeWidth="2" opacity=".45" />
        <rect x="30" y="42" width="57" height="65" rx="7" fill="#101c16" stroke="#537461" />
        <path d="M44 59H72M44 71H64M44 83H70" stroke="#a5b9ad" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="72" r="41" fill="#102a1b" stroke="currentColor" />
        <circle cx="160" cy="72" r="32" stroke="currentColor" opacity=".2" />
        <path d="M144 72L155 83L178 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="244" y="47" width="45" height="52" rx="7" fill="#101c16" stroke="#537461" />
        <path d="M257 73L264 80L277 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
    </svg>
  );
}
