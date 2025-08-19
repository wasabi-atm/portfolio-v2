// ==================== Global Navigation Renderer ====================
const NAV_ITEMS = [
  {
    href: 'index.html',
    label: 'Home',
    icon: (isCurrent = false) => `
      ${isCurrent
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2h-5v-6h-4v6H5a2 2 0 0 1-2-2v-9.5z"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-neutral-500 aria-[current=page]:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10h14V10" />
           </svg>`}
    `
  },
  {
    href: 'projects.html',
    label: 'Projects',
    icon: (isCurrent = false) => `
      ${isCurrent
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-neutral-500 aria-[current=page]:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16" />
           </svg>`}
    `
  },
  {
    href: 'blogs.html',
    label: 'Blogs',
    icon: (isCurrent = false) => `
      ${isCurrent
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 2v6h6"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-neutral-500 aria-[current=page]:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
           </svg>`}
    `
  },
  {
    href: 'connect.html',
    label: 'Connect',
    icon: (isCurrent = false) => `
      ${isCurrent
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-green-700" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
             <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 10a7 7 0 0 1 14 0z"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:hidden text-neutral-500 aria-[current=page]:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11a4 4 0 108 0m-9 7h10a2 2 0 002-2v-5H5v5a2 2 0 002 2z" />
           </svg>`}
    `
  }
];

function currentFilename() {
  try {
    const parts = location.pathname.split('/');
    let name = parts[parts.length - 1] || 'index.html';
    // Handle root path ("/") – assume index.html
    if (!name.includes('.')) name = 'index.html';
    return name;
  } catch { return 'index.html'; }
}

function renderGlobalNav() {
  const mount = document.getElementById('site-nav');
  if (!mount) return; // page can opt-out by omitting the mount node

  const here = currentFilename();

  const links = NAV_ITEMS.map(item => {
    const isCurrent = (here === item.href)
      || (here === 'showcase.html' && item.href === 'projects.html')
      || (here === 'article.html' && item.href === 'blogs.html');
    return `
      <a role="tab" href="${item.href}" ${isCurrent ? 'aria-current="page"' : ''}
        class="group flex-1 md:flex-none md:px-0 grid place-items-center [grid-auto-flow:row] md:[grid-auto-flow:column] gap-2 md:gap-0 text-center font-normal">
        ${item.icon(isCurrent)}
        ${
          item.label === 'Connect'
            ? `<span class="relative inline-block px-2 py-0.5">
                 <span class="absolute -inset-x-2 -inset-y-1 rounded-full bg-green-600/50 opacity-0 transition-opacity group-hover:opacity-100"></span>
                 <span class="relative z-10 text-neutral-500 md:text-neutral-500 aria-[current=page]:text-black aria-[current=page]:underline text-sm md:text-l ${isCurrent ? 'font-bold md:text-black md:underline md:decoration-2 md:underline-offset-4' : 'font-medium'} aria-[current=page]:text-green-700 md:aria-[current=page]:text-black">${item.label}</span>
               </span>`
            : `<span class="text-neutral-500 md:text-neutral-500 aria-[current=page]:text-black aria-[current=page]:underline text-sm md:text-l ${isCurrent ? 'font-bold md:text-black md:underline md:decoration-2 md:underline-offset-4' : 'font-medium'}">${item.label}</span>`
        }
      </a>`;
  }).join('');

  mount.innerHTML = `
    <fieldset role="tablist" aria-label="Primary navigation"
      class="
        fixed left-1/2 -translate-x-1/2 z-50
        bottom-[calc(env(safe-area-inset-bottom)+36px)]
        md:bottom-auto md:top-6
        w-[min(90vw,500px)] md:w-[min(60vw,400px)]
        flex items-center justify-between
        rounded-full md:rounded-full
        bg-white/15 md:bg-zinc-300/20
        backdrop-blur-xl backdrop-saturate-150 shadow-[0_6px_16px_rgba(0,0,0,0.10)]
        ring-1 ring-white/30 md:ring-0
        px-6 py-4 md:px-6 md:py-4
        gap-4 md:gap-3
      ">
      <legend class="sr-only">Navigation</legend>
      ${links}
    </fieldset>`;
}

