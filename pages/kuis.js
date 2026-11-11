/**
 * SiBELA - Modul Kuis Evaluasi (Issue #8)
 * Fitur:
 * 1. Layar Pembuka Kuis: Nama siswa, passing grade KKTP >= 75, pilihan mode evaluasi, riwayat skor.
 * 2. Penyajian Soal Bertahap: 1 soal per layar, progress bar visual, kartu opsi A B C D interaktif & keyboard accessible.
 * 3. Countdown Timer Visual: 30 detik per soal, animasi ring/bar, transisi warna dinamis, auto-timeout jika habis.
 * 4. Instant Feedback: Kartu hijau/merah, tanda centang/silang, penjelasan kunci jawaban, jeda 2.5s / tombol skip.
 * 5. Bank Soal: 40 soal terverifikasi (Modul 1 Sishankamnas & Modul 2 Diplomasi Internasional), Fisher-Yates shuffle.
 * 6. Perhitungan Skor & Hasil: Skor 0-100 dengan animated counter, status TUNTAS / BELUM TUNTAS, konfeti, review pembahasan per nomor.
 * 7. State Management: Persistensi localStorage `sibela_kuis`, update best score, setProgressStep('kuis', true).
 */

import { bankSoal, generateQuizDeck } from '../data/bank-soal.js';
import { KUIS_CONFIG } from '../data/kuis-config.js';
import { getStorage, setStorage, setProgressStep, STORAGE_KEYS, formatTanggalID } from '../js/utils.js';

// State internal sesi kuis
let state = {
  view: 'intro', // 'intro' | 'active' | 'result'
  mode: 'modul1', // default mode: modul 1 (Sishankamnas)
  deck: [],
  currentIndex: 0,
  userAnswers: [], // array of { indexNomor, id, selectedOptionIndex, isCorrect, isTimeout, timeSpent }
  selectedOptionIndex: null, // opsi yang sedang dipilih siswa sebelum mengklik "Jawab"
  timerRemaining: KUIS_CONFIG.waktuPerSoal,
  timerInterval: null,
  isAnswerLocked: false,
  autoNextTimer: null,
  feedbackInterval: null,
  feedbackCountdown: 0,
  currentQuestionStartTime: 0,
  activeFilter: 'all' // untuk filter review di halaman hasil ('all', 'incorrect', 'correct')
};

// SVG Icon Pack
const ICONS = {
  quiz: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/></svg>`,
  check: `<svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  cross: `<svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`,
  timer: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  sparkles: `<svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>`,
  trophy: `<svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V4.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v9.75"/></svg>`,
  arrowRight: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`,
  refresh: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  exit: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/></svg>`,
  student: `<svg class="w-6 h-6 text-[#0E4632]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7"/></svg>`,
  lightbulb: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6 6 0 1 0-4.243-1.757L12 12.75Zm0 0h.008M9 21h6m-4.5-3h3"/></svg>`,
  lightbulbSm: `<svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6 6 0 1 0-4.243-1.757L12 12.75Zm0 0h.008M9 21h6m-4.5-3h3"/></svg>`,
  kktpBadge: `<svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>`,
  checkCircle: `<svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  crossCircle: `<svg class="w-5 h-5 text-rose-700" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  timerAlert: `<svg class="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  checkSm: `<svg class="w-3.5 h-3.5 text-emerald-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  crossSm: `<svg class="w-3.5 h-3.5 text-rose-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`,
  timerSm: `<svg class="w-3.5 h-3.5 text-amber-700" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  clipboard: `<svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg>`
};

/**
 * Render root view container
 */
export function render() {
  return `
    <div class="page-enter max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-0 sm:pt-4">

      <!-- ================= 1. UNIFIED CURVED HEADER (KONSISTEN MODUL 1 & 2) ================= -->
      <header class="bg-[#0E4632] rounded-b-[2.5rem] lg:rounded-b-[3.5rem] px-5 sm:px-8 pt-5 sm:pt-7 pb-7 sm:pb-9 text-white shadow-md relative overflow-hidden -mx-4 sm:-mx-6 mb-6 sm:mb-8">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <!-- Back Link (Figma Screen 2 Pattern) -->
            <a href="#/modul2" class="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-bold transition-colors py-1 self-start">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              <span>Materi 2</span>
            </a>
            
            <!-- Title & Subtitle -->
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1.5 tracking-tight leading-tight">
              Kuis Evaluasi Bela Negara
            </h1>
          </div>

          <div class="hidden sm:flex items-center gap-2 self-start sm:self-center">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-100 border border-white/20 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#E5A024] animate-pulse"></span>
              <span>Tahap 3 dari 4: Evaluasi Pembelajaran</span>
            </span>
          </div>
        </div>
      </header>

      <!-- ================= 2. CONTAINER KONTEN DINAMIS KUIS ================= -->
      <div id="kuis-body" class="space-y-6">
        <!-- Konten view diinjeksi oleh updateView() -->
      </div>

    </div>
  `;
}

/**
 * Inisialisasi modul kuis saat route #/kuis aktif
 */
export function init() {
  // Reset timer yang mungkin masih tertinggal jika user bolak-balik rute
  clearAllTimers();

  // Reset state ke intro
  state.view = 'intro';
  state.isAnswerLocked = false;
  state.currentIndex = 0;
  state.userAnswers = [];
  state.selectedOptionIndex = null;

  // Pasang global listener keyboard untuk shortcut A, B, C, D
  window.removeEventListener('keydown', handleGlobalKeydown);
  window.addEventListener('keydown', handleGlobalKeydown);

  updateView();
}

