import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { site } from '../config/site.js';

const socials = [
  {
    label: 'WhatsApp',
    href: site.social.whatsapp,
    icon: FaWhatsapp,
  },
  {
    label: 'Facebook',
    href: site.social.facebook,
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    href: site.social.instagram,
    icon: FaInstagram,
  },
];

const getFooterSocials = (labels) => [
  {
    label: 'Instagram',
    href: site.social.instagram,
    icon: FaInstagram,
    text: '@pitdev.gt',
  },
  {
    label: 'Facebook',
    href: site.social.facebook,
    icon: FaFacebookF,
    text: 'PitDev',
  },
  {
    label: 'WhatsApp',
    href: site.social.whatsapp,
    icon: FaWhatsapp,
    text: '+502 4963 8382',
  },
  {
    label: labels?.emailLabel ?? 'Correo',
    href: 'mailto:pitdev.gt@gmail.com',
    icon: FaEnvelope,
    text: 'pitdev.gt@gmail.com',
  },
];

export default function SocialLinks({ className = '', iconClassName = '', labels, showText = false }) {
  const links = showText ? getFooterSocials(labels) : socials;
  const wrapperClassName = showText
    ? `flex flex-wrap items-center gap-3 ${className}`
    : `flex items-center gap-2 ${className}`;
  const linkClassName = showText
    ? `focus-ring inline-flex min-h-10 max-w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-pit-ink transition hover:border-pit-neon/60 hover:bg-pit-neon/10 hover:text-pit-neon sm:px-4 ${iconClassName}`
    : `focus-ring grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-pit-ink transition hover:border-pit-neon/60 hover:bg-pit-neon/10 hover:text-pit-neon ${iconClassName}`;

  return (
    <div className={wrapperClassName} aria-label={labels?.ariaLabel ?? 'Redes sociales de PitDev'}>
      {links.map(({ label, href, icon: Icon, text }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={text ? `${label}: ${text}` : label}
          title={label}
          className={linkClassName}
        >
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          {text ? <span className="whitespace-nowrap">{text}</span> : null}
        </a>
      ))}
    </div>
  );
}
