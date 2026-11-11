/**
 * SiBELA - Halaman Beranda (Modul SPA)
 * Desain Responsif Sempurna:
 * - Desktop View (hidden lg:block): 100% Sesuai Desain Web Asli (Hero + Dual CTA + Ilustrasi ilustration.png + 4 Kartu Sejajar + Stats Progres & Misi Harian + Tahukah Kamu + Footer)
 * - Mobile View (lg:hidden): 100% Sesuai Screenshot Mobile User (Curved Header Kompak + Headline Emas + Single Button + Grid 2x2 Kompak Tanpa Ilustrasi + Progres & Tantangan Mint)
 */

import { getStorage, setStorage, STORAGE_KEYS, getProgressData, calculateProgress, showToast } from '../js/utils.js';
import { updateHeaderUserBadge } from '../js/app.js';
import { quotesBelaNegara, getRandomQuote } from '../data/quotes.js';

let activeQuote = quotesBelaNegara[0];

/**
 * Render HTML Halaman Beranda
 */
export function render() {
  const namaSiswa = getStorage(STORAGE_KEYS.NAMA, null);
  const progressData = getProgressData();
  const progressPercent = calculateProgress();
  const completedCount = Object.values(progressData).filter(Boolean).length;

  return `
    <div class="page-enter flex flex-col w-full">

      <!-- ============================================================== -->
      <!-- A. DESKTOP VIEW (100% SESUAI DESAIN WEB USER)                  -->
      <!-- ============================================================== -->
      <div class="hidden lg:block w-full">
        
        <!-- 1. HERO BANNER (CURVED FOREST GREEN DENGAN ILUSTRASI) -->
        <section class="w-full bg-[#0E4632] text-white rounded-b-[4.5rem] pt-8 pb-16 relative overflow-hidden shadow-sm">
          
          <!-- Ambient Glows -->
          <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#E5A024]/10 blur-3xl pointer-events-none"></div>

          <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="grid grid-cols-12 gap-10 items-center">
              
              <!-- Kolom Kiri: Sapaan, Headline, Subtitle, Dual CTA Buttons -->
              <div class="col-span-7 flex flex-col items-start">
                
                <p class="text-xs sm:text-sm text-emerald-200/90 font-semibold tracking-wide uppercase mb-2" id="beranda-greeting-desktop">
                  ${namaSiswa ? `Assalamu'alaikum, <span class="font-bold text-white">${namaSiswa}</span>!` : `Assalamu'alaikum, Pejuang Muda!`}
                </p>

                <h1 class="text-4xl xl:text-[48px] font-black text-white tracking-tight leading-[1.16] mb-4">
                  Cinta Tanah Air,<br>
                  <span class="text-[#E5A024]">Mulai dari Belajar</span>
                </h1>

                <p class="text-base text-emerald-100/90 leading-relaxed mb-8 max-w-xl">
                  Pahami Sishankamnas &amp; peran Indonesia untuk memperkokoh ketahanan nasional melalui modul pembelajaran interaktif bersama SiBela.
                </p>

                <!-- Dual CTA Buttons Desktop -->
                <div class="flex items-center gap-3.5">
                  <a href="#/modul1" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E5A024] hover:bg-amber-400 text-gray-900 font-extrabold text-sm shadow-md active:scale-95 transition-all">
                    <svg class="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span>Mulai Belajar</span>
                  </a>

                  <a href="#/modul1" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm active:scale-95 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                    <span>Jelajahi Materi</span>
                  </a>
                </div>

              </div>

              <!-- Kolom Kanan: Ilustrasi Siswa Bela Negara -->
              <div class="col-span-5 flex justify-center items-center relative">
                <div class="relative w-full flex items-center justify-center">
                  <img src="assets/images/ilustration.png"
                       alt="Ilustrasi Siswa Bela Negara SiBela"
                       class="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-transform duration-300">
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 2. MENU CARDS (4 HORIZONTAL CARDS DI DESKTOP) -->
        <section class="max-w-6xl mx-auto px-6 -mt-8 relative z-20 w-full">
          <div class="grid grid-cols-4 gap-5">
            
            <!-- Card 1: Materi 1 -->
            <a href="#/modul1" class="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-card hover:-translate-y-1 active:scale-[0.98] transition-all flex flex-col justify-between min-h-[170px]">
              <div>
                <div class="w-10 h-10 rounded-full bg-[#0D5B41] text-white flex items-center justify-center text-sm font-black shadow-xs group-hover:scale-105 transition-transform">
                  ★
                </div>
                <h3 class="text-base font-extrabold text-gray-900 mt-3 group-hover:text-primary transition-colors">
                  Materi 1
                </h3>
                <p class="text-xs text-gray-500 font-medium mt-0.5">
                  Sishankamnas
                </p>
              </div>

              <div class="pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                <span class="font-bold text-gray-700 group-hover:text-primary flex items-center gap-1 transition-colors">
                  <span>Buka Pelajaran</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-bold">
                  Wajib
                </span>
              </div>
            </a>

            <!-- Card 2: Materi 2 -->
            <a href="#/modul2" class="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-card hover:-translate-y-1 active:scale-[0.98] transition-all flex flex-col justify-between min-h-[170px]">
              <div>
                <div class="w-10 h-10 rounded-full bg-[#E5A024] text-white flex items-center justify-center text-sm font-black shadow-xs group-hover:scale-105 transition-transform">
                  ★
                </div>
                <h3 class="text-base font-extrabold text-gray-900 mt-3 group-hover:text-amber-600 transition-colors">
                  Materi 2
                </h3>
                <p class="text-xs text-gray-500 font-medium mt-0.5">
                  Peran Indonesia
                </p>
              </div>

              <div class="pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                <span class="font-bold text-gray-700 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                  <span>Buka Pelajaran</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-[10px] font-bold">
                  Strategis
                </span>
              </div>
            </a>

            <!-- Card 3: Mind Map -->
            <a href="#/mindmap" class="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-card hover:-translate-y-1 active:scale-[0.98] transition-all flex flex-col justify-between min-h-[170px]">
              <div>
                <div class="w-10 h-10 rounded-full bg-[#0B4D36] text-white flex items-center justify-center text-sm font-black shadow-xs group-hover:scale-105 transition-transform">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM9 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 10h6M12 10v4"/></svg>
                </div>
                <h3 class="text-base font-extrabold text-gray-900 mt-3 group-hover:text-primary transition-colors">
                  Mind Map
                </h3>
                <p class="text-xs text-gray-500 font-medium mt-0.5">
                  Susun gagasanmu
                </p>
              </div>

              <div class="pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                <span class="font-bold text-gray-700 group-hover:text-primary flex items-center gap-1 transition-colors">
                  <span>Lihat Diagram</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">
                  Interaktif
                </span>
              </div>
            </a>

            <!-- Card 4: Kuis -->
            <a href="#/kuis" class="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-card hover:-translate-y-1 active:scale-[0.98] transition-all flex flex-col justify-between min-h-[170px]">
              <div>
                <div class="w-10 h-10 rounded-full bg-[#991B1B] text-white flex items-center justify-center text-sm font-black shadow-xs group-hover:scale-105 transition-transform">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                </div>
                <h3 class="text-base font-extrabold text-gray-900 mt-3 group-hover:text-red-700 transition-colors">
                  Kuis
                </h3>
                <p class="text-xs text-gray-500 font-medium mt-0.5">
                  Uji pemahaman
                </p>
              </div>

              <div class="pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                <span class="font-bold text-gray-700 group-hover:text-red-700 flex items-center gap-1 transition-colors">
                  <span>Mulai Kuis</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-red-100/80 text-red-800 text-[10px] font-bold">
                  10 Soal
                </span>
              </div>
            </a>

          </div>
        </section>

        <!-- 3. PROGRES BELAJAR (DI DESKTOP) -->
        <section class="max-w-6xl mx-auto px-6 pt-10 pb-6 w-full">
          <div class="w-full bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/>
                  </svg>
                  <h3 class="text-lg font-black text-gray-900 tracking-tight">Progres belajarmu</h3>
                </div>
                <span class="text-lg font-black text-gray-900">${progressPercent}%</span>
              </div>

              <p class="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                Kamu telah menyelesaikan Bab 1 Konsep Dasar Sishankamnas. Lanjutkan bab berikutnya untuk meraih lencana Bela Negara.
              </p>

              <div class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
                <div class="progress-bar-fill h-full bg-[#0E4632] rounded-full transition-all duration-1000 ease-out" style="width: 0%"></div>
              </div>
            </div>

            <!-- Mini Statistik Box: Modul Selesai -->
            <div class="pt-2 flex">
              <div class="bg-gray-50/90 rounded-2xl p-4 border border-gray-100 min-w-[200px]">
                <span class="text-[11px] font-bold text-gray-400 block mb-0.5">Modul Selesai</span>
                <span class="text-sm sm:text-base font-black text-gray-900">${completedCount} dari 4</span>
              </div>
            </div>

          </div>
        </section>

        <!-- 4. TAHUKAH KAMU BANNER DI DESKTOP -->
        <section class="max-w-6xl mx-auto px-6 pb-16 w-full">
          <div class="bg-[#FFF8E8] border border-amber-200/80 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xs">
            <div class="flex items-center gap-3.5">
              <div class="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold flex-shrink-0">
                💡
              </div>
              <p class="text-xs text-gray-700 leading-relaxed">
                <span class="font-extrabold text-gray-900">Tahukah Kamu?</span> Menurut UU No. 23 Tahun 2019, Bela Negara adalah tekad, sikap, dan perilaku serta tindakan warga negara, baik secara perseorangan maupun bersama-sama dalam menjaga kedaulatan negara.
              </p>
            </div>

            <a href="https://peraturan.bpk.go.id/Details/122770/uu-no-23-tahun-2019" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-extrabold text-gray-900 hover:text-primary whitespace-nowrap transition-colors">
              <span>Baca Selengkapnya</span>
              <span>↗</span>
            </a>
          </div>
        </section>

      </div>

      <!-- ============================================================== -->
      <!-- B. MOBILE VIEW (100% PERSIS SESUAI SCREENSHOT MOBILE USER)     -->
      <!-- ============================================================== -->
      <div class="lg:hidden flex flex-col w-full pb-16">
        
        <!-- 1. CURVED FOREST GREEN HEADER (MOBILE) -->
        <section class="w-full bg-[#0E4632] text-white rounded-b-[2.5rem] pt-6 pb-9 shadow-sm relative overflow-hidden">
          <div class="max-w-md mx-auto px-5 relative z-10">
            
            <!-- Top Bar: Logo & Hamburger -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2.5">
                <img src="assets/images/newlogo.png" alt="Logo SiBela" class="w-8 h-8 object-contain flex-shrink-0">
                <span class="text-lg font-black tracking-wider text-white">SIBELA</span>
              </div>

              <!-- Hamburger Button -->
              <button type="button" onclick="window.openDrawer()" class="p-1.5 -mr-1.5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all" aria-label="Buka Menu">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
              </button>
            </div>

            <!-- Greeting, Headline, Subtitle, CTA -->
            <div>
              <p class="text-xs text-emerald-100/90 font-medium mb-1" id="beranda-greeting">
                ${namaSiswa ? `Assalamu'alaikum, <span class="font-bold text-white">${namaSiswa}</span>!` : `Assalamu'alaikum, Pejuang Muda!`}
              </p>

              <h1 class="text-[26px] font-black text-white tracking-tight leading-[1.2] mb-1.5">
                Cinta Tanah Air,<br>
                <span class="text-[#E5A024]">Mulai dari Belajar</span>
              </h1>

              <p class="text-xs text-emerald-100/80 mb-5 leading-relaxed">
                Pahami Sishankamnas &amp; peran Indonesia
              </p>

              <!-- Dual CTA Buttons Mobile (Konsisten dengan Web) -->
              <div class="flex items-center gap-2.5 flex-wrap">
                <a href="#/modul1" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-gray-900 font-extrabold text-xs shadow-md active:scale-95 transition-all">
                  <svg class="w-3.5 h-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  <span>Mulai Belajar</span>
                </a>

                <a href="#/modul1" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs active:scale-95 transition-all">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                  <span>Jelajahi Materi</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- 2. CARDS SECTION (GRID 2X2 KOMPAK SESUAI SCREENSHOT) -->
        <section class="max-w-md mx-auto px-5 w-full pt-5 space-y-4">
          
          <div class="grid grid-cols-2 gap-3.5">
            
            <!-- Card 1: Materi 1 -->
            <a href="#/modul1" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between min-h-[120px]">
              <div class="w-9 h-9 rounded-full bg-[#0D5B41] text-white flex items-center justify-center text-sm font-black shadow-xs">
                ★
              </div>
              <div class="mt-2.5">
                <h3 class="text-sm font-extrabold text-gray-900 leading-tight">Materi 1</h3>
                <p class="text-[11px] text-gray-500 font-medium mt-0.5">Sishankamnas</p>
              </div>
            </a>

            <!-- Card 2: Materi 2 -->
            <a href="#/modul2" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between min-h-[120px]">
              <div class="w-9 h-9 rounded-full bg-[#E5A024] text-white flex items-center justify-center text-sm font-black shadow-xs">
                ★
              </div>
              <div class="mt-2.5">
                <h3 class="text-sm font-extrabold text-gray-900 leading-tight">Materi 2</h3>
                <p class="text-[11px] text-gray-500 font-medium mt-0.5">Peran Indonesia</p>
              </div>
            </a>

            <!-- Card 3: Mind Map -->
            <a href="#/mindmap" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between min-h-[120px]">
              <div class="w-9 h-9 rounded-full bg-[#0B4D36] text-white flex items-center justify-center text-sm font-black shadow-xs">
                ★
              </div>
              <div class="mt-2.5">
                <h3 class="text-sm font-extrabold text-gray-900 leading-tight">Mind Map</h3>
                <p class="text-[11px] text-gray-500 font-medium mt-0.5">Susun gagasanmu</p>
              </div>
            </a>

            <!-- Card 4: Kuis -->
            <a href="#/kuis" class="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md active:scale-[0.98] transition-all flex flex-col justify-between min-h-[120px]">
              <div class="w-9 h-9 rounded-full bg-[#A82323] text-white flex items-center justify-center text-sm font-black shadow-xs">
                ★
              </div>
              <div class="mt-2.5">
                <h3 class="text-sm font-extrabold text-gray-900 leading-tight">Kuis</h3>
                <p class="text-[11px] text-gray-500 font-medium mt-0.5">Uji pemahaman</p>
              </div>
            </a>

          </div>

          <!-- 3. PROGRES BELAJARMU (MOBILE) -->
          <div class="pt-2">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-extrabold text-gray-800">Progres belajarmu</span>
              <span class="font-black text-[#0D5B41] text-xs">${progressPercent}%</span>
            </div>
            <div class="w-full bg-[#EAE5D9] h-2 rounded-full overflow-hidden">
              <div class="progress-bar-fill h-full bg-[#0D5B41] rounded-full transition-all duration-1000 ease-out" style="width: 0%"></div>
            </div>
          </div>

          <!-- 4. TANTANGAN HARI INI (MOBILE MINT BOX) -->
          <div class="bg-[#D7EBE0] border border-emerald-200/50 rounded-2xl p-3.5 text-xs text-emerald-950 font-medium shadow-xs">
            <span>Tantangan hari ini: kenali 1 ancaman nirmiliter</span>
          </div>

        </section>

      </div>

      <!-- ============================================================== -->
      <!-- C. MODAL INPUT NAMA SISWA (SHARED DESKTOP & MOBILE)           -->
      <!-- ============================================================== -->
      <div id="modal-nama-overlay"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300"
        aria-hidden="true">
        
        <div id="modal-nama-content"
          class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-gray-100 transform scale-95 transition-all duration-300 text-left">
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0E4632] flex items-center justify-center font-black text-lg">
              ★
            </div>
            <button type="button" id="btn-close-modal-nama"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm transition-colors ${namaSiswa ? '' : 'hidden'}"
              aria-label="Tutup Dialog">
              ✕
            </button>
          </div>

          <h3 class="text-lg font-black text-gray-900 tracking-tight">
            ${namaSiswa ? 'Ubah Nama Panggilan' : 'Selamat Datang di SiBELA!'}
          </h3>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">
            Masukkan nama panggilanmu untuk mencatat progres belajar Pendidikan Pancasila.
          </p>

          <form id="form-input-nama" class="mt-4 space-y-3">
            <div>
              <label for="input-nama-panggilan" class="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nama Panggilan
              </label>
              <input type="text"
                id="input-nama-panggilan"
                maxlength="20"
                value="${namaSiswa || ''}"
                placeholder="Contoh: Amin / Fatimah"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm outline-none transition-all font-semibold"
                required>
              <p id="error-nama" class="hidden text-[11px] text-red-500 font-semibold mt-1">
                Nama harus diisi minimal 2 karakter.
              </p>
            </div>

            <button type="submit"
              class="w-full py-2.5 rounded-xl bg-[#0E4632] hover:bg-[#073626] text-white font-bold text-xs shadow-md active:scale-95 transition-all">
              Simpan &amp; Lanjutkan
            </button>
          </form>

        </div>
      </div>

    </div>
  `;
}

