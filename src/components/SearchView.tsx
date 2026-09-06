import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Plus, CheckCircle, AlertCircle, Clock, Pause, Phone, Mail } from 'lucide-react';
import { Member } from '../types';

interface SearchViewProps {
  members: Member[];
  onSelectMemberAction: (member: Member) => void;
  onQuickCheckInMember: (member: Member) => void;
  darkMode?: boolean;
}

export const SearchView: React.FC<SearchViewProps> = ({
  members,
  onSelectMemberAction,
  onQuickCheckInMember,
  darkMode = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'expiring_soon' | 'frozen'>('all');

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Query match (name, surname, personalId, cardNumber, phone, email)
      const query = searchQuery.trim().toLowerCase();
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const matchesQuery =
        !query ||
        fullName.includes(query) ||
        m.personalId.includes(query) ||
        m.cardNumber.toLowerCase().includes(query) ||
        m.phone.includes(query) ||
        (m.email && m.email.toLowerCase().includes(query));

      if (!matchesQuery) return false;

      // Status filter
      if (statusFilter === 'all') return true;
      return m.status === statusFilter;
    });
  }, [members, searchQuery, statusFilter]);

  const renderStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white">
            აქტიური
          </span>
        );
      case 'expired':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#851818] text-white">
            ვადაგასული
          </span>
        );
      case 'expiring_soon':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white">
            3 დღეში ვადაგასული
          </span>
        );
      case 'frozen':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-600 text-white">
            შეჩერებული
          </span>
        );
      default:
        return null;
    }
  };

  const getPlanLabel = (member: Member) => {
    if (member.membershipPlan === '12_workouts') {
      return member.remainingWorkouts !== undefined
        ? `12 ვარჯიში (დარჩა: ${member.remainingWorkouts})`
        : '12 ვარჯიში';
    }
    if (member.membershipPlan === 'morning_unlimited') return 'დილის ულიმიტო';
    if (member.membershipPlan === 'unlimited') return 'ულიმიტო';
    if (member.membershipPlan === 'single_visit') return 'ერთჯერადი ვიზიტი';
    return member.customPlanName || 'სხვა';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ძიება
        </h2>

        <span className="text-xs sm:text-sm text-slate-500 font-medium">
          ნაპოვნია: <span className="font-bold text-slate-900 dark:text-white">{filteredMembers.length}</span> წევრი
        </span>
      </div>

      {/* Search Input Bar matching Screenshot 3 */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="სახელი, Email ან პირადი ნომერი..."
          className={`w-full px-5 py-3.5 pr-12 rounded-2xl border ${
            darkMode
              ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500 focus:border-[#2563EB]'
              : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB]'
          } text-sm sm:text-base focus:outline-none transition-all shadow-2xs`}
        />
        <SearchIcon className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#2563EB] text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          ყველა ({members.length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('active')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            statusFilter === 'active'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          აქტიური ({members.filter((m) => m.status === 'active').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('expired')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            statusFilter === 'expired'
              ? 'bg-[#851818] text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          ვადაგასული ({members.filter((m) => m.status === 'expired').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('expiring_soon')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            statusFilter === 'expiring_soon'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          3 დღეში ვადაგასული ({members.filter((m) => m.status === 'expiring_soon').length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('frozen')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            statusFilter === 'frozen'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          შეჩერებული ({members.filter((m) => m.status === 'frozen').length})
        </button>
      </div>

      {/* Member Cards List matching Screenshot 3 */}
      <div className="space-y-3.5">
        {filteredMembers.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            წევრი ვერ მოიძებნა მითითებული პარამეტრებით.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-5 sm:p-6 rounded-2xl border ${
                darkMode
                  ? 'bg-[#161D28] border-slate-700/80 hover:border-slate-600'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
              } flex items-start justify-between gap-4 transition-all group`}
            >
              {/* Member details column */}
              <div className="space-y-1.5">
                {/* ID Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EBF9] dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 text-xs font-bold font-mono">
                  <span>ID: #{member.cardNumber}</span>
                </div>

                {/* Full Name */}
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                  {member.firstName} {member.lastName}
                </div>

                {/* Personal ID */}
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  პირადი: <span className="font-mono">{member.personalId}</span>
                </div>

                {/* Email */}
                <div className="text-xs sm:text-sm text-slate-500">
                  Email: {member.email || '-'}
                </div>

                {/* Plan label */}
                <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {getPlanLabel(member)}
                </div>

                {/* Status + Activation + Expiry dates */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">სტატუსი:</span>
                    {renderStatusBadge(member.status)}
                  </div>

                  <div className="text-slate-500">
                    გააქტიურდა: <span className="font-mono text-slate-700 dark:text-slate-300">{member.startDate}</span>
                  </div>

                  <div className="text-amber-500 font-bold">
                    ვადა: <span className="font-mono">{member.endDate}</span>
                  </div>
                </div>

                {/* Notes if any */}
                {member.notes && (
                  <div className="text-xs text-slate-400 italic pt-1">
                    შენიშვნა: {member.notes}
                  </div>
                )}
              </div>

              {/* Action Buttons Column (+ button as in Screenshot 3) */}
              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                {/* Fast Check-in action if active */}
                {member.status === 'active' && (
                  <button
                    type="button"
                    onClick={() => onQuickCheckInMember(member)}
                    title="შესვლის დაფიქსირება"
                    className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    შესვლა
                  </button>
                )}

                {/* The blue "+" button matching Screenshot 3 */}
                <button
                  type="button"
                  onClick={() => onSelectMemberAction(member)}
                  aria-label="Manage member"
                  className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-[#2563EB] text-[#2563EB] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                >
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
