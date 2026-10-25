/**
 * SiBELA - Helper Utilities
 * Mustamin (Amin) - PTIK UNM
 */

export const STORAGE_KEYS = {
  NAMA: 'sibela_nama',
  PROGRESS: 'sibela_progress',
  STUDI_KASUS: 'sibela_studikasus',
  LAPORAN_PERAN: 'sibela_laporan_peran',
  KUIS: 'sibela_kuis',
  MINDMAP: 'sibela_mindmap',
  GURU_AUTH: 'sibela_guru_auth',
  REKAP_SENT: 'sibela_rekap_sent',
};

/**
 * Mengambil data dari localStorage dengan fallback default
 */
export function getStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Gagal membaca localStorage [${key}]:`, err);
    return defaultValue;
  }
}

/**
 * Menyimpan data ke localStorage
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Gagal menulis localStorage [${key}]:`, err);
    return false;
  }
}

/**
 * Menghapus data dari localStorage
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error(`Gagal menghapus localStorage [${key}]:`, err);
    return false;
  }
}

/**
 * Mengambil data status penyelesaian tiap modul
 */
export function getProgressData() {
  return getStorage(STORAGE_KEYS.PROGRESS, {
    modul1: false,
    modul2: false,
    kuis: false,
    mindmap: false,
  });
}

/**
 * Menyimpan status selesai pada modul tertentu
 */
export function setProgressStep(stepKey, isDone = true) {
  const current = getProgressData();
  current[stepKey] = Boolean(isDone);
  setStorage(STORAGE_KEYS.PROGRESS, current);
  return calculateProgress();
}

/**
 * Menghitung persentase progress belajar siswa (0 - 100)
 */
export function calculateProgress() {
  const progress = getProgressData();
  const totalSteps = 4;
  const completedSteps = Object.values(progress).filter(Boolean).length;
  return Math.round((completedSteps / totalSteps) * 100);
}

/**
 * Helper untuk format tanggal Indonesia
 */
export function formatTanggalID(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(date));
}

/**
 * Simple Toast Notification
 */
export function showToast(message, type = 'info') {
  const toastId = 'sibela-toast';
  let toastEl = document.getElementById(toastId);
  
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = 'fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-floating text-sm font-medium transition-all duration-300 transform translate-y-[-20px] opacity-0 pointer-events-none';
    document.body.appendChild(toastEl);
  }

  const colorStyles = {
    success: 'bg-emerald-600 text-white border border-emerald-500',
    error: 'bg-rose-600 text-white border border-rose-500',
    warning: 'bg-amber-500 text-white border border-amber-400',
    info: 'bg-primary text-white border border-primary-light',
  };

  toastEl.className = `fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-floating text-sm font-medium transition-all duration-300 transform translate-y-0 opacity-100 ${colorStyles[type] || colorStyles.info}`;
  toastEl.textContent = message;

  setTimeout(() => {
    toastEl.className = toastEl.className.replace('translate-y-0 opacity-100', 'translate-y-[-20px] opacity-0 pointer-events-none');
  }, 3000);
}
