/**
 * SiBELA - Layanan Pengiriman Rekap Data Siswa ke Google Sheets (Issue #11)
 *
 * Mengumpulkan progres & nilai siswa dari localStorage, memvalidasi kesiapan kirim,
 * mengirimkan rekap melalui Hidden Google Form Submit atau Apps Script Webhook,
 * serta merender widget status pengiriman yang konsisten di Beranda & Hasil Kuis.
 */

import { SHEETS_CONFIG } from '../config.js';
import { getStorage, setStorage, getProgressData, STORAGE_KEYS, showToast } from './utils.js';

const STORAGE_KEY_EXPLORED = 'sibela_modul2_explored';
const STORAGE_KEY_REKAP_META = 'sibela_rekap_meta';
const TOTAL_ORGANISASI_PETA = 5;
const HIDDEN_IFRAME_NAME = 'sibela_sheets_hidden_iframe';

function escapeHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ICONS = {
  send: `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>`,
  checkCircle: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  lock: `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>`,
  alert: `<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>`,
  refresh: `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  spinner: `<svg class="w-4 h-4 flex-shrink-0 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`
};

/**
 * Mengecek apakah siswa minimal telah menyelesaikan kuis evaluasi (`sibela_kuis`).
 */
export function hasCompletedQuiz() {
  const kuisData = getStorage(STORAGE_KEYS.KUIS, null);
  return Boolean(kuisData && typeof kuisData === 'object' && Number(kuisData.total) > 0);
}

/**
 * Mengecek apakah rekap sudah pernah dikirim (mencegah pengiriman ganda).
 */
export function isRekapSent() {
  const flag = getStorage(STORAGE_KEYS.REKAP_SENT, false);
  return flag === true || flag === 'true';
}

/**
 * Mengecek apakah endpoint di config.js sudah diisi dengan URL asli (bukan placeholder).
 */
export function isSheetsConfigured() {
  if (SHEETS_CONFIG.METHOD === 'apps-script') {
    const url = (SHEETS_CONFIG.APPS_SCRIPT_URL || '').trim();
    return Boolean(url && !url.includes('CONTOH_DEPLOYMENT_ID_GANTI') && /^https:\/\//i.test(url));
  }
  const action = (SHEETS_CONFIG.GOOGLE_FORM_ACTION || '').trim();
  return Boolean(action && !action.includes('CONTOH_FORM_ID_GANTI') && /^https:\/\/docs\.google\.com\/forms\//i.test(action));
}

/**
 * Mengumpulkan seluruh payload rekap belajar siswa dari localStorage.
 */
export function collectStudentRekapData() {
  const namaRaw = getStorage(STORAGE_KEYS.NAMA, '');
  const kuisData = getStorage(STORAGE_KEYS.KUIS, null);
  const studiKasusData = getStorage(STORAGE_KEYS.STUDI_KASUS, null);
  const mindMapData = getStorage(STORAGE_KEYS.MINDMAP, null);
  const progressData = getProgressData();
  const exploredRaw = getStorage(STORAGE_KEY_EXPLORED, []);

  const exploredCount = Array.isArray(exploredRaw) ? exploredRaw.length : 0;
  const bestScore = kuisData ? Number(kuisData.bestScore ?? kuisData.skor ?? 0) : 0;
  const studiKasusDone = Boolean(studiKasusData && (studiKasusData.contoh_ancaman || studiKasusData.solusi));
  const mindMapDone = Boolean(mindMapData?.completed || progressData?.mindmap);

  const now = new Date();
  const timestampFormatted = now.toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return {
    nama: (namaRaw && String(namaRaw).trim()) || 'Siswa SiBELA',
    skor: bestScore,
    studiKasus: studiKasusDone ? 'Sudah Diisi' : 'Belum Diisi',
    mindMap: mindMapDone ? 'Sudah Selesai' : 'Belum Selesai',
    organisasiPeta: `${exploredCount}/${TOTAL_ORGANISASI_PETA} Organisasi`,
    organisasiPetaCount: exploredCount,
    timestamp: timestampFormatted,
    timestampISO: now.toISOString()
  };
}

/**
 * Mengirimkan payload via Hidden Google Form Submit (iframe + form POST, bebas CORS).
 */
function submitViaHiddenGoogleForm(payload) {
  return new Promise((resolve, reject) => {
    let iframe = document.querySelector(`iframe[name="${HIDDEN_IFRAME_NAME}"]`);
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = HIDDEN_IFRAME_NAME;
      iframe.title = 'SiBELA Sheets Submit Frame';
      iframe.style.display = 'none';
      iframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SHEETS_CONFIG.GOOGLE_FORM_ACTION;
    form.target = HIDDEN_IFRAME_NAME;
    form.style.display = 'none';

    const entries = SHEETS_CONFIG.GOOGLE_FORM_ENTRIES || {};
    const fields = [
      [entries.nama, payload.nama],
      [entries.skor, String(payload.skor)],
      [entries.studiKasus, payload.studiKasus],
      [entries.mindMap, payload.mindMap],
      [entries.organisasiPeta, payload.organisasiPeta],
      [entries.timestamp, payload.timestamp]
    ];

    fields.forEach(([entryName, value]) => {
      if (!entryName) return;
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = entryName;
      input.value = value;
      form.appendChild(input);
    });

    let settled = false;
    const cleanup = () => {
      iframe.onload = null;
      iframe.onerror = null;
      if (form.parentNode) form.parentNode.removeChild(form);
    };

    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Waktu pengiriman habis. Periksa koneksi internetmu lalu coba lagi.'));
    }, SHEETS_CONFIG.SUBMIT_TIMEOUT_MS || 10000);

    iframe.onload = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      cleanup();
      resolve();
    };

    iframe.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      cleanup();
      reject(new Error('Gagal menjangkau server Google Form.'));
    };

    document.body.appendChild(form);
    form.submit();
  });
}

