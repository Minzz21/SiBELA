/**
 * SiBELA - Halaman Beranda (Modul SPA)
 * Desain bersih: tanpa badge dekoratif, TP, emoji, ikon kotak pastel,
 * progress ganda, gradien berat, atau glow berlebihan.
 * Ikon konsisten menggunakan Lucide stroke-width 1.5.
 */

import { getStorage, setStorage, STORAGE_KEYS, getProgressData, calculateProgress, showToast } from '../js/utils.js';
import { updateHeaderUserBadge } from '../js/app.js';
import { quotesBelaNegara, getRandomQuote } from '../data/quotes.js';

let activeQuote = getRandomQuote();

/* ====== SVG Ikon Lucide (stroke-width 1.5) ====== */
const IC = {
  shield:    `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`,
  globe:     `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>`,
  clipboard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg>`,
  network:   `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 0H3m9 6v-3m0 0v-3m0 3h3m-3 0H9"/></svg>`,
  quote:     `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>`,
  refresh:   `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  pencil:    `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg>`,
  arrow:     `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`,
  check:     `<svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  target:    `<svg class="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg>`,
  user:      `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>`,
};

/**
 * Render HTML Halaman Beranda
 */
export function render() {
  const namaSiswa     = getStorage(STORAGE_KEYS.NAMA, null);
  const progressData  = getProgressData();
  const progressPercent = calculateProgress();
  const completedCount  = Object.values(progressData).filter(Boolean).length;

  const modules = [
    { href: '#/modul1',  icon: IC.shield,    label: 'Modul 1',        title: 'Sishankamnas',               desc: 'Komponen pertahanan (Utama, Cadangan, Pendukung) dan analisis studi kasus nirmiliter.',          done: progressData.modul1,  ctaDone: 'Tinjau Ulang', ctaNew: 'Buka Modul'  },
    { href: '#/modul2',  icon: IC.globe,     label: 'Modul 2',        title: 'Peran Indonesia di Dunia',    desc: 'Peta geopolitik interaktif (ASEAN, PBB, G20, Misi Garuda) dan laporan validasi domain resmi.',    done: progressData.modul2,  ctaDone: 'Tinjau Ulang', ctaNew: 'Buka Modul'  },
    { href: '#/kuis',    icon: IC.clipboard, label: 'Kuis Evaluasi',  title: 'Uji Pemahaman',              desc: 'Bank soal interaktif, timer per nomor, umpan balik instan, dan skor KKTP.',                       done: progressData.kuis,    ctaDone: 'Coba Lagi',    ctaNew: 'Mulai Kuis'  },
    { href: '#/mindmap', icon: IC.network,   label: 'Mind Map',       title: 'Peta Gagasan Digital',       desc: 'Kanvas interaktif penyusunan gagasan bela negara dengan minimal 3 cabang utama.',                 done: progressData.mindmap, ctaDone: 'Buka Kembali', ctaNew: 'Buka Kanvas' },
  ];

  const stepItems = [
    { label: 'Modul 1',  done: progressData.modul1  },
    { label: 'Modul 2',  done: progressData.modul2  },
    { label: 'Kuis',     done: progressData.kuis    },
    { label: 'Mind Map', done: progressData.mindmap },
  ];

  return `
    <div class="page-enter space-y-6 sm:space-y-8">

      <!-- ===== HERO ===== -->
      <section>
        <div class="relative overflow-hidden rounded-2xl bg-secondary text-white px-6 pt-7 pb-6 sm:px-8 lg:px-10 sm:pt-8 sm:pb-0 border border-emerald-800/40 shadow-soft">
          <!-- Subtle Ambient Aura Elements -->
          <div class="hero-aura-1 absolute -top-24 -right-20 w-96 h-96 rounded-full bg-primary/40 blur-3xl pointer-events-none"></div>
          <div class="hero-aura-2 absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none"></div>

          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div class="max-w-xl lg:max-w-2xl sm:pb-7">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug text-white" id="beranda-greeting">
                  ${namaSiswa
                    ? `Halo, <span class="text-accent">${namaSiswa}</span>! Siap belajar hari ini?`
                    : `Sistem Interaktif <span class="text-accent">Bela Negara</span>`}
                </h1>    
                <button type="button" id="btn-open-modal-nama"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium
                         bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white
                         border border-white/15 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  title="Ubah nama panggilan">
                  ${IC.pencil}
                  <span>${namaSiswa ? 'Ubah nama' : 'Masukkan nama'}</span>
                </button>
              </div>

              <p class="text-emerald-200/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-lg">
                Media pembelajaran terpadu Pendidikan Pancasila Kelas X — Sishankamnas,
                diplomasi aktif Indonesia, dan mind map bela negara.
              </p>

              <div class="flex flex-wrap items-center gap-3">
                <a href="#/modul1"
                  class="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-secondary
                         font-bold text-xs sm:text-sm hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
                  <span>Mulai Belajar</span>
                  <span class="transition-transform duration-200 group-hover:translate-x-1">${IC.arrow}</span>
                </a>
                <a href="#/kuis"
                  class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl
                         bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm
                         border border-white/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
                  Kuis Evaluasi
                </a>
              </div>
            </div>

            <!-- Ilustrasi Tokoh Proklamator Kanan (Menyentuh ambang bawah hero secara proporsional) -->
            <div class="hidden md:flex justify-end items-end flex-shrink-0 self-end -mr-2 sm:-mr-4 lg:-mr-6">
              <img src="assets/images/proklamator.png" alt="Dwi-Tunggal Proklamator Indonesia - Soekarno & Hatta"
                   class="w-64 sm:w-72 lg:w-80 xl:w-[350px] h-auto object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)]
                          hover:scale-[1.02] transition-transform duration-300 pointer-events-none block -mb-0.5">
            </div>

          </div>
        </div>
      </section>

      <!-- ===== PROGRES BELAJAR ===== -->
      <section class="bg-white border border-gray-100/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-sm font-bold text-gray-900">Progres Capaian Pembelajaran</h2>
            <p class="text-xs text-gray-500 mt-0.5">${completedCount} dari 4 aktivitas selesai</p>
          </div>
          <span class="text-2xl font-black text-primary transition-all duration-500" id="beranda-progress-number">${progressPercent}%</span>
        </div>

        <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4 p-0.5">
          <div id="beranda-progress-bar"
            class="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-1000 ease-out"
            style="width: 0%">
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${stepItems.map(item => `
            <div class="flex items-center gap-1.5 text-xs ${item.done ? 'text-primary' : 'text-gray-400'} transition-colors duration-200">
              <span class="flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300
                           ${item.done ? 'bg-primary border-primary text-white scale-105 shadow-xs' : 'border-gray-300'}">
                ${item.done ? IC.check : ''}
              </span>
              <span class="font-medium truncate">${item.label}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ===== KUTIPAN MOTIVASI ===== -->
      <section class="bg-white border border-gray-100/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-2 flex-1 min-w-0" id="quote-container">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1">
              ${IC.quote}
              <span>Motivasi Bela Negara</span>
            </div>
            <blockquote class="text-base sm:text-lg font-bold text-gray-900 leading-snug transition-all duration-300" id="quote-text">
              "${activeQuote.teks}"
            </blockquote>
            <p class="text-xs font-semibold text-primary transition-all duration-300" id="quote-tokoh">— ${activeQuote.tokoh}</p>

            <div class="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2.5">
              ${IC.target}
              <div class="text-xs">
                <span class="font-bold text-gray-700 block mb-0.5">Tantangan Aksi Hari Ini</span>
                <span class="text-gray-600 leading-relaxed transition-all duration-300" id="quote-tantangan">${activeQuote.tantangan}</span>
              </div>
            </div>
          </div>

          <button type="button" id="btn-shuffle-quote"
            class="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-emerald-50/60
                   border border-gray-200 active:scale-90 transition-all duration-300 flex-shrink-0 cursor-pointer"
            title="Ganti kutipan">
            <span class="inline-block transition-transform duration-500" id="btn-shuffle-icon">
              ${IC.refresh}
            </span>
          </button>
        </div>
      </section>

      <!-- ===== KARTU MODUL ===== -->
      <section>
        <div class="mb-4">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Alur Modul Pembelajaran</h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">Pilih modul di bawah untuk mulai atau melanjutkan materi</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${modules.map(m => `
            <a href="${m.href}"
              class="group bg-white border border-gray-100 hover:border-primary/40
                     rounded-2xl p-5 flex flex-col justify-between
                     hover:-translate-y-1.5 hover:shadow-md transition-all duration-200">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-primary group-hover:scale-110 transition-transform duration-200 inline-block">${m.icon}</span>
                  ${m.done
                    ? `<span class="flex items-center gap-1 text-[10px] font-semibold text-primary bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                         ${IC.check}<span>Selesai</span>
                       </span>`
                    : ''}
                </div>
                <div class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">${m.label}</div>
                <h3 class="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors duration-200 leading-snug">${m.title}</h3>
                <p class="text-xs text-gray-500 leading-relaxed">${m.desc}</p>
              </div>
              <div class="flex items-center justify-between text-xs font-semibold text-primary mt-4 pt-3 border-t border-gray-100">
                <span>${m.done ? m.ctaDone : m.ctaNew}</span>
                <span class="transform group-hover:translate-x-1.5 transition-transform duration-200">${IC.arrow}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- ===== MODAL NAMA ===== -->
      <div id="modal-nama-overlay"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4
               transition-opacity duration-300 opacity-0 pointer-events-none">
        <div id="modal-nama-card"
          class="bg-white rounded-2xl max-w-sm w-full p-6 sm:p-8 shadow-xl
                 transform transition-all duration-300 scale-95">

          <div class="mb-5">
            <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              ${IC.user}
            </div>
            <h3 class="text-lg font-black text-gray-900">Siapa nama panggilanmu?</h3>
            <p class="text-xs text-gray-500 mt-1">Nama disimpan di perangkat ini untuk sapaan personal.</p>
          </div>

          <form id="form-input-nama" class="space-y-4">
            <div>
              <label for="input-nama-panggilan" class="block text-xs font-bold text-gray-600 mb-1.5">
                Nama Panggilan
              </label>
              <input
                type="text"
                id="input-nama-panggilan"
                placeholder="Contoh: Amin / Fatimah / Rian"
                maxlength="30"
                class="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200
                       text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary
                       focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-normal"
                autocomplete="off"
                value="${namaSiswa || ''}"
              >
              <p id="error-nama" class="hidden text-rose-600 text-xs mt-1.5 font-medium">
                Nama minimal 2 huruf ya.
              </p>
            </div>

            <div class="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                id="btn-close-modal-nama"
                class="${namaSiswa ? 'inline-flex' : 'hidden'} flex-1 items-center justify-center
                       px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700
                       text-xs font-bold transition-all cursor-pointer">
                Batal
              </button>
              <button
                type="submit"
                class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5
                       rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold
                       transition-all cursor-pointer active:scale-95">
                <span>Simpan &amp; Mulai</span>
                ${IC.arrow}
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
  const modalOverlay  = document.getElementById('modal-nama-overlay');
  const modalContent  = document.getElementById('modal-nama-card');
  const btnOpenModal  = document.getElementById('btn-open-modal-nama');
  const btnCloseModal = document.getElementById('btn-close-modal-nama');
  const formNama      = document.getElementById('form-input-nama');
  const inputNama     = document.getElementById('input-nama-panggilan');
  const errorNama     = document.getElementById('error-nama');
  const btnShuffle    = document.getElementById('btn-shuffle-quote');
  const progressBarEl = document.getElementById('beranda-progress-bar');

  // Animasi progress bar saat mount
  if (progressBarEl) {
    setTimeout(() => { progressBarEl.style.width = `${calculateProgress()}%`; }, 100);
  }

  // Buka modal
  const openModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    modalOverlay.classList.add('opacity-100', 'pointer-events-auto');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
    setTimeout(() => inputNama && inputNama.focus(), 150);
  };

  // Tutup modal
  const closeModal = () => {
    if (!modalOverlay || !modalContent) return;
    modalOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    modalOverlay.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    if (errorNama) errorNama.classList.add('hidden');
  };

  // Auto-buka modal jika belum ada nama
  if (!getStorage(STORAGE_KEYS.NAMA, null)) setTimeout(openModal, 300);

  if (btnOpenModal)  btnOpenModal.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  // Klik overlay untuk tutup
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
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

      setStorage(STORAGE_KEYS.NAMA, val);
      updateHeaderUserBadge();

      const greetingEl = document.getElementById('beranda-greeting');
      if (greetingEl) {
        greetingEl.innerHTML = `Halo, <span class="text-accent">${val}</span>! Siap belajar hari ini?`;
      }

      const btnSpan = btnOpenModal?.querySelector('span');
      if (btnSpan) btnSpan.textContent = 'Ubah nama panggilan';

      if (btnCloseModal) {
        btnCloseModal.classList.remove('hidden');
        btnCloseModal.classList.add('inline-flex');
      }

      closeModal();
      showToast(`Halo ${val}! Selamat datang di SiBELA.`, 'success');
    });
  }

  // Shuffle kutipan dengan smooth cross-fade & rotate
  if (btnShuffle) {
    let isShuffling = false;
    btnShuffle.addEventListener('click', () => {
      if (isShuffling) return;
      isShuffling = true;

      const qIcon    = document.getElementById('btn-shuffle-icon');
      const qText    = document.getElementById('quote-text');
      const qTokoh   = document.getElementById('quote-tokoh');
      const qTantang = document.getElementById('quote-tantangan');

      // Putar icon 360 derajat
      if (qIcon) {
        qIcon.classList.add('rotate-180');
      }

      // Fade out teks
      if (qText)    qText.classList.add('opacity-0', 'translate-y-1');
      if (qTokoh)   qTokoh.classList.add('opacity-0');
      if (qTantang) qTantang.classList.add('opacity-0');

      setTimeout(() => {
        activeQuote = getRandomQuote();
        if (qText)    qText.textContent    = `"${activeQuote.teks}"`;
        if (qTokoh)   qTokoh.textContent   = `— ${activeQuote.tokoh}`;
        if (qTantang) qTantang.textContent = activeQuote.tantangan;

        // Fade in kembali teks
        if (qText)    qText.classList.remove('opacity-0', 'translate-y-1');
        if (qTokoh)   qTokoh.classList.remove('opacity-0');
        if (qTantang) qTantang.classList.remove('opacity-0');

        setTimeout(() => {
          if (qIcon) qIcon.classList.remove('rotate-180');
          isShuffling = false;
        }, 300);
      }, 200);
    });
  }
}
