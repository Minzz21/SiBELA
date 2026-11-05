/**
 * SiBELA - Modul 1: Sishankamnas (TP 10.D.6)
 * Desain Mobile presisi Figma Screen 2 & Web Layout responsif
 * Skema Warna: Forest Green (#0E4632), Golden Amber (#E5A024), Cream Warm (#FAF7EE)
 */

import { getStorage, setStorage, getProgressData, setProgressStep, showToast } from '../js/utils.js';

const STORAGE_KEY_VIDEO_WATCHED = 'sibela_modul1_video_watched';

/* ====== SVG Ikon Lucide (stroke-width 1.75) ====== */
const IC = {
  play:       `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
  pause:      `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  replay:     `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  volumeUp:   `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z"/></svg>`,
  volumeMute: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-3.75 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z"/></svg>`,
  fullscreen: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15m5.25-11.25v4.5m0-4.5h-4.5m4.5 0L15 9"/></svg>`,
  shield:     `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`,
  check:      `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  chevron:    `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>`,
  info:       `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>`,
  arrowRight: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`,
  arrowLeft:  `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>`,
  badgeCheck: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>`,
  usersGroup: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.001M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>`,
  handHeart:  `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>`,
  fileEdit:   `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>`,
  eye:        `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
  threatHoaks: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>`,
  threatDrug:  `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>`,
  threatRadical:`<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285ZM12 15.75h.008v.008H12v-.008Z"/></svg>`,
  threatNature: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/></svg>`,
  threatSocial: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>`,
};

/**
 * Render HTML Halaman Modul 1
 */