/**
 * Membersihkan seluruh timer aktif
 */
function clearAllTimers() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  if (state.autoNextTimer) {
    clearTimeout(state.autoNextTimer);
    state.autoNextTimer = null;
  }
  if (state.feedbackInterval) {
    clearInterval(state.feedbackInterval);
    state.feedbackInterval = null;
  }
}

/**
 * Update render tampilan berdasarkan state.view ('intro' | 'active' | 'result')
 */
function updateView() {
  const body = document.getElementById('kuis-body');
  if (!body) return;

  if (state.view === 'intro') {
    body.innerHTML = renderIntroView();
    bindIntroEvents();
  } else if (state.view === 'active') {
    body.innerHTML = renderActiveView();
    bindActiveEvents();
  } else if (state.view === 'result') {
    body.innerHTML = renderResultView();
    bindResultEvents();
  }
}

// =========================================================================
// 1. INTRO VIEW (Layar Pembuka Kuis)
// =========================================================================

function renderIntroView() {
  const studentName = getStorage(STORAGE_KEYS.NAMA, 'Siswa Pancasila');
  const savedKuis = getStorage(STORAGE_KEYS.KUIS, null);
  const selectedMode = KUIS_CONFIG.modeList.find(m => m.id === state.mode) || KUIS_CONFIG.modeList[0];

  return `
    <!-- Student Welcome Card -->
    <div class="glass-card p-5 sm:p-6 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/50 border-l-4 border-primary">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-primary flex items-center justify-center flex-shrink-0 shadow-xs">
            ${ICONS.student}
          </div>
          <div>
            <div class="text-xs text-gray-500 font-medium">Selamat Datang di Ruang Evaluasi</div>
            <div class="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <span id="kuis-student-name">${studentName}</span>
              <button type="button" id="btn-edit-name-kuis" class="text-xs font-normal text-primary hover:underline" title="Ubah Nama">
                (Ganti)
              </button>
            </div>
            <div class="text-[11px] text-gray-500">Kerjakan secara mandiri dengan jujur, teliti, dan percaya diri!</div>
          </div>
        </div>

        ${savedKuis ? `
          <div class="bg-white/90 px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3 self-start sm:self-center">
            <div class="p-2 rounded-lg ${savedKuis.isTuntas ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
              ${ICONS.trophy}
            </div>
            <div>
              <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Skor Tertinggi</div>
              <div class="text-base font-black ${savedKuis.bestScore >= 75 ? 'text-emerald-700' : 'text-amber-700'}">
                ${savedKuis.bestScore || savedKuis.skor || 0} / 100
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${savedKuis.isTuntas ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} ml-1">
                  ${savedKuis.isTuntas ? 'TUNTAS' : 'REMEDIAL'}
                </span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Main Instructions Card -->
    <div class="glass-card p-6 sm:p-8">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent-hover mb-3">
          ${ICONS.sparkles}
          <span>Fitur Interaktif Cerdas</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Petunjuk & Mekanisme Pengerjaan Kuis</h2>
        <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
          Kuis ini menggunakan sistem bertahap per nomor soal dengan umpan balik langsung (*Instant Feedback*). Pembahasan materi ditampilkan seketika agar kamu dapat langsung mengevaluasi pemahaman konsep bela negara.
        </p>

        <!-- 3 Feature Highlights -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-primary/40 transition-all">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5">
              ${ICONS.timer}
            </div>
            <div class="text-xs font-bold text-gray-900">${KUIS_CONFIG.waktuPerSoal} Detik / Nomor</div>
            <div class="text-[11px] text-gray-500 mt-0.5">Countdown timer otomatis berpindah saat waktu habis.</div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-primary/40 transition-all">
            <div class="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
              ${ICONS.lightbulb}
            </div>
            <div class="text-xs font-bold text-gray-900">Instant Feedback</div>
            <div class="text-[11px] text-gray-500 mt-0.5">Penjelasan kunci jawaban & rujukan materi muncul seketika.</div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-primary/40 transition-all">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5">
              ${ICONS.kktpBadge}
            </div>
            <div class="text-xs font-bold text-gray-900">KKTP ≥ ${KUIS_CONFIG.passingGrade}</div>
            <div class="text-[11px] text-gray-500 mt-0.5">Target ketercapaian nilai ketuntasan belajar Pendidikan Pancasila.</div>
          </div>
        </div>

        <!-- Mode Evaluasi Selection -->
        <div class="mb-8">
          <label class="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
            Pilih Paket Evaluasi:
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="mode-selector-container">
            ${KUIS_CONFIG.modeList.map(mode => `
              <div class="mode-card p-3.5 rounded-xl border-2 cursor-pointer transition-all ${state.mode === mode.id ? 'border-primary bg-emerald-50/50 shadow-sm ring-2 ring-primary/20' : 'border-gray-200 bg-white hover:border-gray-300'}"
                   data-mode-id="${mode.id}">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full border flex items-center justify-center ${state.mode === mode.id ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}">
                      ${state.mode === mode.id ? '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>' : ''}
                    </span>
                    <span class="text-xs font-bold text-gray-900">${mode.label}</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${state.mode === mode.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}">
                    ${mode.count} Soal
                  </span>
                </div>
                <p class="text-[11px] text-gray-500 mt-1 pl-6 leading-relaxed">
                  ${mode.deskripsi}
                </p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-4 border-t border-gray-100 flex items-center">
          <button type="button" id="btn-start-quiz" class="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-secondary font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
            <span>Mulai Pengerjaan Kuis</span>
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Breadcrumbs Footer -->
    <div class="flex items-center justify-between pt-4">
      <a href="#/modul2" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white border border-gray-200 transition-all">
        <span>← Kembali ke Modul 2</span>
      </a>
      <a href="#/mindmap" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
        <span>Lanjut ke Mind Map Digital →</span>
      </a>
    </div>
  `;
}

function bindIntroEvents() {
  // Ganti nama modal
  const btnEdit = document.getElementById('btn-edit-name-kuis');
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      if (typeof window.openModalNama === 'function') {
        window.openModalNama();
      } else {
        const newName = prompt('Masukkan nama panggilanmu:', getStorage(STORAGE_KEYS.NAMA, ''));
        if (newName && newName.trim()) {
          setStorage(STORAGE_KEYS.NAMA, newName.trim());
          const nameEl = document.getElementById('kuis-student-name');
          if (nameEl) nameEl.textContent = newName.trim();
        }
      }
    });
  }

  // Pilih mode evaluasi
  const modeCards = document.querySelectorAll('.mode-card');
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      const modeId = card.getAttribute('data-mode-id');
      if (modeId) {
        state.mode = modeId;
        updateView();
      }
    });
  });

  // Tombol Mulai Kuis
  const btnStart = document.getElementById('btn-start-quiz');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      startQuizSession();
    });
  }
}

