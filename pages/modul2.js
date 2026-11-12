/**
 * SiBELA - Modul 2: Peran Indonesia di Dunia Internasional (TP 10.D.7)
 * Fitur: Peta Geopolitik Riil (Leaflet.js), 5 Marker Koordinat Geografis, Pop-up Detail, Infografik Diplomasi & Validasi Sumber Resmi
 * Desain Konsisten: Forest Green (#0E4632), Golden Amber (#E5A024), Cream Warm (#FAF7EE)
 */

import { ORGANISASI_DATA } from '../data/modul2.js';
import { getStorage, setStorage, setProgressStep, showToast } from '../js/utils.js';
import { renderLearningTargetModal, setupLearningTargetModal } from '../data/target-belajar.js';

const STORAGE_KEY_EXPLORED = 'sibela_modul2_explored';
const STORAGE_KEY_LAPORAN  = 'sibela_laporan_peran';

// Domain resmi terpercaya untuk validasi sumber internasional
const RECOMMENDED_DOMAINS = [
  'kemlu.go.id',
  'un.org',
  'asean.org',
  'g20.org',
  'oic-oci.org',
  'tni.mil.id',
  'polri.go.id',
  'kemhan.go.id',
  'indonesia.go.id',
  'peacekeeping.un.org'
];

/**
 * Validator URL & Domain Resmi Terpercaya
 */
export function checkUrlValidity(urlStr) {
  if (!urlStr || !urlStr.trim()) {
    return { status: 'empty', message: 'Tautan URL rujukan belum diisi' };
  }
  const clean = urlStr.trim();
  if (!/^https?:\/\//i.test(clean)) {
    return { status: 'invalid', message: 'URL harus diawali dengan http:// atau https://' };
  }
  try {
    const parsed = new URL(clean);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes('.') || host.endsWith('.')) {
      return { status: 'invalid', message: 'Format domain URL tidak lengkap' };
    }
    const isRecommended = RECOMMENDED_DOMAINS.some(d => host === d || host.endsWith('.' + d));
    if (isRecommended) {
      return { status: 'recommended', domain: host, message: `Domain Resmi Terpercaya (${host})` };
    } else {
      return { status: 'warning', domain: host, message: `Pastikan ini sumber terpercaya (${host})` };
    }
  } catch (err) {
    return { status: 'invalid', message: 'Format URL tidak valid (periksa penulisan tautan)' };
  }
}

// Koleksi Ikon SVG Lucide (stroke-width 1.75)
const IC = {
  globe: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/></svg>`,
  shield: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`,
  mapPin: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>`,
  check: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  externalLink: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>`,
  close: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`,
  building: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.75a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5V21"/></svg>`,
  calendar: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5"/></svg>`,
  award: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V4.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v9.75"/></svg>`,
  sparkles: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/></svg>`,
  flag: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a1.125 1.125 0 0 0 .864-1.093V4.896a1.125 1.125 0 0 0-1.385-1.093l-2.593.61a9 9 0 0 1-6.086-.71l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/></svg>`,
  arrowRight: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`,
  arrowLeft: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>`,
  fileText: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>`,
  link: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/></svg>`,
  checkCircle: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  checkBadge: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>`,
  alertTriangle: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>`,
  xCircle: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  eye: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
  edit: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>`,
  trash: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>`,
};

