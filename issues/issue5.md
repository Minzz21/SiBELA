# Issue #5 — Modul 1: Form Studi Kasus Ancaman Nirmiliter

## 🏷️ Label
`feature` `modul1` `form` `TP-10.D.6` `priority: high`

## 📋 Deskripsi
Membangun form interaktif Studi Kasus Lokal sebagai bagian akhir Modul 1. Siswa memilih kategori ancaman nirmiliter, mengidentifikasi contoh lokal, dan menginput usulan solusi berbasis kesadaran bela negara.

## 🎯 Tujuan
- Siswa mampu mengidentifikasi jenis ancaman nirmiliter di lingkungan sekitar.
- Siswa mampu merumuskan solusi konkret sebagai bentuk bela negara.
- Jawaban tersimpan di localStorage dan siap dikirim ke Google Sheets (Issue #11).

## 📝 Acceptance Criteria
- [ ] **Pemilihan Kategori Ancaman:**
  - Dropdown atau card-selector untuk memilih kategori:
    - 🛑 Hoaks & Disinformasi
    - 💊 Penyalahgunaan Narkoba
    - ⚠️ Intoleransi & Radikalisme
    - 🌿 Kerusakan Lingkungan
    - 📉 Kemiskinan & Kesenjangan Sosial
  - Tampilkan ikon dan deskripsi singkat per kategori.
- [ ] **Form Input Studi Kasus:**
  - Textarea: *"Deskripsikan contoh ancaman nirmiliter yang kamu temui di lingkungan sekitar (min. 50 karakter)"*
  - Textarea: *"Apa usulan solusimu sebagai wujud bela negara? (min. 50 karakter)"*
  - Validasi minimum karakter dengan counter real-time.
  - Error message jika belum memenuhi syarat.
- [ ] **Preview & Submit:**
  - Tombol "Pratinjau" menampilkan rangkuman jawaban dalam card terformat.
  - Tombol "Simpan & Lanjutkan" → menyimpan ke `localStorage` key `sibela_studikasus`.
  - Setelah submit: tampilkan feedback sukses + update status `modul1_done = true`.
- [ ] **State Management:**
  - Jika siswa sudah mengisi sebelumnya, form auto-populate dari localStorage.
  - Tombol "Edit Jawaban" untuk mengubah jawaban yang sudah disimpan.

## 🔗 Referensi PRD
- **FR-06:** Form studi kasus ancaman nirmiliter lokal.
- **TP 10.D.6:** Mengidentifikasi sishankamnas & ancaman nirmiliter.

## 📌 Catatan Teknis
- Data tersimpan di localStorage:
  ```json
  {
    "sibela_studikasus": {
      "kategori": "hoaks",
      "contoh_ancaman": "...",
      "solusi": "...",
      "timestamp": "2026-10-24T12:00:00"
    }
  }
  ```
- Validasi dilakukan client-side (min 50 char per textarea).
- Data ini nantinya akan di-bundle saat pengiriman rekap ke Google Sheets (Issue #11).

## ⬅️ Depends On
- Issue #4 (Modul 1: Video & Infografik)
