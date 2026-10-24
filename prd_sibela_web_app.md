# PRODUCT REQUIREMENT DOCUMENT (PRD)
## SiBELA: Sistem Interaktif Bela Negara

---

### Dokumen Kontrol Proyek
- **Nama Produk:** SiBELA (Sistem Interaktif Bela Negara)
- **Pemilik Produk / Lead Developer:** Mustamin (Amin) - PTIK UNM
- **Target Pengguna:** Siswa Kelas X MA Palattae & Guru Pendidikan Pancasila
- **Metodologi Pengembangan:** Model ADDIE (Analysis, Design, Development, Implementation, Evaluation)
- **Tech Stack Utama:** Vanilla JS (HTML5, CSS3 / Tailwind CSS, JavaScript ES6+)
- **Jadwal Pelaksanaan:** 7 Pekan (7 Oktober 2026 – 25 November 2026)
- **Platform Deployment:** GitHub Pages (Static Web Client-Side)

---

### 1. RINGKASAN EKSEKUTIF & VISI PRODUK

#### 1.1 Latar Belakang
Pengembangan media pembelajaran interaktif berbasis web "SiBELA" dirancang untuk menjawab kebutuhan pembelajaran Pendidikan Pancasila bagi siswa Gen Z di MA Palattae. Fokus utama media ini adalah menyajikan materi Sistem Pertahanan dan Keamanan Nasional (Sishankamnas) serta Peran Indonesia di Dunia secara visual, interaktif, dan kontekstual tanpa membebani perangkat siswa dengan kebutuhan login rumit atau penyimpanan berat.

#### 1.2 Visi Produk
Menjadi media pembelajaran web interaktif yang terintegrasi, praktis, dan dapat diakses secara daring tanpa friksi login, memfasilitasi pencapaian 3 Tujuan Pembelajaran (TP) serta menginternalisasikan nilai-nilai "Kurikulum Berbasis Cinta" (KBC / Hubbul Wathan).

#### 1.3 Indikator Keberhasilan Produk (Key Success Metrics)
- **Kelayakan Media (Expert Validation):** Nilai validasi dari ahli media dan ahli materi $\ge 85\%$ (Kategori Sangat Layak).
- **Keterbacaan & Usability (SUS Score):** Skor System Usability Scale dari uji coba lapangan siswa $\ge 80$ (Grade A / Excellent).
- **Ketuntasan Tujuan Pembelajaran:** $100\%$ fitur media secara fungsional mampu menuntaskan aktivitas penugasan TP 10.D.6, 10.D.7, dan 10.D.8.

---

### 2. AKTOR DAN HAK AKSES SISTEM

Sistem dikembangkan tanpa *database server* dan tanpa fitur *authentication login* (Sesuai Batasan Proposal Bab 4). Hak akses dibedakan melalui *Role-Based Page Routing* sederhana:

| Aktor | Metode Akses | Hak Akses & Aktivitas Utama |
| :--- | :--- | :--- |
| **Siswa (Kelas X)** | Beranda Web (Input Nama Panggilan disimpan di `localStorage`) | • Mempelajari Modul 1 (Sishankamnas) & Modul 2 (Peran Indonesia)<br>• Mengisi Studi Kasus Ancaman Nirmiliter<br>• Mengakses Peta Interaktif Geopolitik & Validasi Sumber<br>• Mengerjakan Kuis Evaluasi (KKTP $\ge 75$)<br>• Menyusun Mind Map Digital & Simpulan<br>• Mengirim Rekap Hasil Belajar ke Google Forms Guru |
| **Guru (Pendidikan Pancasila)** | Menu "Portal Guru" (Diakses via PIN 4 Digit: `1234`) | • Membaca Petunjuk Penggunaan Media & Modul Ajar<br>• Mengunduh/Melihat Rubrik Penilaian Presentasi Lisan (TP 3)<br>• Memantau Rekap Nilai Siswa secara Real-time via Embedded Dashboard Google Sheets |

---

### 3. BATASAN CAKUPAN PRODUK (SCOPE & OUT OF SCOPE)

