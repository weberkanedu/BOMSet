import React from 'react';
import { 
  BookOpen, 
  Gamepad2, 
  MapPin, 
  Wrench, 
  Utensils, 
  User, 
  Film, 
  Activity, 
  CalendarClock, 
  Sparkles,
  Smartphone,
  Briefcase,
  Coffee,
  Check
} from 'lucide-react';
import { CategoryId } from '../../types/log';
import { CATEGORIES } from '../../data/initialData';

interface CategoryIconProps {
  category: CategoryId | string;
  size?: number;
  className?: string;
  showBackground?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 18, 
  className = '', 
  showBackground = false 
}) => {
  const cat = CATEGORIES[category as CategoryId] || {
    id: 'kisisel',
    label: 'Kişisel',
    icon: 'User',
    color: '#818cf8',
    bgLight: 'rgba(129, 140, 248, 0.15)',
  };

  const getIcon = () => {
    switch (category) {
      case 'egitim':
        return <BookOpen size={size} />;
      case 'oyun':
        return <Gamepad2 size={size} />;
      case 'arkadaslar':
        return <MapPin size={size} />;
      case 'teknoloji':
        return <Wrench size={size} />;
      case 'yemek':
        return <Utensils size={size} />;
      case 'kisisel':
        return <Briefcase size={size} />;
      case 'eglence':
        return <Film size={size} />;
      case 'saglik':
        return <Activity size={size} />;
      case 'servis':
        return <Smartphone size={size} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  if (showBackground) {
    return (
      <div 
        className={`flex items-center justify-center rounded-xl p-2 shrink-0 transition-all ${className}`}
        style={{ 
          backgroundColor: cat.bgLight, 
          color: cat.color,
          border: `1px solid ${cat.color}33`
        }}
      >
        {getIcon()}
      </div>
    );
  }

  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ color: cat.color }}
    >
      {getIcon()}
    </span>
  );
};