// =========================================================================
// 2. ACTIVE QUIZ SESSION (Penyajian Soal Bertahap & Timer)
// =========================================================================

/**
 * Memulai sesi kuis baru: generate deck acak, reset jawaban, jalankan soal pertama
 */
function startQuizSession() {
  const currentMode = KUIS_CONFIG.modeList.find(m => m.id === state.mode) || KUIS_CONFIG.modeList[0];
  
  // Ambil dek soal yang diacak
  state.deck = generateQuizDeck(currentMode.filter, currentMode.count);
  state.currentIndex = 0;
  state.userAnswers = [];
  state.selectedOptionIndex = null;
  state.view = 'active';

  updateView();
  startQuestionTimer();
}

const BTN_SUBMIT_ACTIVE_CLASS = 'inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer';
const BTN_SUBMIT_DISABLED_CLASS = 'inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm text-gray-400 bg-gray-100 border border-gray-200 transition-all cursor-not-allowed opacity-75';

function renderActiveView() {
  const q = state.deck[state.currentIndex];
  if (!q) {
    // Selesai seluruh soal
    finishQuizSession();
    return '';
  }

  const total = state.deck.length;
  const currentNum = state.currentIndex + 1;
  const progressPercent = Math.round((currentNum / total) * 100);
  const currentAnswer = state.userAnswers[state.currentIndex];
  const isAnswered = Boolean(currentAnswer);

  const letters = ['A', 'B', 'C', 'D'];

  return `
    <!-- Top Quiz Bar -->
    <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t-4 border-primary">
      <div class="flex items-center gap-3">
        <span class="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm">
          ${currentNum}
        </span>
        <div>
          <div class="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span>Soal ${currentNum} dari ${total}</span>
            <span class="w-1 h-1 rounded-full bg-gray-300"></span>
            <span class="text-primary font-semibold">${q.labelKategori || 'Pendidikan Pancasila'}</span>
          </div>
          <div class="text-xs text-gray-600 font-medium">Pilihlah salah satu jawaban yang paling tepat</div>
        </div>
      </div>

      <!-- Timer & Actions -->
      <div class="flex items-center gap-3 self-end sm:self-center">
        <!-- Visual Timer Pill -->
        <div id="quiz-timer-pill" class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${getTimerPillClass(state.timerRemaining)}">
          <span class="timer-icon flex-shrink-0">${ICONS.timer}</span>
          <span><strong id="timer-number">${state.timerRemaining}</strong> detik</span>
        </div>

        <!-- Tombol Batal/Keluar -->
        <button type="button" id="btn-quit-quiz" class="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Batalkan Kuis">
          ${ICONS.exit}
        </button>
      </div>
    </div>

    <!-- Progress Bar Soal -->
    <div class="w-full bg-gray-200/80 rounded-full h-2 overflow-hidden shadow-inner -mt-3">
      <div class="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-out" style="width: ${progressPercent}%"></div>
    </div>

    <!-- Question Card -->
    <div class="glass-card p-6 sm:p-8 space-y-6">
      
      <!-- Pertanyaan -->
      <div class="space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">
          <span>Pertanyaan #${currentNum}</span>
        </div>
        <p class="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
          ${q.pertanyaan}
        </p>
      </div>

      <!-- Opsi Jawaban (A, B, C, D) -->
      <div class="grid grid-cols-1 gap-3" id="quiz-options-container">
        ${q.opsi.map((optText, optIdx) => {
          let cardStyle = 'border-gray-200 bg-white hover:border-primary/50 hover:bg-emerald-50/30';
          let letterStyle = 'border-gray-300 bg-gray-50 text-gray-700';
          let statusIcon = '';

          if (isAnswered) {
            const isCorrectOption = optIdx === q.jawabanBenar;
            const isSelectedOption = currentAnswer.selectedOptionIndex === optIdx;

            if (isCorrectOption) {
              // Jawaban benar selalu hijau
              cardStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold ring-2 ring-emerald-400/40 shadow-sm';
              letterStyle = 'border-emerald-500 bg-emerald-600 text-white';
              statusIcon = `<span class="ml-auto text-emerald-600">${ICONS.check}</span>`;
            } else if (isSelectedOption && !currentAnswer.isCorrect) {
              // Jawaban siswa yang salah diberi merah
              cardStyle = 'border-rose-500 bg-rose-50/90 text-rose-950 font-medium ring-2 ring-rose-400/40 shadow-sm';
              letterStyle = 'border-rose-500 bg-rose-600 text-white';
              statusIcon = `<span class="ml-auto text-rose-600">${ICONS.cross}</span>`;
            } else {
              // Opsi lain yang bukan pilihan dan bukan jawaban benar diredam
              cardStyle = 'border-gray-200 bg-gray-50/60 opacity-60 text-gray-500';
              letterStyle = 'border-gray-200 bg-gray-100 text-gray-400';
            }
          } else if (state.selectedOptionIndex === optIdx) {
            // Opsi yang sedang dipilih siswa sebelum mengklik "Jawab"
            cardStyle = 'border-primary bg-emerald-50/70 text-gray-900 font-semibold ring-2 ring-primary/25 shadow-sm';
            letterStyle = 'border-primary bg-primary text-white';
          }

          return `
            <div class="option-card p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 ${!isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'pointer-events-none'} ${cardStyle}"
                 data-option-index="${optIdx}"
                 tabindex="${isAnswered ? '-1' : '0'}"
                 role="button"
                 aria-label="Opsi ${letters[optIdx]}: ${optText}">
              
              <span class="option-letter w-8 h-8 rounded-lg border flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors ${letterStyle}">
                ${letters[optIdx]}
              </span>

              <span class="text-xs sm:text-sm leading-relaxed flex-grow">
                ${optText}
              </span>

              ${statusIcon}
            </div>
          `;
        }).join('')}
      </div>

      <!-- Action Button Jawab (Hanya saat belum dikunci/dijawab) -->
      ${!isAnswered ? `
        <div class="pt-4 border-t border-gray-100 flex items-center" style="display: flex; justify-content: flex-end; width: 100%;">
          <button
            type="button"
            id="btn-submit-answer"
            class="${state.selectedOptionIndex !== null ? BTN_SUBMIT_ACTIVE_CLASS : BTN_SUBMIT_DISABLED_CLASS}"
            style="min-height: 44px; min-width: 130px; margin-left: auto;"
            ${state.selectedOptionIndex === null ? 'disabled' : ''}
          >
            <span>Jawab</span>
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      ` : ''}

      <!-- Instant Feedback Box (Muncul setelah memilih atau timeout) -->
      ${isAnswered ? (() => {
        const isLastQuestion = state.currentIndex === total - 1;
        const nextBtnLabel = isLastQuestion ? 'Lihat Hasil Kuis' : 'Soal Selanjutnya';

        let nextBtnClass = '';
        let nextBtnStyle = '';

        if (currentAnswer.isCorrect) {
          // Jawaban Benar: Button Hijau
          nextBtnClass = 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg active:scale-95';
          nextBtnStyle = 'background-color: #059669; color: #ffffff;';
        } else if (currentAnswer.isTimeout) {
          // Waktu Habis: Button Kuning / Amber
          nextBtnClass = 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg active:scale-95';
          nextBtnStyle = 'background-color: #D97706; color: #ffffff;';
        } else {
          // Jawaban Salah: Button Merah
          nextBtnClass = 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg active:scale-95';
          nextBtnStyle = 'background-color: #DC2626; color: #ffffff;';
        }

        return `
          <div class="page-enter rounded-2xl p-5 sm:p-6 border-2 ${currentAnswer.isCorrect ? 'border-emerald-300 bg-emerald-50/90 text-emerald-950' : (currentAnswer.isTimeout ? 'border-amber-300 bg-amber-50/90 text-amber-950' : 'border-rose-300 bg-rose-50/90 text-rose-950')} space-y-4 shadow-soft">
            
            <!-- Status Feedback -->
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentAnswer.isCorrect ? 'bg-emerald-100 text-emerald-700' : (currentAnswer.isTimeout ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700')}">
                ${currentAnswer.isCorrect ? ICONS.checkCircle : (currentAnswer.isTimeout ? ICONS.timerAlert : ICONS.crossCircle)}
              </span>
              <strong class="text-base sm:text-lg font-black tracking-tight">
                ${currentAnswer.isCorrect ? 'Luar Biasa! Jawabanmu Benar' : (currentAnswer.isTimeout ? 'Waktu Habis! Soal Terlewat' : 'Kurang Tepat!')}
              </strong>
            </div>

            <!-- Kunci Jawaban & Pembahasan -->
            <div class="text-xs sm:text-sm leading-relaxed ${currentAnswer.isCorrect ? 'text-emerald-950' : (currentAnswer.isTimeout ? 'text-amber-950' : 'text-rose-950')} space-y-2.5">
              <div>
                <span class="font-bold">Kunci Jawaban:</span> Opsi <strong>${letters[q.jawabanBenar]}</strong> (${q.opsi[q.jawabanBenar]}).
              </div>
              <div class="pt-2.5 border-t ${currentAnswer.isCorrect ? 'border-emerald-200' : (currentAnswer.isTimeout ? 'border-amber-200' : 'border-rose-200')} font-normal text-gray-700 leading-relaxed flex items-start gap-2.5">
                <span class="w-6 h-6 rounded-md bg-amber-100/80 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  ${ICONS.lightbulbSm}
                </span>
                <em>${q.penjelasan}</em>
              </div>
            </div>

            <!-- Tombol Next Manual (Warna sesuai kondisi: Hijau / Merah / Kuning) -->
            <div class="pt-3 border-t ${currentAnswer.isCorrect ? 'border-emerald-200/80' : (currentAnswer.isTimeout ? 'border-amber-200/80' : 'border-rose-200/80')} flex items-center justify-end" style="display: flex; justify-content: flex-end; width: 100%;">
              <button
                type="button"
                id="btn-next-question-instant"
                class="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${nextBtnClass}"
                style="min-height: 44px; min-width: 150px; margin-left: auto; ${nextBtnStyle}"
              >
                <span>${nextBtnLabel}</span>
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        `;
      })() : ''}

    </div>
  `;
}

/**
 * Memilih opsi sementara sebelum siswa mengklik tombol "Jawab"
 */
function selectOption(optIdx) {
  if (state.isAnswerLocked) return;
  state.selectedOptionIndex = optIdx;

  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach((card, idx) => {
    const isSelected = idx === optIdx;
    const letterEl = card.querySelector('.option-letter');
    if (isSelected) {
      card.className = 'option-card p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99] border-primary bg-emerald-50/70 text-gray-900 font-semibold ring-2 ring-primary/25 shadow-sm';
      if (letterEl) {
        letterEl.className = 'option-letter w-8 h-8 rounded-lg border flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors border-primary bg-primary text-white';
      }
    } else {
      card.className = 'option-card p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99] border-gray-200 bg-white hover:border-primary/50 hover:bg-emerald-50/30';
      if (letterEl) {
        letterEl.className = 'option-letter w-8 h-8 rounded-lg border flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors border-gray-300 bg-gray-50 text-gray-700';
      }
    }
  });

  const btnSubmit = document.getElementById('btn-submit-answer');
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.className = BTN_SUBMIT_ACTIVE_CLASS;
  }
}

