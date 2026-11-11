/**
 * SiBELA - Modul Mind Map Digital & Presentasi (Issue #9 • TP 10.D.8)
 * Fitur:
 * 1. Kanvas Kerja Interaktif (Zoomable & Pannable) dengan Node Pusat "Peran Indonesia di Dunia".
 * 2. Panel Kartu Gagasan (Drag & Drop desktop + Tap-to-Place mobile + Custom Gagasan).
 * 3. Koneksi Cabang Visual via SVG Cubic Bezier Curves (Klik/Tap sumber -> Klik/Tap target, hapus koneksi).
 * 4. Validasi Minimal 3 Cabang terhubung ke topik utama dengan animasi highlight & pesan error presisi.
 * 5. Form Simpulan Presentasi berbasis UUD 1945 (min. 100 karakter + hint Pasal UUD 1945).
 * 6. Ekspor Gambar PNG (html2canvas dengan Canvas2D high-DPI fallback) & Persistensi localStorage `sibela_mindmap`.
 */

import {
  getStorage,
  setStorage,
  setProgressStep,
  STORAGE_KEYS,
  showToast,
  formatTanggalID
} from '../js/utils.js';

const STAGE_W = 1400;
const STAGE_H = 860;
const CENTER_NODE = { id: 'center', text: 'Peran Indonesia di Dunia', x: 700, y: 430 };

// Daftar Gagasan Preset dengan Identitas Visual Unik tiap Topik
const PRESET_IDEAS = [
  {
    id: 'preset-asean',
    text: 'Pendiri ASEAN',
    tag: 'Deklarasi Bangkok • 1967',
    accent: '#1E3A8A',
    accentSecondary: '#DC2626',
    stripe: 'linear-gradient(90deg, #1E3A8A 0%, #DC2626 55%, #F59E0B 100%)',
    bgTint: '#F8FAFF',
    badgeBg: '#DBEAFE',
    badgeBorder: '#93C5FD',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.8"><circle cx="12" cy="12" r="9.5" stroke="#1E3A8A"/><path stroke="#D97706" stroke-linecap="round" d="M8 7c1 3 1.5 6 1.5 10M10.5 6.5c.5 3.5.7 6.5.7 11M13.5 6.5c-.5 3.5-.7 6.5-.7 11M16 7c-1 3-1.5 6-1.5 10"/><path stroke="#DC2626" stroke-width="2" stroke-linecap="round" d="M7.5 13.5h9"/></svg>`
  },
  {
    id: 'preset-pbb',
    text: 'Anggota Aktif PBB',
    tag: 'Anggota ke-60 • 1950',
    accent: '#0284C7',
    accentSecondary: '#0369A1',
    stripe: 'linear-gradient(90deg, #0369A1 0%, #38BDF8 100%)',
    bgTint: '#F4FAFF',
    badgeBg: '#E0F2FE',
    badgeBorder: '#7DD3FC',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#0284C7" stroke-width="1.8"><circle cx="12" cy="11" r="6.5"/><path stroke-linecap="round" d="M6 11h12M12 4.5a10 10 0 0 0 0 13M12 4.5a10 10 0 0 1 0 13"/><path stroke="#0369A1" stroke-linecap="round" d="M4.5 13c.5 4 3.5 6.5 7.5 7m7.5-7c-.5 4-3.5 6.5-7.5 7"/></svg>`
  },
  {
    id: 'preset-garuda',
    text: 'Misi Pasukan Garuda',
    tag: 'Kontingen Perdamaian PBB',
    accent: '#0F766E',
    accentSecondary: '#D97706',
    stripe: 'linear-gradient(90deg, #0F766E 0%, #0284C7 55%, #F59E0B 100%)',
    bgTint: '#F2FCFA',
    badgeBg: '#CCFBF1',
    badgeBorder: '#5EEAD4',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#0F766E" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6.5v5.2c0 4.8 3.2 8.7 7.5 9.8 4.3-1.1 7.5-5 7.5-9.8V6.5L12 3Z"/><path stroke="#D97706" stroke-linecap="round" stroke-linejoin="round" d="M8.5 11.5c1.2-.5 2.5.2 3.5 1.5 1-1.3 2.3-2 3.5-1.5m-6 2.8c1-.2 1.8.2 2.5 1 .7-.8 1.5-1.2 2.5-1"/></svg>`
  },
  {
    id: 'preset-g20',
    text: 'Presidensi KTT G20',
    tag: 'Presidensi Bali • 2022',
    accent: '#B45309',
    accentSecondary: '#991B1B',
    stripe: 'linear-gradient(90deg, #991B1B 0%, #D97706 60%, #FBBF24 100%)',
    bgTint: '#FFFDF5',
    badgeBg: '#FEF3C7',
    badgeBorder: '#FCD34D',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#B45309" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-2.5 3.5-6 7.5-6 12.5h12C18 10.5 14.5 6.5 12 3Z"/><path stroke="#991B1B" stroke-linecap="round" stroke-linejoin="round" d="M9 15.5V12m3 3.5v-5m3 5V13M5 19.5h14"/></svg>`
  },
  {
    id: 'preset-mediator',
    text: 'Mediator Konflik Regional',
    tag: 'Diplomasi Perdamaian',
    accent: '#047857',
    accentSecondary: '#10B981',
    stripe: 'linear-gradient(90deg, #047857 0%, #10B981 100%)',
    bgTint: '#F3FCF7',
    badgeBg: '#D1FAE5',
    badgeBorder: '#6EE7B7',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#047857" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m-7-9h14M6 11l-2.5 4.5a2.5 2.5 0 0 0 5 0L6 11Zm12 0-2.5 4.5a2.5 2.5 0 0 0 5 0L18 11ZM8.5 20h7"/></svg>`
  },
  {
    id: 'preset-oki',
    text: 'Anggota Aktif OKI',
    tag: 'Solidaritas Islam • 1969',
    accent: '#15803D',
    accentSecondary: '#CA8A04',
    stripe: 'linear-gradient(90deg, #15803D 0%, #CA8A04 100%)',
    bgTint: '#F4FDF6',
    badgeBg: '#DCFCE7',
    badgeBorder: '#86EFAC',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#15803D" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.5 17.8A7 7 0 0 1 9.2 6.2a7 7 0 1 0 9.6 9.6 6.9 6.9 0 0 1-3.3 2Z"/><circle cx="15.5" cy="8.5" r="1.5" fill="#CA8A04" stroke="none"/><path stroke="#CA8A04" stroke-linecap="round" d="M15.5 5.2v1m0 4.6v1m-3.3-3.3h1m4.6 0h1"/></svg>`
  },
  {
    id: 'preset-bebasaktif',
    text: 'Politik Bebas Aktif',
    tag: 'Prinsip Dasar • 1948',
    accent: '#B91C1C',
    accentSecondary: '#D97706',
    stripe: 'linear-gradient(90deg, #DC2626 0%, #DC2626 52%, #E5E7EB 52%, #F3F4F6 100%)',
    bgTint: '#FFF7F7',
    badgeBg: '#FEE2E2',
    badgeBorder: '#FCA5A5',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#B91C1C" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path stroke="#D97706" stroke-linecap="round" stroke-linejoin="round" d="m14.8 9.2-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8Z"/></svg>`
  },
  {
    id: 'preset-kaa',
    text: 'Konferensi Asia-Afrika',
    tag: 'Dasasila Bandung • 1955',
    accent: '#C2410C',
    accentSecondary: '#D97706',
    stripe: 'linear-gradient(90deg, #9A3412 0%, #EA580C 60%, #F59E0B 100%)',
    bgTint: '#FFF9F3',
    badgeBg: '#FFEDD5',
    badgeBorder: '#FDBA74',
    icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#C2410C" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" fill="#FEF3C7" d="M12 3c1.8 1.8 2.5 3.6 1.2 5.5-.6.9-1.8.9-2.4 0C9.5 6.6 10.2 4.8 12 3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 11.5h7l-1.3 8.5h-4.4l-1.3-8.5Zm-1.5 0h10"/></svg>`
  }
];

