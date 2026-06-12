import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';

const productPills = [
  { label: 'WEB', position: 'left-2 top-16 sm:-left-4 sm:top-20', delay: '0s' },
  { label: 'AGENDA', position: 'right-2 top-8 sm:-right-3 sm:top-12', delay: '-1.2s' },
  { label: 'CRM', position: 'bottom-24 left-0 sm:-left-5 sm:bottom-28', delay: '-2.1s' },
  { label: 'STOCK', position: 'bottom-14 right-2 sm:-right-4 sm:bottom-20', delay: '-0.6s' },
  { label: 'RED', position: 'left-[44%] top-1 sm:-top-3', delay: '-2.8s' },
];

const codeLines = [
  { code: 'const pitdev = deploy({', tone: 'text-white' },
  { code: '  web: "presencia profesional",', tone: 'text-pit-neon' },
  { code: '  agenda: "reservas inteligentes",', tone: 'text-pit-cyan' },
  { code: '  crm: "clientes ordenados",', tone: 'text-pit-mint' },
  { code: '  stock: "inventario claro",', tone: 'text-pit-ink' },
  { code: '  red: "infraestructura estable"', tone: 'text-pit-neon' },
  { code: '});', tone: 'text-white' },
];

const moduleLabels = ['WEB', 'API', 'CRM', 'RED'];

export default function PitDevInteractiveMachine() {
  const rootRef = useRef(null);
  const machineRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const canTrackRef = useRef(false);

  const updateTargetFromPointer = (event) => {
    if (!canTrackRef.current || !rootRef.current) {
      return;
    }

    const rect = rootRef.current.getBoundingClientRect();
    targetRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const resetTarget = () => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
  };

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    const reduceMotion = reduceMotionQuery.matches;

    canTrackRef.current = pointerQuery.matches && !reduceMotion;

    const setMachineVars = (x, y) => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      root.style.setProperty('--machine-rotate-x', `${(-y * 5.5).toFixed(2)}deg`);
      root.style.setProperty('--machine-rotate-y', `${(x * 7.5).toFixed(2)}deg`);
      root.style.setProperty('--machine-shift-x', `${(x * 10).toFixed(2)}px`);
      root.style.setProperty('--machine-shift-y', `${(y * 7).toFixed(2)}px`);
      root.style.setProperty('--glow-x', `${(50 + x * 24).toFixed(2)}%`);
      root.style.setProperty('--glow-y', `${(45 + y * 20).toFixed(2)}%`);
      root.style.setProperty('--chip-x', `${(x * 11).toFixed(2)}px`);
      root.style.setProperty('--chip-y', `${(y * 8).toFixed(2)}px`);
    };

    setMachineVars(0, 0);

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      setMachineVars(current.x, current.y);

      frameRef.current = requestAnimationFrame(tick);
    };

    if (!reduceMotion) {
      frameRef.current = requestAnimationFrame(tick);
    }

    const context = gsap.context(() => {
      if (reduceMotion) {
        return;
      }

      const hero = rootRef.current.closest('#inicio') || rootRef.current;

      gsap.fromTo(
        machineRef.current,
        { autoAlpha: 0, y: 30, scale: 0.94, rotateX: 5, rotateY: -10 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.18,
        },
      );

      gsap.to(machineRef.current, {
        autoAlpha: 0.54,
        x: 54,
        y: 28,
        scale: 0.88,
        filter: 'blur(0.7px)',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '55% top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);

    return () => {
      cancelAnimationFrame(frameRef.current);
      context.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="interactive-machine-wrap relative mx-auto min-h-[430px] w-full max-w-[640px] py-8 sm:min-h-[520px] lg:py-0"
      onPointerMove={updateTargetFromPointer}
      onPointerLeave={resetTarget}
      aria-label="Computadora retro-futurista de PitDev con código animado"
    >
      <div className="machine-reactive-glow" aria-hidden="true" />

      {productPills.map((pill) => (
        <span
          key={pill.label}
          className={`machine-orbit-chip absolute z-20 inline-flex min-h-9 items-center rounded-lg border border-pit-neon/35 bg-pit-black/75 px-3 py-2 font-mono text-xs font-bold tracking-[0.18em] text-pit-neon shadow-glow backdrop-blur-xl ${pill.position}`}
          style={{ '--float-delay': pill.delay }}
        >
          {pill.label}
        </span>
      ))}

      <div className="interactive-machine-perspective relative z-10">
        <div ref={machineRef} className="interactive-machine-motion">
          <div className="interactive-machine">
            <div className="machine-shadow" aria-hidden="true" />

          <div className="machine-shell">
            <div className="machine-top-ridge" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="machine-screen-bezel">
              <div className="machine-corner machine-corner-left" aria-hidden="true" />
              <div className="machine-corner machine-corner-right" aria-hidden="true" />

              <div className="machine-screen">
                <div className="circuit-grid absolute inset-0 opacity-20" aria-hidden="true" />
                <div className="machine-screen-glass" aria-hidden="true" />

                <div className="machine-terminal-bar">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-pit-neon shadow-[0_0_14px_rgba(57,255,136,0.9)]" />
                    <span className="size-2.5 rounded-full bg-pit-cyan/80" />
                    <span className="size-2.5 rounded-full bg-white/40" />
                  </div>
                  <span>pitdev.machine</span>
                </div>

                <div className="machine-screen-content">
                  <aside className="machine-module-rail" aria-hidden="true">
                    {moduleLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </aside>

                  <div className="machine-code-panel">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {['deploy ready', 'sync active', 'network stable'].map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-pit-neon/25 bg-pit-neon/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-pit-neon"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2.5 font-mono text-[0.78rem] leading-5 sm:text-[0.86rem] md:text-[0.94rem]">
                      {codeLines.map((line, index) => (
                        <p
                          key={line.code}
                          className="machine-code-line flex min-w-0 items-start gap-3"
                          style={{ '--line-delay': `${0.1 + index * 0.14}s` }}
                        >
                          <span className="w-5 shrink-0 select-none text-right text-pit-neon/58">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className={`min-w-0 drop-shadow-[0_0_10px_rgba(57,255,136,0.2)] ${line.tone}`}>
                            {line.code}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="machine-control-deck" aria-hidden="true">
              <div className="machine-port-grid">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="machine-status-strip">
                <span />
                <span />
                <span />
              </div>
              <div className="machine-control-knob" />
            </div>
          </div>

            <div className="machine-neck" aria-hidden="true" />
            <div className="machine-foot" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
