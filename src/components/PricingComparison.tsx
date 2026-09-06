import { Check, Minus } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PricingComparisonProps {
  lang: Language;
}

export function PricingComparison({ lang }: PricingComparisonProps) {
  const t = translations[lang].comparison;
  const p = translations[lang].pricing;

  const renderValue = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="flex justify-center">
          <div className="w-5 h-5 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Minus className="w-4 h-4 text-[#A0A4A8]" />
        </div>
      );
    }
    return <span className="font-semibold text-xs text-[#111315]">{val}</span>;
  };

  return (
    <div id="pricing-comparison" className="bg-white rounded-2xl border border-[#E4E5E2] p-6 sm:p-8 shadow-xs">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
          {p.compareHeading}
        </h3>
        <p className="text-xs sm:text-sm text-[#64696F] mt-1.5">
          {p.compareSubheading}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b-2 border-[#E4E5E2]">
              <th className="py-3.5 px-4 text-xs font-bold text-[#64696F] uppercase tracking-wider w-2/5">
                {t.featureCol}
              </th>
              <th className="py-3.5 px-4 text-center text-sm font-black text-[#111315] w-1/5">
                BASIC
                <div className="text-[11px] font-normal text-[#64696F]">99 ₾ / თვე</div>
              </th>
              <th className="py-3.5 px-4 text-center text-sm font-black text-[#111315] w-1/5 bg-[#FAFAF8] rounded-t-lg">
                GROWTH
                <div className="text-[11px] font-normal text-[#64696F]">179 ₾ / თვე</div>
              </th>
              <th className="py-3.5 px-4 text-center text-sm font-black text-[#111315] w-1/5">
                PRO
                <div className="text-[11px] font-normal text-[#64696F]">299 ₾ / თვე</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E5E2] text-xs">
            {t.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#FAFAF8]/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[#151719]">
                  {row.name}
                </td>
                <td className="py-3.5 px-4 text-center text-[#64696F]">
                  {renderValue(row.basic)}
                </td>
                <td className="py-3.5 px-4 text-center bg-[#FAFAF8]/50">
                  {renderValue(row.growth)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {renderValue(row.pro)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
