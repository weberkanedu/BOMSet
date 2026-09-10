import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  MoreVertical, 
  Calendar, 
  Clock, 
  Bell, 
  MapPin, 
  CheckCircle2, 
  Tag, 
  UserCheck, 
  FileText,
  Trash2,
  Share2,
  AlertCircle
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { CategoryIcon } from '../common/CategoryIcon';

export const FutureDetailScreen: React.FC = () => {
  const { selectedEntry, setCurrentView, markAsCompleted, deleteEntry, triggerNotification } = useLog();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!selectedEntry) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
        <p>Planlanan olay bulunamadı.</p>
        <button 
          onClick={() => setCurrentView('feed')}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs"
        >
          Akışa Dön
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100 relative">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#181d26] bg-[#0c0e12]/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={() => setCurrentView('feed')}
            className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={21} />
          </button>
          <div className="flex items-center space-x-2.5 truncate">
            <CategoryIcon category={selectedEntry.category} size={18} showBackground className="w-8 h-8 !rounded-lg" />
            <h1 className="text-base font-bold text-white truncate tracking-tight">
              {selectedEntry.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1 relative">
          <button 
            onClick={() => triggerNotification(selectedEntry.title, selectedEntry.reminder || '30 dakika sonra')}
            className="p-2 text-slate-400 hover:text-amber-400 rounded-xl hover:bg-white/5 transition-colors"
            title="Bildirim Önizle"
          >
            <Bell size={18} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            title="Seçenekler"
          >
            <MoreVertical size={18} />
          </button>

          {/* Options menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 w-44 bg-[#1a1f2c] border border-slate-700/60 rounded-xl shadow-xl p-1 z-30 text-xs">
              <button
                onClick={() => {
                  deleteEntry(selectedEntry.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 text-left"
              >
                <Trash2 size={14} />
                <span>Planı Sil</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
            <span>Planlanan</span>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            ID: #{selectedEntry.id.slice(-5)}
          </span>
        </div>

        {/* Date, Time & Reminder card */}
        <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center space-x-2">
              <Calendar size={15} className="text-indigo-400 shrink-0" />
              <span className="font-semibold text-xs text-slate-200">
                {selectedEntry.dateFormatted || '15 Eylül 2026'}
              </span>
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-xs text-indigo-400 font-semibold bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-500/20">
              <Clock size={13} />
              <span>{selectedEntry.time || '14:00'}</span>
            </div>
          </div>

          {/* Reminder info */}
          <div className="pt-2 border-t border-[#1b212c] flex items-center space-x-2 text-xs text-amber-400/90 font-medium">
            <Bell size={14} className="text-amber-400" />
            <span>{selectedEntry.reminder || '30 dk önce hatırlat'}</span>
          </div>
        </div>

        {/* Category & Location Chips */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1b2230] border border-slate-700/40 text-xs font-medium text-slate-200">
            <CategoryIcon category={selectedEntry.category} size={14} />
            <span>{selectedEntry.categoryLabel}</span>
          </div>

          {selectedEntry.location && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1b2230] border border-slate-700/40 text-xs font-medium text-slate-300">
              <MapPin size={13} className="text-indigo-400" />
              <span>{selectedEntry.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Açıklama</span>
          <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl">
            <p className="text-xs leading-relaxed text-slate-200 font-normal">
              {selectedEntry.description || 'Ekran sorununu göstermek. Fiyat bilgisi almak.'}
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Notlar</span>
          <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl">
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedEntry.notes || 'Gerekli belgeleri yanımda götür.'}
            </p>
          </div>
        </div>

        {/* Extra Information */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Ek Bilgiler</span>
          <div className="divide-y divide-[#1b202c] bg-[#141720] border border-[#1e2430] rounded-2xl px-3.5 py-1 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400">Süre (tahmini)</span>
              <span className="font-medium text-slate-200">{selectedEntry.duration || '30 dk'}</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-400">Kişiler</span>
              <span className="text-slate-300">
                {selectedEntry.extraInfo?.personContact || selectedEntry.people || 'Teknik servis yetkilisi'}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1 pt-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Etiketler</span>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {(selectedEntry.tags || ['#telefon', '#servis']).map((tag, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg bg-[#161c28] text-indigo-400/90 text-[11px] font-mono border border-indigo-900/40"
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent Action Button: "Gerçekleştirildi olarak işaretle" */}
      <div className="p-3 bg-[#13161c] border-t border-[#1e232d] shadow-lg">
        <button
          onClick={() => markAsCompleted(selectedEntry.id)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#00d68f] hover:bg-[#00c281] text-black font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-glow-brand active:scale-[0.98]"
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          <span>Gerçekleştirildi olarak işaretle</span>
        </button>
      </div>
    </div>
  );
};
