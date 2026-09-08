import { useEffect } from 'react';
import { Download, ExternalLink, Globe2, QrCode, WalletCards } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const cardUrl = 'https://pitdevgt.vercel.app/card';
const cardUrlDisplay = 'pitdevgt.vercel.app/card';
const contactFileUrl = '/pitdev-contact.vcf';
const walletPassUrl = '/pitdev-wallet.pkpass';

const primaryActions = [
  {
    label: 'WhatsApp',
    detail: '+502 4963 8382',
    href: 'https://wa.me/50249638382',
    icon: FaWhatsapp,
    tone: 'whatsapp',
  },
  {
    label: 'Guardar contacto',
    detail: 'pitdev-contact.vcf',
    href: contactFileUrl,
    icon: Download,
    download: 'pitdev-contact.vcf',
    trailingIcon: Download,
    tone: 'contact',
  },
  {
    label: 'Agregar a Apple Wallet',
    detail: 'pitdev-wallet.pkpass',
    href: walletPassUrl,
    icon: WalletCards,
    trailingIcon: Download,
    tone: 'wallet',
  },
];

const secondaryActions = [
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
  tone = 'secondary',
  download,
  trailingIcon: TrailingIcon = ExternalLink,
  className = '',
}) {
  const isSecondary = tone === 'secondary';
  const baseStyles = isSecondary
    ? 'focus-ring group flex min-h-12 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center transition duration-300 hover:-translate-y-0.5'
    : 'focus-ring group flex min-h-[4.75rem] w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition duration-300 hover:-translate-y-0.5';
  const variants = {
    whatsapp:
      'border-pit-neon bg-pit-neon text-pit-black shadow-[0_18px_42px_rgba(57,255,136,0.2)] hover:bg-pit-mint',
    contact:
      'border-white/20 bg-white text-pit-black shadow-[0_16px_34px_rgba(255,255,255,0.08)] hover:border-pit-mint hover:bg-pit-ink',
    wallet:
      'border-pit-neon/35 bg-[linear-gradient(135deg,rgba(57,255,136,0.17),rgba(255,255,255,0.055))] text-white shadow-[0_16px_38px_rgba(0,0,0,0.28)] hover:border-pit-neon hover:bg-pit-neon/15',
    secondary:
      'border-white/10 bg-white/[0.045] text-white hover:border-pit-neon/55 hover:bg-pit-neon/10',
  };
  const iconVariants = {
    whatsapp: 'border-pit-black/10 bg-pit-black/10 text-pit-black',
    contact: 'border-pit-black/10 bg-pit-black/10 text-pit-black',
    wallet: 'border-pit-neon/25 bg-pit-neon/10 text-pit-neon group-hover:border-pit-neon/60',
    secondary: 'border-pit-neon/20 bg-pit-neon/10 text-pit-neon group-hover:border-pit-neon/50',
  };
  const detailStyles = tone === 'whatsapp' || tone === 'contact' ? 'text-pit-black/70' : 'text-pit-ink/[0.58]';

  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      className={`${baseStyles} ${variants[tone]} ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-lg border ${isSecondary ? 'size-9' : 'size-11'} ${iconVariants[tone]}`}
      >
        <Icon className={isSecondary ? 'size-4' : 'size-5'} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block font-black leading-5 ${isSecondary ? 'text-xs sm:text-sm' : 'text-sm'}`}>
          {label}
        </span>
        {detail && !isSecondary ? (
          <span className={`block truncate text-xs font-semibold ${detailStyles}`}>{detail}</span>
        ) : null}
      </span>
      {!isSecondary && TrailingIcon ? (
        <TrailingIcon className="size-4 shrink-0 opacity-70" aria-hidden="true" />
      ) : null}
    </a>
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
      <div className="circuit-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(57,255,136,0.12),transparent_26%,transparent_70%,rgba(84,230,255,0.07)),linear-gradient(180deg,rgba(3,6,4,0.2),#030604_78%)]"
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="tech-border scanline relative w-full overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)_44%,rgba(57,255,136,0.055))] shadow-panel backdrop-blur-xl">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(57,255,136,0.85),transparent)]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="flex flex-col gap-7 p-5 sm:p-7 lg:p-8">
              <header className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <div className="grid size-24 shrink-0 place-items-center rounded-lg border border-pit-neon/25 bg-pit-black/80 shadow-glow sm:size-28">
                  <img
                    src="/logo.png"
                    alt="Logo de PitDev"
                    className="h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(57,255,136,0.24)] sm:h-24 sm:w-24"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pit-neon">
                    Tarjeta digital
                  </p>
                  <h1 className="mt-2 text-4xl font-black tracking-normal text-white sm:text-5xl">PitDev</h1>
                  <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-pit-ink/[0.78] sm:text-base">
                    Desarrollo web · Software a medida · Automatización
                  </p>
                </div>
              </header>

              <div className="h-px w-full bg-[linear-gradient(90deg,rgba(57,255,136,0.32),rgba(255,255,255,0.08),transparent)]" />

              <div className="grid gap-3 lg:grid-cols-3">
                {primaryActions.map((action) => (
                  <ActionLink key={action.label} {...action} />
                ))}
              </div>

              <div className="grid gap-3">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pit-neon/90">
                  Redes y web
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {secondaryActions.map((link) => (
                    <ActionLink key={link.label} {...link} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-white/10 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-pit-neon/20 bg-pit-neon/10 px-3 py-2 text-pit-neon">
                  <QrCode className="size-4" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">QR</span>
                </div>

                <p className="max-w-64 text-lg font-black leading-7 text-white">
                  Escanea y guarda nuestra tarjeta digital
                </p>

                <div className="mt-5 rounded-lg border border-white/[0.16] bg-white p-3 shadow-[0_18px_46px_rgba(0,0,0,0.34),0_0_30px_rgba(57,255,136,0.16)]">
                  <img
                    src="/pitdev-card-qr.svg"
                    alt="Código QR de la tarjeta digital de PitDev"
                    className="aspect-square w-44 object-contain sm:w-52 lg:w-48"
                  />
                </div>

                <a
                  href={cardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 break-all rounded-lg px-2 py-1 text-sm font-bold leading-6 text-pit-ink/[0.72] transition hover:text-pit-neon"
                >
                  {cardUrlDisplay}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
