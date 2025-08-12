const nav = document.querySelector('fieldset[role="tablist"]');
const labels = [...nav.querySelectorAll('label[role="tab"]')];

function syncTabs() {
  labels.forEach(l => {
    const checked = l.querySelector('input[type="radio"]').checked;
    l.setAttribute('aria-selected', checked ? 'true' : 'false');
  });
}

labels.forEach(l => l.querySelector('input').addEventListener('change', syncTabs));
syncTabs();


const BUILDER_API_KEY = '90c23362a6384ffabd3fd5a5978de250';

async function fetchBuilder(model, params = {}) {
  const usp = new URLSearchParams({ apiKey: BUILDER_API_KEY, ...params });
  const res = await fetch(`https://cdn.builder.io/api/v3/content/${model}?${usp.toString()}`);
  if (!res.ok) throw new Error('Builder fetch failed');
  const json = await res.json();
  return json.results || [];
}


// ---------- Projects 3xN grid with hover overlay ----------
function projectCardHTML(d) {
  const img = d.coverImage?.url || '';
  const title = d.title || 'Untitled';
  const tags = Array.isArray(d.tags) ? d.tags.filter(Boolean) : [];
  const tagsText = tags.length ? tags.join(' · ') : '';

  return `
  <article class="group relative overflow-hidden rounded-2xl bg-zinc-200">
    ${img ? `<img src="${img}" alt="${title}" loading="lazy" class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />` : `<div class="aspect-square w-full"></div>`}
    <div class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
    <div class="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      <h3 class="text-lg font-medium">${title}</h3>
      ${tagsText ? `<p class="mt-1 text-xs opacity-90">${tagsText}</p>` : ''}
    </div>
  </article>
  `;
}

async function renderProjectsGrid3col() {
  const el = document.getElementById('projects-grid-3col');
  if (!el) return;

  // Responsive 3 x N grid (1 col on mobile, 3 on md+)
  el.className = [
    'mx-auto w-full max-w-[1100px]',
    'px-6 sm:px-8 md:px-12 lg:px-24 xl:px-28 2xl:px-32',
    'py-12',
    'grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'
  ].join(' ');

  const items = await fetchBuilder('project', {
    limit: 60,
    sort: 'data.publishedAt:desc',
    fields: 'data.title,data.tags,data.coverImage'
  });

  el.innerHTML = items.map(item => projectCardHTML(item.data || {})).join('');
}

// Auto-run on page load
document.addEventListener('DOMContentLoaded', () => {
  renderProjectsGrid3col();
});

