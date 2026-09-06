import React, { useState } from 'react';
import { Dumbbell, Plus, Star, Phone, UserCheck, Award } from 'lucide-react';
import { Trainer, Member } from '../types';

interface TrainersViewProps {
  trainers: Trainer[];
  members: Member[];
  onAddTrainer: (trainer: Trainer) => void;
  darkMode?: boolean;
}

export const TrainersView: React.FC<TrainersViewProps> = ({
  trainers,
  members,
  onAddTrainer,
  darkMode = false,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTrainer: Trainer = {
      id: `tr-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim() || '599 00 00 00',
      specialty: specialty.trim() || 'ზოგადი ფიტნეს ინსტრუქტორი',
      clientCount: 0,
      rating: 5.0,
      status: 'active',
    };

    onAddTrainer(newTrainer);
    setShowAddModal(false);
    setName('');
    setPhone('');
    setSpecialty('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ტრენერები
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fit Manager-ის სერტიფიცირებული ინსტრუქტორების გუნდი და კლიენტების განაწილება
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ტრენერის დამატება</span>
        </button>
      </div>

      {/* Trainers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {trainers.map((tr) => {
          const assignedMembers = members.filter((m) => m.trainerId === tr.id);
          const activeClientCount = tr.clientCount + assignedMembers.length;

          return (
            <div
              key={tr.id}
              className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-[#161D28] border-slate-700/80' : 'bg-white border-slate-200'
              } shadow-2xs space-y-3 flex flex-col justify-between`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] dark:text-blue-300 flex items-center justify-center font-bold">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{tr.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {tr.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {tr.specialty}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>აქტიური კლიენტები:</span>
                  <span className="font-bold text-[#2563EB]">{activeClientCount} წევრი</span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span>ტელეფონი:</span>
                  <span>{tr.phone}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 border ${darkMode ? 'bg-[#1A2332] border-slate-700' : 'bg-white border-slate-200'} shadow-xl space-y-4`}>
            <h3 className="text-lg font-bold">ახალი ტრენერის დამატება</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  სახელი და გვარი
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="მაგ: ალექსანდრე მესხი"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  სპეციალიზაცია
                </label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="მაგ: TRX, ფუნქციური წვრთნა"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  ტელეფონის ნომერი
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="599 ..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
                >
                  დამატება
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