function bindActiveEvents() {
  const q = state.deck[state.currentIndex];
  if (!q) return;

  const isAnswered = Boolean(state.userAnswers[state.currentIndex]);

  // Tombol Keluar Kuis
  const btnQuit = document.getElementById('btn-quit-quiz');
  if (btnQuit) {
    btnQuit.addEventListener('click', () => {
      if (confirm('Yakin ingin membatalkan kuis evaluasi ini? Nilai sesi saat ini tidak akan disimpan.')) {
        clearAllTimers();
        state.view = 'intro';
        updateView();
      }
    });
  }

  // Interaksi opsi & tombol jawab (saat soal belum dikunci/dijawab)
  if (!isAnswered) {
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const optIdx = parseInt(card.getAttribute('data-option-index'), 10);
        if (!isNaN(optIdx) && !state.isAnswerLocked) {
          selectOption(optIdx);
        }
      });
      // Keyboard enter/space on card
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const optIdx = parseInt(card.getAttribute('data-option-index'), 10);
          if (!isNaN(optIdx) && !state.isAnswerLocked) {
            selectOption(optIdx);
          }
        }
      });
    });

    // Tombol Jawab
    const btnSubmit = document.getElementById('btn-submit-answer');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        if (state.selectedOptionIndex !== null && !state.isAnswerLocked) {
          submitAnswer(state.selectedOptionIndex, false);
        }
      });
    }
  } else {
    // Tombol Lanjut Sekarang
    const btnNext = document.getElementById('btn-next-question-instant');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        moveToNextQuestion();
      });
    }
  }
}