const CUSTOM_IDEA_THEME = {
  id: 'custom',
  tag: 'Gagasan Mandiri',
  accent: '#6D28D9',
  accentSecondary: '#8B5CF6',
  stripe: 'linear-gradient(90deg, #6D28D9 0%, #8B5CF6 100%)',
  bgTint: '#FAF8FF',
  badgeBg: '#EDE9FE',
  badgeBorder: '#C4B5FD',
  icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6D28D9" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>`
};

function getNodeTheme(node) {
  if (!node) return CUSTOM_IDEA_THEME;
  const byId = node.presetId ? PRESET_IDEAS.find(p => p.id === node.presetId) : null;
  if (byId) return byId;
  const byText = PRESET_IDEAS.find(p => p.text.toLowerCase() === String(node.text || '').trim().toLowerCase());
  return byText || CUSTOM_IDEA_THEME;
}

// Posisi radial aman di sekitar node pusat saat Tap-to-Place
const RADIAL_SLOTS = [
  { x: 420, y: 240 },
  { x: 980, y: 240 },
  { x: 400, y: 430 },
  { x: 1000, y: 430 },
  { x: 430, y: 620 },
  { x: 970, y: 620 },
  { x: 700, y: 185 },
  { x: 700, y: 675 },
  { x: 250, y: 310 },
  { x: 1150, y: 310 },
  { x: 250, y: 550 },
  { x: 1150, y: 550 }
];

