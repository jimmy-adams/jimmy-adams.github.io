/* =========================================================
   Stadiums Subpage — Jimmy Adams
   Renders map + detailed cards from STADIUMS data
   ========================================================= */

// 联赛官方网站（真实链接）
const LEAGUE_SITES = {
  "Premier League": "https://www.premierleague.com/",
  "La Liga":        "https://www.laliga.com/en-GB",
  "Serie A":        "https://www.legaseriea.it/en",
  "Bundesliga":     "https://www.bundesliga.com/en/bundesliga/",
  "Ligue 1":        "https://www.ligue1.com/"
};

// 各球场对应 Wikipedia 条目（用于“了解更多”）
const STADIUM_WIKI = {
  "Old Trafford": "Old_Trafford",
  "Santiago Bernabéu": "Santiago_Bernabéu_Stadium",
  "Allianz Arena": "Allianz_Arena",
  "San Siro (Stadio Giuseppe Meazza)": "San_Siro",
  "Parc des Princes": "Parc_des_Princes",
  "Emirates Stadium": "Emirates_Stadium",
  "Anfield": "Anfield",
  "Spotify Camp Nou": "Camp_Nou",
  "Cívitas Metropolitano": "Metropolitano_Stadium",
  "Stadio Olimpico": "Stadio_Olimpico",
  "Allianz Stadium (Juventus)": "Juventus_Stadium",
  "Signal Iduna Park": "Westfalenstadion",
  "Stade Vélodrome": "Stade_Vélodrome"
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof STADIUMS === 'undefined') return;

  animateHeroStats();
  renderMap();
  renderCards();

  console.log('🏟️ Jimmy Adams — Stadiums subpage loaded');
});

/* ---------- Hero 数字滚动 ---------- */
function animateHeroStats() {
  document.querySelectorAll('.st-stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------- 地图 ---------- */
function renderMap() {
  const mapEl = document.getElementById('stadiums-map');
  const countEl = document.getElementById('st-map-count');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([47.5, 8], 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd'
  }).addTo(map);

  STADIUMS.forEach(s => {
    const cls = s.favorite ? 'fav' : 'other';
    const icon = L.divIcon({
      className: '',
      html: `<div class="st-pin ${cls}"><span>${s.favorite ? '⚽' : '🏟️'}</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34]
    });
    const wiki = STADIUM_WIKI[s.name];
    const wikiLink = wiki ? `<a href="https://en.wikipedia.org/wiki/${wiki}" target="_blank" rel="noopener">Wikipedia ↗</a>` : '';
    L.marker([s.lat, s.lng], { icon }).addTo(map).bindPopup(
      `<div style="min-width:180px">
        <strong style="font-size:15px">${s.name}</strong><br>
        <span style="color:#6B7688">${s.team}</span><br>
        ${s.city}, ${s.country}<br>
        <span style="color:#1F9D55;font-weight:600">${s.capacity.toLocaleString()}</span> seats · opened ${s.opened}
        <div style="margin-top:6px">${wikiLink}</div>
      </div>`
    );
  });

  const favN = STADIUMS.filter(s => s.favorite).length;
  if (countEl) countEl.textContent = `${STADIUMS.length} grounds · ${favN} my teams`;

  setTimeout(() => map.invalidateSize(), 400);
}

/* ---------- 卡片 ---------- */
function renderCards() {
  const wrap = document.getElementById('stadiums-cards');
  const listCount = document.getElementById('st-list-count');
  if (!wrap) return;

  // 主队优先
  const sorted = [...STADIUMS].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
  if (listCount) listCount.textContent = `${sorted.length} grounds`;

  const favN = STADIUMS.filter(s => s.favorite).length;

  sorted.forEach((s, i) => {
    const sc = LEAGUE_COLORS[s.league] || '#1F9D55';
    const wiki = STADIUM_WIKI[s.name];
    const leagueSite = LEAGUE_SITES[s.league] || '#';

    const card = document.createElement('article');
    card.className = 'st-card' + (s.favorite ? ' fav' : '');
    card.style.setProperty('--sc', sc);
    card.dataset.delay = i * 60;

    const facts = s.facts || {};
    const videoHtml = s.video
      ? `<div class="st-video st-video-poster" data-video="${s.video}" data-title="${s.name} — official video" style="background-image:url('${s.image}')">
           <div class="st-video-overlay"></div>
           <button class="st-play-btn" type="button" aria-label="Play ${s.name} official video">
             <span class="st-play-icon">▶</span>
             <span class="st-play-label">Watch official video</span>
           </button>
         </div>`
      : '';

    const links = [];
    links.push(`<a href="${leagueSite}" target="_blank" rel="noopener" class="st-link primary">Official League ↗</a>`);
    if (wiki) links.push(`<a href="https://en.wikipedia.org/wiki/${wiki}" target="_blank" rel="noopener" class="st-link ghost">Wikipedia</a>`);

    card.innerHTML = `
      <div class="st-card-media">
        <div class="st-card-bar"></div>
        ${s.favorite ? '<span class="st-card-fav">★ My Team</span>' : ''}
        ${s.visited ? '<span class="st-card-visited">✈ On my travel map</span>' : ''}
        <img src="${s.image}" alt="${s.name} — ${s.team}" loading="lazy">
      </div>
      <div class="st-card-body">
        <div class="st-card-head">
          <div>
            <h3 class="st-card-name">${s.name}</h3>
            <p class="st-card-team">${s.team}</p>
          </div>
          <span class="st-league-chip">${s.league}</span>
        </div>
        <p class="st-card-loc">📍 ${s.city}, ${s.country}</p>

        <div class="st-facts">
          <div class="st-fact"><span class="k">Capacity</span><span class="v">${s.capacity.toLocaleString()}</span></div>
          <div class="st-fact"><span class="k">Opened</span><span class="v">${s.opened}</span></div>
          ${facts.architect ? `<div class="st-fact"><span class="k">Architect</span><span class="v">${facts.architect}</span></div>` : ''}
          ${facts.record ? `<div class="st-fact"><span class="k">Record Attendance</span><span class="v">${facts.record}</span></div>` : ''}
        </div>

        <p class="st-nick">“${s.nickname}”</p>
        <p class="st-intro">${s.intro}</p>

        ${videoHtml}

        <div class="st-card-foot">${links.join('')}</div>
      </div>
    `;
    wrap.appendChild(card);
  });

  // 滚动揭示
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const d = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in'), d);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.st-card').forEach(el => obs.observe(el));

  // 点击海报后加载 iframe（性能更优，也避免无头浏览器的 iframe 拦截）
  document.querySelectorAll('.st-video-poster').forEach(poster => {
    poster.addEventListener('click', () => {
      const id = poster.dataset.video;
      const title = poster.dataset.title;
      if (!id) return;
      poster.classList.remove('st-video-poster');
      poster.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  });
}
