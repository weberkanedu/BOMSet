import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  MoreVertical, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Image as ImageIcon, 
  FileText, 
  ExternalLink,
  CheckCircle,
  Share2,
  Trash2,
  X
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { CategoryIcon } from '../common/CategoryIcon';

export const DetailScreen: React.FC = () => {
  const { selectedEntry, setCurrentView, deleteEntry, updateEntry } = useLog();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(selectedEntry?.notes || '');

  if (!selectedEntry) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6">
        <p>Kayıt bulunamadı.</p>
        <button 
          onClick={() => setCurrentView('feed')}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs"
        >
          Akışa Dön
        </button>
      </div>
    );
  }

  const samplePhotos = selectedEntry.photos && selectedEntry.photos.length > 0 ? selectedEntry.photos : [
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
  ];

  const handleSaveNote = () => {
    updateEntry(selectedEntry.id, { notes: noteText });
    setIsEditingNote(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100 relative">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#181d26] bg-[#0c0e12]/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={() => setCurrentView('feed')}
            className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Geri"
          >
            <ArrowLeft size={21} />
          </button>
          <div className="flex items-center space-x-2.5 truncate">
            <CategoryIcon category={selectedEntry.category} size={18} showBackground className="w-8 h-8 !rounded-lg" />
            <h1 className="text-base font-bold text-white truncate tracking-tight">
              {selectedEntry.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1 relative">
          <button 
            onClick={() => setIsEditingNote(!isEditingNote)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            title="Düzenle"
          >
            <Edit3 size={18} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            title="Seçenekler"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 w-44 bg-[#1a1f2c] border border-slate-700/60 rounded-xl shadow-xl p-1 z-30 animate-fadeIn text-xs">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`${selectedEntry.dateFormatted} | ${selectedEntry.time} - ${selectedEntry.title}`);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 text-slate-300 text-left"
              >
                <Share2 size={14} />
                <span>Kaydı Kopyala</span>
              </button>
              <button
                onClick={() => {
                  deleteEntry(selectedEntry.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 text-left"
              >
                <Trash2 size={14} />
                <span>Kaydı Sil</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <CheckCircle size={13} className="text-emerald-400" />
            <span>Gerçekleşti</span>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            ID: #{selectedEntry.id.slice(-5)}
          </span>
        </div>

        {/* Date & Time info block */}
        <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-slate-300">
            <Calendar size={15} className="text-slate-400 shrink-0" />
            <span className="font-medium text-xs text-slate-200">
              {selectedEntry.dateFormatted || '7 Eylül 2026'}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-300">
            <Clock size={15} className="text-slate-400 shrink-0" />
            <span className="font-mono text-xs text-emerald-400 font-medium">
              {selectedEntry.time}
            </span>
            {selectedEntry.duration && (
              <span className="text-xs text-slate-400">
                ({selectedEntry.duration})
              </span>
            )}
          </div>
        </div>

        {/* Category & Location Chips */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1b2230] border border-slate-700/40 text-xs font-medium text-slate-200">
            <CategoryIcon category={selectedEntry.category} size={14} />
            <span>{selectedEntry.categoryLabel}</span>
          </div>

          {selectedEntry.location && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1b2230] border border-slate-700/40 text-xs font-medium text-slate-300">
              <MapPin size={13} className="text-rose-400" />
              <span>{selectedEntry.location}</span>
            </div>
          )}
        </div>

        {/* Description Narrative */}
        {selectedEntry.description && (
          <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl">
            <p className="text-xs leading-relaxed text-slate-200 font-normal">
              {selectedEntry.description}
            </p>
          </div>
        )}

        {/* Tags */}
        {selectedEntry.tags && selectedEntry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {selectedEntry.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg bg-[#161c28] text-slate-400 text-[11px] font-mono border border-slate-800 hover:text-emerald-400 transition-colors"
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}

        {/* Media / Photos Section */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1.5 font-medium text-slate-300">
              <ImageIcon size={14} className="text-slate-400" />
              <span>Medya</span>
            </div>
            <span className="text-[11px] text-slate-500">3 Fotoğraf</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {samplePhotos.slice(0, 3).map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPhoto(imgUrl)}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50 cursor-pointer group"
              >
                <img 
                  src={imgUrl} 
                  alt={`Medya ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                />
              </div>
            ))}
            
            {/* +2 thumbnail box */}
            <div 
              onClick={() => setSelectedPhoto(samplePhotos[0])}
              className="aspect-square rounded-xl bg-[#181d28] border border-slate-700/40 flex items-center justify-center text-slate-300 font-mono text-sm font-semibold cursor-pointer hover:bg-[#202736] transition-colors"
            >
              +2
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText size={13} className="text-emerald-400" />
              Notlar
            </h4>
            {!isEditingNote && (
              <button 
                onClick={() => setIsEditingNote(true)} 
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Düzenle
              </button>
            )}
          </div>

          {isEditingNote ? (
            <div className="space-y-2 pt-1">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full bg-[#0c0e12] border border-slate-700 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditingNote(false)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-3 py-1 bg-emerald-500 text-black text-xs font-medium rounded-lg"
                >
                  Kaydet
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedEntry.notes || 'Yarın aynı konuyu tekrar et.'}
            </p>
          )}
        </div>

        {/* Detailed Properties List */}
        <div className="divide-y divide-[#1b202c] border-t border-b border-[#1b202c] py-1 text-xs">
          <div className="py-2 flex items-center justify-between">
            <span className="text-slate-400">Süre</span>
            <span className="font-medium text-slate-200">{selectedEntry.duration || '1 saat 45 dk'}</span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <span className="text-slate-400">Kişiler</span>
            <span className="text-slate-300">{selectedEntry.people || 'Yok'}</span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <span className="text-slate-400">Konum</span>
            <span className="text-slate-300">{selectedEntry.location || 'Ev'}</span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <span className="text-slate-400">İlişkili Olaylar</span>
            <span className="text-slate-500">{selectedEntry.relatedEvents || 'Yok'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Bar */}
      <div className="p-3 bg-[#13161c] border-t border-[#1e232d] flex items-center space-x-2">
        <button
          onClick={() => setIsEditingNote(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#1b212d] hover:bg-[#232b3a] text-slate-200 font-medium text-xs flex items-center justify-center space-x-2 border border-slate-700/50 transition-colors"
        >
          <Edit3 size={15} />
          <span>Düzenle</span>
        </button>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#1b212d] hover:bg-[#232b3a] text-slate-300 flex items-center justify-center border border-slate-700/50 transition-colors"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 text-white bg-white/10 rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Detay önizleme" 
            className="max-h-[80%] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
};
