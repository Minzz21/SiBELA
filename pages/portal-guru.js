/**
 * SiBELA - Halaman Portal Guru
 * Shell view untuk Issue #2 & fondasi untuk Issue #10 & #11
 */

export function render() {
  return `
    <div class="page-enter max-w-4xl mx-auto space-y-6">
      
      <!-- Breadcrumb & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-secondary mb-1">
            <a href="#/" class="hover:underline text-primary">Beranda</a>
            <span>/</span>
            <span>Akses Pendidik</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span class="p-2 rounded-xl bg-secondary text-white text-lg">👨‍🏫</span>
            <span>Portal Guru Pendidikan Pancasila</span>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">MA Palattae • Monitoring Pembelajaran & Rubrik Penilaian Lisan</p>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20 self-start sm:self-center">
          <svg class="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span>Khusus Pendidik</span>
        </span>
      </div>

      <!-- PIN Auth Card Preview -->
      <div class="glass-card p-6 sm:p-8 max-w-lg mx-auto text-center border-t-4 border-secondary shadow-card">
        <div class="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">Verifikasi Akses Guru</h2>
        <p class="text-xs text-gray-600 mb-6">Masukkan PIN 4 digit untuk membuka Modul Ajar, Rubrik Penilaian, dan Rekap Nilai Siswa.</p>

        <!-- Dummy PIN Input Boxes -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <input type="password" maxlength="1" value="1" readonly class="w-12 h-14 text-center text-xl font-black rounded-xl bg-gray-50 border-2 border-emerald-700/40 focus:outline-none">
          <input type="password" maxlength="1" value="2" readonly class="w-12 h-14 text-center text-xl font-black rounded-xl bg-gray-50 border-2 border-emerald-700/40 focus:outline-none">
          <input type="password" maxlength="1" value="3" readonly class="w-12 h-14 text-center text-xl font-black rounded-xl bg-gray-50 border-2 border-emerald-700/40 focus:outline-none">
          <input type="password" maxlength="1" value="4" readonly class="w-12 h-14 text-center text-xl font-black rounded-xl bg-gray-50 border-2 border-emerald-700/40 focus:outline-none">
        </div>

        <div class="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-4">
          💡 PIN Default: <code class="font-mono bg-white px-1.5 py-0.5 rounded text-emerald-900 font-bold">1234</code>
        </div>

        <p class="text-[11px] text-gray-500">
          Autentikasi interaktif & embed iframe Google Sheets akan diimplementasikan penuh pada <strong>Issue #10</strong>.
        </p>
      </div>

      <!-- Navigation Actions -->
      <div class="text-center pt-2">
        <a href="#/" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
          <span>← Kembali ke Halaman Siswa (Beranda)</span>
        </a>
      </div>

    </div>
  `;
}
