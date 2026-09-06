import React, { useState } from 'react';
import { AlertCircle, RefreshCw, MessageSquare, Phone, CheckCircle2, Clock } from 'lucide-react';
import { Member } from '../types';

interface ExpiredViewProps {
  members: Member[];
  onRenewMember: (member: Member) => void;
  onSendSmsToMember: (member: Member) => void;
  darkMode?: boolean;
}

export const ExpiredView: React.FC<ExpiredViewProps> = ({
  members,
  onRenewMember,
  onSendSmsToMember,
  darkMode = false,
}) => {
  const [tabFilter, setTabFilter] = useState<'all' | 'expired' | 'expiring_soon'>('all');

  const expiredList = members.filter(
    (m) => m.status === 'expired' || m.status === 'expiring_soon'
  );

  const displayedList = expiredList.filter((m) => {
    if (tabFilter === 'all') return true;
    return m.status === tabFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ვადაგასული და გასაახლებელი
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            აკონტროლეთ ვადაგასული წევრები და გაუგზავნეთ შეხსენების SMS-ები
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTabFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              tabFilter === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ყველა ({expiredList.length})
          </button>
          <button
            type="button"
            onClick={() => setTabFilter('expiring_soon')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              tabFilter === 'expiring_soon'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            3 დღეში გასაახლებელი ({members.filter((m) => m.status === 'expiring_soon').length})
          </button>
          <button
            type="button"
            onClick={() => setTabFilter('expired')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              tabFilter === 'expired'
                ? 'bg-[#851818] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ვადაგასული ({members.filter((m) => m.status === 'expired').length})
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3.5">
        {displayedList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            ამ კატეგორიაში ჩანაწერები არ არის.
          </div>
        ) : (
          displayedList.map((member) => {
            const isSoon = member.status === 'expiring_soon';
            return (
              <div
                key={member.id}
                className={`p-5 sm:p-6 rounded-2xl border ${
                  darkMode
                    ? 'bg-[#161D28] border-slate-700/80 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-mono text-xs font-bold">
                      💳 {member.cardNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isSoon
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-[#851818] text-white'
                      }`}
                    >
                      {isSoon ? '3 დღეში ეწურება' : 'ვადაგასულია'}
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {member.firstName} {member.lastName}
                  </div>

                  <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-4">
                    <span>პირადი: {member.personalId}</span>
                    <span>ტელ: {member.phone}</span>
                    <span className="text-amber-600 font-bold">ვადა: {member.endDate}</span>
                  </div>
                </div>

                {/* Quick actions for operator */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => onSendSmsToMember(member)}
                    className={`px-3.5 py-2 rounded-xl border ${
                      darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    } text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    <span>SMS შეხსენება</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRenewMember(member)}
                    className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>განახლება</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