/**
 * Global Keyboard Shortcut: A, B, C, D dan Space/Enter
 */
function handleGlobalKeydown(e) {
  if (state.view !== 'active') return;

  const key = e.key.toUpperCase();
  const isAnswered = Boolean(state.userAnswers[state.currentIndex]);

  if (!isAnswered && !state.isAnswerLocked) {
    let selectedIdx = -1;
    if (key === 'A' || key === '1') selectedIdx = 0;
    else if (key === 'B' || key === '2') selectedIdx = 1;
    else if (key === 'C' || key === '3') selectedIdx = 2;
    else if (key === 'D' || key === '4') selectedIdx = 3;

    if (selectedIdx >= 0) {
      e.preventDefault();
      selectOption(selectedIdx);
    } else if (e.key === 'Enter' && state.selectedOptionIndex !== null) {
      e.preventDefault();
      submitAnswer(state.selectedOptionIndex, false);
    }
  } else if (isAnswered) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      moveToNextQuestion();
    }
  }
}

/**
 * Menghitung class styling warna timer dinamis
 */
function getTimerPillClass(seconds) {
  if (seconds <= 5) {
    return 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse';
  } else if (seconds <= 10) {
    return 'bg-amber-100 text-amber-800 border-amber-300';
  }
  return 'bg-emerald-50 text-emerald-800 border-emerald-300';
}

/**
 * Menjalankan interval timer per soal
 */
function startQuestionTimer() {
  clearAllTimers();
  state.timerRemaining = KUIS_CONFIG.waktuPerSoal;
  state.isAnswerLocked = false;
  state.selectedOptionIndex = null;
  state.currentQuestionStartTime = Date.now();

  state.timerInterval = setInterval(() => {
    state.timerRemaining -= 1;

    // Update elemen DOM timer tanpa re-render seluruh halaman agar animasi mulus
    const timerNumberEl = document.getElementById('timer-number');
    const timerPillEl = document.getElementById('quiz-timer-pill');
    if (timerNumberEl) {
      timerNumberEl.textContent = state.timerRemaining;
    }
    if (timerPillEl) {
      timerPillEl.className = `flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${getTimerPillClass(state.timerRemaining)}`;
    }

    if (state.timerRemaining <= 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      // Waktu habis -> jika siswa sudah memilih opsi, kirimkan opsi tersebut; jika belum, catat sebagai timeout
      if (state.selectedOptionIndex !== null) {
        submitAnswer(state.selectedOptionIndex, false);
      } else {
        submitAnswer(-1, true);
      }
    }
  }, 1000);
}

