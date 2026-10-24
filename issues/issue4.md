# Issue #4 — Modul 1: Sishankamnas — Video Player & Infografik Komponen Pertahanan

## 🏷️ Label
`feature` `modul1` `TP-10.D.6` `priority: high`

## 📋 Deskripsi
Membangun halaman Modul 1 yang memuat konten pembelajaran tentang Sistem Pertahanan dan Keamanan Nasional (Sishankamnas). Halaman ini terdiri dari dua bagian utama: (1) Player video animasi edukasi, dan (2) Infografik interaktif 3 komponen pertahanan negara.

## 🎯 Tujuan
- Siswa dapat menonton video edukasi Sishankamnas.
- Siswa memahami 3 komponen pertahanan: Utama (TNI/Polri), Cadangan, Pendukung.
- Konten disajikan secara visual dan interaktif, bukan sekadar teks panjang.

## 📝 Acceptance Criteria
- [ ] **Video Player Edukasi:**
  - Embed video YouTube atau video lokal (format MP4/WebM < 5MB).
  - Tombol play/pause, progress bar video, dan kontrol volume.
  - Video placeholder jika belum ada konten final (gunakan thumbnail + pesan).
  - Tracking: set flag `modul1_video_watched = true` di localStorage setelah video selesai ditonton (atau setelah 80% durasi).
- [ ] **Infografik 3 Komponen Pertahanan:**
  - 3 kartu interaktif (flip card atau expandable card):
    - **Komponen Utama:** TNI & Polri — peran, tugas, contoh.
    - **Komponen Cadangan:** Warga negara terlatih — contoh: Resimen Mahasiswa, Hansip.
    - **Komponen Pendukung:** Rakyat & sumber daya nasional — contoh: PMI, SAR.
  - Setiap kartu memiliki ikon/ilustrasi, judul, dan deskripsi yang bisa di-expand.
  - Animasi transisi saat kartu dibuka/ditutup.
- [ ] **Navigasi Seksi:**
  - Tab atau stepper di atas halaman: `Video → Infografik → Studi Kasus` (studi kasus di Issue #5).
  - Indikator seksi aktif.
- [ ] **Status Penyelesaian:**
  - Modul 1 dianggap selesai jika: video ditonton DAN studi kasus disubmit (Issue #5).
  - Update progress di `localStorage`.

## 🔗 Referensi PRD
- **FR-04:** Player video Sishankamnas (60–90 detik).
- **FR-05:** Infografik 3 komponen pertahanan.
- **TP 10.D.6:** Mengidentifikasi sishankamnas & ancaman nirmiliter.

## 📌 Catatan Teknis
- Video bisa di-embed dari YouTube menggunakan `<iframe>` dengan `youtube-nocookie.com` untuk privasi.
- Alternatif: host video lokal di `assets/videos/` jika ukuran < 5MB.
- Infografik data disimpan di `data/modul1.js` sebagai array of objects.
- Gunakan CSS `perspective` dan `transform: rotateY()` untuk flip card effect.

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
