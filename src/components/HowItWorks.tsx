import { UserPlus, CreditCard, ScanLine, LineChart, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HowItWorksProps {
  lang: Language;
  onOpenTrial: () => void;
}

export function HowItWorks({ lang, onOpenTrial }: HowItWorksProps) {
  const t = translations[lang].howItWorks;

  const stepIcons = [
    <UserPlus key="1" className="w-6 h-6 text-[#111315]" />,
    <CreditCard key="2" className="w-6 h-6 text-[#111315]" />,
    <ScanLine key="3" className="w-6 h-6 text-[#A8CF2D]" />,
    <LineChart key="4" className="w-6 h-6 text-[#111315]" />,
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#FAFAF8] border-t border-[#E4E5E2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E529]" />
            <span>{lang === 'ka' ? 'მარტივი ინტეგრაცია' : 'Simple Workflow'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4-Step Process: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white border border-[#E4E5E2] shadow-xs flex flex-col justify-between hover:border-[#111315] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-[#E4E5E2] group-hover:text-[#B7E529] transition-colors font-mono">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center transition-colors group-hover:bg-[#111315] group-hover:text-white">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#111315]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#64696F] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E4E5E2] flex items-center text-xs text-[#111315] font-semibold">
                <span>{lang === 'ka' ? 'ნაბიჯი' : 'Stage'} {idx + 1}</span>
                <span className="ml-auto text-[#A8CF2D]">●●●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
