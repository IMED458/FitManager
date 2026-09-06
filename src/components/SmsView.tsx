import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, Users, FileText, Smartphone } from 'lucide-react';
import { Member, SmsTemplate } from '../types';
import { INITIAL_SMS_TEMPLATES } from '../mockData';

interface SmsViewProps {
  members: Member[];
  preselectedMember?: Member | null;
  darkMode?: boolean;
}

interface SentSmsRecord {
  id: string;
  recipient: string;
  phone: string;
  text: string;
  time: string;
  date: string;
  status: 'sent' | 'delivered';
}

export const SmsView: React.FC<SmsViewProps> = ({
  members,
  preselectedMember,
  darkMode = false,
}) => {
  const [recipientType, setRecipientType] = useState<'individual' | 'expiring_soon' | 'expired' | 'all'>(
    preselectedMember ? 'individual' : 'expiring_soon'
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string>(preselectedMember?.id || members[0]?.id || '');
  const [customPhone, setCustomPhone] = useState(preselectedMember?.phone || '');
  const [smsText, setSmsText] = useState(INITIAL_SMS_TEMPLATES[0].text);
  const [sentRecords, setSentRecords] = useState<SentSmsRecord[]>([
    {
      id: 'sms-log-1',
      recipient: 'ლუკა ლუნცკიძე',
      phone: '598 12 44 88',
      text: 'მოგესალმებით! თქვენი აბონემენტი Fit Manager-ში ამოიწურა. გააგრძელეთ ვარჯიში საუკეთესო ფორმისთვის, გელით დარბაზში!',
      time: '10:15',
      date: '06/09/2026',
      status: 'delivered',
    },
  ]);

  const handleApplyTemplate = (template: SmsTemplate) => {
    setSmsText(template.text);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;

    let targetCount = 1;
    let targetName = 'ინდივიდუალური წევრი';
    let targetPhone = customPhone;

    if (recipientType === 'individual') {
      const mem = members.find((m) => m.id === selectedMemberId);
      if (mem) {
        targetName = `${mem.firstName} ${mem.lastName}`;
        targetPhone = mem.phone;
      }
    } else if (recipientType === 'expiring_soon') {
      targetCount = members.filter((m) => m.status === 'expiring_soon').length;
      targetName = `3 დღეში გასაახლებელი წევრები (${targetCount} ადრესატი)`;
      targetPhone = 'ჯგუფური SMS';
    } else if (recipientType === 'expired') {
      targetCount = members.filter((m) => m.status === 'expired').length;
      targetName = `ვადაგასული წევრები (${targetCount} ადრესატი)`;
      targetPhone = 'ჯგუფური SMS';
    } else {
      targetCount = members.length;
      targetName = `სრული ბაზა (${targetCount} ადრესატი)`;
      targetPhone = 'მასობრივი SMS';
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    const newRecord: SentSmsRecord = {
      id: `sent-${Date.now()}`,
      recipient: targetName,
      phone: targetPhone,
      text: smsText,
      time: timeStr,
      date: dateStr,
      status: 'delivered',
    };

    setSentRecords((prev) => [newRecord, ...prev]);
    alert(`SMS შეტყობინება წარმატებით გაიგზავნა: ${targetName}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          შეტყობინებების გაგზავნა (SMS Gateway)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          გაუგზავნეთ პერსონალური ან ჯგუფური SMS შეტყობინებები Fit Manager-ის წევრებს
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Composer & Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Templates */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>მზა შაბლონები:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {INITIAL_SMS_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    smsText === tmpl.text
                      ? 'border-[#2563EB] bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#161D28]'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white mb-1">
                    {tmpl.title}
                  </div>
                  <div className="text-slate-500 line-clamp-2 text-[11px] leading-relaxed">
                    {tmpl.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#161D28] border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
            {/* Recipient Audience Radio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                ადრესატების აუდიტორია
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRecipientType('expiring_soon')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                    recipientType === 'expiring_soon'
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  3 დღეში გასაახლებელი ({members.filter((m) => m.status === 'expiring_soon').length})
                </button>

                <button
                  type="button"
                  onClick={() => setRecipientType('expired')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                    recipientType === 'expired'
                      ? 'bg-[#851818] text-white border-[#851818]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ვადაგასული ({members.filter((m) => m.status === 'expired').length})
                </button>

                <button
                  type="button"
                  onClick={() => setRecipientType('individual')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                    recipientType === 'individual'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ინდივიდუალური წევრი
                </button>

                <button
                  type="button"
                  onClick={() => setRecipientType('all')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                    recipientType === 'all'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ყველა ({members.length})
                </button>
              </div>
            </div>

            {/* If Individual Selected */}
            {recipientType === 'individual' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    აირჩიეთ წევრი
                  </label>
                  <select
                    value={selectedMemberId}
                    onChange={(e) => {
                      setSelectedMemberId(e.target.value);
                      const m = members.find((x) => x.id === e.target.value);
                      if (m) setCustomPhone(m.phone);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        #{m.cardNumber} - {m.firstName} {m.lastName} ({m.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    ტელეფონის ნომერი
                  </label>
                  <input
                    type="text"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="599 ..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            )}

            {/* Message Text Area */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1 font-semibold text-slate-600 dark:text-slate-300">
                <span>ტექსტი</span>
                <span className="font-mono text-slate-400">
                  {smsText.length} სიმბოლო / ~{Math.ceil(smsText.length / 70)} SMS
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="შეიყვანეთ შეტყობინების ტექსტი..."
                className={`w-full p-4 rounded-xl border ${
                  darkMode
                    ? 'bg-[#1A2332] border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] transition-all`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SMS-ის გაგზავნა</span>
            </button>
          </form>
        </div>

        {/* Right 1 Col: Sent SMS History & Phone Preview */}
        <div className="space-y-4">
          <div className="text-sm font-bold flex items-center justify-between">
            <span>გაგზავნილი შეტყობინებები</span>
            <span className="text-xs text-slate-400 font-mono font-normal">
              {sentRecords.length} გაგზავნილი
            </span>
          </div>

          <div className="space-y-3">
            {sentRecords.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-[#161D28] border-slate-800' : 'bg-white border-slate-200'
                } space-y-1.5 shadow-2xs text-xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {rec.recipient}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ჩაბარდა
                  </span>
                </div>
                <div className="font-mono text-slate-400 text-[11px]">
                  {rec.phone} • {rec.time}
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] pt-1 italic leading-relaxed">
                  "{rec.text}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
