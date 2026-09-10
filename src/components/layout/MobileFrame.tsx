import React from 'react';
import { StatusBar } from './StatusBar';
import { BottomNav } from './BottomNav';
import { useLog } from '../../context/LogContext';
import { FeedScreen } from '../screens/FeedScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { FutureDetailScreen } from '../screens/FutureDetailScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { NotificationSimulator } from '../screens/NotificationSimulator';
import { MoreScreen } from '../screens/MoreScreen';
import { NewEntryModal } from '../screens/NewEntryModal';
import { Smartphone, LayoutGrid, RotateCcw } from 'lucide-react';

export const MobileFrame: React.FC = () => {
  const { currentView, displayLayout, setDisplayLayout, resetData } = useLog();

  const renderActiveScreen = () => {
    switch (currentView) {
      case 'feed':
        return <FeedScreen />;
      case 'detail':
        return <DetailScreen />;
      case 'futureDetail':
        return <FutureDetailScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'search':
        return <SearchScreen />;
      case 'notification':
        return <NotificationSimulator />;
      case 'more':
        return <MoreScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07080b] flex flex-col items-center justify-start sm:py-6 sm:px-4 text-slate-100">
      {/* Top Floating Control Bar on Desktop */}
      <header className="w-full max-w-5xl mb-4 px-4 hidden sm:flex items-center justify-between z-30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#00d68f] text-black font-bold flex items-center justify-center shadow-glow-brand text-base">
            L
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Log <span className="text-xs text-[#00d68f] font-normal font-mono">— Hayatının Zaman Çizelgesi</span>
            </h1>
            <p className="text-[11px] text-slate-400">Kişisel Kronolojik Olay Kayıt Sistemi & Veritabanı</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View mode toggle */}
          <div className="p-1 bg-[#12151d] border border-slate-800 rounded-xl flex">
            <button
              onClick={() => setDisplayLayout('device')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                displayLayout === 'device'
                  ? 'bg-[#00d68f] text-black font-semibold shadow-glow-brand'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={14} />
              <span>İnteraktif Mobil</span>
            </button>
            <button
              onClick={() => setDisplayLayout('showcase')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                displayLayout === 'showcase'
                  ? 'bg-indigo-600 text-white font-semibold shadow-glow-plan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={14} />
              <span>8 Ekran Vitrini</span>
            </button>
          </div>

          <button
            onClick={resetData}
            title="Verileri sıfırla"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      {/* Realistic Mobile Device Container */}
      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-[844px] bg-[#0c0e12] sm:rounded-[46px] overflow-hidden sm:border-[10px] sm:border-[#222734] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col transition-all">
        {/* Notch / Punch hole for camera on desktop mockup */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#141721] rounded-full hidden sm:block z-50 pointer-events-none border border-white/5">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#07090e] rounded-full border border-white/10"></div>
        </div>

        {/* Mobile Status Bar */}
        <StatusBar />

        {/* Active Screen Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {renderActiveScreen()}
          
          {/* New Entry Modal overlay */}
          <NewEntryModal />
        </main>

        {/* Bottom Navigation (visible on main tabs) */}
        {currentView !== 'notification' && <BottomNav />}
      </div>
    </div>
  );
};
