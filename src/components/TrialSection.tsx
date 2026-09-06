import { Check, ArrowRight, ShieldCheck, Zap, HeadphonesIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TrialSectionProps {
  lang: Language;
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export function TrialSection({ lang, onOpenTrial, onOpenDemo }: TrialSectionProps) {
  const t = translations[lang].trialBanner;
  const isKa = lang === 'ka';

  return (
    <section id="trial-banner" className="py-16 sm:py-20 bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#111315] text-white border border-[#1D2125] shadow-2xl relative overflow-hidden">
          {/* Subtle background glow - NOT gaudy/purple, just restrained lime */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#B7E529]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Core Value Proposition Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#B7E529] mb-5 tracking-wide">
              <span>{t.coreValue}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {t.heading}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              {t.text}
            </p>

            {/* 3 Key Benefits with Checkmarks */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{t.benefit1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{t.benefit2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{t.benefit3}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                id="trial-banner-primary-btn"
                onClick={onOpenTrial}
                className="px-8 py-3.5 text-sm sm:text-base font-bold bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="trial-banner-secondary-btn"
                onClick={onOpenDemo}
                className="px-8 py-3.5 text-sm sm:text-base font-semibold bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-xl transition-all flex items-center justify-center"
              >
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
