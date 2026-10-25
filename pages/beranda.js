/**
 * SiBELA - Halaman Beranda (Modul SPA)
 * Terhubung dengan Issue #3 untuk fitur nama, sapaan dinamis & progress
 */

export function render() {
  return `
    <div class="page-enter">
      <!-- Hero Banner -->
      <section class="mb-8">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-primary to-primary-light text-white p-6 sm:p-10 shadow-floating border border-emerald-800/50">
          <!-- Decorative Background Glow -->
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-accent text-secondary mb-4 shadow-sm">
              <span>🇮🇩</span>
              <span>Kurikulum Berbasis Cinta (KBC) • Model ADDIE</span>
            </div>

            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3">
              Sistem Interaktif <span class="text-accent underline decoration-accent/40 underline-offset-4">Bela Negara</span>
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              Media pembelajaran web interaktif Pendidikan Pancasila bagi siswa Kelas X MA Palattae. Pelajari Sistem Pertahanan & Keamanan Nasional (Sishankamnas), telusuri diplomasi Indonesia di dunia internasional, dan rancang mind map bela negara tanpa login rumit.
            </p>

            <div class="flex flex-wrap items-center gap-3">
              <a href="#/modul1" class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-secondary font-bold text-sm hover:bg-accent-hover shadow-lg hover:shadow-xl active:scale-95 transition-all">
                <span>Mulai Belajar Sekarang</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#/kuis" class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-all">
                <span>Uji Pemahaman (Kuis)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 4 Module Cards Overview Grid -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span>Alur Aktivitas Pembelajaran</span>
            </h2>
            <p class="text-xs sm:text-sm text-gray-600">Selesaikan setiap aktivitas untuk mencapai ketuntasan 3 Tujuan Pembelajaran</p>
          </div>
          <span class="badge-gold">
            <span>4 Modul Inti</span>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <!-- Card Modul 1 -->
          <a href="#/modul1" class="glass-card p-5 group hover:border-primary/50 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <div class="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">TP 10.D.6</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Modul 1: Sishankamnas</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Video edukasi komponen pertahanan (Utama, Cadangan, Pendukung) & formulir analisis studi kasus nirmiliter lokal.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>Buka Modul</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Modul 2 -->
          <a href="#/modul2" class="glass-card p-5 group hover:border-primary/50 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-accent-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">TP 10.D.7</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Modul 2: Peran Indonesia</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Peta geopolitik interaktif (ASEAN, PBB, G20, Misi Garuda) dan tugas validasi sumber resmi tepercaya.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>Buka Modul</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Kuis Evaluasi -->
          <a href="#/kuis" class="glass-card p-5 group hover:border-primary/50 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              </div>
              <div class="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">Evaluasi KKTP ≥ 75</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Kuis Evaluasi</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Bank soal interaktif, countdown timer, penjelasan jawaban instan, dan alur remedial adaptif.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>Mulai Kuis</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Mind Map Digital -->
          <a href="#/mindmap" class="glass-card p-5 group hover:border-primary/50 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-accent-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM9 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 10h6M12 10v4"/></svg>
              </div>
              <div class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">TP 10.D.8</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Mind Map Digital</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Kanvas interaktif penyusunan gagasan, validasi minimal 3 cabang, simpulan UUD 1945 & simpan visual.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>Buka Kanvas</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

        </div>
      </section>

      <!-- Quick Feature Status / System Info -->
      <section class="glass-card p-6 sm:p-8 border-l-4 border-accent">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                ⚡ Navigasi SPA Aktif
              </span>
              <span class="text-xs text-gray-500 font-medium">Beralih antar halaman seketika tanpa reload browser</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Selamat Datang di Portal Pembelajaran SiBELA</h3>
            <p class="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Silakan pilih salah satu modul di atas atau gunakan bilah navigasi untuk berpindah materi secara instan. Seluruh progres belajar kamu tersimpan otomatis di perangkat ini.
            </p>
          </div>
          <div class="flex-shrink-0">
            <a href="#/portal-guru" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-white text-xs font-semibold hover:bg-secondary-light transition-all shadow-sm">
              <span>Portal Guru (PIN 1234)</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}
