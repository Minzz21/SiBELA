# Issue #8 — Modul Kuis Evaluasi: Bank Soal, Timer & Instant Feedback

## 🏷️ Label
`feature` `kuis` `evaluasi` `priority: high`

## 📋 Deskripsi
Membangun modul Kuis Evaluasi interaktif dengan soal pilihan ganda bertahap, countdown timer per soal, umpan balik langsung (instant feedback) beserta penjelasan, dan perhitungan skor KKTP otomatis.

## 🎯 Tujuan
- Siswa mengerjakan evaluasi pembelajaran secara mandiri.
- Umpan balik langsung membantu siswa memahami jawaban yang benar.
- Skor KKTP menentukan ketuntasan (≥ 75) atau kebutuhan remedial (< 75).

## 📝 Acceptance Criteria
- [x] **Layar Pembuka Kuis:**
  - Tampilkan instruksi singkat: jumlah soal, waktu per soal, passing grade.
  - Nama siswa dari localStorage ditampilkan.
  - Tombol "Mulai Kuis" untuk memulai.
  - Pilihan mode evaluasi pembelajaran (Standar 10 soal, Komprehensif 20 soal, Modul 1 10 soal, Modul 2 10 soal, Bank Soal Penuh 40 soal).
  - Tampilan rekam jejak skor tertinggi (*Best Score*).
- [x] **Penyajian Soal Bertahap:**
  - Soal ditampilkan satu per satu (bukan semua sekaligus).
  - Indikator progress: *"Soal 3 dari 10"* + progress bar visual.
  - 4 opsi jawaban (A, B, C, D) dalam bentuk kartu interaktif yang bisa di-klik/tap.
  - Dukungan shortcut keyboard (`A`, `B`, `C`, `D`, `1`, `2`, `3`, `4`, `Space`, `Enter`).
  - Animasi saat soal berganti (`page-enter`).
- [x] **Countdown Timer:**
  - Timer per soal (30 detik per nomor) ditampilkan secara visual.
  - Animasi timer dinamis: indikator warna hijau (> 10s), kuning (≤ 10s), dan merah berdenyut (≤ 5s).
  - Jika waktu habis → otomatis freeze opsi, catat sebagai timeout (salah), tampilkan pembahasan, dan lanjut ke soal berikutnya.
  - Timer dan passing grade dapat dikonfigurasi di `data/kuis-config.js`.
- [x] **Instant Feedback:**
  - Setelah memilih jawaban atau waktu habis:
    - ✅ Jawaban benar → kartu berubah hijau emerald + ikon centang + tanda *"Jawaban Kamu Benar!"*.
    - ❌ Jawaban salah → kartu pilihan siswa berubah merah rose + ikon silang + kartu kunci jawaban disorot hijau dengan centang.
    - ⏱️ Waktu habis → kartu kunci jawaban disorot hijau dengan notifikasi timeout.
    - Tampilkan penjelasan ilmiah & rujukan materi resmi lengkap untuk setiap nomor.
  - Delay jeda otomatis (2.5 detik) sebelum pindah ke soal berikutnya, disertai tombol *"Lanjut Sekarang ⏩"* untuk siswa yang ingin melewati jeda.
- [x] **Bank Soal:**
  - 40 soal pilihan ganda komprehensif terverifikasi (20 soal Materi 1 Sishankamnas + 20 soal Materi 2 Peran Internasional) dari bank soal Word resmi.
  - Soal diacak urutannya setiap kali kuis dimulai.
  - 4 posisi opsi jawaban juga diacak posisinya tanpa mengubah kunci jawaban.
  - Algoritma Fisher-Yates shuffle teruji (0 error mapping).
  - Data soal disimpan rapi di `data/bank-soal.js`.
- [x] **Perhitungan Skor & Hasil:**
  - Skor dihitung otomatis: `(jawaban_benar / total_soal) × 100`.
  - Halaman hasil menampilkan:
    - Skor akhir dengan animasi counter count-up.
    - Status: 🎉 **TUNTAS** (≥ 75) atau ⚠️ **BELUM TUNTAS / REMEDIAL** (< 75).
    - Ringkasan statistik 4 kartu: Benar, Salah, Waktu Habis, dan Akurasi.
    - Lembar review pembahasan interaktif lengkap seluruh nomor dengan filter (Semua, Perlu Diperbaiki, Benar).
  - Jika **TUNTAS**: tombol *"Lanjutkan ke Mind Map"* + efek selebrasi konfeti multi-burst (`canvas-confetti`).
  - Jika **BELUM TUNTAS**: saran remedial materi terkait + tombol *"Pelajari Modul 1"*, *"Pelajari Modul 2"*, dan tombol *"Ulangi Kuis"*.
- [x] **State Management:**
  - Simpan hasil kuis di localStorage: `sibela_kuis` (skor, benar, salah, tidakDijawab, total, isTuntas, bestScore, mode, tanggal).
  - Otomatis update status ketuntasan modul kuis: `setProgressStep('kuis', true)` jika skor ≥ 75.
  - Simpan dan pertahankan skor tertinggi (*best score*).

## 🔗 Referensi PRD
- **FR-10:** Soal kuis bertahap dengan countdown timer.
- **FR-11:** Instant feedback + penjelasan kunci jawaban.
- **FR-12:** Perhitungan skor KKTP ≥ 75 = tuntas, < 75 = remedial.

## 📌 Catatan Teknis
- `data/bank-soal.js`: 40 soal terverifikasi dari modul 1 & 2 beserta helper `generateQuizDeck` dan `shuffleArray`.
- `data/kuis-config.js`: konfigurasi `waktuPerSoal`, `passingGrade`, `feedbackDelay`, dan `modeList`.
- `pages/kuis.js`: controller SPA modul kuis dengan state machine (intro → active → result).
- `js/utils.js`: terintegrasi dengan `STORAGE_KEYS.KUIS` dan `setProgressStep('kuis', true)`.

## ⬅️ Depends On
- Issue #1 (Setup Proyek) ✅
- Issue #2 (Routing SPA) ✅