#### 3.1 In-Scope (Fitur Utama)
- Tampilan Web Responsif (Mobile-First & Desktop Compatible).
- **Beranda & Sapaan Motivasi:** Input nama siswa mandiri, indikator progress bar belajar, & kartu pemicu tantangan harian.
- **Modul 1 (TP 10.D.6):** Player video animasi Sishankamnas, infografik 3 komponen pertahanan (Utama, Cadangan, Pendukung), serta form analisis Studi Kasus Ancaman Nirmiliter lokal.
- **Modul 2 (TP 10.D.7):** Peta Geopolitik Interaktif ber-pin (ASEAN, PBB, OKI, G20, Misi Perdamaian), modal pop-up peran & link domain resmi (`kemlu.go.id`, `un.org`), serta form laporan 3 peran & sumber valid.
- **Modul Kuis Evaluasi:** Bank soal interaktif, countdown timer per nomor, indikator kemajuan, instant feedback penjelasan, perhitungan skor KKTP, dan alur saran remedial jika skor $< 75$.
- **Modul Mind Map Digital (TP 10.D.8):** Kanvas interaktif (drag-and-drop / click-to-connect), validasi otomatis minimal 3 cabang terhubung, form input simpulan presentasi berbasis UUD 1945, dan simpan visual.
- **Portal Guru & Integrasi Google Sheets:** Pengiriman data rekap (Nama, Skor, Waktu) via Google Form Action / Webhook Script, dan pemantauan data real-time via Iframe Google Sheets.

#### 3.2 Out-of-Scope (Dikecualikan)
- Backend Database Server (MySQL/PostgreSQL/MongoDB).
- Sistem Registrasi/Login Pengguna (Username/Password/OAuth).
- Mode Offline / Progressive Web App (PWA Service Worker) — Fokus penuh pada Web Daring Statis.
- Pengujian Efektivitas Hasil Belajar (Pre-test / Post-test Eksperimental).

---

### 4. SPESIFIKASI PERSYARATAN FUNGSIONAL (FUNCTIONAL REQUIREMENTS)

#### 4.1 Modul Beranda & Navigasi Utama
- **FR-01:** Sistem wajib menyediakan kolom input nama panggilan siswa yang tersimpan di `localStorage`.
- **FR-02:** Sistem wajib menampilkan bilah navigasi utama (*Header* untuk Desktop, *Bottom Navigation Bar* untuk Mobile).
- **FR-03:** Sistem wajib menampilkan *Progress Bar* persentase penyelesaian modul secara dinamis.

#### 4.2 Modul 1: Sishankamnas & Ancaman Nirmiliter (TP 10.D.6)
- **FR-04:** Menyediakan pemutar media video edukasi Sishankamnas (Durasi 60–90 detik).
- **FR-05:** Menyediakan kartu infografik interaktif untuk Komponen Utama (TNI/Polri), Komponen Cadangan, dan Komponen Pendukung.
- **FR-06:** Menyediakan form interaktif Studi Kasus Lokal di mana siswa memilih kategori ancaman nirmiliter (hoaks, narkoba, intoleransi) dan menginput usulan solusinya.

#### 4.3 Modul 2: Peran Indonesia di Dunia & Sumber Tepercaya (TP 10.D.7)
- **FR-07:** Menyediakan Peta Interaktif Geopolitik yang menampilkan pin lokasi organisasi internasional.
- **FR-08:** Saat pin diklik, sistem menampilkan *Pop-up Card* deskripsi peran Indonesia dan tombol tautan langsung ke situs web resmi (misal: `kemlu.go.id`, `un.org`, `asean.org`).
- **FR-09:** Menyediakan form "Tugas Laporan Singkat" tempat siswa menginput 3 peran aktif Indonesia disertai 3 URL sumber resmi tepercaya.

#### 4.4 Modul Kuis Evaluasi
- **FR-10:** Sistem menyajikan soal kuis pilihan ganda secara bertahap dengan *Countdown Timer*.
- **FR-11:** Sistem memberikan umpan balik langsung (*Instant Feedback*) beserta penjelasan kunci jawaban setelah siswa memilih opsi.
- **FR-12:** Sistem menghitung skor akhir (Skala 0–100). Jika Skor $\ge 75$, kuis dinyatakan Tuntas (KKTP terpenuhi). Jika Skor $< 75$, sistem menampilkan tombol petunjuk Remedial.

#### 4.5 Modul Mind Map Digital & Presentasi (TP 10.D.8)
- **FR-13:** Menyediakan kanvas kerja interaktif dengan topik utama "Peran Indonesia di Dunia".
- **FR-14:** Menyediakan panel kartu istilah/gagasan yang dapat dihubungkan ke kanvas utama.
- **FR-15:** Tombol "Periksa" wajib memvalidasi apakah cabang terhubung minimal 3 cabang.
- **FR-16:** Menyediakan kolom input teks bagi siswa untuk merumuskan simpulan dan alasan pendukung berbasis UUD 1945 sebelum presentasi lisan di kelas.

