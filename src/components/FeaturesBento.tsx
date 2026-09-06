import {
  Users,
  CreditCard,
  QrCode,
  DollarSign,
  Package,
  BarChart3,
  UserCheck,
  Dumbbell,
  Smartphone,
  BellRing,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface FeaturesBentoProps {
  lang: Language;
  onOpenTrial: () => void;
}

export function FeaturesBento({ lang, onOpenTrial }: FeaturesBentoProps) {
  const t = translations[lang].features;
  const isKa = lang === 'ka';

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-t border-[#E4E5E2]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E4E5E2] text-xs font-bold text-[#111315] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E529]" />
            <span>{isKa ? 'სრული ფუნქციონალი' : 'Full Capabilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#111315] leading-[1.18]">
            {t.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64696F] leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Member Management (Large span on desktop) */}
          <div className="lg:col-span-2 rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[0].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[0].title} - <span className="font-medium text-[#64696F]">{t.cards[0].subtitle}</span>
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed max-w-xl">
                {t.cards[0].desc}
              </p>
            </div>

            {/* UI Mockup Placeholder inside card */}
            {/* NOTE FOR DEVELOPERS: Can be replaced with actual /assets/members-table-screenshot.png */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-[#E4E5E2] shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#64696F] pb-2 border-b border-[#E4E5E2]">
                <span>{isKa ? 'წევრი' : 'Member'}</span>
                <span>{isKa ? 'აბონემენტი' : 'Plan'}</span>
                <span>{isKa ? 'სტატუსი' : 'Status'}</span>
              </div>
              <div className="space-y-2 mt-2.5 text-xs">
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center font-bold text-[10px]">
                      სჩ
                    </div>
                    <span className="font-semibold text-[#111315]">{isKa ? 'სანდრო ჩიქოვანი' : 'Sandro Chikovani'}</span>
                  </div>
                  <span className="text-[#64696F]">Unlimited 1 Month</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {isKa ? 'აქტიური' : 'Active'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E4E5E2] text-[#111315] flex items-center justify-center font-bold text-[10px]">
                      აკ
                    </div>
                    <span className="font-semibold text-[#111315]">{isKa ? 'ანა კიკნაძე' : 'Ana Kiknadze'}</span>
                  </div>
                  <span className="text-[#64696F]">12 Passes (8 left)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {isKa ? 'აქტიური' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: QR Check-in */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[2].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#A8CF2D] group-hover:bg-[#111315] group-hover:text-[#B7E529] transition-colors">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[2].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[2].desc}
              </p>
            </div>

            {/* Visual Phone + Scanner indicator */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-[#E4E5E2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#111315] flex items-center justify-center text-[#B7E529]">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111315]">{isKa ? 'მყისიერი შემოწმება' : 'Instant Verification'}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">{isKa ? 'სტატუსი: დაშვებულია' : 'Status: Access Granted'}</div>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#B7E529] text-[#111315] flex items-center justify-center font-bold text-xs">
                ✓
              </div>
            </div>
          </div>

          {/* Card 3: Memberships & Validity Control */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[1].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[1].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[1].desc}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="p-2.5 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#111315]">Morning Pass (08:00 - 15:00)</span>
                <span className="font-bold text-[#111315]">80 ₾</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#111315]">Unlimited All-Day (30 Days)</span>
                <span className="font-bold text-[#111315]">140 ₾</span>
              </div>
            </div>
          </div>

          {/* Card 4: Finances & Cashier */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[3].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[3].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[3].desc}
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-white border border-[#E4E5E2]">
              <div className="flex justify-between text-xs pb-2 border-b border-[#E4E5E2]">
                <span className="text-[#64696F]">{isKa ? 'დღის ჯამური ნავაჭრი' : 'Daily Gross'}</span>
                <span className="font-bold text-[#111315]">3,420.00 ₾</span>
              </div>
              <div className="flex justify-between text-xs pt-2">
                <span className="text-[#64696F]">{isKa ? 'სალაროს ბალანსი' : 'Register Balance'}</span>
                <span className="font-bold text-emerald-700">{isKa ? 'დახურულია (OK)' : 'Reconciled'}</span>
              </div>
            </div>
          </div>

          {/* Card 5: Products, Protein Bar & Inventory */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[4].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[4].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[4].desc}
              </p>
            </div>

            <div className="mt-6 space-y-1.5 text-xs">
              <div className="p-2 rounded bg-white border border-[#E4E5E2] flex items-center justify-between">
                <span className="text-[#151719] font-medium">Whey Protein Shake</span>
                <span className="font-bold text-[#111315]">8.00 ₾ <span className="font-normal text-[#64696F]">(მარაგი: 42)</span></span>
              </div>
              <div className="p-2 rounded bg-white border border-[#E4E5E2] flex items-center justify-between">
                <span className="text-[#151719] font-medium">BCAA Energy Drink</span>
                <span className="font-bold text-[#111315]">6.50 ₾ <span className="font-normal text-[#64696F]">(მარაგი: 68)</span></span>
              </div>
            </div>
          </div>

          {/* Card 6: Statistics & Reports */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[5].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[5].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[5].desc}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-white border border-[#E4E5E2]">
              <div className="flex items-center justify-between text-xs font-bold text-[#111315] mb-2">
                <span>{isKa ? 'ვიზიტების დინამიკა (საათობრივად)' : 'Hourly Visit Volume'}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">+12%</span>
              </div>
              <div className="flex items-end gap-1.5 h-12 pt-2">
                <div className="flex-1 bg-[#E4E5E2] rounded-t h-[30%]" />
                <div className="flex-1 bg-[#E4E5E2] rounded-t h-[50%]" />
                <div className="flex-1 bg-[#B7E529] rounded-t h-[95%]" />
                <div className="flex-1 bg-[#111315] rounded-t h-[100%]" />
                <div className="flex-1 bg-[#B7E529] rounded-t h-[75%]" />
                <div className="flex-1 bg-[#E4E5E2] rounded-t h-[40%]" />
              </div>
            </div>
          </div>

          {/* Card 7: Staff & Access Roles */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#E4E5E2] text-[#111315]">
                  {t.cards[6].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[6].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[6].desc}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-white border border-[#E4E5E2] text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#111315]">ადმინისტრატორი / Administrator</span>
                <span className="text-emerald-700 font-bold text-[10px]">Full Access</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#111315]">რეცეფციონისტი / Receptionist</span>
                <span className="text-[#64696F] font-bold text-[10px]">Check-in & POS</span>
              </div>
            </div>
          </div>

          {/* Card 8: Trainer Management (Pro) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#111315] text-[#B7E529]">
                  {t.cards[7].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[7].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[7].desc}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-white border border-[#E4E5E2] text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#111315] text-[#B7E529] flex items-center justify-center font-bold text-xs">
                  Coach
                </div>
                <div>
                  <div className="font-bold text-[#111315]">{isKa ? 'პირადი კაბინეტი' : 'Trainer Portal'}</div>
                  <div className="text-[11px] text-[#64696F]">{isKa ? '18 აქტიური კლიენტი' : '18 active clients'}</div>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-[#B7E529]/30 text-[#111315] font-bold text-[11px]">Pro Tier</span>
            </div>
          </div>

          {/* Card 9: Member Cabinet (Growth & Pro) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#E4E5E2] flex flex-col justify-between hover:border-[#111315] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#111315] text-white">
                  {t.cards[8].badge}
                </span>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-center text-[#111315] group-hover:bg-[#111315] group-hover:text-white transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#111315]">
                {t.cards[8].title}
              </h3>
              <p className="text-sm text-[#64696F] mt-2 leading-relaxed">
                {t.cards[8].desc}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-white border border-[#E4E5E2] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#FAFAF8] border border-[#E4E5E2] flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-[#111315]" />
                </div>
                <span className="font-semibold text-[#111315]">{isKa ? 'მობილური ციფრული საშვი' : 'Digital Mobile Pass'}</span>
              </div>
              <span className="text-emerald-700 font-bold text-[11px]">iOS & Android</span>
            </div>
          </div>

          {/* Card 10: Automated Notifications & Reminders */}
          <div className="lg:col-span-3 rounded-2xl p-6 sm:p-7 bg-[#111315] text-white border border-[#1D2125] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#B7E529] text-[#111315]">
                  {t.cards[9].badge}
                </span>
                <span className="text-xs text-white/60">
                  {isKa ? 'ავტომატური SMS & Push' : 'Automated Retention Engine'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.cards[9].title} - <span className="text-[#B7E529]">{t.cards[9].subtitle}</span>
              </h3>
              <p className="text-sm text-white/70 mt-1.5 max-w-2xl leading-relaxed">
                {t.cards[9].desc}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenTrial}
              className="px-6 py-3 rounded-xl bg-[#B7E529] hover:bg-[#A8CF2D] text-[#111315] font-bold text-sm transition-colors shrink-0 flex items-center gap-2"
            >
              <span>{isKa ? 'გამოსცადე 14 დღე უფასოდ' : 'Try 14 Days Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
