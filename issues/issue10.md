# Issue #10 — Portal Guru: Otentikasi PIN & Halaman Dashboard

## 🏷️ Label
`feature` `portal-guru` `auth` `priority: high`

## 📋 Deskripsi
Membangun halaman Portal Guru yang dilindungi dengan otentikasi PIN 4-digit sederhana. Portal ini berisi petunjuk penggunaan media, link modul ajar, rubrik penilaian presentasi lisan (TP 3), dan embed dashboard Google Sheets untuk pemantauan data siswa.

## 🎯 Tujuan
- Guru dapat mengakses portal khusus dengan PIN sederhana.
- Guru mendapat panduan lengkap penggunaan media SiBELA.
- Guru dapat memantau rekap nilai siswa secara real-time.

## 📝 Acceptance Criteria
- [ ] **Otentikasi PIN:**
  - Halaman `#/portal-guru` menampilkan layar input PIN 4-digit.
  - 4 kotak input (masing-masing 1 digit) dengan auto-focus ke kotak berikutnya.
  - PIN benar: `1234` → masuk ke dashboard guru.
  - PIN salah → animasi shake + pesan error *"PIN salah. Silakan coba lagi."*
  - Maksimal 5 percobaan → lock 30 detik.
  - Session guru disimpan di `sessionStorage` (hilang saat tab ditutup).
- [ ] **Dashboard Guru — Tab/Seksi:**
  - **Tab 1: Petunjuk Penggunaan**
    - Panduan step-by-step cara menggunakan SiBELA di kelas.
    - Daftar fitur dan cara navigasinya.
    - Tips penggunaan untuk guru.
  - **Tab 2: Modul Ajar & Rubrik**
    - Ringkasan Tujuan Pembelajaran (TP 10.D.6, 10.D.7, 10.D.8).
    - Rubrik penilaian presentasi lisan (TP 3) dalam format tabel.
    - Tombol download rubrik sebagai PDF (opsional) atau tampilkan inline.
  - **Tab 3: Rekap Nilai Siswa**
    - Embed Google Sheets via `<iframe>` (URL published sheet).
    - Placeholder iframe dengan instruksi jika URL belum dikonfigurasi.
    - Tombol refresh iframe.
- [ ] **UI/UX:**
  - Layout profesional dan bersih untuk guru.
  - Tombol "Keluar Portal" untuk kembali ke mode siswa.
  - Responsive untuk mobile dan desktop.

## 🔗 Referensi PRD
- **FR-17:** Otentikasi PIN 4-digit (`1234`).
- **FR-19:** Embed iframe Google Sheets real-time.
- **Bagian 2 (Aktor):** Hak akses guru.

## 📌 Catatan Teknis
- PIN di-hardcode di client-side (sesuai batasan proyek — tanpa backend).
- Session guru: `sessionStorage.setItem('sibela_guru_auth', 'true')`.
- Google Sheets embed URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/pubhtml`.
- Rubrik penilaian dibuat sebagai HTML table statis di `data/rubrik.js`.
- Jika PIN terekspos di source code: ini acceptable karena sesuai batasan proyek (no backend auth).

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
