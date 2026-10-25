/**
 * SiBELA - Modul 1: Sishankamnas (TP 10.D.6)
 * Shell view untuk Issue #2 & fondasi untuk Issue #4 & #5
 */

export function render() {
  return `
    <div class="page-enter max-w-5xl mx-auto space-y-6">
      
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <a href="#/" class="hover:underline">Beranda</a>
            <span>/</span>
            <span>Modul Pembelajaran 1</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span class="p-2 rounded-xl bg-primary text-white text-lg">🛡️</span>
            <span>Sistem Pertahanan & Keamanan Nasional</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">Tujuan Pembelajaran: TP 10.D.6 — Mengidentifikasi Sishankamnas & Menganalisis Ancaman Nirmiliter</p>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-center">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Tahap 1 dari 4</span>
        </span>
      </div>

      <!-- Video Player Placeholder Card -->
      <div class="glass-card p-6 border-l-4 border-primary">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-emerald-100 text-primary font-bold text-sm">Aktivitas 1</span>
            <h2 class="text-lg font-bold text-gray-900">Video Edukasi Sishankamnas (60–90 Detik)</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-04</span>
        </div>
        
        <div class="aspect-video w-full max-w-3xl mx-auto rounded-2xl bg-secondary-dark/95 border-2 border-emerald-800/60 flex flex-col items-center justify-center text-center p-6 text-white shadow-card">
          <div class="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform shadow-lg">
            <svg class="w-8 h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-white mb-1">Mengenal 3 Komponen Pertahanan Negara</h3>
          <p class="text-xs text-emerald-200/80 max-w-md">Video animasi edukatif interaktif tentang pertahanan semesta di Indonesia.</p>
          <div class="mt-4 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-emerald-200 border border-white/10">
            Player siap diintegrasikan pada Issue #4
          </div>
        </div>
      </div>

      <!-- 3 Defense Components Preview -->
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-emerald-100 text-primary font-bold text-sm">Aktivitas 2</span>
            <h2 class="text-lg font-bold text-gray-900">Infografik 3 Komponen Pertahanan</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-05</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <span class="text-2xl mb-2 block">🎖️</span>
            <h3 class="font-bold text-emerald-900 text-sm mb-1">Komponen Utama</h3>
            <p class="text-xs text-gray-600">TNI & Polri sebagai garda terdepan siap menghadapi ancaman militer.</p>
          </div>
          <div class="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
            <span class="text-2xl mb-2 block">👥</span>
            <h3 class="font-bold text-amber-900 text-sm mb-1">Komponen Cadangan</h3>
            <p class="text-xs text-gray-600">Warga negara yang disiapkan dan dilatih untuk memperkuat komponen utama.</p>
          </div>
          <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <span class="text-2xl mb-2 block">🤝</span>
            <h3 class="font-bold text-emerald-900 text-sm mb-1">Komponen Pendukung</h3>
            <p class="text-xs text-gray-600">Seluruh rakyat, sumber daya alam & buatan, serta sarana prasarana nasional.</p>
          </div>
        </div>
      </div>

      <!-- Form Studi Kasus Teaser -->
      <div class="glass-card p-6 border-l-4 border-accent">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-amber-100 text-amber-900 font-bold text-sm">Aktivitas 3</span>
            <h2 class="text-lg font-bold text-gray-900">Form Studi Kasus Ancaman Nirmiliter</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-06</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Pilih kategori ancaman di sekitar lingkunganmu (hoaks, narkoba, intoleransi) dan usulkan solusi bela negara konkret. Formulir interaktif akan diaktifkan penuh pada <strong>Issue #5</strong>.
        </p>
      </div>

      <!-- Navigation Actions -->
      <div class="flex items-center justify-between pt-4">
        <a href="#/" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
          <span>← Kembali ke Beranda</span>
        </a>
        <a href="#/modul2" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
          <span>Lanjut ke Modul 2: Peran Indonesia →</span>
        </a>
      </div>

    </div>
  `;
}
