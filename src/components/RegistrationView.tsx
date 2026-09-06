import React, { useState } from 'react';
import {
  Calendar,
  Dumbbell,
  Gift,
  CheckCircle2,
  UserPlus,
  Hash,
} from 'lucide-react';
import { Member, MembershipType, Trainer } from '../types';

interface RegistrationViewProps {
  trainers: Trainer[];
  onAddMember: (member: Member) => void;
  onNavigateToSearch: () => void;
  nextCardNumber: string;
  darkMode?: boolean;
}

interface PlanOption {
  type: MembershipType;
  title: string;
  price: number;
  subtitle?: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  { type: '12_workouts', title: '12 ვარჯიში', price: 70 },
  { type: 'morning_unlimited', title: 'დილის ულიმიტო', price: 90 },
  { type: 'unlimited', title: 'ულიმიტო', price: 110 },
  { type: 'other', title: 'სხვა', price: 0 },
  { type: 'single_visit', title: 'ერთჯერადი ვიზიტი', price: 15 },
];

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  trainers,
  onAddMember,
  onNavigateToSearch,
  nextCardNumber,
  darkMode = false,
}) => {
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [notes, setNotes] = useState('');

  // Membership selection
  const [selectedPlan, setSelectedPlan] = useState<MembershipType>('12_workouts');
  const [customPlanName, setCustomPlanName] = useState('სპეციალური პაკეტი');
  const [customPrice, setCustomPrice] = useState('80');

  // Add-on switches
  const [trainerService, setTrainerService] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(trainers[0]?.id || '');
  const [freeTrainerBonus, setFreeTrainerBonus] = useState(false);

  // Status
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<Member | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !personalId.trim()) {
      alert('გთხოვთ შეავსოთ სახელი, გვარი და პირადი ნომერი');
      return;
    }

    const planConfig = PLAN_OPTIONS.find((p) => p.type === selectedPlan);
    const finalPrice =
      selectedPlan === 'other'
        ? Number(customPrice) || 0
        : planConfig?.price || 70;

    // Dates
    const today = new Date();
    const startDateStr = `${String(today.getDate()).padStart(2, '0')}/${String(
      today.getMonth() + 1
    ).padStart(2, '0')}/${today.getFullYear()}`;

    // End date +30 days or +1 day for single
    const endDateObj = new Date(today);
    if (selectedPlan === 'single_visit') {
      // same day
    } else {
      endDateObj.setDate(endDateObj.getDate() + 30);
    }
    const endDateStr = `${String(endDateObj.getDate()).padStart(2, '0')}/${String(
      endDateObj.getMonth() + 1
    ).padStart(2, '0')}/${endDateObj.getFullYear()}`;

    const newMember: Member = {
      id: `m-${Date.now()}`,
      cardNumber: nextCardNumber,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      personalId: personalId.trim(),
      birthDate: birthDate.trim(),
      notes: notes.trim(),
      membershipPlan: selectedPlan,
      customPlanName: selectedPlan === 'other' ? customPlanName : undefined,
      price: finalPrice,
      status: 'active',
      startDate: startDateStr,
      endDate: endDateStr,
      totalWorkouts: selectedPlan === '12_workouts' ? 12 : undefined,
      remainingWorkouts: selectedPlan === '12_workouts' ? 12 : undefined,
      trainerService,
      trainerId: trainerService ? selectedTrainerId : undefined,
      freeTrainerBonus,
      registrationDate: startDateStr,
    };

    onAddMember(newMember);
    setRegisteredMember(newMember);
    setIsSuccess(true);
  };

  const handleResetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setBirthDate('');
    setPersonalId('');
    setNotes('');
    setSelectedPlan('12_workouts');
    setTrainerService(false);
    setFreeTrainerBonus(false);
    setIsSuccess(false);
    setRegisteredMember(null);
  };

  if (isSuccess && registeredMember) {
    return (
      <div className="py-12 px-4 text-center max-w-lg mx-auto animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          წევრი წარმატებით დარეგისტრირდა!
        </h3>
        <p className="text-sm text-slate-500 mt-2">
          {registeredMember.firstName} {registeredMember.lastName} დაემატა Fit Manager-ის ბაზას.
        </p>

        {/* Member preview card */}
        <div className={`mt-6 p-5 rounded-2xl border ${darkMode ? 'bg-[#1A2332] border-slate-700' : 'bg-slate-50 border-slate-200'} text-left space-y-2`}>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 font-bold font-mono text-xs">
              ID: #{registeredMember.cardNumber}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              აქტიური
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white">
            {registeredMember.firstName} {registeredMember.lastName}
          </div>
          <div className="text-xs text-slate-500">
            პირადი: <span className="font-mono">{registeredMember.personalId}</span>
          </div>
          <div className="text-xs text-slate-500">
            პაკეტი: <span className="font-bold text-slate-800 dark:text-slate-200">
              {registeredMember.membershipPlan === '12_workouts' && '12 ვარჯიში (70₾)'}
              {registeredMember.membershipPlan === 'morning_unlimited' && 'დილის ულიმიტო (90₾)'}
              {registeredMember.membershipPlan === 'unlimited' && 'ულიმიტო (110₾)'}
              {registeredMember.membershipPlan === 'single_visit' && 'ერთჯერადი ვიზიტი (15₾)'}
              {registeredMember.membershipPlan === 'other' && `${registeredMember.customPlanName} (${registeredMember.price}₾)`}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            მოქმედების ვადა: <span className="font-mono text-amber-600 font-bold">{registeredMember.endDate}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleResetForm}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            + შემდეგი წევრის რეგისტრაცია
          </button>
          <button
            type="button"
            onClick={onNavigateToSearch}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl border ${darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'} text-xs sm:text-sm font-semibold transition-all cursor-pointer`}
          >
            წევრთა ბაზაში გადასვლა
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Title + Card badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ახალი წევრი
        </h2>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-300 text-xs font-bold font-mono">
          <Hash className="w-4 h-4" />
          <span>შემდეგი ID: #{nextCardNumber}</span>
        </div>
      </div>

      {/* Inputs Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* სახელი */}
        <div>
          <input
            type="text"
            required
            placeholder="სახელი"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
          />
        </div>

        {/* გვარი */}
        <div>
          <input
            type="text"
            required
            placeholder="გვარი"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
          />
        </div>

        {/* ტელეფონი */}
        <div>
          <input
            type="tel"
            placeholder="ტელეფონი"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all font-mono`}
          />
        </div>

        {/* dd . mm . yyyy with calendar */}
        <div className="relative">
          <input
            type="text"
            placeholder="dd . mm . yyyy"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
          />
          <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* პირადი ნომერი */}
        <div>
          <input
            type="text"
            required
            maxLength={11}
            placeholder="პირადი ნომერი"
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all font-mono`}
          />
        </div>

        {/* შენიშვნა */}
        <div className="sm:col-span-2">
          <input
            type="text"
            placeholder="შენიშვნა"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-[#161D28] border-slate-700 text-white placeholder:text-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
            } text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
          />
        </div>
      </div>

      {/* აბონემენტი Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">
          აბონემენტი
        </h3>

        {/* 5 Selectable Plan Cards (rich purple/blue background) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {PLAN_OPTIONS.map((plan) => {
            const isSelected = selectedPlan === plan.type;
            return (
              <button
                key={plan.type}
                type="button"
                onClick={() => setSelectedPlan(plan.type)}
                className={`p-5 rounded-2xl text-center text-white transition-all cursor-pointer min-h-[105px] flex flex-col items-center justify-center relative shadow-sm ${
                  isSelected
                    ? 'bg-[#3B42DB] ring-4 ring-[#2563EB]/40 shadow-lg scale-[1.02]'
                    : 'bg-[#353CD5] hover:bg-[#3B42DB] opacity-90 hover:opacity-100'
                }`}
              >
                <div className="text-sm sm:text-base font-bold leading-snug whitespace-pre-line">
                  {plan.title}
                </div>
                {plan.price > 0 && (
                  <div className="text-xs sm:text-sm font-semibold text-white/90 mt-1 font-mono">
                    {plan.price}₾
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* If 'სხვა' (other) is selected, show custom inputs */}
        {selectedPlan === 'other' && (
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-wrap gap-4 items-center animate-in fade-in duration-150">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                სპეციალური აბონემენტის დასახელება
              </label>
              <input
                type="text"
                value={customPlanName}
                onChange={(e) => setCustomPlanName(e.target.value)}
                placeholder="მაგ: VIP წლიური, სტუდენტური"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 text-xs font-medium"
              />
            </div>
            <div className="w-36">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                ფასი (₾)
              </label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="80"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 text-xs font-mono font-bold"
              />
            </div>
          </div>
        )}
      </div>

      {/* Add-on Toggles matching Screenshot 2 dashed containers */}
      <div className="space-y-3">
        {/* Toggle 1: ტრენერის სერვისი / პირადი ტრენერის მიბმა */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/10 flex flex-wrap items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                ტრენერის სერვისი
              </div>
              <div className="text-xs text-slate-500">
                პირადი ტრენერის მიბმა
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {trainerService && (
              <select
                value={selectedTrainerId}
                onChange={(e) => setSelectedTrainerId(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                {trainers.map((tr) => (
                  <option key={tr.id} value={tr.id}>
                    {tr.name} ({tr.specialty})
                  </option>
                ))}
              </select>
            )}

            {/* Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={trainerService}
              onClick={() => setTrainerService(!trainerService)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer relative ${
                trainerService ? 'bg-[#2563EB]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  trainerService ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Toggle 2: ტრენერის ერთჯერადი მომსახურება საჩუქრად */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/10 flex items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                ტრენერის ერთჯერადი მომსახურება საჩუქრად
              </div>
              <div className="text-xs text-slate-500">
                უფასო საჩუქარი პირველ რეგისტრაციაზე
              </div>
            </div>
          </div>

          {/* Switch Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={freeTrainerBonus}
            onClick={() => setFreeTrainerBonus(!freeTrainerBonus)}
            className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer relative ${
              freeTrainerBonus ? 'bg-[#2563EB]' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                freeTrainerBonus ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Form Submission Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>წევრის რეგისტრაცია და ბარათის გააქტიურება</span>
        </button>
      </div>
    </form>
  );
};
