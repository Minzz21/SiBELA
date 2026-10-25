/**
 * SiBELA - Modul Mind Map Digital & Presentasi (TP 10.D.8)
 * Shell view untuk Issue #2 & fondasi untuk Issue #9
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
            <span>Aktivitas Kolaboratif</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span class="p-2 rounded-xl bg-accent text-secondary font-bold text-lg">🧠</span>
            <span>Mind Map Digital & Simpulan Presentasi</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">Tujuan Pembelajaran: TP 10.D.8 — Merumuskan Peta Konsep Gagasan & Simpulan Berbasis UUD 1945</p>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-center">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Tahap 4 dari 4</span>
        </span>
      </div>

      <!-- Canvas Teaser Card -->
      <div class="glass-card p-6 border-l-4 border-accent">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-amber-100 text-amber-900 font-bold text-sm">Kanvas Kerja</span>
            <h2 class="text-lg font-bold text-gray-900">Peran Indonesia di Dunia</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-13, FR-14, FR-15</span>
        </div>

        <div class="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-emerald-950 via-primary-dark to-secondary p-6 border-2 border-emerald-800/60 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-card">
          <!-- Central Node Illustration -->
          <div class="p-4 rounded-2xl bg-white text-secondary shadow-floating border-2 border-accent font-black text-sm sm:text-base flex items-center gap-2 mb-6">
            <span>🇮🇩</span>
            <span>Peran Indonesia di Dunia</span>
          </div>

          <!-- Branch preview cards -->
          <div class="flex flex-wrap items-center justify-center gap-3 max-w-xl text-center">
            <span class="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-medium">✨ Pendiri ASEAN</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-medium">🕊️ Pasukan Garuda PBB</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-medium">🤝 Presidensi G20</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-medium">⚖️ Politik Luar Negeri Bebas Aktif</span>
          </div>

          <div class="mt-6 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold">
            Kanvas drag-and-drop & validasi min. 3 cabang aktif pada <strong>Issue #9</strong>
          </div>
        </div>
      </div>

      <!-- Simpulan & Presentasi Preview -->
      <div class="glass-card p-6 border-l-4 border-primary">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2.5">
            <span class="p-2 rounded-lg bg-emerald-100 text-primary font-bold text-sm">Presentasi</span>
            <h2 class="text-lg font-bold text-gray-900">Form Simpulan Berbasis UUD 1945</h2>
          </div>
          <span class="text-xs font-semibold text-gray-500">FR-16</span>
        </div>
        <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Setelah menyusun cabang gagasan, rumuskan simpulan argumentatif mengenai peran bela negara diplomasi Indonesia dengan rujukan Pembukaan UUD 1945 Alinea ke-4 sebagai bekal presentasi lisan di depan kelas.
        </p>
      </div>

      <!-- Navigation Actions -->
      <div class="flex items-center justify-between pt-4">
        <a href="#/kuis" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
          <span>← Kembali ke Kuis</span>
        </a>
        <a href="#/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
          <span>Selesai & Ke Beranda →</span>
        </a>
      </div>

    </div>
  `;
}
