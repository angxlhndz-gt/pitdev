import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../config/site.js';

export default function FloatingWhatsApp({ content }) {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={content.floatingWhatsApp.ariaLabel}
      title="WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-lg border border-pit-neon bg-pit-neon text-pit-black shadow-glow transition hover:-translate-y-1 hover:bg-pit-mint"
    >
      <FaWhatsapp className="size-7" aria-hidden="true" />
    </a>
  );
}
