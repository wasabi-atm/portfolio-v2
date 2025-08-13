const nav = document.querySelector('fieldset[role="tablist"]');
const labels = nav ? [...nav.querySelectorAll('label[role="tab"]')] : [];

function syncTabs() {
  labels.forEach(l => {
    const checked = l.querySelector('input[type="radio"]').checked;
    l.setAttribute('aria-selected', checked ? 'true' : 'false');
  });
}

labels.forEach(l => l.querySelector('input').addEventListener('change', syncTabs));
syncTabs();

// ==================== Builder.io wiring ====================
const BUILDER_API_KEY = '90c23362a6384ffabd3fd5a5978de250';
const BUILDER_MODEL_ID = '42feb6c403b14579a7ebc8a38401f07b'; // "projects" model id

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Builder fetch failed: ${res.status}`);
  return res.json();
}

// Try multiple endpoints so data shows even if name/id differs
async function fetchBuilder(model, params = {}) {
  const baseParams = { apiKey: BUILDER_API_KEY, cachebust: Date.now(), ...params };
  const qp = (obj) => new URLSearchParams(obj).toString();

  const attempts = [
    // 1) By model name (plural)
    `https://cdn.builder.io/api/v3/content/${model}?${qp(baseParams)}`,
    // 2) By model name (singular)
    `https://cdn.builder.io/api/v3/content/${model.replace(/s$/, '')}?${qp(baseParams)}`,
    // 3) By explicit modelId
    `https://cdn.builder.io/api/v3/content?${qp({ ...baseParams, modelId: BUILDER_MODEL_ID })}`,
  ];

  for (const url of attempts) {
    try {
      const json = await fetchJson(url);
      const results = json?.results || [];
      console.log('[Builder fetch attempt]', { url, resultsCount: results.length });
      if (results.length) return results;
    } catch (e) {
      console.warn('[Builder fetch attempt failed]', { url, error: e });
    }
  }
  return [];
}

// ---------- Projects grid + hover overlay + tag filters ----------
const STATE = { all: [], filtered: [], activeTag: 'ALL' };

function normalizeProject(entry) {
  const d = entry?.data || {};
  const title = d.title || d.Name || 'Untitled';
  const tags = Array.isArray(d.projectTags) ? d.projectTags : (Array.isArray(d.tags) ? d.tags : []);
  const thumb = typeof d.thumbnail === 'string' ? d.thumbnail : (d.thumbnail?.url || d.coverImage?.url || d.image?.url || '');
  const date = d.date || d.publishedAt || entry?.lastUpdated || entry?.firstPublished || null;
  const slug = (d.slug || '').toString();
  const description = (d.description || '').toString();
  // normalize other images into an array of URLs
  let otherImages = [];
  if (Array.isArray(d.otherImages)) {
    otherImages = d.otherImages.map(img => typeof img === 'string' ? img : (img?.url || null)).filter(Boolean);
  } else if (typeof d.otherImages === 'string') {
    otherImages = [d.otherImages];
  }
  return { id: entry?.id, title, tags: tags.filter(Boolean), thumbnail: thumb, date, slug, description, otherImages };
}

function projectCardHTML(p) {
  const img = p.thumbnail || '';
  const title = p.title || 'Untitled';
  const tagsText = p.tags?.length ? p.tags.join(' · ') : '';
  const card = `
  <article class="group relative overflow-hidden bg-zinc-200">
    ${img ? `<img src="${img}" alt="${title}" loading="lazy" class="block aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />` : `<div class="aspect-square w-full bg-zinc-300"></div>`}
    <div class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
    <div class="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      <h3 class="text-lg font-medium">${title}</h3>
      ${tagsText ? `<p class="mt-1 text-xs opacity-90">${tagsText}</p>` : ''}
    </div>
  </article>`;
  return p.slug ? `<a href="projects.html?slug=${encodeURIComponent(p.slug)}" class="block">${card}</a>` : card;
}

function renderGrid(list) {
  const el = document.getElementById('projects-grid-3col');
  if (!el) return;
    el.className = [
    'w-full md:max-w-[1100px] md:mx-auto',
    'px-0 md:px-4',
    'py-8',
    'grid grid-cols-3 gap-0'
  ].join(' ');
  
  el.style.zIndex = '0';
  el.innerHTML = list.map(projectCardHTML).join('');
}

function uniqueSortedTags(items) {
  const set = new Set();
  items.forEach(i => (i.tags || []).forEach(t => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function renderFilters(items) {
  const c = document.getElementById('projects-filters');
  if (!c) return;
  const tags = uniqueSortedTags(items);
  function paintChips() {
    const chip = (label, selected = false) => `
      <button type="button" data-tag="${label}" aria-pressed="${selected ? 'true' : 'false'}"
        class="rounded-full px-3 py-1 text-sm transition-colors border border-zinc-300/60 hover:bg-black/5 ${selected ? 'bg-black text-white border-black' : 'bg-white/70 text-zinc-700'}">
        ${label}
      </button>`;
    c.innerHTML = [chip('ALL', STATE.activeTag === 'ALL'), ...tags.map(t => chip(t, STATE.activeTag === t))].join('');
  }
  paintChips();

  c.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-tag]');
    if (!btn) return;
    const tag = btn.getAttribute('data-tag');
    STATE.activeTag = tag;

    // filter and render
    STATE.filtered = (tag === 'ALL') ? STATE.all.slice() : STATE.all.filter(i => (i.tags || []).includes(tag));
    renderGrid(STATE.filtered);

    // repaint chips reflecting current selection (listener stays on container)
    paintChips();
  });
}

async function loadProjectsAndRender() {
  const raw = await fetchBuilder('projects', { limit: 100 });
  const normalized = raw.map(normalizeProject).sort((a, b) => (new Date(b.date || 0)) - (new Date(a.date || 0)));
  if (!raw.length) {
    const grid = document.getElementById('projects-grid-3col');
    if (grid) grid.innerHTML = `<p class="px-6 py-8 text-zinc-600">No projects found. Make sure your Builder space has published entries in the <code>projects</code> model and that the API key matches this space.</p>`;
  }
  STATE.all = normalized;
  STATE.filtered = normalized.slice();
  renderFilters(STATE.all);
  renderGrid(STATE.filtered);
}

function formatDateHuman(input) {
  try {
    const d = new Date(input);
    if (isNaN(d)) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
  } catch { return ''; }
}

function svgIcon(name, cls = '') {
  if (name === 'calendar') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-4 h-4 ${cls}"><path d="M7 2a1 1 0 00-1 1v1H5a3 3 0 00-3 3v11a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3h-1V3a1 1 0 10-2 0v1H8V3a1 1 0 00-1-1zm12 7H5v9a1 1 0 001 1h12a1 1 0 001-1V9z"/></svg>`;
  }
  return '';
}