/**
 * Handle submit jawaban (oleh klik opsi atau oleh timeout)
 */
function submitAnswer(optionIndex, isTimeout = false) {
  if (state.isAnswerLocked) return;
  state.isAnswerLocked = true;

  // Hentikan timer soal
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  const q = state.deck[state.currentIndex];
  const isCorrect = !isTimeout && optionIndex === q.jawabanBenar;
  const timeSpent = Math.min(
    KUIS_CONFIG.waktuPerSoal,
    Math.round((Date.now() - state.currentQuestionStartTime) / 1000)
  );

  // Simpan catatan jawaban
  state.userAnswers[state.currentIndex] = {
    indexNomor: state.currentIndex + 1,
    id: q.id,
    pertanyaan: q.pertanyaan,
    opsi: q.opsi,
    jawabanBenarIndex: q.jawabanBenar,
    selectedOptionIndex: optionIndex,
    isCorrect,
    isTimeout,
    timeSpent,
    penjelasan: q.penjelasan,
    labelKategori: q.labelKategori
  };

  // Render ulang untuk menampilkan pembahasan & tombol next manual (tanpa timer otomatis)
  updateView();
}

/**
 * Pindah ke nomor berikutnya atau selesaikan kuis
 */
function moveToNextQuestion() {
  clearAllTimers();
  state.currentIndex += 1;
  state.selectedOptionIndex = null;

  if (state.currentIndex < state.deck.length) {
    updateView();
    startQuestionTimer();
  } else {
    finishQuizSession();
  }
}

// =========================================================================
// 3. RESULT VIEW (Perhitungan Skor, KKTP & Pembahasan)
// =========================================================================

/**
 * Menyelesaikan sesi kuis: hitung skor, simpan ke localStorage, render hasil
 */
function finishQuizSession() {
  clearAllTimers();

  const total = state.deck.length;
  const benar = state.userAnswers.filter(a => a && a.isCorrect).length;
  const tidakDijawab = state.userAnswers.filter(a => a && a.isTimeout).length;
  const salah = total - benar - tidakDijawab;

  const skor = total > 0 ? Math.round((benar / total) * 100) : 0;
  const isTuntas = skor >= KUIS_CONFIG.passingGrade;

  // Baca rekam jejak lama
  const previousData = getStorage(STORAGE_KEYS.KUIS, null);
  const bestScore = Math.max(skor, (previousData && previousData.bestScore) || 0);

  // Simpan ke localStorage
  const kuisPayload = {
    skor,
    benar,
    salah,
    tidakDijawab,
    total,
    isTuntas,
    bestScore,
    mode: state.mode,
    tanggal: new Date().toISOString()
  };
  setStorage(STORAGE_KEYS.KUIS, kuisPayload);

  // Update progress modul kuis di SiBELA jika tuntas KKTP
  if (isTuntas) {
    setProgressStep('kuis', true);
  }

  state.view = 'result';
  updateView();

  // Animasi konfeti jika tuntas KKTP!
  if (isTuntas && typeof window.confetti === 'function') {
    triggerConfettiCelebration();
  }

  // Animasi Counter Skor (0 -> skor)
  animateScoreCounter(skor);
}

