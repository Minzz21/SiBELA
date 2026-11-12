/**
 * SiBELA - Halaman Portal Guru (Issue #10 & #11)
 * Otentikasi PIN 4-Digit, Dashboard Pendidik, Rubrik Penilaian & Rekap Nilai Siswa
 * Madrasah Aliyah Palattae • Pendidikan Pancasila Kelas X
 */

import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  showToast
} from '../js/utils.js';

import {
  ALUR_TUJUAN_PEMBELAJARAN,
  RUBRIK_PRESENTASI_LISAN,
  RUBRIK_MIND_MAP,
  SINTAKS_PEMBELAJARAN
} from '../data/rubrik.js';

// Kunci penyimpanan khusus Portal Guru
const GURU_PIN_CORRECT = '1234';
const STORAGE_KEY_SHEETS_URL = 'sibela_guru_sheets_url';
const DEFAULT_SHEETS_URL = '';

/**
 * Normalisasi URL Google Sheets agar selalu berformat embed (pubhtml)
 */
function formatGoogleSheetsEmbedUrl(rawUrl) {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    if (trimmed.includes('/pubhtml')) {
      return trimmed;
    }
    return `https://docs.google.com/spreadsheets/d/${sheetId}/pubhtml?widget=true&headers=false`;
  }
  return trimmed;
}

// State modul lokal
let activeTab = 'panduan'; // 'panduan' | 'modul' | 'rekap'
let failedPinAttempts = 0;
let lockUntilTimestamp = 0;
let lockCountdownInterval = null;

/**
 * Cek apakah guru sudah terotentikasi di sesi browser saat ini
 */
function isGuruAuthenticated() {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.GURU_AUTH) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Render HTML Halaman Portal Guru
 */
