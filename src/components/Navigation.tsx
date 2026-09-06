import React from 'react';
import { NavigationTab } from '../types';

interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  darkMode?: boolean;
  counts?: {
    expired?: number;
    expiringSoon?: number;
    todayVisits?: number;
  };
}

interface NavItem {
  id: NavigationTab;
  label: string;
}

const PRIMARY_ROW_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'დეშბორდი' },
  { id: 'registration', label: 'რეგისტრაცია' },
  { id: 'search', label: 'ძიება' },
  { id: 'entry', label: 'შესვლა' },
  { id: 'expired', label: 'ვადაგასული' },
  { id: 'products', label: 'პროდუქტები' },
  { id: 'trainers', label: 'ტრენერები' },
  { id: 'settings', label: 'პარამეტრები' },
];

const SECONDARY_ROW_ITEMS: NavItem[] = [
  { id: 'notifications', label: 'შეტყობინება' },
  { id: 'excel', label: 'Excel' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  darkMode = false,
}) => {
  const renderPill = (item: NavItem) => {
    const isActive = activeTab === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelectTab(item.id)}
        className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none ${
          isActive
            ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 scale-[1.02]'
            : darkMode
            ? 'bg-[#1E2736] text-slate-200 border border-slate-700/80 hover:bg-[#253246] hover:text-white shadow-xs'
            : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
        }`}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav className="w-full flex flex-col items-center gap-2.5 my-3 sm:my-4">
      {/* Primary Row */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {PRIMARY_ROW_ITEMS.map(renderPill)}
      </div>

      {/* Secondary Centered Row (შეტყობინება, Excel) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {SECONDARY_ROW_ITEMS.map(renderPill)}
      </div>
    </nav>
  );
};
