import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site.js';
import AnimatedNetworkBackground from './AnimatedNetworkBackground.jsx';
import ButtonLink from './ButtonLink.jsx';
import PremiumLaptopShowcase from './PremiumLaptopShowcase.jsx';

export default function Hero({ content }) {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <AnimatedNetworkBackground />
      <div className="circuit-grid absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(57,255,136,0.14),transparent_28rem),radial-gradient(circle_at_88%_70%,rgba(84,230,255,0.09),transparent_22rem),linear-gradient(90deg,rgba(3,6,4,0.96)_0%,rgba(3,6,4,0.78)_50%,rgba(3,6,4,0.6)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-pit-black/55 to-[#050907]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[0.96fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-pit-neon/[0.35] bg-pit-neon/[0.08] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-pit-neon"
            data-animate="up"
            data-animate-distance="18"
            data-animate-start="top 96%"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {content.tagline}
          </div>
          <h1
            className="max-w-5xl text-5xl font-black leading-tight tracking-normal text-white sm:text-6xl lg:text-7xl"
            data-animate="up"
            data-animate-distance="26"
            data-animate-start="top 96%"
          >
            {content.hero.title}
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-8 text-pit-ink/[0.84] sm:text-xl"
            data-animate="up"
            data-animate-distance="30"
            data-animate-start="top 96%"
          >
            {content.hero.description}
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            data-animate="up"
            data-animate-distance="34"
            data-animate-start="top 96%"
          >
            <ButtonLink href="#servicios" icon={ArrowDown}>
              {content.hero.servicesCta}
            </ButtonLink>
            <ButtonLink href={whatsappUrl} icon={MessageCircle} variant="secondary" target="_blank" rel="noopener noreferrer">
              {content.hero.whatsappCta}
            </ButtonLink>
          </div>
        </div>

        <PremiumLaptopShowcase content={content} />
      </div>
    </section>
  );
}
