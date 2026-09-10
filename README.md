# Log – Hayatının Zaman Çizelgesi (Personal Chronological Event Logging Mobile App)

Modern, minimalist ve bilgi yoğun bir **Kişisel Kronolojik Olay Kayıt Sistemi & Veritabanı** (Life Event Database).

Geleneksel bir takvim, alışkanlık takipçisi veya günlük değildir; hayatınızdaki her anı monospace zaman damgasıyla kaydeden ve geleceği sistem disipliniyle planlayan mobil uygulamadır.

## 📱 Özellikler
- **Ana Ekran (Log Akışı)**: Zaman damgalı (`21:32 | Oyun oynadım`), dikey zaman rayı, kategori rozetleri ve filtre sekmeleri (`Tümü`, `Gerçekleşen`, `Planlanan`, `Arşiv`).
- **Detay Ekranı**: Fotoğraf galerisi (`+2` önizleme), zengin açıklamalar, etiketler, notlar ve özellik tablosu.
- **Yeni Kayıt & Planlama**: `[ Şu an oldu / Log ]` ve `[ Gelecekte olacak / Plan ]` modları, hatırlatıcılar (5m, 15m, 30m, 1h, 1d) ve ekler.
- **Tek Tuşla Dönüştürme**: Planlanan gelecekteki olaylar tek dokunuşla tamamlanmış log kaydına dönüştürülür.
- **Takvim Görünümü**: Aylık matris ve seçilen günün olay listesi.
- **Arama Özelliği**: Anlık kelime arama ve vurgulama.
- **Veri Yedekleme & Taşıma**: JSON formatında dışa aktarma (dosya indirme / panoya kopyalama) ve içe aktarma (tümünü değiştir veya birleştir).
- **8 Ekran Vitrini & Mobil Cihaz Çerçevesi**: Tasarım sunum modu ve interaktif mobil cihaz görünümü.

## 🚀 Otomatik APK İndirme (GitHub Actions)
Bu repo, GitHub Actions ile her push yapıldığında otomatik olarak Android APK derler:
1. Bu repoda **Actions** sekmesine gidin.
2. En son çalışan **Build Android APK** iş akışına tıklayın.
3. Sayfanın altındaki **Artifacts** bölümünden `Log-App-Debug-APK` dosyasını indirip telefonunuza kurabilirsiniz!

## 💻 Yerel Çalıştırma
```bash
npm install
npm run dev
```
Tarayıcınızda `http://localhost:5173/` adresine gidin.