export function render() {
  const isVideoWatched = getStorage(STORAGE_KEY_VIDEO_WATCHED, false);
  const progressData   = getProgressData();
  const studiKasusData = getStorage('sibela_studikasus', null);

  return `
    <div class="page-enter max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-0 sm:pt-4">

      <!-- ================= UNIFIED CURVED HEADER (CONSISTENT ON MOBILE & WEB) ================= -->
      <header class="bg-[#0E4632] rounded-b-[2.5rem] lg:rounded-b-[3.5rem] px-5 sm:px-8 pt-5 sm:pt-7 pb-7 sm:pb-9 text-white shadow-md relative overflow-hidden -mx-4 sm:-mx-6 mb-6 sm:mb-8">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <!-- Back Link (Figma Screen 2) -->
            <a href="#/" class="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-bold transition-colors py-1 self-start">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              <span>Materi 1</span>
            </a>
            
            <!-- Title & Subtitle (100% Konsisten di Web & Mobile) -->
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1.5 tracking-tight leading-tight">
              Sishankamnas Semesta
            </h1>
            
          </div>

          <div class="hidden sm:flex items-center gap-2 self-start sm:self-center">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-100 border border-white/20 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#E5A024] animate-pulse"></span>
              <span>Tahap 1 dari 4: Sishankamnas</span>
            </span>
          </div>
        </div>
      </header>

      <!-- ================= 3. SUB-TAB PILL NAVIGATION (FIGMA SCREEN 2) ================= -->
      <div class="flex items-center justify-center mb-6">
        <div class="inline-flex p-1 bg-gray-200/70 rounded-full gap-1 shadow-inner">
          <button
            type="button"
            id="tab-btn-video"
            class="tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#0E4632] text-white shadow-xs cursor-pointer"
            data-tab="video"
          >
            Video
          </button>
          <button
            type="button"
            id="tab-btn-infografik"
            class="tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all bg-white text-gray-700 hover:text-[#0E4632] cursor-pointer"
            data-tab="infografik"
          >
            Infografik
          </button>
          <button
            type="button"
            id="tab-btn-studikasus"
            class="tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all bg-white text-gray-700 hover:text-[#0E4632] cursor-pointer"
            data-tab="studikasus"
          >
            Studi Kasus
          </button>
        </div>
      </div>

      <!-- ================= TAB CONTENT 1: VIDEO (DEFAULT ACTIVE) ================= -->
      <section id="tab-panel-video" class="tab-panel space-y-6">

        <!-- Dark Green Video Player Card (Screen 2) -->
        <div class="bg-[#0A3D2C] rounded-3xl p-4 sm:p-5 border-2 border-emerald-950 shadow-card text-white">
          
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#E5A024] animate-pulse"></span>
              <span class="text-xs font-black uppercase tracking-wider text-emerald-200">Video 1: Pertahanan Semesta</span>
            </div>

          </div>

          <!-- Video Container -->
          <div class="relative rounded-2xl overflow-hidden bg-black shadow-inner group/player">
            
            <video
              id="modul1-video"
              class="w-full aspect-video bg-black cursor-pointer block"
              preload="metadata"
              playsinline
            >
              <source src="assets/videos/sishankamnas.mp4" type="video/mp4">
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>

            <!-- Big Golden Play Button in Center (Screen 2) -->
            <button
              type="button"
              id="video-big-play-btn"
              class="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E5A024] text-[#0E4632] hover:bg-amber-400 active:scale-90 flex items-center justify-center shadow-floating border-3 border-white/90 backdrop-blur-sm transition-all duration-300 z-20 cursor-pointer group/bigbtn"
              aria-label="Putar video"
            >
              <svg class="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5 group-hover/bigbtn:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3a1 1 0 0 0-1.54.84z"/>
              </svg>
            </button>

            <!-- 80% Watched Banner Overlay -->
            <div
              id="video-complete-banner"
              class="${isVideoWatched ? 'flex' : 'hidden'} absolute top-3 right-3 z-20 items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold border border-emerald-400 shadow-lg"
            >
              ${IC.check}
              <span>Target Tonton Tercapai! (80%)</span>
            </div>

            <!-- Custom Control Bar -->
            <div
              id="video-controls"
              class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 sm:px-5 py-2.5 sm:py-3.5 transition-opacity duration-300 opacity-95 group-hover/player:opacity-100 flex flex-col gap-2"
            >
              <!-- Progress Scrubber -->
              <div class="relative w-full flex items-center group/scrubber cursor-pointer">
                <input
                  type="range"
                  id="video-seek-bar"
                  min="0"
                  max="100"
                  value="0"
                  step="0.1"
                  class="w-full h-1.5 group-hover/scrubber:h-2 bg-white/30 rounded-full appearance-none accent-[#E5A024] cursor-pointer transition-all"
                />
              </div>

              <!-- Button Row -->
              <div class="flex items-center justify-between text-white text-xs">
                <!-- Left: Play/Pause, Replay, Time Display -->
                <div class="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    id="video-play-btn"
                    class="p-1.5 rounded-full hover:bg-white/20 active:scale-90 transition-all cursor-pointer text-[#E5A024]"
                    title="Putar / Jeda (Spasi)"
                  >
                    <span id="video-play-icon">${IC.play}</span>
                  </button>

                  <button
                    type="button"
                    id="video-replay-btn"
                    class="p-1.5 rounded-full hover:bg-white/20 active:scale-90 transition-all cursor-pointer text-white/80 hover:text-white"
                    title="Ulangi 10 Detik"
                  >
                    ${IC.replay}
                  </button>

                  <div class="font-mono text-[10px] sm:text-xs text-emerald-100/90 whitespace-nowrap">
                    <span id="video-current-time">00:00</span> / <span id="video-duration-time">00:00</span>
                  </div>
                </div>

                <!-- Right: Volume, Speed, Fullscreen -->
                <div class="flex items-center gap-2 sm:gap-3">
                  <div class="flex items-center gap-1 group/volume">
                    <button
                      type="button"
                      id="video-mute-btn"
                      class="p-1 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-all cursor-pointer"
                      title="Bisu / Nyalakan Suara"
                    >
                      <span id="video-volume-icon">${IC.volumeUp}</span>
                    </button>
                    <input
                      type="range"
                      id="video-volume-slider"
                      min="0"
                      max="1"
                      step="0.05"
                      value="1"
                      class="w-12 sm:w-16 h-1 bg-white/30 rounded-full appearance-none accent-[#E5A024] cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    id="video-speed-btn"
                    class="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-bold text-[#E5A024] transition-all cursor-pointer"
                    title="Kecepatan Video"
                  >
                    <span id="video-speed-label">1.0x</span>
                  </button>

                  <button
                    type="button"
                    id="video-fullscreen-btn"
                    class="p-1.5 rounded-full hover:bg-white/20 active:scale-90 transition-all cursor-pointer text-white"
                    title="Layar Penuh"
                  >
                    ${IC.fullscreen}
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- Video Takeaway Note -->
          <div class="mt-3.5 pt-3 border-t border-emerald-900/80 flex items-start gap-2.5 text-xs text-emerald-100/90 leading-relaxed">
            <span class="text-[#E5A024] mt-0.5 flex-shrink-0">${IC.info}</span>
            <span>
              <strong>Poin Kunci Video:</strong> Berdasarkan <strong>Pasal 30 Ayat (2) UUD 1945</strong>, pertahanan negara diselenggarakan melalui Sishankamrata dengan tiga ciri: <em>Kerakyatan</em>, <em>Kesemestaan</em>, dan <em>Kewilayahan</em>.
            </span>
          </div>

        </div>

        <!-- ================= SECTION: TIGA KOMPONEN SISHANKAMNAS (SCREEN 2) ================= -->
        <div class="space-y-3 pt-2">
          
          <div class="flex items-center justify-between">
            <h2 class="text-base sm:text-lg font-black text-gray-900 tracking-tight">
              Tiga komponen Sishankamnas
            </h2>
            <button
              type="button"
              class="btn-goto-infografik text-xs font-bold text-[#0E4632] hover:underline cursor-pointer"
            >
              Lihat Infografik →
            </button>
          </div>

          <!-- 3 Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            <!-- Card 1: Utama -->
            <article class="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all overflow-hidden flex flex-col justify-between">
              <div class="p-4 sm:p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Utama
                  </span>
                  <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    ${IC.badgeCheck}
                  </div>
                </div>
                <h3 class="text-sm font-black text-gray-900">TNI (AD, AL, AU)</h3>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Kekuatan militer profesional garda terdepan siap sedia menghadapi agresi bersenjata.
                </p>

                <!-- Accordion Detail -->
                <div id="quick-detail-1" class="hidden mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <p><strong>Tugas Pokok:</strong> OMP (Operasi Militer Perang) &amp; OMSP (Bencana, Perbatasan, Misi Garuda PBB).</p>
                  <p><strong>Dasar Hukum:</strong> UU No. 3/2002 &amp; UU No. 34/2004.</p>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card w-full py-2.5 px-4 bg-emerald-50/50 hover:bg-emerald-50 text-[11px] font-bold text-emerald-800 border-t border-emerald-100/60 flex items-center justify-between transition-colors cursor-pointer"
                data-target="quick-detail-1"
              >
                <span class="btn-expand-label">Ketuk detail</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </article>

            <!-- Card 2: Cadangan -->
            <article class="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all overflow-hidden flex flex-col justify-between">
              <div class="p-4 sm:p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900">
                    Cadangan
                  </span>
                  <div class="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                    ${IC.usersGroup}
                  </div>
                </div>
                <h3 class="text-sm font-black text-gray-900">Komcad &amp; Menwa</h3>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Sumber daya nasional terlatih yang disiapkan sukarela untuk mobilisasi perbesaran komponen utama.
                </p>

                <!-- Accordion Detail -->
                <div id="quick-detail-2" class="hidden mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <p><strong>Sifat:</strong> Sukarela saat mendaftar, wajib disiplin militer saat mobilisasi.</p>
                  <p><strong>Dasar Hukum:</strong> UU No. 23/2019 (PSDN). Mobilisasi oleh Presiden dengan persetujuan DPR.</p>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card w-full py-2.5 px-4 bg-amber-50/50 hover:bg-amber-50 text-[11px] font-bold text-amber-900 border-t border-amber-100/60 flex items-center justify-between transition-colors cursor-pointer"
                data-target="quick-detail-2"
              >
                <span class="btn-expand-label">Ketuk detail</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </article>

            <!-- Card 3: Pendukung -->
            <article class="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all overflow-hidden flex flex-col justify-between">
              <div class="p-4 sm:p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                    Pendukung
                  </span>
                  <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                    ${IC.handHeart}
                  </div>
                </div>
                <h3 class="text-sm font-black text-gray-900">Warga, SDA &amp; Sarpras</h3>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Seluruh warga negara, logistik alam/buatan, industri strategis, serta sarana prasarana penunjang.
                </p>

                <!-- Accordion Detail -->
                <div id="quick-detail-3" class="hidden mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                  <p><strong>5 Segmen:</strong> Warga Negara, Sumber Daya Alam, Sumber Daya Buatan, Sarana Prasarana, dan Dana Moneter.</p>
                  <p><strong>Contoh:</strong> PMI, BASARNAS, pelajar madrasah, ketahanan pangan &amp; energi.</p>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card w-full py-2.5 px-4 bg-rose-50/50 hover:bg-rose-50 text-[11px] font-bold text-rose-800 border-t border-rose-100/60 flex items-center justify-between transition-colors cursor-pointer"
                data-target="quick-detail-3"
              >
                <span class="btn-expand-label">Ketuk detail</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </article>

          </div>
        </div>

        <!-- ================= SECTION: REFLEKSI HUBBUL WATHAN (SCREEN 2) ================= -->
        <div class="bg-[#EBF7F0] border-l-4 border-[#0E4632] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#0E4632] text-[#E5A024] flex items-center justify-center flex-shrink-0 mt-0.5">
              ${IC.handHeart}
            </div>
            <div class="flex-grow">
              <h3 class="text-xs sm:text-sm font-black text-[#0E4632]">Refleksi Hubbul Wathan</h3>
              <p class="text-xs text-gray-700 mt-1 leading-relaxed">
                Menjaga negeri adalah wujud cinta tanah air. Aksi nyata apa yang bisa kamu lakukan hari ini di lingkungan sekolah dan tempat tinggalmu?
              </p>
              <button
                type="button"
                class="btn-goto-studikasus mt-2 inline-flex items-center gap-1 text-xs font-black text-[#0E4632] hover:text-emerald-900 hover:underline cursor-pointer"
              >
                <span>Tulis aksi nyata di Studi Kasus</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ================= NAVIGATION FOOTER (SCREEN 2) ================= -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200/80">
          <a
            href="#/"
            class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs transition-all hover:-translate-x-0.5"
          >
            <span>◀ Sebelumnya</span>
          </a>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="btn-goto-infografik inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#0E4632] text-xs font-bold border border-emerald-300 shadow-xs transition-all cursor-pointer"
            >
              <span>Infografik</span>
              <span>→</span>
            </button>
            <a
              href="#/kuis"
              class="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-[#0E4632] text-xs font-black shadow-md hover:shadow-lg transition-all hover:translate-x-0.5 active:scale-95"
            >
              <span>Lanjut Kuis ▶</span>
            </a>
          </div>
        </div>

      </section>

      <!-- ================= TAB CONTENT 2: INFOGRAFIK ================= -->
      <section id="tab-panel-infografik" class="tab-panel hidden space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A024] mb-0.5">
              <span class="w-3.5 h-0.5 bg-[#E5A024]"></span>
              <span>Aktivitas 2 • Infografik Interaktif</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Tiga Komponen Pertahanan &amp; Tiga Ciri Sishankamrata
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-1">
              Pelajari dasar hukum, mandat tugas, serta skema pelibatan warga negara dalam pertahanan semesta:
            </p>
          </div>

          <button
            type="button"
            id="btn-toggle-all-cards"
            class="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-secondary hover:bg-gray-50 border border-gray-200 shadow-xs transition-all cursor-pointer"
          >
            <span>Buka / Tutup Semua Detail</span>
            ${IC.chevron}
          </button>
        </div>

        <!-- 3 Ciri Sishankamrata Banner Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-1">Ciri 1</span>
            <h3 class="text-sm font-black text-emerald-950">Kerakyatan</h3>
            <p class="text-xs text-emerald-900/80 mt-1 leading-relaxed">
              Orientasi pertahanan negara diabdikan oleh, bersama, dan sebesar-besarnya untuk kepentingan seluruh rakyat Indonesia.
            </p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <span class="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-1">Ciri 2</span>
            <h3 class="text-sm font-black text-amber-950">Kesemestaan</h3>
            <p class="text-xs text-amber-900/80 mt-1 leading-relaxed">
              Seluruh sumber daya nasional (manusia, alam, buatan, sarpras) didayagunakan secara terintegrasi untuk ketahanan bangsa.
            </p>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800 block mb-1">Ciri 3</span>
            <h3 class="text-sm font-black text-emerald-950">Kewilayahan</h3>
            <p class="text-xs text-emerald-900/80 mt-1 leading-relaxed">
              Gelar kekuatan pertahanan dilaksanakan menyebar di seluruh kepulauan NKRI sesuai kondisi geografis sebagai negara maritim.
            </p>
          </div>
        </div>

        <!-- Full Detail 3 Components Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Card Utama Full -->
          <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden border-t-4 border-t-emerald-600">
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  ${IC.badgeCheck}
                </div>
                <div>
                  <div class="text-[10px] font-black uppercase tracking-wider text-emerald-700">Garda Terdepan</div>
                  <h3 class="text-base font-black text-gray-900">Komponen Utama</h3>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Kekuatan militer profesional yang dipersiapkan langsung dan siap sedia menghadapi segala bentuk agresi bersenjata.
              </p>
            </div>

            <div class="px-5 py-2 bg-emerald-50/60 border-y border-emerald-100 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-md bg-white text-emerald-800 text-[10px] font-bold border border-emerald-200">TNI (AD, AL, AU)</span>
              <span class="px-2 py-0.5 rounded-md bg-white text-secondary text-[10px] font-bold border border-emerald-200">Polri (Kamtibmas)</span>
            </div>

            <div class="p-5 pt-3 flex-grow flex flex-col justify-between">
              <div id="card-detail-1" class="hidden space-y-2.5 pt-2 text-xs text-gray-700 leading-relaxed border-t border-gray-100">
                <div>
                  <span class="font-bold text-gray-900 block">Tugas Pokok:</span>
                  <ul class="list-disc list-inside space-y-1 text-gray-600 pl-1 mt-1">
                    <li>Operasi Militer untuk Perang (OMP).</li>
                    <li>Operasi Militer Selain Perang (OMSP): penanggulangan bencana alam, perbatasan, dan Misi Perdamaian Garuda PBB.</li>
                  </ul>
                </div>
                <div>
                  <span class="font-bold text-gray-900 block">Dasar Regulasi:</span>
                  <p class="text-gray-600">UU No. 3 Tahun 2002 &amp; UU No. 34 Tahun 2004 tentang TNI.</p>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card mt-3 inline-flex items-center justify-between w-full pt-2.5 border-t border-gray-100 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                data-target="card-detail-1"
              >
                <span class="btn-expand-label">Lihat Selengkapnya</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </div>
          </article>

          <!-- Card Cadangan Full -->
          <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden border-t-4 border-t-[#E5A024]">
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                  ${IC.usersGroup}
                </div>
                <div>
                  <div class="text-[10px] font-black uppercase tracking-wider text-amber-800">Kekuatan Pengganda</div>
                  <h3 class="text-base font-black text-gray-900">Komponen Cadangan</h3>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Sumber daya nasional yang disiapkan dan dilatih secara sukarela untuk dimobilisasi memperbesar Komponen Utama.
              </p>
            </div>

            <div class="px-5 py-2 bg-amber-50/60 border-y border-amber-100 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-md bg-white text-amber-900 text-[10px] font-bold border border-amber-200">Warga Terlatih (Komcad)</span>
              <span class="px-2 py-0.5 rounded-md bg-white text-amber-900 text-[10px] font-bold border border-amber-200">Resimen Mahasiswa</span>
            </div>

            <div class="p-5 pt-3 flex-grow flex flex-col justify-between">
              <div id="card-detail-2" class="hidden space-y-2.5 pt-2 text-xs text-gray-700 leading-relaxed border-t border-gray-100">
                <div>
                  <span class="font-bold text-gray-900 block">Sifat Keikutsertaan:</span>
                  <p class="text-gray-600 mt-1">Sukarela saat mendaftar, wajib patuh disiplin militer saat pelatihan dasar dan masa mobilisasi.</p>
                </div>
                <div>
                  <span class="font-bold text-gray-900 block">Mobilisasi:</span>
                  <p class="text-gray-600">Hanya dapat dimobilisasi Presiden RI atas persetujuan DPR.</p>
                </div>
                <div>
                  <span class="font-bold text-gray-900 block">Dasar Regulasi:</span>
                  <p class="text-gray-600">UU No. 23 Tahun 2019 tentang PSDN untuk Pertahanan Negara.</p>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card mt-3 inline-flex items-center justify-between w-full pt-2.5 border-t border-gray-100 text-xs font-bold text-amber-900 hover:text-amber-950 transition-colors cursor-pointer"
                data-target="card-detail-2"
              >
                <span class="btn-expand-label">Lihat Selengkapnya</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </div>
          </article>

          <!-- Card Pendukung Full -->
          <article class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden border-t-4 border-t-rose-500">
            <div class="p-5">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0">
                  ${IC.handHeart}
                </div>
                <div>
                  <div class="text-[10px] font-black uppercase tracking-wider text-rose-700">Seluruh Daya Bangsa</div>
                  <h3 class="text-base font-black text-gray-900">Komponen Pendukung</h3>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Seluruh warga negara, kekayaan alam, industri strategis, serta sarana prasarana yang memperkuat pertahanan.
              </p>
            </div>

            <div class="px-5 py-2 bg-rose-50/60 border-y border-rose-100 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-md bg-white text-rose-800 text-[10px] font-bold border border-rose-200">PMI &amp; Tenaga Medis</span>
              <span class="px-2 py-0.5 rounded-md bg-white text-rose-800 text-[10px] font-bold border border-rose-200">BASARNAS &amp; Pelajar</span>
            </div>

            <div class="p-5 pt-3 flex-grow flex flex-col justify-between">
              <div id="card-detail-3" class="hidden space-y-2.5 pt-2 text-xs text-gray-700 leading-relaxed border-t border-gray-100">
                <div>
                  <span class="font-bold text-gray-900 block">5 Segmen Pendukung:</span>
                  <ul class="list-disc list-inside space-y-1 text-gray-600 pl-1 mt-1">
                    <li><strong>Warga Negara:</strong> Garda ketertiban, tenaga medis, relawan.</li>
                    <li><strong>Sumber Daya Alam:</strong> Pangan, energi, air, logistik nasional.</li>
                    <li><strong>Sumber Daya Buatan:</strong> Industri manufaktur &amp; teknologi.</li>
                    <li><strong>Sarpras:</strong> Jalan tol, pelabuhan, bandara, rumah sakit.</li>
                    <li><strong>Dana Moneter:</strong> Anggaran belanja dan devisa negara.</li>
                  </ul>
                </div>
              </div>

              <button
                type="button"
                class="btn-expand-card mt-3 inline-flex items-center justify-between w-full pt-2.5 border-t border-gray-100 text-xs font-bold text-rose-800 hover:text-rose-950 transition-colors cursor-pointer"
                data-target="card-detail-3"
              >
                <span class="btn-expand-label">Lihat Selengkapnya</span>
                <span class="btn-expand-icon transform transition-transform duration-200">${IC.chevron}</span>
              </button>
            </div>
          </article>

        </div>

        <!-- Action Row -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            class="btn-goto-video inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs cursor-pointer"
          >
            <span>◀ Kembali ke Video</span>
          </button>
          <button
            type="button"
            class="btn-goto-studikasus inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0E4632] hover:bg-[#062B20] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Lanjut ke Studi Kasus</span>
            ${IC.arrowRight}
          </button>
        </div>

      </section>

      <!-- ================= TAB CONTENT 3: STUDI KASUS ================= -->
      <section id="tab-panel-studikasus" class="tab-panel hidden space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A024] mb-0.5">
              <span class="w-3.5 h-0.5 bg-[#E5A024]"></span>
              <span>Aktivitas 3 • Studi Kasus Lokal</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Analisis Ancaman Nirmiliter di Lingkungan Sekitar
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Bela negara di era modern tidak hanya angkat senjata. Pilih salah satu kategori ancaman nirmiliter non-fisik di bawah, identifikasi contoh nyata di sekitarmu, dan rumuskan solusi aksi bela negara!
            </p>
          </div>

          <div id="badge-studikasus-status">
            ${studiKasusData
              ? `<span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                   ${IC.check} Jawaban Tersimpan
                 </span>`
              : `<span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                   Wajib Diisi (Min. 50 Karakter)
                 </span>`
            }
          </div>
        </div>

        <!-- Saved Answer Preview Card -->
        <div id="studikasus-saved-card" class="${studiKasusData ? 'block' : 'hidden'} bg-[#0E4632] text-white rounded-3xl p-6 sm:p-8 shadow-card border border-emerald-800/80 relative overflow-hidden">
          <div class="relative z-10 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/80 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#E5A024]"></span>
                <span class="text-xs font-bold uppercase tracking-wider text-[#E5A024]">Hasil Analisis Studi Kasus Anda</span>
              </div>
              <span class="text-[11px] text-emerald-300/80 font-mono" id="saved-timestamp">
                ${studiKasusData?.timestamp ? new Date(studiKasusData.timestamp).toLocaleString('id-ID') : ''}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div class="bg-white/10 rounded-2xl p-4 border border-white/15 md:col-span-1">
                <span class="text-emerald-200 font-semibold block mb-1">Kategori Ancaman:</span>
                <span class="text-white font-bold text-sm block" id="saved-kategori-label">
                  ${studiKasusData?.kategori_label || '-'}
                </span>
              </div>
              <div class="bg-white/10 rounded-2xl p-4 border border-white/15 md:col-span-2">
                <span class="text-emerald-200 font-semibold block mb-1">Contoh Temuan di Lingkungan:</span>
                <p class="text-emerald-100 leading-relaxed italic" id="saved-contoh-text">
                  "${studiKasusData?.contoh_ancaman || '-'}"
                </p>
              </div>
            </div>

            <div class="bg-white/10 rounded-2xl p-4 border border-white/15 text-xs">
              <span class="text-[#E5A024] font-semibold block mb-1">Usulan Solusi Bela Negara:</span>
              <p class="text-white leading-relaxed font-medium" id="saved-solusi-text">
                "${studiKasusData?.solusi || '-'}"
              </p>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p class="text-[11px] text-emerald-200/80">
                Data tersimpan di perangkat dan siap dinilai oleh guru melalui Portal Guru.
              </p>
              <button
                type="button"
                id="btn-edit-studikasus"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-all cursor-pointer active:scale-95"
              >
                ${IC.fileEdit}
                <span>Edit Jawaban</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Interactive Form -->
        <form id="form-studikasus" class="${studiKasusData ? 'hidden' : 'block'} bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          
          <!-- 1. Kategori Selection -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                Langkah 1: Pilih Kategori Ancaman Nirmiliter <span class="text-rose-500">*</span>
              </label>
              <span class="text-[11px] text-gray-500 hidden sm:inline">Pilih salah satu persoalan non-militer</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3" id="category-selector-group">
              
              <!-- Hoaks -->
              <label class="category-card relative flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 cursor-pointer transition-all duration-200 select-none sm:col-span-1 lg:col-span-2">
                <input type="radio" name="kategori_ancaman" value="hoaks" data-label="Hoaks &amp; Disinformasi Digital" class="sr-only" ${studiKasusData?.kategori === 'hoaks' || (!studiKasusData) ? 'checked' : ''}>
                <div class="flex items-start gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ${IC.threatHoaks}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Hoaks &amp; Disinformasi</span>
                      <span class="category-badge-selected hidden px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-white">Terpilih</span>
                    </div>
                    <span class="text-[11px] text-gray-500 leading-snug block mt-1">Penyebaran kabar bohong, judi online, dan adu domba medsos.</span>
                  </div>
                </div>
                <div class="category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5"></div>
              </label>

              <!-- Narkoba -->
              <label class="category-card relative flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 cursor-pointer transition-all duration-200 select-none sm:col-span-1 lg:col-span-2">
                <input type="radio" name="kategori_ancaman" value="narkoba" data-label="Penyalahgunaan Narkoba" class="sr-only" ${studiKasusData?.kategori === 'narkoba' ? 'checked' : ''}>
                <div class="flex items-start gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ${IC.threatDrug}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Penyalahgunaan Narkoba</span>
                      <span class="category-badge-selected hidden px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-white">Terpilih</span>
                    </div>
                    <span class="text-[11px] text-gray-500 leading-snug block mt-1">Peredaran zat adiktif perusak mental dan fisik generasi muda.</span>
                  </div>
                </div>
                <div class="category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5"></div>
              </label>

              <!-- Intoleransi -->
              <label class="category-card relative flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 cursor-pointer transition-all duration-200 select-none sm:col-span-1 lg:col-span-2">
                <input type="radio" name="kategori_ancaman" value="intoleransi" data-label="Intoleransi &amp; Radikalisme" class="sr-only" ${studiKasusData?.kategori === 'intoleransi' ? 'checked' : ''}>
                <div class="flex items-start gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ${IC.threatRadical}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Intoleransi &amp; Ekstremisme</span>
                      <span class="category-badge-selected hidden px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-white">Terpilih</span>
                    </div>
                    <span class="text-[11px] text-gray-500 leading-snug block mt-1">Sikap memaksakan kehendak dan memecah kerukunan antarwarga.</span>
                  </div>
                </div>
                <div class="category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5"></div>
              </label>

              <!-- Lingkungan -->
              <label class="category-card relative flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 cursor-pointer transition-all duration-200 select-none sm:col-span-1 lg:col-span-3">
                <input type="radio" name="kategori_ancaman" value="lingkungan" data-label="Kerusakan Lingkungan" class="sr-only" ${studiKasusData?.kategori === 'lingkungan' ? 'checked' : ''}>
                <div class="flex items-start gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ${IC.threatNature}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Kerusakan Lingkungan</span>
                      <span class="category-badge-selected hidden px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-white">Terpilih</span>
                    </div>
                    <span class="text-[11px] text-gray-500 leading-snug block mt-1">Pembalakan liar, pencemaran sungai/laut, dan krisis sampah lokal.</span>
                  </div>
                </div>
                <div class="category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5"></div>
              </label>

              <!-- Kesenjangan -->
              <label class="category-card relative flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60 cursor-pointer transition-all duration-200 select-none sm:col-span-2 lg:col-span-3">
                <input type="radio" name="kategori_ancaman" value="kesenjangan" data-label="Kemiskinan &amp; Kesenjangan Sosial" class="sr-only" ${studiKasusData?.kategori === 'kesenjangan' ? 'checked' : ''}>
                <div class="flex items-start gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    ${IC.threatSocial}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Kemiskinan &amp; Kesenjangan</span>
                      <span class="category-badge-selected hidden px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-white">Terpilih</span>
                    </div>
                    <span class="text-[11px] text-gray-500 leading-snug block mt-1">Anak putus sekolah, ketimpangan fasilitas, dan kerentanan ekonomi warga.</span>
                  </div>
                </div>
                <div class="category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5"></div>
              </label>

            </div>
          </div>

          <!-- 2. Textarea Deskripsi Temuan -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="input-contoh-ancaman" class="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Langkah 2: Deskripsi Contoh Nyata di Sekitar <span class="text-rose-500">*</span>
              </label>
              <span id="char-counter-contoh" class="text-[11px] font-mono text-gray-400">
                0 / 50 min. karakter
              </span>
            </div>
            <textarea
              id="input-contoh-ancaman"
              rows="3"
              placeholder="Ceritakan kejadian nyata atau situasi yang pernah kamu lihat langsung di lingkungan madrasah, desa, atau media sosial yang mencerminkan ancaman kategori di atas..."
              class="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-secondary focus:bg-white transition-all placeholder:text-gray-400 leading-relaxed"
            >${studiKasusData?.contoh_ancaman || ''}</textarea>
            <p id="error-contoh" class="hidden text-rose-600 text-xs mt-1 font-medium">
              Harap jelaskan minimal 50 karakter agar analisis lebih berbobot.
            </p>
          </div>

          <!-- 3. Textarea Usulan Solusi -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="input-solusi-ancaman" class="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Langkah 3: Gagasan Solusi Aksi Bela Negara <span class="text-rose-500">*</span>
              </label>
              <span id="char-counter-solusi" class="text-[11px] font-mono text-gray-400">
                0 / 50 min. karakter
              </span>
            </div>
            <textarea
              id="input-solusi-ancaman"
              rows="3"
              placeholder="Sebagai pelajar dan warga negara, tindakan konkret apa yang dapat kamu dan teman-temanmu lakukan untuk mencegah atau mengatasi persoalan tersebut? (Contoh: kampanye literasi digital, gotong royong, dll)"
              class="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:border-secondary focus:bg-white transition-all placeholder:text-gray-400 leading-relaxed"
            >${studiKasusData?.solusi || ''}</textarea>
            <p id="error-solusi" class="hidden text-rose-600 text-xs mt-1 font-medium">
              Harap rumuskan usulan solusi minimal 50 karakter.
            </p>
          </div>

          <!-- Live Preview Box -->
          <div id="preview-box" class="hidden bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3">
            <div class="flex items-center justify-between border-b border-gray-200 pb-2">
              <span class="text-xs font-bold text-gray-700 uppercase tracking-wider">Pratinjau Lembar Studi Kasus</span>
              <span class="text-[10px] font-semibold text-secondary px-2 py-0.5 rounded-full bg-emerald-100">Siap Disimpan</span>
            </div>
            <div class="text-xs space-y-2">
              <div>
                <span class="text-gray-500 font-medium">Kategori Terpilih:</span>
                <span class="font-bold text-gray-900 block" id="preview-kategori">-</span>
              </div>
              <div>
                <span class="text-gray-500 font-medium">Temuan Kasus:</span>
                <p class="text-gray-800 italic" id="preview-contoh">-</p>
              </div>
              <div>
                <span class="text-gray-500 font-medium">Solusi Bela Negara:</span>
                <p class="text-gray-900 font-semibold" id="preview-solusi">-</p>
              </div>
            </div>
          </div>

          <!-- Buttons Row -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              id="btn-preview-studikasus"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer"
            >
              <span id="btn-preview-icon">${IC.eye}</span>
              <span id="btn-preview-label">Pratinjau Jawaban</span>
            </button>

            <div class="flex items-center gap-2">
              <button
                type="button"
                id="btn-cancel-edit"
                class="${studiKasusData ? 'inline-flex' : 'hidden'} items-center px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                id="btn-submit-studikasus"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0E4632] hover:bg-[#062B20] text-white text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Simpan &amp; Tuntaskan Modul 1</span>
                ${IC.arrowRight}
              </button>
            </div>
          </div>

        </form>

        <!-- Navigation Footer -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            class="btn-goto-infografik inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs cursor-pointer"
          >
            <span>◀ Ke Infografik</span>
          </button>
          <a
            href="#/modul2"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-secondary text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Lanjut Modul 2: Peran Dunia ▶</span>
          </a>
        </div>

      </section>

    </div>
  `;
}

