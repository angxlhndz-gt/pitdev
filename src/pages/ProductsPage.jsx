import { MessageCircle } from 'lucide-react';
import ButtonLink from '../components/ButtonLink.jsx';
import PageHero from '../components/PageHero.jsx';
import Products from '../components/Products.jsx';
import { getWhatsAppUrl } from '../config/site.js';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

function ProductsCta({ content }) {
  return (
    <section className="relative border-t border-white/10 bg-pit-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-pit-neon/25 bg-pit-panel/[0.88] p-6 text-center shadow-panel sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-9 lg:text-left">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(57,255,136,0.16),transparent_18rem),linear-gradient(135deg,rgba(57,255,136,0.09),rgba(84,230,255,0.035)_44%,rgba(3,6,4,0.94))]"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-2xl font-bold text-white sm:text-3xl">{content.productsPage.ctaTitle}</p>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-pit-ink/[0.74] sm:text-base lg:mx-0">
            {content.productsPage.ctaDescription}
          </p>
        </div>
        <ButtonLink
          href={getWhatsAppUrl()}
          icon={MessageCircle}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-6 w-full px-6 sm:mx-auto sm:w-auto lg:mx-0 lg:mt-0 lg:shrink-0"
        >
          {content.productsPage.ctaButton}
        </ButtonLink>
      </div>
    </section>
  );
}

export default function ProductsPage({ content }) {
  useScrollAnimations();

  const productsContent = {
    ...content,
    productsSection: {
      ...content.productsSection,
      eyebrow: content.productsPage.eyebrow,
      title: content.productsPage.title,
      description: content.productsPage.description,
    },
  };

  return (
    <>
      <PageHero eyebrow={content.productsPage.eyebrow} title={content.productsPage.title}>
        {content.productsPage.description}
      </PageHero>
      <Products content={productsContent} variant="spacious" showHeader={false} />
      <ProductsCta content={content} />
    </>
  );
}
