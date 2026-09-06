import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, DemoFormData } from '../types';
import { translations } from '../translations';
import { sendLead, LEAD_EMAIL } from '../lib/sendLead';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = translations[lang].demoForm;
  const isKa = lang === 'ka';

  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    gymName: '',
    phone: '',
    email: '',
    estimatedMembers: '50-200',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await sendLead(formData, 'contact');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Contact submission failed:', err);
      setError(
        isKa
          ? `განაცხადის გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან ან მოგვწერეთ: ${LEAD_EMAIL}`
          : `We could not send your request. Please try again or email us at ${LEAD_EMAIL}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAFAF8] border-t border-[#E4E5E2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Contact Details (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#B7E529]" />
              <span>{isKa ? 'დაგვიკავშირდი' : 'Get In Touch'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111315] leading-[1.18]">
              {t.heading}
            </h2>

            <p className="mt-4 text-base text-[#64696F] leading-relaxed">
              {t.subheading}
            </p>

            {/* Direct Contact info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4E5E2] shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center text-[#111315] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64696F] font-medium">{isKa ? 'ტელეფონი' : 'Phone'}</div>
                  <a href="tel:+995322000000" className="text-sm font-bold text-[#111315] hover:underline font-mono">
                    +995 (32) 200-00-00
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4E5E2] shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center text-[#111315] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64696F] font-medium">{isKa ? 'ელ.ფოსტა' : 'Email'}</div>
                  <a href="mailto:contact@fitmanager.ge" className="text-sm font-bold text-[#111315] hover:underline font-mono">
                    contact@fitmanager.ge
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E4E5E2] shadow-2xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center text-[#111315] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#64696F] font-medium">{isKa ? 'მისამართი' : 'Headquarters'}</div>
                  <span className="text-sm font-bold text-[#111315]">
                    {isKa ? 'თბილისი, ი.ჭავჭავაძის გამზ. 37' : '37 Chavchavadze Ave, Tbilisi'}
                  </span>
                </div>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="mt-8 p-4 rounded-xl bg-[#111315] text-white flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#B7E529] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">
                  {isKa ? 'სწრაფი უკუკავშირი' : 'Fast SLA Response'}
                </span>
                <span className="text-white/70">
                  {isKa
                    ? 'სამუშაო დღეებში ჩვენი გუნდი გიკავშირდებათ 2 საათის განმავლობაში.'
                    : 'Our technical team responds within 2 hours on business days.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead / Demo Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4E5E2] p-6 sm:p-10 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-[#111315]">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-[#64696F] mt-2 max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#111315] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  {t.bookAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#E4E5E2] pb-4 mb-2">
                  <h3 className="text-xl font-bold text-[#111315]">
                    {t.heading}
                  </h3>
                  <p className="text-xs text-[#64696F] mt-0.5">
                    {isKa ? 'შეავსეთ ფორმა და ჩვენი სპეციალისტი მოგაწვდით წვდომას.' : 'Fill out the form below and we will prepare your access.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-fullname" className="block text-xs font-bold text-[#111315] mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      id="contact-fullname"
                      required
                      placeholder={t.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Gym Name */}
                  <div>
                    <label htmlFor="contact-gymname" className="block text-xs font-bold text-[#111315] mb-1">
                      {t.companyName} *
                    </label>
                    <input
                      type="text"
                      id="contact-gymname"
                      required
                      placeholder={t.companyNamePlaceholder}
                      value={formData.gymName}
                      onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[#111315] mb-1">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      required
                      placeholder={t.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all font-mono text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#111315] mb-1">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Estimated Members */}
                <div>
                  <label htmlFor="contact-members-count" className="block text-xs font-bold text-[#111315] mb-1">
                    {t.memberCount}
                  </label>
                  <select
                    id="contact-members-count"
                    value={formData.estimatedMembers}
                    onChange={(e) => setFormData({ ...formData, estimatedMembers: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                  >
                    {t.memberCountOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt} {isKa ? 'აქტიური წევრი' : 'members'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current tool */}
                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-bold text-[#111315] mb-1">
                    {t.currentTool}
                  </label>
                  <input
                    type="text"
                    id="contact-notes"
                    placeholder={isKa ? 'მაგ: Excel, რვეული, სხვა პროგრამა' : 'e.g. Excel, Pen & Paper, legacy software'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-sm text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-xs leading-relaxed text-[#B3261E] bg-[#B3261E]/8 border border-[#B3261E]/20 rounded-xl px-3.5 py-2.5"
                  >
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.submitting}</span>
                    ) : (
                      <>
                        <span>{t.submitBtn}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64696F] pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A8CF2D]" />
                  <span>{isKa ? 'თქვენი მონაცემები 100% კონფიდენციალურია.' : 'Your data is strictly confidential.'}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
