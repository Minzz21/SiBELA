/**
 * SiBELA - Client-Side Hash Router (SPA)
 * Mustamin (Amin) - PTIK UNM
 */

import * as BerandaPage from '../pages/beranda.js';
import * as Modul1Page from '../pages/modul1.js';
import * as Modul2Page from '../pages/modul2.js';
import * as KuisPage from '../pages/kuis.js';
import * as MindmapPage from '../pages/mindmap.js';
import * as PortalGuruPage from '../pages/portal-guru.js';
import * as NotFoundPage from '../pages/not-found.js';

import { updateActiveNav } from './components/navbar.js';

// Registry Rute SPA
const routes = {
  '#/': BerandaPage,
  '#/beranda': BerandaPage,
  '#/modul1': Modul1Page,
  '#/modul2': Modul2Page,
  '#/kuis': KuisPage,
  '#/mindmap': MindmapPage,
  '#/portal-guru': PortalGuruPage,
};

/**
 * Normalisasi hash route
 */
export function normalizeHash(rawHash) {
  const hash = (rawHash || '').trim();
  if (!hash || hash === '#' || hash === '#/') {
    return '#/';
  }
  // Hapus trailing slash jika bukan '#/'
  return hash.replace(/\/$/, '');
}

/**
 * Handle perubahan rute dan render konten ke `#app-root`
 */
export function handleRoute() {
  const rawHash = window.location.hash;
  const normalizedRoute = normalizeHash(rawHash);
  const appRoot = document.getElementById('app-root');

  if (!appRoot) {
    console.error('Elemen #app-root tidak ditemukan!');
    return;
  }

  // Cari modul halaman
  const pageModule = routes[normalizedRoute];

  if (pageModule && typeof pageModule.render === 'function') {
    appRoot.innerHTML = pageModule.render();
    if (typeof pageModule.init === 'function') {
      pageModule.init();
    }
  } else {
    // 404 Not Found
    appRoot.innerHTML = NotFoundPage.render(rawHash);
    if (typeof NotFoundPage.init === 'function') {
      NotFoundPage.init();
    }
  }

  // Update active navigation state
  updateActiveNav(normalizedRoute);

  // Scroll ke atas halaman setiap pergantian rute
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/**
 * Programmatic Navigation
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Inisialisasi Event Listener Router
 */
export function initRouter() {
  // Listen hashchange
  window.addEventListener('hashchange', handleRoute);

  // Initial render saat halaman dimuat
  handleRoute();
}
