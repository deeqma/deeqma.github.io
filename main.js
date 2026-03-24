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

// Hash tracking - update URL as user scrolls through sections
const sections = document.querySelectorAll('section[id]');

const hashObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      history.replaceState(null, '', `#${entry.target.id}`);
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => hashObserver.observe(s));
