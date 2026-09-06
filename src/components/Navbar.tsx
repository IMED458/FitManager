import React, { useState } from 'react';
import {
  Menu,
  X,
  Globe,
  Mail,
  LogIn,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenTrial: () => void;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
  onSwitchToSoftware?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenTrial,
  onOpenDemo,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isKa = lang === 'ka';
  const t = translations[lang].nav;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E4E5E2] transition-all">
      {/* Top micro-banner announcing demo link request */}
      <div className="bg-[#111315] text-white py-1.5 px-4 text-xs">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B7E529] animate-pulse" />
            <span className="text-white/80 font-medium text-[11px] sm:text-xs">
              {isKa
                ? 'გსურთ Fit Manager-ის გამოცდა? მოითხოვეთ დემო ლინკი თქვენს ელ-ფოსტაზე'
                : 'Want to test Fit Manager? Request a demo access link to your email'}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className="text-[11px] sm:text-xs font-bold text-[#B7E529] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isKa ? 'მოითხოვე ლინკი' : 'Request Link'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            {/* FM Original Brand Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#B7E529] text-[#111315] flex items-center justify-center font-black text-base shadow-xs shrink-0 tracking-tight">
              FM
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-[#111315] tracking-tight">
                  Fit Manager
                </span>
                <span className="text-sm font-bold text-[#2563EB] font-mono">
                  SaaS
                </span>
              </div>
              <p className="text-[10px] text-[#64696F] font-medium hidden sm:block">
                {isKa ? 'ფიტნეს მართვის სისტემა' : 'Gym Management Software'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-[#111315]">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.home}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.features}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.pricing}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('faq')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.faq}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.contact}
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg border border-[#E4E5E2] bg-white hover:bg-slate-50 text-xs font-bold text-[#111315] flex items-center gap-1.5 cursor-pointer transition-all"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isKa ? 'EN' : 'KA'}</span>
            </button>

            {/* REQUEST DEMO LINK BUTTON */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isKa ? 'დემო ლინკი' : 'Demo Link'}</span>
            </button>

            {/* Login Modal */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3 py-2 rounded-xl border border-[#E4E5E2] hover:bg-slate-50 text-xs font-bold text-[#111315] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>

            {/* Trial Modal */}
            <button
              type="button"
              onClick={onOpenTrial}
              className="px-4 py-2 rounded-xl bg-[#111315] hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.trial}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-2.5 py-1.5 rounded-lg bg-[#2563EB] text-white text-[11px] font-bold flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>{isKa ? 'დემო' : 'Demo'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.home}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.features}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.howItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.pricing}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.faq}
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              {t.contact}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>{isKa ? 'მოითხოვე დემო ლინკი' : 'Request Demo Link'}</span>
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                {t.login}
              </button>
              <button
                type="button"
                onClick={onToggleLang}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                {isKa ? 'EN' : 'KA'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-2.5 rounded-xl bg-[#111315] text-white font-bold text-xs"
            >
              {t.trial}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
