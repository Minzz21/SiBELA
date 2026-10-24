# Issue #2 — Sistem Routing SPA (Single Page Application) Client-Side

## 🏷️ Label
`core` `routing` `priority: critical`

## 📋 Deskripsi
Membangun sistem routing berbasis hash (`#/beranda`, `#/modul1`, `#/modul2`, dst.) agar semua navigasi antar halaman berjalan tanpa reload penuh (SPA pattern), sesuai arsitektur static web client-side.

## 🎯 Tujuan
- Navigasi antar halaman/modul berjalan mulus tanpa full page reload.
- URL hash berubah sesuai halaman aktif.
- Navigasi bar menandai halaman yang sedang aktif (active state).

## 📝 Acceptance Criteria
- [ ] Router client-side menggunakan `hashchange` event atau custom router.
- [ ] Daftar rute yang terdaftar:
  | Hash Route        | Halaman               |
  |-------------------|-----------------------|
  | `#/`              | Beranda               |
  | `#/modul1`        | Modul 1: Sishankamnas |
  | `#/modul2`        | Modul 2: Peran Indonesia |
  | `#/kuis`          | Kuis Evaluasi         |
  | `#/mindmap`       | Mind Map Digital      |
  | `#/portal-guru`   | Portal Guru           |
- [ ] Setiap rute memuat konten dinamis ke area `<main>` tanpa reload.
- [ ] Navigasi bar (desktop header / mobile bottom nav) menandai item aktif.
- [ ] Rute tidak valid menampilkan halaman 404 / redirect ke Beranda.
- [ ] Transisi antar halaman memiliki animasi fade-in/slide minimal.

## 🔗 Referensi PRD
- **FR-02:** Navigasi utama.
- **Arsitektur Teknis Bagian 6:** Client-Side JS (Vanilla JS ES6+).

## 📌 Catatan Teknis
- Gunakan ES6 Module (`import`/`export`) untuk organisasi kode.
- Setiap halaman dibuat sebagai fungsi `render()` yang mengembalikan HTML string atau DOM element.
- State global (nama siswa, progress) disimpan di object `AppState` di `app.js`.
- Pertimbangkan `history.pushState` sebagai alternatif jika hash tidak diinginkan, tapi hash lebih aman untuk GitHub Pages.

## ⬅️ Depends On
- Issue #1 (Setup Proyek & Struktur Dasar)
