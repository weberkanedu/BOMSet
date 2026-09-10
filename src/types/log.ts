export type LogType = 'log' | 'plan';

export type CategoryId = 
  | 'oyun' 
  | 'arkadaslar' 
  | 'egitim' 
  | 'teknoloji' 
  | 'yemek' 
  | 'kisisel' 
  | 'eglence' 
  | 'saglik'
  | 'servis';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
  bgLight: string;
}

export interface LogEntry {
  id: string;
  type: LogType;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  date: string; // ISO YYYY-MM-DD
  dateFormatted: string; // "7 Eylül 2026"
  dayName: string; // "Pazartesi"
  time: string; // "16:30" or "16:30 - 18:15"
  startTime: string; // "16:30"
  endTime?: string; // "18:15"
  duration?: string; // "1 saat 45 dk"
  subtitle?: string; // "Matematik · 1 saat 45 dk"
  location?: string; // "Evde"
  people?: string; // "Yok"
  description?: string;
  notes?: string;
  tags?: string[];
  photos?: string[];
  reminder?: string; // "30 dk önce hatırlat"
  isCompleted: boolean;
  isArchived?: boolean;
  relatedEvents?: string;
  extraInfo?: {
    estimatedDuration?: string;
    personContact?: string;
  };
}

export type ViewMode = 'feed' | 'detail' | 'futureDetail' | 'calendar' | 'search' | 'notification' | 'more';
export type DisplayLayout = 'device' | 'showcase';
export type FilterTab = 'all' | 'completed' | 'planned' | 'archived';
export type SearchFilter = 'all' | 'log' | 'plan' | 'not';
