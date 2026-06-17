import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SectionHeader from './SectionHeader.jsx';

export default function Products({ content, variant = 'default', showHeader = true }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const isSpacious = variant === 'spacious';

  const toggleProduct = (id) => {
    setActiveProduct(activeProduct === id ? null : id);
  };

  const handleProductKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleProduct(id);
    }
  };

  return (
    <section id="productos" className="relative border-t border-white/10 bg-[#050907] px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(57,255,136,0.08),transparent_24rem),linear-gradient(180deg,rgba(5,9,7,0.98),rgba(3,6,4,1))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pit-neon/70 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {showHeader ? (
          <SectionHeader eyebrow={content.productsSection.eyebrow} title={content.productsSection.title}>
            {content.productsSection.description}
          </SectionHeader>
        ) : null}

        <div className={isSpacious ? 'grid gap-5 lg:grid-cols-2' : 'grid gap-4 md:grid-cols-2 xl:grid-cols-4'} data-stagger>
          {content.products.map(({ id, name, shortDescription, detail, icon: Icon }) => {
            const isOpen = activeProduct === id;
            const detailsId = `product-details-${id}`;
            const meta = content.productMeta[id];

            return (
              <article
                key={id}
                data-stagger-item
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={detailsId}
                onClick={() => toggleProduct(id)}
                onKeyDown={(event) => handleProductKeyDown(event, id)}
                className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border bg-white/[0.035] shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.62] hover:bg-pit-neon/[0.055] hover:shadow-[0_24px_80px_rgba(57,255,136,0.12)] focus-ring ${
                  isSpacious ? 'min-h-[320px] p-6 sm:p-7' : 'min-h-[360px] p-5'
                } ${
                  isOpen ? 'border-pit-neon/70 bg-pit-neon/[0.06] shadow-glow' : 'border-white/10'
                }`}
              >
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(57,255,136,0.15),transparent_16rem),linear-gradient(180deg,rgba(255,255,255,0.025),transparent)] opacity-0 transition duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="relative mb-5 flex items-start justify-between gap-4">
                  <div className="grid size-12 place-items-center rounded-lg border border-pit-neon/[0.28] bg-pit-neon/10 text-pit-neon transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-glow">
                    <Icon className="size-6 transition duration-300 group-hover:rotate-3" aria-hidden="true" />
                  </div>
                  <span className="rounded-lg border border-pit-neon/25 bg-pit-neon/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-pit-neon/85">
                    {meta.label}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="mt-3 text-sm leading-7 text-pit-ink/70">{shortDescription}</p>

                  <div className="mt-5 grid gap-2">
                    {meta.bullets.map((bullet) => (
                      <span key={bullet} className="flex items-center gap-2 text-xs font-medium text-pit-ink/70">
                        <CheckCircle2 className="size-3.5 shrink-0 text-pit-neon" aria-hidden="true" />
                        {bullet}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-sm font-bold text-pit-neon">
                    <span>{isOpen ? content.productsSection.showLess : content.productsSection.showMore}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    id={detailsId}
                    aria-hidden={!isOpen}
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
                      isOpen ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden border-t border-pit-neon/20 pt-5">
                      <p className="text-sm leading-7 text-pit-ink/[0.76]">{detail}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
