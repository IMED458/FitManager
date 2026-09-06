import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  QrCode,
  TrendingUp,
  Mail,
  Zap,
  Lock,
  Sparkles,
  PhoneCall,
  Clock,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  lang: Language;
  onOpenTrial: () => void;
  onOpenDemo: () => void;
  onSwitchToSoftware?: () => void;
}

export function Hero({ lang, onOpenTrial, onOpenDemo }: HeroProps) {
  const t = translations[lang].hero;
  const isKa = lang === 'ka';

  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-[#111315]" />,
      title: isKa ? 'წევრების სრული ბაზა' : 'Complete Member Base',
      desc: isKa
        ? 'აბონემენტების ტიპები, ვადის კონტროლი, გაყინვა და ისტორია'
        : 'Plans, expiration alerts, freeze states and full history',
    },
    {
      icon: <QrCode className="w-5 h-5 text-[#111315]" />,
      title: isKa ? 'სწრაფი QR & ID Check-in' : 'Instant QR & ID Check-in',
      desc: isKa
        ? 'ვიზიტების დაფიქსირება 1 წამში მობილურით ან პირადი ნომრით'
        : '1-second check-in via mobile app or personal ID',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#111315]" />,
      title: isKa ? 'სალარო და ფინანსები' : 'Cashier & Revenue',
      desc: isKa
        ? 'დღიური შემოსავალი, გადახდის მეთოდები, POS ბარი და Z-ანგარიში'
        : 'Daily turnover, payment methods, POS bar and reports',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#111315]" />,
      title: isKa ? 'ავტომატური SMS შეხსენებები' : 'Automated SMS Alerts',
      desc: isKa
        ? 'ვადის გასვლამდე 3 დღით ადრე და ვადაგასულ წევრებთან კომუნიკაცია'
        : 'Pre-expiration alerts and re-engagement messaging',
    },
  ];

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden"
    >
      {/* Subtle background atmosphere */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(183,229,41,0.12),rgba(250,250,248,0))]" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow */}
        <div className="flex flex-col items-center text-center">
          <div
            id="hero-eyebrow"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E4E5E2] text-xs font-semibold text-[#151719] shadow-2xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#B7E529] animate-pulse" />
            <span>{t.eyebrow}</span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#111315] leading-[1.12] max-w-4xl"
          >
            {t.heading1}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#111315]">{t.heading2}</span>
              <span
                className="absolute left-0 bottom-2 w-full h-3 bg-[#B7E529]/60 -z-10 rounded-sm"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subheading */}
          <p
            id="hero-subheading"
            className="mt-6 text-base sm:text-lg md:text-xl text-[#64696F] max-w-2xl leading-relaxed"
          >
            {t.subheading}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              id="hero-primary-cta"
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] rounded-xl transition-all shadow-xs hover:shadow-md active:scale-98 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] cursor-pointer"
            >
              <span>{t.cta1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              id="hero-secondary-cta"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold bg-white hover:bg-[#F7F7F5] text-[#151719] border border-[#E4E5E2] rounded-xl transition-all shadow-2xs hover:border-[#111315] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111315] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>{t.cta2}</span>
            </button>
          </div>

          {/* Microcopy */}
          <div className="mt-3.5 flex items-center gap-1.5 text-xs font-medium text-[#64696F]">
            <ShieldCheck className="w-4 h-4 text-[#A8CF2D]" />
            <span>{t.microcopy}</span>
          </div>
        </div>

        {/* Value Highlights Grid & Demo Request Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E4E5E2] p-5 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#111315] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64696F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Demo Link Request Action Card */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#111315] to-[#1A1F26] text-white p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#B7E529]/10 text-[#B7E529] text-xs font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isKa ? 'დახურული სატესტო დემო' : 'Private Sandbox Demo'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {isKa
                  ? 'გსურთ Fit Manager-ის გამოცდა თქვენს ფიტნეს დარბაზში?'
                  : 'Ready to evaluate Fit Manager for your gym?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {isKa
                  ? 'დაგვიკავშირდით ან შეავსეთ ფორმა და ჩვენი გუნდი სისტემის პერსონალურ დემო ლინკს, სატესტო მონაცემებსა და ინსტრუქციას გამოგიგზავნით თქვენს ელ-ფოსტაზე.'
                  : 'Contact us or submit a request, and our team will email you a personal demo link, demo credentials, and a walkthrough guide.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{isKa ? 'მოითხოვე დემო ლინკი' : 'Request Demo Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
