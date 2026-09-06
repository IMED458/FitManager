import { Smartphone, Dumbbell, QrCode, CheckCircle2, Calendar, Award, UserCheck, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PortalsSectionProps {
  lang: Language;
}

export function PortalsSection({ lang }: PortalsSectionProps) {
  const t = translations[lang].portals;
  const isKa = lang === 'ka';

  return (
    <section id="portals" className="py-20 lg:py-28 bg-white border-t border-[#E4E5E2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Split Layout: Member Cabinet (Left) vs Trainer Cabinet (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left: Member Cabinet */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#111315] text-white">
                  {t.member.badge}
                </span>
                <Smartphone className="w-5 h-5 text-[#111315]" />
              </div>

              <h3 className="text-2xl font-bold text-[#111315]">
                {t.member.title}
              </h3>
              <p className="mt-2 text-sm text-[#64696F] leading-relaxed">
                {t.member.desc}
              </p>

              <ul className="mt-6 space-y-2.5">
                {t.member.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#151719] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#A8CF2D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Member Pass Mockup Card */}
            {/* NOTE FOR DEVELOPERS: Easily replaceable with /assets/mobile-member-cabinet.png */}
            <div className="mt-8 p-5 rounded-2xl bg-[#111315] text-white shadow-md max-w-sm mx-auto w-full">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-[#B7E529] tracking-wider uppercase">Fit Member ID</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">Verified</span>
              </div>

              <div className="my-4 flex items-center justify-center p-3 rounded-xl bg-white text-[#111315]">
                <div className="flex flex-col items-center">
                  <QrCode className="w-28 h-28 text-[#111315]" />
                  <span className="text-[10px] font-mono text-[#64696F] mt-1">SCAN AT FRONT DESK</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-white text-sm">{t.member.mobilePreviewText}</div>
                <div className="text-[#B7E529] font-semibold">{t.member.planName}</div>
                <div className="text-white/60 text-[11px]">{t.member.expiresText}</div>
              </div>
            </div>
          </div>

          {/* Right: Trainer Cabinet */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#B7E529] text-[#111315]">
                  {t.trainer.badge}
                </span>
                <Dumbbell className="w-5 h-5 text-[#111315]" />
              </div>

              <h3 className="text-2xl font-bold text-[#111315]">
                {t.trainer.title}
              </h3>
              <p className="mt-2 text-sm text-[#64696F] leading-relaxed">
                {t.trainer.desc}
              </p>

              <ul className="mt-6 space-y-2.5">
                {t.trainer.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#151719] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#A8CF2D] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trainer UI Mockup Box */}
            {/* NOTE FOR DEVELOPERS: Easily replaceable with /assets/trainer-cabinet.png */}
            <div className="mt-8 p-5 rounded-2xl bg-white border border-[#E4E5E2] shadow-sm max-w-sm mx-auto w-full">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E4E5E2]">
                <div className="w-10 h-10 rounded-xl bg-[#111315] text-[#B7E529] flex items-center justify-center font-bold text-sm">
                  PT
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111315]">{t.trainer.trainerName}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{t.trainer.activeClients}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#111315]">12:00 - {isKa ? 'გიორგი მ. (ფეხის ვარჯიში)' : 'George M. (Hypertrophy)'}</div>
                    <div className="text-[10px] text-[#64696F]">Session #8 / 12</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Confirmed</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#111315]">14:30 - {isKa ? 'ანა ქ. (კარდიო & HIIT)' : 'Ana K. (HIIT Conditioning)'}</div>
                    <div className="text-[10px] text-[#64696F]">Session #3 / 10</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#E4E5E2] text-[#111315] text-[10px] font-bold">Scheduled</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E4E5E2] flex items-center justify-between text-xs">
                <span className="text-[#64696F]">{isKa ? 'თვიური გამომუშავება:' : 'Monthly Payout:'}</span>
                <span className="font-bold text-[#111315]">{t.trainer.monthlyCommission}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