// ==================== Builder.io wiring ====================
const BUILDER_API_KEY = '90c23362a6384ffabd3fd5a5978de250';
const BUILDER_MODEL_ID = '42feb6c403b14579a7ebc8a38401f07b'; // "projects" model id
const BLOGS_MODEL_ID = '9bf58fdc2e3e44b98667c3acfbff9600';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Builder fetch failed: ${res.status}`);
  return res.json();
}

async function fetchBuilder(model, params = {}) {
  const baseParams = { apiKey: BUILDER_API_KEY, cachebust: Date.now(), ...params };
  const qp = (obj) => new URLSearchParams(obj).toString();
  // Avoid brittle sort objects (Builder rejects sorts with spaces in field names)
  if (baseParams.sort && typeof baseParams.sort === 'object') delete baseParams.sort;

  const attempts = [
    `https://cdn.builder.io/api/v3/content/${model}?${qp(baseParams)}`,
    `https://cdn.builder.io/api/v3/content/${model.replace(/s$/, '')}?${qp(baseParams)}`,
    `https://cdn.builder.io/api/v3/content?${qp({ ...baseParams, modelId: model === 'blogs' ? BLOGS_MODEL_ID : BUILDER_MODEL_ID })}`,
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

const STATE = { all: [], filtered: [], activeTag: 'ALL' };

function normalizeProject(entry) {
  const d = entry?.data || {};
  const title = d.title || d.Name || 'Untitled';
  const tags = Array.isArray(d.projectTags) ? d.projectTags : (Array.isArray(d.tags) ? d.tags : []);
  const thumb = typeof d.thumbnail === 'string' ? d.thumbnail : (d.thumbnail?.url || d.coverImage?.url || d.image?.url || '');
  const date = d.date || d.publishedAt || entry?.lastUpdated || entry?.firstPublished || null;
  const slug = (d.slug || '').toString();
  const description = (d.description || '').toString();

  let otherImages = [];
  if (Array.isArray(d.otherImages)) {
    otherImages = d.otherImages
      .flatMap((item) => {
        const urls = [];
        if (typeof item === 'string') return [item];
        if (item && typeof item.url === 'string') urls.push(item.url);
        if (item && item.image && typeof item.image.url === 'string') urls.push(item.image.url);
        if (item && typeof item === 'object') {
          for (const v of Object.values(item)) {
            if (typeof v === 'string') urls.push(v);
            else if (v && typeof v.url === 'string') urls.push(v.url);
            else if (v && v.image && typeof v.image.url === 'string') urls.push(v.image.url);
          }
        }
        return urls;
      })
      .filter(Boolean);
  } else if (typeof d.otherImages === 'string') {
    otherImages = [d.otherImages];
  }

  const galleryRaw = (d.galleryUrls || '').toString();
  if (galleryRaw) {
    const split = galleryRaw.split(/\n|,|\s+/).map(s => s.trim()).filter(Boolean);
    const urlish = split.filter(s => /^(https?:)?\/\//i.test(s));
    otherImages = otherImages.concat(urlish);
  }

  const seen = new Set();
  otherImages = otherImages.filter(u => {
    if (!u || u === thumb || seen.has(u)) return false;
    seen.add(u);
    return true;
  });

  return { id: entry?.id, title, tags: tags.filter(Boolean), thumbnail: thumb, date, slug, description, otherImages };
}

// ==================== BLOGS SUPPORT ====================
function stripHtml(html = '') {
  try { return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); } catch { return ''; }
}

function wordsPerMinuteEstimate(text) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220)); // ~220 wpm
  return { words, minutes };
}