/**
 * Mengirimkan payload via Google Apps Script Webhook (POST fetch).
 */
async function submitViaAppsScript(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SHEETS_CONFIG.SUBMIT_TIMEOUT_MS || 10000);

  try {
    // text/plain menghindari CORS preflight OPTIONS pada Google Apps Script Web App
    await fetch(SHEETS_CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        nama: payload.nama,
        skor: payload.skor,
        studiKasus: payload.studiKasus,
        mindMap: payload.mindMap,
        organisasiPeta: payload.organisasiPeta,
        timestamp: payload.timestamp
      }),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Menjalankan proses validasi & pengiriman rekap belajar siswa ke guru.
 * @returns {Promise<{ok: boolean, message: string, payload?: object}>}
 */
export async function submitRekapToGuru() {
  if (!hasCompletedQuiz()) {
    return {
      ok: false,
      message: 'Selesaikan kuis evaluasi terlebih dahulu sebelum mengirim rekap ke guru.'
    };
  }

  if (isRekapSent()) {
    return {
      ok: true,
      alreadySent: true,
      message: 'Data berhasil dikirim ke guru! 🎉'
    };
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return {
      ok: false,
      message: 'Kamu sedang offline. Sambungkan ke internet lalu tekan Coba Lagi.'
    };
  }

  if (!isSheetsConfigured()) {
    return {
      ok: false,
      message: 'URL Google Form / Apps Script belum dikonfigurasi pada config.js. Hubungi guru atau periksa panduan setup.'
    };
  }

  const payload = collectStudentRekapData();

  try {
    if (SHEETS_CONFIG.METHOD === 'apps-script') {
      await submitViaAppsScript(payload);
    } else {
      await submitViaHiddenGoogleForm(payload);
    }

    setStorage(STORAGE_KEYS.REKAP_SENT, true);
    setStorage(STORAGE_KEY_REKAP_META, {
      sentAt: payload.timestamp,
      skor: payload.skor,
      nama: payload.nama
    });

    return {
      ok: true,
      payload,
      message: 'Data berhasil dikirim ke guru! 🎉'
    };
  } catch (err) {
    const errMsg = err?.name === 'AbortError'
      ? 'Koneksi timeout saat mengirim data ke guru.'
      : (err?.message || 'Terjadi gangguan jaringan saat mengirim rekap.');
    return {
      ok: false,
      message: errMsg
    };
  }
}

/**
 * Menghasilkan markup inner widget status + tombol Kirim Rekap ke Guru.
 */
