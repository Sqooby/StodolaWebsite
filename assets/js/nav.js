/**
 * Navigation — sticky header, mobile overlay menu
 */
const Nav = (() => {
  let toggle = null;
  let overlay = null;

  const closeMenu = () => {
    if (!overlay || !toggle) return;
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const initStickyHeader = () => {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
      },
      { passive: true }
    );
  };

  const initMobileMenu = () => {
    toggle = document.getElementById('nav-toggle');
    overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      const open = overlay.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    overlay.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
      }
    });
  };

  const init = () => {
    initStickyHeader();
    initMobileMenu();
  };

  return { init, closeMenu };
})();
