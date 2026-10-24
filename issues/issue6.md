# Issue #6 — Modul 2: Peta Geopolitik Interaktif & Pop-up Peran Indonesia

## 🏷️ Label
`feature` `modul2` `peta` `TP-10.D.7` `priority: high`

## 📋 Deskripsi
Membangun halaman Modul 2 dengan Peta Geopolitik Interaktif yang menampilkan pin organisasi internasional (ASEAN, PBB, OKI, G20, Misi Perdamaian). Klik pin menampilkan pop-up card berisi deskripsi peran Indonesia dan tautan ke situs resmi.

## 🎯 Tujuan
- Siswa memahami peran aktif Indonesia di berbagai organisasi internasional.
- Siswa terbiasa mengakses sumber resmi dan terpercaya.
- Peta visual membuat pembelajaran lebih kontekstual dan geografis.

## 📝 Acceptance Criteria
- [ ] **Peta Interaktif:**
  - Peta dunia/regional ditampilkan secara visual (opsi implementasi):
    - **Opsi A:** SVG peta custom yang ringan (recommended, ukuran kecil).
    - **Opsi B:** Leaflet.js dengan tile OpenStreetMap (lebih interaktif tapi lebih berat).
  - Pin/marker ditempatkan di lokasi relevan:
    - 🇮🇩 Jakarta → ASEAN
    - 🇺🇸 New York → PBB (UN)
    - 🇸🇦 Jeddah → OKI
    - 🌏 Multi-lokasi → G20
    - 🇱🇧 Lebanon / 🇨🇩 Kongo → Misi Perdamaian (Garuda Contingent)
  - Pin memiliki animasi pulse/bounce untuk menarik perhatian.
- [ ] **Pop-up Card Detail:**
  - Klik pin → muncul modal/pop-up card berisi:
    - Logo organisasi.
    - Nama lengkap organisasi.
    - Tahun Indonesia bergabung.
    - Deskripsi singkat peran Indonesia (2-3 paragraf).
    - Tombol link ke situs resmi: `kemlu.go.id`, `un.org`, `asean.org`, dll.
  - Animasi slide-up atau fade-in pada pop-up.
  - Tombol close (✕) untuk menutup pop-up.
- [ ] **Tracking Progress:**
  - Siswa dianggap sudah melihat pin jika sudah membuka pop-up.
  - Counter: "Kamu sudah menjelajahi 3/5 organisasi".
  - Simpan state di `localStorage`.

## 🔗 Referensi PRD
- **FR-07:** Peta interaktif geopolitik dengan pin organisasi.
- **FR-08:** Pop-up card peran Indonesia + tautan situs resmi.
- **TP 10.D.7:** Menganalisis peran Indonesia di dunia internasional.

## 📌 Catatan Teknis
- Data organisasi disimpan di `data/modul2.js`:
  ```js
  export const organisasi = [
    {
      id: "asean",
      nama: "ASEAN",
      namaLengkap: "Association of Southeast Asian Nations",
      tahunBergabung: 1967,
      koordinat: { lat: -6.2, lng: 106.8 },
      peran: "Indonesia merupakan pendiri dan ...",
      linkResmi: "https://asean.org",
      logo: "assets/icons/asean.svg"
    },
    // ...
  ];
  ```
- Jika menggunakan SVG peta, buat path clickable per region.
- Jika menggunakan Leaflet.js, load dari CDN dan gunakan tile ringan.
- Gambar logo organisasi gunakan format SVG untuk kualitas dan ukuran optimal.

## ⬅️ Depends On
- Issue #1 (Setup Proyek)
- Issue #2 (Routing SPA)
