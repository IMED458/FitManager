import { Users, QrCode, CreditCard, BarChart3, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TrustStripProps {
  lang: Language;
}

export function TrustStrip({ lang }: TrustStripProps) {
  const t = translations[lang].trust;

  const icons = [
    <Users key="users" className="w-5 h-5 text-[#111315]" />,
    <QrCode key="qr" className="w-5 h-5 text-[#A8CF2D]" />,
    <CreditCard key="card" className="w-5 h-5 text-[#111315]" />,
    <BarChart3 key="chart" className="w-5 h-5 text-[#111315]" />,
  ];

  return (
    <section
      id="trust-strip"
      className="py-12 border-y border-[#E4E5E2] bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#111315]">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.benefits.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] transition-colors hover:border-[#111315]"
            >
              <div className="p-2.5 rounded-lg bg-white border border-[#E4E5E2] shrink-0 shadow-2xs">
                {icons[index]}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111315] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64696F] mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
