import React, { useState } from 'react';
import { X, LogIn, RefreshCw, Pause, Play, MessageSquare, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { Member, MembershipType } from '../types';

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
  onRecordVisit: (member: Member) => void;
  onRenewPlan: (memberId: string, plan: MembershipType, newEndDate: string) => void;
  onToggleFreeze: (memberId: string) => void;
  onSendSms: (member: Member) => void;
  onUpdateMember: (updated: Member) => void;
  darkMode?: boolean;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  member,
  onClose,
  onRecordVisit,
  onRenewPlan,
  onToggleFreeze,
  onSendSms,
  onUpdateMember,
  darkMode = false,
}) => {
  if (!member) return null;

  const [activeTab, setActiveTab] = useState<'actions' | 'renew' | 'edit'>('actions');

  // Renew state
  const [renewPlan, setRenewPlan] = useState<MembershipType>(member.membershipPlan);

  // Edit state
  const [firstName, setFirstName] = useState(member.firstName);
  const [lastName, setLastName] = useState(member.lastName);
  const [phone, setPhone] = useState(member.phone);
  const [email, setEmail] = useState(member.email || '');
  const [notes, setNotes] = useState(member.notes || '');

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMember({
      ...member,
      firstName,
      lastName,
      phone,
      email,
      notes,
    });
    alert('მონაცემები განახლდა!');
    onClose();
  };

  const handleExecuteRenew = () => {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + 30);
    const endStr = `${String(end.getDate()).padStart(2, '0')}/${String(
      end.getMonth() + 1
    ).padStart(2, '0')}/${end.getFullYear()}`;

    onRenewPlan(member.id, renewPlan, endStr);
    alert(`აბონემენტი წარმატებით განახლდა! ახალი ვადა: ${endStr}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border ${
          darkMode ? 'bg-[#1A2332] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        } shadow-2xl space-y-5 animate-in zoom-in-95 duration-150`}
      >
        {/* Header: Member info + Close */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EBF9] dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 text-xs font-bold font-mono">
              <span>💳</span>
              <span>{member.cardNumber}</span>
            </div>
            <h3 className="text-xl font-black mt-1">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              პირადი: {member.personalId} | ტელ: {member.phone}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Sub-tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('actions')}
            className={`pb-2.5 px-3 transition-all cursor-pointer ${
              activeTab === 'actions'
                ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            სწრაფი ოპერაციები
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('renew')}
            className={`pb-2.5 px-3 transition-all cursor-pointer ${
              activeTab === 'renew'
                ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            განახლება
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`pb-2.5 px-3 transition-all cursor-pointer ${
              activeTab === 'edit'
                ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            რედაქტირება
          </button>
        </div>

        {/* TAB 1: Actions */}
        {activeTab === 'actions' && (
          <div className="space-y-3">
            {/* 1. Record Entry */}
            <button
              type="button"
              onClick={() => {
                onRecordVisit(member);
                onClose();
              }}
              className="w-full p-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <LogIn className="w-4 h-4" />
                <span>ტურნიკეტზე შესვლის დაფიქსირება</span>
              </div>
              <span className="text-[11px] opacity-80">ვიზიტი</span>
            </button>

            {/* 2. Freeze / Unfreeze */}
            <button
              type="button"
              onClick={() => {
                onToggleFreeze(member.id);
                onClose();
              }}
              className={`w-full p-3.5 rounded-2xl border ${
                member.status === 'frozen'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border-orange-300 bg-orange-50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300'
              } text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer transition-all`}
            >
              <div className="flex items-center gap-2.5">
                {member.status === 'frozen' ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
                <span>
                  {member.status === 'frozen' ? 'აბონემენტის განახლება (Unfreeze)' : 'დროებით შეჩერება (Freeze)'}
                </span>
              </div>
              <span className="text-[11px] font-mono">
                სტატუსი: {member.status}
              </span>
            </button>

            {/* 3. Send SMS */}
            <button
              type="button"
              onClick={() => {
                onSendSms(member);
                onClose();
              }}
              className={`w-full p-3.5 rounded-2xl border ${
                darkMode ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              } text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer transition-all`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span>SMS შეხსენების გაგზავნა</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {member.phone}
              </span>
            </button>
          </div>
        )}

        {/* TAB 2: Renew Plan */}
        {activeTab === 'renew' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-2 text-slate-600 dark:text-slate-300">
                აირჩიეთ გასაახლებელი პაკეტი
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRenewPlan('12_workouts')}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    renewPlan === '12_workouts'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  12 ვარჯიში (70₾)
                </button>
                <button
                  type="button"
                  onClick={() => setRenewPlan('morning_unlimited')}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    renewPlan === 'morning_unlimited'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  დილის ულიმიტო (90₾)
                </button>
                <button
                  type="button"
                  onClick={() => setRenewPlan('unlimited')}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    renewPlan === 'unlimited'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  ულიმიტო (110₾)
                </button>
                <button
                  type="button"
                  onClick={() => setRenewPlan('single_visit')}
                  className={`p-3 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    renewPlan === 'single_visit'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  ერთჯერადი (15₾)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleExecuteRenew}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>აბონემენტის განახლება (+30 დღე)</span>
            </button>
          </div>
        )}

        {/* TAB 3: Edit Details */}
        {activeTab === 'edit' && (
          <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">სახელი</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">გვარი</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">ტელეფონი</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">შენიშვნა</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>შენახვა</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
