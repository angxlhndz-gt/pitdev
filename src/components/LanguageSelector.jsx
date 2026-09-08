import { useEffect, useRef, useState } from 'react';
import { languageOptions } from '../config/site.js';

export default function LanguageSelector({
  language,
  onLanguageChange,
  labels,
  variant = 'desktop',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const currentLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectLanguage = (nextLanguage) => {
    onLanguageChange(nextLanguage);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-pit-ink">{labels.label}:</span>
          <div className="flex items-center gap-2" aria-label={labels.ariaLabel}>
            {languageOptions.map((option) => {
              const isSelected = option.code === currentLanguage.code;

              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => selectLanguage(option.code)}
                  aria-pressed={isSelected}
                  className={`focus-ring min-h-11 rounded-lg border px-4 text-sm font-bold transition ${
                    isSelected
                      ? 'border-pit-neon bg-pit-neon text-pit-black shadow-glow'
                      : 'border-white/10 bg-white/[0.04] text-pit-ink hover:border-pit-neon/60 hover:bg-pit-neon/10 hover:text-pit-neon'
                  }`}
                >
                  {option.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="focus-ring inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-pit-ink transition hover:border-pit-neon/70 hover:bg-pit-neon/10 hover:text-pit-neon hover:shadow-glow"
        aria-label={labels.ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span aria-hidden="true">🌐</span>
        <span>{currentLanguage.shortLabel}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label={labels.menuAriaLabel}
          className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-pit-black/95 p-1 shadow-panel backdrop-blur-xl"
        >
          {languageOptions.map((option) => {
            const isSelected = option.code === currentLanguage.code;

            return (
              <button
                key={option.code}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => selectLanguage(option.code)}
                  className={`focus-ring flex min-h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-pit-neon/10 text-pit-neon'
                    : 'text-pit-ink hover:bg-pit-neon/10 hover:text-pit-neon'
                }`}
              >
                <span>{option.label}</span>
                <span className="text-xs font-bold text-pit-ink/55">{option.shortLabel}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
