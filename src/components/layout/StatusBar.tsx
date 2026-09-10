import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  time = '21:47',
  className = '' 
}) => {
  return (
    <div className={`h-10 px-5 pt-2 flex items-center justify-between text-xs text-slate-300 font-mono select-none tracking-tight ${className}`}>
      <span className="font-semibold text-[13px] tracking-normal text-slate-200">{time}</span>
      <div className="flex items-center space-x-2">
        {/* Cellular signal */}
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-[3px] h-1.5 bg-slate-300 rounded-[0.5px]"></div>
          <div className="w-[3px] h-2 bg-slate-300 rounded-[0.5px]"></div>
          <div className="w-[3px] h-2.5 bg-slate-300 rounded-[0.5px]"></div>
          <div className="w-[3px] h-3 bg-slate-300 rounded-[0.5px]"></div>
        </div>
        {/* Wifi */}
        <Wifi size={14} className="text-slate-300 stroke-[2.2]" />
        {/* Battery */}
        <div className="flex items-center space-x-0.5">
          <div className="w-5 h-2.5 border border-slate-300 rounded-sm p-[1px] flex items-center">
            <div className="w-full h-full bg-slate-300 rounded-[0.5px]"></div>
          </div>
          <div className="w-0.5 h-1 bg-slate-300 rounded-r-xs"></div>
        </div>
      </div>
    </div>
  );
};
