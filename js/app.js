/**
 * SiBELA - Entry Point & Application Controller
 * Mustamin (Amin) - PTIK UNM
 */

import { getStorage, STORAGE_KEYS, calculateProgress } from './utils.js';
import { updateActiveNav } from './components/navbar.js';

export const AppState = {
  currentRoute: window.location.hash || '#/',
  namaSiswa: getStorage(STORAGE_KEYS.NAMA, null),
  progress: calculateProgress(),
};

/**
 * Update info profil siswa di header
 */
export function updateHeaderUserBadge() {
  const userBadgeEl = document.getElementById('user-header-badge');
  const userGreetingEl = document.getElementById('user-header-greeting');
  const progressBadgeEl = document.getElementById('header-progress-text');
  const progressBarEl = document.getElementById('header-progress-bar');

  const nama = getStorage(STORAGE_KEYS.NAMA, null);
  const progress = calculateProgress();

  if (userBadgeEl) {
    if (nama) {
      if (userGreetingEl) userGreetingEl.textContent = nama;
      userBadgeEl.classList.remove('hidden');
      userBadgeEl.classList.add('inline-flex');
    } else {
      userBadgeEl.classList.add('hidden');
    }
  }

  if (progressBadgeEl) {
    progressBadgeEl.textContent = `${progress}%`;
  }
  if (progressBarEl) {
    progressBarEl.style.width = `${progress}%`;
  }
}

/**
 * Inisialisasi Shell App
 */
function initApp() {
  console.log('🇮🇩 SiBELA - Sistem Interaktif Bela Negara loaded.');
  
  // Set default hash jika kosong
  if (!window.location.hash) {
    window.location.hash = '#/';
  }

  // Update header & nav active state
  updateHeaderUserBadge();
  updateActiveNav(window.location.hash);

  // Listen perubahan hash
  window.addEventListener('hashchange', () => {
    AppState.currentRoute = window.location.hash;
    updateActiveNav(window.location.hash);
  });
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);
