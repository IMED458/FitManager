import React, { useState } from 'react';
import { LogIn, CheckCircle2, XCircle, Search, Clock, Hash, RefreshCw } from 'lucide-react';
import { Member, Visit } from '../types';

interface EntryViewProps {
  members: Member[];
  todayVisits: Visit[];
  onRecordVisit: (visit: Visit) => void;
  onRenewMember: (member: Member) => void;
  darkMode?: boolean;
}

export const EntryView: React.FC<EntryViewProps> = ({
  members,
  todayVisits,
  onRecordVisit,
  onRenewMember,
  darkMode = false,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [lastCheckedMember, setLastCheckedMember] = useState<{
    member: Member;
    allowed: boolean;
    reason?: string;
  } | null>(null);

  const handleCheckIn = (codeToTest?: string) => {
    const code = (codeToTest || inputCode).trim().toLowerCase();
    if (!code) return;

    // Look up by card number, personalId, or full name
    const found = members.find(
      (m) =>
        m.cardNumber.toLowerCase() === code ||
        m.personalId === code ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(code)
    );

    if (!found) {
      alert(`წევრი კოდით "${code}" ბაზაში ვერ მოიძებნა!`);
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    // Validate membership status
    if (found.status === 'expired') {
      setLastCheckedMember({
        member: found,
        allowed: false,
        reason: 'აბონემენტი ვადაგასულია! საჭიროა განახლება.',
      });
      return;
    }

    if (found.status === 'frozen') {
      setLastCheckedMember({
        member: found,
        allowed: false,
        reason: 'აბონემენტი დროებით შეჩერებულია.',
      });
      return;
    }

    // Check remaining workouts if 12-workout plan
    if (found.membershipPlan === '12_workouts') {
      if (found.remainingWorkouts !== undefined && found.remainingWorkouts <= 0) {
        setLastCheckedMember({
          member: found,
          allowed: false,
          reason: '12-ვე ვარჯიში ამოწურულია! საჭიროა განახლება.',
        });
        return;
      }
    }

    // Allowed!
    const planName =
      found.membershipPlan === '12_workouts'
        ? '12 ვარჯიში'
        : found.membershipPlan === 'morning_unlimited'
        ? 'დილის ულიმიტო'
        : found.membershipPlan === 'unlimited'
        ? 'ულიმიტო'
        : found.membershipPlan === 'single_visit'
        ? 'ერთჯერადი ვიზიტი'
        : found.customPlanName || 'სხვა';

    const newVisit: Visit = {
      id: `v-${Date.now()}`,
      memberId: found.id,
      memberName: `${found.firstName} ${found.lastName}`,
      cardNumber: found.cardNumber,
      time: timeStr,
      date: dateStr,
      planName,
      remainingWorkouts:
        found.remainingWorkouts !== undefined
          ? Math.max(0, found.remainingWorkouts - 1)
          : undefined,
      status: 'allowed',
    };

    onRecordVisit(newVisit);

    setLastCheckedMember({
      member: found,
      allowed: true,
    });

    setInputCode('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            შესვლა (ტურნიკეტი)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            შეიყვანეთ წევრის ID, პირადი ნომერი ან სახელი ვიზიტის დასაფიქსირებლად
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-300 text-xs font-bold">
          დღეს შესულია: <span className="text-sm font-black">{todayVisits.length}</span> წევრი
        </div>
      </div>

      {/* Fast Input Scanner Box */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-slate-50/80 border-slate-200/80'} shadow-sm`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckIn();
          }}
          className="space-y-4"
        >
          <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            წევრის ID #, პირადი ნომერი ან სახელი:
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="მაგ: 1016, 1204, 1398, ან პირადი ნომერი..."
                className={`w-full px-5 py-4 pl-12 rounded-2xl border ${
                  darkMode
                    ? 'bg-[#1A2332] border-slate-700 text-white placeholder:text-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                } text-base sm:text-lg font-mono focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 transition-all`}
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              <span>შესვლა</span>
            </button>
          </div>

          {/* Quick Click Simulation Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
            <span>სწრაფი ტესტი:</span>
            {members.slice(0, 4).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleCheckIn(m.cardNumber)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 font-mono transition-all cursor-pointer"
              >
                #{m.cardNumber} ({m.firstName})
              </button>
            ))}
          </div>
        </form>

        {/* Turnstile Access Status Result */}
        {lastCheckedMember && (
          <div
            className={`mt-6 p-5 sm:p-6 rounded-2xl border animate-in zoom-in-95 duration-150 ${
              lastCheckedMember.allowed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                {lastCheckedMember.allowed ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xl sm:text-2xl font-black">
                    {lastCheckedMember.allowed ? 'დაშვებულია' : 'უარყოფილია!'}
                  </div>
                  <div className="text-base font-bold mt-0.5">
                    {lastCheckedMember.member.firstName} {lastCheckedMember.member.lastName}
                  </div>
                  <div className="text-xs mt-1 font-mono">
                    ID: #{lastCheckedMember.member.cardNumber} | პირადი: {lastCheckedMember.member.personalId}
                  </div>
                  {lastCheckedMember.reason && (
                    <div className="text-xs font-bold text-rose-700 dark:text-rose-300 mt-2">
                      ⚠️ {lastCheckedMember.reason}
                    </div>
                  )}
                  {lastCheckedMember.allowed && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      მოქმედების ვადა: {lastCheckedMember.member.endDate}
                    </div>
                  )}
                </div>
              </div>

              {!lastCheckedMember.allowed && (
                <button
                  type="button"
                  onClick={() => onRenewMember(lastCheckedMember.member)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>აბონემენტის განახლება</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Today's Full Visits History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">
          დღეს შესული წევრების სრული სია ({todayVisits.length})
        </h3>

        <div className={`rounded-2xl border ${darkMode ? 'border-slate-800 bg-[#161D28]' : 'border-slate-200 bg-white'} overflow-hidden shadow-2xs`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className={`border-b ${darkMode ? 'border-slate-800 bg-[#1A2332] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'} font-semibold`}>
                <tr>
                  <th className="px-5 py-3">დრო</th>
                  <th className="px-5 py-3">ID #</th>
                  <th className="px-5 py-3">წევრი</th>
                  <th className="px-5 py-3">პაკეტი</th>
                  <th className="px-5 py-3 text-right">სტატუსი</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {todayVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-slate-500">
                      {v.time}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-mono text-xs font-bold">
                        #{v.cardNumber}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                      {v.memberName}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                      {v.planName}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
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
    </div>
  );
};