function renderRekapInnerHTML({ compact = false, status = 'idle', errorMessage = '' } = {}) {
  const quizDone = hasCompletedQuiz();
  const alreadySent = isRekapSent();
  const data = collectStudentRekapData();
  const meta = getStorage(STORAGE_KEY_REKAP_META, null);

  let statusBadge = '';
  if (alreadySent) {
    statusBadge = `<span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:9999px;background:#D1FAE5;color:#065F46;font-size:0.7rem;font-weight:800;">Terkirim</span>`;
  } else if (quizDone) {
    statusBadge = `<span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:9999px;background:#FEF3C7;color:#92400E;font-size:0.7rem;font-weight:800;">Siap Dikirim</span>`;
  } else {
    statusBadge = `<span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:9999px;background:#F3F4F6;color:#6B7280;font-size:0.7rem;font-weight:700;">Terkunci</span>`;
  }

  let feedbackHTML = '';
  if (alreadySent) {
    const sentTimeInfo = meta?.sentAt ? ` (${escapeHTML(meta.sentAt)})` : '';
    feedbackHTML = `
      <div style="display:flex;align-items:center;gap:0.625rem;padding:0.875rem 1rem;border-radius:0.875rem;background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;font-size:0.8125rem;font-weight:700;margin-top:0.875rem;">
        ${ICONS.checkCircle}
        <div>
          <div>Data berhasil dikirim ke guru! 🎉</div>
          ${sentTimeInfo ? `<div style="font-size:0.7rem;font-weight:500;color:#047857;margin-top:0.125rem;">Rekap tercatat pada${sentTimeInfo}</div>` : ''}
        </div>
      </div>
    `;
  } else if (status === 'error') {
    feedbackHTML = `
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.875rem 1rem;border-radius:0.875rem;background:#FFF1F2;border:1px solid #FECDD3;color:#9F1239;font-size:0.8125rem;margin-top:0.875rem;">
        <div style="display:flex;align-items:flex-start;gap:0.5rem;flex:1;min-width:200px;">
          ${ICONS.alert}
          <div>
            <div style="font-weight:800;">Pengiriman Gagal</div>
            <div style="font-size:0.75rem;color:#BE123C;margin-top:0.125rem;">${escapeHTML(errorMessage || 'Terjadi kesalahan saat mengirim data.')}</div>
          </div>
        </div>
        <button type="button" data-rekap-retry="true" style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 0.875rem;border-radius:0.625rem;background:#E11D48;color:#FFFFFF;font-size:0.75rem;font-weight:700;border:none;cursor:pointer;">
          ${ICONS.refresh}
          <span>Coba Lagi</span>
        </button>
      </div>
    `;
  }

  const actionButtonHTML = alreadySent
    ? `
      <button type="button" disabled style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.15rem;border-radius:0.875rem;background:#E5E7EB;color:#6B7280;font-size:0.8rem;font-weight:700;border:none;cursor:not-allowed;white-space:nowrap;">
        ${ICONS.checkCircle}
        <span>Sudah Terkirim</span>
      </button>
    `
    : !quizDone
      ? `
        <button type="button" disabled style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.15rem;border-radius:0.875rem;background:#F3F4F6;color:#9CA3AF;font-size:0.8rem;font-weight:700;border:1px solid #E5E7EB;cursor:not-allowed;white-space:nowrap;">
          ${ICONS.lock}
          <span>Kirim Rekap ke Guru</span>
        </button>
      `
      : status === 'loading'
        ? `
          <button type="button" disabled style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.65rem 1.25rem;border-radius:0.875rem;background:#0E4632;color:#FFFFFF;font-size:0.8rem;font-weight:800;border:none;opacity:0.85;cursor:wait;white-space:nowrap;">
            ${ICONS.spinner}
            <span>Mengirim Rekap...</span>
          </button>
        `
        : `
          <button type="button" data-rekap-submit="true" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.68rem 1.25rem;border-radius:0.875rem;background:#0E4632;color:#FFFFFF;font-size:0.8125rem;font-weight:800;border:none;box-shadow:0 6px 16px rgba(14,70,50,0.22);cursor:pointer;white-space:nowrap;transition:transform 0.15s ease;">
            ${ICONS.send}
            <span>Kirim Rekap ke Guru</span>
          </button>
        `;

  const gridStyle = compact
    ? 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.5rem;margin-top:0.875rem;'
    : 'display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:0.625rem;margin-top:1rem;';

  const pillBoxStyle = 'background:#F9FAFB;border:1px solid #F3F4F6;border-radius:0.75rem;padding:0.5rem 0.75rem;';

  return `
    <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.875rem;">
      <div style="flex:1;min-width:210px;">
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem;">
          <h4 style="font-size:${compact ? '0.9375rem' : '1.05rem'};font-weight:900;color:#111827;margin:0;">
            Kirim Rekap Nilai ke Guru
          </h4>
          ${statusBadge}
        </div>
        <p style="font-size:0.78rem;color:#6B7280;line-height:1.45;margin:0;">
          ${quizDone
      ? 'Kirimkan ringkasan skor kuis dan progres belajarmu agar tercatat di Google Sheets guru.'
      : 'Selesaikan kuis evaluasi terlebih dahulu untuk mengaktifkan tombol pengiriman rekap.'}
        </p>
      </div>
      <div>
        ${actionButtonHTML}
      </div>
    </div>

    <div style="${gridStyle}">
      <div style="${pillBoxStyle}">
        <div style="font-size:0.65rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Siswa</div>
        <div style="font-size:0.8rem;font-weight:800;color:#111827;margin-top:0.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHTML(data.nama)}</div>
      </div>
      <div style="${pillBoxStyle}">
        <div style="font-size:0.65rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Skor Terbaik</div>
        <div style="font-size:0.8rem;font-weight:800;color:#0E4632;margin-top:0.1rem;">${quizDone ? data.skor : '-'}</div>
      </div>
      <div style="${pillBoxStyle}">
        <div style="font-size:0.65rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Studi Kasus</div>
        <div style="font-size:0.8rem;font-weight:800;color:#374151;margin-top:0.1rem;">${data.studiKasus}</div>
      </div>
      <div style="${pillBoxStyle}">
        <div style="font-size:0.65rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Mind Map</div>
        <div style="font-size:0.8rem;font-weight:800;color:#374151;margin-top:0.1rem;">${data.mindMap}</div>
      </div>
      <div style="${pillBoxStyle}">
        <div style="font-size:0.65rem;font-weight:700;color:#9CA3AF;text-transform:uppercase;">Peta Modul 2</div>
        <div style="font-size:0.8rem;font-weight:800;color:#374151;margin-top:0.1rem;">${data.organisasiPeta}</div>
      </div>
    </div>

    ${feedbackHTML}
  `;
}

