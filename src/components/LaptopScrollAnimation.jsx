import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';

const productPills = [
  { label: 'WEB', position: 'left-2 top-14 sm:-left-3 sm:top-20', delay: '0s' },
  { label: 'AGENDA', position: 'right-2 top-8 sm:-right-4 sm:top-12', delay: '-1.3s' },
  { label: 'CRM', position: 'bottom-28 left-0 sm:-left-7 sm:bottom-32', delay: '-2.1s' },
  { label: 'STOCK', position: 'bottom-20 right-0 sm:-right-5 sm:bottom-24', delay: '-0.6s' },
  { label: 'RED', position: 'left-1/2 top-0 -translate-x-1/2 sm:-top-4', delay: '-3s' },
];

const codeLines = [
  { code: 'const negocio = PitDev.launch({', tone: 'text-white' },
  { code: '  web: "sitio profesional",', tone: 'text-pit-neon' },
  { code: '  agenda: sync("WhatsApp"),', tone: 'text-pit-cyan' },
  { code: '  crm: pipeline("clientes"),', tone: 'text-pit-mint' },
  { code: '  stock: liveInventory(),', tone: 'text-pit-ink' },
  { code: '  red: auditNetwork()', tone: 'text-pit-neon' },
  { code: '});', tone: 'text-white' },
];

const keyboardRows = [13, 12, 11, 9];

