import { ArrowUpRight, CalendarDays, Check, Globe2, Package, UsersRound, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import './HeroSolutionsShowcase.css';

function SolutionPanel({ kind, icon: Icon, title, children }) {
  return (
    <div className={`hero-solution hero-solution--${kind}`} data-solution={kind}>
      <div className="hero-solution-heading">
        <Icon size={15} strokeWidth={1.6} />
        <span>{title}</span>
        <span className="hero-solution-status" />
      </div>
      {children}
    </div>
  );
}

export default function HeroSolutionsShowcase({ content }) {
  const rootRef = useRef(null);
  const productName = (id) => content.products.find((product) => product.id === id)?.name;

  useEffect(() => {
    const media = gsap.matchMedia();

    // CSS is the complete static composition. Only desktop gets a scroll timeline.
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current;
      const select = gsap.utils.selector(root);
      const timeline = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: root.closest('#inicio'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // Different travel distances separate the layers without pinning the page.
      const layers = [
        ['web', { x: 0, y: 12, rotationY: -5, scale: 1 }, { x: -8, y: -22, rotationY: 2, scale: 0.96 }],
        ['agenda', { x: -10, y: 24, rotation: 2, opacity: 0.85 }, { x: 12, y: -40, rotation: -1, opacity: 1 }],
        ['crm', { x: 18, y: -8, rotation: -2, opacity: 0.9 }, { x: -14, y: 30, rotation: 1, opacity: 1 }],
        ['stock', { x: -16, y: -12, rotation: 2, opacity: 0.85 }, { x: 14, y: 46, rotation: -1, opacity: 1 }],
        ['automation', { x: 14, y: 18, opacity: 0.7 }, { x: -10, y: -24, opacity: 1 }],
      ];

      layers.forEach(([kind, from, to]) => {
        timeline.fromTo(select(`[data-solution="${kind}"]`), from, to, 0);
      });
      timeline.to(select('.hero-solutions-stage'), { y: 64 }, 0);
      timeline.fromTo(select('.hero-solutions-orbit'), { rotation: -12, opacity: 0.5 }, { rotation: 9, opacity: 0.25 }, 0);
    }, rootRef);

    // Reverts inline styles and removes triggers on route changes and breakpoints.
    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className="hero-solutions" aria-hidden="true">
      <div className="hero-solutions-aura" />
      <div className="hero-solutions-orbit" />
      <div className="hero-solutions-stage">
        <SolutionPanel kind="web" icon={Globe2} title={content.services[0].title}>
          <div className="hero-web-toolbar">
            <span className="hero-web-brand">Pit<span>Dev</span><i /></span>
            <span className="hero-ui-line" /><span className="hero-ui-line" />
            <span className="hero-web-menu" />
          </div>
          <div className="hero-web-preview">
            <div className="hero-web-copy">
              <span className="hero-web-eyebrow" />
              <strong>{content.hero.title}</strong>
              <span className="hero-ui-line" /><span className="hero-ui-line" />
              <span className="hero-web-cta"><ArrowUpRight size={16} /></span>
            </div>
            <div className="hero-web-art">
              <div className="hero-web-tile hero-web-tile--back" />
              <div className="hero-web-tile hero-web-tile--front">
                <svg viewBox="0 0 100 80" fill="none">
                  <path d="M12 62L32 43L49 51L69 24L87 14V72H12Z" fill="#39ff88" fillOpacity=".1" />
                  <path d="M12 62L32 43L49 51L69 24L87 14" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="87" cy="14" r="4" fill="#39ff88" />
                </svg>
              </div>
            </div>
          </div>
          <div className="hero-web-footer"><span /><span /><span /></div>
        </SolutionPanel>

        <SolutionPanel kind="agenda" icon={CalendarDays} title={productName('agenda')}>
          <div className="hero-calendar">
            <div className="hero-calendar-days">
              {[12, 13, 14, 15, 16].map((day) => <span key={day} className={day === 14 ? 'is-selected' : ''}>{day}</span>)}
            </div>
            <div className="hero-calendar-grid">
              <span className="hero-booking hero-booking--one">09:00</span>
              <span className="hero-booking hero-booking--two">10:30</span>
              <span className="hero-booking hero-booking--three">12:00</span>
            </div>
          </div>
        </SolutionPanel>

        <SolutionPanel kind="crm" icon={UsersRound} title={productName('crm-simple')}>
          <div className="hero-crm-board">
            {[2, 1, 2].map((count, column) => (
              <div className="hero-crm-column" key={column}>
                <span className="hero-crm-column-label" />
                {Array.from({ length: count }, (_, row) => (
                  <div className="hero-crm-contact" key={row}>
                    <span className="hero-crm-avatar" /><span className="hero-ui-line" />
                    <span className="hero-crm-progress" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SolutionPanel>

        <SolutionPanel kind="stock" icon={Package} title={productName('stock')}>
          <div className="hero-stock-list">
            {[76, 48, 90].map((level, index) => (
              <div className="hero-stock-row" key={level}>
                <span className="hero-stock-package"><Package size={14} strokeWidth={1.4} /></span>
                <span className="hero-stock-meter"><i style={{ width: `${level}%` }} /></span>
                <span className="hero-stock-value">0{index + 1}</span>
              </div>
            ))}
          </div>
        </SolutionPanel>

        <SolutionPanel kind="automation" icon={Workflow} title={content.services[2].title}>
          <div className="hero-workflow">
            <span><Globe2 size={17} /></span><i />
            <span><Workflow size={17} /></span><i />
            <span className="is-complete"><Check size={17} /></span>
          </div>
        </SolutionPanel>
      </div>
    </div>
  );
}
