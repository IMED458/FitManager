import { useState, useEffect, FormEvent } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, DemoFormData } from '../types';
import { translations } from '../translations';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialPlan?: string;
  type: 'trial' | 'demo';
}

export function LeadModal({ isOpen, onClose, lang, initialPlan, type }: LeadModalProps) {
  const isKa = lang === 'ka';
  const tTrial = translations[lang].trialModal;
  const tDemo = translations[lang].demoForm;

  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    gymName: '',
    phone: '',
    email: '',
    estimatedMembers: '50-200',
    notes: initialPlan ? `Plan: ${initialPlan}` : '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialPlan) {
      setFormData(prev => ({
        ...prev,
        notes: isKa ? `დაინტერესებული ვარ გეგმით: ${initialPlan}` : `Interested in plan: ${initialPlan}`,
      }));
    }
  }, [initialPlan, isKa]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E4E5E2] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center text-[#64696F] hover:text-[#111315] hover:bg-[#E4E5E2] transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#111315]">
              {type === 'trial' ? tTrial.success : tDemo.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#64696F] mt-2 max-w-sm mx-auto leading-relaxed">
              {type === 'trial' ? tTrial.successDetail : tDemo.successDesc}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#111315] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              {tTrial.close}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B7E529]/40 text-[#111315] uppercase tracking-wider">
                {type === 'trial'
                  ? isKa ? '14-დღიანი უფასო საცდელი პერიოდი' : '14-Day Free Trial'
                  : isKa ? 'დემო ლინკის მოთხოვნა' : 'Request Demo Link'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#111315] mt-2">
                {type === 'trial' ? tTrial.title : tDemo.heading}
              </h3>
              <p className="text-xs text-[#64696F] mt-1">
                {type === 'trial' ? tTrial.subtitle : tDemo.subheading}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#111315] mb-1">
                  {tDemo.fullName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={tDemo.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111315] mb-1">
                    {tTrial.gymName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={tDemo.companyNamePlaceholder}
                    value={formData.gymName}
                    onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111315] mb-1">
                    {tDemo.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={tDemo.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] font-mono text-xs focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111315] mb-1">
                  {tDemo.email} *
                </label>
                <input
                  type="email"
                  required
                  placeholder={tDemo.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111315] mb-1">
                  {tDemo.memberCount}
                </label>
                <select
                  value={formData.estimatedMembers}
                  onChange={(e) => setFormData({ ...formData, estimatedMembers: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                >
                  {tDemo.memberCountOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt} {isKa ? 'აქტიური წევრი' : 'members'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{type === 'trial' ? tTrial.processing : tDemo.submitting}</span>
                  ) : (
                    <>
                      <span>{type === 'trial' ? tTrial.submit : tDemo.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64696F] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8CF2D]" />
                <span>{isKa ? 'წინასწარი გადახდა არ არის საჭირო' : 'No credit card or advance payment required'}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
