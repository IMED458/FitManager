import { useState, useEffect, FormEvent } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccessLogin?: () => void;
}

export function LoginModal({ isOpen, onClose, lang, onSuccessLogin }: LoginModalProps) {
  const isKa = lang === 'ka';
  const [email, setEmail] = useState('admin@titanfitness.ge');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<'admin' | 'reception' | 'trainer' | 'member'>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      if (onSuccessLogin) {
        setTimeout(() => {
          onSuccessLogin();
          onClose();
        }, 600);
      }
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl border border-[#E4E5E2] shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center text-[#64696F] hover:text-[#111315] hover:bg-[#E4E5E2] transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-[#111315]">
              {isKa ? 'ავტორიზაცია წარმატებულია' : 'Login Successful'}
            </h3>
            <p className="text-xs text-[#64696F] mt-2">
              {isKa
                ? 'სისტემაში შესვლა განხორციელდა სატესტო ანგარიშით Titan Arena.'
                : 'Authenticated to demo organization: Titan Arena.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#111315] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              {isKa ? 'დახურვა' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#111315] text-[#B7E529] font-black text-xs flex items-center justify-center">
                FM
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#64696F]">
                Fit Manager Cloud
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#111315]">
              {isKa ? 'სისტემაში შესვლა' : 'Sign in to Fit Manager'}
            </h3>
            <p className="text-xs text-[#64696F] mt-1">
              {isKa ? 'აირჩიეთ სამუშაო როლი და შეიყვანეთ მონაცემები:' : 'Select workplace role and enter your credentials:'}
            </p>

            {/* Role selector pill */}
            <div className="mt-4 grid grid-cols-4 gap-1 p-1 bg-[#FAFAF8] rounded-xl border border-[#E4E5E2] text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'admin' ? 'bg-[#111315] text-white' : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('reception')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'reception' ? 'bg-[#111315] text-white' : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                Front
              </button>
              <button
                type="button"
                onClick={() => setRole('trainer')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'trainer' ? 'bg-[#111315] text-white' : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                Coach
              </button>
              <button
                type="button"
                onClick={() => setRole('member')}
                className={`py-1.5 rounded-lg transition-all ${
                  role === 'member' ? 'bg-[#111315] text-white' : 'text-[#64696F] hover:text-[#111315]'
                }`}
              >
                Member
              </button>
            </div>

            <form onSubmit={handleLogin} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#111315] mb-1">
                  {isKa ? 'ელ.ფოსტა' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64696F] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111315] mb-1">
                  {isKa ? 'პაროლი' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64696F] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[#FAFAF8] border border-[#E4E5E2] text-[#111315] focus:outline-none focus:border-[#111315] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>{isKa ? 'შესვლა...' : 'Authenticating...'}</span>
                  ) : (
                    <>
                      <span>{isKa ? 'სისტემაში შესვლა' : 'Enter Workspace'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#64696F]">
                  {isKa ? 'დაგავიწყდათ პაროლი?' : 'Forgot password?'} <a href="#contact" onClick={() => onClose()} className="font-semibold text-[#111315] underline">{isKa ? 'დაუკავშირდით მხარდაჭერას' : 'Contact support'}</a>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