// Lucide-style SVG Icons
const IC = {
  globe: `<svg class="w-6 h-6 text-[#E5A024]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18"/></svg>`,
  mindmap: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6ZM9 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Zm0-6h6m-3 0v4"/></svg>`,
  plus: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>`,
  minus: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/></svg>`,
  link: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/></svg>`,
  trash: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`,
  centerFocus: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
  checkCircle: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  alert: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>`,
  download: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>`,
  save: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>`,
  lightbulb: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6 6 0 1 0-4.243-1.757L12 12.75Zm0 0h.008M9 21h6m-4.5-3h3"/></svg>`,
  reset: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  lock: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>`,
  book: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>`,
  arrowRight: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`
};

// State internal modul Mind Map
let state = {
  nodes: [], // { id, text, x, y, connectedTo: [], isCustom?: boolean, presetId?: string }
  zoom: 0.9,
  panX: 0,
  panY: 0,
  connectingFromId: null, // id node sumber saat mode hubungkan aktif
  isLinkMode: false, // toggle toolbar mode hubungkan
  isValidated: false,
  validationPulse: false,
  validationError: '',
  simpulan: '',
  dasarHukum: '',
  showUudHint: false,
  isSaved: false,
  savedTimestamp: null,
  nodeIdCounter: 1
};

// State pointer drag / pan sementara
let dragState = {
  type: null, // 'node' | 'pan' | null
  nodeId: null,
  startClientX: 0,
  startClientY: 0,
  origX: 0,
  origY: 0,
  hasMoved: false
};

let boundGlobalListeners = false;

/**
 * Mengambil jumlah cabang gagasan yang terhubung langsung ke node pusat ("center")
 */
function getDirectCenterNodes() {
  return state.nodes.filter(n => Array.isArray(n.connectedTo) && n.connectedTo.includes('center'));
}

/**
 * Menghitung semua pasangan edge unik untuk digambar di SVG
 */
function getUniqueEdges() {
  const edges = [];
  const seen = new Set();

  state.nodes.forEach(node => {
    (node.connectedTo || []).forEach(targetId => {
      const pairKey = [node.id, targetId].sort().join('__');
      if (!seen.has(pairKey)) {
        seen.add(pairKey);
        const targetNode = targetId === 'center'
          ? CENTER_NODE
          : state.nodes.find(n => n.id === targetId);
        if (targetNode) {
          edges.push({
            key: pairKey,
            sourceId: node.id,
            targetId,
            from: node,
            to: targetNode,
            isCenterEdge: targetId === 'center' || node.id === 'center'
          });
        }
      }
    });
  });

  return edges;
}

/**
 * Simpan draft state otomatis ke localStorage (tidak mengubah status mindmap_done sampai klik Simpan & Selesai)
 */
function persistDraft() {
  const existing = getStorage(STORAGE_KEYS.MINDMAP, {});
  setStorage(STORAGE_KEYS.MINDMAP, {
    ...existing,
    nodes: state.nodes,
    simpulan: state.simpulan,
    dasarHukum: state.dasarHukum,
    isValidated: state.isValidated,
    timestamp: existing.timestamp || null
  });
}

/**
 * Muat data Mind Map tersimpan dari localStorage
 */
function loadSavedState() {
  const saved = getStorage(STORAGE_KEYS.MINDMAP, null);
  if (saved && Array.isArray(saved.nodes)) {
    state.nodes = saved.nodes.map(n => ({
      ...n,
      connectedTo: Array.isArray(n.connectedTo) ? n.connectedTo : []
    }));
    state.simpulan = saved.simpulan || '';
    state.dasarHukum = saved.dasarHukum || '';
    state.isValidated = Boolean(saved.isValidated) && getDirectCenterNodes().length >= 3;
    state.isSaved = Boolean(saved.completed);
    state.savedTimestamp = saved.timestamp || null;
    state.nodeIdCounter = state.nodes.length + 1;
  } else {
    state.nodes = [];
    state.simpulan = '';
    state.dasarHukum = '';
    state.isValidated = false;
    state.isSaved = false;
    state.savedTimestamp = null;
    state.nodeIdCounter = 1;
  }
  state.connectingFromId = null;
  state.isLinkMode = false;
  state.validationError = '';
}

/**
 * Hitung panX & panY agar node pusat tepat berada di tengah viewport
 */
function centerViewport() {
  const vp = document.getElementById('mindmap-viewport');
  if (!vp) return;
  const rect = vp.getBoundingClientRect();
  const isSmall = rect.width < 640;
  state.zoom = isSmall ? 0.68 : 0.92;
  state.panX = Math.round(rect.width / 2 - CENTER_NODE.x * state.zoom);
  state.panY = Math.round(rect.height / 2 - CENTER_NODE.y * state.zoom);
}

/**
 * Render halaman utama Mind Map Digital
 */
export function render() {
  return `
    <div class="page-enter max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-0 sm:pt-4">

      <!-- ================= 1. UNIFIED CURVED HEADER (KONSISTEN MODUL 1, 2 & KUIS) ================= -->
      <header class="bg-[#0E4632] rounded-b-[2.5rem] lg:rounded-b-[3.5rem] px-5 sm:px-8 pt-5 sm:pt-7 pb-7 sm:pb-9 text-white shadow-md relative overflow-hidden -mx-4 sm:-mx-6 mb-6 sm:mb-8">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div>
            <a href="#/kuis" class="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-bold transition-colors py-1 self-start">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              <span>Kuis Evaluasi</span>
            </a>

            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1.5 tracking-tight leading-tight">
              Mind Map Digital & Presentasi
            </h1>
          </div>

          <div class="hidden sm:flex items-center gap-2 self-start sm:self-center">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-100 border border-white/20 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#E5A024] animate-pulse"></span>
              <span>Tahap 4 dari 4: TP 10.D.8</span>
            </span>
          </div>
        </div>
      </header>

      <!-- ================= 2. CONTAINER DINAMIS MIND MAP ================= -->
      <div id="mindmap-root" class="space-y-6">
        <!-- Di-render dinamis oleh renderMindMapWorkspace() -->
      </div>

    </div>
  `;
}

/**
 * Inisialisasi halaman Mind Map saat route #/mindmap dibuka
 */
export function init() {
  loadSavedState();
  renderWorkspace();
  // Pusatkan kanvas pada node tengah setelah DOM ter-mount
  requestAnimationFrame(() => {
    centerViewport();
    applyStageTransform();
  });
  ensureGlobalPointerListeners();
}

/**
 * Render seluruh area kerja: Panduan singkat, Panel Kartu Gagasan + Kanvas Interaktif, dan Form Simpulan
 */
function renderWorkspace() {
  const root = document.getElementById('mindmap-root');
  if (!root) return;

  const directCount = getDirectCenterNodes().length;
  const studentName = getStorage(STORAGE_KEYS.NAMA, 'Siswa Pancasila');
  const placedPresetIds = new Set(state.nodes.map(n => n.presetId).filter(Boolean));

  root.innerHTML = `
    <!-- Panduan & Indikator Cabang -->
    <div class="glass-card p-5 sm:p-6 border-l-4 border-primary">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
        <div class="flex items-start gap-3.5" style="max-width: 640px;">
          <div class="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#0E4632] flex items-center justify-center flex-shrink-0">
            ${IC.mindmap}
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-extrabold text-gray-900">
              Susun Peta Konsep: Peran Indonesia di Dunia
            </h2>
            <p class="text-xs text-gray-600 mt-1 leading-relaxed">
              Seret (<em>drag</em>) atau ketuk kartu gagasan ke kanvas, lalu klik tombol <strong>Hubungkan</strong> pada kartu dan pilih <strong>Topik Utama</strong> (atau kartu lain). Hubungkan minimal <strong>3 cabang</strong> ke topik utama untuk membuka Form Simpulan Presentasi.
            </p>
          </div>
        </div>

        <!-- Status Counter Pill -->
        <div id="mindmap-branch-counter" style="display: inline-flex; align-items: center; gap: 0.625rem; padding: 0.625rem 1rem; border-radius: 1rem; border: 1.5px solid ${directCount >= 3 ? '#A7F3D0' : '#FDE68A'}; background: ${directCount >= 3 ? '#ECFDF5' : '#FFFBEB'};">
          <span style="color: ${directCount >= 3 ? '#059669' : '#D97706'}; display: flex;">
            ${directCount >= 3 ? IC.checkCircle : IC.alert}
          </span>
          <div>
            <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #6B7280;">Cabang ke Topik Utama</div>
            <div style="font-size: 0.875rem; font-weight: 900; color: ${directCount >= 3 ? '#047857' : '#B45309'};">
              ${directCount} / 3 Minimal Cabang
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Workspace Kanvas & Panel Kartu Gagasan -->
    <div class="glass-card p-4 sm:p-5 space-y-4">

      <!-- Toolbar Kontrol Kanvas -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid #E5E7EB;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;">
          <!-- Mode Hubungkan Toggle -->
          <button
            type="button"
            id="btn-toggle-link-mode"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            style="border: 1.5px solid ${state.isLinkMode || state.connectingFromId ? '#D97706' : '#D1D5DB'}; background: ${state.isLinkMode || state.connectingFromId ? '#FEF3C7' : '#FFFFFF'}; color: ${state.isLinkMode || state.connectingFromId ? '#92400E' : '#374151'};"
          >
            ${IC.link}
            <span>${state.connectingFromId ? 'Pilih Target Koneksi...' : (state.isLinkMode ? 'Mode Hubungkan: ON' : 'Mode Hubungkan')}</span>
          </button>

          ${state.connectingFromId ? `
            <button type="button" id="btn-cancel-link" class="px-3 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer">
              Batal Hubungkan
            </button>
          ` : ''}
        </div>

        <!-- Kontrol Zoom, Center & Reset -->
        <div style="display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap;">
          <button type="button" id="btn-zoom-out" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer" title="Perkecil Kanvas">
            ${IC.minus}
          </button>
          <span id="zoom-percent-label" class="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700" style="min-width: 54px; text-align: center;">
            ${Math.round(state.zoom * 100)}%
          </span>
          <button type="button" id="btn-zoom-in" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer" title="Perbesar Kanvas">
            ${IC.plus}
          </button>
          <button type="button" id="btn-center-canvas" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer" title="Pusatkan Kanvas">
            ${IC.centerFocus}
            <span class="hidden sm:inline">Pusatkan</span>
          </button>
          <button type="button" id="btn-reset-canvas" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer" title="Reset Seluruh Kanvas">
            ${IC.reset}
            <span class="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <!-- Layout 2 Area: Sidebar Kartu Gagasan + Kanvas Interaktif -->
      <div id="mindmap-split-grid" style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem;">
        
        <!-- Panel Kartu Gagasan -->
        <div class="rounded-2xl bg-[#FAF7EE] border border-gray-200/90 p-4 space-y-3.5">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <div>
              <h3 class="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Kartu Gagasan</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Seret ke kanvas atau ketuk untuk menempatkan</p>
            </div>
            <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
              ${state.nodes.length} di kanvas
            </span>
          </div>

          <!-- Daftar Preset Gagasan -->
          <div id="preset-cards-deck" style="display: flex; flex-wrap: wrap; gap: 0.55rem;">
            ${PRESET_IDEAS.map(idea => {
              const isPlaced = placedPresetIds.has(idea.id);
              return `
                <div
                  class="preset-idea-card select-none rounded-xl px-3 py-2 border transition-all ${isPlaced ? 'opacity-60' : 'hover:shadow-sm cursor-grab active:cursor-grabbing'}"
                  draggable="${isPlaced ? 'false' : 'true'}"
                  data-preset-id="${idea.id}"
                  data-idea-text="${idea.text}"
                  style="
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    cursor: ${isPlaced ? 'default' : 'pointer'};
                    background: ${isPlaced ? '#F3F4F6' : idea.bgTint};
                    border-color: ${isPlaced ? '#E5E7EB' : idea.badgeBorder};
                    border-left: 4px solid ${isPlaced ? '#9CA3AF' : idea.accent};
                  "
                >
                  <span style="width: 30px; height: 30px; border-radius: 0.6rem; background: ${isPlaced ? '#E5E7EB' : idea.badgeBg}; border: 1px solid ${isPlaced ? '#D1D5DB' : idea.badgeBorder}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    ${idea.icon}
                  </span>
                  <div>
                    <div class="text-xs font-extrabold leading-tight" style="color: ${isPlaced ? '#6B7280' : '#111827'};">${idea.text}</div>
                    <div class="text-[10px] font-semibold" style="color: ${isPlaced ? '#9CA3AF' : idea.accent};">${isPlaced ? 'Sudah di kanvas' : idea.tag}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Input Tambah Gagasan Sendiri (Custom Card) -->
          <form id="form-add-custom-idea" style="display: flex; gap: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #D1D5DB;">
            <input
              type="text"
              id="input-custom-idea"
              maxlength="48"
              placeholder="Tambah gagasan sendiri (cth: Ekspor Budaya Nusantara)..."
              class="flex-grow px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0E4632]"
            />
            <button
              type="submit"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E4632] hover:bg-[#093223] text-white text-xs font-bold transition-all cursor-pointer flex-shrink-0"
            >
              ${IC.plus}
              <span>Tambah</span>
            </button>
          </form>
        </div>

        <!-- Area Kanvas Interaktif (Zoom & Pan) -->
        <div class="relative rounded-2xl overflow-hidden border-2 ${state.connectingFromId ? 'border-[#E5A024]' : 'border-gray-200'}" style="background-color: #F8FAF7; background-image: radial-gradient(#CBD5E1 1.25px, transparent 1.25px); background-size: 22px 22px;">
          
          <!-- Petunjuk Floating Mode Hubungkan -->
          ${state.connectingFromId ? `
            <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 30; background: #FFFBEB; border: 1.5px solid #F59E0B; color: #92400E; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; box-shadow: 0 6px 18px rgba(0,0,0,0.08); white-space: nowrap; max-width: 92%; overflow: hidden; text-overflow: ellipsis;">
              Klik "Peran Indonesia di Dunia" atau kartu lain untuk menghubungkan cabang
            </div>
          ` : `
            <div style="position: absolute; bottom: 10px; left: 12px; z-index: 20; background: rgba(255,255,255,0.9); border: 1px solid #E5E7EB; color: #6B7280; padding: 0.3rem 0.65rem; border-radius: 0.6rem; font-size: 0.68rem; font-weight: 600; pointer-events: none;">
              Geser area kosong untuk pan • Geser kartu untuk atur posisi • Klik garis untuk hapus cabang
            </div>
          `}

          <!-- Viewport Kanvas -->
          <div
            id="mindmap-viewport"
            style="width: 100%; height: 480px; position: relative; overflow: hidden; touch-action: none; cursor: grab;"
          >
            <!-- Inner Transformed Stage -->
            <div
              id="mindmap-stage"
              style="width: ${STAGE_W}px; height: ${STAGE_H}px; position: absolute; top: 0; left: 0; transform-origin: 0 0; transform: translate(${state.panX}px, ${state.panY}px) scale(${state.zoom});"
            >
              <!-- Layer 1: SVG Edges -->
              <svg
                id="mindmap-edges-svg"
                width="${STAGE_W}"
                height="${STAGE_H}"
                viewBox="0 0 ${STAGE_W} ${STAGE_H}"
                style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible;"
              >
                ${renderEdgesSVGContent()}
              </svg>

              <!-- Layer 2: Central Node ("Peran Indonesia di Dunia") -->
              <div
                id="node-center"
                data-node-id="center"
                class="mindmap-node-target select-none"
                style="
                  position: absolute;
                  left: ${CENTER_NODE.x}px;
                  top: ${CENTER_NODE.y}px;
                  transform: translate(-50%, -50%);
                  z-index: 15;
                  min-width: 230px;
                  padding: 1rem 1.35rem;
                  border-radius: 1.25rem;
                  background: linear-gradient(135deg, #0E4632 0%, #0A3425 100%);
                  color: #FFFFFF;
                  border: 3px solid ${state.connectingFromId && state.connectingFromId !== 'center' ? '#E5A024' : '#E5A024'};
                  box-shadow: ${state.connectingFromId && state.connectingFromId !== 'center' ? '0 0 0 6px rgba(229,160,36,0.35), 0 16px 32px rgba(14,70,50,0.3)' : '0 14px 32px rgba(14,70,50,0.28)'};
                  cursor: ${state.connectingFromId || state.isLinkMode ? 'pointer' : 'default'};
                  transition: box-shadow 0.2s ease, transform 0.2s ease;
                "
              >
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 42px; height: 42px; border-radius: 0.85rem; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    ${IC.globe}
                  </div>
                  <div>
                    <div style="font-size: 0.625rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #FCD34D;">Topik Utama</div>
                    <div style="font-size: 0.95rem; font-weight: 900; line-height: 1.25;">Peran Indonesia di Dunia</div>
                  </div>
                </div>
              </div>

              <!-- Layer 3: Placed Idea Nodes -->
              ${state.nodes.map(node => renderPlacedNodeHTML(node)).join('')}

            </div>
          </div>
        </div>

      </div>

      <!-- Pesan Error Validasi (jika cabang < 3) -->
      ${state.validationError ? `
        <div id="mindmap-validation-alert" class="p-4 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-900 flex items-center gap-3 page-enter">
          <span class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            ${IC.alert}
          </span>
          <div class="text-xs sm:text-sm font-bold">
            ${state.validationError}
          </div>
        </div>
      ` : ''}

      <!-- Footer Aksi Kanvas: Simpan Gambar & Periksa Mind Map -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding-top: 0.5rem;">
        <button
          type="button"
          id="btn-export-png"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
        >
          ${IC.download}
          <span>Simpan sebagai Gambar (PNG)</span>
        </button>

        <button
          type="button"
          id="btn-validate-mindmap"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0E4632] hover:bg-[#093223] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          style="margin-left: auto;"
        >
          ${IC.checkCircle}
          <span>Periksa Mind Map</span>
        </button>
      </div>
    </div>

    <!-- ================= 3. FORM SIMPULAN PRESENTASI BERBASIS UUD 1945 ================= -->
    <div id="simpulan-section" class="glass-card p-6 sm:p-8 border-t-4 ${state.isValidated ? 'border-emerald-600' : 'border-gray-300'} transition-all">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${state.isValidated ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}">
            ${state.isValidated ? IC.book : IC.lock}
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-extrabold text-gray-900">
              Form Simpulan Presentasi (Berbasis UUD 1945)
            </h2>
            <p class="text-xs text-gray-500 mt-0.5">
              ${state.isValidated ? 'Mind map valid! Susun simpulan argumentatif untuk bekal presentasi lisanmu.' : 'Terkunci: Hubungkan minimal 3 gagasan ke topik utama lalu klik "Periksa Mind Map" untuk membuka form ini.'}
            </p>
          </div>
        </div>

        <span class="px-3 py-1 rounded-full text-xs font-bold ${state.isValidated ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'}">
          ${state.isValidated ? 'Terbuka' : 'Terkunci'}
        </span>
      </div>

      ${!state.isValidated ? `
        <div class="p-6 rounded-2xl bg-gray-50 border border-dashed border-gray-300 text-center space-y-2">
          <p class="text-xs sm:text-sm font-semibold text-gray-600">
            Hubungkan minimal <strong>3 kartu gagasan</strong> ke node pusat <strong>"Peran Indonesia di Dunia"</strong>, kemudian klik tombol <strong>"Periksa Mind Map"</strong> di atas.
          </p>
        </div>
      ` : `
        <form id="form-simpulan-presentasi" class="space-y-5">
          <!-- Field 1: Simpulan -->
          <div class="space-y-2">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
              <label for="input-simpulan" class="text-xs sm:text-sm font-bold text-gray-900">
                1. Rumuskan simpulan tentang pentingnya peran Indonesia di dunia (minimal 100 karakter)
              </label>
              <span id="simpulan-char-count" class="text-xs font-bold ${state.simpulan.trim().length >= 100 ? 'text-emerald-600' : 'text-amber-600'}">
                ${state.simpulan.trim().length} / 100 karakter
              </span>
            </div>
            <textarea
              id="input-simpulan"
              rows="4"
              placeholder="Tuliskan kesimpulanmu mengenai kontribusi nyata Indonesia di dunia internasional (misalnya peran di ASEAN, misi perdamaian PBB/Garuda, G20, dan dampaknya terhadap perdamaian dunia)..."
              class="w-full p-4 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-gray-800 leading-relaxed focus:outline-none focus:border-[#0E4632]"
            >${escapeHTML(state.simpulan)}</textarea>
          </div>

          <!-- Field 2: Dasar Hukum UUD 1945 -->
          <div class="space-y-2">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
              <label for="input-dasar-hukum" class="text-xs sm:text-sm font-bold text-gray-900">
                2. Sebutkan dasar hukum dari UUD 1945 yang mendukung simpulanmu
              </label>
              <button
                type="button"
                id="btn-toggle-uud-hint"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
              >
                ${IC.lightbulb}
                <span>${state.showUudHint ? 'Sembunyikan Referensi UUD 1945' : 'Lihat Contoh Pasal UUD 1945'}</span>
              </button>
            </div>

            ${state.showUudHint ? `
              <div class="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2 page-enter">
                <div class="font-extrabold text-amber-900">Referensi Landasan Konstitusional Politik Luar Negeri Indonesia:</div>
                <ul class="space-y-1.5 list-disc pl-4 text-gray-700">
                  <li><strong>Pembukaan UUD 1945 Alinea ke-4:</strong> Tujuan negara Indonesia untuk <em>"...ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial."</em></li>
                  <li><strong>Pasal 11 Ayat (1) & (2) UUD 1945:</strong> Kewenangan Presiden dengan persetujuan DPR untuk menyatakan perang, membuat perdamaian, dan perjanjian internasional dengan negara lain.</li>
                  <li><strong>Pasal 13 Ayat (1)–(3) UUD 1945:</strong> Pengangkatan duta dan konsul oleh Presiden serta penerimaan penempatan duta negara lain dengan memperhatikan pertimbangan DPR.</li>
                </ul>
              </div>
            ` : ''}

            <textarea
              id="input-dasar-hukum"
              rows="3"
              placeholder="Contoh: Pembukaan UUD 1945 Alinea ke-4 tentang ketertiban dunia, serta Pasal 11 UUD 1945 mengenai perjanjian internasional dan perdamaian..."
              class="w-full p-4 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-gray-800 leading-relaxed focus:outline-none focus:border-[#0E4632]"
            >${escapeHTML(state.dasarHukum)}</textarea>
          </div>

          <!-- Tombol Simpan & Selesai -->
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #E5E7EB;">
            <div class="text-xs text-gray-500">
              ${state.isSaved && state.savedTimestamp ? `Tersimpan terakhir: <strong>${formatTanggalID(state.savedTimestamp)}</strong>` : 'Pastikan simpulan dan dasar hukum sudah terisi lengkap.'}
            </div>

            <button
              type="submit"
              id="btn-save-mindmap"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E5A024] hover:bg-amber-400 text-[#0E4632] font-black text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              style="margin-left: auto;"
            >
              ${IC.save}
              <span>Simpan & Selesai</span>
            </button>
          </div>
        </form>

        ${state.isSaved ? `
          <div class="mt-5 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-enter">
            <div class="flex items-start gap-3">
              <span class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                ${IC.checkCircle}
              </span>
              <div>
                <div class="text-sm font-black text-emerald-950">Mind Map & Simpulan Berhasil Disimpan!</div>
                <p class="text-xs text-emerald-800 mt-0.5">
                  Progress pembelajaran Tahap 4 (TP 10.D.8) untuk <strong>${studentName}</strong> telah ditandai tuntas. Kamu siap mempresentasikan hasilnya di kelas!
                </p>
              </div>
            </div>
            <a href="#/" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E4632] hover:bg-[#093223] text-white font-bold text-xs shadow-sm transition-all flex-shrink-0">
              <span>Ke Beranda</span>
              ${IC.arrowRight}
            </a>
          </div>
        ` : ''}
      `}
    </div>

    <!-- Navigation Footer -->
    <div class="flex items-center justify-between pt-2">
      <a href="#/kuis" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white/80 hover:bg-white border border-gray-200 transition-all">
        <span>← Kembali ke Kuis Evaluasi</span>
      </a>
      <a href="#/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark shadow-sm transition-all">
        <span>Kembali ke Beranda →</span>
      </a>
    </div>
  `;

  bindWorkspaceEvents();
}

/**
 * Render HTML untuk setiap kartu gagasan yang ditempatkan di kanvas
 */
function renderPlacedNodeHTML(node) {
  const theme = getNodeTheme(node);
  const isConnectedToCenter = (node.connectedTo || []).includes('center');
  const isSource = state.connectingFromId === node.id;
  const isTargetable = Boolean(state.connectingFromId && state.connectingFromId !== node.id);
  const pulseBorder = state.validationPulse && isConnectedToCenter;

  let borderColor = theme.badgeBorder;
  let boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
  if (isSource) {
    borderColor = '#E5A024';
    boxShadow = '0 0 0 4px rgba(229,160,36,0.32), 0 12px 26px rgba(0,0,0,0.12)';
  } else if (pulseBorder || isConnectedToCenter) {
    borderColor = '#059669';
    boxShadow = pulseBorder
      ? '0 0 0 5px rgba(5,150,105,0.28), 0 10px 24px rgba(5,150,105,0.2)'
      : '0 8px 20px rgba(5,150,105,0.14)';
  } else if (isTargetable) {
    borderColor = '#F59E0B';
  }

  return `
    <div
      class="mindmap-placed-node select-none"
      data-node-id="${node.id}"
      style="
        position: absolute;
        left: ${node.x}px;
        top: ${node.y}px;
        transform: translate(-50%, -50%);
        z-index: ${isSource ? 25 : 14};
        min-width: 215px;
        max-width: 260px;
        background: ${theme.bgTint};
        border: 2px solid ${borderColor};
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: ${boxShadow};
        cursor: ${state.connectingFromId || state.isLinkMode ? 'pointer' : 'grab'};
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      "
    >
      <!-- Top Signature Color Ribbon -->
      <div style="height: 5px; width: 100%; background: ${theme.stripe};"></div>

      <!-- Subtle Watermark Emblem -->
      <div style="position: absolute; right: 6px; bottom: 28px; opacity: 0.08; transform: scale(2.4); pointer-events: none;">
        ${theme.icon}
      </div>

      <div style="padding: 0.65rem 0.85rem 0.7rem; position: relative; z-index: 2;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.55rem;">
            <span style="width: 34px; height: 34px; border-radius: 0.65rem; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${theme.icon}
            </span>
            <div>
              <div style="font-size: 0.8rem; font-weight: 800; color: #111827; line-height: 1.25;">${escapeHTML(node.text)}</div>
              <div style="font-size: 0.625rem; font-weight: 700; color: ${theme.accent}; margin-top: 0.1rem;">${theme.tag}</div>
            </div>
          </div>
          <button
            type="button"
            class="btn-delete-node"
            data-node-id="${node.id}"
            title="Hapus kartu dari kanvas"
            style="width: 22px; height: 22px; border-radius: 0.5rem; background: rgba(255,255,255,0.85); border: 1px solid #E5E7EB; color: #6B7280; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer;"
          >
            ${IC.trash}
          </button>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-top: 0.6rem; padding-top: 0.45rem; border-top: 1px solid rgba(0,0,0,0.06);">
          <span style="display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.65rem; font-weight: 700; color: ${isConnectedToCenter ? '#059669' : '#6B7280'};">
            <span style="width: 7px; height: 7px; border-radius: 9999px; background: ${isConnectedToCenter ? '#059669' : theme.accent};"></span>
            <span>${isConnectedToCenter ? 'Terhubung ke Pusat' : ((node.connectedTo || []).length > 0 ? `${node.connectedTo.length} koneksi` : 'Belum terhubung')}</span>
          </span>

          <button
            type="button"
            class="btn-link-node"
            data-node-id="${node.id}"
            title="Hubungkan kartu ini ke Topik Utama atau kartu lain"
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.25rem;
              padding: 0.22rem 0.55rem;
              border-radius: 0.5rem;
              font-size: 0.65rem;
              font-weight: 800;
              background: ${isSource ? '#D97706' : '#FFFFFF'};
              color: ${isSource ? '#FFFFFF' : theme.accent};
              border: 1px solid ${isSource ? '#B45309' : theme.badgeBorder};
              cursor: pointer;
            "
          >
            ${IC.link}
            <span>${isSource ? 'Pilih Tujuan' : 'Hubungkan'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render seluruh garis Bezier SVG antar node yang terhubung
 */
function renderEdgesSVGContent() {
  const edges = getUniqueEdges();
  return edges.map(edge => {
    const x1 = edge.from.x;
    const y1 = edge.from.y;
    const x2 = edge.to.x;
    const y2 = edge.to.y;

    const dx = x2 - x1;
    const dy = y2 - y1;
    // Gunakan kurva bezier organik (horizontal bila lebih mendatar, vertikal bila tegak)
    let cx1, cy1, cx2, cy2;
    if (Math.abs(dx) >= Math.abs(dy)) {
      cx1 = x1 + dx * 0.45;
      cy1 = y1;
      cx2 = x2 - dx * 0.45;
      cy2 = y2;
    } else {
      cx1 = x1;
      cy1 = y1 + dy * 0.45;
      cx2 = x2;
      cy2 = y2 - dy * 0.45;
    }

    // Titik tengah kurva kubik Bezier pada t = 0.5
    const mx = 0.125 * x1 + 0.375 * cx1 + 0.375 * cx2 + 0.125 * x2;
    const my = 0.125 * y1 + 0.375 * cy1 + 0.375 * cy2 + 0.125 * y2;

    const strokeColor = edge.isCenterEdge ? '#0E4632' : '#D97706';
    const strokeWidth = state.validationPulse && edge.isCenterEdge ? 4.5 : (edge.isCenterEdge ? 3.2 : 2.5);
    const dashAttr = state.validationPulse && edge.isCenterEdge ? 'stroke-dasharray="10 6"' : '';

    return `
      <g class="mindmap-edge-group" data-source="${edge.sourceId}" data-target="${edge.targetId}">
        <path
          d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}"
          fill="none"
          stroke="${strokeColor}"
          stroke-width="${strokeWidth}"
          stroke-linecap="round"
          ${dashAttr}
          style="opacity: 0.85; transition: stroke-width 0.2s ease;"
        />
        <!-- Hit area & Tombol hapus koneksi di titik tengah garis -->
        <g
          class="edge-delete-trigger"
          data-source="${edge.sourceId}"
          data-target="${edge.targetId}"
          style="pointer-events: auto; cursor: pointer;"
        >
          <title>Klik untuk menghapus koneksi ini</title>
          <circle cx="${mx}" cy="${my}" r="11" fill="#FFFFFF" stroke="${strokeColor}" stroke-width="2" />
          <path d="M ${mx - 3.5} ${my - 3.5} L ${mx + 3.5} ${my + 3.5} M ${mx + 3.5} ${my - 3.5} L ${mx - 3.5} ${my + 3.5}" stroke="#DC2626" stroke-width="2" stroke-linecap="round" />
        </g>
      </g>
    `;
  }).join('');
}

/**
 * Update posisi transform pada #mindmap-stage tanpa re-render DOM
 */
function applyStageTransform() {
  const stage = document.getElementById('mindmap-stage');
  if (stage) {
    stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
  }
  const zoomLabel = document.getElementById('zoom-percent-label');
  if (zoomLabel) {
    zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
  }
}

/**
 * Update SVG garis secara real-time saat node digeser
 */
function updateEdgesLive() {
  const svg = document.getElementById('mindmap-edges-svg');
  if (svg) {
    svg.innerHTML = renderEdgesSVGContent();
    bindEdgeDeleteEvents();
  }
}

/**
 * Menambahkan node baru ke kanvas pada posisi tertentu atau slot radial otomatis
 */
function addNodeToCanvas(text, presetId = null, targetPos = null) {
  const cleanText = (text || '').trim();
  if (!cleanText) return;

  if (presetId && state.nodes.some(n => n.presetId === presetId)) {
    showToast('Kartu gagasan tersebut sudah ada di kanvas.', 'warning');
    return;
  }

  let pos = targetPos;
  if (!pos) {
    // Cari slot radial yang belum ditempati node lain
    const slot = RADIAL_SLOTS.find(s =>
      !state.nodes.some(n => Math.hypot(n.x - s.x, n.y - s.y) < 90)
    );
    if (slot) {
      pos = { x: slot.x, y: slot.y };
    } else {
      const angle = (state.nodes.length * 47) * (Math.PI / 180);
      const r = 240 + (state.nodes.length % 3) * 55;
      pos = {
        x: Math.round(CENTER_NODE.x + Math.cos(angle) * r),
        y: Math.round(CENTER_NODE.y + Math.sin(angle) * r)
      };
    }
  }

  const clampedX = Math.max(110, Math.min(STAGE_W - 110, pos.x));
  const clampedY = Math.max(60, Math.min(STAGE_H - 60, pos.y));

  state.nodes.push({
    id: `n${state.nodeIdCounter++}_${Date.now().toString().slice(-4)}`,
    text: cleanText,
    x: clampedX,
    y: clampedY,
    connectedTo: [],
    presetId: presetId || undefined,
    isCustom: !presetId
  });

  state.validationError = '';
  persistDraft();
  renderWorkspace();
}

/**
 * Menghapus node dan seluruh koneksi terkait
 */
function removeNode(nodeId) {
  state.nodes = state.nodes
    .filter(n => n.id !== nodeId)
    .map(n => ({
      ...n,
      connectedTo: (n.connectedTo || []).filter(tid => tid !== nodeId)
    }));

  if (state.connectingFromId === nodeId) {
    state.connectingFromId = null;
  }

  // Re-evaluasi validasi jika cabang turun di bawah 3
  if (getDirectCenterNodes().length < 3) {
    state.isValidated = false;
  }

  persistDraft();
  renderWorkspace();
}

/**
 * Membuat koneksi dua arah atau ke 'center' antara dua node
 */
function toggleConnection(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return;

  // Pastikan id selain 'center' tersimpan di node
  if (targetId === 'center') {
    const srcNode = state.nodes.find(n => n.id === sourceId);
    if (srcNode && !srcNode.connectedTo.includes('center')) {
      srcNode.connectedTo.push('center');
      showToast(`"${srcNode.text}" terhubung ke Topik Utama!`, 'success');
    }
  } else if (sourceId === 'center') {
    const tgtNode = state.nodes.find(n => n.id === targetId);
    if (tgtNode && !tgtNode.connectedTo.includes('center')) {
      tgtNode.connectedTo.push('center');
      showToast(`"${tgtNode.text}" terhubung ke Topik Utama!`, 'success');
    }
  } else {
    const srcNode = state.nodes.find(n => n.id === sourceId);
    const tgtNode = state.nodes.find(n => n.id === targetId);
    if (srcNode && tgtNode) {
      if (!srcNode.connectedTo.includes(targetId) && !tgtNode.connectedTo.includes(sourceId)) {
        srcNode.connectedTo.push(targetId);
        showToast(`Cabang "${srcNode.text}" ↔ "${tgtNode.text}" dibuat.`, 'success');
      }
    }
  }

  state.connectingFromId = null;
  state.isLinkMode = false;
  state.validationError = '';
  persistDraft();
  renderWorkspace();
}

/**
 * Menghapus koneksi spesifik antar dua node
 */
function removeConnection(sourceId, targetId) {
  state.nodes.forEach(n => {
    if (n.id === sourceId) {
      n.connectedTo = (n.connectedTo || []).filter(id => id !== targetId);
    }
    if (n.id === targetId) {
      n.connectedTo = (n.connectedTo || []).filter(id => id !== sourceId);
    }
  });

  if (getDirectCenterNodes().length < 3) {
    state.isValidated = false;
  }

  persistDraft();
  renderWorkspace();
  showToast('Koneksi cabang dihapus.', 'info');
}

/**
 * Validasi minimal 3 cabang terhubung ke topik utama (FR-15)
 */
function validateMindMap() {
  const connectedCount = getDirectCenterNodes().length;

  if (connectedCount < 3) {
    state.isValidated = false;
    state.validationError = 'Hubungkan minimal 3 gagasan ke topik utama.';
    renderWorkspace();
    showToast('Hubungkan minimal 3 gagasan ke topik utama.', 'error');
    const alertEl = document.getElementById('mindmap-validation-alert');
    if (alertEl) alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  state.isValidated = true;
  state.validationError = '';
  state.validationPulse = true;
  persistDraft();
  renderWorkspace();
  showToast(`Hebat! ${connectedCount} cabang terhubung valid. Silakan isi Simpulan Presentasi.`, 'success');

  setTimeout(() => {
    state.validationPulse = false;
    renderWorkspace();
    const formSec = document.getElementById('simpulan-section');
    if (formSec) formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1100);
}

/**
 * Mengikat seluruh event DOM pada workspace
 */
function bindWorkspaceEvents() {
  // 1. Klik / Drag pada Preset Gagasan
  document.querySelectorAll('.preset-idea-card').forEach(card => {
    const presetId = card.getAttribute('data-preset-id');
    const ideaText = card.getAttribute('data-idea-text');

    card.addEventListener('dragstart', e => {
      if (card.getAttribute('draggable') !== 'true') {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', JSON.stringify({ presetId, ideaText }));
      e.dataTransfer.effectAllowed = 'copy';
    });

    card.addEventListener('click', () => {
      if (state.nodes.some(n => n.presetId === presetId)) return;
      addNodeToCanvas(ideaText, presetId, null);
    });
  });

  // 2. Form Tambah Gagasan Custom
  const customForm = document.getElementById('form-add-custom-idea');
  if (customForm) {
    customForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('input-custom-idea');
      if (!input) return;
      const val = input.value.trim();
      if (!val) {
        showToast('Tuliskan teks gagasan terlebih dahulu.', 'warning');
        return;
      }
      addNodeToCanvas(val, null, null);
    });
  }

  // 3. Drop area pada Viewport Kanvas (Desktop Drag & Drop)
  const viewport = document.getElementById('mindmap-viewport');
  if (viewport) {
    viewport.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    viewport.addEventListener('drop', e => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('text/plain');
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        const rect = viewport.getBoundingClientRect();
        const dropX = Math.round((e.clientX - rect.left - state.panX) / state.zoom);
        const dropY = Math.round((e.clientY - rect.top - state.panY) / state.zoom);
        addNodeToCanvas(data.ideaText, data.presetId, { x: dropX, y: dropY });
      } catch (_) {
        // Abaikan drop bukan dari kartu
      }
    });

    // Zoom menggunakan scroll mouse saat pointer di dalam kanvas
    viewport.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      zoomCanvas(delta, e.clientX, e.clientY);
    }, { passive: false });

    // Panning area kosong kanvas
    viewport.addEventListener('pointerdown', e => {
      // Abaikan jika klik jatuh di dalam node atau tombol
      if (e.target.closest('.mindmap-placed-node') || e.target.closest('#node-center') || e.target.closest('.edge-delete-trigger')) {
        return;
      }
      dragState = {
        type: 'pan',
        nodeId: null,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origX: state.panX,
        origY: state.panY,
        hasMoved: false
      };
      viewport.style.cursor = 'grabbing';
    });
  }

  // 4. Node Pusat ("Peran Indonesia di Dunia") sebagai target koneksi
  const centerEl = document.getElementById('node-center');
  if (centerEl) {
    centerEl.addEventListener('click', () => {
      if (state.connectingFromId && state.connectingFromId !== 'center') {
        toggleConnection(state.connectingFromId, 'center');
      } else if (state.isLinkMode) {
        state.connectingFromId = 'center';
        renderWorkspace();
      }
    });
  }

  // 5. Event pada kartu yang sudah ditempatkan (Drag, Hubungkan, Hapus)
  document.querySelectorAll('.mindmap-placed-node').forEach(nodeEl => {
    const nodeId = nodeEl.getAttribute('data-node-id');

    nodeEl.addEventListener('pointerdown', e => {
      if (e.target.closest('.btn-delete-node') || e.target.closest('.btn-link-node')) {
        return;
      }
      const nodeObj = state.nodes.find(n => n.id === nodeId);
      if (!nodeObj) return;

      // Jika sedang dalam mode menghubungkan, klik kartu langsung jadikan target
      if (state.connectingFromId || state.isLinkMode) {
        return;
      }

      e.stopPropagation();
      dragState = {
        type: 'node',
        nodeId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origX: nodeObj.x,
        origY: nodeObj.y,
        hasMoved: false
      };
      nodeEl.style.cursor = 'grabbing';
    });

    nodeEl.addEventListener('click', e => {
      if (e.target.closest('.btn-delete-node') || e.target.closest('.btn-link-node')) {
        return;
      }
      if (state.connectingFromId) {
        if (state.connectingFromId === nodeId) {
          state.connectingFromId = null;
          renderWorkspace();
        } else {
          toggleConnection(state.connectingFromId, nodeId);
        }
      } else if (state.isLinkMode) {
        state.connectingFromId = nodeId;
        renderWorkspace();
      }
    });
  });

  // Tombol Hubungkan pada tiap kartu
  document.querySelectorAll('.btn-link-node').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const nodeId = btn.getAttribute('data-node-id');
      if (state.connectingFromId === nodeId) {
        state.connectingFromId = null;
        renderWorkspace();
      } else if (state.connectingFromId) {
        toggleConnection(state.connectingFromId, nodeId);
      } else {
        state.connectingFromId = nodeId;
        renderWorkspace();
      }
    });
  });

  // Tombol Hapus pada tiap kartu
  document.querySelectorAll('.btn-delete-node').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const nodeId = btn.getAttribute('data-node-id');
      removeNode(nodeId);
    });
  });

  // 6. Hapus koneksi garis SVG
  bindEdgeDeleteEvents();

  // 7. Toolbar Controls
  const btnToggleLink = document.getElementById('btn-toggle-link-mode');
  if (btnToggleLink) {
    btnToggleLink.addEventListener('click', () => {
      state.isLinkMode = !state.isLinkMode;
      if (!state.isLinkMode) state.connectingFromId = null;
      renderWorkspace();
    });
  }

  const btnCancelLink = document.getElementById('btn-cancel-link');
  if (btnCancelLink) {
    btnCancelLink.addEventListener('click', () => {
      state.connectingFromId = null;
      state.isLinkMode = false;
      renderWorkspace();
    });
  }

  const btnZoomIn = document.getElementById('btn-zoom-in');
  if (btnZoomIn) btnZoomIn.addEventListener('click', () => zoomCanvas(0.15));

  const btnZoomOut = document.getElementById('btn-zoom-out');
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => zoomCanvas(-0.15));

  const btnCenter = document.getElementById('btn-center-canvas');
  if (btnCenter) {
    btnCenter.addEventListener('click', () => {
      centerViewport();
      applyStageTransform();
    });
  }

  const btnReset = document.getElementById('btn-reset-canvas');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (state.nodes.length === 0) return;
      if (confirm('Hapus semua kartu gagasan di kanvas dan mulai menyusun ulang?')) {
        state.nodes = [];
        state.connectingFromId = null;
        state.isLinkMode = false;
        state.isValidated = false;
        state.validationError = '';
        persistDraft();
        renderWorkspace();
        centerViewport();
        applyStageTransform();
      }
    });
  }

  // 8. Tombol Periksa Mind Map & Export PNG
  const btnValidate = document.getElementById('btn-validate-mindmap');
  if (btnValidate) btnValidate.addEventListener('click', validateMindMap);

  const btnExport = document.getElementById('btn-export-png');
  if (btnExport) btnExport.addEventListener('click', exportMindMapImage);

  // 9. Form Simpulan Presentasi Events
  const inputSimpulan = document.getElementById('input-simpulan');
  if (inputSimpulan) {
    inputSimpulan.addEventListener('input', () => {
      state.simpulan = inputSimpulan.value;
      const len = state.simpulan.trim().length;
      const counterEl = document.getElementById('simpulan-char-count');
      if (counterEl) {
        counterEl.textContent = `${len} / 100 karakter`;
        counterEl.className = `text-xs font-bold ${len >= 100 ? 'text-emerald-600' : 'text-amber-600'}`;
      }
      persistDraft();
    });
  }

  const inputDasarHukum = document.getElementById('input-dasar-hukum');
  if (inputDasarHukum) {
    inputDasarHukum.addEventListener('input', () => {
      state.dasarHukum = inputDasarHukum.value;
      persistDraft();
    });
  }

  const btnToggleHint = document.getElementById('btn-toggle-uud-hint');
  if (btnToggleHint) {
    btnToggleHint.addEventListener('click', () => {
      state.showUudHint = !state.showUudHint;
      renderWorkspace();
    });
  }

  const formSimpulan = document.getElementById('form-simpulan-presentasi');
  if (formSimpulan) {
    formSimpulan.addEventListener('submit', e => {
      e.preventDefault();
      saveAndFinishMindMap();
    });
  }
}

function bindEdgeDeleteEvents() {
  document.querySelectorAll('.edge-delete-trigger').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const src = el.getAttribute('data-source');
      const tgt = el.getAttribute('data-target');
      removeConnection(src, tgt);
    });
  });
}

/**
 * Global pointer move/up untuk smooth dragging di seluruh layar (desktop & touch)
 */
function ensureGlobalPointerListeners() {
  if (boundGlobalListeners) return;
  boundGlobalListeners = true;

  window.addEventListener('pointermove', e => {
    if (!dragState.type) return;
    const dx = e.clientX - dragState.startClientX;
    const dy = e.clientY - dragState.startClientY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragState.hasMoved = true;
    }

    if (dragState.type === 'pan') {
      state.panX = dragState.origX + dx;
      state.panY = dragState.origY + dy;
      applyStageTransform();
    } else if (dragState.type === 'node' && dragState.nodeId) {
      const node = state.nodes.find(n => n.id === dragState.nodeId);
      if (!node) return;
      node.x = Math.max(100, Math.min(STAGE_W - 100, Math.round(dragState.origX + dx / state.zoom)));
      node.y = Math.max(55, Math.min(STAGE_H - 55, Math.round(dragState.origY + dy / state.zoom)));

      const nodeEl = document.querySelector(`.mindmap-placed-node[data-node-id="${dragState.nodeId}"]`);
      if (nodeEl) {
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
      }
      updateEdgesLive();
    }
  });

  window.addEventListener('pointerup', () => {
    if (!dragState.type) return;

    if (dragState.type === 'node' && dragState.hasMoved) {
      persistDraft();
    }
    const vp = document.getElementById('mindmap-viewport');
    if (vp) vp.style.cursor = 'grab';

    if (dragState.nodeId) {
      const nodeEl = document.querySelector(`.mindmap-placed-node[data-node-id="${dragState.nodeId}"]`);
      if (nodeEl) nodeEl.style.cursor = 'grab';
    }

    dragState = { type: null, nodeId: null, startClientX: 0, startClientY: 0, origX: 0, origY: 0, hasMoved: false };
  });
}

/**
 * Zoom kanvas dengan tetap menjaga fokus titik tengah atau kursor
 */
function zoomCanvas(delta, anchorClientX = null, anchorClientY = null) {
  const vp = document.getElementById('mindmap-viewport');
  const oldZoom = state.zoom;
  const newZoom = Math.max(0.55, Math.min(1.6, Number((oldZoom + delta).toFixed(2))));
  if (newZoom === oldZoom) return;

  if (vp) {
    const rect = vp.getBoundingClientRect();
    const cx = anchorClientX !== null ? anchorClientX - rect.left : rect.width / 2;
    const cy = anchorClientY !== null ? anchorClientY - rect.top : rect.height / 2;

    state.panX = cx - ((cx - state.panX) / oldZoom) * newZoom;
    state.panY = cy - ((cy - state.panY) / oldZoom) * newZoom;
  }

  state.zoom = newZoom;
  applyStageTransform();
}

/**
 * Validasi Form Simpulan & Simpan final ke localStorage (FR-16)
 */
function saveAndFinishMindMap() {
  if (getDirectCenterNodes().length < 3) {
    state.isValidated = false;
    state.validationError = 'Hubungkan minimal 3 gagasan ke topik utama.';
    renderWorkspace();
    showToast('Hubungkan minimal 3 gagasan ke topik utama.', 'error');
    return;
  }

  const simpulanTrim = (state.simpulan || '').trim();
  const hukumTrim = (state.dasarHukum || '').trim();

  if (simpulanTrim.length < 100) {
    showToast(`Simpulan minimal 100 karakter (saat ini ${simpulanTrim.length} karakter).`, 'error');
    const el = document.getElementById('input-simpulan');
    if (el) el.focus();
    return;
  }

  if (hukumTrim.length < 10) {
    showToast('Harap sebutkan dasar hukum UUD 1945 yang mendukung simpulanmu.', 'error');
    const el = document.getElementById('input-dasar-hukum');
    if (el) el.focus();
    return;
  }

  const nowISO = new Date().toISOString();
  const payload = {
    nodes: state.nodes,
    simpulan: simpulanTrim,
    dasarHukum: hukumTrim,
    isValidated: true,
    completed: true,
    connectedCount: getDirectCenterNodes().length,
    timestamp: nowISO
  };

  setStorage(STORAGE_KEYS.MINDMAP, payload);
  setProgressStep('mindmap', true);

  state.isSaved = true;
  state.savedTimestamp = nowISO;
  renderWorkspace();
  showToast('Mind Map & Simpulan Presentasi berhasil disimpan!', 'success');

  if (typeof window.confetti === 'function') {
    try {
      window.confetti({ particleCount: 110, spread: 75, origin: { y: 0.65 } });
    } catch (_) {
      // Abaikan jika confetti gagal
    }
  }
}

/**
 * Ekspor visual Mind Map ke file PNG menggunakan Canvas2D High-DPI (bersih tanpa kontrol edit & bebas clipping viewport)
 */
async function exportMindMapImage() {
  if (state.nodes.length === 0) {
    showToast('Tambahkan minimal satu gagasan ke kanvas sebelum mengunduh gambar.', 'warning');
    return;
  }

  const studentName = getStorage(STORAGE_KEYS.NAMA, 'Siswa_SiBELA').replace(/\s+/g, '_');
  const fileName = `MindMap-SiBELA-${studentName}.png`;

  try {
    const canvas = renderMindMapToCanvas2D();
    triggerCanvasDownload(canvas, fileName);
    showToast('Gambar Mind Map berhasil diunduh!', 'success');
  } catch (err) {
    console.error('Gagal mengekspor gambar Mind Map:', err);
    showToast('Gagal mengekspor gambar Mind Map.', 'error');
  }
}

/**
 * Helper membungkus teks pada Canvas2D agar gagasan panjang tetap rapi di dalam kartu
 */
function wrapCanvasLines(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let current = '';

  words.forEach(word => {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

/**
 * Renderer High-DPI Canvas2D API untuk ekspor PNG yang tajam dan bebas kendala CORS
 */
function renderMindMapToCanvas2D() {
  const canvas = document.createElement('canvas');
  canvas.width = STAGE_W;
  canvas.height = STAGE_H + 80;
  const ctx = canvas.getContext('2d');

  // Latar Cream / Grid
  ctx.fillStyle = '#F8FAF7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#CBD5E1';
  for (let gx = 20; gx < canvas.width; gx += 24) {
    for (let gy = 80; gy < canvas.height; gy += 24) {
      ctx.beginPath();
      ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Header Banner Ekspor
  ctx.fillStyle = '#0E4632';
  ctx.fillRect(0, 0, canvas.width, 72);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SiBELA — Mind Map Digital: Peran Indonesia di Dunia', 32, 44);

  const studentName = getStorage(STORAGE_KEYS.NAMA, 'Siswa Pancasila');
  ctx.fillStyle = '#FCD34D';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`Siswa: ${studentName}`, canvas.width - 32, 43);
  ctx.textAlign = 'left';

  const offsetY = 50;

  // Gambar garis Bezier
  const edges = getUniqueEdges();
  edges.forEach(edge => {
    const x1 = edge.from.x;
    const y1 = edge.from.y + offsetY;
    const x2 = edge.to.x;
    const y2 = edge.to.y + offsetY;
    const dx = x2 - x1;
    const dy = y2 - y1;
    let cx1, cy1, cx2, cy2;
    if (Math.abs(dx) >= Math.abs(dy)) {
      cx1 = x1 + dx * 0.45; cy1 = y1;
      cx2 = x2 - dx * 0.45; cy2 = y2;
    } else {
      cx1 = x1; cy1 = y1 + dy * 0.45;
      cx2 = x2; cy2 = y2 - dy * 0.45;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.strokeStyle = edge.isCenterEdge ? '#0E4632' : '#D97706';
    ctx.lineWidth = edge.isCenterEdge ? 3.5 : 2.5;
    ctx.stroke();
  });

  // Gambar Node Pusat
  drawRoundedRect(ctx, CENTER_NODE.x - 135, CENTER_NODE.y + offsetY - 42, 270, 84, 18, '#0E4632', '#E5A024', 3);
  ctx.fillStyle = '#FCD34D';
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TOPIK UTAMA', CENTER_NODE.x, CENTER_NODE.y + offsetY - 12);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Peran Indonesia di Dunia', CENTER_NODE.x, CENTER_NODE.y + offsetY + 15);

  // Gambar Node Gagasan Siswa (dengan warna & label khas tiap kartu)
  state.nodes.forEach(node => {
    const theme = getNodeTheme(node);
    const isCenter = (node.connectedTo || []).includes('center');
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    const lines = wrapCanvasLines(ctx, node.text, 195);
    const boxW = 236;
    const boxH = lines.length > 1 ? 82 : 66;
    const bx = node.x - boxW / 2;
    const by = node.y + offsetY - boxH / 2;

    drawRoundedRect(ctx, bx, by, boxW, boxH, 14, theme.bgTint, isCenter ? '#059669' : theme.badgeBorder, 2.4);

    // Garis aksen atas kartu
    ctx.save();
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(bx + 2, by + 2, boxW - 4, 6, [12, 12, 0, 0]) : ctx.rect(bx + 10, by + 2, boxW - 20, 5);
    const grad = ctx.createLinearGradient(bx, by, bx + boxW, by);
    grad.addColorStop(0, theme.accent);
    grad.addColorStop(1, theme.accentSecondary || theme.accent);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    if (lines.length === 1) {
      ctx.fillText(lines[0], node.x, node.y + offsetY + 1);
      ctx.fillStyle = theme.accent;
      ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(theme.tag, node.x, node.y + offsetY + 19);
    } else {
      ctx.fillText(lines[0], node.x, node.y + offsetY - 9);
      ctx.fillText(lines[1], node.x, node.y + offsetY + 9);
      ctx.fillStyle = theme.accent;
      ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(theme.tag, node.x, node.y + offsetY + 27);
    }
  });

  return canvas;
}

function drawRoundedRect(ctx, x, y, w, h, r, fill, stroke, lineWidth) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function triggerCanvasDownload(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
