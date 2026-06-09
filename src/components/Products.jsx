import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { site } from '../config/site.js';
import SectionHeader from './SectionHeader.jsx';

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(null);

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
        <SectionHeader eyebrow="Productos" title="Productos">
          Soluciones listas para negocios que necesitan orden, control y crecimiento.
        </SectionHeader>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {site.products.map(({ id, name, shortDescription, detail, icon: Icon }) => {
            const isOpen = activeProduct === id;
            const detailsId = `product-details-${id}`;

            return (
              <article
                key={id}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={detailsId}
                onClick={() => toggleProduct(id)}
                onKeyDown={(event) => handleProductKeyDown(event, id)}
                className={`group flex h-full cursor-pointer flex-col rounded-lg border bg-white/[0.035] p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-pit-neon/[0.55] hover:bg-pit-neon/[0.055] focus-ring ${
                  isOpen ? 'border-pit-neon/70 bg-pit-neon/[0.055] shadow-glow' : 'border-white/10'
                }`}
              >
                <div className="mb-5 grid size-12 place-items-center rounded-lg border border-pit-neon/[0.28] bg-pit-neon/10 text-pit-neon transition group-hover:shadow-glow">
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="mt-3 text-sm leading-7 text-pit-ink/70">{shortDescription}</p>

                  <div className="mt-5 flex items-center justify-between gap-3 text-sm font-bold text-pit-neon">
                    <span>{isOpen ? 'Ver menos' : 'Ver más'}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    id={detailsId}
                    aria-hidden={!isOpen}
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="mt-5 border-t border-pit-neon/20 pt-5">
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
