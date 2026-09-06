import React, { useState } from 'react';
import { Download, Upload, FileSpreadsheet, CheckCircle2, Table } from 'lucide-react';
import { Member, Visit, ProductSale } from '../types';

interface ExcelViewProps {
  members: Member[];
  todayVisits: Visit[];
  darkMode?: boolean;
}

export const ExcelView: React.FC<ExcelViewProps> = ({
  members,
  todayVisits,
  darkMode = false,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const exportMembersCsv = () => {
    const headers = [
      'ID #',
      'სახელი',
      'გვარი',
      'პირადი ნომერი',
      'ტელეფონი',
      'Email',
      'აბონემენტი',
      'სტატუსი',
      'დაწყების თარიღი',
      'ვადის ამოწურვა',
      'დარჩენილი ვარჯიში',
    ];

    const rows = members.map((m) => [
      m.cardNumber,
      m.firstName,
      m.lastName,
      m.personalId,
      m.phone,
      m.email || '',
      m.membershipPlan,
      m.status,
      m.startDate,
      m.endDate,
      m.remainingWorkouts !== undefined ? m.remainingWorkouts : '-',
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join(
        '\n'
      );

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Fit_Manager_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('წევრთა ბაზა წარმატებით ჩამოიტვირთა CSV/Excel ფორმატში!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const exportVisitsCsv = () => {
    const headers = ['დრო', 'თარიღი', 'ID #', 'წევრი', 'პაკეტი', 'სტატუსი'];

    const rows = todayVisits.map((v) => [
      v.time,
      v.date,
      v.cardNumber,
      v.memberName,
      v.planName,
      v.status,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join(
        '\n'
      );

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Fit_Manager_Today_Visits_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('ვიზიტების ჟურნალი წარმატებით ჩამოიტვირთა!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Excel / CSV ექსპორტი და იმპორტი
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          გადმოწერეთ სრული მონაცემთა ბაზა Excel ფაილის სახით ბუღალტერიისა და ანალიტიკისთვის
        </p>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Members Export */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-white border-slate-200'} shadow-2xs space-y-4`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                წევრთა სრული ბაზა (.xlsx / .csv)
              </h3>
              <p className="text-xs text-slate-500">
                სულ: {members.length} რეგისტრირებული ჩანაწერი
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            შეიცავს: პირადი ნომერი, ტელეფონი, ID ნომერი, აბონემენტის ტიპი, მოქმედების ვადა, დარჩენილი ვარჯიშები და შენიშვნები.
          </p>

          <button
            type="button"
            onClick={exportMembersCsv}
            className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Excel / CSV გადმოწერა</span>
          </button>
        </div>

        {/* Visits Export */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-white border-slate-200'} shadow-2xs space-y-4`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 flex items-center justify-center font-bold">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                დღევანდელი ვიზიტების ჟურნალი
              </h3>
              <p className="text-xs text-slate-500">
                სულ: {todayVisits.length} დაფიქსირებული შესვლა
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            შეიცავს: ზუსტი დრო, თარიღი, წევრის სახელი, ID ნომერი, გამოყენებული პაკეტი და ტურნიკეტის სტატუსი.
          </p>

          <button
            type="button"
            onClick={exportVisitsCsv}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>ვიზიტების ჟურნალის გადმოწერა</span>
          </button>
        </div>
      </div>

      {/* Live Data Preview Table */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          მონაცემთა გადახედვა (პირველი 5 ჩანაწერი)
        </h4>
        <div className={`rounded-2xl border ${darkMode ? 'border-slate-800 bg-[#161D28]' : 'border-slate-200 bg-white'} overflow-hidden shadow-2xs`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${darkMode ? 'border-slate-800 bg-[#1A2332] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'} font-semibold`}>
                <tr>
                  <th className="px-4 py-2.5">ID #</th>
                  <th className="px-4 py-2.5">წევრი</th>
                  <th className="px-4 py-2.5">პირადი #</th>
                  <th className="px-4 py-2.5">ტელეფონი</th>
                  <th className="px-4 py-2.5">პაკეტი</th>
                  <th className="px-4 py-2.5 text-right">ვადა</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {members.slice(0, 5).map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-2.5 font-mono text-blue-600 font-bold">
                      #{m.cardNumber}
                    </td>
                    <td className="px-4 py-2.5 font-bold">
                      {m.firstName} {m.lastName}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-slate-500">
                      {m.personalId}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-slate-500">
                      {m.phone}
                    </td>
                    <td className="px-4 py-2.5">
                      {m.membershipPlan}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-amber-600 font-bold">
                      {m.endDate}
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
