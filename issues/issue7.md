# Issue #7 — Modul 2: Form Tugas Laporan Singkat & Validasi Sumber

## 🏷️ Label
`feature` `modul2` `form` `TP-10.D.7` `priority: high`

## 📋 Deskripsi
Membangun form "Tugas Laporan Singkat" sebagai bagian akhir Modul 2. Siswa menginput 3 peran aktif Indonesia di organisasi internasional, masing-masing disertai URL sumber resmi yang tepercaya.

## 🎯 Tujuan
- Siswa mampu menyebutkan peran aktif Indonesia di dunia.
- Siswa mampu memvalidasi sumber informasi dari domain resmi.
- Melatih literasi digital siswa Gen Z.

## 📝 Acceptance Criteria
- [ ] **Form Input 3 Peran:**
  - 3 pasang input field:
    - Input teks: *"Peran Indonesia ke-[n]"* (min. 30 karakter).
    - Input URL: *"Sumber resmi (URL)"* dengan validasi format URL.
  - Setiap pasangan input memiliki nomor urut dan ikon.
- [ ] **Validasi Sumber URL:**
  - Validasi format URL (harus dimulai `http://` atau `https://`).
  - Validasi domain terpercaya (opsional, sebagai rekomendasi):
    - ✅ Domain direkomendasikan: `kemlu.go.id`, `un.org`, `asean.org`, `g20.org`, `oic-oci.org`
    - ⚠️ Domain lain: tampilkan peringatan *"Pastikan ini sumber terpercaya"*.
  - Indikator visual: ✅ hijau (valid), ⚠️ kuning (peringatan), ❌ merah (invalid).
- [ ] **Preview & Submit:**
  - Tombol "Pratinjau Laporan" menampilkan rangkuman dalam format tabel rapi.
  - Tombol "Simpan & Selesai" → simpan ke `localStorage` key `sibela_laporan_peran`.
  - Update status `modul2_done = true` di localStorage.
  - Tampilkan pesan sukses dengan animasi confetti/checkmark.
- [ ] **State Management:**
  - Auto-populate dari localStorage jika sudah pernah diisi.
  - Tombol reset/edit tersedia.

## 🔗 Referensi PRD
- **FR-09:** Form laporan 3 peran + 3 URL sumber resmi.
- **TP 10.D.7:** Menganalisis peran Indonesia di dunia internasional.

## 📌 Catatan Teknis
- Data tersimpan di localStorage:
  ```json
  {
    "sibela_laporan_peran": {
      "peran": [
        { "deskripsi": "...", "url": "https://kemlu.go.id/..." },
        { "deskripsi": "...", "url": "https://un.org/..." },
        { "deskripsi": "...", "url": "https://asean.org/..." }
      ],
      "timestamp": "2026-10-24T12:00:00"
    }
  }
  ```
- Gunakan `new URL()` constructor untuk validasi format URL.
- Regex validasi domain: `/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/`.

## ⬅️ Depends On
- Issue #6 (Modul 2: Peta Interaktif)
