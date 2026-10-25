/**
 * SiBELA - Modul Kuis Evaluasi
 * Shell view untuk Issue #2 & fondasi untuk Issue #8
 */

export function render() {
  return `
    <div class="page-enter max-w-4xl mx-auto space-y-6">
      
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <a href="#/" class="hover:underline">Beranda</a>
            <span>/</span>
            <span>Evaluasi Pembelajaran</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span class="p-2 rounded-xl bg-primary text-white text-lg">📝</span>
            <span>Kuis Evaluasi Bela Negara</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">Standar Ketuntasan Minimal: KKTP ≥ 75 | Waktu Berjalan per Nomor</p>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-center">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Tahap 3 dari 4</span>
        </span>
      </div>

      <!-- Kuis Intro Card -->
      <div class="glass-card p-6 sm:p-8 border-l-4 border-primary">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent-hover mb-3">
            <span>🎯</span>
            <span>Uji Pemahaman Materi Modul 1 & 2</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Petunjuk Pengerjaan Kuis</h2>
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            Kuis ini dirancang untuk menguji penguasaanmu terhadap Sistem Pertahanan dan Keamanan Nasional serta peran diplomasi Indonesia di dunia internasional.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
              <div class="text-2xl mb-1">⏱️</div>
              <div class="text-xs font-bold text-gray-900">30 Detik / Soal</div>
              <div class="text-[11px] text-gray-500">Countdown timer per nomor</div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
              <div class="text-2xl mb-1">💡</div>
              <div class="text-xs font-bold text-gray-900">Instant Feedback</div>
              <div class="text-[11px] text-gray-500">Penjelasan kunci jawaban langsung</div>
            </div>
            <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm">
              <div class="text-2xl mb-1">🏆</div>
              <div class="text-xs font-bold text-gray-900">KKTP ≥ 75</div>
              <div class="text-[11px] text-gray-500">Kriteria Ketercapaian Pembelajaran</div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button type="button" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-secondary font-bold text-sm hover:bg-accent-hover shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
              <span>Mulai Pengerjaan Kuis</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <span class="text-xs text-gray-500">Mesin interaktif kuis lengkap aktif pada <strong>Issue #8</strong></span>
          </div>
        </div>
      </div>

      <!-- Navigation Actions -->
      <div class="flex items-center justify-between pt-4">
        <a href="#/modul2" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
          <span>← Kembali ke Modul 2</span>
        </a>
        <a href="#/mindmap" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
          <span>Lanjut ke Mind Map Digital →</span>
        </a>
      </div>

    </div>
  `;
}
