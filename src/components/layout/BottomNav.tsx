import React from 'react';
import { ListFilter, Calendar, Search, MoreHorizontal } from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { ViewMode } from '../../types/log';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView } = useLog();

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      id: 'feed',
      label: 'Log',
      icon: <ListFilter size={20} />,
    },
    {
      id: 'calendar',
      label: 'Takvim',
      icon: <Calendar size={20} />,
    },
    {
      id: 'search',
      label: 'Arama',
      icon: <Search size={20} />,
    },
    {
      id: 'more',
      label: 'Daha Fazla',
      icon: <MoreHorizontal size={20} />,
    },
  ];

  return (
    <div className="h-16 bg-[#13161c]/95 backdrop-blur-md border-t border-[#1e232d] flex items-center justify-around px-2 select-none z-30">
      {navItems.map((item) => {
        const isActive = currentView === item.id || 
          (item.id === 'feed' && (currentView === 'detail' || currentView === 'futureDetail'));
        
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-[#00d68f]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
              {item.icon}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00d68f] rounded-full"></div>
              )}
            </div>
            <span className={`text-[11px] mt-1 font-medium ${isActive ? 'text-[#00d68f] font-semibold' : 'text-slate-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