function normalizeBlog(entry) {
  const d = entry?.data || {};
  // Title fallbacks
  const title = d['Blog title'] || d.blogTitle || d.title || d.name || 'Untitled';
  // Description fallbacks
  const description = d['Blog description'] || d.blogDescription || d.description || '';
  // Date fallbacks (support various casings/keys)
  const date = d['Blog date'] || d.blogDate || d.date || entry?.lastUpdated || entry?.firstPublished || null;
  // Tags can be an array of strings or objects
  let tags = d['Blog tags'] || d.blogTags || d.tags || [];
  if (Array.isArray(tags)) {
    tags = tags.map(t => (typeof t === 'string' ? t : (t?.value || t?.name || ''))).filter(Boolean);
  } else {
    tags = [];
  }
  // Thumbnail can be string or file object
  let thumb = d.Thumbnail || d.thumbnail || d.coverImage || d.image || '';
  if (thumb && typeof thumb === 'object') thumb = thumb.url || thumb.src || '';
  if (typeof thumb !== 'string') thumb = '';

  // Reading time: combine list and html fields, handle objects
  const listField = d['Blog content'] || d.blogContent || [];
  const listContent = Array.isArray(listField)
    ? listField.map(x => (typeof x === 'string' ? x : Object.values(x || {}).join(' '))).join(' ')
    : '';
  const htmlContent = typeof d['Blog article'] === 'string' ? d['Blog article'] : (typeof d.blogArticle === 'string' ? d.blogArticle : '');
  const plain = stripHtml(`${listContent} ${htmlContent}`);
  const { minutes } = wordsPerMinuteEstimate(plain || description);

  // Links (Github/Figma/App Store); accept either a single list field or separate fields
  function asUrl(val) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.url || val.href || val.link || val.src || (val.image && val.image.url) || '';
    return '';
  }

  let links = [];

  // 1) Primary: aggregated list field `Links`
  const linksRaw = d.Links || d.links;
  if (Array.isArray(linksRaw)) {
    // Each list item can be a string URL OR an object with nested fields per brand
    linksRaw.forEach(x => {
      if (typeof x === 'string') {
        const url = asUrl(x);
        if (url) links.push({ url });
        return;
      }
      if (x && typeof x === 'object') {
        // Direct url-like object
        const direct = asUrl(x);
        if (direct) links.push({ url: direct, label: x.label || x.name || x.title || '' });

        // Named keys like "Github link", "Figma link", "App store link"
        const entries = Object.entries(x);
        entries.forEach(([k, v]) => {
          const url = asUrl(v);
          if (!url) return;
          const key = k.trim().toLowerCase();
          if (/(github)/.test(key)) links.push({ url, label: 'GitHub' });
          else if (/(figma)/.test(key)) links.push({ url, label: 'Figma' });
          else if (/(app\s*store|ios|apple)/.test(key)) links.push({ url, label: 'App Store' });
          else if (!direct) links.push({ url, label: k });
        });
      }
    });
  } else if (linksRaw && typeof linksRaw === 'object') {
    // occasionally Links may be an object with named keys
    Object.entries(linksRaw).forEach(([k, v]) => {
      const url = asUrl(v);
      if (url) links.push({ url, label: k });
    });
  }

  // 2) Alternates: separate fields on the model
  const altMap = [
    ['GitHub', d.GitHub ?? d.Github ?? d.github],
    ['Figma', d.Figma ?? d.figma],
    ['App Store', d['App Store'] ?? d.AppStore ?? d.appStore ?? d.appstore]
  ];
  altMap.forEach(([label, value]) => {
    const url = asUrl(value);
    if (url) links.push({ url, label });
  });

  // 3) Deduplicate by URL
  const seenUrl = new Set();
  links = links.filter(l => {
    if (!l || !l.url) return false;
    if (seenUrl.has(l.url)) return false;
    seenUrl.add(l.url);
    return true;
  });

  // 4) Infer label from hostname when missing
  links = links.map(l => {
    try {
      const u = new URL(l.url, location.origin);
      const host = u.hostname.toLowerCase();
      if (!l.label) {
        if (host.includes('github')) l.label = 'GitHub';
        else if (host.includes('figma')) l.label = 'Figma';
        else if (host.includes('apple') || host.includes('apps.apple')) l.label = 'App Store';
        else l.label = 'Link';
      }
      return l;
    } catch { return l; }
  });

  return { id: entry?.id, title, description, date, tags, thumbnail: thumb, minutes, links };
}

