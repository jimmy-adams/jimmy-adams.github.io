/* ============================================
   Sports Channel — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal for Sport Cards & Moments ----
  const revealElements = document.querySelectorAll('.sport-card, .moment-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, index) => {
    el.dataset.delay = index * 80;
    revealObserver.observe(el);
  });

  // ---- Section Fade-in ----
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
  });

  // ---- Achievement Number Animation ----
  const achievementValues = document.querySelectorAll('.achievement-value');
  const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        achievementObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  achievementValues.forEach(el => achievementObserver.observe(el));

  // ---- Parallax Floating Sports Emojis ----
  const particles = document.querySelectorAll('.sports-particle');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        particles.forEach((el, i) => {
          const speed = 0.02 + (i * 0.01);
          const yOffset = scrollY * speed;
          el.style.transform = `translateY(${-yOffset}px) rotate(${yOffset * 0.08}deg)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  console.log('⚽ Jimmy Adams — Sports Channel loaded');
});
