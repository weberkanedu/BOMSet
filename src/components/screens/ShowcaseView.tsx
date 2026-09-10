import React, { useState } from 'react';
import { useLog } from '../../context/LogContext';
import { FeedScreen } from './FeedScreen';
import { DetailScreen } from './DetailScreen';
import { FutureDetailScreen } from './FutureDetailScreen';
import { CalendarScreen } from './CalendarScreen';
import { SearchScreen } from './SearchScreen';
import { NotificationSimulator } from './NotificationSimulator';
import { MoreScreen } from './MoreScreen';
import { StatusBar } from '../layout/StatusBar';
import { BottomNav } from '../layout/BottomNav';
import { 
  Smartphone, 
  Sparkles, 
  Clock, 
  FileText, 
  Bell, 
  Zap, 
  Sliders, 
  ArrowLeft,
  Calendar,
  Plus
} from 'lucide-react';
import { ViewMode } from '../../types/log';

export const ShowcaseView: React.FC = () => {
  const { setDisplayLayout, setCurrentView, selectEntry } = useLog();

  const handleOpenScreenInSingleView = (view: ViewMode, entryId?: string) => {
    if (entryId) selectEntry(entryId);
    setCurrentView(view);
    setDisplayLayout('device');
  };

  return (
    <div className="min-h-screen w-full bg-[#07080b] text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* Top Banner Header */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between pb-8 border-b border-[#181d26] mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00d68f] text-black font-bold flex items-center justify-center shadow-glow-brand text-2xl">
            L
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Log <span className="text-sm font-normal text-emerald-400 font-mono">— Hayatının zaman çizelgesi</span>
            </h1>
            <p className="text-xs text-slate-400">Tüm ekranlar ve sistem log arayüzü tek bakışta</p>
          </div>
        </div>

        <button
          onClick={() => setDisplayLayout('device')}
          className="px-4 py-2.5 rounded-xl bg-[#00d68f] hover:bg-[#00c281] text-black font-semibold text-xs flex items-center space-x-2 shadow-glow-brand transition-all"
        >
          <Smartphone size={16} />
          <span>İnteraktif Cihaz Moduna Geç</span>
        </button>
      </div>

      {/* Grid of 8 Screens */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Screen 1: Ana Ekran – Log Akışı */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('feed')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="21:47" />
            <div className="flex-1 overflow-hidden pointer-events-none">
              <FeedScreen />
            </div>
            <BottomNav />
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Ana Ekran – Log Akışı</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Tüm olaylar zaman sırasına göre listelenir. Kısa ve sade görünüm. Detaylar için satıra dokun.
            </p>
          </div>
        </div>

        {/* Screen 2: Detay Ekranı */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('detail', 'log-3')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="16:30" />
            <div className="flex-1 overflow-hidden pointer-events-none">
              <DetailScreen />
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Detay Ekranı</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Her log kaydını detaylıca inceleyebilir, düzenleyebilir, fotoğraf ekleyebilir, not tutabilir, etiketleyebilir ve daha fazlasını yapabilirsin.
            </p>
          </div>
        </div>

        {/* Screen 3: Yeni Kayıt Ekleme */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('feed')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015] relative"
          >
            <StatusBar time="21:40" />
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pointer-events-none">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-white">✕ Yeni Kayıt</span>
              </div>
              <div className="p-1 bg-[#0c0e12] rounded-xl flex border border-slate-800 text-xs">
                <div className="flex-1 py-1.5 bg-[#00d68f] text-black font-semibold rounded-lg text-center">
                  Şu an oldu / Log
                </div>
                <div className="flex-1 py-1.5 text-slate-400 text-center">
                  Gelecekte olacak / Plan
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Başlık *</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2.5 text-xs text-slate-400">
                  Ne yaptın?
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Kategori</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2.5 text-xs text-slate-300 flex justify-between">
                  <span>Eğitim</span>
                  <span>▼</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Tarih & Saat</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-xs text-slate-300">
                  7 Eylül 2026 - 21:47
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400">Süre (opsiyonel)</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-xs text-slate-500">
                  0:00
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Detay (opsiyonel)</span>
                  <span>0/500</span>
                </div>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-xs text-slate-500 h-16">
                  Daha fazla bilgi ekleyebilirsin...
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1 text-[10px] text-slate-400 text-center">
                <div className="p-2 rounded-lg bg-[#161a24] border border-slate-800">📷 Fotoğraf</div>
                <div className="p-2 rounded-lg bg-[#161a24] border border-slate-800">📄 Dosya</div>
                <div className="p-2 rounded-lg bg-[#161a24] border border-slate-800">📍 Konum</div>
                <div className="p-2 rounded-lg bg-[#161a24] border border-slate-800">🔗 Link</div>
              </div>
              <div className="pt-2">
                <div className="w-full py-3 bg-[#00d68f] text-black font-semibold text-xs rounded-xl text-center">
                  Kaydet
                </div>
              </div>
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Yeni Kayıt Ekleme</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Hızlı bir şekilde olay kaydı oluşturabilir, isteğe bağlı olarak detay ekleyebilirsin.
            </p>
          </div>
        </div>

        {/* Screen 4: Gelecek Olay Detayı */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('futureDetail', 'plan-1')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="21:47" />
            <div className="flex-1 overflow-hidden pointer-events-none">
              <FutureDetailScreen />
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Gelecek Olay Detayı</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Gelecekteki olaylar için hatırlatıcı kurabilir, zamanı geldiğinde bildirim alırsın. Sevdiğinde tek tuşla gerçekleşti olarak işaretleyebilirsin.
            </p>
          </div>
        </div>

        {/* Screen 5: Takvim Görünümü */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('calendar')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="21:47" />
            <div className="flex-1 overflow-hidden pointer-events-none">
              <CalendarScreen />
            </div>
            <BottomNav />
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Takvim Görünümü</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              İstersen takvim görünümünden de geçmiş ve gelecek olaylarını inceleyebilirsin.
            </p>
          </div>
        </div>

        {/* Screen 6: Arama Özelliği */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('search')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="21:47" />
            <div className="flex-1 overflow-hidden pointer-events-none">
              <SearchScreen />
            </div>
            <BottomNav />
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Arama Özelliği</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Geçmiş kayıtlarda kolayca arama yapabilir, belirli bir konuya veya etikete ulaşabilirsin.
            </p>
          </div>
        </div>

        {/* Screen 7: Gelecek Olay Planla */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('feed')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <StatusBar time="21:42" />
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pointer-events-none text-xs">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                <span className="font-bold text-white">← Gelecek Olay Planla</span>
              </div>
              <div className="p-3 bg-[#151724] border border-indigo-500/30 rounded-2xl space-y-1">
                <span className="text-[11px] text-indigo-300">Ne zaman?</span>
                <div className="font-semibold text-white">12 Eylül 2026 - 17:00 &gt;</div>
              </div>
              <div className="p-3 bg-[#151724] border border-indigo-500/30 rounded-2xl space-y-1">
                <span className="text-[11px] text-indigo-300">Hatırlatıcı</span>
                <div className="text-slate-200">30 dakika önce</div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">Başlık *</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2.5 text-white font-medium">
                  Matematik denemesi
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">Kategori</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-slate-300">
                  Eğitim
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">Konum (opsiyonel)</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-slate-300">
                  Evde
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">Açıklama (opsiyonel)</span>
                <div className="bg-[#171b24] border border-[#232a38] rounded-xl p-2 text-slate-300">
                  40 soruluk deneme. Süre: 90 dk.
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">Etiketler</span>
                <div className="flex gap-1">
                  <span className="text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded text-[10px]">#lgs</span>
                  <span className="text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded text-[10px]">#matematik</span>
                  <span className="text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded text-[10px]">#deneme</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full py-3 bg-[#00d68f] text-black font-semibold text-xs rounded-xl text-center">
                  Kaydet
                </div>
              </div>
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Gelecek Olay Ekleme</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Planlarını önceden gir, hatırlatıcı ayarla. Zamanı geldiğinde bildirim al.
            </p>
          </div>
        </div>

        {/* Screen 8: Bildirim (Lockscreen) */}
        <div className="flex flex-col space-y-3">
          <div 
            onClick={() => handleOpenScreenInSingleView('notification')}
            className="w-full h-[620px] bg-[#0c0e12] rounded-[36px] overflow-hidden border-[6px] border-[#222734] shadow-2xl flex flex-col cursor-pointer transition-transform hover:scale-[1.015]"
          >
            <div className="flex-1 overflow-hidden pointer-events-none">
              <NotificationSimulator />
            </div>
          </div>
          <div className="px-2">
            <h3 className="text-sm font-bold text-white">Bildirim</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Planladığın olaylar için istediğin süreyle bildirim alabilirsin.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Identity Footer (matching right panel of screenshot) */}
      <div className="w-full max-w-7xl mt-12 p-8 bg-[#11141c] border border-[#1e2432] rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00d68f] text-black font-bold flex items-center justify-center shadow-glow-brand text-2xl">
              L
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Log</h2>
              <p className="text-xs text-emerald-400 font-mono">Hayatının zaman çizelgesi.</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Bu bir geleneksel takvim, alışkanlık takipçisi veya günlük değildir. 
            Hayatınızdaki her anı net bir zaman damgasıyla kaydeden ve geleceği sistem disipliniyle planlayan kişisel olay veritabanıdır.
          </p>

          <p className="text-sm font-serif italic text-slate-400 pt-2">
            "Küçük anlar, büyük hikayeler oluşturur."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start space-x-3 p-3 bg-[#151924] rounded-xl border border-slate-800">
            <Clock className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-semibold text-white block">Zaman damgalı kayıtlar</span>
              <span className="text-slate-400 text-[11px]">Her olayın net bir zamanı var.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#151924] rounded-xl border border-slate-800">
            <FileText className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-semibold text-white block">Zengin detaylar</span>
              <span className="text-slate-400 text-[11px]">Fotoğraf, dosya, konum, not, etiket...</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#151924] rounded-xl border border-slate-800">
            <Bell className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-semibold text-white block">Gelecek planları</span>
              <span className="text-slate-400 text-[11px]">Hatırlatıcılar ve alarm seçenekleri.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#151924] rounded-xl border border-slate-800">
            <Zap className="text-emerald-400 shrink-0 mt-0.5" size={18} />
            <div>
              <span className="font-semibold text-white block">Hızlı ve sade arayüz</span>
              <span className="text-slate-400 text-[11px]">Tek elle kullanım, minimal tasarım.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