function openLightbox(images, startAt = 0) {
  if (!Array.isArray(images) || !images.length) return;
  let index = Math.max(0, Math.min(startAt, images.length - 1));

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center';
  overlay.innerHTML = `
    <button aria-label="Close" class="absolute top-3 right-3 text-white text-2xl">×</button>
    <button aria-label="Prev" class="absolute left-3 top-1/2 -translate-y-1/2 text-white text-2xl select-none">‹</button>
    <img class="max-h-[90vh] max-w-[90vw] object-contain" />
    <button aria-label="Next" class="absolute right-3 top-1/2 -translate-y-1/2 text-white text-2xl select-none">›</button>
  `;
  const imgEl = overlay.querySelector('img');
  const btnClose = overlay.querySelector('button[aria-label="Close"]');
  const btnPrev = overlay.querySelector('button[aria-label="Prev"]');
  const btnNext = overlay.querySelector('button[aria-label="Next"]');

  function show(i) { index = i; imgEl.src = images[index]; }
  show(index);

  function onKey(e) {
    if (e.key === 'Escape') cleanup();
    if (e.key === 'ArrowRight') show((index + 1) % images.length);
    if (e.key === 'ArrowLeft') show((index - 1 + images.length) % images.length);
  }
  function cleanup() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }

  overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(); });
  btnClose.addEventListener('click', cleanup);
  btnNext.addEventListener('click', () => show((index + 1) % images.length));
  btnPrev.addEventListener('click', () => show((index - 1 + images.length) % images.length));
  document.addEventListener('keydown', onKey);

  document.body.appendChild(overlay);
}

async function loadProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  if (!slug) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Missing <code>slug</code> in URL.</p>`;
    return;
  }

  const rows = await fetchBuilder('projects', { limit: 1, 'query.data.slug': slug });
  if (!rows.length) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">No project found for slug: <code>${slug}</code>.</p>`;
    return;
  }
  const p = normalizeProject(rows[0]);

  const dateText = formatDateHuman(p.date);
  const tagsHtml = (p.tags || []).map(t => `<span class="inline-flex items-center rounded-full border border-zinc-300/60 px-2 py-0.5 text-xs text-zinc-700">${t}</span>`).join(' ');

  // Build gallery grid like Google Maps (2x2, last cell shows +N when >4)
  const allImages = [p.thumbnail, ...(p.otherImages || [])].filter(Boolean);
  const rest = (p.otherImages || []);
  const previewCells = rest.slice(0, 4).map((url, i) => {
    const idx = 1 + i; // index in allImages (thumb is 0)
    const extra = i === 3 && rest.length > 4 ? `<div class="absolute inset-0 bg-black/60 text-white grid place-items-center text-2xl font-medium">+${rest.length - 4}</div>` : '';
    return `<button data-idx="${idx}" class="relative block w-full"><img src="${url}" class="block aspect-square w-full object-cover"/>${extra}</button>`;
  }).join('');

  root.innerHTML = `
    ${p.thumbnail ? `<div class="w-full"><img src="${p.thumbnail}" alt="${p.title}" class="block w-full max-h-[60vh] object-cover" /></div>` : ''}

    <article class="mx-auto w-full md:max-w-[900px] px-6 md:px-0 space-y-4 mt-6">
      <header class="space-y-2">
        <a href="projects.html" class="text-sm text-zinc-500 hover:underline">&larr; Back to Projects</a>
        <h1 class="text-3xl font-semibold">${p.title}</h1>
        ${p.description ? `<p class="text-zinc-600">${p.description}</p>` : ''}
        <div class="flex flex-wrap gap-2">${tagsHtml}</div>
        ${dateText ? `<div class="flex items-center gap-2 text-zinc-400 text-sm">${svgIcon('calendar')}<span>${dateText}</span></div>` : ''}
      </header>

      ${rest.length ? `<section class="grid grid-cols-2 gap-2">${previewCells}</section>` : ''}

      ${p.description ? `<section class="prose max-w-none"></section>` : ''}
    </article>
  `;

  // Wire gallery click -> lightbox
  root.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
      openLightbox(allImages, idx);
    });
  });
  // Also make the hero clickable to open lightbox at 0
  const hero = root.querySelector('img.block.w-full.max-h-[60vh]');
  if (hero) hero.addEventListener('click', () => openLightbox(allImages, 0));
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('projects-grid-3col')) {
    loadProjectsAndRender().catch(err => {
      console.error('[Builder projects] failed:', err);
      const el = document.getElementById('projects-grid-3col');
      if (el) el.innerHTML = `<p class="text-sm text-red-600">Failed to load projects.</p>`;
    });
  }
  loadProjectDetail();
});