/**
 * Inisialisasi event listener halaman Beranda
 */
export function init() {
  const modalOverlay = document.getElementById('modal-nama-overlay');
  const modalContent = document.getElementById('modal-nama-content');
  const btnCloseModal = document.getElementById('btn-close-modal-nama');
  const formNama = document.getElementById('form-input-nama');
  const inputNama = document.getElementById('input-nama-panggilan');
  const errorNama = document.getElementById('error-nama');
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  // Animasi progress bar saat halaman dimuat
  if (progressBars.length) {
    setTimeout(() => {
      const pct = `${calculateProgress()}%`;
      progressBars.forEach(bar => { bar.style.width = pct; });
    }, 120);
  }

  // Modal handlers
  const openModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    modalOverlay.classList.add('opacity-100', 'pointer-events-auto');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
    setTimeout(() => inputNama && inputNama.focus(), 150);
  };

  const closeModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    modalOverlay.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    if (errorNama) errorNama.classList.add('hidden');
  };

  if (typeof window !== 'undefined') {
    window.openModalNama = openModal;
    window.closeModalNama = closeModal;
  }

  // Auto-buka modal jika nama siswa belum tersimpan
  if (!getStorage(STORAGE_KEYS.NAMA, null)) {
    setTimeout(openModal, 350);
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Submit Nama Siswa
  if (formNama) {
    formNama.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (inputNama?.value || '').trim();

      if (!val || val.length < 2) {
        if (errorNama) errorNama.classList.remove('hidden');
        if (inputNama) inputNama.focus();
        return;
      }

      setStorage(STORAGE_KEYS.NAMA, val);
      updateHeaderUserBadge();

      if (btnCloseModal) {
        btnCloseModal.classList.remove('hidden');
      }

      closeModal();
      showToast(`Halo ${val}! Selamat belajar di SiBELA.`, 'success');
    });
  }
}
