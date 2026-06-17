import { CheckCircle2, MessageCircle } from 'lucide-react';
import ButtonLink from '../components/ButtonLink.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Storytelling from '../components/Storytelling.jsx';
import { getWhatsAppUrl } from '../config/site.js';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

function ServiceDetails({ content }) {
  return (
    <section className="relative bg-[#050907] px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,136,0.13),transparent_18rem),radial-gradient(circle_at_12%_14%,rgba(57,255,136,0.08),transparent_22rem),radial-gradient(circle_at_86%_70%,rgba(84,230,255,0.055),transparent_20rem)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 md:grid-cols-2" data-stagger data-stagger-start="top 78%">
          {content.services.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              data-stagger-item
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.62] hover:bg-pit-neon/[0.055] sm:p-7"
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(57,255,136,0.14),transparent_17rem)] opacity-0 transition duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative mb-6 grid size-14 place-items-center rounded-lg border border-pit-neon/[0.28] bg-pit-neon/10 text-pit-neon transition duration-300 group-hover:shadow-glow">
                <Icon className="size-7" aria-hidden="true" />
              </div>
              <h2 className="relative text-2xl font-bold text-white">{title}</h2>
              <p className="relative mt-4 text-base leading-8 text-pit-ink/[0.76]">{description}</p>
              <p className="relative mt-4 text-sm leading-7 text-pit-ink/[0.68]">
                {content.servicesPage.details[index]}
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-bold text-pit-neon">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                <span>{content.tagline}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkProcess({ content }) {
  return (
    <section className="relative border-t border-white/10 bg-[#06100b] px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 circuit-grid opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow={content.servicesPage.processEyebrow} title={content.servicesPage.processTitle}>
          {content.servicesPage.processDescription}
        </SectionHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-stagger>
          {content.servicesPage.processSteps.map((step, index) => (
            <article
              key={step.title}
              data-stagger-item
              className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.55] hover:bg-pit-neon/[0.055]"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-pit-neon/25 bg-pit-neon/10 font-mono text-sm font-bold text-pit-neon">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-pit-ink/70">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCta({ content }) {
  return (
    <section className="relative border-t border-white/10 bg-pit-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-pit-neon/25 bg-pit-panel/[0.88] p-6 text-center shadow-panel sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-9 lg:text-left">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(57,255,136,0.16),transparent_18rem),linear-gradient(135deg,rgba(57,255,136,0.09),rgba(84,230,255,0.035)_44%,rgba(3,6,4,0.94))]"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-2xl font-bold text-white sm:text-3xl">{content.servicesPage.ctaTitle}</p>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-pit-ink/[0.74] sm:text-base lg:mx-0">
            {content.servicesPage.ctaDescription}
          </p>
        </div>
        <ButtonLink
          href={getWhatsAppUrl()}
          icon={MessageCircle}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-6 w-full px-6 sm:mx-auto sm:w-auto lg:mx-0 lg:mt-0 lg:shrink-0"
        >
          {content.servicesPage.ctaButton}
        </ButtonLink>
      </div>
    </section>
  );
}

export default function ServicesPage({ content }) {
  useScrollAnimations();

  return (
    <>
      <PageHero eyebrow={content.servicesPage.eyebrow} title={content.servicesPage.title}>
        {content.servicesPage.description}
      </PageHero>
      <ServiceDetails content={content} />
      <Storytelling content={content} />
      <WorkProcess content={content} />
      <ServiceCta content={content} />
    </>
  );
}
