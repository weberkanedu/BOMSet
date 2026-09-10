import React, { useState, useEffect } from 'react';
import { 
  X, 
  Camera, 
  FileText, 
  MapPin, 
  Link as LinkIcon, 
  Clock, 
  Calendar, 
  Bell, 
  ChevronDown,
  Check,
  Tag
} from 'lucide-react';
import { useLog } from '../../context/LogContext';
import { CategoryId, LogType } from '../../types/log';
import { CATEGORIES } from '../../data/initialData';
import { CategoryIcon } from '../common/CategoryIcon';

export const NewEntryModal: React.FC = () => {
  const { isNewEntryOpen, setIsNewEntryOpen, newEntryInitialType, addEntry } = useLog();

  const [type, setType] = useState<LogType>(newEntryInitialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('egitim');
  const [date, setDate] = useState('2026-09-07');
  const [time, setTime] = useState('21:47');
  const [duration, setDuration] = useState('');
  const [detail, setDetail] = useState('');
  const [location, setLocation] = useState('');
  const [reminder, setReminder] = useState('30 dakika önce');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [attachments, setAttachments] = useState<{
    photos: boolean;
    files: boolean;
    location: boolean;
    links: boolean;
  }>({
    photos: false,
    files: false,
    location: false,
    links: false
  });

  useEffect(() => {
    if (isNewEntryOpen) {
      setType(newEntryInitialType);
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
    }
  }, [isNewEntryOpen, newEntryInitialType]);

  if (!isNewEntryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const monthNames: { [k: string]: string } = {
      '01': 'Ocak', '02': 'Şubat', '03': 'Mart', '04': 'Nisan',
      '05': 'Mayıs', '06': 'Haziran', '07': 'Temmuz', '08': 'Ağustos',
      '09': 'Eylül', '10': 'Ekim', '11': 'Kasım', '12': 'Aralık'
    };
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    const dateObj = new Date(date);
    const dayName = isNaN(dateObj.getDay()) ? 'Pazartesi' : dayNames[dateObj.getDay()];
    const parts = date.split('-');
    const formattedDateStr = parts.length === 3 ? `${parseInt(parts[2], 10)} ${monthNames[parts[1]] || 'Eylül'} ${parts[0]}` : date;

    addEntry({
      type,
      title: title.trim(),
      category,
      date,
      dateFormatted: formattedDateStr,
      dayName,
      time,
      startTime: time,
      duration: duration || (type === 'log' ? '30 dk' : '1 saat'),
      location: location || (attachments.location ? 'Konum Eklendi' : 'Evde'),
      description: detail,
      notes: type === 'plan' ? 'Zamanında hazır ol.' : 'Kaydedildi.',
      reminder: type === 'plan' ? reminder : undefined,
      tags: tags.length > 0 ? tags : (category === 'egitim' ? ['#ders', '#egitim'] : ['#log']),
      photos: attachments.photos ? [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80'
      ] : []
    });

    // Reset form
    setTitle('');
    setDetail('');
    setDuration('');
    setLocation('');
    setTags([]);
    setIsNewEntryOpen(false);
  };

  const reminderOptions = [
    '5 dakika önce',
    '15 dakika önce',
    '30 dakika önce',
    '1 saat önce',
    '1 gün önce'
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const cleanTag = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`;
      if (!tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
      }
      setTagInput('');
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#12151b] border-t sm:border border-[#202734] rounded-t-3xl sm:rounded-3xl w-full max-h-[92%] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#1c222e]">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsNewEntryOpen(false)}
              className="p-1 -ml-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X size={20} />
            </button>
            <h2 className="text-base font-bold text-white">
              {type === 'log' ? 'Yeni Kayıt' : 'Gelecek Olay Planla'}
            </h2>
          </div>

          <span className="text-[11px] font-mono text-slate-500">
            {time}
          </span>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs">
          {/* Segmented Type Toggle: "Şu an oldu / Log" vs "Gelecekte olacak / Plan" */}
          <div className="p-1 bg-[#0c0e12] rounded-2xl flex border border-[#1e2430]">
            <button
              type="button"
              onClick={() => setType('log')}
              className={`flex-1 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                type === 'log'
                  ? 'bg-[#00d68f] text-black shadow-glow-brand font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock size={13} />
              <span>Şu an oldu / Log</span>
            </button>
            <button
              type="button"
              onClick={() => setType('plan')}
              className={`flex-1 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                type === 'plan'
                  ? 'bg-indigo-600 text-white shadow-glow-plan font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar size={13} />
              <span>Gelecekte olacak / Plan</span>
            </button>
          </div>

          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-medium">
              Başlık <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'log' ? 'Ne yaptın?' : 'Ne planlıyorsun? (Örn: Matematik denemesi)'}
              className="w-full bg-[#171b24] border border-[#232a38] rounded-xl px-3.5 py-2.5 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-medium">Kategori</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(CATEGORIES) as CategoryId[]).slice(0, 6).map((catId) => {
                const cat = CATEGORIES[catId];
                const isSelected = category === catId;
                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setCategory(catId)}
                    className={`flex items-center space-x-1.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500/80 bg-emerald-500/10 text-white font-medium'
                        : 'border-[#202634] bg-[#161a24] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CategoryIcon category={catId} size={14} />
                    <span className="truncate text-[11px]">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-medium">Tarih</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#171b24] border border-[#232a38] rounded-xl px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-medium">Saat</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#171b24] border border-[#232a38] rounded-xl px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* If Plan: Reminder Selector */}
          {type === 'plan' && (
            <div className="p-3 bg-[#151726] border border-indigo-500/30 rounded-2xl space-y-2">
              <label className="block text-indigo-300 font-medium flex items-center gap-1.5">
                <Bell size={13} className="text-amber-400" />
                Hatırlatıcı
              </label>
              <div className="flex flex-wrap gap-1.5">
                {reminderOptions.map((rem) => (
                  <button
                    key={rem}
                    type="button"
                    onClick={() => setReminder(rem)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      reminder === rem
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-[#1e2236] text-slate-300 hover:bg-[#252a42]'
                    }`}
                  >
                    {rem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duration (optional) */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 font-normal">Süre (opsiyonel)</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Örn: 45 dk veya 1 saat 30 dk"
              className="w-full bg-[#171b24] border border-[#232a38] rounded-xl px-3.5 py-2 text-slate-100 placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Detail (optional) with counter 0/500 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-slate-400 font-normal">Detay (opsiyonel)</label>
              <span className="text-[10px] text-slate-500 font-mono">{detail.length}/500</span>
            </div>
            <textarea
              maxLength={500}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Daha fazla bilgi ekleyebilirsin..."
              rows={3}
              className="w-full bg-[#171b24] border border-[#232a38] rounded-xl p-3 text-slate-100 placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Quick Attachment Row: Fotoğraf, Dosya, Konum, Link */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setAttachments(prev => ({ ...prev, photos: !prev.photos }))}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                attachments.photos
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-[#202634] bg-[#161a24] text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera size={16} />
              <span className="text-[10px]">Fotoğraf</span>
            </button>

            <button
              type="button"
              onClick={() => setAttachments(prev => ({ ...prev, files: !prev.files }))}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                attachments.files
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-[#202634] bg-[#161a24] text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={16} />
              <span className="text-[10px]">Dosya</span>
            </button>

            <button
              type="button"
              onClick={() => setAttachments(prev => ({ ...prev, location: !prev.location }))}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                attachments.location
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-[#202634] bg-[#161a24] text-slate-400 hover:text-slate-200'
              }`}
            >
              <MapPin size={16} />
              <span className="text-[10px]">Konum</span>
            </button>

            <button
              type="button"
              onClick={() => setAttachments(prev => ({ ...prev, links: !prev.links }))}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                attachments.links
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-[#202634] bg-[#161a24] text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon size={16} />
              <span className="text-[10px]">Link</span>
            </button>
          </div>

          {/* Tags input */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-slate-400 font-normal">Etiketler</label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {tags.map((t, idx) => (
                <span key={idx} className="bg-[#1c2230] text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-700">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((_, i) => i !== idx))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Etiket ekle ve Enter'a bas (Örn: #matematik)"
              className="w-full bg-[#171b24] border border-[#232a38] rounded-xl px-3 py-1.5 text-slate-200 placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3 pb-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00d68f] hover:bg-[#00c281] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-glow-brand active:scale-[0.98]"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
