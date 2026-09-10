import React, { useState, useRef } from 'react';
import { 
  Clock, 
  FileText, 
  Bell, 
  Zap, 
  Sliders, 
  RotateCcw, 
  Smartphone, 
  LayoutGrid, 
  ChevronRight,
  Database,
  Download,
  Upload,
  Copy,
  Check,
  FileJson,
  AlertTriangle
} from 'lucide-react';
import { useLog } from '../../context/LogContext';

export const MoreScreen: React.FC = () => {
  const { 
    displayLayout, 
    setDisplayLayout, 
    resetData, 
    setCurrentView,
    logs,
    exportData,
    getExportJsonString,
    importData
  } = useLog();

  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [importMode, setImportMode] = useState<'overwrite' | 'merge'>('overwrite');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard?.writeText(getExportJsonString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importData(content, importMode);
        if (result.success) {
          setImportStatus(`Başarılı! ${result.count} kayıt sisteme aktarıldı.`);
        } else {
          setImportStatus(`Hata: ${result.error}`);
        }
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePasteImport = () => {
    if (!pasteText.trim()) return;
    const result = importData(pasteText.trim(), importMode);
    if (result.success) {
      setImportStatus(`Başarılı! ${result.count} kayıt sisteme aktarıldı.`);
      setShowJsonModal(false);
      setPasteText('');
    } else {
      setImportStatus(`Hata: ${result.error}`);
    }
    setTimeout(() => setImportStatus(null), 4000);
  };

  const pillars = [
    {
      icon: <Clock className="text-emerald-400" size={18} />,
      title: 'Zaman damgalı kayıtlar',
      desc: 'Her olayın net bir zamanı var.'
    },
    {
      icon: <FileText className="text-emerald-400" size={18} />,
      title: 'Zengin detaylar',
      desc: 'Fotoğraf, dosya, konum, not, etiket...'
    },
    {
      icon: <Bell className="text-emerald-400" size={18} />,
      title: 'Gelecek planları',
      desc: 'Hatırlatıcılar ve alarm seçenekleri.'
    },
    {
      icon: <Zap className="text-emerald-400" size={18} />,
      title: 'Hızlı ve sade arayüz',
      desc: 'Tek elle kullanım, minimal tasarım.'
    },
    {
      icon: <Sliders className="text-emerald-400" size={18} />,
      title: 'Tam kontrol senin elinde',
      desc: 'Geçmişini ara, düzenle, yönet.'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0c0e12] text-slate-100 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-6 text-center border-b border-[#181d26] bg-gradient-to-b from-emerald-950/20 to-transparent">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00d68f] text-black flex items-center justify-center font-bold text-2xl shadow-glow-brand mb-3">
          <Database size={28} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Log</h1>
        <p className="text-xs text-slate-400 mt-1">
          Hayatının zaman çizelgesi & kişisel olay veritabanı
        </p>
      </div>

      <div className="p-4 space-y-5">
        {/* DATA BACKUP / PORTABILITY (İÇE & DIŞA AKTARMA) */}
        <div className="p-4 bg-[#141722] border border-[#222938] rounded-2xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileJson className="text-emerald-400" size={18} />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Veri Taşıma & Yedekleme
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              JSON Portatif
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Telefon değiştirdiğinizde veya yedek almak istediğinizde tüm geçmişinizi ve planlarınızı tek tıkla cihazınıza kaydedebilir veya yükleyebilirsiniz.
          </p>

          {importStatus && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
              <Check size={14} className="shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            {/* Export File Button */}
            <button
              onClick={exportData}
              className="py-2.5 px-3 rounded-xl bg-[#1b2230] hover:bg-[#232b3d] text-white font-medium flex items-center justify-center space-x-2 border border-slate-700/60 transition-colors active:scale-98"
            >
              <Download size={15} className="text-emerald-400" />
              <span>Dışa Aktar (İndir)</span>
            </button>

            {/* Import File Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-3 rounded-xl bg-[#1b2230] hover:bg-[#232b3d] text-white font-medium flex items-center justify-center space-x-2 border border-slate-700/60 transition-colors active:scale-98"
            >
              <Upload size={15} className="text-indigo-400" />
              <span>İçe Aktar (Dosya)</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Copy raw JSON to clipboard */}
            <button
              onClick={handleCopy}
              className="py-2 px-3 rounded-xl bg-[#171a24] hover:bg-[#1f2433] text-slate-300 text-[11px] flex items-center justify-center space-x-1.5 border border-slate-800 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Kopyalandı!' : 'Metin Olarak Kopyala'}</span>
            </button>

            {/* Paste JSON Modal open */}
            <button
              onClick={() => setShowJsonModal(true)}
              className="py-2 px-3 rounded-xl bg-[#171a24] hover:bg-[#1f2433] text-slate-300 text-[11px] flex items-center justify-center space-x-1.5 border border-slate-800 transition-colors"
            >
              <FileText size={13} />
              <span>Metin Yapıştırarak Yükle</span>
            </button>
          </div>
        </div>

        {/* Layout Switcher (Phone vs 8-Screen Showcase) */}
        <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl space-y-2.5">
          <div className="text-xs font-semibold text-slate-300">Görünüm Modu</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setDisplayLayout('device')}
              className={`p-2.5 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                displayLayout === 'device'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'border-[#222836] bg-[#161a24] text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={16} />
              <span>Tekli Telefon</span>
            </button>

            <button
              onClick={() => setDisplayLayout('showcase')}
              className={`p-2.5 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                displayLayout === 'showcase'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'border-[#222836] bg-[#161a24] text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={16} />
              <span>8 Ekran Vitrini</span>
            </button>
          </div>
        </div>

        {/* Quick Simulator link */}
        <div 
          onClick={() => setCurrentView('notification')}
          className="p-3.5 bg-[#141720] border border-[#1e2430] hover:bg-[#181d2a] rounded-2xl flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-200">Kilit Ekranı Bildirimi Simülatörü</h3>
              <p className="text-[11px] text-slate-400">Planlanan olay alarmını canlı deneyimleyin</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>

        {/* Core Concept & Brand Pillars */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Sistem Prensipleri
          </div>
          <div className="bg-[#141720] border border-[#1e2430] rounded-2xl p-3.5 divide-y divide-[#1d2330]">
            {pillars.map((item, idx) => (
              <div key={idx} className={`flex items-start space-x-3 ${idx === 0 ? 'pb-3' : 'py-3'}`}>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Stats */}
        <div className="p-3.5 bg-[#141720] border border-[#1e2430] rounded-2xl space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Toplam Kayıt Sayısı</span>
            <span className="font-mono text-emerald-400 font-semibold">{logs.length}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Gerçekleşen Loglar</span>
            <span className="font-mono text-slate-200">
              {logs.filter(l => l.isCompleted).length}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Planlanan Olaylar</span>
            <span className="font-mono text-indigo-400 font-semibold">
              {logs.filter(l => l.type === 'plan' && !l.isCompleted).length}
            </span>
          </div>
        </div>

        {/* Reset / Restore data */}
        <div className="pt-2">
          <button
            onClick={resetData}
            className="w-full py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium flex items-center justify-center space-x-2 border border-slate-700/40 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Varsayılan Verileri Geri Yükle</span>
          </button>
        </div>

        {/* Footer Quote */}
        <div className="text-center py-4 text-slate-500 text-xs italic">
          "Küçük anlar, büyük hikayeler oluşturur."
        </div>
      </div>

      {/* Paste JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151922] border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-3">
            <h3 className="text-sm font-bold text-white">Yedek Metni Yapıştır</h3>
            <p className="text-xs text-slate-400">
              WhatsApp, e-posta veya notlarınızdan kopyaladığınız JSON yedek kodunu buraya yapıştırın:
            </p>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder='{"app": "Log", "logs": [...]}'
              rows={6}
              className="w-full bg-[#0c0e12] border border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'overwrite'}
                  onChange={() => setImportMode('overwrite')}
                />
                <span>Tümünü değiştir</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={importMode === 'merge'}
                  onChange={() => setImportMode('merge')}
                />
                <span>Mevcutla birleştir</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                İptal
              </button>
              <button
                onClick={handlePasteImport}
                className="px-4 py-1.5 bg-[#00d68f] text-black font-semibold text-xs rounded-xl"
              >
                Yükle ve Uygula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
