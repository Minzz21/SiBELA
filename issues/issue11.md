# Issue #11 — Integrasi Google Sheets: Pengiriman Rekap Data Siswa

## 🏷️ Label
`feature` `integrasi` `google-sheets` `priority: high`

## 📋 Deskripsi
Membangun sistem pengiriman data rekap hasil belajar siswa (Nama, Skor Kuis, Status Mind Map, Timestamp) ke Google Forms / Google Apps Script Webhook yang terhubung ke Google Sheets sebagai "database serverless".

## 🎯 Tujuan
- Data hasil belajar siswa terkirim ke Google Sheets secara otomatis.
- Guru bisa memantau rekap nilai secara real-time tanpa backend.
- Siswa mendapat konfirmasi pengiriman berhasil.

## 📝 Acceptance Criteria
- [x] **Tombol "Kirim Rekap ke Guru":**
  - Tombol muncul di halaman Beranda atau halaman hasil kuis setelah semua modul selesai.
  - Tombol aktif hanya jika minimal kuis sudah dikerjakan.
  - Loading state saat pengiriman (spinner/animasi).
- [x] **Payload Data yang Dikirim:**
  - Nama siswa (dari `localStorage`).
  - Skor Kuis (nilai tertinggi).
  - Status Studi Kasus (sudah diisi / belum).
  - Status Mind Map (sudah selesai / belum).
  - Jumlah organisasi dijelajahi di Peta (dari Modul 2).
  - Timestamp pengiriman.
- [x] **Metode Pengiriman (2 opsi, pilih salah satu):**
  - **Opsi A — Hidden Google Form Submit:**
    - Buat Google Form dengan field matching.
    - Submit via hidden `<iframe>` + `<form>` action ke URL Google Form.
    - Tidak ada masalah CORS.
  - **Opsi B — Google Apps Script Webhook:**
    - Deploy Apps Script `doPost(e)` sebagai Web App.
    - Kirim data via `fetch()` POST ke URL webhook.
    - Handle CORS dengan `doPost` + `ContentService`.
- [x] **Feedback Pengiriman:**
  - ✅ Berhasil → pesan sukses *"Data berhasil dikirim ke guru! 🎉"*
  - ❌ Gagal → pesan error + tombol "Coba Lagi".
  - Flag `sibela_rekap_sent = true` di localStorage agar tidak double submit.
- [x] **Konfigurasi:**
  - URL Google Form/Webhook disimpan di `config.js` agar mudah diganti.
  - Dokumentasi setup Google Form/Apps Script di `docs/setup-google-sheets.md`.

## 🔗 Referensi PRD
- **FR-18:** Kirim payload data ke Google Form / Apps Script Webhook.
- **Bagian 6 (Arsitektur):** Browser → HTTP POST → Google Form/Apps Script → Google Sheets.
- **Risiko:** CORS blocking → solusi: Hidden Form Submit atau Apps Script doPost.

## 📌 Catatan Teknis
- **Opsi A (Hidden Form Submit) — Recommended:**
  ```js
  function kirimRekap(data) {
    const formUrl = CONFIG.GOOGLE_FORM_URL;
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formUrl;
    form.target = 'hidden_iframe';

    // Append fields...
    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key; // Google Form entry ID
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }
  ```
- **Opsi B (Apps Script):**
  ```js
  // Google Apps Script (server-side)
  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.nama, data.skor, data.mindmap, new Date()]);
    return ContentService.createTextOutput("OK");
  }
  ```
- Buat `docs/setup-google-sheets.md` dengan langkah-langkah setup.

## ⬅️ Depends On
- Issue #3 (Beranda — untuk tombol kirim)
- Issue #8 (Kuis — untuk data skor)
- Issue #9 (Mind Map — untuk status mind map)
