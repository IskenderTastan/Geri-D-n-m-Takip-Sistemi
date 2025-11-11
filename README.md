♻️ Geri Dönüşüm Takip ve Ödül Sistemi
Bu proje, çevre bilincini artırmak ve geri dönüşümü teşvik etmek amacıyla geliştirilmiş, oyunlaştırma (gamification) elementleri içeren modern bir web uygulamasıdır.

Uygulama, kullanıcıların yaptıkları geri dönüşümleri (plastik, cam, metal vb.) kilogram bazında kaydetmelerine, bu işlemlerden puan kazanmalarına ve belirli hedeflere ulaştıkça rozetler kazanmalarına olanak tanır.

Bu proje, sunucu (backend) veya veritabanı gerektirmeden çalışır. Tüm kullanıcı verileri, puanlar, rozetler ve işlem geçmişi, tarayıcının Local Storage (Yerel Depolama) hafızasında güvenle saklanır.

🚀 Temel Özellikler
Bu uygulama, "Tek Sayfa Uygulaması" (Single Page Application - SPA) mimarisiyle geliştirilmiştir. Tüm işlemler tek bir index.html sayfası üzerinden dinamik olarak yönetilir.

Dinamik Arayüz: Kullanıcı giriş yapmadığında "Giriş Ekranı" (#loginScreen), giriş yaptığında ise "Ana Panel" (#dashboard) gösterilir.

Puan Yönetimi: Kullanıcılar, geri dönüştürdükleri materyalin türüne (data-points özelliği) ve ağırlığına (kg) göre puan kazanır.

Gelişmiş Rozet Sistemi: Sistem, sadece puan toplamaya değil, aynı zamanda belirli hedeflere ulaşmaya da odaklıdır. Kullanıcılar aşağıdakilere göre rozetler kazanır:

Toplam Puan (örn: "Çevre Savaşçısı" - 100 Puan)

Toplam İşlem Sayısı (örn: "Geri Dönüşüm Ustası" - 10 işlem)

Günlük Seri (örn: "Haftalık Seri" - 7 gün üst üste işlem)

Spesifik Materyal Miktarı (örn: "Plastik Avcısı" - 50 kg plastik)

İstatistik Paneli: Ana panel, kullanıcıya anlık olarak toplam puanını, kazandığı rozet sayısını, toplam işlem sayısını ve kaç gündür seri yaptığını gösteren bir istatistik kartı sunar.

Aktivite Akışı: "Son Aktiviteler" bölümü, kullanıcının yaptığı son geri dönüşüm işlemlerini, tarihi ve kazandığı puanıyla birlikte listeler.

Toast Bildirimleri: Kullanıcı bir işlem yaptığında ("Giriş başarılı", "Puan kazandın!") anlık, şık bildirimler alır.

🛠️ Kullanılan Teknolojiler
HTML5: Uygulamanın iskeleti.

Bootstrap 5: Hızlı ve duyarlı (responsive) bir arayüz oluşturmak için grid sistemi, kartlar, formlar ve modal bileşenleri için kullanıldı.

Font Awesome: Kullanıcı arayüzündeki tüm ikonlar (fa-recycle, fa-trophy vb.) için kullanıldı.

JavaScript (ES6+): Uygulamanın tüm beynidir. DOM manipülasyonu, Local Storage yönetimi, puan hesaplamaları, rozet kontrolü ve tüm interaktif mantık bu dosya (script.js) içindedir.

Local Storage: Kullanıcının tüm verilerini (puan, rozetler, işlem geçmişi) tarayıcıda saklamak için kullanıldı.

📁 Proje Dosya Yapısı
Proje, organize ve anlaşılır 3 ana dosyadan oluşur:

index.html: Tüm HTML iskeletini, giriş ekranını ve ana paneli içeren tek dosyadır.

script.js: Tüm uygulama mantığını, fonksiyonları, veri yönetimini ve olay dinleyicilerini (event listeners) barındırır.
