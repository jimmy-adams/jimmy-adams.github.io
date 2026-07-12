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

  // ---- Render Stadium Cards + Map ----
  renderStadiums();

  console.log('⚽ Jimmy Adams — Football Hub loaded');
});

function renderStadiums() {
  if (typeof STADIUMS === 'undefined') return;

  const grid = document.getElementById('stadiums-grid');
  const countEl = document.getElementById('stadium-count');
  const mapEl = document.getElementById('stadium-map');
  const linkageEl = document.getElementById('stadium-linkage');
  if (!grid) return;

  // Sort: favorites first
  const sorted = [...STADIUMS].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
  countEl.textContent = `${STADIUMS.length} stadiums · ${new Set(STADIUMS.map(s => s.league)).size} leagues`;

  sorted.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'fb-stadium-card';
    card.style.setProperty('--sc', LEAGUE_COLORS[s.league] || '#1F9D55');
    card.dataset.delay = i * 60;
    card.innerHTML = `
      ${s.favorite ? '<span class="fb-stadium-fav">★ My Team</span>' : ''}
      <h3>${s.name}</h3>
      <p class="fb-stadium-team">${s.team}</p>
      <ul class="fb-stadium-meta">
        <li><span class="fb-meta-label">League</span><span class="fb-meta-val">${s.league}</span></li>
        <li><span class="fb-meta-label">City</span><span class="fb-meta-val">${s.city}, ${s.country}</span></li>
        <li><span class="fb-meta-label">Capacity</span><span class="fb-meta-val">${s.capacity.toLocaleString()}</span></li>
        <li><span class="fb-meta-label">Opened</span><span class="fb-meta-val">${s.opened}</span></li>
      </ul>
      <p class="fb-stadium-nick">"${s.nickname}"</p>
      ${s.visited ? '<span class="fb-stadium-visited">✈ On my travel map</span>' : ''}
    `;
    grid.appendChild(card);
  });

  // Reveal animation
  const stadiumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        stadiumObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fb-stadium-card').forEach(el => stadiumObserver.observe(el));

  // Linkage banner (stadiums in cities I've visited)
  const visitedStadiums = STADIUMS.filter(s => s.visited);
  if (linkageEl) {
    if (visitedStadiums.length > 0) {
      linkageEl.innerHTML = `
        <span class="fb-link-icon">🗺️</span>
        <div><strong>${visitedStadiums.length}</strong> of these stadiums sit in cities already on my travel map —
        including <strong>${visitedStadiums.map(s => s.name).join(', ')}</strong>. Football and travel, same route.</div>
      `;
    } else {
      linkageEl.style.display = 'none';
    }
  }

  // Map
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map(mapEl, { scrollWheelZoom: false }).setView([48, 6], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd'
    }).addTo(map);

    STADIUMS.forEach(s => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="fb-stadium-marker">${s.favorite ? '⚽' : '🏟️'}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      L.marker([s.lat, s.lng], { icon }).addTo(map)
        .bindPopup(`<strong>${s.name}</strong><br>${s.team}<br>${s.city}, ${s.country}<br>Capacity: ${s.capacity.toLocaleString()}`);
    });

    // Fix map size after reveal
    setTimeout(() => map.invalidateSize(), 500);
  }
}
