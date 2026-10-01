import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  Member,
  Visit,
  Trainer,
  Product,
  ProductSale,
  MembershipType,
  Language,
} from './types';
import {
  INITIAL_MEMBERS,
  INITIAL_TODAY_VISITS,
  INITIAL_TRAINERS,
  INITIAL_PRODUCTS,
} from './mockData';

// SaaS Marketing Presentation Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesBento } from './components/FeaturesBento';
import { PortalsSection } from './components/PortalsSection';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { TrialSection } from './components/TrialSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

// Live Gym Management Software Components
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { RegistrationView } from './components/RegistrationView';
import { SearchView } from './components/SearchView';
import { EntryView } from './components/EntryView';
import { ExpiredView } from './components/ExpiredView';
import { ProductsView } from './components/ProductsView';
import { TrainersView } from './components/TrainersView';
import { SmsView } from './components/SmsView';
import { ExcelView } from './components/ExcelView';
import { SettingsView } from './components/SettingsView';
import { MemberModal } from './components/MemberModal';

import { ArrowLeft } from 'lucide-react';

export default function App() {
  // Application Mode: 'website' for SaaS marketing landing page, 'software' for the operational Fit Manager system
  const [appMode, setAppMode] = useState<'website' | 'software'>('website');

  // Language state for SaaS Website
  const [lang, setLang] = useState<Language>('ka');

  // Modal States for Website
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalType, setLeadModalType] = useState<'trial' | 'demo'>('trial');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  // Software Operational State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Core Gym Data State (Shared across the app)
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [todayVisits, setTodayVisits] = useState<Visit[]>(INITIAL_TODAY_VISITS);
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Selected Member for Modal Action
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [smsPreselectedMember, setSmsPreselectedMember] = useState<Member | null>(null);

  // Auto-calculated next card number
  const nextCardNumber = String(
    Math.max(
      1405,
      ...members.map((m) => {
        const num = parseInt(m.cardNumber, 10);
        return isNaN(num) ? 0 : num;
      })
    ) + 1
  );

  // Sync dark mode class on document when inside software
  useEffect(() => {
    if (appMode === 'software' && darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, appMode]);

  // Lead modal handlers
  const handleOpenTrial = (planName?: string) => {
    setSelectedPlan(planName);
    setLeadModalType('trial');
    setLeadModalOpen(true);
  };

  const handleOpenDemo = () => {
    setLeadModalType('demo');
    setLeadModalOpen(true);
  };

  // Switch to Software Mode — the demo is open, there is no sign-in
  const handleSwitchToSoftware = () => {
    setAppMode('software');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Leave the demo and go back to the marketing site
  const handleSwitchToWebsite = () => {
    setAppMode('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for Gym Operations
  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);
  };

  const handleRecordVisit = (newVisit: Visit) => {
    setTodayVisits((prev) => [newVisit, ...prev]);

    // If member has limited workouts, decrement
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === newVisit.memberId && m.remainingWorkouts !== undefined) {
          return {
            ...m,
            remainingWorkouts: Math.max(0, m.remainingWorkouts - 1),
          };
        }
        return m;
      })
    );
  };

  const handleQuickCheckInMember = (member: Member) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const planName =
      member.membershipPlan === '12_workouts'
        ? '12 ვარჯიში'
        : member.membershipPlan === 'morning_unlimited'
        ? 'დილის ულიმიტო'
        : member.membershipPlan === 'unlimited'
        ? 'ულიმიტო'
        : member.membershipPlan === 'single_visit'
        ? 'ერთჯერადი ვიზიტი'
        : member.customPlanName || 'სხვა';

    const newVisit: Visit = {
      id: `v-${Date.now()}`,
      memberId: member.id,
      memberName: `${member.firstName} ${member.lastName}`,
      cardNumber: member.cardNumber,
      time: timeStr,
      date: dateStr,
      planName,
      remainingWorkouts:
        member.remainingWorkouts !== undefined
          ? Math.max(0, member.remainingWorkouts - 1)
          : undefined,
      status: 'allowed',
    };

    handleRecordVisit(newVisit);
  };

  const handleRenewPlan = (memberId: string, plan: MembershipType, newEndDate: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const today = new Date();
          const startDateStr = `${String(today.getDate()).padStart(2, '0')}/${String(
            today.getMonth() + 1
          ).padStart(2, '0')}/${today.getFullYear()}`;

          return {
            ...m,
            membershipPlan: plan,
            startDate: startDateStr,
            endDate: newEndDate,
            status: 'active',
            remainingWorkouts: plan === '12_workouts' ? 12 : undefined,
          };
        }
        return m;
      })
    );
  };

  const handleToggleFreeze = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextStatus = m.status === 'frozen' ? 'active' : 'frozen';
          return {
            ...m,
            status: nextStatus,
          };
        }
        return m;
      })
    );
  };

  const handleUpdateMember = (updated: Member) => {
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setSelectedMember(null);
  };

  const handleSellProduct = (sale: ProductSale) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === sale.productId) {
          return {
            ...p,
            stock: Math.max(0, p.stock - sale.quantity),
          };
        }
        return p;
      })
    );
  };

  const handleAddStock = (productId: string, quantityToAdd: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stock: p.stock + quantityToAdd,
          };
        }
        return p;
      })
    );
  };

  const handleAddTrainer = (newTrainer: Trainer) => {
    setTrainers((prev) => [...prev, newTrainer]);
  };

  const handleResetDemoData = () => {
    setMembers(INITIAL_MEMBERS);
    setTodayVisits(INITIAL_TODAY_VISITS);
    setTrainers(INITIAL_TRAINERS);
    setProducts(INITIAL_PRODUCTS);
  };

  // ==========================================
  // FULL OPERATIONAL SOFTWARE DEMO (open, no sign-in)
  // ==========================================
  if (appMode === 'software') {
    return (
      <div
        className={`min-h-screen transition-colors duration-200 ${
          darkMode ? 'bg-[#111315] text-slate-100' : 'bg-[#FAFAF8] text-[#111315]'
        }`}
      >
        {/* Top Operational Breadcrumb & Switcher Bar */}
        <div className="bg-[#111315] text-white border-b border-slate-800 px-4 py-2.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={handleSwitchToWebsite}
              className="flex items-center gap-2 font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← ვებგვერდზე დაბრუნება (Landing Page)</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Fit Manager v3.1 (Operational System)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono font-bold text-[11px] border border-blue-800">
                27 დღევანდელი ვიზიტი
              </span>
            </div>
          </div>
        </div>

        {/* Main Software Container */}
        <div className="p-3 sm:p-5 md:p-6 flex flex-col items-center">
          <div className="w-full max-w-7xl space-y-3 sm:space-y-4">
            {/* Header with Red Shield FH Crest */}
            <Header
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onLogout={handleSwitchToWebsite}
              operatorName="მთავარი ოპერატორი"
            />

            {/* Navigation Pills (2 rows centered) */}
            <Navigation
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              darkMode={darkMode}
            />

            {/* Main Content Area */}
            <main
              className={`w-full rounded-3xl sm:rounded-4xl p-6 sm:p-8 md:p-10 border transition-all duration-200 shadow-sm ${
                darkMode
                  ? 'bg-[#1A2332] border-slate-800 text-slate-100 shadow-black/40'
                  : 'bg-white border-slate-100 text-slate-900 shadow-slate-200/50'
              }`}
            >
              {activeTab === 'dashboard' && (
                <DashboardView
                  members={members}
                  todayVisits={todayVisits}
                  onNavigate={setActiveTab}
                  onQuickCheckIn={() => setActiveTab('entry')}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'registration' && (
                <RegistrationView
                  trainers={trainers}
                  onAddMember={handleAddMember}
                  onNavigateToSearch={() => setActiveTab('search')}
                  nextCardNumber={nextCardNumber}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'search' && (
                <SearchView
                  members={members}
                  onSelectMemberAction={(member) => setSelectedMember(member)}
                  onQuickCheckInMember={handleQuickCheckInMember}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'entry' && (
                <EntryView
                  members={members}
                  todayVisits={todayVisits}
                  onRecordVisit={handleRecordVisit}
                  onRenewMember={(member) => setSelectedMember(member)}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'expired' && (
                <ExpiredView
                  members={members}
                  onRenewMember={(member) => setSelectedMember(member)}
                  onSendSmsToMember={(member) => {
                    setSmsPreselectedMember(member);
                    setActiveTab('notifications');
                  }}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'products' && (
                <ProductsView
                  products={products}
                  members={members}
                  onSellProduct={handleSellProduct}
                  onAddStock={handleAddStock}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'trainers' && (
                <TrainersView
                  trainers={trainers}
                  members={members}
                  onAddTrainer={handleAddTrainer}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView
                  onResetDemoData={handleResetDemoData}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'notifications' && (
                <SmsView
                  members={members}
                  preselectedMember={smsPreselectedMember}
                  darkMode={darkMode}
                />
              )}

              {activeTab === 'excel' && (
                <ExcelView
                  members={members}
                  todayVisits={todayVisits}
                  darkMode={darkMode}
                />
              )}
            </main>
          </div>
        </div>

        {/* Member Action Modal */}
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onRecordVisit={handleQuickCheckInMember}
            onRenewPlan={handleRenewPlan}
            onToggleFreeze={handleToggleFreeze}
            onSendSms={(member) => {
              setSmsPreselectedMember(member);
              setSelectedMember(null);
              setActiveTab('notifications');
            }}
            onUpdateMember={handleUpdateMember}
            darkMode={darkMode}
          />
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER 3: SAAS MARKETING PRESENTATION WEBSITE
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111315] selection:bg-[#B7E529] selection:text-[#111315]">
      {/* 1. Global Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang(lang === 'ka' ? 'en' : 'ka')}
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
        onEnterDemo={handleSwitchToSoftware}
        onSwitchToSoftware={handleSwitchToSoftware}
      />

      {/* 2. Hero Section with Interactive Preview */}
      <Hero
        lang={lang}
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
        onSwitchToSoftware={handleSwitchToSoftware}
      />

      {/* 3. Social Proof & Trust Strip */}
      <TrustStrip lang={lang} />

      {/* 4. The Problem Fit Manager Solves */}
      <ProblemSection lang={lang} onOpenTrial={() => handleOpenTrial()} />

      {/* 5. Complete Bento Grid of Features */}
      <FeaturesBento lang={lang} onOpenTrial={() => handleOpenTrial()} />

      {/* 6. Dedicated Portals: Member & Trainer */}
      <PortalsSection lang={lang} />

      {/* 7. 4-Step Quick Launch Workflow */}
      <HowItWorks lang={lang} onOpenTrial={() => handleOpenTrial()} />

      {/* 8. Transparent Pricing & Feature Comparison */}
      <PricingSection
        lang={lang}
        onOpenTrial={handleOpenTrial}
        onOpenDemo={handleOpenDemo}
      />

      {/* 9. High-Conversion 14-Day Trial Banner */}
      <TrialSection
        lang={lang}
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
      />

      {/* 10. Frequently Asked Questions */}
      <FaqSection lang={lang} onOpenDemo={handleOpenDemo} />

      {/* 11. Contact & Lead Form */}
      <ContactSection lang={lang} />

      {/* 12. Professional Footer */}
      <Footer
        lang={lang}
        onLanguageChange={setLang}
        onOpenTrial={() => handleOpenTrial()}
        onOpenDemo={handleOpenDemo}
      />

      {/* Modals */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        lang={lang}
        initialPlan={selectedPlan}
        type={leadModalType}
      />
    </div>
  );
}
