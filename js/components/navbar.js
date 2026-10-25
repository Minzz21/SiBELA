/**
 * SiBELA - Navbar Component Handler
 * Mengelola active state link navigasi desktop dan mobile
 */

export function updateActiveNav(currentRoute = '#/') {
  // Samakan `#/beranda` dengan `#/`
  const activeRoute = (currentRoute === '#/beranda' || !currentRoute || currentRoute === '#') ? '#/' : currentRoute;

  // Desktop Nav Links
  const desktopLinks = document.querySelectorAll('.nav-link, #nav-guru');
  desktopLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === activeRoute) {
      link.classList.add('active');
      if (link.id === 'nav-guru') {
        link.classList.add('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-secondary');
      }
    } else {
      link.classList.remove('active');
      if (link.id === 'nav-guru') {
        link.classList.remove('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-secondary');
      }
    }
  });

  // Mobile Nav Links
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  mobileLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === activeRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
