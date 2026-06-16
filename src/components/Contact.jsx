import { ExternalLink, MessageCircle, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { getWhatsAppUrl } from '../config/site.js';
import ButtonLink from './ButtonLink.jsx';
import SectionHeader from './SectionHeader.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Contact({ content }) {
  return (
    <section id="contacto" className="relative bg-pit-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 circuit-grid opacity-35" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow={content.contact.eyebrow} title={content.contact.title}>
          {content.contact.description}
        </SectionHeader>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]" data-stagger>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6" data-stagger-item>
            <h3 className="text-2xl font-bold text-white">{content.contact.directTitle}</h3>
            <p className="mt-4 leading-8 text-pit-ink/[0.72]">
              {content.contact.directDescription}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <ButtonLink
                href={getWhatsAppUrl()}
                icon={MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.contact.whatsappButton}
              </ButtonLink>
              <ButtonLink href={content.social.instagram} icon={FaInstagram} variant="secondary" target="_blank" rel="noopener noreferrer">
                {content.contact.instagramButton}
              </ButtonLink>
              <ButtonLink href={content.social.facebook} icon={FaFacebookF} variant="secondary" target="_blank" rel="noopener noreferrer">
                {content.contact.facebookButton}
              </ButtonLink>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-pit-neon">
                {content.contact.socialEyebrow}
              </p>
              <SocialLinks labels={content.socialLinks} />
            </div>
          </div>

          <form className="rounded-lg border border-pit-neon/20 bg-pit-panel/[0.84] p-5 shadow-panel md:p-7" data-stagger-item>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-pit-ink">{content.contact.nameLabel}</span>
                <input
                  name="name"
                  type="text"
                  required
                  className="focus-ring w-full rounded-lg border border-white/10 bg-black/[0.35] px-4 py-3 text-white placeholder:text-pit-ink/[0.35] focus:border-pit-neon"
                  placeholder={content.contact.namePlaceholder}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-pit-ink">{content.contact.phoneLabel}</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="focus-ring w-full rounded-lg border border-white/10 bg-black/[0.35] px-4 py-3 text-white placeholder:text-pit-ink/[0.35] focus:border-pit-neon"
                  placeholder={content.contact.phonePlaceholder}
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-pit-ink">{content.contact.projectTypeLabel}</span>
              <select
                name="projectType"
                required
                className="focus-ring w-full rounded-lg border border-white/10 bg-black/[0.35] px-4 py-3 text-white focus:border-pit-neon"
                defaultValue=""
              >
                <option value="" disabled>
                  {content.contact.projectTypePlaceholder}
                </option>
                {content.services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-pit-ink">{content.contact.messageLabel}</span>
              <textarea
                name="message"
                rows="5"
                required
                className="focus-ring w-full resize-none rounded-lg border border-white/10 bg-black/[0.35] px-4 py-3 text-white placeholder:text-pit-ink/[0.35] focus:border-pit-neon"
                placeholder={content.contact.messagePlaceholder}
              />
            </label>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-pit-neon bg-pit-neon px-5 py-3 text-sm font-bold text-pit-black shadow-glow transition hover:bg-pit-mint sm:w-auto"
            >
              <Send className="size-4" aria-hidden="true" />
              <span>{content.contact.submitButton}</span>
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-pit-ink/[0.55]">
              <ExternalLink className="size-4" aria-hidden="true" />
              {content.contact.whatsappNote}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
