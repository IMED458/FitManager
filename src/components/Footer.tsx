import { ArrowUp, Mail, Phone, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTrial: () => void;
  onOpenDemo: () => void;
}

export function Footer({ lang, onLanguageChange, onOpenTrial, onOpenDemo }: FooterProps) {
  const t = translations[lang].footer;
  const isKa = lang === 'ka';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111315] text-white border-t border-[#1D2125]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B7E529] text-[#111315] flex items-center justify-center font-black text-base shadow-xs">
                FM
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Fit Manager
              </span>
            </div>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              {t.tagline}
            </p>

            {/* Direct contact summary */}
            <div className="pt-2 space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B7E529]" />
                <span>+995 (32) 200-00-00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B7E529]" />
                <span>contact@fitmanager.ge</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.columns.product.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  {t.columns.product.features}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {t.columns.product.pricing}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.columns.product.demo}
                </button>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  {isKa ? 'კაბინეტები' : 'Portals'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.columns.company.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#problem-section" className="hover:text-white transition-colors">
                  {t.columns.company.about}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.columns.company.contact}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {isKa ? 'მხარდაჭერა' : 'Support'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Language */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.columns.legal.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 mb-6">
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(isKa ? 'Fit Manager იცავს პერსონალურ მონაცემებს საქართველოს კანონმდებლობის შესაბამისად.' : 'Fit Manager strictly adheres to data privacy laws.');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {t.columns.legal.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(isKa ? 'სერვისის გამოყენების წესები და პირობები.' : 'Terms of Service for Fit Manager SaaS.');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {t.columns.legal.terms}
                </a>
              </li>
            </ul>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-[#16191C] border border-white/10 text-xs text-white">
                <Globe className="w-3.5 h-3.5 text-white/60 ml-1.5" />
                <button
                  type="button"
                  onClick={() => onLanguageChange('ka')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    lang === 'ka' ? 'bg-[#B7E529] text-[#111315]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  KA
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    lang === 'en' ? 'bg-[#B7E529] text-[#111315]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            {t.rights}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <span>{isKa ? 'ზემოთ დაბრუნება' : 'Back to top'}</span>
            <div className="w-6 h-6 rounded-md bg-[#16191C] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/30">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
