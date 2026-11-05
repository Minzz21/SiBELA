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
 * Buka Navigation Drawer
 */
export function openDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById('nav-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
  }
}

/**
 * Tutup Navigation Drawer
 */
export function closeDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById('nav-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
  }
}

// Pasang ke window agar bisa dipanggil dari inline HTML
if (typeof window !== 'undefined') {
  window.openDrawer  = openDrawer;
  window.closeDrawer = closeDrawer;
}

/**
 * Update info profil siswa di header / drawer
 */
export function updateHeaderUserBadge() {
  const nama = getStorage(STORAGE_KEYS.NAMA, null);

  // Update Drawer Student Card
  const drawerStudentName = document.getElementById('drawer-student-name');
  if (drawerStudentName) {
    drawerStudentName.textContent = nama ? nama : 'Siswa Bela Negara';
  }

  // Update Desktop Student Pill
  const desktopStudentName = document.getElementById('desktop-student-name');
  if (desktopStudentName) {
    desktopStudentName.textContent = nama ? nama : 'Siswa';
  }

  // Update Beranda Greeting jika sedang di beranda
  const berandaGreeting = document.getElementById('beranda-greeting');
  if (berandaGreeting) {
    berandaGreeting.innerHTML = nama
      ? `Assalamu'alaikum, <span class="font-bold text-white">${nama}</span>!`
      : `Assalamu'alaikum, Pejuang Muda!`;
  }

  const berandaGreetingDesktop = document.getElementById('beranda-greeting-desktop');
  if (berandaGreetingDesktop) {
    berandaGreetingDesktop.innerHTML = nama
      ? `Assalamu'alaikum, <span class="text-[#0B4D36]">${nama}</span>!`
      : `Assalamu'alaikum, Pejuang Muda!`;
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

  // Update header & drawer info
  updateHeaderUserBadge();

  // Drawer events
  const overlay = document.getElementById('drawer-overlay');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const drawerEditNama = document.getElementById('drawer-btn-edit-nama');

  if (overlay) overlay.addEventListener('click', closeDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);

  // Klik Ubah Nama di drawer
  if (drawerEditNama) {
    drawerEditNama.addEventListener('click', () => {
      closeDrawer();
      setTimeout(() => {
        if (typeof window.openModalNama === 'function') {
          window.openModalNama();
        } else {
          // Navigasi ke beranda lalu buka modal
          window.location.hash = '#/';
          setTimeout(() => {
            if (typeof window.openModalNama === 'function') window.openModalNama();
          }, 200);
        }
      }, 250);
    });
  }

  // Auto-close drawer saat link navigasi di-klik
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Inisialisasi router SPA
  initRouter();
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);

export { navigateTo };
