export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-pit-black px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="circuit-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(57,255,136,0.12),transparent_24rem),radial-gradient(circle_at_80%_18%,rgba(84,230,255,0.07),transparent_22rem),linear-gradient(180deg,rgba(3,6,4,0.9),rgba(5,9,7,0.98))]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-pit-neon" data-animate="up">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl"
          data-animate="up"
          data-animate-distance="28"
        >
          {title}
        </h1>
        {children ? (
          <p
            className="mt-5 max-w-3xl text-base leading-8 text-pit-ink/[0.78] sm:text-lg"
            data-animate="up"
            data-animate-distance="32"
          >
            {children}
          </p>
        ) : null}
      </div>
    </section>
  );
}
