/* ============================================================
   BACK IL HONG PORTFOLIO — script.js
   ============================================================ */

/* ---------- NAV scroll shadow ---------- */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---------- Self-intro: slide in from left ---------- */
const selfItems = document.querySelectorAll('.self__item');
const introObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      introObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
selfItems.forEach(el => introObserver.observe(el));

/* ---------- Skill bars: animate on scroll ---------- */
const bars = document.querySelectorAll('.skill__bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width;
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
bars.forEach(bar => barObserver.observe(bar));

/* ---------- Project: drag-to-scroll ---------- */
const trackWrap = document.querySelector('.project__track-wrap');
if (trackWrap) {
  let isDown = false;
  let startX, scrollLeft;

  trackWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    trackWrap.classList.add('dragging');
    startX = e.pageX - trackWrap.offsetLeft;
    scrollLeft = trackWrap.scrollLeft;
  });
  trackWrap.addEventListener('mouseleave', () => {
    isDown = false;
    trackWrap.classList.remove('dragging');
  });
  trackWrap.addEventListener('mouseup', () => {
    isDown = false;
    trackWrap.classList.remove('dragging');
  });
  trackWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackWrap.offsetLeft;
    const walk = (x - startX) * 1.4;
    trackWrap.scrollLeft = scrollLeft - walk;
  });

  /* Auto-scroll right slowly */
  let autoScroll;
  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      if (!isDown) {
        trackWrap.scrollLeft += 1;
        if (trackWrap.scrollLeft >= trackWrap.scrollWidth - trackWrap.clientWidth) {
          trackWrap.scrollLeft = 0;
        }
      }
    }, 20);
  };
  const stopAutoScroll = () => clearInterval(autoScroll);

  startAutoScroll();
  trackWrap.addEventListener('mouseenter', stopAutoScroll);
  trackWrap.addEventListener('mouseleave', startAutoScroll);
}

/* ---------- Smooth active nav highlight ---------- */
const sections = document.querySelectorAll('section[id], footer');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));
