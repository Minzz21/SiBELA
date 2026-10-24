# Issue #13 — Testing, Bug Fixing & Deployment ke GitHub Pages

## 🏷️ Label
`testing` `deployment` `bugfix` `priority: critical`

## 📋 Deskripsi
Melakukan pengujian menyeluruh (fungsional, responsivitas, usability), memperbaiki bug yang ditemukan, dan melakukan deployment versi final ke GitHub Pages.

## 🎯 Tujuan
- Semua fitur berjalan sesuai acceptance criteria di Issue #1–#12.
- Bug kritis sudah diperbaiki.
- Web SiBELA live dan bisa diakses publik via GitHub Pages.

## 📝 Acceptance Criteria
- [ ] **Pengujian Fungsional (Manual Checklist):**
  - [ ] Input nama → tersimpan → sapaan muncul.
  - [ ] Progress bar terupdate saat modul selesai.
  - [ ] Video Modul 1 bisa diputar.
  - [ ] Infografik 3 komponen bisa di-expand.
  - [ ] Form studi kasus tersimpan di localStorage.
  - [ ] Peta interaktif — semua 5 pin bisa diklik → pop-up muncul.
  - [ ] Form laporan peran tersimpan & URL tervalidasi.
  - [ ] Kuis: soal muncul bertahap, timer berjalan, feedback instant.
  - [ ] Skor kuis dihitung benar & status KKTP sesuai.
  - [ ] Mind map: drag, connect, validasi 3 cabang, simpulan.
  - [ ] Export mind map ke gambar.
  - [ ] Portal guru: PIN auth, 3 tab, iframe embed.
  - [ ] Kirim rekap ke Google Sheets.
  - [ ] Routing semua halaman benar.
  - [ ] 404 redirect berfungsi.
- [ ] **Pengujian Responsivitas:**
  - [ ] Mobile 360px — semua halaman usable.
  - [ ] Mobile 390px — semua halaman usable.
  - [ ] Tablet 768px — layout adaptif.
  - [ ] Desktop 1440px — layout memaksimalkan ruang.
- [ ] **Pengujian Browser:**
  - [ ] Chrome Android — fungsi utama OK.
  - [ ] Chrome Desktop — fungsi utama OK.
  - [ ] Safari iOS (jika ada akses) — fungsi utama OK.
- [ ] **Performance Audit:**
  - [ ] Lighthouse score: Performance ≥ 80, Accessibility ≥ 85.
  - [ ] Total page weight < 3 MB.
  - [ ] First Contentful Paint < 2 detik.
- [ ] **Deployment GitHub Pages:**
  - [ ] Branch `main` atau `gh-pages` dikonfigurasi.
  - [ ] Custom domain (opsional) atau `username.github.io/sibela`.
  - [ ] HTTPS aktif.
  - [ ] Semua link dan routing berfungsi di production URL.
  - [ ] `404.html` redirect handler untuk SPA.

## 🔗 Referensi PRD
- **Pekan 6 (Implementation & Validation):** Uji validasi & perbaikan bug.
- **Pekan 7 (Evaluation & Final Handover):** Deployment final.
- **NFR-1:** Performa.
- **NFR-4:** GitHub Pages hosting.

## 📌 Catatan Teknis
- Untuk SPA di GitHub Pages, buat `404.html` yang redirect ke `index.html` dengan hash route:
  ```html
  <!-- 404.html -->
  <script>
    const path = window.location.pathname;
    window.location.replace('/' + '?redirect=' + encodeURIComponent(path));
  </script>
  ```
- Minify CSS: `npx tailwindcss -o css/output.min.css --minify`.
- Minify JS: gunakan `terser` atau manual `uglify-js`.
- Checklist pengujian bisa dijalankan oleh teman/rekan sebagai "tester".
- Dokumentasikan bug yang ditemukan dan solusinya di `docs/buglog.md`.

## ⬅️ Depends On
- Issue #1 – #12 (Semua fitur & polish selesai)
