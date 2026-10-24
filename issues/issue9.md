# Issue #9 — Modul Mind Map Digital: Kanvas Interaktif & Validasi Cabang

## 🏷️ Label
`feature` `mindmap` `kanvas` `TP-10.D.8` `priority: high`

## 📋 Deskripsi
Membangun modul Mind Map Digital dengan kanvas interaktif. Siswa menyusun mind map bertema "Peran Indonesia di Dunia" dengan menghubungkan kartu gagasan ke topik utama, memvalidasi minimal 3 cabang, dan merumuskan simpulan berbasis UUD 1945.

## 🎯 Tujuan
- Siswa mampu menyusun peta konsep (mind map) secara visual dan terstruktur.
- Siswa melatih kemampuan berpikir kritis dan koneksi antar konsep.
- Siswa merumuskan simpulan untuk presentasi lisan di kelas.

## 📝 Acceptance Criteria
- [ ] **Kanvas Kerja Interaktif:**
  - Area kanvas besar (scrollable/zoomable) dengan topik utama di tengah: **"Peran Indonesia di Dunia"**.
  - Topik utama ditampilkan sebagai node pusat dengan styling premium.
  - Kanvas bisa di-zoom (pinch/scroll) dan di-pan (drag).
- [ ] **Panel Kartu Gagasan:**
  - Sidebar/panel bawah berisi kartu-kartu gagasan yang bisa di-drag ke kanvas:
    - Contoh kartu: "Pendiri ASEAN", "Anggota PBB", "Misi Garuda", "KTT G20", "Mediator Konflik", "OKI", dll.
    - Kartu tambahan kosong agar siswa bisa menambah gagasan sendiri (input teks custom).
  - Kartu bisa di-drag & drop ke kanvas (desktop) atau tap-to-place (mobile).
- [ ] **Koneksi Cabang:**
  - Setelah kartu ditempatkan di kanvas, siswa bisa menghubungkan kartu ke node pusat atau ke kartu lain.
  - Koneksi divisualisasikan dengan garis/kurva (SVG line/bezier).
  - Klik/tap pada kartu lalu klik/tap pada target = buat koneksi.
  - Koneksi bisa dihapus.
- [ ] **Validasi Minimal 3 Cabang:**
  - Tombol "Periksa Mind Map" memvalidasi:
    - ✅ Minimal 3 node terhubung ke pusat → lanjut.
    - ❌ Kurang dari 3 → pesan error: *"Hubungkan minimal 3 gagasan ke topik utama."*
  - Animasi visual saat validasi (highlight cabang terhubung).
- [ ] **Form Simpulan Presentasi:**
  - Setelah mind map valid, tampilkan form:
    - Textarea: *"Rumuskan simpulan tentang pentingnya peran Indonesia di dunia (minimal 100 karakter)"*
    - Textarea: *"Sebutkan dasar hukum dari UUD 1945 yang mendukung simpulanmu"*
    - Hint/tooltip: contoh pasal UUD 1945 (Alinea ke-4 Pembukaan, Pasal 11, dll.)
  - Validasi minimum karakter.
- [ ] **Simpan Visual Mind Map:**
  - Tombol "Simpan sebagai Gambar" → export kanvas ke PNG/JPEG menggunakan `html2canvas` atau Canvas API.
  - Tombol "Simpan & Selesai" → simpan data mind map + simpulan ke localStorage.
  - Update status `mindmap_done = true`.

## 🔗 Referensi PRD
- **FR-13:** Kanvas kerja interaktif "Peran Indonesia di Dunia".
- **FR-14:** Panel kartu gagasan yang bisa dihubungkan.
- **FR-15:** Validasi minimal 3 cabang terhubung.
- **FR-16:** Form simpulan berbasis UUD 1945.
- **TP 10.D.8:** Menyusun mind map & simpulan presentasi.

## 📌 Catatan Teknis
- Implementasi drag-and-drop:
  - Desktop: HTML5 Drag and Drop API atau Pointer Events.
  - Mobile: Touch Events (`touchstart`, `touchmove`, `touchend`).
- Koneksi antar node bisa digambar dengan SVG `<line>` atau `<path>`.
- Posisi node disimpan sebagai koordinat `{x, y}` di localStorage.
- Library alternatif (opsional, jika diizinkan): `interact.js` untuk drag yang lebih smooth.
- Data mind map di localStorage:
  ```json
  {
    "sibela_mindmap": {
      "nodes": [
        { "id": "n1", "text": "Pendiri ASEAN", "x": 200, "y": 150, "connectedTo": ["center"] }
      ],
      "simpulan": "...",
      "dasarHukum": "...",
      "timestamp": "..."
    }
  }
  ```
- Ekspor gambar menggunakan `html2canvas` (load dari CDN).

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
