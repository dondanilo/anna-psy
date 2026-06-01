/* ============================================================
   ANNA ULYANOVA — MAIN JS
   ============================================================ */

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── BURGER MENU ── */
const burger   = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  const isOpen = navMobile.classList.contains('open');
  burger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : '';
  burger.querySelectorAll('span')[1].style.opacity   = isOpen ? '0' : '1';
  burger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '';
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── INTERSECTION OBSERVER — fade animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  observer.observe(el);
});

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Заявка отправлена ✓';
  btn.style.background = '#7A9B8A';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Отправить заявку';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 4000);
});

/* ── SMOOTH ACTIVE NAV LINKS ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeObserver.observe(s));
