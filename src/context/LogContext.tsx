import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  LogEntry, 
  ViewMode, 
  DisplayLayout, 
  FilterTab, 
  SearchFilter, 
  LogType 
} from '../types/log';
import { INITIAL_LOGS, CATEGORIES } from '../data/initialData';

interface LogContextType {
  logs: LogEntry[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedEntryId: string | null;
  selectedEntry: LogEntry | null;
  selectEntry: (id: string) => void;
  isNewEntryOpen: boolean;
  setIsNewEntryOpen: (open: boolean) => void;
  newEntryInitialType: LogType;
  openNewEntryModal: (type?: LogType) => void;
  filterTab: FilterTab;
  setFilterTab: (tab: FilterTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilter: SearchFilter;
  setSearchFilter: (filter: SearchFilter) => void;
  displayLayout: DisplayLayout;
  setDisplayLayout: (layout: DisplayLayout) => void;
  addEntry: (entry: Partial<LogEntry>) => void;
  updateEntry: (id: string, updates: Partial<LogEntry>) => void;
  deleteEntry: (id: string) => void;
  markAsCompleted: (id: string) => void;
  simulatedNotification: {
    title: string;
    body: string;
    time: string;
    location?: string;
  } | null;
  triggerNotification: (title?: string, body?: string) => void;
  dismissNotification: () => void;
  resetData: () => void;
  filteredLogs: LogEntry[];
  // Backup / Data Portability
  exportData: () => void;
  getExportJsonString: () => string;
  importData: (jsonString: string, mode: 'overwrite' | 'merge') => { success: boolean; count: number; error?: string };
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('log_app_data_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse logs from localStorage', e);
      }
    }
    return INITIAL_LOGS;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('feed');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isNewEntryOpen, setIsNewEntryOpen] = useState<boolean>(false);
  const [newEntryInitialType, setNewEntryInitialType] = useState<LogType>('log');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<SearchFilter>('all');
  const [displayLayout, setDisplayLayout] = useState<DisplayLayout>('device');
  const [simulatedNotification, setSimulatedNotification] = useState<{
    title: string;
    body: string;
    time: string;
    location?: string;
  } | null>({
    title: 'Telefonu servise götür',
    body: '30 dakika sonra',
    time: '13:30',
    location: 'Servis (Kadıköy)'
  });

  useEffect(() => {
    localStorage.setItem('log_app_data_v2', JSON.stringify(logs));
  }, [logs]);

  const selectedEntry = logs.find(l => l.id === selectedEntryId) || null;

  const selectEntry = (id: string) => {
    setSelectedEntryId(id);
    const entry = logs.find(l => l.id === id);
    if (entry) {
      if (entry.type === 'plan' && !entry.isCompleted) {
        setCurrentView('futureDetail');
      } else {
        setCurrentView('detail');
      }
    }
  };

  const openNewEntryModal = (type: LogType = 'log') => {
    setNewEntryInitialType(type);
    setIsNewEntryOpen(true);
  };

  const addEntry = (entryData: Partial<LogEntry>) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const currentTimeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    
    const categoryInfo = CATEGORIES[entryData.category || 'kisisel'];

    const newEntry: LogEntry = {
      id: 'entry-' + Date.now(),
      type: entryData.type || 'log',
      title: entryData.title || 'Yeni Olay',
      category: entryData.category || 'kisisel',
      categoryLabel: categoryInfo?.label || 'Kişisel',
      date: entryData.date || now.toISOString().split('T')[0],
      dateFormatted: entryData.dateFormatted || 'Bugün',
      dayName: entryData.dayName || 'Bugün',
      time: entryData.time || currentTimeStr,
      startTime: entryData.startTime || currentTimeStr,
      duration: entryData.duration || 'Belirtilmedi',
      subtitle: `${categoryInfo?.label || 'Kişisel'} · ${entryData.duration || 'Şimdi'}`,
      location: entryData.location || 'Konum yok',
      people: entryData.people || 'Yok',
      description: entryData.description || '',
      notes: entryData.notes || '',
      tags: entryData.tags || [],
      photos: entryData.photos || [],
      reminder: entryData.reminder,
      isCompleted: entryData.type === 'log',
      extraInfo: entryData.extraInfo,
    };

    setLogs(prev => [newEntry, ...prev]);
    setIsNewEntryOpen(false);
  };

  const updateEntry = (id: string, updates: Partial<LogEntry>) => {
    setLogs(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteEntry = (id: string) => {
    setLogs(prev => prev.filter(item => item.id !== id));
    if (selectedEntryId === id) {
      setSelectedEntryId(null);
      setCurrentView('feed');
    }
  };

  const markAsCompleted = (id: string) => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d68f', '#34d399', '#38bdf8', '#818cf8']
      });
    } catch (e) {
      // ignore
    }

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const currentTimeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    setLogs(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: true,
          type: 'log',
          subtitle: `${item.categoryLabel} · Tamamlandı (${currentTimeStr})`,
          notes: item.notes ? `${item.notes}\n[Tamamlandı: ${currentTimeStr}]` : `[Tamamlandı: ${currentTimeStr}]`
        };
      }
      return item;
    }));

    setTimeout(() => {
      setSelectedEntryId(id);
      setCurrentView('detail');
    }, 400);
  };

  const triggerNotification = (title = 'Telefonu servise götür', body = '30 dakika sonra') => {
    setSimulatedNotification({
      title,
      body,
      time: '13:30',
      location: 'Servis (Kadıköy)'
    });
    setCurrentView('notification');
  };

  const dismissNotification = () => {
    setSimulatedNotification(null);
  };

  const resetData = () => {
    localStorage.removeItem('log_app_data_v2');
    setLogs(INITIAL_LOGS);
    setCurrentView('feed');
  };

  // Export data as JSON file
  const getExportJsonString = () => {
    const exportPayload = {
      app: 'Log - Hayatının Zaman Çizelgesi',
      version: '2.4',
      exportDate: new Date().toISOString(),
      totalRecords: logs.length,
      logs: logs,
    };
    return JSON.stringify(exportPayload, null, 2);
  };

  const exportData = () => {
    const jsonStr = getExportJsonString();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `log_yedek_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import data from JSON string
  const importData = (jsonString: string, mode: 'overwrite' | 'merge') => {
    try {
      const parsed = JSON.parse(jsonString);
      const incomingLogs: LogEntry[] = Array.isArray(parsed) ? parsed : (parsed.logs || []);

      if (!Array.isArray(incomingLogs) || incomingLogs.length === 0) {
        return { success: false, count: 0, error: 'Geçerli log kaydı bulunamadı.' };
      }

      if (mode === 'overwrite') {
        setLogs(incomingLogs);
        return { success: true, count: incomingLogs.length };
      } else {
        // Merge mode: keep existing, add new ones if ID doesn't exist
        const existingIds = new Set(logs.map(l => l.id));
        const newOnes = incomingLogs.filter(l => !existingIds.has(l.id));
        setLogs(prev => [...newOnes, ...prev]);
        return { success: true, count: newOnes.length };
      }
    } catch (e: any) {
      return { success: false, count: 0, error: e?.message || 'JSON dosyası okunamadı.' };
    }
  };

  const filteredLogs = logs.filter(entry => {
    if (filterTab === 'completed') return entry.isCompleted;
    if (filterTab === 'planned') return entry.type === 'plan' && !entry.isCompleted;
    if (filterTab === 'archived') return entry.isArchived;
    return true;
  });

  return (
    <LogContext.Provider value={{
      logs,
      currentView,
      setCurrentView,
      selectedEntryId,
      selectedEntry,
      selectEntry,
      isNewEntryOpen,
      setIsNewEntryOpen,
      newEntryInitialType,
      openNewEntryModal,
      filterTab,
      setFilterTab,
      searchQuery,
      setSearchQuery,
      searchFilter,
      setSearchFilter,
      displayLayout,
      setDisplayLayout,
      addEntry,
      updateEntry,
      deleteEntry,
      markAsCompleted,
      simulatedNotification,
      triggerNotification,
      dismissNotification,
      resetData,
      filteredLogs,
      exportData,
      getExportJsonString,
      importData
    }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (!context) throw new Error('useLog must be used within LogProvider');
  return context;
};
