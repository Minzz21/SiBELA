/**
 * SiBELA - 404 Not Found Page
 */

export function render(requestedHash = '') {
  return `
    <div class="page-enter max-w-lg mx-auto py-12 text-center">
      <div class="glass-card p-8 border-t-4 border-rose-500 shadow-card">
        <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl">
          🔍
        </div>
        
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
          Error 404 — Halaman Tidak Ditemukan
        </span>

        <h1 class="text-xl sm:text-2xl font-black text-gray-900 mb-2">
          Rute Tidak Dikenali
        </h1>

        <p class="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          Maaf, rute tautan <code class="px-2 py-0.5 rounded bg-gray-100 text-rose-600 font-mono text-xs font-bold">${requestedHash || window.location.hash}</code> tidak terdaftar di sistem media SiBELA.
        </p>

        <a href="#/" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>Kembali ke Halaman Beranda</span>
        </a>
      </div>
    </div>
  `;
}
