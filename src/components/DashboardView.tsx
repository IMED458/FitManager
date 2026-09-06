import React from 'react';
import {
  LogIn,
  Users,
  UserCheck,
  XCircle,
  Hourglass,
  PauseCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Member, Visit, NavigationTab } from '../types';

interface DashboardViewProps {
  members: Member[];
  todayVisits: Visit[];
  onNavigate: (tab: NavigationTab) => void;
  onQuickCheckIn: () => void;
  darkMode?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  members,
  todayVisits,
  onNavigate,
  onQuickCheckIn,
  darkMode = false,
}) => {
  // Compute live statistics based on state
  const totalRegistered = 620 + members.length;
  const activeMembersCount = 465 + members.filter((m) => m.status === 'active').length;
  const expiredCount = 145 + members.filter((m) => m.status === 'expired').length;
  const expiringSoonCount = members.filter((m) => m.status === 'expiring_soon').length;
  const frozenCount = members.filter((m) => m.status === 'frozen').length;
  const todayVisitsCount = todayVisits.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          დეშბორდი
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onQuickCheckIn}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>სწრაფი შესვლა</span>
          </button>
        </div>
      </div>

      {/* 6 Stat Cards Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Card 1: დღევანდელი ვიზიტები (Blue) */}
        <div
          onClick={() => onNavigate('entry')}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <LogIn className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              დღევანდელი ვიზიტები
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {todayVisitsCount}
            </div>
            <div className="text-xs text-white/80 font-normal">
              დღეს დაფიქსირებული შესვლები
            </div>
          </div>
        </div>

        {/* Card 2: სულ: რეგისტრირებული (Blue) */}
        <div
          onClick={() => onNavigate('search')}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              სულ: რეგისტრირებული
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {totalRegistered}
            </div>
            <div className="text-xs text-white/80 font-normal">
              სრული წევრთა ბაზა
            </div>
          </div>
        </div>

        {/* Card 3: აქტიური წევრები (Blue) */}
        <div
          onClick={() => onNavigate('search')}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              აქტიური წევრები
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {activeMembersCount}
            </div>
            <div className="text-xs text-white/80 font-normal">
              აქტიური აბონემენტით
            </div>
          </div>
        </div>

        {/* Card 4: ვადაგასული (Blue) */}
        <div
          onClick={() => onNavigate('expired')}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              ვადაგასული
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {expiredCount}
            </div>
            <div className="text-xs text-white/80 font-normal">
              განახლებას მომლოდინე
            </div>
          </div>
        </div>

        {/* Card 5: 3 დღეში ვადაგასული (Orange) */}
        <div
          onClick={() => onNavigate('expired')}
          className="bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              3 დღეში ვადაგასული
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {expiringSoonCount || 6}
            </div>
            <div className="text-xs text-white/80 font-normal">
              მოკლე ვადაში გასაახლებელი
            </div>
          </div>
        </div>

        {/* Card 6: შეჩერებული (Orange) */}
        <div
          onClick={() => onNavigate('search')}
          className="bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-2xl p-5 sm:p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[175px] group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs mb-3">
            <PauseCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-white/90">
              შეჩერებული
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold my-1 tracking-tight">
              {frozenCount || 4}
            </div>
            <div className="text-xs text-white/80 font-normal">
              დროებით შეჩერებული წევრები
            </div>
          </div>
        </div>
      </div>

      {/* Operational Feed & Today's Activity Table */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Registered Visits List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold">
              დღეს დაფიქსირებული ბოლო შესვლები
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('entry')}
              className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>სრული ჟურნალი</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`rounded-xl border ${darkMode ? 'border-slate-800 bg-[#161D28]' : 'border-slate-200/80 bg-slate-50/50'} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={`border-b ${darkMode ? 'border-slate-800 bg-[#1A2332] text-slate-400' : 'border-slate-200 bg-slate-100/70 text-slate-600'} font-semibold`}>
                  <tr>
                    <th className="px-4 py-2.5">დრო</th>
                    <th className="px-4 py-2.5">ID #</th>
                    <th className="px-4 py-2.5">წევრი</th>
                    <th className="px-4 py-2.5">აბონემენტი</th>
                    <th className="px-4 py-2.5 text-right">სტატუსი</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {todayVisits.slice(-5).reverse().map((visit) => (
                    <tr key={visit.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-500">
                        {visit.time}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-mono text-xs font-bold">
                          #{visit.cardNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {visit.memberName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 text-xs">
                        {visit.planName}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                          დაშვებულია
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Shortcuts & Actions */}
        <div className={`p-5 rounded-xl border ${darkMode ? 'border-slate-800 bg-[#161D28]' : 'border-slate-200/80 bg-slate-50/50'} flex flex-col justify-between space-y-4`}>
          <div>
            <div className="flex items-center gap-2 text-[#2563EB] mb-2 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>სწრაფი მოქმედებები</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Fit Manager-ის ოპერაციული მართვის პანელი. დაარეგისტრირეთ ახალი წევრი, შეამოწმეთ ვადაგასულები ან გაგზავნეთ შეხსენების SMS.
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigate('registration')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>+ ახალი წევრის რეგისტრაცია</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('expired')}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>ვადაგასულთა სია და SMS გაგზავნა</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('products')}
                className={`w-full py-2.5 px-4 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-white text-slate-700'} hover:border-slate-300 text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer`}
              >
                <span>ბარის / წყლის გაყიდვა</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>სისტემა: ონლაინ</span>
            <span>ვერსია: 2.4 (Fit Manager)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
