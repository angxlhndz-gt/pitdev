import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';

const codeLines = [
  { code: 'const pitdev = deploy({', tone: 'text-white' },
  { code: '  web: "presencia profesional",', tone: 'text-pit-neon' },
  { code: '  agenda: "reservas inteligentes",', tone: 'text-pit-cyan' },
  { code: '  crm: "clientes ordenados",', tone: 'text-pit-mint' },
  { code: '  stock: "inventario claro",', tone: 'text-pit-ink' },
  { code: '  network: "infraestructura estable",', tone: 'text-pit-neon' },
  { code: '});', tone: 'text-white' },
];

const keyboardRows = [13, 12, 11, 9];

export default function PremiumLaptopShowcase() {
  const rootRef = useRef(null);
  const laptopRef = useRef(null);
  const glowRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const hero = rootRef.current.closest('#inicio') || rootRef.current;

      gsap.fromTo(
        laptopRef.current,
        { autoAlpha: 0, x: 44, y: 24, scale: 0.94, rotateY: -8 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.18,
        },
      );

      gsap.fromTo(
        glowRef.current,
        { autoAlpha: 0, scale: 0.82 },
        { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.28 },
      );

      const scrollTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=560',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(laptopRef.current, { y: -42, x: 24, scale: 0.92, rotateX: 3, rotateY: -6, autoAlpha: 0.68 }, 0)
        .to(glowRef.current, { autoAlpha: 0.34, scale: 0.86 }, 0)
        .to(codeRef.current, { y: -26 }, 0)
        .to('.premium-code-line:nth-child(4), .premium-code-line:nth-child(6)', { color: '#ffffff' }, 0.18);

      return () => scrollTimeline.kill();
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="premium-laptop-wrap relative mx-auto min-h-[430px] w-full max-w-[660px] py-8 sm:min-h-[520px] lg:py-0"
      aria-label="Laptop premium de PitDev mostrando código"
    >
      <div ref={glowRef} className="premium-laptop-glow" aria-hidden="true" />

      <div ref={laptopRef} className="premium-laptop-stage">
        <div className="premium-laptop-shadow" aria-hidden="true" />

        <div className="premium-laptop-screen">
          <div className="premium-laptop-lid" aria-hidden="true" />
          <div className="premium-laptop-bezel">
            <div className="premium-laptop-camera" aria-hidden="true" />

            <div className="premium-editor">
              <div className="premium-editor-topbar">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-pit-neon shadow-[0_0_12px_rgba(57,255,136,0.72)]" />
                  <span className="size-2.5 rounded-full bg-pit-cyan/75" />
                  <span className="size-2.5 rounded-full bg-white/35" />
                </div>
                <span>pitdev.deploy.js</span>
              </div>

              <div className="premium-editor-content">
                <div className="premium-editor-status">
                  {['BUILD READY', 'SYNC ACTIVE', 'DEPLOY ONLINE'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div ref={codeRef} className="premium-code-block">
                  {codeLines.map((line, index) => (
                    <p
                      key={line.code}
                      className="premium-code-line flex min-w-0 items-start gap-3"
                      style={{ '--line-delay': `${0.1 + index * 0.12}s` }}
                    >
                      <span className="w-5 shrink-0 select-none text-right text-pit-neon/55">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`min-w-0 drop-shadow-[0_0_10px_rgba(57,255,136,0.16)] ${line.tone}`}>
                        {line.code}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="premium-laptop-hinge" aria-hidden="true" />

        <div className="premium-laptop-base" aria-hidden="true">
          <div className="premium-laptop-keyboard">
            {keyboardRows.map((count, rowIndex) => (
              <div key={count} className="premium-key-row">
                {Array.from({ length: count }, (_, keyIndex) => (
                  <span
                    key={`${rowIndex}-${keyIndex}`}
                    className={keyIndex === 0 || keyIndex === count - 1 ? 'premium-key premium-key-wide' : 'premium-key'}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="premium-trackpad" />
          <div className="premium-front-lip" />
        </div>
      </div>
    </div>
  );
}
