# Issue #1 — Setup Proyek & Struktur Dasar

## 🏷️ Label
`setup` `infrastructure` `priority: critical`

## 📋 Deskripsi
Inisialisasi repositori proyek SiBELA, menyusun struktur folder, menginstal Tailwind CSS, dan membangun kerangka HTML dasar (shell layout) yang akan menjadi fondasi seluruh halaman.

## 🎯 Tujuan
- Repositori GitHub siap digunakan dan terhubung ke GitHub Pages.
- Struktur folder terorganisir dan konsisten.
- Tailwind CSS terkonfigurasi dengan Design Token proyek.
- Shell layout (header, main content area, footer/bottom nav) sudah ter-render di browser.

## 📝 Acceptance Criteria
- [x] Repositori GitHub dibuat dengan `README.md`, `.gitignore`, dan `LICENSE`.
- [x] Struktur folder proyek sesuai konvensi:
  ```
  SiBELA/
  ├── index.html
  ├── css/
  │   ├── input.css          # Tailwind directives + custom styles
  │   └── output.css         # Tailwind compiled (auto-generated)
  ├── js/
  │   ├── app.js             # Entry point, router, global state
  │   ├── utils.js           # Helper functions (localStorage, dll)
  │   └── components/        # JS modules per komponen
  ├── pages/                 # HTML partial / template per halaman
  ├── assets/
  │   ├── images/
  │   ├── icons/
  │   └── videos/
  └── docs/                  # PRD, wireframe, issues
  ```
- [x] Tailwind CSS terinstal dan dikonfigurasi dengan Design Token:
  - Primary: Emerald Green `#0F6B4F`
  - Secondary: Deep Green `#0A4A37`
  - Accent: Gold `#E3A92B`
  - Background: Cream `#FFF8E8`
- [x] `index.html` memuat shell layout responsif:
  - **Desktop:** Header navigation bar di atas.
  - **Mobile:** Bottom Navigation Bar di bawah.
- [x] Halaman bisa diakses di `localhost` via live server.
- [x] Deployment awal ke GitHub Pages siap (struktur statis tanpa backend).

## 🔗 Referensi PRD
- **NFR-1:** Total ukuran bundle < 3 MB.
- **NFR-2:** Responsif mobile-first (5–6.7") & desktop (13–15.6").
- **NFR-3:** Sistem warna & design token.
- **FR-02:** Navigasi utama (Header Desktop, Bottom Nav Mobile).

## 📌 Catatan Teknis
- Gunakan `npx tailwindcss` CLI standalone untuk kompilasi (tanpa Node bundler berat).
- Gunakan Google Fonts: **Inter** atau **Plus Jakarta Sans** untuk tipografi.
- Pastikan `meta viewport` diset untuk mobile-first.
- Tambahkan favicon placeholder.
