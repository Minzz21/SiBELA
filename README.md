# 🇮🇩 SiBELA: Sistem Interaktif Bela Negara

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Status: In Development](https://img.shields.io/badge/Status-Development%20(Issue%20%231)-gold.svg)]()
[![Platform: GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-0A4A37.svg)]()

> **Media Pembelajaran Web Interaktif Pendidikan Pancasila Kelas X MA Palattae**  
> Topik: Sistem Pertahanan dan Keamanan Nasional (Sishankamnas) & Peran Indonesia di Dunia Internasional  
> Dikembangkan oleh: **Mustamin (Amin) — Pendidikan Teknik Informatika & Komputer (PTIK) Universitas Negeri Makassar (UNM)**

---

## 🌟 Tentang SiBELA
**SiBELA** adalah media pembelajaran interaktif berbasis web statis client-side yang dirancang khusus untuk siswa Gen Z di MA Palattae. Dikembangkan menggunakan metodologi **ADDIE** *(Analysis, Design, Development, Implementation, Evaluation)* dengan mengintegrasikan nilai-nilai **Kurikulum Berbasis Cinta (KBC / Hubbul Wathan)**.

### Keunggulan Utama:
- 🚀 **Zero Friction:** Tanpa registrasi akun atau login berbelit. Siswa cukup memasukkan nama panggilan (disimpan otomatis di `localStorage`).
- ⚡ **Ultra Ringan (< 3 MB):** Berjalan optimal di jaringan 4G ponsel Android maupun laptop tanpa server backend berat.
- 🎯 **3 Tujuan Pembelajaran Terintegrasi:**
  - **TP 10.D.6:** Pemahaman Sishankamnas & Analisis Studi Kasus Ancaman Nirmiliter.
  - **TP 10.D.7:** Eksplorasi Peta Geopolitik Interaktif & Literasi Sumber Berita Tepercaya.
  - **TP 10.D.8:** Penyusunan Mind Map Digital & Perumusan Simpulan Presentasi Berbasis UUD 1945.
- 👨‍🏫 **Portal Guru:** Dilengkapi verifikasi PIN akses (`1234`), rubrik penilaian presentasi lisan, dan embed dashboard Google Sheets untuk rekapitulasi data nilai siswa secara real-time.

---

## 🎨 Design Tokens & Sistem Warna

| Token | Warna | Kode Hex | Kegunaan |
|---|---|---|---|
| **Primary** | Emerald Green | `#0F6B4F` | Warna identitas utama, tombol aksi, aksen navigasi |
| **Secondary / Header** | Deep Green | `#0A4A37` | Header desktop, latar belakang gelap, footer |
| **Accent / Highlight** | Warm Gold | `#E3A92B` | Badge prestasi, tombol tantangan, aksen visual |
| **Background** | Soft Cream | `#FFF8E8` | Latar belakang kanvas utama agar ramah mata |

---

## 📁 Struktur Folder Proyek

```text
SiBELA/
├── index.html              # Shell layout utama aplikasi (Header, Main Container, Bottom Nav)
├── package.json            # Konfigurasi dependensi Tailwind CSS & build scripts
├── tailwind.config.js      # Konfigurasi token warna, font, dan bayangan
├── css/
│   ├── input.css           # File input Tailwind CSS & utility custom
│   └── output.css          # File output CSS terkompilasi & terminifikasi
├── js/
│   ├── app.js              # Entry point aplikasi, router client-side, global state
│   ├── utils.js            # Helper functions (localStorage, validasi URL, format waktu)
│   └── components/         # Modul komponen interaktif
├── pages/                  # Template / modul konten per halaman
├── assets/
│   ├── icons/              # Ikon SVG (navigasi, organisasi dunia, pertahanan)
│   ├── images/             # Ilustrasi & visual materi
│   └── videos/             # Aset video lokal / poster thumbnail
├── docs/                   # Dokumentasi PRD & panduan teknis
└── issues/                 # Dokumen issue step-by-step (Issue #1 s.d. #13) + ROADMAP.md
```

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/username/SiBELA.git
   cd SiBELA
   ```

2. **Instal dependensi Tailwind CSS:**
   ```bash
   npm install
   ```

3. **Kompilasi CSS (Development / Watch Mode):**
   ```bash
   npm run watch:css
   ```
   Atau untuk build produksi sekali jalan:
   ```bash
   npm run build:css
   ```

4. **Jalankan web server lokal:**
   Gunakan ekstensi **Live Server** di VS Code, atau via command line:
   ```bash
   npx serve .
   ```
   Buka browser di `http://localhost:3000` (atau port yang ditentukan).

---

## 🗺️ Roadmap Pengembangan (Model ADDIE)

Daftar issue terstruktur dapat dilihat selengkapnya pada [issues/ROADMAP.md](issues/ROADMAP.md).
- ✅ **Issue #1:** Setup Proyek & Struktur Dasar
- ⏳ **Issue #2:** Sistem Routing SPA Client-Side
- ⏳ **Issue #3:** Halaman Beranda (Nama, Sapaan & Progress Bar)
- ⏳ **Issue #4:** Modul 1: Sishankamnas (Video & Infografik)
- ⏳ **Issue #5:** Modul 1: Form Studi Kasus Nirmiliter
- ⏳ **Issue #6:** Modul 2: Peta Geopolitik Interaktif
- ⏳ **Issue #7:** Modul 2: Form Laporan Singkat
- ⏳ **Issue #8:** Modul Kuis Evaluasi (Bank Soal, Timer, Instant Feedback)
- ⏳ **Issue #9:** Modul Mind Map Digital (Kanvas & Validasi Cabang)
- ⏳ **Issue #10:** Portal Guru (PIN Auth & Dashboard Sheets)
- ⏳ **Issue #11:** Integrasi Google Sheets (Submit Rekap Data)
- ⏳ **Issue #12:** Polish UI/UX, Micro-Interactions & Responsivitas
- ⏳ **Issue #13:** Testing, Bug Fixing & Deployment GitHub Pages

---

## 📜 Lisensi
Proyek ini didistribusikan di bawah lisensi **MIT License**. Lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.
