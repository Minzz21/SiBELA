/**
 * SiBELA - Entry Point & Application Controller
 * Mustamin (Amin) - PTIK UNM
 */

import { getStorage, STORAGE_KEYS } from './utils.js';

import { initRouter, navigateTo } from './router.js';

export const AppState = {
  namaSiswa: getStorage(STORAGE_KEYS.NAMA, null),
};


/**
 * Update info profil siswa di header
 */
export function updateHeaderUserBadge() {
  const userBadgeEl    = document.getElementById('user-header-badge');
  const userGreetingEl = document.getElementById('user-header-greeting');

  const nama = getStorage(STORAGE_KEYS.NAMA, null);

  if (userBadgeEl) {
    if (nama) {
      if (userGreetingEl) userGreetingEl.textContent = nama;
      userBadgeEl.classList.remove('hidden');
      userBadgeEl.classList.add('inline-flex');
    } else {
      userBadgeEl.classList.add('hidden');
    }
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

  // Update header info
  updateHeaderUserBadge();

  // Click handler pada header user badge untuk ubah nama
  const userBadgeEl = document.getElementById('user-header-badge');
  if (userBadgeEl) {
    userBadgeEl.style.cursor = 'pointer';
    userBadgeEl.title = 'Klik untuk mengubah nama panggilan';
    userBadgeEl.addEventListener('click', () => {
      if (window.location.hash !== '#/' && window.location.hash !== '#/beranda') {
        window.location.hash = '#/';
      }
      setTimeout(() => {
        const btn = document.getElementById('btn-open-modal-nama');
        if (btn) btn.click();
      }, 120);
    });
  }

  // Inisialisasi router SPA
  initRouter();
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);

export { navigateTo };
