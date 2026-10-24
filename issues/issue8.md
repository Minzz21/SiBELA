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
- [ ] **Layar Pembuka Kuis:**
  - Tampilkan instruksi singkat: jumlah soal, waktu per soal, passing grade.
  - Nama siswa dari localStorage ditampilkan.
  - Tombol "Mulai Kuis" untuk memulai.
- [ ] **Penyajian Soal Bertahap:**
  - Soal ditampilkan satu per satu (bukan semua sekaligus).
  - Indikator progress: *"Soal 3 dari 10"* + progress bar.
  - 4 opsi jawaban (A, B, C, D) dalam bentuk kartu yang bisa di-klik/tap.
  - Animasi saat soal berganti (slide/fade).
- [ ] **Countdown Timer:**
  - Timer per soal (misal: 30 detik per soal) ditampilkan secara visual.
  - Animasi timer: lingkaran/bar yang mengecil.
  - Jika waktu habis → otomatis pindah ke soal berikutnya (jawaban dianggap salah).
  - Timer bisa dikonfigurasi di `data/kuis-config.js`.
- [ ] **Instant Feedback:**
  - Setelah memilih jawaban:
    - ✅ Jawaban benar → kartu berubah hijau + ikon centang.
    - ❌ Jawaban salah → kartu berubah merah + tunjukkan jawaban benar.
    - Tampilkan penjelasan singkat (1-2 kalimat) mengapa jawaban tersebut benar.
  - Delay 2 detik sebelum pindah ke soal berikutnya.
- [ ] **Bank Soal:**
  - Minimal 10 soal pilihan ganda (bisa ditambah).
  - Soal diacak urutannya setiap kali kuis dimulai.
  - Opsi jawaban juga diacak posisinya.
  - Data soal disimpan di `data/bank-soal.js`.
- [ ] **Perhitungan Skor & Hasil:**
  - Skor = `(jawaban_benar / total_soal) × 100`.
  - Halaman hasil menampilkan:
    - Skor akhir dengan animasi counter.
    - Status: 🎉 **TUNTAS** (≥ 75) atau ⚠️ **BELUM TUNTAS** (< 75).
    - Ringkasan: berapa soal benar, salah, dan tidak dijawab.
  - Jika **TUNTAS**: tombol "Lanjutkan ke Mind Map" + konfeti.
  - Jika **BELUM TUNTAS**: tombol "Pelajari Kembali Materi" (arahkan ke Modul 1/2) + tombol "Coba Lagi".
- [ ] **State Management:**
  - Simpan hasil kuis di localStorage: `sibela_kuis`.
  - Update `kuis_done = true` jika tuntas.
  - Simpan skor tertinggi (best score) jika mengulang.

## 🔗 Referensi PRD
- **FR-10:** Soal kuis bertahap dengan countdown timer.
- **FR-11:** Instant feedback + penjelasan.
- **FR-12:** Perhitungan skor KKTP ≥ 75 = tuntas, < 75 = remedial.

## 📌 Catatan Teknis
- Struktur bank soal di `data/bank-soal.js`:
  ```js
  export const bankSoal = [
    {
      id: 1,
      pertanyaan: "Komponen utama pertahanan negara Indonesia adalah...",
      opsi: ["TNI dan Polri", "Rakyat sipil", "PMI", "Komnas HAM"],
      jawabanBenar: 0,
      penjelasan: "Sesuai UU No. 3/2002, komponen utama adalah TNI."
    },
    // ...
  ];
  ```
- Gunakan Fisher-Yates shuffle untuk pengacakan soal & opsi.
- Timer menggunakan `setInterval` / `requestAnimationFrame`.
- State kuis (jawaban per soal) disimpan di memori selama sesi, di-persist ke localStorage saat selesai.

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