/**
 * Logika Interaktif Modul 1 (Tabs, Video Player Controller, Accordions, & Form Studi Kasus)
 */
export function init() {
  // ================= 1. SUB-TAB SWITCHING LOGIC =================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-panel');

  const switchTab = (tabName) => {
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabName;
      if (isTarget) {
        btn.className = 'tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#0E4632] text-white shadow-xs cursor-pointer';
      } else {
        btn.className = 'tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all bg-white text-gray-700 hover:text-[#0E4632] cursor-pointer';
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === `tab-panel-${tabName}`) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      if (target) switchTab(target);
    });
  });

  // Cross-link buttons (goto studikasus, goto infografik, goto video)
  document.querySelectorAll('.btn-goto-studikasus').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('studikasus');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-goto-infografik').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('infografik');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-goto-video').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('video');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ================= 2. VIDEO PLAYER CONTROLLER =================
  const video          = document.getElementById('modul1-video');
  const bigPlayBtn     = document.getElementById('video-big-play-btn');
  const playBtn        = document.getElementById('video-play-btn');
  const playIcon       = document.getElementById('video-play-icon');
  const replayBtn      = document.getElementById('video-replay-btn');
  const seekBar        = document.getElementById('video-seek-bar');
  const currentTimeEl  = document.getElementById('video-current-time');
  const durationTimeEl = document.getElementById('video-duration-time');
  const volumeSlider   = document.getElementById('video-volume-slider');
  const muteBtn        = document.getElementById('video-mute-btn');
  const volumeIcon     = document.getElementById('video-volume-icon');
  const speedBtn       = document.getElementById('video-speed-btn');
  const speedLabel     = document.getElementById('video-speed-label');
  const fullscreenBtn  = document.getElementById('video-fullscreen-btn');
  const completeBanner = document.getElementById('video-complete-banner');

  if (video) {
    const formatTime = (seconds) => {
      if (isNaN(seconds) || seconds < 0) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play().catch(err => console.log('Autoplay blocked:', err));
      } else {
        video.pause();
      }
    };

    if (bigPlayBtn) bigPlayBtn.addEventListener('click', togglePlay);
    if (playBtn)    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
      if (bigPlayBtn) bigPlayBtn.classList.add('hidden');
      if (playIcon) playIcon.innerHTML = IC.pause;
    });

    video.addEventListener('pause', () => {
      if (bigPlayBtn) bigPlayBtn.classList.remove('hidden');
      if (playIcon) playIcon.innerHTML = IC.play;
    });

    video.addEventListener('ended', () => {
      if (bigPlayBtn) bigPlayBtn.classList.remove('hidden');
      if (playIcon) playIcon.innerHTML = IC.play;
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
      });
    }

    video.addEventListener('loadedmetadata', () => {
      if (durationTimeEl) durationTimeEl.textContent = formatTime(video.duration);
      if (seekBar) seekBar.max = video.duration || 100;
    });

    let hasMarkedWatched = getStorage(STORAGE_KEY_VIDEO_WATCHED, false);

    const checkVideoProgress = () => {
      if (!video.duration) return;

      const currentPercent = (video.currentTime / video.duration) * 100;
      if (seekBar) seekBar.value = video.currentTime;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(video.currentTime);

      if (!hasMarkedWatched && (currentPercent >= 80 || video.ended)) {
        hasMarkedWatched = true;
        setStorage(STORAGE_KEY_VIDEO_WATCHED, true);
        if (completeBanner) completeBanner.classList.remove('hidden');
        showToast('Bagus! Video Sishankamnas telah tuntas ditonton.', 'success');
      }
    };

    video.addEventListener('timeupdate', checkVideoProgress);

    if (seekBar) {
      seekBar.addEventListener('input', () => {
        video.currentTime = parseFloat(seekBar.value);
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        video.volume = parseFloat(e.target.value);
        video.muted = video.volume === 0;
        updateVolumeIcon();
      });
    }

    const updateVolumeIcon = () => {
      if (!volumeIcon) return;
      if (video.muted || video.volume === 0) {
        volumeIcon.innerHTML = IC.volumeMute;
      } else {
        volumeIcon.innerHTML = IC.volumeUp;
      }
    };

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (volumeSlider) {
          volumeSlider.value = video.muted ? 0 : video.volume || 1;
        }
        updateVolumeIcon();
      });
    }

    const speeds = [1.0, 1.25, 1.5, 0.75];
    let speedIdx = 0;
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        const newSpeed = speeds[speedIdx];
        video.playbackRate = newSpeed;
        if (speedLabel) speedLabel.textContent = `${newSpeed.toFixed(2).replace(/\.00$/, '.0')}x`;
        showToast(`Kecepatan video: ${newSpeed}x`, 'info');
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const container = video.closest('.group\\/player') || video;
        if (!document.fullscreenElement) {
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
          }
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }
  }

  // ================= 3. ACCORDION EXPANDER FOR 3 KOMPONEN =================
  const expandButtons = document.querySelectorAll('.btn-expand-card');
  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      const iconEl   = btn.querySelector('.btn-expand-icon');
      const labelEl  = btn.querySelector('.btn-expand-label');

      if (!targetEl) return;

      const isHidden = targetEl.classList.contains('hidden');
      if (isHidden) {
        targetEl.classList.remove('hidden');
        if (iconEl) iconEl.classList.add('rotate-180');
        if (labelEl) labelEl.textContent = 'Tutup detail';
      } else {
        targetEl.classList.add('hidden');
        if (iconEl) iconEl.classList.remove('rotate-180');
        if (labelEl) labelEl.textContent = btn.classList.contains('bg-emerald-50/50') || btn.classList.contains('bg-amber-50/50') || btn.classList.contains('bg-rose-50/50') ? 'Ketuk detail' : 'Lihat Selengkapnya';
      }
    });
  });

  // Toggle All Cards Button on Infografik tab
  const toggleAllBtn = document.getElementById('btn-toggle-all-cards');
  if (toggleAllBtn) {
    let allOpened = false;
    toggleAllBtn.addEventListener('click', () => {
      allOpened = !allOpened;
      expandButtons.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        const iconEl   = btn.querySelector('.btn-expand-icon');
        const labelEl  = btn.querySelector('.btn-expand-label');

        if (!targetEl) return;

        if (allOpened) {
          targetEl.classList.remove('hidden');
          if (iconEl) iconEl.classList.add('rotate-180');
          if (labelEl) labelEl.textContent = 'Tutup Detail';
        } else {
          targetEl.classList.add('hidden');
          if (iconEl) iconEl.classList.remove('rotate-180');
          if (labelEl) labelEl.textContent = 'Lihat Selengkapnya';
        }
      });
      const icon = toggleAllBtn.querySelector('svg');
      if (icon) icon.classList.toggle('rotate-180', allOpened);
    });
  }

  // ================= 4. INTERAKTIF FORM STUDI KASUS =================
  const formStudi         = document.getElementById('form-studikasus');
  const savedCard         = document.getElementById('studikasus-saved-card');
  const btnEditStudi      = document.getElementById('btn-edit-studikasus');
  const btnCancelEdit     = document.getElementById('btn-cancel-edit');
  const btnPreviewStudi   = document.getElementById('btn-preview-studikasus');
  const previewBox        = document.getElementById('preview-box');
  const inputContoh       = document.getElementById('input-contoh-ancaman');
  const inputSolusi       = document.getElementById('input-solusi-ancaman');
  const countContoh       = document.getElementById('char-counter-contoh');
  const countSolusi       = document.getElementById('char-counter-solusi');
  const errorContoh       = document.getElementById('error-contoh');
  const errorSolusi       = document.getElementById('error-solusi');
  const badgeStatus       = document.getElementById('badge-studikasus-status');

  const prevKategori = document.getElementById('preview-kategori');
  const prevContoh   = document.getElementById('preview-contoh');
  const prevSolusi   = document.getElementById('preview-solusi');

  const savedKategoriLabel = document.getElementById('saved-kategori-label');
  const savedContohText    = document.getElementById('saved-contoh-text');
  const savedSolusiText    = document.getElementById('saved-solusi-text');
  const savedTimestamp     = document.getElementById('saved-timestamp');

  const updateCounter = (inputEl, counterEl, errorEl) => {
    if (!inputEl || !counterEl) return;
    const len = inputEl.value.trim().length;
    counterEl.textContent = `${len} / 50 min. karakter`;
    if (len >= 50) {
      counterEl.className = 'text-[11px] font-mono text-emerald-600 font-bold';
      if (errorEl) errorEl.classList.add('hidden');
    } else {
      counterEl.className = 'text-[11px] font-mono text-gray-400';
    }
  };

  if (inputContoh) {
    updateCounter(inputContoh, countContoh, errorContoh);
    inputContoh.addEventListener('input', () => updateCounter(inputContoh, countContoh, errorContoh));
  }

  if (inputSolusi) {
    updateCounter(inputSolusi, countSolusi, errorSolusi);
    inputSolusi.addEventListener('input', () => updateCounter(inputSolusi, countSolusi, errorSolusi));
  }

  const updateCategoryCards = () => {
    const radioInputs = document.querySelectorAll('input[name="kategori_ancaman"]');
    radioInputs.forEach(input => {
      const card = input.closest('.category-card');
      const radioIcon = card?.querySelector('.category-radio-icon');
      const badge = card?.querySelector('.category-badge-selected');
      if (!card) return;

      if (input.checked) {
        card.classList.add('border-[#0E4632]', 'bg-emerald-50/40');
        card.classList.remove('border-gray-200', 'bg-white');
        if (radioIcon) {
          radioIcon.className = 'category-radio-icon w-5 h-5 rounded-full border-2 border-[#0E4632] bg-[#0E4632] flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 text-white';
          radioIcon.innerHTML = `<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`;
        }
        if (badge) badge.classList.remove('hidden');
      } else {
        card.classList.remove('border-[#0E4632]', 'bg-emerald-50/40');
        card.classList.add('border-gray-200', 'bg-white');
        if (radioIcon) {
          radioIcon.className = 'category-radio-icon w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5';
          radioIcon.innerHTML = '';
        }
        if (badge) badge.classList.add('hidden');
      }
    });
  };

  updateCategoryCards();
  document.querySelectorAll('input[name="kategori_ancaman"]').forEach(input => {
    input.addEventListener('change', updateCategoryCards);
  });

  if (btnPreviewStudi) {
    btnPreviewStudi.addEventListener('click', () => {
      if (!previewBox) return;
      const isHidden = previewBox.classList.contains('hidden');
      if (isHidden) {
        const checkedRadio = document.querySelector('input[name="kategori_ancaman"]:checked');
        const katLabel = checkedRadio ? checkedRadio.getAttribute('data-label') : '-';
        const contohVal = inputContoh?.value.trim() || '(Belum diisi)';
        const solusiVal = inputSolusi?.value.trim() || '(Belum diisi)';

        if (prevKategori) prevKategori.textContent = katLabel;
        if (prevContoh)   prevContoh.textContent   = `"${contohVal}"`;
        if (prevSolusi)   prevSolusi.textContent   = `"${solusiVal}"`;

        previewBox.classList.remove('hidden');
        btnPreviewStudi.innerHTML = `<span>✕ Tutup Pratinjau</span>`;
      } else {
        previewBox.classList.add('hidden');
        btnPreviewStudi.innerHTML = `<span>${IC.eye}</span><span>Pratinjau Jawaban</span>`;
      }
    });
  }

  if (btnEditStudi) {
    btnEditStudi.addEventListener('click', () => {
      if (savedCard) savedCard.classList.add('hidden');
      if (formStudi) formStudi.classList.remove('hidden');
      if (btnCancelEdit) btnCancelEdit.classList.remove('hidden');
      updateCategoryCards();
      formStudi?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
      if (formStudi) formStudi.classList.add('hidden');
      if (savedCard) savedCard.classList.remove('hidden');
      if (previewBox) previewBox.classList.add('hidden');
      if (btnPreviewStudi) btnPreviewStudi.innerHTML = `<span>${IC.eye}</span><span>Pratinjau Jawaban</span>`;
    });
  }

  if (formStudi) {
    formStudi.addEventListener('submit', (e) => {
      e.preventDefault();

      const checkedRadio = document.querySelector('input[name="kategori_ancaman"]:checked');
      const kategoriVal = checkedRadio ? checkedRadio.value : 'hoaks';
      const kategoriLabel = checkedRadio ? checkedRadio.getAttribute('data-label') : 'Hoaks & Disinformasi';

      const contohVal = (inputContoh?.value || '').trim();
      const solusiVal = (inputSolusi?.value || '').trim();

      let isValid = true;

      if (contohVal.length < 50) {
        if (errorContoh) errorContoh.classList.remove('hidden');
        isValid = false;
        inputContoh?.focus();
      } else {
        if (errorContoh) errorContoh.classList.add('hidden');
      }

      if (solusiVal.length < 50) {
        if (errorSolusi) errorSolusi.classList.remove('hidden');
        if (isValid) inputSolusi?.focus();
        isValid = false;
      } else {
        if (errorSolusi) errorSolusi.classList.add('hidden');
      }

      if (!isValid) {
        showToast('Mohon lengkapi seluruh isian minimal 50 karakter.', 'warning');
        return;
      }

      const payload = {
        kategori: kategoriVal,
        kategori_label: kategoriLabel,
        contoh_ancaman: contohVal,
        solusi: solusiVal,
        timestamp: new Date().toISOString()
      };

      setStorage('sibela_studikasus', payload);
      setProgressStep('modul1', true);

      if (savedKategoriLabel) savedKategoriLabel.textContent = kategoriLabel;
      if (savedContohText)    savedContohText.textContent    = `"${contohVal}"`;
      if (savedSolusiText)    savedSolusiText.textContent    = `"${solusiVal}"`;
      if (savedTimestamp)     savedTimestamp.textContent     = new Date(payload.timestamp).toLocaleString('id-ID');

      if (formStudi) formStudi.classList.add('hidden');
      if (savedCard) savedCard.classList.remove('hidden');
      if (previewBox) previewBox.classList.add('hidden');

      if (badgeStatus) {
        badgeStatus.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            ${IC.check} Jawaban Tersimpan
          </span>
        `;
      }

      showToast('Analisis studi kasus berhasil disimpan! Modul 1 tuntas.', 'success');
      savedCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
