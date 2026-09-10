import React from 'react';
import { 
  Menu, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Clock, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { FilterTab, LogEntry } from '../../types/log';

export const FeedScreen: React.FC = () => {
  const { 
    filteredLogs, 
    filterTab, 
    setFilterTab, 
    selectEntry, 
    openNewEntryModal,
    setCurrentView,
    triggerNotification
  } = useLog();

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'Tümü' },
    { id: 'completed', label: 'Gerçekleşen' },
    { id: 'planned', label: 'Planlanan' },
    { id: 'archived', label: 'Arşiv' },
  ];

  // Group logs by date
  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const key = `${log.dateFormatted}#${log.dayName}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(log);
    return acc;
  }, {} as Record<string, LogEntry[]>);

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100 relative">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-[#181d26]">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setCurrentView('more')}
            className="p-1.5 -ml-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Log
            </h1>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold tracking-wider">
              v2.4
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button 
            onClick={() => triggerNotification()}
            title="Bildirim Simülatörü"
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-colors"
          >
            <Bell size={19} />
          </button>
          <button 
            onClick={() => setCurrentView('search')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => {
              // Cycle tabs or open filter menu
              const currentIndex = tabs.findIndex(t => t.id === filterTab);
              const nextIndex = (currentIndex + 1) % tabs.length;
              setFilterTab(tabs[nextIndex].id);
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <SlidersHorizontal size={19} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2.5 flex items-center space-x-2 overflow-x-auto no-scrollbar border-b border-[#161a23]">
        {tabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-[#1e2634] text-white shadow-sm border border-slate-600/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Chronological Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {Object.keys(groupedLogs).length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Clock size={40} className="mx-auto mb-3 opacity-30 stroke-1" />
            <p className="text-sm font-medium">Bu filtrede kayıt bulunamadı.</p>
            <button 
              onClick={() => openNewEntryModal('log')}
              className="mt-4 px-4 py-2 text-xs bg-[#161b24] hover:bg-[#1d232f] text-emerald-400 rounded-xl border border-emerald-500/20"
            >
              + İlk kaydını oluştur
            </button>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([groupKey, entries]) => {
            const [dateFormatted, dayName] = groupKey.split('#');
            return (
              <div key={groupKey} className="space-y-3">
                {/* Date Header */}
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium px-1">
                  <span className="text-slate-200 font-semibold">{dateFormatted}</span>
                  <span className="text-slate-500 font-normal">{dayName}</span>
                  <div className="flex-1 border-t border-[#1a1f2c] ml-2"></div>
                </div>

                {/* Event Rows Container with subtle timeline vertical rail */}
                <div className="relative pl-2 space-y-2.5">
                  {/* Subtle vertical timeline rail */}
                  <div className="absolute left-[26px] top-3 bottom-3 w-[1.5px] bg-[#1a202c]"></div>

                  {entries.map((entry) => {
                    const isPlan = entry.type === 'plan' && !entry.isCompleted;

                    return (
                      <div
                        key={entry.id}
                        onClick={() => selectEntry(entry.id)}
                        className={`group relative flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all duration-150 active:scale-[0.985] ${
                          isPlan
                            ? 'bg-[#151726]/80 hover:bg-[#1b1e32] border border-indigo-500/30'
                            : 'bg-[#14171e] hover:bg-[#191d26] border border-[#1d222e]'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0 pr-2 z-10">
                          {/* Category / Status Icon */}
                          <div className="relative">
                            <CategoryIcon 
                              category={entry.category} 
                              size={16} 
                              showBackground 
                              className="w-9 h-9 !rounded-xl"
                            />
                            {isPlan && (
                              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[#0c0e12] animate-pulse"></div>
                            )}
                          </div>

                          {/* Time & Title & Metadata */}
                          <div className="min-w-0">
                            <div className="flex items-baseline space-x-2">
                              {/* Monospace Timestamp */}
                              <span className={`font-mono font-medium text-xs tracking-tight ${
                                isPlan ? 'text-indigo-400' : 'text-slate-300'
                              }`}>
                                {entry.time}
                              </span>
                              <span className="text-slate-600 font-mono text-[10px]">|</span>
                              {/* Event Title */}
                              <h3 className="text-[13px] font-semibold text-slate-100 truncate group-hover:text-white">
                                {entry.title}
                              </h3>
                            </div>

                            {/* Subtitle / Details row */}
                            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-0.5 truncate">
                              {isPlan ? (
                                <span className="inline-flex items-center text-indigo-400/90 text-[10px] font-medium bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                                  Planlanan
                                </span>
                              ) : null}
                              <span>{entry.subtitle || `${entry.categoryLabel} · ${entry.duration || ''}`}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right side icon */}
                        <div className="shrink-0 flex items-center space-x-1 text-slate-500 group-hover:text-slate-300">
                          {isPlan ? (
                            <span className="text-[10px] text-indigo-300 font-mono bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-500/30">
                              {entry.reminder ? '🔔' : 'Plan'}
                            </span>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Button (+) */}
      <button
        onClick={() => openNewEntryModal('log')}
        className="absolute right-5 bottom-4 w-13 h-13 rounded-2xl bg-[#00d68f] hover:bg-[#00c281] text-black shadow-glow-brand flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20"
        aria-label="Yeni Kayıt"
      >
        <Plus size={26} strokeWidth={2.8} />
      </button>
    </div>
  );
};
