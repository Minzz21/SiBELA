# Issue #12 — Polish UI/UX: Animasi, Micro-Interactions & Responsivitas Final

## 🏷️ Label
`enhancement` `ui-ux` `polish` `priority: medium`

## 📋 Deskripsi
Memoles seluruh tampilan dan interaksi di semua halaman agar mencapai standar premium. Meliputi: animasi entrance, transisi halaman, micro-interactions (hover, focus, loading states), dark/light konsistensi, serta pengujian responsivitas di berbagai ukuran layar.

## 🎯 Tujuan
- Tampilan web terasa profesional, modern, dan engaging untuk siswa Gen Z.
- Semua interaksi memiliki feedback visual yang konsisten.
- Layout responsif sempurna di mobile (5–6.7") dan desktop (13–15.6").

## 📝 Acceptance Criteria
- [ ] **Animasi Entrance:**
  - Elemen-elemen utama (kartu, heading, gambar) muncul dengan animasi saat pertama kali terlihat (scroll-triggered / page-load).
  - Gunakan `IntersectionObserver` untuk lazy animation.
  - Contoh: fade-in + slide-up, scale-in.
- [ ] **Transisi Halaman:**
  - Perpindahan antar halaman (via router) memiliki transisi smooth.
  - Fade-out → Fade-in atau slide transition.
  - Duration: 200-400ms.
- [ ] **Micro-Interactions:**
  - Tombol: hover scale + shadow, active press effect.
  - Kartu: hover lift + shadow.
  - Input: focus glow border (accent color).
  - Loading: skeleton screen atau spinner konsisten.
  - Success: checkmark animation + optional confetti.
  - Error: shake animation + red highlight.
- [ ] **Responsivitas Final:**
  - Test di viewport: 360px, 390px, 414px (mobile), 768px (tablet), 1024px, 1440px (desktop).
  - Navigasi: Bottom Nav (mobile) ↔ Header Nav (desktop) switch seamless.
  - Font scaling: rem-based, readable di semua ukuran.
  - Touch target: minimal 44×44px untuk semua tombol/link di mobile.
- [ ] **Aksesibilitas Dasar:**
  - Kontras warna memenuhi WCAG AA.
  - `aria-label` pada tombol ikon.
  - Focus visible pada keyboard navigation.
  - `prefers-reduced-motion` media query untuk pengguna sensitif animasi.
- [ ] **Performance:**
  - Total bundle size < 3 MB.
  - Semua gambar terkompresi (WebP/SVG).
  - CSS & JS minified untuk production.
  - Lazy load gambar yang tidak terlihat.

## 🔗 Referensi PRD
- **NFR-1:** Bundle < 3 MB, load < 2 detik di 4G.
- **NFR-2:** Responsif mobile-first.
- **NFR-3:** Sistem warna konsisten.

## 📌 Catatan Teknis
- Animasi bisa menggunakan CSS `@keyframes` + `animation` atau `transition`.
- Intersection Observer API untuk scroll-triggered animations.
- Gunakan `will-change` CSS property dengan hati-hati (hanya saat animasi aktif).
- Test dengan Chrome DevTools → Device Toolbar + Lighthouse audit.
- Kompresi gambar: gunakan `squoosh.app` atau tool CLI.

## ⬅️ Depends On
- Issue #1 – #11 (Semua fitur sudah terimplementasi)