function formatBlogDate(input) {
  try {
    const d = new Date(input);
    if (isNaN(d)) return '';
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

function formatBlogDateShort(input) {
  try {
    const d = new Date(input);
    if (isNaN(d)) return '';
    return d.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
  } catch { return ''; }
}

function blogRowHTML(b) {
  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  const author = `<strong>Wira Wibisana</strong> in <strong>${firstTag}</strong>`;
  const dateText = formatBlogDate(b.date);
  const dateTextShort = formatBlogDateShort(b.date);
  const hasThumb = Boolean(b.thumbnail);

  const thumb = hasThumb ? `
    <div class="relative z-10 shrink-0 w-24 h-24 md:w-[320px] md:h-40">
      <img src="${b.thumbnail}" alt="${b.title}" loading="lazy"
           class="block w-24 h-24 md:w-[320px] md:h-40 object-cover rounded-md"/>
    </div>
  ` : '';

  return `
    <article class="py-3 md:py-6">
      <a href="article.html?id=${b.id}" class="group relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 rounded-xl px-3 py-2 md:px-3 md:py-3 transition-colors duration-200 hover:bg-zinc-200/60 hover:ring-1 hover:ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:bg-zinc-200/50">
        <div class="relative z-10 min-w-0 space-y-1 md:space-y-2">
          <p class="text-xs md:text-sm text-zinc-600">
            ${author}
            <img src="assets/BG%20Placeholder.avif" alt=""
                 class="inline-block align-middle h-[1em] w-[1em] object-cover"
                 loading="lazy" decoding="async"/>
          </p>

          <!-- Tight title on mobile; larger on desktop; clamp to prevent tall cards -->
          <h2 class="text-base sm:text-lg md:text-[26px] leading-snug font-semibold text-black line-clamp-2">
            ${b.title}
          </h2>

          <!-- Hide description on mobile; show on md+ -->
          ${b.description ? `<p class="hidden md:block text-zinc-600">${b.description}</p>` : ''}

          <!-- Compact meta on mobile -->
          <div class="flex items-center gap-3 text-[11px] md:text-sm text-zinc-500">
            <span class="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 opacity-70">
                <path d="M12 6v12"/>
                <path d="M12 6c-2.5-1.667-5-2-8-2v12c3 0 5.5.333 8 2"/>
                <path d="M12 6c2.5-1.667 5-2 8-2v12c-3 0-5.5.333-8 2"/>
              </svg>
              <span class="md:hidden">${b.minutes} min</span>
              <span class="hidden md:inline">${b.minutes} min read</span>
            </span>
            ${dateText ? `
              <span aria-hidden="true">•</span>
              <span class="md:hidden">${dateTextShort}</span>
              <span class="hidden md:inline">${dateText}</span>
            ` : ''}
          </div>
        </div>
        ${thumb}
      </a>
    </article>
    <hr class="border-zinc-200"/>
  `;
}

// ==================== BLOG DETAIL SUPPORT ====================
async function loadBlogDetail() {
  const root = document.getElementById('blog-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Missing <code>id</code> in URL.</p>`;
    return;
  }

  // Try by ids first (Builder supports ids param); verify match, else fall back strategies
  let rows = await fetchBuilder('blogs', { limit: 1, ids: id });
  if (!rows.length || rows[0]?.id !== id) {
    rows = await fetchBuilder('blogs', { limit: 1, 'query.id': id });
  }
  if (!rows.length || rows[0]?.id !== id) {
    // Final fallback: fetch a larger set and find by exact id client-side
    const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
    rows = many.filter(r => r?.id === id);
  }

  if (!rows.length) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">No article found for id: <code>${id}</code>.</p>`;
    return;
  }

  const raw = rows[0];
  const b = normalizeBlog(raw);

  // Extract richer content if present
  const d = raw?.data || {};
  // Parse structured Blog content (List) – we expect a single item that contains chapter html and up to 5 images
  const htmlContent = typeof d['Blog article'] === 'string' ? d['Blog article'] : (typeof d.blogArticle === 'string' ? d.blogArticle : '');
  const contentItem = Array.isArray(d['Blog content']) && d['Blog content'].length
    ? d['Blog content'][0]
    : (Array.isArray(d.blogContent) && d.blogContent.length ? d.blogContent[0] : null);

  // Collect up to 5 images like the showcase gallery
  function urlFrom(val) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.url || val.src || val.image?.url || '';
    return '';
  }
  const galleryImages = contentItem ? [
    urlFrom(contentItem['Blog image 0']),
    urlFrom(contentItem['Blog image 1']),
    urlFrom(contentItem['Blog image 2']),
    urlFrom(contentItem['Blog image 3']),
    urlFrom(contentItem['Blog image 4'])
  ].filter(Boolean) : [];

  // Build gallery HTML (reusing showcase layout: big + vertical stack + +N overlay)
  let galleryHtml = '';
  if (galleryImages.length === 1) {
    galleryHtml = `
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <button data-idx="1" class="relative block w-full aspect-square">
            <img src="${galleryImages[0]}" alt="Blog image" class="block w-full h-full object-cover"/>
          </button>
        </div>
      </section>`;
  } else if (galleryImages.length >= 2) {
    const big = `
      <button data-idx="1" class="relative block w-full aspect-square overflow-hidden md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
        <img src="${galleryImages[0]}" alt="Blog image" class="block w-full h-full object-cover"/>
      </button>`;
    const smalls = galleryImages.slice(1, 4).map((url, i, arr) => {
      const idx = i + 2;
      const isFirst = i === 0;
      const isLast = i === 2 || i === arr.length - 1;
      const rounded = isFirst ? 'md:rounded-tr-xl' : (isLast ? 'md:rounded-br-xl' : '');
      const extra = (i === 2 && galleryImages.length > 4)
        ? `<div class=\"absolute inset-0 bg-black/60 text-white grid place-items-center text-2xl font-medium\">+${galleryImages.length - 4}</div>`
        : '';
      return `
        <button data-idx="${idx}" class="relative block w-full aspect-square overflow-hidden ${rounded}">
          <img src="${url}" alt="Blog image" class="block w-full h-full object-cover"/>
          ${extra}
        </button>`;
    }).join('');
    galleryHtml = `
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <div class="hidden md:grid md:grid-cols-[3fr_1fr] md:gap-0">
            <div>${big}</div>
            <div class="grid grid-rows-3 md:gap-0">${smalls}</div>
          </div>
          <div class="md:hidden">
            ${big}
            <div class="grid grid-cols-3 gap-1 mt-1">${smalls}</div>
          </div>
        </div>
      </section>`;
  }

  // Build chapters from known fields; each becomes a section with anchor
  const CHAPTERS = [
    ['overview','Overview'],
    ['background','Background'],
    ['empathize','Empathize'],
    ['desk-research','Desk research'],
    ['user-interview','User interview'],
    ['ideate','Ideate'],
    ['prototype','Prototype'],
    ['final-result','Final result'],
    ['reflections','Reflections']
  ];

  function chapterHtml(keyId, label, source) {
    const html = (contentItem && (contentItem[label] || contentItem[label.toLowerCase()] || contentItem[label.replace(/\s+/g,'')])) || '';
    if (!html) return '';
    return `
      <section id="${keyId}" class="scroll-mt-24 border-t border-zinc-200 pt-10 mt-10">
        <h2 class="text-xl md:text-2xl font-semibold mb-3">${label}</h2>
        <div class="prose max-w-none">${typeof html === 'string' ? html : ''}</div>
      </section>`;
  }

  const chaptersHtml = CHAPTERS.map(([id, label]) => chapterHtml(id, label)).filter(Boolean).join('');

  // Assemble final body: optional raw Html article first, then gallery, then chapters
  const bodyHtml = `${htmlContent || ''}${galleryHtml}${chaptersHtml}` || (b.description ? `<p>${b.description}</p>` : '<p></p>');

  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  const author = `<strong>Wira Wibisana</strong> in <strong>${firstTag}</strong>
    <img src="assets/BG%20Placeholder.avif" alt="" class="inline-block align-middle h-[1em] w-[1em] object-cover" loading="lazy" decoding="async"/>`;
  const dateLong = formatBlogDate(b.date);
  const dateShort = formatBlogDateShort(b.date);
  function svgBrand(label) {
    const k = (label || '').toLowerCase();
    if (k.includes('github')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2c-3.3.8-4-1.4-4-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2.9-.2 1.8-.3 2.7-.3.9 0 1.8.1 2.7.3 2.2-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.4-5.3 5.8.4.3.7 1 .7 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5z"/></svg>`;
    }
    if (k.includes('figma')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 9a3 3 0 000-6H9v6h3zM6 3h3v6H6a3 3 0 010-6zm6 6H9v6h3a3 3 0 000-6zm0 6H9v6h3a3 3 0 000-6zm1.5-3A3 3 0 1015 6a3 3 0 00-1.5 5.7z"/></svg>`;
    }
    // Apple/App Store logo (simplified apple)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M16.7 13.4c0-2.7 2.2-3.9 2.3-4-1.3-1.9-3.3-2.2-4-2.3-1.7-.2-3.3 1-4.1 1-.9 0-2.1-1-3.4-1-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.3 2 2.7 3.4 2.7 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.9c1.4 0 2.5-1.3 3.4-2.7.6-.9.9-1.9 1.2-2.9-3.1-1.2-3.7-4-3.7-4.5zM14.9 5.3c.7-.9 1.1-2 1-3.1-1 .1-2.1.7-2.8 1.6-.6.8-1.1 1.9-1 3 1 .1 2.1-.6 2.8-1.5z"/></svg>`;
  }
  function renderLinkPills(links) {
    if (!links || !links.length) return '';
    return `<div class="flex flex-wrap gap-2">${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs md:text-sm">${svgBrand(l.label)}<span>${l.label}</span></a>`).join('')}</div>`;
  }
  const linksPills = renderLinkPills(b.links);

  // Build chips for tags
  const tagsHtml = (b.tags || []).map(t => `<span class="inline-flex items-center rounded-full border border-zinc-300/60 px-2 py-0.5 text-xs text-zinc-700">${t}</span>`).join(' ');

  // Assemble top hero image list for lightbox (thumbnail first)
  const allImages = [b.thumbnail, ...galleryImages].filter(Boolean);

  root.innerHTML = `
    <div class="min-h-screen pb-48 md:pb-32">
      ${b.thumbnail ? `
        <div class="w-full overflow-hidden">
          <img data-hero src="${b.thumbnail}" alt="${b.title}" class="block w-full object-cover object-center cursor-pointer" style="max-height:200px;" />
        </div>
      ` : ''}

      <article class="mx-auto w-full md:max-w-[1100px] px-4 md:px-6 lg:px-0 mt-6 pt-6 md:pt-12 pb-24">
        <div id="back-sentinel" class="hidden md:block h-0"></div>
        <div class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-8">
          <div>
            <header class="space-y-3 relative">
              <a href="/blogs.html" id="back-button"
                 class="fixed top-4 left-4 z-50 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow md:static md:bg-transparent md:shadow-none md:text-zinc-500 md:hover:underline transition-colors">
                <span class="md:hidden">&larr; Back</span>
                <span class="hidden md:inline">&larr; Back to Blogs</span>
              </a>
              <p class="text-sm text-zinc-600">${author}</p>
              <h1 class="text-3xl md:text-4xl font-semibold">${b.title}</h1>
              ${b.description ? `<p class="text-zinc-600 text-lg leading-relaxed">${b.description}</p>` : ''}
              ${tagsHtml ? `<div class="flex flex-wrap gap-2">${tagsHtml}</div>` : ''}
              ${linksPills || ''}
              ${b.date ? `<div class="flex items-center gap-2 text-zinc-400 text-sm">${svgIcon('calendar')}<span class="md:hidden">${dateShort}</span><span class="hidden md:inline">${dateLong}</span></div>` : ''}
            </header>

            <section class="prose max-w-none mt-2">${bodyHtml}</section>
            ${linksPills ? `<div class="mt-8">${linksPills}</div>` : ''}
          </div>

          <aside class="hidden md:block">
            <div class="sticky top-24 space-y-2" id="toc">
              <p class="text-xs uppercase tracking-wide text-zinc-500">On this page</p>
              <nav class="flex flex-col text-sm" id="toc-links"></nav>
            </div>
          </aside>
        </div>
        <div class="h-32"></div>
      </article>
    </div>
  `;

  // Add lightbox on hero
  const hero = root.querySelector('img[data-hero]');
  if (hero && allImages.length) hero.addEventListener('click', () => openLightbox(allImages, 0));

  // Back button floating logic (same as showcase)
  const backBtn = document.getElementById('back-button');
  const sentinel = document.getElementById('back-sentinel');
  if (backBtn && sentinel) {
    const io = new IntersectionObserver(([entry]) => {
      if (window.innerWidth < 768) {
        backBtn.classList.add('back-floating');
        return;
      }
      if (!entry.isIntersecting) {
        backBtn.classList.add('back-floating');
      } else {
        backBtn.classList.remove('back-floating');
      }
    }, { threshold: 0 });
    io.observe(sentinel);

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        backBtn.classList.add('back-floating');
      }
    });
  }

  // Build TOC from present chapters
  const toc = document.getElementById('toc-links');
  if (toc) {
    const sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(sec => ['overview','background','empathize','desk-research','user-interview','ideate','prototype','final-result','reflections'].includes(sec.id));
    toc.innerHTML = sections.map(sec => `<a href="#${sec.id}" data-id="${sec.id}" class="py-1 text-zinc-600 hover:text-black">${sec.querySelector('h2')?.textContent || sec.id}</a>`).join('');

    // Smooth scroll
    toc.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-id]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('data-id');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Active link highlight via IntersectionObserver
    const byId = Object.fromEntries([...toc.querySelectorAll('a[data-id]')].map(a => [a.getAttribute('data-id'), a]));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = byId[id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(byId).forEach(el => el.classList.remove('text-black','font-medium'));
          link.classList.add('text-black','font-medium');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });
    sections.forEach(sec => obs.observe(sec));
  }

  // Click handlers for gallery thumbnails (if any)
  document.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
      openLightbox(allImages, idx);
    });
  });
}

function renderBlogsList(list) {
  const el = document.getElementById('blogs-list');
  if (!el) return;
  el.innerHTML = list.map(blogRowHTML).join('');
}

function uniqueSortedBlogTags(items) {
  const set = new Set();
  items.forEach(i => (i.tags || []).forEach(t => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function renderBlogFilters(items) {
  const c = document.getElementById('blogs-filters');
  if (!c) return;
  const tags = uniqueSortedBlogTags(items);
  const state = { active: 'ALL' };
  const paint = () => {
    const chip = (label, selected = false) => `
      <button type="button" data-tag="${label}" aria-pressed="${selected ? 'true' : 'false'}"
        class="rounded-full px-3 py-1 text-sm transition-colors border border-zinc-300/60 hover:bg-black/5 ${selected ? 'bg-black text-white border-black' : 'bg-white/70 text-zinc-700'}">
        ${label}
      </button>`;
    c.innerHTML = [chip('ALL', state.active === 'ALL'), ...tags.map(t => chip(t, state.active === t))].join('');
  };
  paint();
  c.onclick = (e) => {
    const btn = e.target.closest('button[data-tag]');
    if (!btn) return;
    state.active = btn.getAttribute('data-tag');
    const filtered = state.active === 'ALL' ? items.slice() : items.filter(i => (i.tags || []).includes(state.active));
    renderBlogsList(filtered);
    paint();
  };
}

async function loadBlogsAndRender() {
  const listEl = document.getElementById('blogs-list');
  if (!listEl) return;
  // Be permissive with params; avoid sort keys that may be rejected by Builder when fields contain spaces
  const raw = await fetchBuilder('blogs', { limit: 100, includeUnpublished: true });
  console.log('[blogs raw]', raw);
  const normalized = raw.map(normalizeBlog).sort((a, b) => (new Date(b.date || 0)) - (new Date(a.date || 0)));
  if (!normalized.length) {
    listEl.innerHTML = `<div class="px-6 py-8 text-zinc-600 space-y-2">
      <p>No blog posts found.</p>
      <ul class="list-disc pl-5 text-sm">
        <li>Make sure your entry is <strong>Published</strong> in Builder (not a Draft).</li>
        <li>Confirm the model name is <code>blogs</code> and the model ID matches.</li>
        <li>Fields used: <em>Thumbnail</em>, <em>Blog title</em>, <em>Blog description</em>, <em>Blog date</em>, <em>Blog tags</em>.</li>
      </ul>
    </div>`;
    return;
  }
  renderBlogFilters(normalized);
  renderBlogsList(normalized);
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
  return p.slug ? `<a href="showcase.html?slug=${encodeURIComponent(p.slug)}" class="block">${card}</a>` : card;
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
    STATE.filtered = (tag === 'ALL') ? STATE.all.slice() : STATE.all.filter(i => (i.tags || []).includes(tag));
    renderGrid(STATE.filtered);
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

function initConnectPageAccordion() {
  const root = document.getElementById('about-accordion');
  if (!root) return;

  const items = root.querySelectorAll('.acc-item');
  items.forEach((item) => {
    const btn = item.querySelector('[data-acc="toggle"]');
    const panel = item.querySelector('.acc-panel');
    const chev = item.querySelector('.chev');

    if (!btn || !panel) return;

    // ensure closed at start
    btn.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';

    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
      if (chev) chev.style.transform = 'rotate(0deg)';
      panel.style.transition = 'max-height .28s ease';
    };
    const open = () => {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      if (chev) chev.style.transform = 'rotate(90deg)';
      panel.style.transition = 'max-height .28s ease';
    };

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      isOpen ? close() : open();
    });

    // keep height correct on resize if open
    window.addEventListener('resize', () => {
      if (item.classList.contains('open')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
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

  const allImages = [p.thumbnail, ...(p.otherImages || [])].filter(Boolean);
  const rest = (p.otherImages || []);

  // Create gallery layout based on number of other images
  let galleryHtml = '';
  
  if (rest.length === 1) {
    // Single image layout - just show one image full width
    galleryHtml = `
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <button data-idx="1" class="relative block w-full aspect-square">
            <img src="${rest[0]}" alt="Project image" class="block w-full h-full object-cover"/>
          </button>
        </div>
      </section>
    `;
  } else if (rest.length >= 2) {
    // Multiple images layout - big image + smaller ones
    const bigImage = `
      <button data-idx="1" class="relative block w-full aspect-square overflow-hidden md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
        <img src="${rest[0]}" alt="Project image" class="block w-full h-full object-cover"/>
      </button>
    `;

    const stackedImages = rest.slice(1, 4).map((url, i) => {
      const idx = i + 2;
      const isFirst = i === 0;
      const isLast = i === 2 || i === rest.slice(1, 4).length - 1;
      const roundedClass = isFirst ? 'md:rounded-tr-xl' : (isLast ? 'md:rounded-br-xl' : '');
      const extra = (i === 2 && rest.length > 4) ? `<div class="absolute inset-0 bg-black/60 text-white grid place-items-center text-2xl font-medium">+${rest.length - 4}</div>` : '';
      return `
        <button data-idx="${idx}" class="relative block w-full aspect-square overflow-hidden ${roundedClass}">
          <img src="${url}" alt="Project image" class="block w-full h-full object-cover"/>
          ${extra}
        </button>
      `;
    }).join('');

    galleryHtml = `
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <div class="hidden md:grid md:grid-cols-[3fr_1fr] md:gap-0">
            <div>${bigImage}</div>
            <div class="grid grid-rows-3 md:gap-0">${stackedImages}</div>
          </div>
          <div class="md:hidden">
            ${bigImage}
            <div class="grid grid-cols-3 gap-1 mt-1">${stackedImages}</div>
          </div>
        </div>
      </section>
    `;
  }

  root.innerHTML = `
    <div class="min-h-screen pb-48 md:pb-32">
      ${p.thumbnail ? `
        <div class="w-full overflow-hidden">
          <img data-hero src="${p.thumbnail}" alt="${p.title}" class="block w-full object-cover object-center cursor-pointer" style="max-height:200px;" />
        </div>
      ` : ''}

      <article class="mx-auto w-full md:max-w-[900px] px-4 md:px-6 lg:px-0 space-y-6 mt-6 pt-6 md:pt-12 pb-24">
        <div id="back-sentinel" class="hidden md:block h-0"></div>
        <header class="space-y-3">
          <a href="/projects.html" id="back-button"
             class="fixed top-4 left-4 z-50 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow md:static md:bg-transparent md:shadow-none md:text-zinc-500 md:hover:underline transition-colors">
            <span class="md:hidden">&larr; Back</span>
            <span class="hidden md:inline">&larr; Back to Projects</span>
          </a>
          <h1 class="text-3xl md:text-4xl font-semibold">${p.title}</h1>
          ${p.description ? `<p class="text-zinc-600 text-lg leading-relaxed">${p.description}</p>` : ''}
          <div class="flex flex-wrap gap-2">${tagsHtml}</div>
          ${dateText ? `<div class="flex items-center gap-2 text-zinc-400 text-sm">${svgIcon('calendar')}<span>${dateText}</span></div>` : ''}
        </header>

        ${galleryHtml}

        ${p.description ? `<section class="prose max-w-none mt-8 mb-24"></section>` : ''}
        
        <!-- Extra spacer to ensure scrolling works -->
        <div class="h-32"></div>
      </article>
    </div>
  `;

  const backBtn = document.getElementById('back-button');
  const sentinel = document.getElementById('back-sentinel');
  if (backBtn && sentinel) {
    const io = new IntersectionObserver(([entry]) => {
      if (window.innerWidth < 768) {
        // mobile: always floating
        backBtn.classList.add('back-floating');
        return;
      }
      if (!entry.isIntersecting) {
        backBtn.classList.add('back-floating');
      } else {
        backBtn.classList.remove('back-floating');
      }
    }, { threshold: 0 });
    io.observe(sentinel);

    // keep state correct on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        backBtn.classList.add('back-floating');
      }
    });
  }

  // Add click handlers for gallery images
  root.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
      openLightbox(allImages, idx);
    });
  });

  // Add click handler for hero image
  const hero = root.querySelector('img[data-hero]');
  if (hero) hero.addEventListener('click', () => openLightbox(allImages, 0));
}

// Inject back button floating style
const style = document.createElement('style');
style.textContent = `
  #back-button.back-floating {
    position: fixed !important;
    top: 1rem;
    left: 1rem;
    background: #ffffff;
    color: #000 !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    border-radius: 9999px;
    padding: 0.375rem 0.75rem;
  }
  html { scroll-behavior: smooth; }
  /* Extra bottom margin for footer on mobile, so it clears the fixed bottom nav */
  @media (max-width: 768px) {
    footer {
      margin-bottom: calc(10rem + env(safe-area-inset-bottom));
    }
  }
  /* Additional bottom margin for footer on desktop */
  @media (min-width: 769px) {
    footer {
      margin-bottom: 4rem;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  renderGlobalNav();
  initConnectPageAccordion();
  if (document.getElementById('projects-grid-3col')) {
    loadProjectsAndRender().catch(err => {
      console.error('[Builder projects] failed:', err);
      const el = document.getElementById('projects-grid-3col');
      if (el) el.innerHTML = `<p class="text-sm text-red-600">Failed to load projects.</p>`;
    });
  }
  loadProjectDetail();
  loadBlogsAndRender();
  loadBlogDetail();
});