export default function LaptopScrollAnimation() {
  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const screenRef = useRef(null);
  const displayRef = useRef(null);
  const coverRef = useRef(null);
  const shadowRef = useRef(null);
  const chipRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    let media;

    const context = gsap.context(() => {
      const hero = rootRef.current.closest('#inicio') || rootRef.current;
      const chips = chipRefs.current.filter(Boolean);
      const deckDetails = rootRef.current.querySelectorAll(
        '.pit-laptop-keyboard, .pit-laptop-trackpad, .pit-laptop-speaker',
      );

      gsap.set(screenRef.current, {
        rotateX: 0,
        transformOrigin: '50% calc(100% + 10px)',
        transformPerspective: 1300,
      });
      gsap.set(sceneRef.current, {
        rotateX: 0,
        rotateY: -7,
        scale: 1,
        y: 0,
        transformPerspective: 1400,
      });
      gsap.set(coverRef.current, { autoAlpha: 0, scaleY: 0.82, y: -18 });

      gsap.fromTo(
        sceneRef.current,
        { autoAlpha: 0, y: 32, rotateX: 8, rotateY: -18, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          rotateY: -7,
          scale: 1,
          duration: 1.05,
          ease: 'power3.out',
          delay: 0.2,
        },
      );

      media = gsap.matchMedia();

      media.add('(min-width: 1024px)', () => {
        const closeTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=460',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        closeTimeline
          .to(sceneRef.current, { y: 34, scale: 0.9, rotateX: 5, rotateY: 5 }, 0)
          .to(screenRef.current, { rotateX: -72, y: 16, z: 18 }, 0)
          .to(shadowRef.current, { autoAlpha: 0.78, scaleX: 0.76, scaleY: 0.76 }, 0)
          .to(chips, { autoAlpha: 0, y: -18, scale: 0.82, stagger: 0.025 }, 0.1)
          .to(deckDetails, { autoAlpha: 0.18, y: 4 }, 0.52)
          .to(coverRef.current, { autoAlpha: 1, scaleY: 1, y: 0 }, 0.5)
          .to(displayRef.current, { autoAlpha: 0.48, filter: 'blur(0.7px)' }, 0.72);

        return () => closeTimeline.kill();
      });

      media.add('(max-width: 1023px)', () => {
        const mobileTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            end: 'bottom 44%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        mobileTimeline
          .to(sceneRef.current, { y: -12, scale: 0.97, rotateX: 3, rotateY: -2 }, 0)
          .to(screenRef.current, { rotateX: -18, y: 2 }, 0)
          .to(chips, { autoAlpha: 0.45, y: -10, stagger: 0.03 }, 0);

        return () => mobileTimeline.kill();
      });

    }, rootRef);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto min-h-[430px] w-full max-w-[640px] py-8 sm:min-h-[520px] lg:min-h-[560px] lg:py-0"
      aria-label="Laptop 3D mostrando código animado de soluciones PitDev"
    >
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pit-neon/15 blur-3xl sm:h-[30rem] sm:w-[30rem]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-8 top-20 h-32 rounded-full bg-pit-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      {productPills.map((pill, index) => (
        <span
          key={pill.label}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          className={`product-orbit-chip absolute z-20 inline-flex min-h-9 items-center rounded-lg border border-pit-neon/35 bg-pit-black/70 px-3 py-2 font-mono text-xs font-bold tracking-[0.18em] text-pit-neon shadow-glow backdrop-blur-xl ${pill.position}`}
          style={{ '--float-delay': pill.delay }}
        >
          {pill.label}
        </span>
      ))}

      <div className="pit-laptop-perspective relative z-10">
        <div ref={sceneRef} className="pit-laptop-scene">
          <div ref={shadowRef} className="pit-laptop-shadow" aria-hidden="true" />

          <div className="pit-laptop-device">
            <div ref={screenRef} className="pit-laptop-screen">
              <div className="pit-laptop-screen-back" aria-hidden="true" />
              <div className="pit-laptop-screen-frame">
                <div className="pit-laptop-camera" aria-hidden="true" />

                <div ref={displayRef} className="pit-laptop-display">
                  <div className="circuit-grid absolute inset-0 opacity-25" aria-hidden="true" />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_74%_14%,rgba(84,230,255,0.16),transparent_15rem),linear-gradient(180deg,rgba(57,255,136,0.09),rgba(3,6,4,0.08))]"
                    aria-hidden="true"
                  />

                  <div className="relative border-b border-white/10 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-pit-neon shadow-[0_0_14px_rgba(57,255,136,0.9)]" />
                        <span className="size-2.5 rounded-full bg-pit-cyan/80" />
                        <span className="size-2.5 rounded-full bg-white/40" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-pit-ink/50">
                        pitdev.workspace
                      </span>
                    </div>
                  </div>

                  <div className="pit-editor-shell relative">
                    <div className="pit-editor-sidebar" aria-hidden="true">
                      {['WEB', 'API', 'CRM'].map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <div className="pit-editor-code">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {['deploy: listo', 'agenda: sync', 'red: segura'].map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-pit-neon/25 bg-pit-neon/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-pit-neon"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2.5 font-mono text-[0.78rem] leading-5 sm:text-[0.84rem] md:text-[0.92rem]">
                        {codeLines.map((line, index) => (
                          <p
                            key={line.code}
                            className="code-type-line flex min-w-0 items-start gap-3"
                            style={{ '--line-delay': `${0.12 + index * 0.13}s` }}
                          >
                            <span className="w-5 shrink-0 select-none text-right text-pit-neon/55">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className={`min-w-0 drop-shadow-[0_0_10px_rgba(57,255,136,0.18)] ${line.tone}`}>
                              {line.code}
                            </span>
                          </p>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        {['online', 'ventas', 'control'].map((item) => (
                          <div key={item} className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-2">
                            <span className="block h-1.5 rounded-full bg-pit-neon shadow-[0_0_14px_rgba(57,255,136,0.78)]" />
                            <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-pit-ink/65">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={coverRef} className="pit-laptop-closing-cover" aria-hidden="true" />

            <div className="pit-laptop-hinge" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="pit-laptop-base-real">
              <div className="pit-laptop-base-top">
                <div className="pit-laptop-speaker pit-laptop-speaker-left" aria-hidden="true" />
                <div className="pit-laptop-keyboard" aria-hidden="true">
                  {keyboardRows.map((count, rowIndex) => (
                    <div key={count} className="pit-laptop-key-row">
                      {Array.from({ length: count }, (_, keyIndex) => (
                        <span
                          key={`${rowIndex}-${keyIndex}`}
                          className={keyIndex === 0 || keyIndex === count - 1 ? 'pit-laptop-key pit-laptop-key-wide' : 'pit-laptop-key'}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pit-laptop-speaker pit-laptop-speaker-right" aria-hidden="true" />
                <div className="pit-laptop-trackpad" aria-hidden="true" />
              </div>
              <div className="pit-laptop-front-lip" aria-hidden="true">
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
