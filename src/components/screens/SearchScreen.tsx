import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Clock, 
  Tag, 
  FileText, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { SearchFilter, LogEntry } from '../../types/log';

export const SearchScreen: React.FC = () => {
  const { logs, selectEntry } = useLog();
  const [query, setQuery] = useState('matematik');
  const [filter, setFilter] = useState<SearchFilter>('all');

  const filterTabs: { id: SearchFilter; label: string }[] = [
    { id: 'all', label: 'Tümü' },
    { id: 'log', label: 'Log' },
    { id: 'plan', label: 'Plan' },
    { id: 'not', label: 'Not' },
  ];

  // Search logic
  const filtered = logs.filter(entry => {
    // Type filter
    if (filter === 'log' && entry.type !== 'log') return false;
    if (filter === 'plan' && entry.type !== 'plan') return false;
    if (filter === 'not' && (!entry.notes || entry.notes.trim() === '')) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    const matchTitle = entry.title.toLowerCase().includes(q);
    const matchDesc = entry.description?.toLowerCase().includes(q);
    const matchNotes = entry.notes?.toLowerCase().includes(q);
    const matchSubtitle = entry.subtitle?.toLowerCase().includes(q);
    const matchTags = entry.tags?.some(t => t.toLowerCase().includes(q));
    const matchCategory = entry.categoryLabel.toLowerCase().includes(q);

    return matchTitle || matchDesc || matchNotes || matchSubtitle || matchTags || matchCategory;
  });

  // Group by date
  const grouped = filtered.reduce((acc, log) => {
    const key = log.dateFormatted || log.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {} as Record<string, LogEntry[]>);

  // Helper to highlight matching text
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={i} className="text-emerald-400 bg-emerald-500/20 px-0.5 rounded font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100">
      {/* Search Input Bar */}
      <div className="px-4 pt-4 pb-2.5">
        <div className="relative flex items-center">
          <Search size={17} className="absolute left-3.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Olay, etiket, not veya kategori ara..."
            className="w-full bg-[#151922] border border-[#222836] rounded-2xl pl-10 pr-9 py-2.5 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-full"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-1.5 flex items-center space-x-2 border-b border-[#181d26]">
        {filterTabs.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#1e2634] text-white border border-slate-600/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Results Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            <Search size={32} className="mx-auto mb-2 opacity-30" />
            <p>"{query}" ile eşleşen kayıt bulunamadı.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateFormatted, entries]) => (
            <div key={dateFormatted} className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 px-1">
                {dateFormatted}
              </div>

              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => selectEntry(entry.id)}
                    className="p-3 rounded-2xl bg-[#141720] border border-[#1e2430] hover:bg-[#191e2b] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 min-w-0 pr-2">
                      <CategoryIcon 
                        category={entry.category} 
                        size={16} 
                        showBackground 
                        className="w-9 h-9 !rounded-xl shrink-0" 
                      />

                      <div className="min-w-0">
                        <div className="flex items-baseline space-x-2">
                          <span className="font-mono text-xs text-slate-400">
                            {entry.time}
                          </span>
                          <span className="text-slate-600 font-mono text-[10px]">|</span>
                          <h4 className="text-xs font-semibold text-slate-200 truncate">
                            {highlightMatch(entry.title, query)}
                          </h4>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {highlightMatch(entry.subtitle || `${entry.categoryLabel} · ${entry.duration}`, query)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-[10px] font-mono text-slate-500">
                      {entry.type === 'plan' ? (
                        <span className="text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-500/30">
                          Plan
                        </span>
                      ) : (
                        <span className="text-emerald-400">
                          Log
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