/**
 * Merender container widget Rekap ke Guru untuk disisipkan di Beranda / Hasil Kuis.
 */
export function renderRekapWidgetHTML({ compact = false } = {}) {
  return `
    <div class="sibela-rekap-widget bg-white border border-gray-100" data-compact="${compact ? 'true' : 'false'}" style="border-radius:1.5rem;padding:${compact ? '1rem 1.125rem' : '1.35rem 1.5rem'};box-shadow:0 4px 20px rgba(0,0,0,0.04);text-align:left;">
      ${renderRekapInnerHTML({ compact })}
    </div>
  `;
}

/**
 * Mengikat event klik kirim & coba lagi pada semua widget rekap di halaman aktif.
 */
export function bindRekapWidgetEvents(root = document) {
  const widgets = Array.from(root.querySelectorAll('.sibela-rekap-widget'));
  if (!widgets.length) return;

  const rerenderAll = (opts = {}) => {
    document.querySelectorAll('.sibela-rekap-widget').forEach((el) => {
      const compact = el.getAttribute('data-compact') === 'true';
      el.innerHTML = renderRekapInnerHTML({ compact, ...opts });
      attachButtons(el);
    });
  };

  const handleSubmit = async () => {
    rerenderAll({ status: 'loading' });
    const result = await submitRekapToGuru();

    if (result.ok) {
      rerenderAll({ status: 'success' });
      showToast(result.message, 'success');
    } else {
      rerenderAll({ status: 'error', errorMessage: result.message });
      showToast(result.message, 'error');
    }
  };

  function attachButtons(widgetEl) {
    const submitBtn = widgetEl.querySelector('[data-rekap-submit]');
    const retryBtn = widgetEl.querySelector('[data-rekap-retry]');
    if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
    if (retryBtn) retryBtn.addEventListener('click', handleSubmit);
  }

  widgets.forEach(attachButtons);
}

/**
 * Memperbarui tampilan semua widget rekap aktif (misal setelah ubah nama siswa).
 */
export function refreshRekapWidgets(root = document) {
  root.querySelectorAll('.sibela-rekap-widget').forEach((el) => {
    const compact = el.getAttribute('data-compact') === 'true';
    el.innerHTML = renderRekapInnerHTML({ compact });
  });
  bindRekapWidgetEvents(root);
}