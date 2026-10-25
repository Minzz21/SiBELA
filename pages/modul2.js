/**
 * SiBELA - Modul 2: Peran Indonesia di Dunia (TP 10.D.7)
 * Shell view untuk Issue #2 & fondasi untuk Issue #6 & #7
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
            <span>Modul Pembelajaran 2</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span class="p-2 rounded-xl bg-accent text-secondary font-bold text-lg">🌏</span>
            <span>Peran Indonesia di Dunia Internasional</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">Tujuan Pembelajaran: TP 10.D.7 — Menganalisis Peran Aktif Indonesia & Validasi Sumber Resmi</p>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 self-start sm:self-center">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Tahap 2 dari 4</span>
        </span>
      </div>

      <!-- Interactive Map Teaser Card -->
      <div class="glass-card p-6 border-l-4 border-accent">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-amber-100 text-amber-900 font-bold text-sm">Aktivitas 1</span>
            <h2 class="text-lg font-bold text-gray-900">Peta Geopolitik Interaktif (ASEAN, PBB, OKI, G20)</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-07, FR-08</span>
        </div>

        <div class="aspect-[16/9] w-full max-w-3xl mx-auto rounded-2xl bg-emerald-950/90 border-2 border-emerald-800/60 flex flex-col items-center justify-center text-center p-6 text-white shadow-card relative overflow-hidden">
          <div class="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
            <svg class="w-full h-full text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.7" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          
          <div class="relative z-10 flex flex-col items-center">
            <div class="flex gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-full bg-accent text-secondary text-xs font-black shadow">🇮🇩 ASEAN</span>
              <span class="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow">🇺🇳 PBB</span>
              <span class="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow">☪️ OKI</span>
              <span class="px-2.5 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow">🌐 G20</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white mb-1">Eksplorasi Diplomasi Bebas Aktif</h3>
            <p class="text-xs text-emerald-200/80 max-w-md">Klik setiap pin lokasi di peta untuk membuka modal informasi peran Indonesia dan link domain resmi (kemlu.go.id, un.org).</p>
            <div class="mt-4 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-amber-200 border border-white/10">
              Kanvas peta interaktif siap dipasang pada Issue #6
            </div>
          </div>
        </div>
      </div>

      <!-- Report Task Preview -->
      <div class="glass-card p-6 border-l-4 border-primary">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-emerald-100 text-primary font-bold text-sm">Aktivitas 2</span>
            <h2 class="text-lg font-bold text-gray-900">Form Tugas Laporan & Validasi Sumber Resmi</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-09</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Tuliskan 3 peran aktif Indonesia disertai 3 tautan URL sumber resmi terpercaya. Fitur validasi format URL dan deteksi domain resmi otomatis siap aktif pada <strong>Issue #7</strong>.
        </p>
      </div>

      <!-- Navigation Actions -->
      <div class="flex items-center justify-between pt-4">
        <a href="#/modul1" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
          <span>← Kembali ke Modul 1</span>
        </a>
        <a href="#/kuis" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
          <span>Lanjut ke Kuis Evaluasi →</span>
        </a>
      </div>

    </div>
  `;
}