#### 4.6 Portal Guru & Rekap Data
- **FR-17:** Halaman Portal Guru dilindungi oleh otentikasi PIN sederhana 4-digit (`1234`).
- **FR-18:** Tombol "Kirim Rekap ke Guru" akan mengirimkan payload data (Nama, Skor Kuis, Status Mind Map, Timestamp) ke Google Form / Google Apps Script Webhook.
- **FR-19:** Halaman Portal Guru menampilkan *Embed Iframe* Google Sheets secara *real-time* untuk pemantauan hasil seluruh siswa.

---

### 5. PERSYARATAN NON-FUNGSIONAL (NON-FUNCTIONAL REQUIREMENTS)

1. **Performa & Ukuran Bundle:** Total ukuran muatan halaman web (HTML5, CSS3/Tailwind CSS, JavaScript ES6+) $< 3\text{ MB}$ agar dapat dimuat dalam waktu $< 2\text{ detik}$ pada jaringan 4G seluler.
2. **Responsivitas UI/UX:** Tampilan wajib adaptif pada semua ukuran layar ponsel Android (layar 5–6.7 inci) dan layar monitor laptop desktop (13–15.6 inci).
3. **Sistem Desain & Warna:**
   - Primary: Emerald Green (`#0F6B4F`)
   - Secondary / Header Dark: Deep Green (`#0A4A37`)
   - Accent / Highlight: Gold (`#E3A92B`)
   - Background: Cream / Off-White (`#FFF8E8`)
4. **Infra & Biaya:** $100\%$ memanfaatkan infrastruktur statis bebas biaya (GitHub Pages untuk Hosting, Google Sheets untuk Serverless Storage).

---

### 6. ARSITEKTUR TEKNIS DAN ALUR DATA

```text
[ Browser Siswa (Ponsel/Laptop) ]
       │
       ├──> LocalStorage (Nama, Progress Belajar, Status Kuis)
       │
       ├──> Client-Side JS (Vanilla JS ES6+ + Tailwind CSS)
       │
       └──> HTTP POST / Form Submit Action
                  │
                  ▼
   [ Google Form / Apps Script Webhook ]
                  │
                  ▼
      [ Google Sheets (Database) ]
                  │
                  ▼ (Iframe Embed)
       [ Portal Guru di SiBELA ]
```

---

### 7. RENCANA PELAKSANAAN & ROADMAP (7 PEKAN - MODEL ADDIE)

- **Pekan 1 (7 - 13 Okt 2026) - Analysis Phase:** Finalisasi judul, pemetaan 3 TP, penetapan batasan tanpa login & tanpa database, dan penyusunan proposal Bab 1-3.
- **Pekan 2 (14 - 20 Okt 2026) - Design Phase:** Finalisasi Flowchart, Wireframe Lo-Fi & Hi-Fi (Materi 1 & Materi 2), serta Use Case Diagram terelaborasi.
- **Pekan 3 (21 - 27 Okt 2026) - Development Phase 1:** Setup repositori GitHub, pembuatan struktur proyek (Vanilla JS ES6+ + Tailwind CSS), koding Beranda & Modul 1 (Sishankamnas + Studi Kasus).
- **Pekan 4 (28 Okt - 3 Nov 2026) - Development Phase 2:** Koding Modul 2 (Peta Geopolitik Interaktif & Validasi Link), Kuis Evaluasi dengan timer & feedback instant.
- **Pekan 5 (4 - 10 Nov 2026) - Development Phase 3:** Koding Mind Map Digital (Drag-and-Drop / Connect), pembentukan Portal Guru, & integrasi pengiriman data ke Google Sheets.
- **Pekan 6 (11 - 17 Nov 2026) - Implementation & Validation Phase:** Uji validasi ahli media & materi, uji kepraktisan (usability) pada sampel siswa MA Palattae, perbaikan bug.
- **Pekan 7 (18 - 25 Nov 2026) - Evaluation Phase & Final Handover:** Deployment versi final di GitHub Pages, penyusunan Laporan Akhir R&D, penyerahan media ke guru pamong.

---

### 8. MANAJEMEN RISIKO

| Risiko Potensial | Tingkat Dampak | Solusi & Mitigasi |
| :--- | :--- | :--- |
| **Koneksi internet sekolah lambat saat mengakses media** | Sedang | Kompres seluruh file gambar/vektor ke format WebP/SVG dan gunakan pustaka JS minified agar muatan ringan. |
| **Pengiriman data kuis ke Google Sheets diblokir CORS** | Tinggi | Gunakan mekanisme submit form tersembunyi (*Hidden Google Form Submit*) atau Google Apps Script `doPost` dengan header CORS terbuka. |
| **Siswa tidak sengaja menghapus tab atau menutup browser** | Rendah | Simpan status input dan jawaban kuis secara *real-time* ke `localStorage` agar tidak hilang saat halaman di-*refresh*. |