function renderResultView() {
  const total = state.deck.length;
  const benar = state.userAnswers.filter(a => a && a.isCorrect).length;
  const tidakDijawab = state.userAnswers.filter(a => a && a.isTimeout).length;
  const salah = total - benar - tidakDijawab;
  const skor = total > 0 ? Math.round((benar / total) * 100) : 0;
  const isTuntas = skor >= KUIS_CONFIG.passingGrade;

  const studentName = getStorage(STORAGE_KEYS.NAMA, 'Siswa');
  const letters = ['A', 'B', 'C', 'D'];

  // Filter daftar lembar jawaban
  let filteredAnswers = state.userAnswers;
  if (state.activeFilter === 'correct') {
    filteredAnswers = state.userAnswers.filter(a => a.isCorrect);
  } else if (state.activeFilter === 'incorrect') {
    filteredAnswers = state.userAnswers.filter(a => !a.isCorrect);
  }

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - skor / 100);
  const accentHex = isTuntas ? '#059669' : '#D97706';
  const trackHex = isTuntas ? '#D1FAE5' : '#FEF3C7';
  const softGlow = isTuntas ? 'rgba(5, 150, 105, 0.18)' : 'rgba(217, 119, 6, 0.18)';

  const badgeIcon = isTuntas
    ? `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V4.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v9.75"/></svg>`
    : `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>`;

  return `
    <!-- Hero Score Summary Card -->
    <div class="glass-card p-6 sm:p-8 text-center border-t-4 ${isTuntas ? 'border-emerald-600 bg-gradient-to-b from-emerald-50/60 via-white to-white' : 'border-amber-500 bg-gradient-to-b from-amber-50/60 via-white to-white'} shadow-card">
      
      <!-- Top Status Pill -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold ${isTuntas ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}" style="margin-bottom: 1.25rem;">
        ${badgeIcon}
        <span>${isTuntas ? 'HASIL EVALUASI TUNTAS' : 'SARAN REMEDIAL PEMBELAJARAN'}</span>
      </div>

      <!-- Highlighted Circular Score Ring -->
      <div style="width: 176px; height: 176px; margin: 0.5rem auto 1.25rem; position: relative; border-radius: 9999px; background: #ffffff; box-shadow: 0 14px 36px -8px ${softGlow}, inset 0 0 0 1px rgba(0,0,0,0.04); display: flex; align-items: center; justify-content: center;">
        <svg width="176" height="176" viewBox="0 0 176 176" style="transform: rotate(-90deg); position: absolute; inset: 0;">
          <circle cx="88" cy="88" r="${radius}" fill="none" stroke="${trackHex}" stroke-width="11" />
          <circle
            id="score-ring-circle"
            cx="88"
            cy="88"
            r="${radius}"
            fill="none"
            stroke="${accentHex}"
            stroke-width="11"
            stroke-linecap="round"
            stroke-dasharray="${circumference.toFixed(2)}"
            stroke-dashoffset="${strokeDashoffset.toFixed(2)}"
            style="transition: stroke-dashoffset 0.25s ease-out;"
          />
        </svg>

        <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; color: #6B7280; text-transform: uppercase;">Skor Akhir</span>
          <div id="score-counter-display" style="font-size: 3.5rem; line-height: 1; font-weight: 900; color: ${accentHex}; letter-spacing: -0.03em; margin-top: 0.25rem;">
            ${skor}
          </div>
          <span style="font-size: 0.72rem; font-weight: 600; color: #9CA3AF; margin-top: 0.25rem;">dari 100 poin</span>
        </div>
      </div>

      <!-- KKTP Threshold Info -->
      <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.875rem; border-radius: 9999px; background: #F9FAFB; border: 1px solid #E5E7EB; font-size: 0.75rem; font-weight: 600; color: #4B5563;">
        <span>Standar KKTP: ≥ ${KUIS_CONFIG.passingGrade}</span>
        <span style="width: 4px; height: 4px; border-radius: 9999px; background: #D1D5DB;"></span>
        <span style="font-weight: 800; color: ${accentHex};">${isTuntas ? 'MEMENUHI' : 'BELUM MEMENUHI'}</span>
      </div>

      <!-- Pesan Evaluatif -->
      <div class="rounded-2xl ${isTuntas ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950' : 'bg-amber-50/80 border border-amber-200 text-amber-950'} text-xs sm:text-sm leading-relaxed" style="max-width: 640px; margin: 1.5rem auto; padding: 1.15rem 1.5rem;">
        ${isTuntas ? `
          <strong>Luar Biasa, ${studentName}!</strong> Pemahamanmu mengenai Sistem Pertahanan Keamanan Nasional dan Peran Indonesia di Dunia Internasional telah memenuhi standar kompetensi. Progress belajarmu telah otomatis diperbarui!
        ` : `
          <strong>Tetap Semangat, ${studentName}!</strong> Nilaimu (<strong>${skor}</strong>) belum mencapai batas ketuntasan minimal (≥ ${KUIS_CONFIG.passingGrade}). Jangan berkecil hati, kamu dapat mempelajari kembali modul materi dan mengulang kuis untuk meningkatkan pemahamanmu.
        `}
      </div>

      <!-- 4 Quick Stats Modern Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.875rem; max-width: 720px; margin: 1.5rem auto 0; text-align: left;">
        <div class="p-4 rounded-2xl bg-white border border-gray-200/90" style="box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem;">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Benar</span>
            <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">${ICONS.checkCircle}</span>
          </div>
          <div style="font-size: 1.625rem; line-height: 1.1; font-weight: 900; color: #059669;">
            ${benar} <span style="font-size: 0.75rem; font-weight: 600; color: #9CA3AF;">/ ${total}</span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white border border-gray-200/90" style="box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem;">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Salah</span>
            <span class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">${ICONS.crossCircle}</span>
          </div>
          <div style="font-size: 1.625rem; line-height: 1.1; font-weight: 900; color: #E11D48;">
            ${salah}
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white border border-gray-200/90" style="box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem;">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Waktu Habis</span>
            <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">${ICONS.timerAlert}</span>
          </div>
          <div style="font-size: 1.625rem; line-height: 1.1; font-weight: 900; color: #D97706;">
            ${tidakDijawab}
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-white border border-gray-200/90" style="box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem;">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Akurasi</span>
            <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">${ICONS.kktpBadge}</span>
          </div>
          <div style="font-size: 1.625rem; line-height: 1.1; font-weight: 900; color: #0E4632;">
            ${skor}%
          </div>
        </div>
      </div>

      <!-- Action Navigation Buttons -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid #F3F4F6;">
        ${isTuntas ? `
          <a href="#/mindmap" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-dark shadow-md hover:shadow-lg transition-all active:scale-95">
            <span>Lanjutkan ke Mind Map Digital</span>
            ${ICONS.arrowRight}
          </a>
          <button type="button" id="btn-retry-quiz" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs sm:text-sm border border-gray-300 shadow-xs transition-all active:scale-95 cursor-pointer">
            ${ICONS.refresh}
            <span>Coba Lagi (Tingkatkan Skor)</span>
          </button>
        ` : `
          <button type="button" id="btn-retry-quiz" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-secondary font-bold text-xs sm:text-sm hover:bg-accent-hover shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
            ${ICONS.refresh}
            <span>Ulangi Kuis Evaluasi Sekarang</span>
          </button>
          <a href="#/modul1" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-primary font-bold text-xs sm:text-sm border border-primary/30 shadow-xs transition-all">
            <span>Pelajari Modul 1 (Sishankamnas)</span>
          </a>
          <a href="#/modul2" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-primary font-bold text-xs sm:text-sm border border-primary/30 shadow-xs transition-all">
            <span>Pelajari Modul 2 (Peran Internasional)</span>
          </a>
        `}
      </div>
    </div>

    <!-- Review Pembahasan Lembar Jawaban -->
    <div class="glass-card p-6 sm:p-8 space-y-5">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/80 pb-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
            ${ICONS.clipboard}
            <span>Review Lembar Pembahasan Soal</span>
          </h3>
          <p class="text-xs text-gray-500 mt-0.5">Pelajari kembali alasan di balik setiap jawaban yang benar</p>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start sm:self-center">
          <button type="button" class="filter-review-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${state.activeFilter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}" data-filter="all">
            Semua (${total})
          </button>
          <button type="button" class="filter-review-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${state.activeFilter === 'incorrect' ? 'bg-white text-rose-700 shadow-xs' : 'text-gray-500 hover:text-rose-700'}" data-filter="incorrect">
            Perlu Diperbaiki (${salah + tidakDijawab})
          </button>
          <button type="button" class="filter-review-btn px-3 py-1 rounded-lg text-xs font-bold transition-all ${state.activeFilter === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500 hover:text-emerald-700'}" data-filter="correct">
            Benar (${benar})
          </button>
        </div>
      </div>

      <!-- List Soal & Pembahasan -->
      <div class="space-y-4">
        ${filteredAnswers.length === 0 ? `
          <div class="text-center py-8 text-gray-400 text-xs">
            Tidak ada nomor soal dalam kategori filter ini.
          </div>
        ` : filteredAnswers.map((ans, idx) => {
          const isCorrect = ans.isCorrect;
          const isTimeout = ans.isTimeout;
          const statusBg = isCorrect ? 'bg-emerald-50 border-emerald-200' : (isTimeout ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200');
          const badgeClass = isCorrect ? 'bg-emerald-100 text-emerald-800' : (isTimeout ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800');

          return `
            <div class="p-4 sm:p-5 rounded-xl border ${statusBg} space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs font-black text-gray-700">
                    ${ans.indexNomor}
                  </span>
                  <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">${ans.labelKategori || 'Pendidikan Pancasila'}</span>
                </div>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${badgeClass}">
                  ${isCorrect ? ICONS.checkSm : (isTimeout ? ICONS.timerSm : ICONS.crossSm)}
                  <span>${isCorrect ? 'Benar' : (isTimeout ? 'Waktu Habis' : 'Salah')}</span>
                </span>
              </div>

              <!-- Teks Soal -->
              <p class="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                ${ans.pertanyaan}
              </p>

              <!-- Perbandingan Jawaban Siswa & Kunci -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div class="p-2.5 rounded-lg bg-white/90 border border-gray-200">
                  <span class="text-[10px] text-gray-400 block font-bold uppercase">Jawaban Kamu:</span>
                  <span class="${isCorrect ? 'text-emerald-700 font-bold' : (isTimeout ? 'text-amber-700 font-medium' : 'text-rose-700 font-bold')}">
                    ${isTimeout ? '(Tidak Menjawab / Waktu Habis)' : `${letters[ans.selectedOptionIndex]}. ${ans.opsi[ans.selectedOptionIndex]}`}
                  </span>
                </div>
                <div class="p-2.5 rounded-lg bg-white/90 border border-emerald-300">
                  <span class="text-[10px] text-emerald-600 block font-bold uppercase">Kunci Jawaban Benar:</span>
                  <span class="text-emerald-900 font-bold">
                    ${letters[ans.jawabanBenarIndex]}. ${ans.opsi[ans.jawabanBenarIndex]}
                  </span>
                </div>
              </div>

              <!-- Pembahasan Rujukan -->
              <div class="p-3 rounded-lg bg-white/70 border border-gray-200/70 text-[11px] text-gray-600 leading-relaxed flex items-start gap-2">
                <span class="flex-shrink-0 mt-0.5 text-amber-600">${ICONS.lightbulbSm}</span>
                <div>
                  <strong class="text-gray-900 font-bold">Pembahasan:</strong> ${ans.penjelasan}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