// Inject footer
document.addEventListener("DOMContentLoaded", function () {
  const footer = `
    <footer class="w-full border-t border-zinc-200 mt-12">
      <div class="mx-auto w-full max-w-[1100px] px-6 sm:px-8 md:px-12 lg:px-24 xl:px-28 2xl:px-32 py-6 md:py-8">
        <p class="text-lg md:text-xl text-black mb-4">
          I'm available to chat and collaborate
        </p>
        <nav aria-label="Connect links" class="flex flex-wrap gap-4 text-base md:text-lg text-zinc-500">
          <a href="mailto:hello@example.com"
             class="underline-offset-4 hover:underline hover:text-black">Email</a>
          <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener"
             class="underline-offset-4 hover:underline hover:text-black">Resume</a>
          <a href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noopener"
             class="underline-offset-4 hover:underline hover:text-black">LinkedIn</a>
          <a href="https://github.com/your-handle" target="_blank" rel="noopener"
             class="underline-offset-4 hover:underline hover:text-black">GitHub</a>
          <a href="https://www.threads.net/@your-handle" target="_blank" rel="noopener"
             class="underline-offset-4 hover:underline hover:text-black">Threads</a>
        </nav>
      </div>
    </footer>
  `;

  // Append footer to body
  document.body.insertAdjacentHTML("beforeend", footer);
});