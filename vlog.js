/* =========================================================
   Vlog Page — Jimmy Adams
   In-page writing + local publish + push to GitHub Pages
   ========================================================= */

const VL_REPO = 'jimmy-adams/jimmy-adams.github.io';
const VL_BRANCH = 'master';
const VL_FILE = 'vlog-data.json';
const VL_STORE = 'vl-posts';
const VL_TOKEN = 'vl-token';

/* ---------- Storage helpers ---------- */
function loadLocal() {
  try { return JSON.parse(localStorage.getItem(VL_STORE) || '[]'); }
  catch (e) { return []; }
}
function saveLocal(posts) {
  localStorage.setItem(VL_STORE, JSON.stringify(posts));
}
function upsertLocal(post) {
  const posts = loadLocal().filter(p => p.id !== post.id);
  posts.push(post);
  saveLocal(posts);
}

/* ---------- Rendering ---------- */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function autoLink(s) {
  return s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
}
function parseVideo(url) {
  if (!url) return null;
  url = url.trim();
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return `<iframe src="https://www.youtube.com/embed/${m[1]}" title="video" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  m = url.match(/bilibili\.com\/video\/(BV[\w]+)/);
  if (m) return `<iframe src="https://player.bilibili.com/player.html?bvid=${m[1]}&autoplay=0" scrolling="no" frameborder="0" allowfullscreen></iframe>`;
  if (/\.(mp4|webm|ogg)$/i.test(url) && /^https?:\/\//.test(url)) return `<video controls src="${escapeHtml(url)}"></video>`;
  return null;
}
function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function renderFeed() {
  const feed = document.getElementById('vl-feed');
  const empty = document.getElementById('vl-empty');
  const countEl = document.getElementById('vl-count');
  if (!feed) return;

  const posts = loadLocal().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  countEl.textContent = `${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`;
  feed.innerHTML = '';

  posts.forEach(p => {
    const videoHtml = parseVideo(p.video);
    const card = document.createElement('article');
    card.className = 'vl-post';
    card.innerHTML = `
      ${videoHtml ? `<div class="vl-post-media">${videoHtml}</div>` : ''}
      <div class="vl-post-body">
        <div class="vl-post-meta">
          <span class="vl-post-date">${fmtDate(p.date)}</span>
          <button class="vl-post-del" data-id="${p.id}">Delete</button>
        </div>
        <h3 class="vl-post-title">${escapeHtml(p.title || 'Untitled')}</h3>
        <div class="vl-post-text">${autoLink(escapeHtml(p.content))}</div>
      </div>
    `;
    feed.appendChild(card);
  });

  empty.style.display = posts.length ? 'none' : 'block';

  // reveal animation
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.vl-post').forEach(el => obs.observe(el));

  // delete handlers
  feed.querySelectorAll('.vl-post-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      saveLocal(loadLocal().filter(p => p.id !== id));
      renderFeed();
      toast('Entry deleted', 'ok');
    });
  });
}

/* ---------- Publish (local) ---------- */
function publish() {
  const title = document.getElementById('vl-title').value.trim();
  const video = document.getElementById('vl-video').value.trim();
  const content = document.getElementById('vl-content').value.trim();

  if (!title && !content) { toast('Write a title or some text first', 'err'); return; }

  const post = {
    id: 'p' + Date.now() + Math.random().toString(36).slice(2, 6),
    title, video, content,
    date: new Date().toISOString()
  };
  upsertLocal(post);
  renderFeed();

  document.getElementById('vl-title').value = '';
  document.getElementById('vl-video').value = '';
  document.getElementById('vl-content').value = '';
  const hint = document.getElementById('vl-saved-hint');
  hint.textContent = 'Saved locally ✓';
  setTimeout(() => { hint.textContent = ''; }, 2500);
  toast('Published locally ✓', 'ok');
}

/* ---------- Push to GitHub ---------- */
function getAllPosts() {
  return loadLocal();
}
function downloadJSON() {
  const data = JSON.stringify(getAllPosts(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = VL_FILE;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function pushToGitHub() {
  let token = localStorage.getItem(VL_TOKEN);
  if (!token) {
    toast('No token — downloaded vlog-data.json instead. Commit it to your repo.', 'err');
    downloadJSON();
    return;
  }

  const posts = getAllPosts();
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(posts, null, 2))));

  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };

  try {
    // get existing file sha (if any)
    let sha;
    const getRes = await fetch(`https://api.github.com/repos/${VL_REPO}/contents/${VL_FILE}?ref=${VL_BRANCH}`, { headers });
    if (getRes.ok) sha = (await getRes.json()).sha;

    const body = { message: 'chore: update vlog entries', content, branch: VL_BRANCH };
    if (sha) body.sha = sha;

    const putRes = await fetch(`https://api.github.com/repos/${VL_REPO}/contents/${VL_FILE}`, {
      method: 'PUT', headers, body: JSON.stringify(body)
    });

    if (putRes.ok) {
      toast('Pushed to GitHub ✓ Live on the site', 'ok');
    } else {
      const err = await putRes.json().catch(() => ({}));
      toast('Push failed: ' + (err.message || putRes.status), 'err');
    }
  } catch (e) {
    toast('Push error: ' + e.message, 'err');
  }
}

/* ---------- Token settings ---------- */
function setupSettings() {
  const gear = document.getElementById('vl-gear');
  const panel = document.getElementById('vl-settings');
  const tokenInput = document.getElementById('vl-token');
  const saveBtn = document.getElementById('vl-save-token');
  const clearBtn = document.getElementById('vl-clear-token');
  const status = document.getElementById('vl-token-status');

  // prefill from storage
  const saved = localStorage.getItem(VL_TOKEN);
  if (saved) tokenInput.value = saved;

  gear.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    status.textContent = saved ? 'Token is set ✓' : '';
  });
  saveBtn.addEventListener('click', () => {
    const v = tokenInput.value.trim();
    if (!v) { status.textContent = 'Enter a token first'; return; }
    localStorage.setItem(VL_TOKEN, v);
    status.textContent = 'Token saved ✓';
    toast('Token saved in this browser', 'ok');
  });
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem(VL_TOKEN);
    tokenInput.value = '';
    status.textContent = 'Token cleared';
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg, kind) {
  const el = document.getElementById('vl-toast');
  el.textContent = msg;
  el.className = 'vl-toast show' + (kind ? ' ' + kind : '');
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'vl-toast'; }, 3000);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  // merge already-pushed posts from the repo into local store
  try {
    const res = await fetch(VL_FILE + '?t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const remote = await res.json();
      if (Array.isArray(remote)) {
        const local = loadLocal();
        const ids = new Set(local.map(p => p.id));
        remote.forEach(p => { if (!ids.has(p.id)) { local.push(p); ids.add(p.id); } });
        saveLocal(local);
      }
    }
  } catch (e) { /* offline — use local only */ }

  setupSettings();
  renderFeed();

  document.getElementById('vl-publish').addEventListener('click', publish);
  document.getElementById('vl-push').addEventListener('click', pushToGitHub);

  console.log('🎬 Jimmy Adams — Vlog loaded');
});
