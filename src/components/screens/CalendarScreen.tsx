import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Clock, 
  Calendar as CalendarIcon,
  Circle,
  CheckCircle2
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { LogEntry } from '../../types/log';

export const CalendarScreen: React.FC = () => {
  const { logs, selectEntry, openNewEntryModal } = useLog();
  const [selectedDay, setSelectedDay] = useState<number>(7);

  // Days in September 2026 (Starts on Tuesday, Sept 1)
  // Weekdays: Pzt, Sal, Çar, Per, Cum, Cmt, Paz
  const daysHeader = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Matrix cells for September 2026:
  // Aug 31 is Monday (previous month)
  // Sept 1 is Tuesday, Sept 30 is Wednesday
  const calendarCells = [
    { day: 31, isCurrentMonth: false, monthOffset: -1 },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true }, // Highlighted in screenshot
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true }, // Has future event
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
  ];

  // Map events to day
  const getEventsForDay = (day: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const targetDate = `2026-09-${pad(day)}`;
    return logs.filter(l => l.date === targetDate);
  };

  const selectedDayEvents = getEventsForDay(selectedDay);

  // Day name for selected day
  const getDayName = (day: number) => {
    const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    // Sept 1, 2026 is Tuesday (index 1)
    const index = (1 + (day - 1)) % 7;
    return dayNames[index === 0 ? 6 : index - 1];
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#181d26]">
        <h1 className="text-xl font-bold tracking-tight text-white">Takvim</h1>
        <span className="text-xs font-mono text-slate-400">Eylül 2026</span>
      </div>

      {/* Month Navigator */}
      <div className="px-6 py-3 flex items-center justify-between text-sm">
        <button className="p-1 text-slate-400 hover:text-white rounded-lg">
          <ChevronLeft size={20} />
        </button>
        <span className="font-semibold text-slate-200 tracking-wide text-xs">
          Eylül 2026
        </span>
        <button className="p-1 text-slate-400 hover:text-white rounded-lg">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="px-4 pb-4">
        <div className="bg-[#13161f] border border-[#1d2330] rounded-2xl p-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysHeader.map((d, i) => (
              <span key={i} className="text-[11px] font-medium text-slate-500">
                {d}
              </span>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarCells.map((cell, idx) => {
              const isSelected = cell.isCurrentMonth && cell.day === selectedDay;
              const hasEvents = cell.isCurrentMonth && getEventsForDay(cell.day).length > 0;
              const hasPlan = cell.isCurrentMonth && cell.day === 15;

              return (
                <button
                  key={idx}
                  onClick={() => cell.isCurrentMonth && setSelectedDay(cell.day)}
                  disabled={!cell.isCurrentMonth}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-mono transition-all ${
                    !cell.isCurrentMonth
                      ? 'text-slate-600 opacity-40 cursor-default'
                      : isSelected
                      ? 'bg-[#00d68f] text-black font-bold shadow-glow-brand'
                      : hasPlan
                      ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/50'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{cell.day}</span>
                  {/* Indicator Dot */}
                  {hasEvents && !isSelected && !hasPlan && (
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mt-0.5"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Log List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 border-t border-[#181d26] pt-3">
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="text-xs font-medium text-slate-300">
            <span className="font-semibold text-white">{selectedDay} Eylül 2026</span>
            <span className="text-slate-500 ml-1.5">— {getDayName(selectedDay)}</span>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            {selectedDayEvents.length} kayıt
          </span>
        </div>

        {selectedDayEvents.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            Bu gün için kayıt bulunmuyor.
          </div>
        ) : (
          <div className="space-y-1.5">
            {selectedDayEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => selectEntry(ev.id)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#141720] border border-[#1e2430] hover:bg-[#191e2b] cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="font-mono text-xs text-slate-400 font-medium shrink-0">
                    {ev.time}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {ev.title}
                  </span>
                </div>

                <div className="shrink-0 flex items-center">
                  {ev.isCompleted ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  ) : (
                    <span className="text-[10px] text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/30 font-mono">
                      Plan
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
