# Panduan Setup Integrasi Google Sheets (SiBELA)

SiBELA mendukung pengiriman rekap nilai dan progres belajar siswa secara langsung ke Google Sheets guru **tanpa backend server khusus**. Seluruh pengaturan endpoint terpusat di file [`config.js`](../config.js).

---

## Data yang Dikirimkan

Setiap kali siswa menekan tombol **Kirim Rekap ke Guru**, SiBELA mengirimkan 6 kolom data berikut dari `localStorage`:

| Field di `config.js` | Isi Data | Sumber Data |
| :--- | :--- | :--- |
| `nama` | Nama panggilan siswa | `localStorage` (`sibela_nama`) |
| `skor` | Nilai kuis tertinggi (`bestScore`) | `localStorage` (`sibela_kuis`) |
| `studiKasus` | Status pengerjaan Studi Kasus (`Sudah Diisi` / `Belum Diisi`) | `localStorage` (`sibela_studikasus`) |
| `mindMap` | Status Mind Map Digital (`Sudah Selesai` / `Belum Selesai`) | `localStorage` (`sibela_mindmap` / `sibela_progress`) |
| `organisasiPeta` | Jumlah organisasi yang dijelajahi di peta Modul 2 (misal `5/5 Organisasi`) | `localStorage` (`sibela_modul2_explored`) |
| `timestamp` | Waktu pengiriman rekap | Waktu lokal perangkat siswa |

---

## Opsi A: Hidden Google Form Submit (Direkomendasikan)

Metode ini mengirimkan data melalui `<form>` tersembunyi ke Google Form sehingga **bebas masalah CORS**, tidak memerlukan login siswa, dan otomatis masuk ke Google Sheets.

### Langkah 1 — Buat Google Form Baru
1. Buka [Google Forms](https://forms.google.com) dan buat formulir baru, misalnya berjudul **"Rekap Nilai SiBELA"**.
2. Buat **6 pertanyaan bertipe Jawaban Singkat (*Short Answer*)** secara berurutan (jangan aktifkan wajib login/kumpulkan email agar siswa tidak perlu login Google):
   1. `Nama Siswa`
   2. `Skor Kuis Terbaik`
   3. `Status Studi Kasus`
   4. `Status Mind Map`
   5. `Organisasi Peta Modul 2`
   6. `Timestamp Pengiriman`
3. Buka tab **Jawaban (*Responses*)** -> klik **Link ke Sheets (*Link to Sheets*)** -> pilih **Buat spreadsheet baru** agar semua kiriman otomatis terekam rapi di Google Sheets.

### Langkah 2 — Dapatkan URL `formResponse` & Entry ID
1. Klik ikon menu titik tiga (`⋮`) di kanan atas Google Form -> pilih **Dapatkan link yang sudah diisi sebelumnya (*Get pre-filled link*)**.
2. Isi contoh nilai berbeda pada tiap kolom (misal `NAMA_TEST`, `90`, `CASE_TEST`, `MAP_TEST`, `PETA_TEST`, `WAKTU_TEST`), lalu klik **Dapatkan link (*Get link*)** dan **Salin link (*Copy link*)**.
3. Tempel URL tersebut ke notepad. Bentuknya mirip seperti ini:
   ```text
   https://docs.google.com/forms/d/e/1FAIpQLSdAbCdEfG.../viewform?usp=pp_url&entry.123456789=NAMA_TEST&entry.234567890=90&...
   ```
4. Ubah bagian akhir `/viewform?...` menjadi `/formResponse` untuk mendapatkan `GOOGLE_FORM_ACTION`:
   ```text
   https://docs.google.com/forms/d/e/1FAIpQLSdAbCdEfG.../formResponse
   ```
5. Catat setiap `entry.xxxxxxxxx` sesuai urutan pertanyaannya.

### Langkah 3 — Update `config.js`
Buka file [`config.js`](../config.js) di root proyek, pastikan `METHOD` diset `'google-form'`, lalu ganti nilai placeholder:

```js
export const SHEETS_CONFIG = {
  METHOD: 'google-form',
  GOOGLE_FORM_ACTION: 'https://docs.google.com/forms/d/e/ID_FORM_ASLI_ANDA/formResponse',
  GOOGLE_FORM_ENTRIES: {
    nama: 'entry.123456789',
    skor: 'entry.234567890',
    studiKasus: 'entry.345678901',
    mindMap: 'entry.456789012',
    organisasiPeta: 'entry.567890123',
    timestamp: 'entry.678901234'
  },
  // ...
};
```

---

## Opsi B: Google Apps Script Webhook (`doPost`)

Gunakan opsi ini jika guru ingin langsung menulis baris ke Google Sheets tanpa perantara Google Form.

### Langkah 1 — Siapkan Google Sheets & Apps Script
1. Buat Google Spreadsheet baru dengan header baris 1 pada `Sheet1`:
   `Timestamp Server | Nama Siswa | Skor Kuis | Studi Kasus | Mind Map | Organisasi Peta | Waktu Siswa`
2. Klik menu **Ekstensi (*Extensions*)** -> **Apps Script**.
3. Tempel kode berikut di `Code.gs`:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.nama || '-',
      data.skor || 0,
      data.studiKasus || 'Belum Diisi',
      data.mindMap || 'Belum Selesai',
      data.organisasiPeta || '0/5 Organisasi',
      data.timestamp || '-'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Langkah 2 — Deploy Web App
1. Klik **Deploy** -> **New deployment**.
2. Pilih tipe **Web app**.
3. Setel **Execute as**: `Me`, dan **Who has access**: `Anyone` (*Siapa saja*).
4. Klik **Deploy**, izinkan akses Google Sheets jika diminta, lalu salin **Web app URL** (`https://script.google.com/macros/s/.../exec`).

### Langkah 3 — Update `config.js`
Buka [`config.js`](../config.js), ubah `METHOD` dan `APPS_SCRIPT_URL`:

```js
export const SHEETS_CONFIG = {
  METHOD: 'apps-script',
  // ...
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/DEPLOYMENT_ID_ASLI_ANDA/exec',
};
```

---

## Pengujian & Troubleshooting

- **Tombol terkunci / nonaktif:** Pastikan siswa minimal telah menyelesaikan kuis evaluasi (`sibela_kuis` tersimpan di `localStorage`).
- **Menguji pengiriman ulang pada browser yang sama:** SiBELA menyimpan flag `sibela_rekap_sent = true` untuk mencegah pengiriman ganda. Untuk menguji ulang di browser pengembang, jalankan di DevTools Console:
  ```js
  localStorage.removeItem('sibela_rekap_sent');
  localStorage.removeItem('sibela_rekap_meta');
  location.reload();
  ```
- **Data tidak muncul di Sheet (Opsi A):** Pastikan setiap nama field `entry.xxxxxxx` pada `config.js` tepat sama dengan link *pre-filled* Google Form dan tidak ada pertanyaan bertipe pilihan ganda yang menolak format teks SiBELA (gunakan tipe *Short Answer* untuk semua field).