function bindResultEvents() {
  // Tombol Coba Lagi
  const btnRetry = document.getElementById('btn-retry-quiz');
  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      startQuizSession();
    });
  }

  // Filter Review Soal
  const filterBtns = document.querySelectorAll('.filter-review-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter) {
        state.activeFilter = filter;
        updateView();
      }
    });
  });
}

/**
 * Animasi Counter Skor & Circular Progress Ring dari 0 sampai nilai target
 */
function animateScoreCounter(targetScore) {
  const displayEl = document.getElementById('score-counter-display');
  const ringEl = document.getElementById('score-ring-circle');
  if (!displayEl) return;

  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  if (targetScore <= 0) {
    displayEl.textContent = '0';
    if (ringEl) ringEl.style.strokeDashoffset = circumference.toFixed(2);
    return;
  }

  let current = 0;
  if (ringEl) ringEl.style.strokeDashoffset = circumference.toFixed(2);
  const stepTime = Math.max(15, Math.floor(1000 / targetScore));

  const counterInterval = setInterval(() => {
    current += 1;
    displayEl.textContent = current;
    if (ringEl) {
      const offset = circumference * (1 - current / 100);
      ringEl.style.strokeDashoffset = offset.toFixed(2);
    }
    if (current >= targetScore) {
      clearInterval(counterInterval);
      displayEl.textContent = targetScore;
      if (ringEl) {
        const finalOffset = circumference * (1 - targetScore / 100);
        ringEl.style.strokeDashoffset = finalOffset.toFixed(2);
      }
    }
  }, stepTime);
}

/**
 * Konfeti Selebrasi saat TUNTAS KKTP
 */
function triggerConfettiCelebration() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
      window.confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  } catch (err) {
    console.warn('Confetti effect error:', err);
  }
}
