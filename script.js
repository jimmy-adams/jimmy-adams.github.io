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

  // ---- Travel Map ----
  if (typeof TRAVEL_DATA !== 'undefined' && document.getElementById('travel-map-container')) {
    // Initialize Leaflet map
    const map = L.map('travel-map-container', {
      scrollWheelZoom: false,
      zoomControl: true
    }).setView([25, 10], 2);

    // Use a beautiful free tile layer — CartoDB Voyager
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add markers
    const markers = [];
    const pathCoords = [];

    TRAVEL_DATA.forEach((place, index) => {
      // Custom icon with emoji
      const icon = L.divIcon({
        className: '',
        html: `<div class="custom-marker">${place.emoji}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      // Popup content
      const popupContent = `
        <div class="popup-card">
          <img src="${place.photo}" alt="${place.city}" class="popup-photo" loading="lazy" onerror="this.style.display='none'">
          <div class="popup-body">
            <div class="popup-header">
              <span class="popup-emoji">${place.emoji}</span>
              <span class="popup-city">${place.city}</span>
            </div>
            <div class="popup-country">${place.country}</div>
            <div class="popup-date">${place.date}</div>
            <p class="popup-story">${place.story}</p>
          </div>
        </div>
      `;

      const marker = L.marker([place.lat, place.lng], { icon })
        .addTo(map)
        .bindPopup(popupContent, {
          maxWidth: 300,
          closeButton: true,
          className: 'custom-popup'
        });

      markers.push(marker);
      pathCoords.push([place.lat, place.lng]);
    });

    // Draw travel path with animated dashed line
    if (pathCoords.length > 1) {
      L.polyline(pathCoords, {
        color: '#C87941',
        weight: 2,
        opacity: 0.5,
        dashArray: '12 6',
        className: 'travel-path'
      }).addTo(map);
    }

    // Fit map to show all markers
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }

    // Animate stats numbers
    const totalKm = calculateTotalDistance();
    const countries = countCountries();
    const cities = TRAVEL_DATA.length;

    animateNumber('stat-countries', countries);
    animateNumber('stat-cities', cities);
    animateNumber('stat-km', totalKm);

    // Fix map rendering after scroll reveal
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => map.invalidateSize(), 300);
          mapObserver.unobserve(entry.target);
        }
      });
    });
    mapObserver.observe(document.getElementById('travel-map-container'));
  }

  // ---- Number Animation ----
  function animateNumber(elementId, target) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.round(current).toLocaleString();
    }, 16);
  }

  console.log('🌍 Jimmy Adams — Personal page loaded successfully');
});