export function render() {
  const isAuth = isGuruAuthenticated();

  return `
    <div class="page-enter flex flex-col w-full pb-24 sm:pb-16">
      
      <!-- ================= UNIFIED CURVED HEADER (CONSISTENT DESIGN) ================= -->
      <header class="bg-[#0E4632] text-white rounded-b-[2rem] sm:rounded-b-[3rem] px-4 sm:px-8 pt-4 sm:pt-7 pb-5 sm:pb-8 shadow-md relative overflow-hidden -mx-4 sm:-mx-6 mb-5 sm:mb-8 no-print">
        
        <!-- Ambient Glows -->
        <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#E5A024]/10 blur-3xl pointer-events-none"></div>

        <div class="max-w-6xl mx-auto relative z-10">
          
          <!-- Top Row: Back Link & Status Badge -->
          <div class="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
            <a href="#/" class="inline-flex items-center gap-1 text-emerald-200 hover:text-white text-xs font-bold transition-colors py-1 flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              <span class="hidden sm:inline">Mode Siswa (Beranda)</span>
              <span class="sm:hidden">Mode Siswa</span>
            </a>

            <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-extrabold whitespace-nowrap ${isAuth ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' : 'bg-[#E5A024]/20 text-[#E5A024] border border-[#E5A024]/30'}">
                <span class="w-2 h-2 rounded-full ${isAuth ? 'bg-emerald-400 animate-pulse' : 'bg-[#E5A024]'}"></span>
                <span class="hidden sm:inline">${isAuth ? 'Pendidik Terverifikasi' : 'Area Terbatas'}</span>
                <span class="sm:hidden">${isAuth ? 'Pendidik' : 'Terbatas'}</span>
              </span>

              ${isAuth ? `
                <button
                  type="button"
                  id="btn-logout-guru"
                  class="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 hover:bg-red-600/80 hover:text-white text-emerald-100 transition-all cursor-pointer whitespace-nowrap"
                  title="Keluar dari Portal Guru"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                  </svg>
                  <span>Keluar</span>
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Headline & Title -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded-full bg-[#E5A024] text-gray-900 text-[10px] font-black uppercase tracking-wider">
                  Panel Pendidik
                </span>
                <span class="text-[11px] sm:text-xs text-emerald-200/90 font-medium truncate">MA Palattae • Fase E (Kelas X)</span>
              </div>
              <h1 class="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                Portal Guru Pendidikan Pancasila
              </h1>
              <p class="text-xs text-emerald-100/80 mt-1 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                Pusat instrumen asesmen, sintaks modul ajar kurikulum merdeka, rubrik evaluasi lisan, dan pemantauan capaian belajar siswa secara real-time.
              </p>
            </div>
          </div>

          ${isAuth ? `
            <!-- Sub-tab Pills (Dashboard Menu: 3-Grid Compact di Mobile, Flex di Desktop) -->
            <div class="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-2 mt-4 sm:mt-6">
              <button
                type="button"
                data-tab="panduan"
                class="tab-btn-guru flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer text-center ${activeTab === 'panduan' ? 'bg-[#E5A024] text-gray-900 shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'}"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                </svg>
                <span class="sm:hidden">Petunjuk</span>
                <span class="hidden sm:inline">Petunjuk Pembelajaran</span>
              </button>

              <button
                type="button"
                data-tab="modul"
                class="tab-btn-guru flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer text-center ${activeTab === 'modul' ? 'bg-[#E5A024] text-gray-900 shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'}"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-11.25 0h11.25"/>
                </svg>
                <span class="sm:hidden">Rubrik</span>
                <span class="hidden sm:inline">Modul Ajar &amp; Rubrik</span>
              </button>

              <button
                type="button"
                data-tab="rekap"
                class="tab-btn-guru flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs font-bold transition-all cursor-pointer text-center ${activeTab === 'rekap' ? 'bg-[#E5A024] text-gray-900 shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'}"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
                </svg>
                <span class="sm:hidden">Rekap</span>
                <span class="hidden sm:inline">Rekap Nilai Siswa</span>
              </button>
            </div>
          ` : ''}

        </div>
      </header>

      <!-- ================= MAIN CONTENT CONTAINER ================= -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        ${isAuth ? renderDashboardContent() : renderPinAuthCard()}
      </div>

    </div>
  `;
}

/**
 * Render Kartu Verifikasi PIN (Saat Guru Belum Login)
 */
function renderPinAuthCard() {
  return `
    <div class="max-w-md mx-auto my-6 sm:my-10">
      
      <div id="pin-card-container" class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-center transition-all">
        
        <!-- Icon Gembok Emas -->
        <div class="w-16 h-16 rounded-2xl bg-amber-50 text-[#E5A024] border border-amber-200/80 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
          </svg>
        </div>

        <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1.5">
          Verifikasi Akses Pendidik
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
          Masukkan 4 digit PIN keamanan guru untuk membuka instrumen modul ajar, rubrik penilaian, dan rekapitulasi data belajar siswa.
        </p>

        <!-- Form 4-Digit PIN Boxes -->
        <form id="form-pin-guru" class="space-y-5" onsubmit="return false;">
          
          <div class="flex items-center justify-center gap-3 sm:gap-4" id="pin-inputs-wrapper">
            <input
              type="password"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="0"
              class="pin-box w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#E5A024] focus:bg-white focus:ring-4 focus:ring-amber-400/20 outline-none transition-all"
              autocomplete="off"
              autofocus
            />
            <input
              type="password"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="1"
              class="pin-box w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#E5A024] focus:bg-white focus:ring-4 focus:ring-amber-400/20 outline-none transition-all"
              autocomplete="off"
            />
            <input
              type="password"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="2"
              class="pin-box w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#E5A024] focus:bg-white focus:ring-4 focus:ring-amber-400/20 outline-none transition-all"
              autocomplete="off"
            />
            <input
              type="password"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              data-index="3"
              class="pin-box w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#E5A024] focus:bg-white focus:ring-4 focus:ring-amber-400/20 outline-none transition-all"
              autocomplete="off"
            />
          </div>

          <!-- Error Alert Banner -->
          <div id="pin-error-banner" class="hidden p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-center gap-2">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
            </svg>
            <span id="pin-error-text">PIN salah. Silakan coba lagi.</span>
          </div>

          <!-- Lockout Alert Banner -->
          <div id="pin-lockout-banner" class="hidden p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold leading-relaxed">
            Terlalu banyak percobaan gagal. Silakan tunggu <span id="pin-lockout-timer" class="font-black text-red-700">30</span> detik sebelum mencoba kembali.
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            id="btn-submit-pin"
            class="w-full py-3.5 rounded-2xl bg-[#0E4632] hover:bg-[#12573e] active:scale-[0.98] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Buka Dashboard Guru</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </button>

        </form>

        <!-- Default PIN Helper Pill -->
        <div class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span class="font-medium">PIN Guru Pengujian:</span>
          <code class="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#0E4632] border border-emerald-200/80 font-mono font-black text-xs tracking-widest">
            1234
          </code>
        </div>

      </div>

      <!-- Kembali ke Beranda -->
      <div class="text-center mt-5">
        <a href="#/" class="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
          <span>Kembali ke Halaman Siswa</span>
        </a>
      </div>

    </div>
  `;
}

/**
 * Render Konten Dashboard Guru Sesuai Tab Aktif
 */
function renderDashboardContent() {
  if (activeTab === 'panduan') {
    return renderTabPanduan();
  } else if (activeTab === 'modul') {
    return renderTabModulAjar();
  } else {
    return renderTabRekapNilai();
  }
}

/**
 * =========================================================================
 * TAB 1: PETUNJUK PENGGUNAAN (PANDUAN SINTAKS BELAJAR KURIKULUM MERDEKA)
 * =========================================================================
 */
function renderTabPanduan() {
  return `
    <div class="space-y-5 sm:space-y-6">
      
      <!-- Banner Sambutan Guru -->
      <div class="bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
        <div class="space-y-1.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4632] text-white text-[11px] font-bold">
            <span>Panduan Pendidik Kurikulum Merdeka</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Sintaks Pembelajaran SiBELA di Kelas
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
            Panduan penerapan media pembelajaran interaktif SiBELA menggunakan pendekatan <em>Problem-Based Learning</em> dan pembelajaran berdiferensiasi untuk mencapai TP 10.D.6, 10.D.7, dan 10.D.8.
          </p>
        </div>

        <div class="flex items-center gap-2 self-start md:self-center">
          <button
            type="button"
            onclick="window.print()"
            class="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-extrabold shadow-xs transition-all cursor-pointer"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24-1.076-.64-2.128-1.18-3.13m0 0A9.014 9.014 0 0 1 12 3c3.48 0 6.51 1.98 8.01 4.88m-9.19 5.949c.5.21 1.03.37 1.58.47m0 0A9.014 9.014 0 0 0 21 12c0-1.89-.58-3.64-1.58-5.07m-9.19 5.949a8.97 8.97 0 0 1-3.51-1.32"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-8.25A3.375 3.375 0 0 0 4.5 11.625v2.625m15 0v5.625A2.25 2.25 0 0 1 17.25 22.125h-10.5A2.25 2.25 0 0 1 4.5 19.875V14.25m15 0H4.5"/>
            </svg>
            <span>Cetak Panduan</span>
          </button>
        </div>
      </div>

      <!-- 4 Langkah Sintaks Pembelajaran -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
        ${SINTAKS_PEMBELAJARAN.map((s, idx) => `
          <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-card transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2.5 sm:mb-3">
                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 text-[#0E4632] border border-emerald-200 text-xs font-black">
                  ${s.pertemuan}
                </span>
                <span class="text-xs font-bold text-gray-400">Tahap ${idx + 1} dari 4</span>
              </div>
              <h3 class="text-sm sm:text-base font-black text-gray-900 tracking-tight mb-2.5 sm:mb-3">
                ${s.fase}
              </h3>
              <ul class="space-y-2 text-xs text-gray-600 leading-relaxed">
                ${s.aktivitas.map(a => `
                  <li class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#E5A024] mt-1.5 flex-shrink-0"></span>
                    <span>${a}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            
            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
              <span>Alokasi: 2 x 45 Menit</span>
              <span class="text-emerald-700 font-bold">Kurikulum Merdeka</span>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

/**
 * =========================================================================
 * TAB 2: MODUL AJAR & RUBRIK PENILAIAN LISAN / MIND MAP
 * =========================================================================
 */
function renderTabModulAjar() {
  return `
    <div class="space-y-6 sm:space-y-8">
      
      <!-- Header Aksi Cetak & Unduh -->
      <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0E4632] text-[10px] font-black uppercase">
              Instrumen Asesmen
            </span>
            <span class="text-xs text-gray-500 font-medium">Kurikulum Merdeka 2026/2027</span>
          </div>
          <h2 class="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
            Alur Tujuan Pembelajaran &amp; Rubrik Penilaian
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            Gunakan rubrik berikut untuk menilai asesmen formatif (presentasi studi kasus) dan asesmen produk (mind map).
          </p>
        </div>

        <div class="flex items-center gap-2.5 self-start sm:self-center">
          <button
            type="button"
            onclick="window.print()"
            class="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0E4632] hover:bg-[#12573e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <svg class="w-4 h-4 text-[#E5A024]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24-1.076-.64-2.128-1.18-3.13m0 0A9.014 9.014 0 0 1 12 3c3.48 0 6.51 1.98 8.01 4.88m-9.19 5.949c.5.21 1.03.37 1.58.47m0 0A9.014 9.014 0 0 0 21 12c0-1.89-.58-3.64-1.58-5.07m-9.19 5.949a8.97 8.97 0 0 1-3.51-1.32"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-8.25A3.375 3.375 0 0 0 4.5 11.625v2.625m15 0v5.625A2.25 2.25 0 0 1 17.25 22.125h-10.5A2.25 2.25 0 0 1 4.5 19.875V14.25m15 0H4.5"/>
            </svg>
            <span>Cetak Rubrik (PDF)</span>
          </button>
        </div>
      </div>

      <!-- SEKSI 1: ALUR TUJUAN PEMBELAJARAN (ATP) -->
      <div class="space-y-3.5 sm:space-y-4">
        <div class="flex items-center gap-2 border-b border-gray-200/80 pb-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#E5A024]"></span>
          <h3 class="text-sm sm:text-lg font-black text-gray-900 tracking-tight">
            1. Alur Capaian &amp; Tujuan Pembelajaran (ATP)
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          ${ALUR_TUJUAN_PEMBELAJARAN.map(tp => `
            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span class="px-2.5 py-0.5 rounded-md bg-[#0E4632] text-white text-[11px] font-black tracking-wider">
                    ${tp.kode}
                  </span>
                  <span class="text-[11px] font-bold text-gray-400">${tp.alokasiWaktu}</span>
                </div>
                <h4 class="text-xs sm:text-sm font-black text-gray-900 mb-2 leading-snug">
                  ${tp.topik}
                </h4>
                <p class="text-[11px] text-gray-600 leading-relaxed mb-3">
                  ${tp.deskripsi}
                </p>
              </div>

              <div class="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Kriteria Ketercapaian (KKTP):
                </span>
                <ul class="space-y-1 text-[11px] text-gray-700">
                  ${tp.kktp.map(k => `
                    <li class="flex items-start gap-1.5">
                      <svg class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                      </svg>
                      <span>${k}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SEKSI 2: RUBRIK PENILAIAN PRESENTASI LISAN & STUDI KASUS -->
      <div class="space-y-3.5 sm:space-y-4">
        <div class="flex items-center justify-between border-b border-gray-200/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#E5A024]"></span>
            <h3 class="text-sm sm:text-lg font-black text-gray-900 tracking-tight">
              2. Rubrik Asesmen Formatif: Presentasi Lisan &amp; Studi Kasus
            </h3>
          </div>
          <span class="text-[11px] sm:text-xs text-gray-500 font-semibold">Skala 1 - 4</span>
        </div>

        <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          
          <!-- Mobile Scroll Hint -->
          <div class="sm:hidden px-3.5 py-2 bg-emerald-50/80 text-[11px] text-emerald-900 font-bold flex items-center justify-between border-b border-emerald-100">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
              </svg>
              <span>Geser tabel ke samping untuk melihat kolom</span>
            </span>
            <span class="text-xs font-black text-emerald-700">↔</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px] text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#0E4632] text-white text-[11px] uppercase tracking-wider">
                  <th class="p-3.5 sm:p-4 font-black w-1/4">Aspek Penilaian</th>
                  <th class="p-3.5 sm:p-4 font-black text-center w-16">Bobot</th>
                  <th class="p-3.5 sm:p-4 font-bold bg-emerald-950/40">Sangat Baik (Skor 4)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Baik (Skor 3)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Cukup (Skor 2)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Perlu Bimbingan (Skor 1)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-gray-700 leading-relaxed">
                ${RUBRIK_PRESENTASI_LISAN.map((r, i) => `
                  <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} hover:bg-emerald-50/40 transition-colors">
                    <td class="p-3.5 sm:p-4 font-black text-gray-900">
                      ${r.aspek}
                    </td>
                    <td class="p-3.5 sm:p-4 text-center font-bold text-[#0E4632]">
                      ${r.bobot}
                    </td>
                    <td class="p-3.5 sm:p-4 bg-emerald-50/50 text-emerald-950">
                      ${r.skor4}
                    </td>
                    <td class="p-3.5 sm:p-4">
                      ${r.skor3}
                    </td>
                    <td class="p-3.5 sm:p-4">
                      ${r.skor2}
                    </td>
                    <td class="p-3.5 sm:p-4 text-red-900 bg-red-50/30">
                      ${r.skor1}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="p-3.5 sm:p-4 bg-gray-50 text-[11px] text-gray-500 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <span><strong>Rumus Nilai Akhir Lisan:</strong> (Total Skor Diperoleh / 20) x 100</span>
            <span>Kriteria Ketuntasan Minimal (KKM): 75.0</span>
          </div>
        </div>
      </div>

      <!-- SEKSI 3: RUBRIK PENILAIAN MIND MAP -->
      <div class="space-y-3.5 sm:space-y-4">
        <div class="flex items-center justify-between border-b border-gray-200/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#E5A024]"></span>
            <h3 class="text-sm sm:text-lg font-black text-gray-900 tracking-tight">
              3. Rubrik Asesmen Produk: Peta Pikiran (Mind Map)
            </h3>
          </div>
          <span class="text-[11px] sm:text-xs text-gray-500 font-semibold">Skala 1 - 4</span>
        </div>

        <div class="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          
          <!-- Mobile Scroll Hint -->
          <div class="sm:hidden px-3.5 py-2 bg-emerald-50/80 text-[11px] text-emerald-900 font-bold flex items-center justify-between border-b border-emerald-100">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
              </svg>
              <span>Geser tabel ke samping untuk melihat kolom</span>
            </span>
            <span class="text-xs font-black text-emerald-700">↔</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[580px] text-left border-collapse text-xs">
              <thead>
                <tr class="bg-[#0E4632] text-white text-[11px] uppercase tracking-wider">
                  <th class="p-3.5 sm:p-4 font-black w-1/4">Kriteria Penilaian</th>
                  <th class="p-3.5 sm:p-4 font-bold bg-emerald-950/40">Sangat Baik (Skor 4)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Baik (Skor 3)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Cukup (Skor 2)</th>
                  <th class="p-3.5 sm:p-4 font-bold">Perlu Bimbingan (Skor 1)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-gray-700 leading-relaxed">
                ${RUBRIK_MIND_MAP.map((m, i) => `
                  <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'} hover:bg-emerald-50/40 transition-colors">
                    <td class="p-3.5 sm:p-4 font-black text-gray-900">
                      ${m.kriteria}
                    </td>
                    <td class="p-3.5 sm:p-4 bg-emerald-50/50 text-emerald-950">
                      ${m.skor4}
                    </td>
                    <td class="p-3.5 sm:p-4">
                      ${m.skor3}
                    </td>
                    <td class="p-3.5 sm:p-4">
                      ${m.skor2}
                    </td>
                    <td class="p-3.5 sm:p-4 text-red-900 bg-red-50/30">
                      ${m.skor1}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}

/**
 * =========================================================================
 * TAB 3: REKAP NILAI SISWA (PANGKALAN DATA KELAS - GOOGLE SHEETS LIVE EMBED)
 * =========================================================================
 */
function renderTabRekapNilai() {
  const rawSheetsUrl   = getStorage(STORAGE_KEY_SHEETS_URL, '');
  const sheetsUrl      = formatGoogleSheetsEmbedUrl(rawSheetsUrl);
  const isConfigured   = Boolean(sheetsUrl && !sheetsUrl.includes('PLACEHOLDER'));

  return `
    <div class="space-y-6">
      
      <!-- REKAPITULASI GOOGLE SHEETS LIVE EMBED -->
      <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-gray-100 shadow-xs space-y-4 sm:space-y-5">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-emerald-600' : 'bg-amber-500'}"></span>
              <span class="text-[11px] sm:text-xs font-black uppercase tracking-wider ${isConfigured ? 'text-emerald-800' : 'text-amber-800'}">
                ${isConfigured ? 'Sinkronisasi Cloud Aktif' : 'Konfigurasi Diperlukan'}
              </span>
            </div>
            <h3 class="text-base sm:text-xl font-black text-gray-900 tracking-tight">
              Pangkalan Data Rekap Nilai Kelas (Google Sheets)
            </h3>
            <p class="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Pantauan otomatis seluruh nilai kuis, studi kasus, dan laporan tugas yang dikirimkan oleh siswa kelas.
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            ${isConfigured ? `
              <button
                type="button"
                id="btn-refresh-sheets"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0E4632] border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>
                <span>Segarkan Lembar</span>
              </button>
            ` : ''}

            <button
              type="button"
              id="btn-toggle-config-sheets"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <span>${isConfigured ? 'Ubah URL Spreadsheet' : 'Konfigurasi Link'}</span>
            </button>
          </div>
        </div>

        <!-- Form Konfigurasi Link Google Sheets (Collapsible) -->
        <div id="sheets-config-panel" class="${isConfigured ? 'hidden' : ''} p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-3.5">
          <div>
            <label for="input-sheets-url" class="block font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-1.5">
              URL Google Sheets atau URL Publikasi Web (PubHTML):
            </label>
            <input
              type="url"
              id="input-sheets-url"
              value="${sheetsUrl}"
              placeholder="Contoh: https://docs.google.com/spreadsheets/d/1BxiMVs.../edit atau .../pubhtml"
              class="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#0E4632] focus:bg-white focus:ring-4 focus:ring-emerald-700/20 font-mono text-xs outline-none transition-all"
            />
          </div>
          <div class="flex items-center justify-between flex-wrap gap-2 text-[11px] text-gray-500">
            <span class="inline-flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
              </svg>
              <span><strong>Tips:</strong> Anda bisa langsung menempelkan URL share biasa atau URL hasil <em>Publish to web (pubhtml)</em>.</span>
            </span>
            <button
              type="button"
              id="btn-save-sheets-url"
              class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0E4632] hover:bg-[#12573e] active:scale-95 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer text-center"
            >
              Simpan &amp; Hubungkan
            </button>
          </div>
        </div>

        ${isConfigured ? `
          <!-- Embed Iframe Google Sheets yang Valid -->
          <div class="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xs">
            <div class="bg-gray-100/90 px-3.5 py-2.5 text-xs font-bold text-gray-700 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[11px] sm:text-xs">Pratinjau Lembar Kerja Spreadsheet Siswa</span>
              </div>
              <a
                href="${sheetsUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E4632] hover:underline"
              >
                <span>Buka di Tab Baru</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </a>
            </div>
            
            <div class="relative w-full h-[420px] sm:h-[580px] bg-white">
              <iframe
                id="iframe-google-sheets"
                src="${sheetsUrl}"
                class="w-full h-full border-0 block"
                loading="lazy"
                title="Rekap Nilai Siswa Google Sheets"
              ></iframe>
            </div>
          </div>
        ` : `
          <!-- Tampilan Edukatif Saat Belum Dikonfigurasi (Mencegah Layar Error Google 404) -->
          <div class="rounded-2xl sm:rounded-3xl border-2 border-dashed border-emerald-300 bg-gradient-to-b from-emerald-50/40 to-white p-5 sm:p-9 text-center">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <svg class="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H4.5A1.125 1.125 0 0 0 3.375 5.625m17.25 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25v8.25m18.375-8.25v8.25m-9.75-8.25v8.25"/>
              </svg>
            </div>
            <h4 class="text-base sm:text-lg font-black text-gray-900 tracking-tight mb-1">
              Tautan Google Sheets Belum Dihubungkan
            </h4>
            <p class="text-xs text-gray-600 max-w-md mx-auto mb-4 sm:mb-5 leading-relaxed">
              Masukkan tautan Google Sheets nilai siswa pada formulir konfigurasi di atas agar lembar kerja langsung tampil secara live di panel ini.
            </p>

            <!-- 3 Langkah Praktis -->
            <div class="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs pt-3 border-t border-emerald-200/60">
              <div class="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs">
                <span class="font-bold text-[#0E4632] block mb-0.5">1. Buka File</span>
                <span class="text-gray-500 text-[11px]">Buka spreadsheet nilai di Google Drive.</span>
              </div>
              <div class="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs">
                <span class="font-bold text-[#0E4632] block mb-0.5">2. Publikasikan</span>
                <span class="text-gray-500 text-[11px]">Pilih <em>File &gt; Share &gt; Publish to web</em>.</span>
              </div>
              <div class="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs">
                <span class="font-bold text-[#0E4632] block mb-0.5">3. Simpan Tautan</span>
                <span class="text-gray-500 text-[11px]">Salin link dan tempel pada kolom di atas.</span>
              </div>
            </div>
          </div>
        `}

      </div>

    </div>
  `;
}

/**
 * =========================================================================
 * CONTROLLER & EVENT LISTENERS
 * =========================================================================
 */
export function init() {
  const isAuth = isGuruAuthenticated();

  if (!isAuth) {
    initPinAuthLogic();
  } else {
    initDashboardLogic();
  }
}

/**
 * Logika Interaktif Otentikasi PIN 4 Digit
 */
function initPinAuthLogic() {
  const pinInputs = document.querySelectorAll('.pin-box');
  const btnSubmit = document.getElementById('btn-submit-pin');
  const errorBanner = document.getElementById('pin-error-banner');
  const errorText   = document.getElementById('pin-error-text');
  const lockoutBanner = document.getElementById('pin-lockout-banner');
  const lockoutTimer  = document.getElementById('pin-lockout-timer');
  const pinCardContainer = document.getElementById('pin-card-container');

  if (!pinInputs.length) return;

  // Cek apakah masih dalam status terkunci
  checkLockoutState();

  // Event Listener untuk masing-masing kotak PIN
  pinInputs.forEach((input, index) => {
    // 1. Input Event (Auto-advance)
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val ? val[0] : '';

      if (val && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }

      // Sembunyikan error saat user mengetik
      if (errorBanner) errorBanner.classList.add('hidden');

      // Jika digit ke-4 terisi, otomatis coba verifikasi
      if (index === pinInputs.length - 1 && val) {
        handlePinSubmit();
      }
    });

    // 2. Keydown Event (Backspace navigation)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        pinInputs[index - 1].focus();
      } else if (e.key === 'Enter') {
        handlePinSubmit();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        pinInputs[index - 1].focus();
      } else if (e.key === 'ArrowRight' && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
    });

    // 3. Paste Event (Dukungan Paste 4 Digit)
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
      if (pasteData) {
        for (let i = 0; i < Math.min(pasteData.length, pinInputs.length); i++) {
          pinInputs[i].value = pasteData[i];
        }
        const nextIdx = Math.min(pasteData.length, pinInputs.length - 1);
        pinInputs[nextIdx].focus();

        if (pasteData.length >= 4) {
          handlePinSubmit();
        }
      }
    });
  });

  if (btnSubmit) {
    btnSubmit.addEventListener('click', handlePinSubmit);
  }

  function getEnteredPin() {
    let pin = '';
    pinInputs.forEach(inp => { pin += inp.value; });
    return pin;
  }

  function clearPinInputs() {
    pinInputs.forEach(inp => { inp.value = ''; });
    if (pinInputs[0]) pinInputs[0].focus();
  }

  function handlePinSubmit() {
    if (isCurrentlyLocked()) {
      showToast('Akses terkunci sementara. Mohon tunggu countdown selesai.', 'warning');
      return;
    }

    const enteredPin = getEnteredPin();
    if (enteredPin.length < 4) {
      if (errorBanner) {
        errorBanner.classList.remove('hidden');
        if (errorText) errorText.textContent = 'Harap masukkan lengkap 4 digit PIN.';
      }
      return;
    }

    // Verifikasi PIN
    if (enteredPin === GURU_PIN_CORRECT) {
      // BERHASIL: Simpan session guru
      sessionStorage.setItem(STORAGE_KEYS.GURU_AUTH, 'true');
      failedPinAttempts = 0;
      showToast('Akses Diterima! Selamat datang di Portal Guru SiBELA.', 'success');

      // Re-render ke view Dashboard
      const appRoot = document.getElementById('app-root');
      if (appRoot) {
        appRoot.innerHTML = render();
        init();
      }
    } else {
      // GAGAL: Shake animation & increment counter
      failedPinAttempts++;
      if (pinCardContainer) {
        pinCardContainer.classList.remove('animate-shake');
        void pinCardContainer.offsetWidth; // Trigger reflow
        pinCardContainer.classList.add('animate-shake');
      }

      if (errorBanner) {
        errorBanner.classList.remove('hidden');
        if (errorText) {
          errorText.textContent = `PIN salah (${failedPinAttempts}/5). Silakan coba lagi.`;
        }
      }

      clearPinInputs();

      // Cek apakah mencapai batas percobaan (5 kali)
      if (failedPinAttempts >= 5) {
        startLockout(30);
      }
    }
  }

  function startLockout(seconds = 30) {
    lockUntilTimestamp = Date.now() + (seconds * 1000);
    pinInputs.forEach(inp => { inp.disabled = true; });
    if (btnSubmit) btnSubmit.disabled = true;
    if (errorBanner) errorBanner.classList.add('hidden');
    if (lockoutBanner) lockoutBanner.classList.remove('hidden');

    if (lockCountdownInterval) clearInterval(lockCountdownInterval);
    updateCountdownUI();

    lockCountdownInterval = setInterval(() => {
      const remainingSec = Math.ceil((lockUntilTimestamp - Date.now()) / 1000);
      if (remainingSec <= 0) {
        clearInterval(lockCountdownInterval);
        failedPinAttempts = 0;
        pinInputs.forEach(inp => { inp.disabled = false; });
        if (btnSubmit) btnSubmit.disabled = false;
        if (lockoutBanner) lockoutBanner.classList.add('hidden');
        clearPinInputs();
        showToast('Kunci PIN telah dibuka. Silakan coba kembali.', 'info');
      } else {
        updateCountdownUI();
      }
    }, 1000);
  }

  function updateCountdownUI() {
    if (lockoutTimer) {
      const remainingSec = Math.max(0, Math.ceil((lockUntilTimestamp - Date.now()) / 1000));
      lockoutTimer.textContent = remainingSec;
    }
  }

  function isCurrentlyLocked() {
    return Date.now() < lockUntilTimestamp;
  }

  function checkLockoutState() {
    if (isCurrentlyLocked()) {
      const remainingSec = Math.ceil((lockUntilTimestamp - Date.now()) / 1000);
      startLockout(remainingSec);
    }
  }
}

/**
 * Logika Interaktif Dashboard Guru
 */
function initDashboardLogic() {
  // 1. Tab Switching Event
  const tabButtons = document.querySelectorAll('.tab-btn-guru');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab && targetTab !== activeTab) {
        activeTab = targetTab;
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
          appRoot.innerHTML = render();
          init();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Logout Button
  const btnLogout = document.getElementById('btn-logout-guru');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin keluar dari Portal Guru dan kembali ke mode siswa?')) {
        sessionStorage.removeItem(STORAGE_KEYS.GURU_AUTH);
        showToast('Anda telah keluar dari Portal Guru.', 'info');
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
          appRoot.innerHTML = render();
          init();
        }
      }
    });
  }

  // 3. Tab Rekap - Toggle Configuration Google Sheets Panel
  const btnToggleConfig = document.getElementById('btn-toggle-config-sheets');
  const configPanel     = document.getElementById('sheets-config-panel');
  const btnSaveSheets   = document.getElementById('btn-save-sheets-url');
  const inputSheetsUrl  = document.getElementById('input-sheets-url');
  const iframeSheets    = document.getElementById('iframe-google-sheets');
  const btnRefreshSheets= document.getElementById('btn-refresh-sheets');

  if (btnToggleConfig && configPanel) {
    btnToggleConfig.addEventListener('click', () => {
      configPanel.classList.toggle('hidden');
      if (!configPanel.classList.contains('hidden') && inputSheetsUrl) {
        inputSheetsUrl.focus();
      }
    });
  }

  const saveSheetsAction = (rawUrl) => {
    const trimmed = (rawUrl || '').trim();
    if (!trimmed) {
      showToast('URL Google Sheets tidak boleh kosong.', 'error');
      return;
    }
    const formatted = formatGoogleSheetsEmbedUrl(trimmed);
    setStorage(STORAGE_KEY_SHEETS_URL, formatted);
    showToast('Tautan Google Sheets berhasil disimpan & dihubungkan!', 'success');

    // Re-render tampilan
    const appRoot = document.getElementById('app-root');
    if (appRoot) {
      appRoot.innerHTML = render();
      init();
    }
  };

  if (btnSaveSheets && inputSheetsUrl) {
    btnSaveSheets.addEventListener('click', () => {
      saveSheetsAction(inputSheetsUrl.value);
    });
  }

  if (btnRefreshSheets && iframeSheets) {
    btnRefreshSheets.addEventListener('click', () => {
      const currentSrc = iframeSheets.src;
      iframeSheets.src = 'about:blank';
      setTimeout(() => {
        iframeSheets.src = currentSrc;
        showToast('Lembar kerja Google Sheets disegarkan.', 'info');
      }, 150);
    });
  }
}
