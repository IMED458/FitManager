import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FaqSectionProps {
  lang: Language;
  onOpenDemo: () => void;
}

export function FaqSection({ lang, onOpenDemo }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const t = translations[lang].faq;
  const isKa = lang === 'ka';

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-[#E4E5E2]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#111315]" />
            <span>{isKa ? 'კითხვა-პასუხი' : 'FAQ'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-[#E4E5E2] border-y border-[#E4E5E2]">
          {t.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4 sm:py-5 transition-colors">
                <button
                  type="button"
                  id={`faq-toggle-${index}`}
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] rounded-lg p-1"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#111315] group-hover:text-black">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#111315] text-white border-[#111315]' : 'text-[#64696F]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 pr-6 text-sm text-[#64696F] leading-relaxed pl-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help prompt footer */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-[#111315]">
              {isKa ? 'ვერ იპოვე სასურველი პასუხი?' : 'Still have questions?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#64696F] mt-0.5">
              {isKa
                ? 'დაჯავშნე 15-წუთიანი პერსონალური ონლაინ დემო ჩვენს ექსპერტთან.'
                : 'Book a 15-minute 1-on-1 walkthrough with our fitness systems expert.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenDemo}
            className="px-5 py-2.5 rounded-xl bg-[#111315] hover:bg-black text-white font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center gap-1.5"
          >
            <span>{isKa ? 'დემოს დაჯავშნა' : 'Book a Demo'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
