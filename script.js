/* ============================================
   Jimmy Adams — Interactive Scripts
   Scroll reveal, parallax, smooth interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.skill-card, .timeline-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el, index) => {
    el.dataset.delay = index * 100;
    revealObserver.observe(el);
  });

  // ---- Parallax Floating Elements ----
  const floatingEls = document.querySelectorAll('.floating-element');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        floatingEls.forEach((el, i) => {
          const speed = 0.03 + (i * 0.015);
          const yOffset = scrollY * speed;
          el.style.transform = `translateY(${-yOffset}px) rotate(${yOffset * 0.05}deg)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---- Smooth Section Highlight ----
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

  // ---- Compass Mouse Interaction ----
  const compass = document.querySelector('.compass');
  const compassNeedle = document.querySelector('.compass-needle');

  if (compass && compassNeedle) {
    compass.addEventListener('mousemove', (e) => {
      const rect = compass.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
      compassNeedle.style.animation = 'none';
      compassNeedle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    });

    compass.addEventListener('mouseleave', () => {
      compassNeedle.style.animation = 'compassSpin 4s ease-in-out infinite';
      compassNeedle.style.transform = '';
    });
  }

  // ---- Typing Effect for Tagline ----
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < originalText.length) {
        tagline.textContent += originalText[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    // Start typing after the fade animation
    setTimeout(() => {
      // typing already started via animation delay
    }, 800);
  }

  // ---- Current Year ----
  const yearEl = document.querySelector('.footer-sub');
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.innerHTML = `© ${currentYear} — The world is worth exploring`;
  }

  // ---- Active nav tracking (if nav is added later) ----
  console.log('🌍 Jimmy Adams — Personal page loaded successfully');
});
