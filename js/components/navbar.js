/**
 * SiBELA - Navbar Component Handler
 * Mengelola active state navigation links (Desktop), drawer, dan bottom navigation bar (Mobile)
 */

export function updateActiveNav(currentRoute = '#/') {
  // Samakan `#/beranda` dengan `#/`
  const activeRoute = (currentRoute === '#/beranda' || !currentRoute || currentRoute === '#') ? '#/' : currentRoute;

  // Tentukan item navigasi aktif untuk Desktop dan Mobile Bottom Nav
  let activeNav = 'beranda';
  if (activeRoute === '#/modul1') {
    activeNav = 'materi1';
  } else if (activeRoute === '#/modul2') {
    activeNav = 'materi2';
  } else if (activeRoute === '#/kuis') {
    activeNav = 'kuis';
  } else if (activeRoute === '#/mindmap') {
    activeNav = 'mindmap';
  }

  // ================= 1. DESKTOP NAV LINKS (DARK GREEN HEADER) =================
  const desktopLinks = {
    beranda: document.getElementById('desktop-nav-beranda'),
    materi1: document.getElementById('desktop-nav-materi1'),
    materi2: document.getElementById('desktop-nav-materi2'),
    kuis:    document.getElementById('desktop-nav-kuis'),
    mindmap: document.getElementById('desktop-nav-mindmap'),
  };

  Object.entries(desktopLinks).forEach(([key, el]) => {
    if (!el) return;
    if (key === activeNav) {
      el.className = 'desktop-nav-link px-4 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white shadow-xs transition-all';
    } else {
      el.className = 'desktop-nav-link px-4 py-1.5 rounded-full text-xs font-medium text-emerald-100/90 hover:text-white hover:bg-white/10 transition-all';
    }
  });

  const desktopGuru = document.getElementById('desktop-nav-guru');
  if (desktopGuru) {
    if (activeRoute === '#/portal-guru') {
      desktopGuru.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-900 bg-accent shadow-xs transition-all';
    } else {
      desktopGuru.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all';
    }
  }

  // ================= 2. MOBILE BOTTOM NAV 5 ITEMS =================
  const navItems = {
    beranda: document.getElementById('nav-item-beranda'),
    materi1: document.getElementById('nav-item-materi1'),
    materi2: document.getElementById('nav-item-materi2'),
    kuis:    document.getElementById('nav-item-kuis'),
    mindmap: document.getElementById('nav-item-mindmap'),
  };

  Object.entries(navItems).forEach(([key, el]) => {
    if (!el) return;
    const circle = el.querySelector('.nav-circle');
    const label  = el.querySelector('.nav-label');
    const isActive = (key === activeNav);

    if (isActive) {
      el.classList.add('active');
      if (circle) {
        circle.className = 'nav-circle w-8 h-8 rounded-full bg-[#0E4632] text-white flex items-center justify-center shadow-xs transition-all';
      }
      if (label) {
        label.className = 'nav-label text-[10px] font-bold text-[#0E4632] mt-0.5 leading-tight';
      }
    } else {
      el.classList.remove('active');
      if (circle) {
        circle.className = 'nav-circle w-8 h-8 rounded-full border border-gray-300 text-gray-500 bg-white flex items-center justify-center group-hover:border-emerald-700 group-hover:text-emerald-800 transition-all';
      }
      if (label) {
        label.className = 'nav-label text-[10px] font-medium text-gray-500 mt-0.5 leading-tight group-hover:text-emerald-800 transition-colors';
      }
    }
  });

  // ================= 3. DRAWER LINKS (MOBILE) =================
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === activeRoute) {
      link.classList.add('bg-emerald-50', 'text-primary', 'font-bold');
      link.classList.remove('text-gray-700');
    } else {
      link.classList.remove('bg-emerald-50', 'text-primary', 'font-bold');
      link.classList.add('text-gray-700');
    }
  });
}
