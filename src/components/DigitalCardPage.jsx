import { useEffect } from 'react';
import { Download, ExternalLink, Globe2, WalletCards } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const cardUrl = 'https://pitdevgt.vercel.app/card';
const contactFileUrl = '/pitdev-contact.vcf';
const walletPassUrl = '/pitdev-wallet.pkpass';

const socialLinks = [
  {
    label: 'WhatsApp',
    detail: '+502 4963 8382',
    href: 'https://wa.me/50249638382',
    icon: FaWhatsapp,
    featured: true,
  },
  {
    label: 'Instagram',
    detail: '@pitdev.gt',
    href: 'https://www.instagram.com/pitdev.gt',
    icon: FaInstagram,
  },
  {
    label: 'Facebook',
    detail: 'PitDev',
    href: 'https://www.facebook.com/profile.php?id=61590269683371',
    icon: FaFacebookF,
  },
  {
    label: 'TikTok',
    detail: 'pitdev_gt',
    href: 'https://www.tiktok.com/@pitdev_gt',
    icon: FaTiktok,
  },
  {
    label: 'Ver página web',
    detail: 'pitdevgt.vercel.app',
    href: 'https://pitdevgt.vercel.app/',
    icon: Globe2,
  },
];

function ActionLink({
  href,
  icon: Icon,
  label,
  detail,
  featured = false,
  download,
  trailingIcon: TrailingIcon = ExternalLink,
  className = '',
}) {
  const baseStyles =
    'focus-ring group flex min-h-16 w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition duration-300 hover:-translate-y-0.5';
  const variantStyles = featured
    ? 'border-pit-neon bg-pit-neon text-pit-black shadow-glow hover:bg-pit-mint'
    : 'border-white/10 bg-white/[0.045] text-white hover:border-pit-neon/60 hover:bg-pit-neon/10';
  const iconStyles = featured
    ? 'border-pit-black/10 bg-pit-black/10 text-pit-black'
    : 'border-pit-neon/20 bg-pit-neon/10 text-pit-neon group-hover:border-pit-neon/50';
  const detailStyles = featured ? 'text-pit-black/70' : 'text-pit-ink/[0.58]';

  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span className={`grid size-11 shrink-0 place-items-center rounded-lg border ${iconStyles}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black leading-5">{label}</span>
        {detail ? <span className={`block truncate text-xs font-semibold ${detailStyles}`}>{detail}</span> : null}
      </span>
      {TrailingIcon ? <TrailingIcon className="size-4 shrink-0 opacity-70" aria-hidden="true" /> : null}
    </a>
  );
}

function WalletAction() {
  return (
    <ActionLink
      href={walletPassUrl}
      icon={WalletCards}
      label="Agregar a Apple Wallet"
      trailingIcon={Download}
    />
  );
}

export default function DigitalCardPage() {
  useEffect(() => {
    document.documentElement.lang = 'es';
    document.title = 'Tarjeta digital PitDev';

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      'content',
      'Tarjeta digital de PitDev para desarrollo web, software a medida y automatización.',
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-pit-black text-white">
      <div className="circuit-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,136,0.18),transparent_22rem),radial-gradient(circle_at_82%_72%,rgba(84,230,255,0.08),transparent_20rem)]"
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="tech-border scanline flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-panel backdrop-blur-xl sm:p-6">
            <div>
              <div className="mx-auto grid size-24 place-items-center rounded-lg border border-pit-neon/20 bg-pit-black/80 shadow-glow sm:size-28">
                <img
                  src="/logo.png"
                  alt="Logo de PitDev"
                  className="h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(57,255,136,0.24)] sm:h-24 sm:w-24"
                />
              </div>

              <div className="mt-6 text-center">
                <h1 className="text-4xl font-black tracking-normal text-white sm:text-5xl">PitDev</h1>
                <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-7 text-pit-ink/[0.78] sm:text-base">
                  Desarrollo web · Software a medida · Automatización
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 border-t border-pit-neon/[0.14] pt-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pit-neon">
                Contacto
              </p>
              <div className="grid gap-2 text-sm font-semibold text-pit-ink/[0.76]">
                <span>WhatsApp: +502 4963 8382</span>
                <span>Instagram: @pitdev.gt</span>
                <span>Facebook: PitDev</span>
                <span>TikTok: pitdev_gt</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-lg border border-white/10 bg-pit-panel/[0.82] p-4 shadow-panel backdrop-blur-xl sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {socialLinks.map((link) => (
                  <ActionLink key={link.label} {...link} />
                ))}
                <ActionLink
                  href={contactFileUrl}
                  icon={Download}
                  label="Guardar contacto"
                  detail="pitdev-contact.vcf"
                  download="pitdev-contact.vcf"
                  trailingIcon={Download}
                  featured
                />
                <div className="sm:col-span-2">
                  <WalletAction />
                </div>
              </div>
            </div>

            <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-panel backdrop-blur-xl sm:grid-cols-[auto_1fr] sm:items-center sm:p-5">
              <div className="mx-auto rounded-lg border border-white/[0.15] bg-white p-3 shadow-glow sm:mx-0">
                <img
                  src="/pitdev-card-qr.svg"
                  alt="Código QR de la tarjeta digital de PitDev"
                  className="aspect-square w-44 object-contain sm:w-52"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pit-neon">
                  QR
                </p>
                <p className="mt-2 break-words text-sm font-semibold leading-6 text-pit-ink/[0.72]">{cardUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
