/**
 * SiBELA - Halaman Beranda (Modul SPA)
 * Implementasi Penuh Issue #3:
 * - Input Nama Panggilan & Sapaan Motivasi
 * - Progress Bar Dinamis & Checklist Modul
 * - Kartu Alur Pembelajaran dengan Status
 * - Kartu Tantangan Harian & Kutipan Inspiratif Bela Negara
 */

import { getStorage, setStorage, STORAGE_KEYS, getProgressData, calculateProgress, showToast } from '../js/utils.js';
import { updateHeaderUserBadge } from '../js/app.js';
import { quotesBelaNegara, getRandomQuote } from '../data/quotes.js';

let activeQuote = getRandomQuote();

/**
 * Render HTML Halaman Beranda
 */
export function render() {
  const namaSiswa = getStorage(STORAGE_KEYS.NAMA, null);
  const progressData = getProgressData();
  const progressPercent = calculateProgress();
  const completedCount = Object.values(progressData).filter(Boolean).length;

  return `
    <div class="page-enter space-y-8">
      
      <!-- ================= HERO BANNER & SAPAAN MOTIVASI ================= -->
      <section>
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-primary to-primary-light text-white p-6 sm:p-10 shadow-floating border border-emerald-800/50">
          <!-- Background Glow Elements -->
          <div class="absolute -right-12 -top-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="relative z-10 max-w-3xl">
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-accent text-secondary shadow-sm">
                <span>🇮🇩</span>
                <span>Pendidikan Pancasila Kelas X</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-100 border border-white/20">
                <span>Model ADDIE • MA Palattae</span>
              </span>
            </div>

            <!-- Greeting Text -->
            <div class="mb-4">
              <div class="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white" id="beranda-greeting">
                  ${namaSiswa 
                    ? `Halo, <span class="text-accent underline decoration-accent/40 underline-offset-4">${namaSiswa}</span>! Siap Belajar Hari Ini? 🇮🇩` 
                    : `Sistem Interaktif <span class="text-accent underline decoration-accent/40 underline-offset-4">Bela Negara</span>`}
                </h1>
              </div>

              <!-- Button Ganti Nama -->
              <div class="flex items-center gap-3 mt-1">
                <button type="button" id="btn-open-modal-nama" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 hover:bg-white/25 text-emerald-100 hover:text-white border border-white/20 transition-all cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  <span>${namaSiswa ? 'Ubah Nama Panggilan' : 'Masukkan Nama Panggilan'}</span>
                </button>
                <span class="text-xs text-emerald-200/80">• Tersimpan otomatis di perangkat</span>
              </div>
            </div>

            <p class="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              Media pembelajaran terpadu untuk mengeksplorasi Sistem Pertahanan dan Keamanan Nasional (Sishankamnas), diplomasi aktif Indonesia di forum internasional, serta pembuatan mind map bela negara.
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

      <!-- ================= PROGRESS BELAJAR DINAMIS ================= -->
      <section class="glass-card p-6 sm:p-7 border-l-4 border-primary">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="badge-gold">
                <span>Indikator Kemajuan Belajar</span>
              </span>
              <span class="text-xs font-semibold text-gray-500">${completedCount} dari 4 Aktivitas Selesai</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900">Progres Capaian Pembelajaran</h2>
          </div>

          <!-- Progress Percentage Counter -->
          <div class="flex items-baseline gap-1 self-start md:self-auto">
            <span class="text-3xl font-black text-primary" id="beranda-progress-number">${progressPercent}%</span>
            <span class="text-xs font-bold text-gray-500 uppercase">Tuntas</span>
          </div>
        </div>

        <!-- Progress Bar Fill -->
        <div class="w-full bg-gray-200/80 h-3 rounded-full overflow-hidden p-0.5 border border-gray-300/60 shadow-inner mb-4">
          <div id="beranda-progress-bar" class="h-full bg-gradient-to-r from-primary via-emerald-500 to-accent rounded-full transition-all duration-700 ease-out" style="width: 0%"></div>
        </div>

        <!-- Mini Stepper Checklist -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-100 text-xs">
          <div class="flex items-center gap-2 p-2 rounded-lg ${progressData.modul1 ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'}">
            <span>${progressData.modul1 ? '✅' : '⚪'}</span>
            <span class="font-semibold truncate">Modul 1: Sishankamnas</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded-lg ${progressData.modul2 ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'}">
            <span>${progressData.modul2 ? '✅' : '⚪'}</span>
            <span class="font-semibold truncate">Modul 2: Peran Dunia</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded-lg ${progressData.kuis ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'}">
            <span>${progressData.kuis ? '✅' : '⚪'}</span>
            <span class="font-semibold truncate">Kuis Evaluasi (KKTP)</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded-lg ${progressData.mindmap ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-500'}">
            <span>${progressData.mindmap ? '✅' : '⚪'}</span>
            <span class="font-semibold truncate">Mind Map & Simpulan</span>
          </div>
        </div>
      </section>

      <!-- ================= KARTU TANTANGAN HARIAN & MOTIVASI ================= -->
      <section class="glass-card p-6 sm:p-7 border-l-4 border-accent relative overflow-hidden">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <span>🌟</span>
                <span>Tantangan & Motivasi Harian Bela Negara</span>
              </span>
              <span class="text-xs text-gray-500 font-medium">Kurikulum Berbasis Cinta</span>
            </div>

            <blockquote class="text-base sm:text-lg font-bold text-gray-900 italic leading-snug pt-1" id="quote-text">
              "${activeQuote.teks}"
            </blockquote>

            <p class="text-xs font-semibold text-primary" id="quote-tokoh">
              — ${activeQuote.tokoh}
            </p>

            <!-- Daily Action Challenge -->
            <div class="mt-4 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
              <span class="text-xl">🎯</span>
              <div class="text-xs">
                <span class="font-bold text-amber-950 block mb-0.5">Tantangan Aksi Hari Ini:</span>
                <span class="text-amber-900 font-medium leading-relaxed" id="quote-tantangan">${activeQuote.tantangan}</span>
              </div>
            </div>
          </div>

          <!-- Shuffle Button -->
          <button type="button" id="btn-shuffle-quote" class="p-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-600 hover:text-primary border border-gray-200 shadow-sm transition-all hover:rotate-180 flex-shrink-0 cursor-pointer" title="Ganti Kutipan Motivasi">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>
        </div>
      </section>

      <!-- ================= 4 KARTU MODUL PEMBELAJARAN ================= -->
      <section>
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span>Alur Modul Pembelajaran</span>
            </h2>
            <p class="text-xs sm:text-sm text-gray-600">Pilih modul di bawah untuk mulai menjelajah atau melanjutkan materi</p>
          </div>
          <span class="badge-gold">
            <span>4 Modul Utama</span>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <!-- Card Modul 1 -->
          <a href="#/modul1" class="glass-card p-5 group hover:border-primary/60 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                ${progressData.modul1 
                  ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ Selesai</span>` 
                  : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">🔓 Siap</span>`}
              </div>
              <div class="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">TP 10.D.6</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Modul 1: Sishankamnas</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Video komponen pertahanan (Utama, Cadangan, Pendukung) & formulir analisis studi kasus nirmiliter lokal.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>${progressData.modul1 ? 'Tinjau Ulang' : 'Buka Modul'}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Modul 2 -->
          <a href="#/modul2" class="glass-card p-5 group hover:border-primary/60 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-accent-hover flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                ${progressData.modul2 
                  ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ Selesai</span>` 
                  : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">🔓 Siap</span>`}
              </div>
              <div class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">TP 10.D.7</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Modul 2: Peran Indonesia</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Peta geopolitik interaktif (ASEAN, PBB, G20, Misi Garuda) dan tugas laporan validasi domain resmi.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>${progressData.modul2 ? 'Tinjau Ulang' : 'Buka Modul'}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Kuis Evaluasi -->
          <a href="#/kuis" class="glass-card p-5 group hover:border-primary/60 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                ${progressData.kuis 
                  ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ Selesai</span>` 
                  : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">🔓 Siap</span>`}
              </div>
              <div class="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">Evaluasi KKTP ≥ 75</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Kuis Evaluasi</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Bank soal interaktif, timer per nomor, instant feedback penjelasan kunci jawaban, dan skor KKTP.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>${progressData.kuis ? 'Coba Lagi / Tinjau' : 'Mulai Kuis'}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          <!-- Card Mind Map Digital -->
          <a href="#/mindmap" class="glass-card p-5 group hover:border-primary/60 hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-accent-hover flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM9 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 10h6M12 10v4"/></svg>
                </div>
                ${progressData.mindmap 
                  ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ Selesai</span>` 
                  : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">🔓 Siap</span>`}
              </div>
              <div class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">TP 10.D.8</div>
              <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Mind Map Digital</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-4">Kanvas interaktif penyusunan gagasan, validasi minimal 3 cabang, simpulan UUD 1945 & simpan visual.</p>
            </div>
            <div class="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-gray-100">
              <span>${progressData.mindmap ? 'Buka Kembali' : 'Buka Kanvas'}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

        </div>
      </section>

      <!-- ================= MODAL OVERLAY INPUT NAMA SISWA ================= -->
      <div id="modal-nama-overlay" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 pointer-events-none">
        <div id="modal-nama-card" class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-floating border border-white/80 transform transition-all duration-300 scale-95">
          
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-light to-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md border-2 border-accent/40 text-2xl">
            🇮🇩
          </div>

          <div class="text-center mb-6">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent-hover mb-2">
              Selamat Datang di SiBELA
            </span>
            <h3 class="text-xl sm:text-2xl font-black text-gray-900">
              Siapa Nama Panggilanmu?
            </h3>
            <p class="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Yuk masukkan nama panggilanmu untuk menyimpan hasil belajar dan mendapatkan sapaan personal.
            </p>
          </div>

          <form id="form-input-nama" class="space-y-4">
            <div>
              <label for="input-nama-panggilan" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nama Panggilan
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="input-nama-panggilan" 
                  placeholder="Contoh: Amin / Fatimah / Rian" 
                  maxlength="30"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-normal"
                  autocomplete="off"
                  value="${namaSiswa || ''}"
                >
                <div class="absolute right-3.5 top-3.5 text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
              </div>
              <p id="error-nama" class="hidden text-rose-600 text-xs mt-1.5 font-medium">
                Nama panggilan minimal 2 huruf ya!
              </p>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button 
                type="button" 
                id="btn-close-modal-nama" 
                class="${namaSiswa ? 'inline-flex' : 'hidden'} flex-1 items-center justify-center px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="submit" 
                class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Simpan & Mulai</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  `;
}

/**
 * Inisialisasi Event Listener & Interaksi Halaman Beranda
 */
export function init() {
  const modalOverlay = document.getElementById('modal-nama-overlay');
  const modalContent = document.getElementById('modal-nama-card');
  const btnOpenModal = document.getElementById('btn-open-modal-nama');
  const btnCloseModal = document.getElementById('btn-close-modal-nama');
  const formNama = document.getElementById('form-input-nama');
  const inputNama = document.getElementById('input-nama-panggilan');
  const errorNama = document.getElementById('error-nama');
  const btnShuffleQuote = document.getElementById('btn-shuffle-quote');
  const progressBarEl = document.getElementById('beranda-progress-bar');

  // Animasi progress bar saat halaman selesai di-mount
  if (progressBarEl) {
    const targetProgress = calculateProgress();
    setTimeout(() => {
      progressBarEl.style.width = `${targetProgress}%`;
    }, 100);
  }

  // Fungsi buka modal nama
  const openModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    modalOverlay.classList.add('opacity-100', 'pointer-events-auto');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
    setTimeout(() => inputNama && inputNama.focus(), 150);
  };

  // Fungsi tutup modal nama
  const closeModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    modalOverlay.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    if (errorNama) errorNama.classList.add('hidden');
  };

  // Jika nama siswa belum pernah diisi, otomatis munculkan modal
  const existingNama = getStorage(STORAGE_KEYS.NAMA, null);
  if (!existingNama) {
    setTimeout(openModal, 300);
  }

  // Event buka modal dari tombol Beranda
  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', openModal);
  }

  // Event tutup modal batal
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
  }

  // Submit nama
  if (formNama) {
    formNama.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (inputNama?.value || '').trim();
      
      if (!val || val.length < 2) {
        if (errorNama) errorNama.classList.remove('hidden');
        if (inputNama) inputNama.focus();
        return;
      }

      // Simpan nama ke localStorage
      setStorage(STORAGE_KEYS.NAMA, val);

      // Update badge header
      updateHeaderUserBadge();

      // Update sapaan di Beranda secara langsung
      const greetingEl = document.getElementById('beranda-greeting');
      if (greetingEl) {
        greetingEl.innerHTML = `Halo, <span class="text-accent underline decoration-accent/40 underline-offset-4">${val}</span>! Siap Belajar Hari Ini? 🇮🇩`;
      }

      if (btnOpenModal) {
        const spanText = btnOpenModal.querySelector('span');
        if (spanText) spanText.textContent = 'Ubah Nama Panggilan';
      }

      if (btnCloseModal) {
        btnCloseModal.classList.remove('hidden');
        btnCloseModal.classList.add('inline-flex');
      }

      closeModal();
      showToast(`Halo ${val}! Selamat datang di SiBELA 🇮🇩`, 'success');
    });
  }

  // Shuffle Quote Motivasi
  if (btnShuffleQuote) {
    btnShuffleQuote.addEventListener('click', () => {
      activeQuote = getRandomQuote();
      const quoteTextEl = document.getElementById('quote-text');
      const quoteTokohEl = document.getElementById('quote-tokoh');
      const quoteTantanganEl = document.getElementById('quote-tantangan');

      if (quoteTextEl) quoteTextEl.textContent = `"${activeQuote.teks}"`;
      if (quoteTokohEl) quoteTokohEl.textContent = `— ${activeQuote.tokoh}`;
      if (quoteTantanganEl) quoteTantanganEl.textContent = activeQuote.tantangan;

      showToast('Kutipan motivasi diperbarui ✨', 'info');
    });
  }
}
