const serviceVisuals = ['paginas-web', 'software-medida', 'automatizacion', 'auditorias-red'];

/** Shared artwork across the home summaries and full service/product cards. */
export default function CardVisual({ productId, serviceIndex, alt, spacious = false }) {
  const visual = productId ?? serviceVisuals[serviceIndex];

  return (
    <div className={`card-visual ${spacious ? 'card-visual--spacious' : ''}`}>
      <img
        src={`/visuals/${visual}.webp`}
        srcSet={`/visuals/${visual}-480.webp 480w, /visuals/${visual}.webp 960w`}
        sizes={spacious
          ? '(min-width: 1280px) 620px, (min-width: 768px) 48vw, 100vw'
          : '(min-width: 1280px) 300px, (min-width: 768px) 48vw, (min-width: 640px) 50vw, 100vw'}
        width="960"
        height="640"
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}
