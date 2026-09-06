import { X, Check, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ProblemSectionProps {
  lang: Language;
  onOpenTrial: () => void;
}

export function ProblemSection({ lang, onOpenTrial }: ProblemSectionProps) {
  const t = translations[lang].problem;

  return (
    <section
      id="problem-section"
      className="py-20 lg:py-28 bg-[#FAFAF8]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ka' ? 'ოპერაციული გამოწვევა' : 'Operational Reality'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Before / After Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Before Fit Manager Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#E4E5E2] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-400" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                  {t.beforeTitle}
                </span>
                <span className="text-xs text-[#64696F]">
                  {lang === 'ka' ? 'ძველი მეთოდი' : 'Outdated Method'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#111315] mt-3">
                {t.beforeSubtitle}
              </h3>

              <ul className="mt-6 space-y-3.5">
                {t.beforeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#64696F]">
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E4E5E2] text-xs text-[#64696F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>
                {lang === 'ka'
                  ? 'საშუალოდ 8-12 საათი იკარგება კვირაში რუტინულ ადმინისტრირებაზე'
                  : '8-12 hours wasted every week on repetitive manual admin tasks'}
              </span>
            </div>
          </div>

          {/* With Fit Manager Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#111315] text-white border border-[#1D2125] shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7E529]" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111315] bg-[#B7E529] px-2.5 py-1 rounded-md">
                  {t.afterTitle}
                </span>
                <span className="text-xs text-white/60">
                  {lang === 'ka' ? 'თანამედროვე SaaS' : 'Modern Gym OS'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mt-3">
                {t.afterSubtitle}
              </h3>

              <ul className="mt-6 space-y-3.5">
                {t.afterItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/90 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-white/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B7E529] animate-pulse" />
                <span>
                  {lang === 'ka'
                    ? '100% ავტომატიზაცია და უშეცდომო ოპერაციები'
                    : '100% automated routines with real-time sync'}
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenTrial}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B7E529] hover:underline"
              >
                <span>{lang === 'ka' ? 'გამოცადე სისტემა' : 'Try the Difference'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
