import React from 'react';
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  CheckCircle, 
  ChevronRight,
  ExternalLink,
  Volume2
} from 'lucide-react';
import { useLog } from '../../context/LogContext';

export const NotificationSimulator: React.FC = () => {
  const { simulatedNotification, setCurrentView, selectEntry, logs } = useLog();

  const handleOpenEvent = () => {
    const planned = logs.find(l => l.id === 'plan-1') || logs.find(l => l.type === 'plan');
    if (planned) {
      selectEntry(planned.id);
    } else {
      setCurrentView('feed');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c10] text-slate-100 relative overflow-hidden select-none">
      {/* Subtle wallpaper gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-[#0a0c10] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top action bar to exit simulator */}
      <div className="px-4 py-3 flex items-center justify-between z-10 border-b border-white/5">
        <button
          onClick={() => setCurrentView('feed')}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-xl bg-white/5"
        >
          <ArrowLeft size={15} />
          <span>Uygulamaya Dön</span>
        </button>

        <span className="text-[11px] font-mono text-slate-400">
          Kilit Ekranı Bildirimi
        </span>
      </div>

      {/* Lockscreen Clock */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6 z-10 space-y-8">
        <div className="text-center space-y-1">
          <div className="text-6xl font-light tracking-tight text-white font-mono">
            {simulatedNotification?.time || '13:30'}
          </div>
          <div className="text-sm font-medium text-slate-400">
            15 Eylül Salı
          </div>
        </div>

        {/* Push Notification Card */}
        <div 
          onClick={handleOpenEvent}
          className="w-full max-w-sm bg-[#181d28]/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-3.5 shadow-2xl space-y-2 cursor-pointer transition-all duration-200 hover:border-indigo-500/60 hover:scale-[1.01] active:scale-[0.99]"
        >
          {/* Notification Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-md bg-[#00d68f] text-black flex items-center justify-center font-bold text-[10px]">
                L
              </div>
              <span className="text-xs font-semibold text-slate-200">Log</span>
            </div>

            <span className="text-[10px] text-slate-400">Şimdi</span>
          </div>

          {/* Notification Body */}
          <div className="space-y-1 pl-1">
            <div className="flex items-center space-x-1.5 text-xs font-medium text-amber-400">
              <Bell size={13} />
              <span>{simulatedNotification?.body || '30 dakika sonra'}</span>
            </div>

            <h4 className="text-sm font-semibold text-white">
              {simulatedNotification?.title || 'Telefonu servise götür'}
            </h4>

            {simulatedNotification?.location && (
              <div className="flex items-center space-x-1 text-xs text-slate-400">
                <MapPin size={12} className="text-slate-400" />
                <span>{simulatedNotification.location}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-400">
            <span>Açmak için dokunun</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Helper note */}
        <div className="text-center text-xs text-slate-400 max-w-xs leading-relaxed">
          Planlanan olayların hatırlatıcı zamanı geldiğinde bu şekilde anlık bildirim alırsınız.
        </div>
      </div>
    </div>
  );
};
