/* ============================================
   Football Hub — Jimmy Adams
   Scroll reveal + live ticker
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal for Moment Cards ----
  const revealElements = document.querySelectorAll('.fb-moment-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el, i) => {
    el.dataset.delay = i * 80;
    revealObserver.observe(el);
  });

  // ---- Section fade-in ----
  const sections = document.querySelectorAll('.fb-section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
  });

  // ---- Rotating live ticker text ----
  const tickerText = document.querySelector('.fb-ticker-text');
  if (tickerText) {
    const messages = [
      '2025/26 Season — in full swing',
      'Matchday 30 — every goal counts',
      'Title race heating up',
      'Champions League nights return soon'
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % messages.length;
      tickerText.style.opacity = '0';
      setTimeout(() => {
        tickerText.textContent = messages[idx];
        tickerText.style.opacity = '1';
      }, 300);
    }, 4000);
    tickerText.style.transition = 'opacity 0.3s ease';
  }

  console.log('⚽ Jimmy Adams — Football Hub loaded');
});
