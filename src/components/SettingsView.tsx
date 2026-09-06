import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Clock, Building, DollarSign, RefreshCcw } from 'lucide-react';

interface SettingsViewProps {
  onResetDemoData: () => void;
  darkMode?: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onResetDemoData,
  darkMode = false,
}) => {
  const [gymName, setGymName] = useState('Fit Manager');
  const [gymAddress, setGymAddress] = useState('თბილისი, ჭავჭავაძის გამზ. #34');
  const [gymPhone, setGymPhone] = useState('+995 32 200 11 22');
  const [workingHours, setWorkingHours] = useState('ორშ-შაბ: 07:00 - 23:00, კვ: 09:00 - 21:00');

  // Pricing
  const [price12, setPrice12] = useState('70');
  const [priceMorning, setPriceMorning] = useState('90');
  const [priceUnlimited, setPriceUnlimited] = useState('110');
  const [priceSingle, setPriceSingle] = useState('15');

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          პარამეტრები
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          დარბაზის პროფილის, ტარიფებისა და სისტემური კონფიგურაციის მართვა
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-in fade-in duration-150">
          პარამეტრები წარმატებით შეინახა!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Gym Profile */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Building className="w-4 h-4 text-[#2563EB]" />
            <span>დარბაზის პროფილი</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                დარბაზის დასახელება
              </label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                საკონტაქტო ტელეფონი
              </label>
              <input
                type="text"
                value={gymPhone}
                onChange={(e) => setGymPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                მისამართი
              </label>
              <input
                type="text"
                value={gymAddress}
                onChange={(e) => setGymAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                სამუშაო საათები
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Membership Prices */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>აბონემენტების სტანდარტული ტარიფები (₾)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                12 ვარჯიში
              </label>
              <input
                type="number"
                value={price12}
                onChange={(e) => setPrice12(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                დილის ულიმიტო
              </label>
              <input
                type="number"
                value={priceMorning}
                onChange={(e) => setPriceMorning(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                ულიმიტო
              </label>
              <input
                type="number"
                value={priceUnlimited}
                onChange={(e) => setPriceUnlimited(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                ერთჯერადი ვიზიტი
              </label>
              <input
                type="number"
                value={priceSingle}
                onChange={(e) => setPriceSingle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>ცვლილებების შენახვა</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('ნამდვილად გსურთ საწყისი დემო მონაცემების გადატვირთვა?')) {
                onResetDemoData();
              }
            }}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>დემო მონაცემების განახლება</span>
          </button>
        </div>
      </form>
    </div>
  );
};
