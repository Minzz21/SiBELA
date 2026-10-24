/**
 * SiBELA - Navbar Component Handler
 * Mengelola active state link navigasi desktop dan mobile
 */

export function updateActiveNav(currentRoute = '#/') {
  // Desktop Nav Links
  const desktopLinks = document.querySelectorAll('.nav-link');
  desktopLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentRoute || (currentRoute === '#/' && href === '#/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Nav Links
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  mobileLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentRoute || (currentRoute === '#/' && href === '#/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
