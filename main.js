// Hamburger menu
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// Update hash immediately on any internal anchor click
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const hash = link.getAttribute('href');
    if (hash && hash !== '#') {
      history.replaceState(null, '', hash);
    }
  });
});

// Hash tracking - update URL as user scrolls through sections
const sections = document.querySelectorAll('section[id]');
let hasScrolled = false;

window.addEventListener('scroll', () => {
  hasScrolled = true;
  if (window.scrollY < 50) {
    history.replaceState(null, '', location.pathname);
  }
}, { passive: true });

const hashObserver = new IntersectionObserver(entries => {
  if (!hasScrolled) return;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      history.replaceState(null, '', `#${entry.target.id}`);
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => hashObserver.observe(s));