// Ikon spesifik per organisasi
const ORG_ICONS = {
  asean: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-15v12m-4.5-9 9 6m-9 0 9-6"/></svg>`,
  pbb: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9A9 9 0 1 1 3 12a9 9 0 0 1 18 0Zm-4.5-4.5a9 9 0 0 1 0 9m-9 0a9 9 0 0 1 0-9"/></svg>`,
  oki: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m16.5 7.5 1.5 1.5m0-1.5-1.5 1.5"/></svg>`,
  g20: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  garuda: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`,
};

/**
 * Render Halaman Modul 2
 */
export function render() {
  const exploredList = getStorage(STORAGE_KEY_EXPLORED, []);
  const exploredCount = exploredList.length;
  const totalOrgs = ORGANISASI_DATA.length;
  const progressPercent = Math.round((exploredCount / totalOrgs) * 100);

  const savedLaporan = getStorage(STORAGE_KEY_LAPORAN, null);
  const hasSavedLaporan = Boolean(savedLaporan && Array.isArray(savedLaporan.peran) && savedLaporan.peran.length === 3);
  const laporanPeran = hasSavedLaporan ? savedLaporan.peran : [
    { deskripsi: '', url: '' },
    { deskripsi: '', url: '' },
    { deskripsi: '', url: '' }
  ];
  const laporanTimestamp = hasSavedLaporan ? savedLaporan.timestamp : null;

  return `
    <div class="page-enter max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-0 sm:pt-4">
      
      <!-- ================= 1. UNIFIED CURVED HEADER (KONSISTEN WEB & MOBILE) ================= -->
      <header class="bg-[#0E4632] rounded-b-[2.5rem] lg:rounded-b-[3.5rem] px-5 sm:px-8 pt-5 sm:pt-7 pb-7 sm:pb-9 text-white shadow-md relative overflow-hidden -mx-4 sm:-mx-6 mb-6 sm:mb-8">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <!-- Back Link -->
            <a href="#/modul1" class="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-bold transition-colors py-1 self-start">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              <span>Materi 2</span>
            </a>
            
            <!-- Title & Subtitle -->
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1.5 tracking-tight leading-tight">
              Peran Indonesia di Dunia
            </h1>
            
          </div>

          <div class="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              id="btn-open-target-modal"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#E5A024] hover:bg-amber-400 active:scale-95 text-gray-900 shadow-sm transition-all cursor-pointer"
              title="Lihat Apa yang Dipelajari, Capaian & Tujuan Pembelajaran"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
              </svg>
              <span>Capaian &amp; Tujuan</span>
            </button>
            <span class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-100 border border-white/20 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#E5A024] animate-pulse"></span>
              <span>Tahap 2 dari 4: Diplomasi Dunia</span>
            </span>
          </div>
        </div>
      </header>

      <!-- ================= 2. SUB-TAB PILL NAVIGATION (FIGMA SCREEN 2 PATTERN) ================= -->
      <div class="flex items-center justify-center mb-6">
        <div class="inline-flex p-1 bg-gray-200/70 rounded-full gap-1 shadow-inner">
          <button
            type="button"
            id="tab-btn-peta"
            class="tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#0E4632] text-white shadow-xs cursor-pointer"
            data-tab="peta"
          >
            Peta Interaktif
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
            id="tab-btn-laporan"
            class="tab-btn px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all bg-white text-gray-700 hover:text-[#0E4632] cursor-pointer"
            data-tab="laporan"
          >
            Cari Sumber
          </button>
        </div>
      </div>

      <!-- ================= TAB CONTENT 1: PETA INTERAKTIF ================= -->
      <section id="tab-panel-peta" class="tab-panel space-y-6">
        
        <!-- Section Intro & Exploration Tracker -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A024] mb-0.5">
              <span class="w-3.5 h-0.5 bg-[#E5A024]"></span>
              <span>Aktivitas 1 • Peta Geopolitik Interaktif</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Eksplorasi Diplomasi Bebas Aktif di Peta Dunia
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Jelajahi lokasi markas dan misi perdamaian dunia. Ketuk marker pada peta atau pilih kartu di bawah untuk mempelajari peran bersejarah Indonesia:
            </p>
          </div>

          <!-- Progress Badge Counter -->
          <div class="bg-white rounded-2xl p-3 border border-gray-200/80 shadow-xs flex-shrink-0 min-w-[220px]">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-bold text-gray-700 flex items-center gap-1.5">
                ${IC.award}
                <span>Progress Eksplorasi:</span>
              </span>
              <span id="explored-counter-text" class="font-black text-secondary font-mono">
                ${exploredCount} / ${totalOrgs}
              </span>
            </div>
            
            <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                id="explored-progress-bar"
                class="h-full bg-gradient-to-r from-emerald-600 to-[#E5A024] transition-all duration-500 rounded-full"
                style="width: ${progressPercent}%;"
              ></div>
            </div>

            <p id="explored-status-text" class="text-[10px] text-gray-500 mt-1.5 font-medium flex items-center justify-between">
              <span>${exploredCount === totalOrgs ? 'Semua pin tuntas dipelajari!' : 'Jelajahi seluruh pin untuk menyelesaikan modul.'}</span>
              <span class="text-secondary font-bold font-mono">${progressPercent}%</span>
            </p>
          </div>
        </div>

        <!-- ================= REAL MAP CANVAS (LEAFLET.JS) ================= -->
        <div class="relative w-full rounded-3xl overflow-hidden shadow-card border-2 border-emerald-900 bg-emerald-950 min-h-[380px] sm:min-h-[480px]">
          
          <!-- Leaflet Real World Map Container -->
          <div
            id="real-world-map"
            class="w-full aspect-[16/10] sm:aspect-[2/1] min-h-[380px] sm:min-h-[480px] z-10"
          ></div>

          <!-- Floating Map Toolbar -->
          <div class="absolute top-3 left-3 sm:left-4 z-[400] flex items-center gap-2">
            <button
              type="button"
              id="btn-reset-map-view"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 hover:bg-white text-secondary shadow-md border border-gray-200 backdrop-blur-sm transition-all cursor-pointer active:scale-95"
              title="Kembali ke Pusat Tampilan Dunia"
            >
              ${IC.globe}
              <span>Pusat Peta Dunia</span>
            </button>
          </div>

          <!-- ================= SIDE DRAWER DETAIL PANEL (OVER MAP) ================= -->
          <aside
            id="panel-org-drawer"
            class="absolute top-0 right-0 bottom-0 w-full sm:w-[420px] md:w-[460px] bg-white/95 backdrop-blur-md shadow-2xl z-[450] flex flex-col justify-between border-l border-gray-200 transition-transform duration-300 ease-out transform translate-x-full overflow-hidden"
            aria-label="Panel Detail Organisasi"
          >
            <!-- Dynamic Content Injected via JS -->
            <div id="drawer-inner-container" class="h-full flex flex-col justify-between overflow-hidden"></div>
          </aside>

        </div>

        <!-- ================= QUICK SELECTOR CARDS (5 ORGANISASI) ================= -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-black text-gray-900 tracking-tight">
              Pilih Organisasi Internasional
            </h3>
            <span class="text-[11px] font-bold text-secondary font-mono">${exploredCount}/${totalOrgs} Tuntas</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3" id="quick-cards-grid">
            ${ORGANISASI_DATA.map(org => {
              const isExplored = exploredList.includes(org.id);
              return `
                <article
                  class="card-org-preview bg-white rounded-2xl p-3 sm:p-3.5 border-2 ${isExplored ? 'border-secondary/60 bg-emerald-50/40' : 'border-gray-200 hover:border-gray-300'} shadow-xs hover:shadow-card transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                  data-org-id="${org.id}"
                >
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <div class="w-8 h-8 rounded-xl ${org.warnaTema.lightBg} ${org.warnaTema.text} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        ${ORG_ICONS[org.id] || IC.globe}
                      </div>
                      <span class="badge-status-card text-[9px] font-bold px-2 py-0.5 rounded-full ${isExplored ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500'} flex-shrink-0 transition-colors">
                        ${isExplored ? 'Telah Dibuka' : 'Belum'}
                      </span>
                    </div>

                    <div class="min-w-0">
                      <h4 class="text-xs sm:text-sm font-black text-gray-900 leading-tight truncate" title="${org.nama}">
                        ${org.nama}
                      </h4>
                      <p class="text-[10px] text-gray-500 leading-snug line-clamp-1 mt-0.5" title="${org.namaIndonesia}">
                        ${org.namaIndonesia}
                      </p>
                    </div>
                  </div>

                  <div class="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-primary font-bold">
                    <span class="text-gray-400 truncate">${org.markas.split(',')[0]}</span>
                    <span class="w-5 h-5 rounded-full bg-emerald-50 text-secondary flex items-center justify-center group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                      ${IC.arrowRight}
                    </span>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Navigation Footer -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200/80">
          <a
            href="#/modul1"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs transition-all hover:-translate-x-0.5"
          >
            <span>◀ Modul 1</span>
          </a>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="btn-goto-infografik inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-[#0E4632] text-xs font-bold border border-emerald-300 shadow-xs transition-all cursor-pointer"
            >
              <span>Infografik</span>
              <span>→</span>
            </button>
            <button
              type="button"
              class="btn-goto-laporan inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-secondary text-xs font-black shadow-md hover:shadow-lg transition-all hover:translate-x-0.5 active:scale-95 cursor-pointer"
            >
              <span>Cari Sumber ▶</span>
            </button>
          </div>
        </div>

      </section>

      <!-- ================= TAB CONTENT 2: INFOGRAFIK ================= -->
      <section id="tab-panel-infografik" class="tab-panel hidden space-y-6">

        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A024] mb-0.5">
              <span class="w-3.5 h-0.5 bg-[#E5A024]"></span>
              <span>Aktivitas 2 • Infografik Diplomasi</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              5 Tonggak Sejarah Peran Diplomasi Indonesia di Dunia
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Mewujudkan amanat Pembukaan UUD 1945 alinea IV: <em>"Ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial"</em>.
            </p>
          </div>
        </div>

        <!-- Prinsip Bebas Aktif Banner Callout -->
        <div class="bg-[#EBF7F0] border-l-4 border-[#0E4632] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-[#0E4632] text-[#E5A024] flex items-center justify-center flex-shrink-0 mt-0.5">
              ${IC.shield}
            </div>
            <div class="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h3 class="font-black text-[#0E4632] text-sm">Doktrin Politik Luar Negeri: Bebas Aktif</h3>
              <p class="mt-1">
                Dicetuskan oleh <strong>Drs. Mohammad Hatta</strong> pada 1948 lewat pidato legendaris <em>"Mendayung di Antara Dua Karang"</em>. 
                <strong>Bebas</strong> berarti tidak memihak blok kekuatan adidaya mana pun; <strong>Aktif</strong> berarti giat menggalang perdamaian, kerja sama internasional, dan membela bangsa-bangsa tertindas.
              </p>
            </div>
          </div>
        </div>

        <!-- 5 Cards Grid of Historical Contributions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- 1. KAA 1955 & Non-Blok -->
          <article class="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-card transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">
                  1
                </span>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-amber-700">Tahun 1955 • Bandung</span>
                  <h4 class="text-sm font-black text-gray-900">Konferensi Asia-Afrika &amp; Gerakan Non-Blok</h4>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Tuan rumah Konferensi Asia Afrika (KAA) di Gedung Merdeka Bandung yang melahirkan <strong>Dasa Sila Bandung</strong>, menginspirasi dekolonisasi kemerdekaan lebih dari 30 negara Asia-Afrika.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-amber-800">
              <span>Dekolonisasi Global</span>
              <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px]">Pelopor</span>
            </div>
          </article>

          <!-- 2. Pendiri ASEAN -->
          <article class="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-card transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                  2
                </span>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-blue-700">Tahun 1967 • Kawasan</span>
                  <h4 class="text-sm font-black text-gray-900">Pendiri &amp; Episentrum ASEAN</h4>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Menlu Adam Malik menandatangani Deklarasi Bangkok. Indonesia menjadi tuan rumah Sekretariat ASEAN di Jakarta dan penggagas zona bebas senjata nuklir SEANWFZ serta AOIP.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-blue-700">
              <span>Stabilitas Regional</span>
              <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px]">Sekretariat Jakarta</span>
            </div>
          </article>

          <!-- 3. Pasukan Garuda PBB -->
          <article class="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-card transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                  3
                </span>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700">Sejak 1957 • PBB</span>
                  <h4 class="text-sm font-black text-gray-900">Kontingen Garuda (UN Peacekeeping)</h4>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Telah mengirimkan lebih dari 40.000 prajurit TNI/Polri dalam misi pemeliharaan perdamaian PBB di berbagai belahan dunia (Mesir, Kongo, Lebanon, Sudan, hingga Mali).
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-emerald-800">
              <span>Penjaga Perdamaian</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px]">Top 10 Kontributor PBB</span>
            </div>
          </article>

          <!-- 4. Presidensi G20 Bali -->
          <article class="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-card transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <span class="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs">
                  4
                </span>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-rose-700">Tahun 2022 • Global</span>
                  <h4 class="text-sm font-black text-gray-900">Presidensi G20: Recover Together, Stronger</h4>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Memimpin KTT G20 di Bali di tengah krisis global dan tensi perang Eropa, sukses melahirkan G20 Bali Leaders' Declaration dan pembentukan <em>Pandemic Fund</em> untuk negara berkembang.
              </p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-rose-800">
              <span>Diplomasi Ekonomi</span>
              <span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px]">Pandemic Fund</span>
            </div>
          </article>

        </div>

        <!-- Navigation Footer -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            class="btn-goto-peta inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs cursor-pointer"
          >
            <span>◀ Kembali ke Peta</span>
          </button>
          <button
            type="button"
            class="btn-goto-laporan inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0E4632] hover:bg-[#062B20] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Lanjut ke Cari Sumber</span>
            ${IC.arrowRight}
          </button>
        </div>

      </section>

      <!-- ================= TAB CONTENT 3: CARI SUMBER & TUGAS LAPORAN ================= -->
      <section id="tab-panel-laporan" class="tab-panel hidden space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5A024] mb-0.5">
              <span class="w-3.5 h-0.5 bg-[#E5A024]"></span>
              <span>Aktivitas 3 • Validasi Sumber &amp; Laporan</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Tugas Analisis Peran &amp; Literasi Sumber Resmi
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Tuliskan 3 peran nyata diplomasi Indonesia dalam menjaga ketertiban/perdamaian dunia dan sertakan tautan URL sumber rujukan resmi yang tervalidasi.
            </p>
          </div>

          <div id="laporan-status-badge-container">
            ${hasSavedLaporan ? `
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-auto flex-shrink-0">
                ${IC.checkCircle}
                <span>Tugas Telah Dikumpulkan</span>
              </span>
            ` : `
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 self-start sm:self-auto flex-shrink-0">
                ${IC.sparkles}
                <span>Validasi Domain URL Aktif</span>
              </span>
            `}
          </div>
        </div>

        <!-- Kartu Laporan Tersimpan (Jika Sudah Ada) -->
        <div id="card-laporan-tersimpan" class="${hasSavedLaporan ? '' : 'hidden'} bg-[#0E4632] text-white rounded-3xl p-5 sm:p-7 shadow-card space-y-5">
          <!-- Top Banner -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-white/10 text-[#E5A024] border border-white/20 flex items-center justify-center flex-shrink-0 shadow-xs">
                ${IC.checkBadge}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5A024] text-secondary">Laporan Tersimpan</span>
                  <span id="saved-laporan-timestamp" class="text-xs text-emerald-200/80 font-mono">
                    ${laporanTimestamp ? new Date(laporanTimestamp).toLocaleString('id-ID') : ''}
                  </span>
                </div>
                <h3 class="text-base sm:text-lg font-black text-white mt-0.5">Lembar Kerja Analisis Peran Tuntas</h3>
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                id="btn-edit-laporan"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                ${IC.edit}
                <span>Edit Laporan</span>
              </button>
              <button
                type="button"
                id="btn-reset-laporan"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-rose-300/40 text-xs font-bold text-rose-200 bg-rose-900/40 hover:bg-rose-900/60 transition-colors cursor-pointer"
              >
                ${IC.trash}
                <span>Reset</span>
              </button>
            </div>
          </div>

          <!-- Table Summary of Saved Items -->
          <div class="overflow-x-auto rounded-2xl border border-white/15 bg-white/5">
            <table class="w-full text-left text-xs">
              <thead class="bg-black/20 border-b border-white/10 text-emerald-200 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th class="p-3 w-12 text-center">No</th>
                  <th class="p-3">Uraian Peran Diplomasi Indonesia</th>
                  <th class="p-3 w-48 sm:w-64">Sumber Rujukan &amp; Domain</th>
                </tr>
              </thead>
              <tbody id="saved-table-body" class="divide-y divide-white/10 text-emerald-100">
                ${hasSavedLaporan ? laporanPeran.map((p, idx) => {
                  const val = checkUrlValidity(p.url);
                  return `
                    <tr class="hover:bg-white/5 transition-colors">
                      <td class="p-3 text-center font-bold text-emerald-300">${idx + 1}</td>
                      <td class="p-3">
                        <p class="font-medium text-white leading-relaxed">${p.deskripsi}</p>
                        <span class="text-[10px] text-emerald-300/70 font-mono mt-0.5 block">${p.deskripsi.length} karakter</span>
                      </td>
                      <td class="p-3">
                        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[#E5A024] hover:underline font-mono text-[11px] font-bold break-all">
                          <span>${val.domain || p.url}</span>
                          <span class="flex-shrink-0">${IC.externalLink}</span>
                        </a>
                        <div class="mt-1">
                          <span class="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${val.status === 'recommended' ? 'bg-emerald-800 text-emerald-100 border border-emerald-600' : 'bg-amber-900/70 text-amber-200 border border-amber-700'}">
                            ${val.status === 'recommended' ? 'Domain Resmi' : 'Rujukan Valid'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('') : ''}
              </tbody>
            </table>
          </div>

          <!-- Bottom Banner: Modul 2 Tuntas -->
          <div class="p-4 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-[#E5A024] text-secondary flex items-center justify-center flex-shrink-0">
                ${IC.sparkles}
              </span>
              <div>
                <h4 class="text-xs sm:text-sm font-bold text-white">Selamat! Seluruh Tahapan Modul 2 Telah Tuntas</h4>
                <p class="text-[11px] text-emerald-200/90 mt-0.5">Eksplorasi peta dan tugas validasi sumber telah tersimpan ke sistem evaluasi.</p>
              </div>
            </div>
            <a href="#/mindmap" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-secondary font-black text-xs shadow-sm transition-all flex-shrink-0 cursor-pointer">
              <span>Lanjut ke Mind Map ▶</span>
            </a>
          </div>
        </div>

        <!-- Form Input 3 Peran (Aktif jika belum disimpan atau sedang edit) -->
        <form id="form-tugas-laporan" class="${hasSavedLaporan ? 'hidden' : ''} bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          
          <!-- Chips Rekomendasi Domain Resmi -->
          <div class="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div class="flex items-center gap-2 text-xs font-bold text-secondary">
                <span class="w-5 h-5 rounded-lg bg-secondary text-accent flex items-center justify-center">
                  ${IC.shield}
                </span>
                <span>Rekomendasi Domain Resmi Terpercaya (Literasi Digital):</span>
              </div>
              <span class="text-[11px] text-gray-500">Klik chip untuk mengisi otomatis</span>
            </div>
            <div class="flex flex-wrap gap-1.5 sm:gap-2">
              <button type="button" class="btn-domain-chip px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-300 text-secondary text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-domain="https://kemlu.go.id">
                <span>kemlu.go.id</span>
              </button>
              <button type="button" class="btn-domain-chip px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-300 text-secondary text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-domain="https://un.org">
                <span>un.org</span>
              </button>
              <button type="button" class="btn-domain-chip px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-300 text-secondary text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-domain="https://asean.org">
                <span>asean.org</span>
              </button>
              <button type="button" class="btn-domain-chip px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-300 text-secondary text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-domain="https://g20.org">
                <span>g20.org</span>
              </button>
              <button type="button" class="btn-domain-chip px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-300 text-secondary text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs" data-domain="https://peacekeeping.un.org">
                <span>peacekeeping.un.org</span>
              </button>
            </div>
          </div>

          <!-- 3 Pasang Input Field -->
          <div class="space-y-4">
            ${[1, 2, 3].map(i => {
              const prev = laporanPeran[i - 1] || { deskripsi: '', url: '' };
              const placeholders = [
                'Contoh: Memprakarsai berdirinya ASEAN melalui Deklarasi Bangkok 1967 dan konsisten memfasilitasi penyelesaian damai berbagai sengketa di kawasan.',
                'Contoh: Mengirimkan Kontingen Garuda (Konga) sebagai bagian dari Pasukan Pemelihara Perdamaian PBB (UN Peacekeeping) di Lebanon dan Kongo.',
                'Contoh: Memegang Presidensi G20 tahun 2022 di Bali yang melahirkan Pandemic Fund guna membantu ketahanan kesehatan bagi negara berkembang.'
              ];
              const sampleUrls = [
                'https://kemlu.go.id/portal/id/read/44/halaman_list_3_kolom/indonesia-dan-asean',
                'https://peacekeeping.un.org',
                'https://kemlu.go.id/portal/id/read/142/halaman_list_3_kolom/presidensi-g20-indonesia-2022'
              ];
              return `
                <div class="card-input-pair bg-gray-50/60 rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs hover:border-gray-300 transition-all space-y-3.5">
                  <div class="flex items-center justify-between gap-2 border-b border-gray-200/60 pb-2.5">
                    <div class="flex items-center gap-2.5">
                      <span class="w-7 h-7 rounded-xl bg-secondary text-accent font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                        ${i}
                      </span>
                      <h4 class="text-xs sm:text-sm font-bold text-gray-900">
                        Peran Diplomasi Indonesia ke-${i}
                      </h4>
                    </div>
                    <div id="indicator-peran-${i}">
                      <span class="text-[10px] font-bold text-gray-400">Belum Lengkap</span>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label for="input-peran-${i}" class="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <span class="text-secondary">${IC.fileText}</span>
                        <span>Uraian Peran Diplomasi Indonesia:</span>
                      </label>
                      <span id="counter-peran-${i}" class="text-[11px] text-gray-400 font-medium">
                        ${prev.deskripsi ? prev.deskripsi.length : 0} / 30 karakter
                      </span>
                    </div>
                    <textarea
                      id="input-peran-${i}"
                      rows="2"
                      class="w-full text-xs text-gray-900 placeholder:text-gray-400 bg-white rounded-xl p-3 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all outline-none resize-none leading-relaxed"
                      placeholder="${placeholders[i - 1]}"
                    >${prev.deskripsi}</textarea>
                    <p id="error-peran-${i}" class="hidden text-xs text-rose-500 font-semibold mt-1">
                      Uraian peran minimal 30 karakter agar penjelasan memadai.
                    </p>
                  </div>

                  <div>
                    <label for="input-url-${i}" class="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <span class="text-secondary">${IC.link}</span>
                      <span>Sumber Rujukan Resmi (URL):</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        ${IC.globe}
                      </div>
                      <input
                        type="url"
                        id="input-url-${i}"
                        value="${prev.url}"
                        placeholder="${sampleUrls[i - 1]}"
                        class="w-full text-xs text-gray-900 placeholder:text-gray-400 bg-white rounded-xl pl-9 pr-3 py-2.5 border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all outline-none font-mono"
                      />
                    </div>
                    <div id="feedback-url-${i}" class="mt-1.5 min-h-[20px]">
                      <span class="text-[11px] text-gray-400">Tautan harus diawali http:// atau https://</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Live Inline Preview Box -->
          <div id="preview-box-laporan" class="hidden bg-emerald-50/70 rounded-3xl p-5 sm:p-6 border-2 border-emerald-300/80 shadow-xs space-y-4 transition-all">
            <div class="flex items-center justify-between border-b border-emerald-200/80 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-secondary text-accent flex items-center justify-center flex-shrink-0 shadow-2xs">
                  ${IC.fileText}
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-black text-gray-900 leading-tight">Pratinjau Lembar Kerja Siswa</h4>
                  <p class="text-[10px] sm:text-[11px] text-gray-600">Periksa kembali uraian peran dan tautan sumber resmimu sebelum disimpan.</p>
                </div>
              </div>
              <button
                type="button"
                id="btn-close-inline-preview"
                class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>Tutup</span>
                ${IC.close}
              </button>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table class="w-full text-left text-xs">
                <thead class="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th class="p-3 w-12 text-center">No</th>
                    <th class="p-3">Uraian Peran Diplomasi Indonesia</th>
                    <th class="p-3 w-48 sm:w-64">Sumber Rujukan &amp; Status</th>
                  </tr>
                </thead>
                <tbody id="preview-table-body" class="divide-y divide-gray-100 text-gray-800">
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <span class="text-amber-600 flex-shrink-0 mt-0.5">${IC.alertTriangle}</span>
              <span>Pastikan seluruh tautan dapat dibuka secara terbuka oleh publik. Jika sudah sesuai, klik tombol <strong>"Simpan &amp; Tuntaskan Modul 2"</strong> di bawah.</span>
            </div>
          </div>

          <!-- Action Buttons Form -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              id="btn-preview-laporan"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-xs transition-all cursor-pointer"
            >
              <span id="btn-preview-icon">${IC.eye}</span>
              <span id="btn-preview-text">Pratinjau Laporan</span>
            </button>

            <button
              type="submit"
              id="btn-submit-laporan"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#0E4632] hover:bg-[#062B20] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>${IC.check}</span>
              <span>Simpan &amp; Tuntaskan Modul 2</span>
            </button>
          </div>
        </form>

        <!-- Navigation Footer -->
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            class="btn-goto-peta inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold border border-gray-300 shadow-xs cursor-pointer"
          >
            <span>◀ Ke Peta</span>
          </button>
          <a
            href="#/mindmap"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E5A024] hover:bg-amber-400 text-secondary text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Lanjut ke Mind Map ▶</span>
          </a>
        </div>

      </section>

      <!-- Pop-up Modal Capaian & Tujuan Pembelajaran -->
      ${renderLearningTargetModal('modul2')}

    </div>
  `;
}

/**
 * Inisialisasi Event Listener Modul 2 & Peta Geografis Riil (Leaflet)
 */
export function init() {
  console.log('🌏 Modul 2: Peta Geopolitik Riil (Leaflet.js) initialized.');

  // Inisialisasi Pop-up Modal Sasaran Belajar
  setupLearningTargetModal();

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

    // Invalidate Leaflet map size jika berpindah ke tab peta
    if (tabName === 'peta' && window._sibelaModul2Map) {
      setTimeout(() => {
        window._sibelaModul2Map.invalidateSize();
      }, 50);
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      if (target) switchTab(target);
    });
  });

  // Cross-link buttons
  document.querySelectorAll('.btn-goto-peta').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('peta');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-goto-infografik').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('infografik');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-goto-laporan').forEach(b => {
    b.addEventListener('click', () => {
      switchTab('laporan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Reference elemen UI peta & drawer
  const mapContainer = document.getElementById('real-world-map');
  const drawerEl = document.getElementById('panel-org-drawer');
  const drawerContainer = document.getElementById('drawer-inner-container');
  const exploredCounterEl = document.getElementById('explored-counter-text');
  const exploredProgressBar = document.getElementById('explored-progress-bar');
  const exploredStatusText = document.getElementById('explored-status-text');

  let markersRef = {};

  // Helper update progress eksplorasi peta
  const updateExplorationUI = () => {
    const list = getStorage(STORAGE_KEY_EXPLORED, []);
    const count = list.length;
    const total = ORGANISASI_DATA.length;
    const pct = Math.round((count / total) * 100);

    if (exploredCounterEl) exploredCounterEl.textContent = `${count} / ${total}`;
    if (exploredProgressBar) exploredProgressBar.style.width = `${pct}%`;
    if (exploredStatusText) {
      exploredStatusText.innerHTML = `
        <span>${count === total ? 'Semua pin tuntas dipelajari!' : 'Jelajahi seluruh pin untuk menyelesaikan modul.'}</span>
        <span class="text-secondary font-bold font-mono">${pct}%</span>
      `;
    }

    // Update status badge di tiap kartu preview
    document.querySelectorAll('.card-org-preview').forEach(card => {
      const orgId = card.getAttribute('data-org-id');
      const isExplored = list.includes(orgId);
      const badge = card.querySelector('.badge-status-card');
      if (isExplored) {
        card.classList.add('border-secondary/60', 'bg-emerald-50/40');
        card.classList.remove('border-gray-200');
        if (badge) {
          badge.className = 'badge-status-card text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary text-white flex-shrink-0';
          badge.textContent = 'Telah Dibuka';
        }
      }
    });
  };

  // Tandai organisasi telah dibuka
  const markAsExplored = (orgId) => {
    const list = getStorage(STORAGE_KEY_EXPLORED, []);
    if (!list.includes(orgId)) {
      list.push(orgId);
      setStorage(STORAGE_KEY_EXPLORED, list);
      updateExplorationUI();

      // Update warna marker icon di peta
      const org = ORGANISASI_DATA.find(o => o.id === orgId);
      if (org && markersRef[orgId] && window.L) {
        markersRef[orgId].setIcon(createCustomMarkerIcon(org, true));
      }

      if (list.length === ORGANISASI_DATA.length) {
        showToast('Hebat! Seluruh organisasi geopolitik telah tuntas kamu pelajari.', 'success');
      }
    }
  };

  // Helper Pembuat Ikon Custom Marker Leaflet (Pill + Badge)
  const createCustomMarkerIcon = (org, isExplored) => {
    const htmlContent = `
      <div class="relative flex items-center cursor-pointer group">
        <div class="w-8 h-8 rounded-full ${isExplored ? 'bg-secondary text-white ring-2 ring-accent' : 'bg-white text-gray-800 shadow-md border-2 border-gray-300'} flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          ${isExplored ? IC.check : (ORG_ICONS[org.id] || IC.mapPin)}
        </div>
        <div class="ml-1.5 px-2 py-0.5 rounded-md ${isExplored ? 'bg-secondary text-white' : 'bg-white text-gray-800 border border-gray-200'} text-[10px] font-bold shadow-xs whitespace-nowrap transition-all hidden group-hover:block">
          ${org.nama}
        </div>
      </div>
    `;

    return window.L.divIcon({
      className: 'custom-leaflet-marker',
      html: htmlContent,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });
  };

  // Fungsi Buka Drawer Detail Organisasi
  const openOrgDetail = (orgId) => {
    const org = ORGANISASI_DATA.find(o => o.id === orgId);
    if (!org || !drawerContainer || !drawerEl) return;

    markAsExplored(orgId);

    drawerContainer.innerHTML = `
      <div class="p-5 border-b border-gray-100 flex items-center justify-between ${org.warnaTema.lightBg}">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl ${org.warnaTema.bg} text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
            ${ORG_ICONS[org.id] || IC.globe}
          </div>
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider ${org.warnaTema.text}">${org.kategori}</span>
            <h3 class="text-base font-black text-gray-900 leading-tight">${org.nama}</h3>
          </div>
        </div>
        <button
          type="button"
          id="btn-close-drawer-org"
          class="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center transition-all cursor-pointer shadow-xs"
          aria-label="Tutup Panel"
        >
          ${IC.close}
        </button>
      </div>

      <div class="p-5 flex-grow overflow-y-auto space-y-4 text-xs text-gray-700">
        <div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Nama Resmi</span>
          <p class="font-extrabold text-gray-900 text-sm">${org.namaLengkap}</p>
          <p class="text-[11px] text-gray-500 font-medium">${org.namaIndonesia}</p>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div class="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span class="text-[10px] text-gray-400 block font-semibold">Tahun Bergabung</span>
            <span class="font-black text-gray-900 text-xs">${org.tahunBergabung}</span>
          </div>
          <div class="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span class="text-[10px] text-gray-400 block font-semibold">Status</span>
            <span class="font-bold text-gray-900 text-[11px] line-clamp-1" title="${org.statusKeanggotaan}">${org.statusKeanggotaan}</span>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="text-[10px] text-gray-400 block font-semibold mb-0.5">Markas Besar</span>
          <p class="font-bold text-gray-800">${org.markas}</p>
        </div>

        <div class="space-y-2 pt-2 border-t border-gray-100">
          <span class="text-xs font-black text-gray-900 uppercase tracking-wider block">Kontribusi &amp; Peran Strategis Indonesia</span>
          ${org.deskripsi.map(p => `
            <p class="text-gray-600 leading-relaxed bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-100/50">${p}</p>
          `).join('')}
        </div>

        <div class="space-y-1.5 pt-2">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Poin Kunci Bela Negara</span>
          <ul class="space-y-1">
            ${org.poinKunci.map(pt => `
              <li class="flex items-start gap-1.5 text-gray-700">
                <span class="text-secondary mt-0.5 flex-shrink-0">${IC.check}</span>
                <span>${pt}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="p-4 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between gap-3">
        <a
          href="${org.linkResmi}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-primary hover:border-primary text-xs font-bold transition-all shadow-xs"
        >
          <span>Situs Resmi</span>
          ${IC.externalLink}
        </a>
        <button
          type="button"
          onclick="document.getElementById('panel-org-drawer')?.classList.add('translate-x-full'); document.getElementById('panel-org-drawer')?.classList.remove('translate-x-0');"
          class="px-4 py-1.5 rounded-lg bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-all cursor-pointer"
        >
          Tutup
        </button>
      </div>
    `;

    drawerEl.classList.remove('translate-x-full');
    drawerEl.classList.add('translate-x-0');

    document.getElementById('btn-close-drawer-org')?.addEventListener('click', () => {
      drawerEl.classList.add('translate-x-full');
      drawerEl.classList.remove('translate-x-0');
    });
  };

  // Inisialisasi Peta Leaflet
  const initLeafletMap = () => {
    if (!mapContainer || !window.L) return;

    if (window._sibelaModul2Map) {
      try {
        window._sibelaModul2Map.remove();
      } catch (e) {
        console.warn('Old map clean-up:', e);
      }
      window._sibelaModul2Map = null;
    }

    const map = window.L.map(mapContainer, {
      center: [18, 20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      scrollWheelZoom: true,
      worldCopyJump: true,
    });
    window._sibelaModul2Map = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor',
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19
    }).addTo(map);

    const currentExplored = getStorage(STORAGE_KEY_EXPLORED, []);

    ORGANISASI_DATA.forEach(org => {
      const isExplored = currentExplored.includes(org.id);
      const icon = createCustomMarkerIcon(org, isExplored);
      const marker = window.L.marker(org.koordinat, { icon }).addTo(map);

      marker.on('click', () => {
        map.flyTo(org.koordinat, Math.max(org.zoomLevel || 5, 5), { duration: 1.2 });
        setTimeout(() => openOrgDetail(org.id), 450);
      });

      markersRef[org.id] = marker;
    });

    document.getElementById('btn-reset-map-view')?.addEventListener('click', () => {
      map.flyTo([18, 20], 2, { duration: 1.2 });
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  };

  if (window.L) {
    initLeafletMap();
  } else {
    const checkLeaflet = setInterval(() => {
      if (window.L) {
        clearInterval(checkLeaflet);
        initLeafletMap();
      }
    }, 100);
    setTimeout(() => clearInterval(checkLeaflet), 5000);
  }

  document.querySelectorAll('.card-org-preview').forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      const orgId = cardEl.getAttribute('data-org-id');
      const org = ORGANISASI_DATA.find(o => o.id === orgId);
      if (org && window._sibelaModul2Map) {
        window._sibelaModul2Map.flyTo(org.koordinat, Math.max(org.zoomLevel || 5, 5), { duration: 1.2 });
        setTimeout(() => openOrgDetail(orgId), 450);
      } else {
        openOrgDetail(orgId);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerEl && !drawerEl.classList.contains('translate-x-full')) {
      drawerEl.classList.add('translate-x-full');
      drawerEl.classList.remove('translate-x-0');
    }
  });

  // ================= 2. FORM TUGAS LAPORAN & VALIDASI SUMBER =================
  const formLaporan = document.getElementById('form-tugas-laporan');
  const cardSaved = document.getElementById('card-laporan-tersimpan');
  const previewBox = document.getElementById('preview-box-laporan');
  const previewTableBody = document.getElementById('preview-table-body');
  const btnCloseInlinePreview = document.getElementById('btn-close-inline-preview');
  const btnEditLaporan = document.getElementById('btn-edit-laporan');
  const btnResetLaporan = document.getElementById('btn-reset-laporan');
  const btnPreviewLaporan = document.getElementById('btn-preview-laporan');
  const btnPreviewIcon = document.getElementById('btn-preview-icon');
  const btnPreviewText = document.getElementById('btn-preview-text');
  const statusBadgeContainer = document.getElementById('laporan-status-badge-container');

  const updateRoleCharCounter = (idx) => {
    const inputEl = document.getElementById(`input-peran-${idx}`);
    const counterEl = document.getElementById(`counter-peran-${idx}`);
    const errorEl = document.getElementById(`error-peran-${idx}`);
    const indicatorEl = document.getElementById(`indicator-peran-${idx}`);
    if (!inputEl || !counterEl) return;

    const len = inputEl.value.trim().length;
    if (len >= 30) {
      counterEl.textContent = `${len} / 30 karakter (Tercapai)`;
      counterEl.className = 'text-[11px] text-secondary font-bold';
      inputEl.classList.remove('border-rose-400');
      inputEl.classList.add('border-emerald-300');
      if (errorEl) errorEl.classList.add('hidden');
      if (indicatorEl) {
        indicatorEl.innerHTML = `<span class="inline-flex items-center gap-1 text-[10px] font-bold text-secondary bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">${IC.check} Uraian Lengkap</span>`;
      }
    } else {
      counterEl.textContent = `${len} / 30 karakter (kurang ${30 - len})`;
      counterEl.className = 'text-[11px] text-gray-400 font-medium';
      inputEl.classList.remove('border-emerald-300');
      if (indicatorEl) {
        indicatorEl.innerHTML = `<span class="text-[10px] font-bold text-gray-400">Belum Lengkap</span>`;
      }
    }
  };

  const updateUrlFeedbackUI = (idx) => {
    const inputEl = document.getElementById(`input-url-${idx}`);
    const feedbackEl = document.getElementById(`feedback-url-${idx}`);
    if (!inputEl || !feedbackEl) return;

    const result = checkUrlValidity(inputEl.value);

    inputEl.classList.remove(
      'border-secondary', 'ring-1', 'ring-secondary/30',
      'border-amber-400', 'ring-amber-300',
      'border-rose-400', 'ring-rose-300'
    );

    if (result.status === 'empty') {
      inputEl.classList.add('border-gray-200');
      feedbackEl.innerHTML = `<span class="text-[11px] text-gray-400">Tautan harus diawali http:// atau https://</span>`;
    } else if (result.status === 'recommended') {
      inputEl.classList.add('border-secondary', 'ring-1', 'ring-secondary/30');
      feedbackEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-secondary border border-emerald-200">
          ${IC.checkCircle}
          <span>${result.message}</span>
        </span>
      `;
    } else if (result.status === 'warning') {
      inputEl.classList.add('border-amber-400', 'ring-1', 'ring-amber-300');
      feedbackEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          ${IC.alertTriangle}
          <span>${result.message}</span>
        </span>
      `;
    } else {
      inputEl.classList.add('border-rose-400', 'ring-1', 'ring-rose-300');
      feedbackEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          ${IC.xCircle}
          <span>${result.message}</span>
        </span>
      `;
    }
  };

  [1, 2, 3].forEach(idx => {
    const inputPeran = document.getElementById(`input-peran-${idx}`);
    const inputUrl = document.getElementById(`input-url-${idx}`);

    if (inputPeran) {
      inputPeran.addEventListener('input', () => updateRoleCharCounter(idx));
      updateRoleCharCounter(idx);
    }

    if (inputUrl) {
      inputUrl.addEventListener('input', () => updateUrlFeedbackUI(idx));
      updateUrlFeedbackUI(idx);
    }
  });

  document.querySelectorAll('.btn-domain-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetDomain = chip.getAttribute('data-domain');
      if (!targetDomain) return;

      let targetInput = null;
      for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`input-url-${i}`);
        if (el && (!el.value || el.value.trim() === '')) {
          targetInput = el;
          break;
        }
      }
      if (!targetInput) {
        targetInput = document.getElementById('input-url-1');
      }

      if (targetInput) {
        targetInput.value = targetDomain;
        targetInput.focus();
        const idx = targetInput.id.split('-').pop();
        updateUrlFeedbackUI(idx);
        showToast(`Domain ${targetDomain} disematkan ke input URL ${idx}.`, 'info');
      }
    });
  });

  const renderInlinePreview = () => {
    if (!previewTableBody) return;
    const peranData = [1, 2, 3].map(i => {
      const desc = document.getElementById(`input-peran-${i}`)?.value.trim() || '';
      const url = document.getElementById(`input-url-${i}`)?.value.trim() || '';
      const valid = checkUrlValidity(url);
      return { index: i, desc, url, valid };
    });

    previewTableBody.innerHTML = peranData.map(item => `
      <tr class="hover:bg-gray-50/80 transition-colors">
        <td class="p-3 text-center font-bold text-gray-500">${item.index}</td>
        <td class="p-3">
          <p class="font-medium text-gray-900 leading-relaxed text-xs">
            ${item.desc || '<span class="text-rose-400 italic">Belum diisi</span>'}
          </p>
          <span class="text-[10px] ${item.desc.length >= 30 ? 'text-secondary font-bold' : 'text-rose-500 font-semibold'} mt-0.5 block">
            (${item.desc.length} / 30 karakter ${item.desc.length >= 30 ? '✓' : '— Belum cukup'})
          </span>
        </td>
        <td class="p-3">
          ${item.url ? `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[11px] font-bold break-all">
              <span class="truncate max-w-[180px]">${item.valid.domain || item.url}</span>
              <span class="flex-shrink-0">${IC.externalLink}</span>
            </a>
            <div class="mt-1">
              <span class="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${item.valid.status === 'recommended' ? 'bg-emerald-50 text-secondary border border-emerald-200' : item.valid.status === 'warning' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
                ${item.valid.status === 'recommended' ? 'Resmi' : item.valid.status === 'warning' ? 'Umum' : 'Invalid'}
              </span>
            </div>
          ` : '<span class="text-rose-400 italic">Belum diisi</span>'}
        </td>
      </tr>
    `).join('');
  };

  const closeInlinePreview = () => {
    if (previewBox) previewBox.classList.add('hidden');
    if (btnPreviewText) btnPreviewText.textContent = 'Pratinjau Laporan';
    if (btnPreviewIcon) btnPreviewIcon.innerHTML = IC.eye;
    btnPreviewLaporan?.classList.remove('bg-gray-100');
  };

  if (btnPreviewLaporan && previewBox) {
    btnPreviewLaporan.addEventListener('click', () => {
      const isHidden = previewBox.classList.contains('hidden');
      if (isHidden) {
        renderInlinePreview();
        previewBox.classList.remove('hidden');
        if (btnPreviewText) btnPreviewText.textContent = 'Tutup Pratinjau';
        if (btnPreviewIcon) btnPreviewIcon.innerHTML = IC.close;
        btnPreviewLaporan.classList.add('bg-gray-100');
        previewBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        closeInlinePreview();
      }
    });
  }

  btnCloseInlinePreview?.addEventListener('click', closeInlinePreview);

  const executeSaveLaporan = () => {
    const p1 = document.getElementById('input-peran-1')?.value.trim() || '';
    const p2 = document.getElementById('input-peran-2')?.value.trim() || '';
    const p3 = document.getElementById('input-peran-3')?.value.trim() || '';

    const u1 = document.getElementById('input-url-1')?.value.trim() || '';
    const u2 = document.getElementById('input-url-2')?.value.trim() || '';
    const u3 = document.getElementById('input-url-3')?.value.trim() || '';

    const items = [
      { desc: p1, url: u1, idx: 1 },
      { desc: p2, url: u2, idx: 2 },
      { desc: p3, url: u3, idx: 3 },
    ];

    for (const item of items) {
      if (item.desc.length < 30) {
        showToast(`Peran ke-${item.idx} belum memenuhi minimal 30 karakter.`, 'warning');
        const errEl = document.getElementById(`error-peran-${item.idx}`);
        if (errEl) errEl.classList.remove('hidden');
        document.getElementById(`input-peran-${item.idx}`)?.focus();
        return;
      }
      const val = checkUrlValidity(item.url);
      if (val.status === 'invalid' || val.status === 'empty') {
        showToast(`Tautan URL ke-${item.idx} tidak valid. Pastikan format tautan benar (http/https).`, 'warning');
        document.getElementById(`input-url-${item.idx}`)?.focus();
        return;
      }
    }

    const payload = {
      peran: [
        { deskripsi: p1, url: u1 },
        { deskripsi: p2, url: u2 },
        { deskripsi: p3, url: u3 },
      ],
      timestamp: new Date().toISOString()
    };

    setStorage(STORAGE_KEY_LAPORAN, payload);
    localStorage.setItem('modul2_done', 'true');
    setProgressStep('modul2', true);

    closeInlinePreview();

    if (typeof window.confetti === 'function') {
      try {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect triggered.');
      }
    }

    const savedTableBody = document.getElementById('saved-table-body');
    const savedTimestamp = document.getElementById('saved-laporan-timestamp');
    if (savedTimestamp) {
      savedTimestamp.textContent = new Date(payload.timestamp).toLocaleString('id-ID');
    }
    if (savedTableBody) {
      savedTableBody.innerHTML = payload.peran.map((p, idx) => {
        const val = checkUrlValidity(p.url);
        return `
          <tr class="hover:bg-white/5 transition-colors">
            <td class="p-3 text-center font-bold text-emerald-300">${idx + 1}</td>
            <td class="p-3">
              <p class="font-medium text-white leading-relaxed">${p.deskripsi}</p>
              <span class="text-[10px] text-emerald-300/70 font-mono mt-0.5 block">${p.deskripsi.length} karakter</span>
            </td>
            <td class="p-3">
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[#E5A024] hover:underline font-mono text-[11px] font-bold break-all">
                <span>${val.domain || p.url}</span>
                <span class="flex-shrink-0">${IC.externalLink}</span>
              </a>
              <div class="mt-1">
                <span class="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${val.status === 'recommended' ? 'bg-emerald-800 text-emerald-100 border border-emerald-600' : 'bg-amber-900/70 text-amber-200 border border-amber-700'}">
                  ${val.status === 'recommended' ? 'Domain Resmi' : 'Rujukan Valid'}
                </span>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    formLaporan?.classList.add('hidden');
    cardSaved?.classList.remove('hidden');

    if (statusBadgeContainer) {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-auto flex-shrink-0">
          ${IC.checkCircle}
          <span>Tugas Telah Dikumpulkan</span>
        </span>
      `;
    }

    showToast('Tugas Laporan Modul 2 berhasil disimpan! Selamat, modul 2 tuntas.', 'success');
    cardSaved?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (formLaporan) {
    formLaporan.addEventListener('submit', (e) => {
      e.preventDefault();
      executeSaveLaporan();
    });
  }

  btnEditLaporan?.addEventListener('click', () => {
    cardSaved?.classList.add('hidden');
    formLaporan?.classList.remove('hidden');
    [1, 2, 3].forEach(idx => {
      updateRoleCharCounter(idx);
      updateUrlFeedbackUI(idx);
    });
    formLaporan?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Mode pengeditan aktif. Silakan perbarui isianmu.', 'info');
  });

  btnResetLaporan?.addEventListener('click', () => {
    const isConfirmed = window.confirm('Apakah kamu yakin ingin mereset dan menghapus laporan ini? Kamu perlu mengisinya kembali untuk menyelesaikan Modul 2.');
    if (!isConfirmed) return;

    localStorage.removeItem(STORAGE_KEY_LAPORAN);
    localStorage.removeItem('modul2_done');
    setProgressStep('modul2', false);

    [1, 2, 3].forEach(idx => {
      const p = document.getElementById(`input-peran-${idx}`);
      const u = document.getElementById(`input-url-${idx}`);
      if (p) p.value = '';
      if (u) u.value = '';
      updateRoleCharCounter(idx);
      updateUrlFeedbackUI(idx);
    });

    cardSaved?.classList.add('hidden');
    formLaporan?.classList.remove('hidden');

    if (statusBadgeContainer) {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 self-start sm:self-auto flex-shrink-0">
          ${IC.sparkles}
          <span>Validasi Domain URL Aktif</span>
        </span>
      `;
    }

    showToast('Laporan tugas telah direset. Silakan isi kembali.', 'info');
  });

  updateExplorationUI();
}
