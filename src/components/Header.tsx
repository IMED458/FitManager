import React from 'react';
import { LogOut, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  operatorName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onLogout,
  operatorName = 'მთავარი ოპერატორი',
}) => {
  return (
    <header className="w-full bg-[#1A2332] text-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-800/80 px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 transition-colors">
      {/* Brand: Logo + Name */}
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* FM Original Logo Badge */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#B7E529] text-[#111315] flex items-center justify-center font-black text-lg shadow-md shrink-0 tracking-tight">
          FM
        </div>

        {/* Brand Text: Fit Manager */}
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-white">Fit </span>
            <span className="text-[#B7E529] font-black">Manager</span>
          </h1>
        </div>
      </div>

      {/* Right controls: Operator info, role pill, logout, theme switch */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden md:inline text-slate-400 text-sm font-medium">
          {operatorName}
        </span>

        {/* Role badge pill */}
        <div className="px-3.5 py-1.5 rounded-full bg-[#243044] border border-slate-700/70 text-slate-200 text-xs sm:text-sm font-medium shadow-inner">
          ოპერატორი
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 rotate-180" />
          <span>გასვლა</span>
        </button>

        {/* Dark / Light theme toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle theme"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-800 hover:bg-slate-100 flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-500 fill-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-amber-500 fill-amber-500" />
          )}
        </button>
      </div>
    </header>
  );
};
