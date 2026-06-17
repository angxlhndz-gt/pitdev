import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ButtonLink from '../components/ButtonLink.jsx';
import Contact from '../components/Contact.jsx';
import Hero from '../components/Hero.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

function AboutSummary({ content }) {
  return (
    <section id="nosotros" className="relative border-t border-white/10 bg-[#06100b] px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div data-animate="left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-pit-neon">
            {content.about.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            {content.homePage.aboutTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-pit-ink/[0.78] sm:text-lg">
            {content.homePage.aboutDescription}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2" data-stagger>
          {content.strengths.map(({ label, icon: Icon }) => (
            <article
              key={label}
              data-stagger-item
              className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-pit-neon/[0.45] hover:bg-pit-neon/[0.055]"
            >
              <div className="mb-4 grid size-11 place-items-center rounded-lg border border-pit-neon/25 bg-pit-neon/10 text-pit-neon">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-white">{label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSummary({ content }) {
  return (
    <section className="relative border-t border-white/10 bg-[#050907] px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(57,255,136,0.09),transparent_22rem),radial-gradient(circle_at_90%_80%,rgba(84,230,255,0.055),transparent_20rem)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow={content.homePage.servicesEyebrow} title={content.homePage.servicesTitle}>
          {content.homePage.servicesDescription}
        </SectionHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {content.services.slice(0, 4).map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              data-stagger-item
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.62] hover:bg-pit-neon/[0.055]"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-lg border border-pit-neon/[0.28] bg-pit-neon/10 text-pit-neon transition duration-300 group-hover:shadow-glow">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-pit-ink/70">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <ButtonLink href="/servicios" icon={ArrowRight}>
            {content.homePage.servicesCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ProductsSummary({ content }) {
  return (
    <section className="relative border-t border-white/10 bg-pit-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 circuit-grid opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow={content.homePage.productsEyebrow} title={content.homePage.productsTitle}>
          {content.homePage.productsDescription}
        </SectionHeader>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-stagger>
          {content.products.slice(0, 4).map(({ id, name, shortDescription, icon: Icon }) => {
            const meta = content.productMeta[id];

            return (
              <article
                key={id}
                data-stagger-item
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.58] hover:bg-pit-neon/[0.055]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="grid size-12 place-items-center rounded-lg border border-pit-neon/[0.28] bg-pit-neon/10 text-pit-neon">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-lg border border-pit-neon/25 bg-pit-neon/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-pit-neon/85">
                    {meta.label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-pit-ink/70">{shortDescription}</p>
                <div className="mt-5 grid gap-2">
                  {meta.bullets.slice(0, 2).map((bullet) => (
                    <span key={bullet} className="flex items-center gap-2 text-xs font-medium text-pit-ink/70">
                      <CheckCircle2 className="size-3.5 shrink-0 text-pit-neon" aria-hidden="true" />
                      {bullet}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-9 flex justify-center">
          <ButtonLink href="/productos" icon={ArrowRight}>
            {content.homePage.productsCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ content }) {
  useScrollAnimations();

  return (
    <>
      <Hero content={content} />
      <AboutSummary content={content} />
      <ServicesSummary content={content} />
      <ProductsSummary content={content} />
      <Contact content={content} />
    </>
  );
}
