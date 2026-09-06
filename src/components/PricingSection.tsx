import { useState } from 'react';
import { Check, Minus, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { PricingComparison } from './PricingComparison';

interface PricingSectionProps {
  lang: Language;
  onOpenTrial: (planName?: string) => void;
  onOpenDemo: () => void;
}

export function PricingSection({ lang, onOpenTrial, onOpenDemo }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);
  const t = translations[lang].pricing;
  const isKa = lang === 'ka';

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#FAFAF8] border-t border-[#E4E5E2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E529]" />
            <span>{isKa ? 'გამჭვირვალე ტარიფები' : 'Transparent Pricing'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.subheading}
          </p>

          {/* Billing Interval Switcher */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 bg-white border border-[#E4E5E2] rounded-xl shadow-2xs">
              <button
                type="button"
                id="billing-monthly-btn"
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  !isYearly
                    ? 'bg-[#111315] text-white shadow-xs'
                    : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                {t.monthly}
              </button>
              <button
                type="button"
                id="billing-yearly-btn"
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isYearly
                    ? 'bg-[#111315] text-white shadow-xs'
                    : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                <span>{t.yearly}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E529] text-[#111315]">
                  {t.twoMonthsFree}
                </span>
              </button>
            </div>

            {/* Annual calculation note */}
            <span className="text-xs text-[#64696F] font-medium">
              💡 {t.annualNote}
            </span>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plan 1: BASIC */}
          <div className="rounded-2xl p-6 bg-white border border-[#E4E5E2] shadow-xs flex flex-col justify-between hover:border-[#111315] transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#64696F]">
                {t.plans.basic.name}
              </div>
              <div className="text-sm font-bold text-[#111315] mt-1">
                {t.plans.basic.tagline}
              </div>

              <div className="mt-4 pb-4 border-b border-[#E4E5E2]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#111315] tracking-tight">
                    {isYearly ? '990 ₾' : '99 ₾'}
                  </span>
                  <span className="text-xs text-[#64696F] font-semibold">
                    {isYearly ? t.perYear : t.perMonth}
                  </span>
                </div>
                <p className="text-xs text-[#64696F] mt-2 leading-relaxed">
                  {t.plans.basic.desc}
                </p>
              </div>

              {/* Limits */}
              <div className="py-3.5 border-b border-[#E4E5E2] space-y-1.5">
                {t.plans.basic.limits.map((lim, idx) => (
                  <div key={idx} className="text-xs font-bold text-[#111315] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111315]" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div className="mt-4">
                <div className="text-[11px] font-bold text-[#64696F] uppercase tracking-wider mb-2.5">
                  {t.includesHeading}
                </div>
                <ul className="space-y-2 text-xs text-[#151719]">
                  {t.plans.basic.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#A8CF2D] shrink-0 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              {t.plans.basic.notIncluded && (
                <div className="mt-4 pt-3 border-t border-[#E4E5E2]">
                  <div className="text-[11px] font-bold text-[#64696F] uppercase tracking-wider mb-2">
                    {t.notIncludedHeading}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#64696F]">
                    {t.plans.basic.notIncluded.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Minus className="w-3.5 h-3.5 text-[#64696F] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E5E2]">
              <button
                type="button"
                onClick={() => onOpenTrial('BASIC')}
                className="w-full py-2.5 rounded-xl border border-[#E4E5E2] bg-white hover:bg-[#FAFAF8] text-[#111315] font-bold text-xs sm:text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315]"
              >
                {t.plans.basic.cta}
              </button>
            </div>
          </div>

          {/* Plan 2: GROWTH (Most Popular - Subtle highlight) */}
          <div className="rounded-2xl p-6 bg-white border-2 border-[#111315] shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#111315] text-[#B7E529] font-bold text-[11px] tracking-wide uppercase shadow-xs">
              {t.mostPopular}
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#111315]">
                {t.plans.growth.name}
              </div>
              <div className="text-sm font-bold text-[#111315] mt-1">
                {t.plans.growth.tagline}
              </div>

              <div className="mt-4 pb-4 border-b border-[#E4E5E2]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#111315] tracking-tight">
                    {isYearly ? '1,790 ₾' : '179 ₾'}
                  </span>
                  <span className="text-xs text-[#64696F] font-semibold">
                    {isYearly ? t.perYear : t.perMonth}
                  </span>
                </div>
                <p className="text-xs text-[#64696F] mt-2 leading-relaxed">
                  {t.plans.growth.desc}
                </p>
              </div>

              {/* Limits */}
              <div className="py-3.5 border-b border-[#E4E5E2] space-y-1.5">
                {t.plans.growth.limits.map((lim, idx) => (
                  <div key={idx} className="text-xs font-bold text-[#111315] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7E529]" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div className="mt-4">
                <div className="text-[11px] font-bold text-[#64696F] uppercase tracking-wider mb-2.5">
                  {t.includesHeading}
                </div>
                <ul className="space-y-2 text-xs text-[#151719] font-medium">
                  {t.plans.growth.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#A8CF2D] shrink-0 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              {t.plans.growth.notIncluded && (
                <div className="mt-4 pt-3 border-t border-[#E4E5E2]">
                  <div className="text-[11px] font-bold text-[#64696F] uppercase tracking-wider mb-2">
                    {t.notIncludedHeading}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#64696F]">
                    {t.plans.growth.notIncluded.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Minus className="w-3.5 h-3.5 text-[#64696F] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E5E2]">
              <button
                type="button"
                onClick={() => onOpenTrial('GROWTH')}
                className="w-full py-2.5 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-xs sm:text-sm transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315]"
              >
                {t.plans.growth.cta}
              </button>
            </div>
          </div>

          {/* Plan 3: PRO */}
          <div className="rounded-2xl p-6 bg-white border border-[#E4E5E2] shadow-xs flex flex-col justify-between hover:border-[#111315] transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#64696F]">
                {t.plans.pro.name}
              </div>
              <div className="text-sm font-bold text-[#111315] mt-1">
                {t.plans.pro.tagline}
              </div>

              <div className="mt-4 pb-4 border-b border-[#E4E5E2]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#111315] tracking-tight">
                    {isYearly ? '2,990 ₾' : '299 ₾'}
                  </span>
                  <span className="text-xs text-[#64696F] font-semibold">
                    {isYearly ? t.perYear : t.perMonth}
                  </span>
                </div>
                <p className="text-xs text-[#64696F] mt-2 leading-relaxed">
                  {t.plans.pro.desc}
                </p>
              </div>

              {/* Limits */}
              <div className="py-3.5 border-b border-[#E4E5E2] space-y-1.5">
                {t.plans.pro.limits.map((lim, idx) => (
                  <div key={idx} className="text-xs font-bold text-[#111315] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111315]" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div className="mt-4">
                <div className="text-[11px] font-bold text-[#64696F] uppercase tracking-wider mb-2.5">
                  {t.includesHeading}
                </div>
                <ul className="space-y-2 text-xs text-[#151719]">
                  {t.plans.pro.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#A8CF2D] shrink-0 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E4E5E2]">
              <button
                type="button"
                onClick={() => onOpenTrial('PRO')}
                className="w-full py-2.5 rounded-xl border border-[#E4E5E2] bg-white hover:bg-[#FAFAF8] text-[#111315] font-bold text-xs sm:text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315]"
              >
                {t.plans.pro.cta}
              </button>
            </div>
          </div>

          {/* Plan 4: ENTERPRISE */}
          <div className="rounded-2xl p-6 bg-[#16191C] text-white border border-[#1D2125] shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                {t.plans.enterprise.name}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {t.plans.enterprise.tagline}
              </div>

              <div className="mt-4 pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {t.plans.enterprise.priceText}
                  </span>
                  <span className="text-xs text-white/60 font-semibold">
                    {t.perMonth}
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  {t.plans.enterprise.desc}
                </p>
              </div>

              {/* Limits */}
              <div className="py-3.5 border-b border-white/10 space-y-1.5">
                {t.plans.enterprise.limits.map((lim, idx) => (
                  <div key={idx} className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7E529]" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div className="mt-4">
                <div className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-2.5">
                  {t.includesHeading}
                </div>
                <ul className="space-y-2 text-xs text-white/90">
                  {t.plans.enterprise.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B7E529] shrink-0 stroke-[2.5]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAFAF8] text-[#111315] font-bold text-xs sm:text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.plans.enterprise.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mt-16 sm:mt-20">
          <PricingComparison lang={lang} />
        </div>
      </div>
    </section>
  );
}
