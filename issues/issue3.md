# Issue #3 — Halaman Beranda: Input Nama, Sapaan Motivasi & Progress Bar

## 🏷️ Label
`feature` `beranda` `localStorage` `priority: high`

## 📋 Deskripsi
Membangun halaman Beranda sebagai landing page utama siswa. Halaman ini menampilkan input nama panggilan (disimpan ke `localStorage`), sapaan motivasi personal, progress bar penyelesaian modul, dan kartu pemicu tantangan harian.

## 🎯 Tujuan
- Siswa disambut secara personal saat pertama kali mengakses web.
- Progress belajar siswa terlihat jelas dan memotivasi.
- Navigasi ke modul-modul lain mudah diakses dari Beranda.

## 📝 Acceptance Criteria
- [x] **Input Nama Panggilan:**
  - Jika `localStorage` belum memiliki nama → tampilkan modal/overlay input nama dengan animasi.
  - Nama disimpan di `localStorage` key `sibela_nama`.
  - Jika sudah ada nama → langsung tampilkan sapaan: *"Halo, [Nama]! Siap belajar hari ini? 🇮🇩"*
  - Tombol "Ganti Nama" tersedia di profil kecil.
- [x] **Progress Bar Dinamis:**
  - Menampilkan persentase penyelesaian dari seluruh modul (Modul 1, Modul 2, Kuis, Mind Map).
  - Dihitung dari `localStorage` flags: `modul1_done`, `modul2_done`, `kuis_done`, `mindmap_done`.
  - Animasi progress bar saat halaman dimuat.
- [x] **Kartu Modul / Menu Utama:**
  - 4 kartu navigasi visual menuju: Modul 1, Modul 2, Kuis, Mind Map.
  - Setiap kartu menampilkan ikon, judul, deskripsi singkat, dan badge status (✅ Selesai / 🔓 Belum).
  - Hover/tap effect pada kartu.
- [x] **Kartu Tantangan Harian (Motivasi):**
  - Menampilkan kutipan inspiratif tentang bela negara secara acak dari array statis.
  - Contoh: *"Bela negara bukan hanya tugas TNI, tapi tugas seluruh rakyat Indonesia."*
- [x] **UI/UX:**
  - Mobile-first layout.
  - Warna sesuai Design Token (Emerald, Gold, Cream).
  - Animasi entrance untuk elemen-elemen utama.

## 🔗 Referensi PRD
- **FR-01:** Input nama panggilan + localStorage.
- **FR-03:** Progress bar dinamis.
- **Bagian 3.1:** Sapaan motivasi & kartu tantangan harian.

## 📌 Catatan Teknis
- `localStorage` keys yang digunakan:
  - `sibela_nama` — String nama siswa.
  - `sibela_progress` — JSON object `{ modul1: bool, modul2: bool, kuis: bool, mindmap: bool }`.
- Progress dihitung: `(jumlah_true / 4) * 100%`.
- Kutipan motivasi disimpan sebagai array statis di `data/quotes.js`.

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
