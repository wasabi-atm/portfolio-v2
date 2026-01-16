// ==================== Global Navigation Renderer ====================
const NAV_ITEMS = [
  { href: '/', label: 'Projects', active: true },
  { href: 'connect.html', label: 'Why Hire Me', active: false },
  { href: 'blog/', label: 'Blog', active: false }
];

function currentFilename() {
  try {
    const path = (location.pathname || '/').replace(/\/+$/, ''); // strip trailing slashes
    const segs = path.split('/').filter(Boolean);
    if (segs.length === 0) return 'index.html';

    // Map clean URLs to their source HTML files
    const first = segs[0];
    if (first === 'blog') return 'blog.html'; // Treat /blog/* as blog.html context
    if (first === 'project') return 'project.html';
    if (first === 'connect') return 'connect.html';
    if (first === 'showcase') return 'showcase.html';
    if (first === 'carte') return 'carte.html';

    const last = segs[segs.length - 1];
    if (last && last.includes('.')) return last;
    return 'index.html';
  } catch {
    return 'index.html';
  }
}

// ==================== Sidebar Renderer ====================
function renderSidebar() {
  const mount = document.getElementById('sidebar-root');
  if (!mount) return;

  // Calculate active states
  const filename = currentFilename();
  // If we are in /blog/ folder, filename might be 'blog.html' or 'article.html' based on currentFilename() logic
  const isConnect = filename === 'connect.html';
  const isBlog = filename === 'blog.html' || filename === 'article.html';
  const isHome = !isConnect && !isBlog && filename === 'index.html';

  const inBlogDir = location.pathname.includes('/blog/');

  const resolveLink = (target) => {
    if (inBlogDir) {
      if (target === 'index.html') return '../index.html';
      if (target === 'connect.html') return '../connect.html';
      if (target === 'blog/') return 'index.html'; // link to blog index while in blog dir
    }
    return target;
  };

  const baseLinkClass = "block w-fit px-6 py-2 text-lg font-medium transition-colors rounded-full";
  const activeClass = "bg-black text-white dark:bg-white dark:text-black";
  const inactiveClass = "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white";

  const homeClass = `${baseLinkClass} ${isHome ? activeClass : inactiveClass}`;
  const aboutClass = `${baseLinkClass} ${isConnect ? activeClass : inactiveClass}`;
  const blogClass = `${baseLinkClass} ${isBlog ? activeClass : inactiveClass}`;

  // Mobile menu classes
  const mobileBaseClass = "block w-full text-center py-4 rounded-full text-2xl font-medium transition-colors";
  const mobileActive = "bg-black text-white dark:bg-white dark:text-black";
  const mobileInactive = "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900";

  const mHomeClass = `${mobileBaseClass} ${isHome ? mobileActive : mobileInactive}`;
  const mAboutClass = `${mobileBaseClass} ${isConnect ? mobileActive : mobileInactive}`;
  const mBlogClass = `${mobileBaseClass} ${isBlog ? mobileActive : mobileInactive}`;

  // Shared Socials HTML generator
  const renderSocials = (isMobileFooter = false) => {
    const containerClass = isMobileFooter
      ? 'px-6 py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-10'
      : 'mt-12 space-y-8';

    const iconSize = isMobileFooter ? 'h-8' : 'h-6';
    const linkClass = isMobileFooter
      ? 'p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity dark:invert'
      : 'opacity-40 hover:opacity-100 transition-opacity dark:invert';

    const textClass = isMobileFooter
      ? 'text-base font-medium text-zinc-500 dark:text-zinc-400 mb-4'
      : 'text-sm text-zinc-500 dark:text-zinc-400 mb-3';

    const blogTextClass = isMobileFooter ? 'text-sm' : 'text-xs';
    const arrowSize = isMobileFooter ? 'w-4 h-4' : 'w-3 h-3';

    // Fix asset paths if in blog dir
    const assetPath = (path) => inBlogDir ? `../${path}` : path;

    return `
    <div class="${containerClass}">
        <div class="flex gap-8 ${blogTextClass} font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
          <a href="https://medium.com/@wirawibisana" target="_blank" rel="noopener" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Medium <img src="${assetPath('assets/Sidebar Icons/Arrow Up Icon.svg')}" class="${arrowSize} dark:invert"></a>
          <a href="https://drive.google.com/uc?export=download&id=1yYLOBPcRKCmqCmS25Kql7Hf--xY9Ep_L" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Resume <img src="${assetPath('assets/Sidebar Icons/Arrow Up Icon.svg')}" class="${arrowSize} dark:invert"></a>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <div>
          <p class="${textClass}">I post videos about design</p>
          <div class="flex gap-6">
            <a href="https://www.instagram.com/wira.wibisana/reels/" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Instagram SVG Icon.svg')}" class="${iconSize} w-auto"></a>
            <a href="https://www.youtube.com/@wiraa.wibisana7777" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/YouTube SVG Icons (1).svg')}" class="${iconSize} w-auto"></a>
            <a href="https://www.tiktok.com/@wira.wibisana" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Tiktok SVG Icons (1).svg')}" class="${iconSize} w-auto"></a>
          </div>
        </div>

        <div>
          <p class="${textClass}">Contact me here!</p>
          <div class="flex gap-6">
            <a href="https://linkedin.com/in/wira29" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/LinkedIn SVG Icon.svg')}" class="${iconSize} w-auto"></a>
            <a href="mailto:atmanawiera@gmail.com" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Mail SVG Icon (1).svg')}" class="${iconSize} w-auto"></a>
          </div>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <button id="${isMobileFooter ? 'theme-toggle-mobile' : 'theme-toggle'}" class="opacity-40 hover:opacity-100 transition-opacity p-2 -m-2">
          <img src="${assetPath('assets/Sidebar Icons/Moon Stars Icon.svg')}" class="${iconSize} w-6 dark:hidden">
          <img src="${assetPath('assets/Sidebar Icons/Sun SVG Icon.svg')}" class="${iconSize} w-6 hidden dark:block invert">
        </button>
      </div>
  `;
  };

  mount.innerHTML = `
    <!-- Desktop Sidebar (Hidden on Mobile) -->
    <aside class="hidden lg:flex fixed top-0 left-0 w-[348px] h-screen bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col p-12 overflow-y-auto z-50 transition-colors duration-300">
      <!-- Header -->
      <a href="${resolveLink('index.html')}" class="mb-12 block group">
        <h1 class="text-3xl font-semibold text-black dark:text-white tracking-tight mb-2 group-hover:opacity-70 transition-opacity">Wira Wibisana</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Product Designer</p>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Based in Bali</p>
      </a>

      <hr class="border-zinc-200 dark:border-zinc-800 mb-12">

      <!-- Nav -->
      <nav class="space-y-4 flex-1">
        <a href="${resolveLink('index.html')}" class="${homeClass}">Projects</a>
        <a href="${resolveLink('connect.html')}" class="${aboutClass}">Why Hire Me?</a>
        <a href="${resolveLink('blog/')}" class="${blogClass}">Blog & Case Studies</a>
      </nav>

      <!-- Bottom Details (Desktop) -->
      ${renderSocials(false)}
    </aside>

    <!-- Mobile Top Bar (Hidden on Desktop) -->
    <header class="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[60] px-6 py-4 flex justify-between items-center transition-colors">
      <a href="${resolveLink('index.html')}" class="font-semibold text-lg text-black dark:text-white">Wira Wibisana</a>
      <button id="mobile-menu-btn" class="p-2 -mr-2 text-black dark:text-white focus:outline-none">
        <!-- Menu Icon -->
        <svg id="icon-menu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <!-- Close Icon (Hidden) -->
        <svg id="icon-close" class="hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </header>

    <!-- Mobile Menu Dropdown (Hugs content) -->
    <div id="mobile-menu-overlay" class="lg:hidden fixed top-[69px] left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[55] hidden flex-col p-6 space-y-4 transition-all shadow-xl">
       <nav class="space-y-2 flex flex-col w-full">
        <a href="${resolveLink('index.html')}" class="${mHomeClass}">Projects</a>
        <a href="${resolveLink('connect.html')}" class="${mAboutClass}">Why Hire Me?</a>
        <a href="${resolveLink('blog/')}" class="${mBlogClass}">Blog & Case Studies</a>
      </nav>
    </div>
  `;

  // Render Mobile Footer into specific root
  const mobileFooterRoot = document.getElementById('mobile-footer-root');
  if (mobileFooterRoot) {
    mobileFooterRoot.innerHTML = renderSocials(true);
  }

  // --- Theme Toggle Logic (Shared) ---
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    } catch (e) { }
  };

  // Bind to Desktop Toggle
  const deskToggle = document.getElementById('theme-toggle');
  if (deskToggle) deskToggle.addEventListener('click', toggleTheme);

  // Bind to Mobile Toggle
  const mobToggle = document.getElementById('theme-toggle-mobile');
  if (mobToggle) mobToggle.addEventListener('click', toggleTheme);

  // Initial Check
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // --- Mobile Menu Logic ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = !menuOverlay.classList.contains('hidden');
      if (isExpanded) {
        // Close
        menuOverlay.classList.add('hidden');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else {
        // Open
        menuOverlay.classList.remove('hidden');
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });
  }

  initProjectModal();
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  const openModal = (e) => {
    e.preventDefault();
    const link = e.currentTarget;
    if (link.dataset.title) {
      const titleEl = document.getElementById('modal-title');
      if (titleEl) titleEl.textContent = link.dataset.title;
    }

    // Update Modal Content (Videos or Images)
    const mediaSlots = [
      { idBase: 'modal-iframe-main', idVideo: 'modal-video-main', idImg: 'modal-img-main', src: link.getAttribute('data-video-main') },
      { idBase: 'modal-iframe-1', idVideo: 'modal-video-1', idImg: 'modal-img-1', src: link.getAttribute('data-video-1') },
      { idBase: 'modal-iframe-2', idVideo: 'modal-video-2', idImg: 'modal-img-2', src: link.getAttribute('data-video-2') },
      { idBase: 'modal-iframe-3', idVideo: 'modal-video-3', idImg: 'modal-img-3', src: link.getAttribute('data-video-3') },
      { idBase: 'modal-iframe-4', idVideo: 'modal-video-4', idImg: 'modal-img-4', src: link.getAttribute('data-video-4') },
    ];

    mediaSlots.forEach(slot => {
      const vidEl = document.getElementById(slot.idVideo);
      const imgEl = document.getElementById(slot.idImg);

      let source = slot.src;

      // Fallback defaults if source is missing (Clamby defaults)
      if (!source) {
        if (slot.idVideo === 'modal-video-main') source = 'assets/Clamby/Clamby Achievement.webm';
        if (slot.idVideo === 'modal-video-1') source = 'assets/Clamby/Clamby Data 1.webm';
        if (slot.idVideo === 'modal-video-2') source = 'assets/Clamby/Clamby Data 2.webm';
        if (slot.idVideo === 'modal-video-3') source = 'assets/Clamby/Clamby Data 3.webm';
        if (slot.idVideo === 'modal-video-4') source = 'assets/Clamby/Clamby Data 4.webm';
      }

      if (source) {
        // Check if image
        const isImage = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(source);

        if (isImage) {
          // Show Image, Hide Video
          if (vidEl) {
            vidEl.classList.add('hidden');
            vidEl.pause();
          }
          if (imgEl) {
            imgEl.src = source;
            imgEl.classList.remove('hidden');
          }
        } else {
          // Show Video, Hide Image
          if (imgEl) {
            imgEl.classList.add('hidden');
          }
          if (vidEl) {
            vidEl.classList.remove('hidden');
            // Only update src if different to avoid flicker
            if (!vidEl.src.endsWith(source)) {
              vidEl.src = source;
              vidEl.play().catch(() => { });
            } else {
              // Ensure playing if it was paused
              vidEl.play().catch(() => { });
            }
          }
        }
      }
    });

    // Update Website Button
    const websiteBtn = document.getElementById('modal-website-btn');
    const websiteLabel = document.getElementById('modal-website-label');
    const linkUrl = link.getAttribute('data-link');
    const linkLabel = link.getAttribute('data-link-label') || 'Website';

    if (websiteBtn) {
      if (linkUrl) {
        websiteBtn.href = linkUrl;
        websiteBtn.classList.remove('hidden');
        websiteBtn.style.display = 'flex'; // Ensure flex display is restored
      } else {
        websiteBtn.classList.add('hidden');
        websiteBtn.style.display = 'none'; // Explicitly hide
      }
    }

    if (websiteLabel) {
      websiteLabel.textContent = linkLabel;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock text scroll
  };

  const closeModal = () => {
    modal.classList.add('hidden');

    // Pause all videos when closing
    const vids = modal.querySelectorAll('video');
    vids.forEach(v => v.pause());

    document.body.style.overflow = ''; // Restore scroll
  };

  // Attach to all project links in index.html
  // Identifying via the specific classes used in the grid
  const projectLinks = document.querySelectorAll('a.group[href^="http"], a.group[href^="/project"]');
  projectLinks.forEach(link => {
    link.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// (Removed navigateToBlogsWithFilter and initCaseStudiesShortcut)

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
  // Slug fallbacks
  const slug = d.slug || d.Slug || d.url || d.Url || '';

  // Tags can be an array of strings or objects
  let tags = d['Blog tags'] || d.blogTags || d.tags || [];
  if (Array.isArray(tags)) {
    tags = tags
      .map(t => (typeof t === 'string' ? t : (t?.value || t?.name || '')))
      .map(s => (s || '').trim())
      .filter(Boolean);
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

  return { id: entry?.id, title, description, date, tags, thumbnail: thumb, minutes, links, slug };
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

// Helpers to render richer article content from plain text inputs
function normalizeArticleHtml(input) {
  let s = (input || '').toString();
  if (!s) return '';

  // 1) Unescape specifically-escaped <img> tags
  s = s.replace(/&lt;(img\b[^>]*?)\/?&gt;/gi, '<$1>');
  s = s.replace(/&lt;(img\b[^>]*?)\s*\/?&gt;/gi, '<$1>');

  // 2) Convert plain text to simple HTML blocks and images when no tags present
  const hasHtml = /<[^>]+>/.test(s);
  if (!hasHtml) {
    // Markdown image: ![alt](url)
    s = s.replace(/!\[(.*?)\]\((https?:[^\s)]+)\)/g, (_m, alt, url) => `<img src="${url}" alt="${alt || ''}">`);
    // Bare image URLs -> <img>
    s = s.replace(/(https?:\/\/[^\s)]+\.(?:png|jpe?g|gif|webp|svg|avif)(?:[?][^\s)]+)?)/gi, (m) => `<img src="${m}" alt="">`);
    // Paragraphs
    const parts = s.split(/\n{2,}/).map(t => t.trim()).filter(Boolean);
    if (parts.length) s = parts.map(p => `<p class="dark:text-zinc-300">${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }

  // 3) Editorial Typography & Components

  // Inject CSS for lists (Scoped to article content ideally, but inline works)
  s = `
    <style>
      .editorial-ordered { counter-reset: ed-counter; list-style: none !important; padding: 0; margin: 2.5rem 0; }
      .editorial-ordered > li { position: relative; padding-left: 3.5rem; margin-bottom: 1.5rem; }
      .editorial-ordered > li::before {
        counter-increment: ed-counter;
        content: counter(ed-counter, decimal-leading-zero) ".";
        position: absolute; left: 0; top: 0.1em;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-weight: 600; color: #52525b; font-size: 0.95em;
      }
      /* Nested Unordered List (Editorial) - Aligned with text */
      .editorial-nested { margin-top: 1rem; list-style: none !important; padding-left: 0; }
      .editorial-nested > li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; }
      .editorial-nested > li::before {
        content: ""; position: absolute; left: 4px; top: 0.6em;
        width: 6px; height: 6px; border: 1.5px solid #d4d4d8; border-radius: 50%;
      }
      /* Dark mode overrides */
      html.dark .editorial-ordered > li::before { color: #a1a1aa; }
      html.dark .editorial-nested > li::before { border-color: #71717a; }
    </style>
  ` + s;

  let h1Count = 0;
  // H1 -> Section Marker (Small, Technical, Numbered)
  s = s.replace(/<h1\b[^>]*>(.*?)<\/h1>/gi, (_, content) => {
    h1Count++;
    const num = h1Count.toString().padStart(2, '0');
    return `<h1 class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mt-16 mb-3 border-none select-none">${num} / ${content}</h1>`;
  });

  // H2 -> Display Headline (Massive, Bold, Tight)
  s = s.replace(/<h2\b[^>]*>(.*?)<\/h2>/gi, (_, content) => {
    return `<h2 class="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-8 mt-2">${content}</h2>`;
  });

  // OL -> Editorial Ordered (+ Protect Nested ULs)
  // We process OLs first to tag any nested ULs so they aren't turned into cards.
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    // Tag nested ULs
    const processedInner = inner.replace(/<ul\b/gi, '<ul class="editorial-nested"');
    return `<ol class="editorial-ordered not-prose">${processedInner}</ol>`;
  });

  // UL -> Insights Grid (Feature Highlights - Bento Style)
  // Only match ULs that do NOT have the 'editorial-nested' class.
  s = s.replace(/<ul(?![^>]*class=["']editorial-nested["'])\b[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    // Process LIs inside
    const gridItems = inner.replace(/<li\b[^>]*>(.*?)<\/li>/gi, (_, itemContent) => {
      return `
        <div class="group relative flex items-center bg-[#F5F5F7] dark:bg-zinc-800 rounded-2xl p-5 overflow-hidden transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <!-- Accent Line (Inside) -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          <!-- Text -->
          <div class="text-base font-medium text-zinc-900 dark:text-zinc-100 leading-snug pl-3">
            ${itemContent.trim()}
          </div>
        </div>
      `;
    });
    return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">${gridItems}</div>`;
  });

  // 4) Enforce reasonable image sizing
  const injectImgClasses = (attrs = '') => {
    const needed = 'mx-auto block max-w-full h-auto md:max-h-[80vh] object-contain rounded-lg shadow-sm';
    const clsRe = /\bclass\s*=\s*"([^"]*)"/i;
    const m = attrs.match(clsRe);
    if (m) {
      const current = m[1] || '';
      const merged = `${current} ${needed}`.trim();
      return attrs.replace(clsRe, `class="${merged}"`);
    }
    return `${attrs} class="${needed}"`;
  };
  s = s.replace(/<img\b([^>]*)>/gi, (_m, attrs) => `<img ${injectImgClasses((attrs || '').trim())}>`);

  // Final pass: Ensure all <p> tags have dark mode text class (if not already present)
  s = s.replace(/<p((?![^>]*dark:text-)[^>]*)>/gi, (match, attrs) => {
    if (/class="/.test(attrs)) {
      return `<p${attrs.replace('class="', 'class="dark:text-zinc-300 ')}>`;
    }
    return `<p class="dark:text-zinc-300"${attrs}>`;
  });

  return s;
}

function blogRowHTML(b) {
  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  function typeBadgeForTag(tag) {
    const t = (tag || '').toLowerCase();
    if (t.includes('case')) return 'assets/caseStudyGradient.jpeg'; // Note: Paths might need adjustment if in subdir, but let's assume assets are root relative or base tag handled? No base tag.
    // Ideally assets paths should be absolute /assets/... or context aware.
    // For now, let's assume /assets/ works if we use leading slash.
    return 'assets/BG%20Placeholder.avif';
  }

  // Fix asset paths to be relative so they work on file:// and subdirs
  const badge = (tag) => {
    const t = (tag || '').toLowerCase();
    const prefix = deep ? '../assets' : 'assets';
    if (t.includes('case')) return `${prefix}/caseStudyGradient.jpeg`;
    return `${prefix}/BG%20Placeholder.avif`;
  };

  const author = `<strong>Wira Wibisana</strong> in <strong>${firstTag}</strong>`;
  const dateText = formatBlogDate(b.date);
  const dateTextShort = formatBlogDateShort(b.date);
  const hasThumb = Boolean(b.thumbnail);

  const thumb = hasThumb ? `
    <div class="relative z-10 shrink-0 w-24 h-24 md:w-[320px] md:h-40">
      <img src="${b.thumbnail}" alt="${b.title}" loading="lazy" data-thumb
           class="block w-24 h-24 md:w-[320px] md:h-40 object-cover rounded-md"/>
    </div>
  ` : '';

  // Determine path to article based on where we are
  const here = currentFilename();
  const deep = here === 'blog.html' || here === 'article.html';
  // If we are in blog folder, article is sibling: 'article.html'
  // If we are in root, article is in blog folder: 'blog/article.html'
  // BUT cleanest is using root relative '/blog/article.html' IF on a server.
  // For 'Go Live' (simple file server), relative is safer.
  const articlePath = deep ? 'article.html' : 'blog/article.html';

  const q = b.slug ? `slug=${encodeURIComponent(b.slug)}` : `id=${encodeURIComponent(b.id)}`;
  return `
    <article class="py-3 md:py-6">
      <a href="${articlePath}?${q}" class="group relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 rounded-xl px-3 py-2 md:px-3 md:py-3 transition-colors duration-200 hover:bg-zinc-200/60 hover:ring-1 hover:ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:bg-zinc-200/50" data-card="blog-row">
        <div class="relative z-10 min-w-0 space-y-1 md:space-y-2">
          <p class="text-xs md:text-sm text-zinc-600">
            ${author}
            <img src="${badge(firstTag)}" alt="${firstTag} type"
                 class="inline-block align-middle h-[1em] w-[1em] object-cover"
                 loading="lazy" decoding="async"/>
          </p>

          <!-- Tight title on mobile; larger on desktop; clamp to prevent tall cards -->
          <h2 class="text-base sm:text-lg md:text-[26px] leading-relaxed text-black font-bold line-clamp-2" data-title>
            ${b.title}
          </h2>

          <!-- Hide description on mobile; show on md+; dynamically clamped to thumbnail height -->
          ${b.description ? `<p class="hidden md:block text-zinc-600" data-desc>${b.description}</p>` : ''}

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

// ==================== HOME: PINNED CASE STUDIES ====================
function isTruthyPinned(data) {
  if (!data || typeof data !== 'object') return false;
  const candidates = [
    data['is pinned'], data['Is pinned'], data['isPinned'], data['pinned'], data['Pinned']
  ];
  return candidates.some(v => {
    if (v === true || v === 1) return true;
    if (typeof v === 'string') {
      const t = v.trim().toLowerCase();
      return t === 'true' || t === '1' || t === 'yes' || t === 'on';
    }
    return false;
  });
}

function homeCaseStudyCardHTML(b) {
  const img = b.thumbnail
    ? `<img src="${b.thumbnail}" alt="${b.title}" data-thumb class="block w-full aspect-[16/10] md:aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"/>`
    : '';
  // Use relative path for local dev support
  const q = b.slug ? `slug=${encodeURIComponent(b.slug)}` : `id=${encodeURIComponent(b.id)}`;
  return `
    <a href="blog/article.html?${q}" aria-label="Read case study: ${b.title}"
       class="group h-full flex flex-col overflow-hidden rounded-2xl ring-1 ring-zinc-200/70 dark:ring-white/10 bg-white/60 dark:bg-zinc-900/40 hover:ring-zinc-300 dark:hover:ring-zinc-700 hover:bg-white dark:hover:bg-zinc-800 transition-shadow shadow-sm hover:shadow-md" data-card="case-card">
      <div class="relative overflow-hidden">${img}</div>
      <div class="p-3 md:p-4 flex-1 flex flex-col gap-2">
        <h3 class="text-base md:text-lg leading-snug text-black dark:text-zinc-100 font-semibold line-clamp-2" data-title>${b.title}</h3>
        ${b.description ? `<p class="text-sm text-zinc-400 flex-1" data-desc>${b.description}</p>` : ''}
        <div class="text-xs text-zinc-500 mt-1 inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 opacity-70">
            <path d="M12 6v12"/>
            <path d="M12 6c-2.5-1.667-5-2-8-2v12c3 0 5.5.333 8 2"/>
            <path d="M12 6c2.5-1.667 5-2 8-2v12c-3 0-5.5.333-8 2"/>
          </svg>
          <span>${b.minutes} min read</span>
        </div>
      </div>
    </a>
  `;
}

async function loadHomePinnedCaseStudies() {
  const list = document.getElementById('home-pinned-grid');
  if (!list) return;
  // Skeleton placeholders (row style)
  const rowSkel = () => `
    <div class="py-3 md:py-6">
      <div class="relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 animate-pulse" aria-busy="true" aria-live="polite">
        <div class="min-w-0 space-y-2">
          <div class="h-3.5 bg-zinc-200 rounded w-40"></div>
          <div class="h-5 bg-zinc-200 rounded w-4/5"></div>
          <div class="h-3 bg-zinc-200 rounded w-2/3"></div>
        </div>
        <div class="block md:hidden w-24 h-24 bg-zinc-200 rounded-md"></div>
        <div class="hidden md:block w-[320px] h-40 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
    <hr class="border-zinc-200"/>
  `;
  list.innerHTML = rowSkel() + rowSkel() + rowSkel();
  list.style.minHeight = '240px';
  list.setAttribute('aria-busy', 'true');
  // Ensure skeleton paints at least once
  await new Promise(res => requestAnimationFrame(() => setTimeout(res, 150)));

  try {
    const raw = await fetchBuilder('blogs', { limit: 100, includeUnpublished: true });
    const pinned = raw.filter(r => isTruthyPinned(r?.data));
    // Sort newest first using explicit date fallbacks from the raw entry
    const getWhen = (entry) => {
      const d = entry?.data || {};
      return new Date(
        d['Blog date'] || d.blogDate || d.date || entry?.lastUpdated || entry?.firstPublished || 0
      ).getTime();
    };
    const sorted = pinned.sort((a, b) => getWhen(b) - getWhen(a));
    // Take at most 3 newest, normalize, and hide date on home
    const normalized = sorted.slice(0, 3).map(normalizeBlog).map(b => ({ ...b, date: '' }));
    if (!normalized.length) {
      list.innerHTML = '<p class="text-sm text-zinc-600">No featured case studies yet.</p>';
      return;
    }
    list.innerHTML = normalized.map(blogRowHTML).join('');
    applyDynamicDescClamps(list);
  } catch (e) {
    console.error('[Home pinned] fetch failed', e);
    list.innerHTML = '<p class="text-sm text-red-600">Failed to load featured case studies.</p>';
  } finally {
    list.style.minHeight = '';
    list.removeAttribute('aria-busy');
  }
}

// ==================== PROJECT DETAIL SUPPORT ====================
async function loadProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  let slug = params.get('slug');
  let id = params.get('id');
  if (!slug && !id) {
    try {
      const segs = (location.pathname || '').split('/').filter(Boolean);
      const idx = segs.findIndex(s => s === 'project');
      if (idx !== -1 && segs[idx + 1]) {
        slug = segs[idx + 1];
      }
    } catch { }
  }
  if (!slug && !id) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Missing <code>slug</code> in URL.</p>`;
    return;
  }

  // Try by slug first; fall back to id
  let rows = [];
  if (slug) {
    rows = await fetchBuilder('blogs', { limit: 1, 'query.data.slug': slug });
  }
  if ((!rows || !rows.length) && id) {
    rows = await fetchBuilder('blogs', { limit: 1, ids: id });
    if (!rows.length || rows[0]?.id !== id) {
      rows = await fetchBuilder('blogs', { limit: 1, 'query.id': id });
    }
    if (!rows.length || rows[0]?.id !== id) {
      const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
      rows = many.filter(r => r?.id === id);
    }
  }
  // Final fallback for slug: fetch many and match by slug in data
  if ((!rows || !rows.length) && slug) {
    try {
      const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
      const want = (slug || '').toString().trim().toLowerCase();
      rows = many.filter(r => {
        const s = (r?.data?.slug || r?.data?.Slug || '').toString().trim().toLowerCase();
        return s && s === want;
      });
    } catch { }
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
    ['overview', 'Overview'],
    ['background', 'Background'],
    ['empathize', 'Empathize'],
    ['desk-research', 'Desk research'],
    ['user-interview', 'User interview'],
    ['ideate', 'Ideate'],
    ['prototype', 'Prototype'],
    ['final-result', 'Final result'],
    ['reflections', 'Reflections']
  ];

  function chapterHtml(keyId, label, source) {
    if (!contentItem) return '';

    // Build robust key variants to match Builder fields regardless of casing/format
    const toCamel = (s = '') => s
      .toString()
      .toLowerCase()
      .replace(/[\s_-]+([a-z0-9])/g, (_m, c) => c.toUpperCase());
    const toPascal = (s = '') => {
      const c = toCamel(s);
      return c ? c[0].toUpperCase() + c.slice(1) : c;
    };

    const labelLower = (label || '').toString().toLowerCase();
    const fromLabelNoSpaces = (label || '').toString().replace(/\s+/g, '');
    const fromIdNoHyphen = (keyId || '').toString().replace(/[-_]+/g, ' ');

    const variants = [
      label,
      labelLower,
      fromLabelNoSpaces,
      // Common separators
      labelLower.replace(/\s+/g, '-'), // desk-research
      labelLower.replace(/\s+/g, '_'), // desk_research
      toCamel(label),                   // deskResearch
      toPascal(label),                  // DeskResearch
      // Also derive from the id to be safe
      keyId,
      fromIdNoHyphen,
      toCamel(fromIdNoHyphen),
      toPascal(fromIdNoHyphen),
      fromIdNoHyphen.replace(/\s+/g, ''),
      fromIdNoHyphen.replace(/\s+/g, '_'),
      fromIdNoHyphen.replace(/\s+/g, '-'),
    ].filter(Boolean);

    // Find first matching non-empty value, allowing rich-text objects
    let raw = '';
    for (const k of variants) {
      if (Object.prototype.hasOwnProperty.call(contentItem, k) && contentItem[k]) {
        raw = contentItem[k];
        break;
      }
    }
    if (!raw) return '';

    // Coerce to string if Builder returns a rich-text object
    let html = '';
    if (typeof raw === 'string') html = raw;
    else if (raw && typeof raw === 'object') html = raw.html || raw.text || raw.value || '';
    if (!html) return '';

    return `
      <section id="${keyId}" class="scroll-mt-24 pt-10 mt-10">
        <div class="my-8">
          <div class="w-2/3 border-b-2 border-black pb-1">
            <h2 class="text-left text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black">${label}</h2>
          </div>
        </div>
        <div class="prose max-w-none">${normalizeArticleHtml(html)}</div>
      </section>`;
  }

  const chaptersHtml = CHAPTERS.map(([id, label]) => chapterHtml(id, label)).filter(Boolean).join('');

  // Assemble final body:
  // - Add generous top spacing before raw Blog article content to separate from meta/date
  // - Then gallery (if any), then chapters
  const articleHtmlRaw = normalizeArticleHtml(htmlContent) || '';
  const articleHtml = articleHtmlRaw ? `<div class="pt-10 mt-8 md:pt-12 md:mt-10">${articleHtmlRaw}</div>` : '';
  const bodyHtml = `${articleHtml}${galleryHtml}${chaptersHtml}` || (b.description ? `<p>${b.description}</p>` : '<p></p>');

  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  function typeBadgeForTag(tag) {
    const t = (tag || '').toLowerCase();
    if (t.includes('case')) return 'assets/caseStudyGradient.jpeg';
    return 'assets/BG%20Placeholder.avif';
  }
  const author = `<strong>Wira Wibisana</strong> in <strong>${firstTag}</strong>
    <img src="${typeBadgeForTag(firstTag)}" alt="${firstTag} type" class="inline-block align-middle h-[1em] w-[1em] object-cover" loading="lazy" decoding="async"/>`;
  const dateLong = formatBlogDate(b.date);
  const dateShort = formatBlogDateShort(b.date);

  // Pull auxiliary fields from Builder (camelCase first)
  const safeText = (v) => {
    if (!v) return '';
    if (typeof v === 'string') return v.trim();
    if (typeof v === 'object') return (v.text || v.html || v.value || '').toString().trim();
    return '';
  };
  const myRole = safeText(d.myRole || d.role || d['My Role']);
  const team = safeText(d.team || d['Team']);
  const teamComp = safeText(d.teamComposition || d['Team Composition'] || d.TeamComposition);
  const timeline = safeText(d.timeline || d['Timeline']);
  // Skills: prefer list field `skills`. Items may have `skill1/2/3` or `Skill 1/2/3`,
  // and values may be hyphen/comma/newline-separated (e.g., "User Research - Figma - SwiftUI").
  const splitSkills = (s) => (s || '')
    .toString()
    .split(/\s*[-,]\s+|\n+/)
    .map(x => x.trim())
    .filter(Boolean);
  let skills = [];
  const skillsList = d.skills;
  if (Array.isArray(skillsList)) {
    skillsList.forEach(item => {
      if (!item) return;
      if (typeof item === 'string') {
        skills.push(...splitSkills(item));
        return;
      }
      if (typeof item === 'object') {
        const candidates = [
          safeText(item.skill1), safeText(item.skill2), safeText(item.skill3),
          safeText(item['Skill 1']), safeText(item['Skill 2']), safeText(item['Skill 3']),
          safeText(item.label || item.name || item.title || item.value || item.text)
        ].filter(Boolean);
        candidates.forEach(v => skills.push(...splitSkills(v)));
      }
    });
  } else if (skillsList && typeof skillsList === 'object') {
    ['skill1', 'skill2', 'skill3', 'Skill 1', 'Skill 2', 'Skill 3'].forEach(k => {
      const v = safeText(skillsList[k]);
      if (v) skills.push(...splitSkills(v));
    });
  }
  // Fallbacks to top-level fields
  if (!skills.length) {
    ['skill1', 'skill2', 'skill3', 'Skill 1', 'Skill 2', 'Skill 3'].forEach(k => {
      const v = safeText(d[k]);
      if (v) skills.push(...splitSkills(v));
    });
  }
  // Dedup preserve order
  const seenSkill = new Set();
  skills = skills.filter(s => { if (seenSkill.has(s.toLowerCase())) return false; seenSkill.add(s.toLowerCase()); return true; });
  function svgBrand(label) {
    const k = (label || '').toLowerCase();
    if (k.includes('github')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2c-3.3.8-4-1.4-4-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2.9-.2 1.8-.3 2.7-.3.9 0 1.8.1 2.7.3 2.2-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.4-5.3 5.8.4.3.7 1 .7 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5z"/></svg>`;
    }
    if (k.includes('figma')) {
      // Minimal, balanced 5-dot Figma mark in monochrome for clarity at small sizes
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><circle cx="9" cy="6" r="3"/><circle cx="15" cy="6" r="3"/><circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="9" cy="18" r="3"/></svg>`;
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
  const tagsHtml = (b.tags || []).map(t => `<span class="inline-flex items-center rounded-full border border-zinc-300/60 px-2 py-0.5 text-xs text-zinc-400">${t}</span>`).join(' ');

  // Assemble top hero image list for lightbox (thumbnail first)
  const allImages = [b.thumbnail, ...galleryImages].filter(Boolean);

  root.innerHTML = `
    <div class="min-h-screen pb-48 md:pb-32">
      <article class="mx-auto w-full max-w-[1100px] px-6 sm:px-8 md:px-12 lg:px-24 xl:px-28 2xl:px-32 mt-6 pt-24 md:pt-24 pb-24">
        <div id="back-sentinel" class="hidden md:block h-0"></div>
        <div>
          <div>
            <header class="space-y-3 relative">
              <a href="/" id="back-button" aria-label="Back to Home"
                 class="back-floating z-50 inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-black">
                <img src="assets/Chevron%20Icon.png" alt="" class="w-5 h-5" draggable="false"/>
              </a>
              <p class="text-sm text-zinc-400">${author}</p>
              <h1 class="text-3xl md:text-4xl font-semibold">${b.title}</h1>
              ${b.description ? `<div class="mb-1"><p class="text-zinc-400 text-lg leading-relaxed">${b.description}</p><div class="mt-2 w-1/4 border-b border-zinc-200/80"></div></div>` : ''}
              ${(myRole || team || timeline) ? `
                <div class="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  ${myRole ? `<div class="text-zinc-600 inline-flex items-center gap-1">${svgIcon('role', 'text-zinc-400')}<span class="text-zinc-400">My Role:</span> <span class="text-zinc-800">${myRole}</span></div>` : ''}
                  ${team ? `<div class="text-zinc-600 relative inline-flex items-center gap-1 group">
                    ${svgIcon('team', 'text-zinc-400')}<span class="text-zinc-400">Team:</span>
                    <span class="underline underline-offset-4 decoration-zinc-400 group-hover:decoration-black cursor-help text-zinc-800">${team}</span>
                    ${teamComp ? `<span role="tooltip" class="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[min(90vw,260px)] -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                      <span class="block rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 shadow-md">${teamComp}</span>
                    </span>` : ''}
                  </div>` : ''}
                  ${timeline ? `<div class="text-zinc-600 inline-flex items-center gap-1">${svgIcon('timeline', 'text-zinc-400')}<span class="text-zinc-400">Timeline:</span> <span class="text-zinc-800">${timeline}</span></div>` : ''}
                </div>
              ` : ''}
              ${skills && skills.length ? `<div class="mt-2 flex flex-wrap items-center gap-2">${svgIcon('skills', 'text-zinc-400')} ${skills.map(s => `<span class="inline-flex items-center rounded-full border border-zinc-300/70 bg-white/80 px-2 py-0.5 text-xs text-zinc-700">${s}</span>`).join(' ')}</div>` : ''}
              ${b.date ? `<div class="flex items-center gap-2 text-zinc-400 text-sm">${svgIcon('calendar')}<span class="md:hidden">${dateShort}</span><span class="hidden md:inline">${dateLong}</span></div>` : ''}
              ${linksPills ? `<div class="mt-1">${linksPills}</div>` : ''}
            </header>

            <section class="prose max-w-none mt-2">${bodyHtml}</section>
            
          </div>
          <aside class="hidden md:block">
            <div id="toc-floating">
              <p class="text-xs uppercase tracking-wide text-zinc-500 text-right pr-6">On this page</p>
              <nav class="flex flex-col text-sm items-end pr-6" id="toc-links"></nav>
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

  // Build TOC from chapters and, if present, H2 headings in Blog article content
  const toc = document.getElementById('toc-links');
  if (toc) {
    // Slugify helper to create stable ids from headings
    const slugify = (s) => (s || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z]+;|&#\d+;/gi, '-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';

    // Known chapter sections
    const chapterIds = ['overview', 'background', 'empathize', 'desk-research', 'user-interview', 'ideate', 'prototype', 'final-result', 'reflections'];
    const chapterSections = Array.from(document.querySelectorAll('section[id]')).filter(sec => chapterIds.includes(sec.id));

    // Headings from Blog article content (if any)
    const articleContainer = root.querySelector('section.prose');
    const headingEls = [];
    const rawArticle = (typeof d['Blog article'] === 'string' ? d['Blog article'] : (typeof d.blogArticle === 'string' ? d.blogArticle : ''));
    if (articleContainer && rawArticle) {
      const h2s = Array.from(articleContainer.querySelectorAll('h2'));
      const seen = new Set();
      h2s.forEach(h => {
        const text = h.textContent || 'section';
        let id = h.id || slugify(text);
        let suffix = 2;
        while (seen.has(id) || document.getElementById(id)) { id = `${id}-${suffix++}`; }
        seen.add(id);
        h.id = id;
        h.classList.add('scroll-mt-24');
        headingEls.push(h);
      });
    }

    // Paint combined TOC
    const entries = [
      ...chapterSections.map(sec => ({ id: sec.id, label: sec.querySelector('h2')?.textContent || sec.id })),
      ...headingEls.map(h => ({ id: h.id, label: h.textContent || h.id }))
    ];
    toc.innerHTML = entries.map(e => `<a href="#${e.id}" data-id="${e.id}" class="py-1 text-zinc-400 hover:text-black">${e.label}</a>`).join('');

    // Smooth scroll
    toc.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-id]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('data-id');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Active link highlight via IntersectionObserver (use explicit class for strong override)
    const byId = Object.fromEntries([...toc.querySelectorAll('a[data-id]')].map(a => [a.getAttribute('data-id'), a]));
    const observeTargets = [...chapterSections, ...headingEls];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = byId[id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(byId).forEach(el => el.classList.remove('toc-active'));
          link.classList.add('toc-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });
    observeTargets.forEach(t => obs.observe(t));
  }

  // Enable full-screen preview on any images within the article content
  const articleSection = root.querySelector('section.prose');
  if (articleSection) {
    const imgEls = Array.from(articleSection.querySelectorAll('img'));
    const imgSrcs = imgEls.map(img => img.getAttribute('src')).filter(Boolean);
    if (imgEls.length && imgSrcs.length) {
      imgEls.forEach((img, idx) => {
        img.classList.add('cursor-zoom-in');
        img.addEventListener('click', () => openLightbox(imgSrcs, idx));
      });
    }
  }

  // Back button: always fixed, aligned to article padding; match nav capsule height
  const backBtn = document.getElementById('back-button');
  if (backBtn) {
    backBtn.classList.add('back-floating');
    const syncBackSize = () => {
      try {
        const fs = document.getElementById('primary-nav') || document.getElementById('primary-nav-fallback');
        if (!fs) return;
        const h = Math.max(40, Math.round(fs.offsetHeight || fs.getBoundingClientRect().height));
        backBtn.style.width = h + 'px';
        backBtn.style.height = h + 'px';
      } catch { }
    };
    const syncBackLeft = () => {
      try {
        // Align left edge to the article text column (use first header text as anchor)
        const anchor = document.querySelector('#project-detail header h1')
          || document.querySelector('#project-detail header p')
          || document.querySelector('#project-detail article')
          || document.querySelector('#project-detail');
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        // Fixed positioning uses viewport; rect.left is viewport-relative
        backBtn.style.left = Math.max(8, Math.floor(rect.left)) + 'px';
      } catch { }
    };
    syncBackSize();
    syncBackLeft();
    const fs = document.getElementById('primary-nav') || document.getElementById('primary-nav-fallback');
    if (fs && window.ResizeObserver) {
      const ro = new ResizeObserver(syncBackSize);
      ro.observe(fs);
    }
    setTimeout(syncBackLeft, 250);
  }


  // Click handlers for gallery thumbnails (if any)
  document.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
      openLightbox(allImages, idx);
    });
  });

  // Add skeletons for embedded images inside article content
  try {
    root.querySelectorAll('.prose').forEach(enhanceArticleImages);
  } catch { }
}

// Wrap images with a skeleton placeholder until they load
function enhanceArticleImages(scope) {
  const imgs = scope.querySelectorAll('img');
  imgs.forEach((img) => {
    if (img.closest('.img-skel')) return; // already enhanced
    const wrap = document.createElement('div');
    wrap.className = 'img-skel loading';
    // Reserve height if the tag includes height attr; else fallback
    const hAttr = parseInt(img.getAttribute('height') || '', 10);
    if (Number.isFinite(hAttr) && hAttr > 0) {
      wrap.style.setProperty('--img-skel-h', `${hAttr}px`);
    } else {
      // Use current computed height if any; else fallback
      const ch = Math.round(img.getBoundingClientRect().height);
      if (ch) wrap.style.setProperty('--img-skel-h', `${ch}px`);
    }
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);

    const markLoaded = () => {
      wrap.classList.remove('loading');
      wrap.classList.add('loaded');
      wrap.style.removeProperty('--img-skel-h');
    };
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markLoaded, { once: true });
    }
  });
}

// (Removed renderBlogsList, uniqueSortedBlogTags, renderBlogFilters, loadBlogsAndRender)

// ==================== Dynamic multi-line clamp (bound to image height) ====================
function computeLineHeightPx(el) {
  const cs = getComputedStyle(el);
  let lh = cs.lineHeight;
  if (lh === 'normal' || !lh) {
    const fs = parseFloat(cs.fontSize) || 16;
    // Approximate "normal" line-height
    return Math.round(fs * 1.5);
  }
  const n = parseFloat(lh);
  return Number.isFinite(n) ? n : 20;
}

function clampDescForCard(card) {
  const img = card.querySelector('img[data-thumb]');
  const desc = card.querySelector('[data-desc]');
  const title = card.querySelector('[data-title]');
  if (!desc) return;
  const descCS = getComputedStyle(desc);
  if (descCS.display === 'none' || descCS.visibility === 'hidden') return;

  // Reset any previous inline clamp to measure correctly
  desc.style.webkitLineClamp = '';
  desc.style.display = '';

  let lines = Infinity;

  // If we have a thumbnail, compute available lines by image height
  if (img) {
    const imgH = img.getBoundingClientRect().height;
    if (imgH) {
      let remaining = imgH;
      if (title) {
        const titleCS = getComputedStyle(title);
        if (titleCS.display !== 'none' && titleCS.visibility !== 'hidden') {
          remaining -= title.getBoundingClientRect().height;
        }
      }
      const mt = parseFloat(descCS.marginTop) || 0;
      remaining -= mt;
      const lh = computeLineHeightPx(desc);
      lines = Math.floor(remaining / lh);
    }
  }

  // Desktop rule: cap to 3 lines max on md+ (>=768px)
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    // If no image-derived limit, enforce exactly 3 lines. Otherwise, cap at 3.
    lines = Math.min(3, Number.isFinite(lines) ? lines : 3);
  }

  if (!Number.isFinite(lines) || lines < 1) {
    // Hide if nothing fits
    desc.style.display = 'none';
    return;
  }

  // Apply WebKit multi-line clamp inline to ensure cross-page availability
  desc.style.display = '-webkit-box';
  desc.style.webkitBoxOrient = 'vertical';
  desc.style.overflow = 'hidden';
  desc.style.webkitLineClamp = String(lines);
}

function applyDynamicDescClamps(scope = document) {
  const cards = scope.querySelectorAll('a[data-card="blog-row"], a[data-card="case-card"]');
  cards.forEach((card) => clampDescForCard(card));
  // Re-apply when thumbnails load
  scope.querySelectorAll('img[data-thumb]').forEach((img) => {
    if (img.__clampBound) return;
    img.__clampBound = true;
    img.addEventListener('load', () => {
      const card = img.closest('a[data-card]');
      if (card) clampDescForCard(card);
    });
  });
}

function projectCardHTML(p) {
  const img = p.thumbnail || '';
  const title = p.title || 'Untitled';
  const tagsText = p.tags?.length ? p.tags.join(' · ') : '';

  const inner = `
    <div class="relative overflow-hidden">
      ${img
      ? `<img src="${img}" alt="${title}" loading="lazy"
               class="block w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]" />`
      : `<div class=\"aspect-square w-full bg-zinc-300\"></div>`}
      <div class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
      <div class="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 class="text-base md:text-lg font-semibold">${title}</h3>
        ${tagsText ? `<p class="mt-1 text-xs md:text-sm opacity-90">${tagsText}</p>` : ''}
      </div>
    </div>`;

  const wrapperClasses = [
    'group h-full flex flex-col overflow-hidden rounded-2xl',
    'ring-1 ring-zinc-200/70 dark:ring-white/10 bg-white/60 dark:bg-zinc-900/40 hover:ring-zinc-300 dark:hover:ring-zinc-700 hover:bg-white dark:hover:bg-zinc-800',
    'transition-shadow shadow-sm hover:shadow-md',
    'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black'
  ].join(' ');

  if (p.slug) {
    return `<a href="/showcase?slug=${encodeURIComponent(p.slug)}" class="${wrapperClasses}" data-card="case-card">${inner}</a>`;
  }
  return `<div class="${wrapperClasses} cursor-pointer" data-card="case-card">${inner}</div>`;
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
        class="rounded-full px-3 py-1 text-sm transition-colors border border-zinc-300/60 hover:bg-black/5 ${selected ? 'bg-black text-white border-black' : 'bg-white/70 text-zinc-400'}">
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
    if (grid) grid.innerHTML = `<p class=\"px-6 py-8 text-zinc-400\">No projects found. Make sure your Builder space has published entries in the <code>projects</code> model and that the API key matches this space.</p>`;
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
  if (name === 'role' || name === 'briefcase') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-4 h-4 ${cls}"><path d="M9 4a2 2 0 00-2 2v1H5a3 3 0 00-3 3v7a3 3 0 003 3h14a3 3 0 003-3v-7a3 3 0 00-3-3h-2V6a2 2 0 00-2-2H9zm6 3V6a1 1 0 00-1-1H10a1 1 0 00-1 1v1h6z"/></svg>`;
  }
  if (name === 'team' || name === 'users') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-4 h-4 ${cls}"><path d="M7 11a3 3 0 110-6 3 3 0 010 6zm10-2a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zM2 19a5 5 0 019-3H7a5 5 0 00-5 5v-2zm9 0a5 5 0 019 0v2h-9v-2z"/></svg>`;
  }
  if (name === 'timeline' || name === 'clock') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-4 h-4 ${cls}"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 11.586V7z"/></svg>`;
  }
  if (name === 'skills' || name === 'tag') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-4 h-4 ${cls}"><path d="M3 12l7.293-7.293A1 1 0 0111 4h6a2 2 0 012 2v6a1 1 0 01-.293.707L11 20 3 12zm13-5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>`;
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
  const portrait = document.getElementById('connect-portrait');
  const defaultPortrait = portrait ? (portrait.getAttribute('data-default-src') || portrait.getAttribute('src')) : '';
  // Debounced hover preview state (enter/leave)
  let __hoverEnterTimer = 0;
  let __hoverLeaveTimer = 0;
  let __hoverArmedFor = null;
  let __swapToken = 0;
  const setPortrait = (src) => {
    if (!portrait || !src) return;
    if (portrait.getAttribute('src') === src) return; // no-op
    const token = ++__swapToken;
    const preload = new Image();
    preload.onload = () => {
      if (token !== __swapToken) return; // superseded
      const onFadeOut = () => {
        portrait.removeEventListener('transitionend', onFadeOut);
        if (token !== __swapToken) return;
        portrait.src = src;
        // Allow the browser to apply the new image, then fade back in
        requestAnimationFrame(() => { if (token === __swapToken) portrait.style.opacity = '1'; });
      };
      // Fallback in case transitionend doesn't fire
      const fallback = setTimeout(() => {
        if (token !== __swapToken) return;
        onFadeOut();
      }, 180);
      const wrapped = () => { clearTimeout(fallback); onFadeOut(); };
      portrait.addEventListener('transitionend', wrapped, { once: true });
      // Trigger fade out
      portrait.style.opacity = '0';
    };
    preload.onerror = () => {
      if (token !== __swapToken) return;
      portrait.src = src; // fallback without fade if preload fails
      portrait.style.opacity = '1';
    };
    preload.src = src;
  };
  const getActivePortrait = () => {
    const openBtn = root.querySelector('.acc-item.open [data-acc="toggle"][data-portrait-swap]');
    return (openBtn && openBtn.getAttribute('data-portrait-swap')) || defaultPortrait;
  };
  const setToActivePortrait = () => {
    const src = getActivePortrait();
    if (src) setPortrait(src);
  };
  items.forEach((item) => {
    const btn = item.querySelector('[data-acc="toggle"]');
    const panel = item.querySelector('.acc-panel');
    const chev = item.querySelector('.chev');
    const swapSrc = btn ? btn.getAttribute('data-portrait-swap') : '';

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
      // When closing, revert to any other open item's portrait (or default)
      if (swapSrc) setToActivePortrait();
    };
    const open = () => {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      if (chev) chev.style.transform = 'rotate(90deg)';
      panel.style.transition = 'max-height .28s ease';
      // Swap portrait when this item opens
      if (swapSrc) setPortrait(swapSrc);
    };

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        close();
        return;
      }
      // Cancel any pending hover timers when explicitly opening
      if (__hoverEnterTimer) { clearTimeout(__hoverEnterTimer); __hoverEnterTimer = 0; }
      if (__hoverLeaveTimer) { clearTimeout(__hoverLeaveTimer); __hoverLeaveTimer = 0; }
      __hoverArmedFor = null;
      // Close other open items for focused reading
      root.querySelectorAll('.acc-item.open').forEach((other) => {
        if (other === item) return;
        const oBtn = other.querySelector('[data-acc="toggle"]');
        const oPanel = other.querySelector('.acc-panel');
        const oChev = other.querySelector('.chev');
        other.classList.remove('open');
        if (oBtn) oBtn.setAttribute('aria-expanded', 'false');
        if (oPanel) {
          oPanel.style.maxHeight = '0px';
          oPanel.style.transition = 'max-height .28s ease';
        }
        if (oChev) oChev.style.transform = 'rotate(0deg)';
      });
      open();
    });

    // keep height correct on resize if open
    window.addEventListener('resize', () => {
      if (item.classList.contains('open')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });

    // Hover effect: preview portrait swap while hovering button
    if (swapSrc) {
      btn.addEventListener('mouseenter', () => {
        __hoverArmedFor = item;
        if (__hoverLeaveTimer) { clearTimeout(__hoverLeaveTimer); __hoverLeaveTimer = 0; }
        if (__hoverEnterTimer) clearTimeout(__hoverEnterTimer);
        __hoverEnterTimer = setTimeout(() => {
          __hoverEnterTimer = 0;
          if (__hoverArmedFor === item && !item.classList.contains('open')) {
            setPortrait(swapSrc);
          }
        }, 250);
      });
      btn.addEventListener('mouseleave', () => {
        if (__hoverEnterTimer) { clearTimeout(__hoverEnterTimer); __hoverEnterTimer = 0; }
        __hoverArmedFor = null;
        if (__hoverLeaveTimer) clearTimeout(__hoverLeaveTimer);
        __hoverLeaveTimer = setTimeout(() => {
          __hoverLeaveTimer = 0;
          // Revert to the currently open item's portrait, or default, if this item isn't open
          if (!item.classList.contains('open')) setToActivePortrait();
        }, 250);
      });
    }
  });
}

async function loadProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  if (!slug) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-400">Missing <code>slug</code> in URL.</p>`;
    return;
  }

  const rows = await fetchBuilder('projects', { limit: 1, 'query.data.slug': slug });
  if (!rows.length) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-400">No project found for slug: <code>${slug}</code>.</p>`;
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
          <a href="/" id="back-button"
             class="fixed top-4 left-4 z-50 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-zinc-400 shadow md:static md:bg-transparent md:shadow-none md:text-zinc-500 transition-colors">
            <span class="md:hidden">&larr; Back</span>
            <span class="hidden md:inline">&larr; Back to Home</span>
          </a>
          <h1 class="text-3xl md:text-4xl font-semibold">${p.title}</h1>
          ${p.description ? `<p class="text-zinc-400 text-lg leading-relaxed">${p.description}</p>` : ''}
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
  if (backBtn) {
    const apply = () => {
      if (window.innerWidth < 768) {
        backBtn.classList.add('back-floating');
        return;
      }
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 120) backBtn.classList.add('back-floating');
      else backBtn.classList.remove('back-floating');
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { ticking = false; apply(); });
      }
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apply);
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
  /* Smooth portrait cross-fade on Connect */
  #connect-portrait { transition: opacity .25s ease; opacity: 1; }
  #back-button.back-floating {
    position: fixed !important;
    top: 1rem; /* mobile top offset */
    left: 1.5rem; /* match base container px-6 */
    background: #ffffff;
    color: #000 !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    border-radius: 9999px;
  }
  /* Blog article: make mobile back button 50% smaller (circle and chevron) */
    }
  }
  /* Full-width fading gradient behind nav for clearer separation */
  #nav-backdrop { position: fixed; left: 0; right: 0; z-index: 40; pointer-events: none; }
  /* md and up: gradient from top */
  @media (min-width: 768px) {
    #nav-backdrop { top: 0; height: 110px; background: linear-gradient(to bottom, rgba(244,244,245,1), rgba(244,244,245,0)); }
  }
  /* below md: gradient from bottom for bottom nav */
  @media (max-width: 767.98px) {
    #nav-backdrop { bottom: 0; height: 120px; background: linear-gradient(to top, rgba(244,244,245,1), rgba(244,244,245,0)); }
  }
  /* Intro greeting overlay */
  #intro-greeting {
    position: fixed;
    inset: 0;
    background: #000;
    color: #fff;
    display: grid;
    place-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity .6s ease;
  }
  #intro-greeting.hide { opacity: 0; pointer-events: none; }
  #intro-greeting .bubble {
    transform: translateY(8px) scale(.98);
    opacity: 0;
    animation: intro-pop .6s ease forwards .15s;
    text-align: center;
  }
  @keyframes intro-pop {
    to { transform: translateY(0) scale(1); opacity: 1; }
  }
  /* Align left offset to container padding across breakpoints */
  @media (min-width: 640px) { /* sm:px-8 => 2rem */
    #back-button.back-floating { left: 2rem; }
  }
  @media (min-width: 768px) { /* md: top matches nav (md:top-6 => 1.5rem), md:px-12 => 3rem */
    #back-button.back-floating { top: 1.5rem; left: 3rem; }
  }
  @media (min-width: 1024px) { /* lg:px-24 => 6rem */
    #back-button.back-floating { left: 6rem; }
  }
  @media (min-width: 1280px) { /* xl:px-28 => 7rem */
    #back-button.back-floating { left: 7rem; }
  }
  @media (min-width: 1536px) { /* 2xl:px-32 => 8rem */
    #back-button.back-floating { left: 8rem; }
  }
  html { scroll-behavior: smooth; }
  /* Remove extra bottom margin below footer to avoid visible white gap */
  /* Article typography: use sans (Roboto-first) for headings and body */
  /* Also force serif utility to resolve to sans within the article scope */
  #project-detail { --font-serif: var(--font-sans); }
  #project-detail h1, #project-detail h2, #project-detail h3,
  #project-detail h4, #project-detail h5, #project-detail h6 {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    letter-spacing: .1px;
  }
  #project-detail .prose,
  #project-detail .prose p,
  #project-detail .prose li,
  #project-detail .prose span,
  #project-detail .prose div {
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  /* Ensure any Tailwind font-serif utility inside article is neutralized */
  #project-detail .font-serif { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important; }

  /* TOC: floating at right edge on md+; right-aligned links */
  @media (min-width: 768px) {
    /* Reduce TOC width ~20% to avoid clipping into content */
    #toc-floating { position: fixed; top: 50%; transform: translateY(-50%); right: 24px; width: 208px; text-align: right; }
  }
  /* Hide TOC when viewport is square or taller than wide (<= 1:1) */
  @media (max-aspect-ratio: 1/1) {
    #toc-floating { display: none !important; }
  }
  #toc-floating a.toc-active, #toc a.toc-active { color: #000; font-weight: 600; }
`;
document.head.appendChild(style);

// Lightweight animations and utilities for project modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes scale-out {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to { opacity: 0; transform: scale(0.95) translateY(10px); }
  }
  .animate-fade-in { animation: fade-in 0.2s ease-out; }
  .animate-fade-out { animation: fade-out 0.2s ease-out; }
  .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-scale-out { animation: scale-out 0.2s cubic-bezier(0.4, 0, 1, 1); }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;
document.head.appendChild(modalStyle);

// Project video modal (Home)
function initProjectVideoModals() {
  const cards = document.querySelectorAll('section .grid figure');
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    video.style.cursor = 'pointer';
    video.addEventListener('click', () => {
      const figcap = card.querySelector('figcaption');
      const summary = figcap ? figcap.innerHTML : '';
      const long = card.getAttribute('data-long') || '';
      const project = (card.getAttribute('data-project') || '').toLowerCase();
      let link = card.getAttribute('data-link') || '';
      let linkTitle = '';
      let linkDesc = '';
      if (project === 'carte11') {
        linkTitle = 'Read the Carte 1.1 case study';
        linkDesc = 'Turning Carte into a full-fledged connection management app.';
      } else if (project === 'carte') {
        linkTitle = 'Read the Carte case study';
        linkDesc = 'Designing the bridge between print and digital.';
      } else if (project === 'swisekai') {
        linkTitle = 'Read the Swisekai case study';
        linkDesc = 'Designing a responsive learning companion.';
      } else if (project === 'stoa') {
        linkTitle = 'Read the Stoa case study';
        linkDesc = 'Accessibility and calm interactions.';
      }
      openProjectModal(video.currentSrc || video.src, summary, long, link, linkTitle, linkDesc);
    });
  });
}

function openProjectModal(src, summaryHtml, longText, linkUrl, linkTitle, linkDesc) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in';

  overlay.innerHTML = `
    <div class="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-scale-in">
      <!-- Close button with better positioning and styling -->
      <button 
        aria-label="Close modal" 
        class="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm border border-zinc-200/80 dark:border-white/10 shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 group"
      >
        <svg class="w-5 h-5 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Video container with improved aspect ratio handling -->
      <div class="relative w-full bg-black">
        <video 
          class="block w-full h-auto max-h-[70vh] object-contain" 
          src="${src}" 
          autoplay
          muted
          loop
          playsinline
          controlsList="nodownload"
        ></video>
      </div>

      <!-- Content section with refined spacing and typography -->
      <div class="p-6 sm:p-8 space-y-4">
        ${summaryHtml ? `
          <div class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            ${summaryHtml}
          </div>
        ` : ''}
        
        ${longText ? `
          <p class="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            ${longText}
          </p>
        ` : ''}
        
        ${renderEmbedLink(linkUrl, linkTitle, linkDesc)}
      </div>
    </div>
  `;

  // Close handler with smooth cleanup
  function close() {
    try {
      overlay.classList.add('animate-fade-out');
      const modal = overlay.querySelector('div');
      if (modal) modal.classList.add('animate-scale-out');

      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        overlay.remove();
      }, 200);
    } catch (e) { }
  }

  // Click outside to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Close button handler
  const closeBtn = overlay.querySelector('button[aria-label="Close modal"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
  }

  // Append to body
  document.body.appendChild(overlay);
  document.body.classList.add('overflow-hidden');

  // Keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handleKeydown);
    }
  };
  document.addEventListener('keydown', handleKeydown);

  // Focus trap for accessibility
  const focusableElements = overlay.querySelectorAll(
    'button, a[href], video, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  // Auto-focus close button for keyboard users
  setTimeout(() => closeBtn?.focus(), 100);
}

function renderEmbedLink(url, title, desc) {
  if (!url && !title) return '';

  const embedId = 'embed_' + Math.random().toString(36).slice(2, 9);
  const domain = (() => {
    try {
      if (!url) return '';
      const u = new URL(url, location.origin);
      return u.hostname.replace(/^www\./, '');
    } catch { return ''; }
  })();

  const idParam = (() => {
    try {
      const u = new URL(url, location.origin);
      return u.searchParams.get('id');
    } catch { return null; }
  })();

  // Enhanced base card with better hover states
  const base = `
    <div id="${embedId}" class="mt-6">
      <a 
        ${url ? `href="${url}" target="_blank" rel="noopener"` : ''} 
        class="block group"
      >
        <div class="flex items-start rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md bg-white overflow-hidden transition-all duration-200">
          <div class="flex-1 p-5 min-w-0">
            <h2 class="text-base sm:text-lg font-semibold text-zinc-900 group-hover:text-black transition-colors line-clamp-2">
              ${title || (idParam ? 'Loading…' : 'Related Article')}
            </h2>
            ${desc ? `
              <p class="text-sm sm:text-base text-zinc-600 mt-2 line-clamp-2">
                ${desc}
              </p>
            ` : ''}
            ${domain ? `
              <p class="text-xs text-zinc-500 mt-3 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                ${domain}
              </p>
            ` : ''}
          </div>
          <div class="relative w-28 sm:w-36 aspect-square self-start bg-zinc-100 flex-shrink-0 overflow-hidden"></div>
        </div>
      </a>
    </div>
  `;

  // If no article ID, return static card
  if (!idParam) return base;

  // Enrich with live metadata asynchronously
  setTimeout(async () => {
    try {
      // Try robust ID resolution, mirroring blog detail loader
      let rows = await fetchBuilder('blogs', { limit: 1, ids: idParam });
      if (!rows || !rows.length || rows[0]?.id !== idParam) {
        rows = await fetchBuilder('blogs', { limit: 1, 'query.id': idParam });
      }
      if (!rows || !rows.length || rows[0]?.id !== idParam) {
        const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
        rows = many.filter(r => r?.id === idParam);
      }
      if (!rows || !rows.length) return;

      const b = normalizeBlog(rows[0]);
      const minutes = b.minutes ? `${b.minutes} min read` : '';
      const thumb = b.thumbnail
        ? `<div class=\"relative w-28 sm:w-36 aspect-square self-start flex-shrink-0 overflow-hidden bg-zinc-100\"><img src=\"${b.thumbnail}\" alt=\"\" class=\"absolute inset-0 w-full h-full object-cover\" loading=\"lazy\" /></div>`
        : `<div class=\"relative w-28 sm:w-36 aspect-square self-start flex-shrink-0 overflow-hidden bg-zinc-100\"></div>`;

      const html = `
        <a href="${url}" target="_blank" rel="noopener" class="block group">
          <div class="flex items-start rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md bg-white dark:bg-zinc-800 overflow-hidden transition-all duration-200">
            <div class="flex-1 p-5 min-w-0">
              <h2 class="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                ${b.title || title || ''}
              </h2>
              ${b.description ? `
                <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                  ${b.description}
                </p>
              ` : ''}
              <p class="text-xs text-zinc-500 mt-3 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                ${domain}${minutes ? ` • ${minutes}` : ''}
              </p>
            </div>
            ${thumb}
          </div>
        </a>
      `;

      const host = document.getElementById(embedId);
      if (host) {
        host.classList.add('animate-fade-in');
        host.innerHTML = html;
      }
    } catch (e) { }
  }, 0);

  return base;
}

// ==================== BLOG DETAIL & LIST LOGIC ====================

async function loadBlogDetail() {
  const root = document.getElementById('blog-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  let slug = params.get('slug');
  let id = params.get('id');
  if (!slug && !id) {
    try {
      const segs = (location.pathname || '').split('/').filter(Boolean);
      // Handle /blog/slug -> slug is the last segment if we are in the blog section
      // We expect the path to be /blog/some-slug
      // If we are strictly on /blog/article.html, then 'article.html' is a segment, but we returned above if params exist?
      // Actually, if rewritten, pathname is /blog/some-slug, search has ?slug=some-slug (server side)
      // BUT client side location.pathname will be /blog/some-slug. location.search might be empty if Vercel rewrite masks it?
      // Vercel rewrites: Server sees the destination. Client:
      // If full page load: URL bar is /blog/some-slug. Browser receives content of article.html.
      // JS sees location.pathname = /blog/some-slug. location.search = empty (unless explicitly passed).
      // So we MUST extract from pathname.

      const blogIdx = segs.findIndex(s => s === 'blog');
      if (blogIdx !== -1 && segs[blogIdx + 1]) {
        slug = segs[blogIdx + 1];
      }
    } catch { }
  }
  if (!slug && !id) {
    root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Missing <code>slug</code> in URL.</p>`;
    return;
  }

  // Try by slug first; fall back to id
  let rows = [];
  if (slug) {
    rows = await fetchBuilder('blogs', { limit: 1, 'query.data.slug': slug });
  }
  if ((!rows || !rows.length) && id) {
    rows = await fetchBuilder('blogs', { limit: 1, ids: id });
    if (!rows.length || rows[0]?.id !== id) {
      rows = await fetchBuilder('blogs', { limit: 1, 'query.id': id });
    }
    if (!rows.length || rows[0]?.id !== id) {
      const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
      rows = many.filter(r => r?.id === id);
    }
  }
  // Final fallback for slug: fetch many and match by slug in data
  if ((!rows || !rows.length) && slug) {
    try {
      const many = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
      const want = (slug || '').toString().trim().toLowerCase();
      rows = many.filter(r => {
        const s = (r?.data?.slug || r?.data?.Slug || '').toString().trim().toLowerCase();
        return s && s === want;
      });
    } catch { }
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
    ['overview', 'Overview'],
    ['background', 'Background'],
    ['empathize', 'Empathize'],
    ['desk-research', 'Desk research'],
    ['user-interview', 'User interview'],
    ['ideate', 'Ideate'],
    ['prototype', 'Prototype'],
    ['final-result', 'Final result'],
    ['reflections', 'Reflections']
  ];

  function chapterHtml(keyId, label) {
    if (!contentItem) return '';

    // Build robust key variants to match Builder fields regardless of casing/format
    const toCamel = (s = '') => s
      .toString()
      .toLowerCase()
      .replace(/[\s_-]+([a-z0-9])/g, (_m, c) => c.toUpperCase());
    const toPascal = (s = '') => {
      const c = toCamel(s);
      return c ? c[0].toUpperCase() + c.slice(1) : c;
    };

    const labelLower = (label || '').toString().toLowerCase();
    const fromLabelNoSpaces = (label || '').toString().replace(/\s+/g, '');
    const fromIdNoHyphen = (keyId || '').toString().replace(/[-_]+/g, ' ');

    const variants = [
      label,
      labelLower,
      fromLabelNoSpaces,
      // Common separators
      labelLower.replace(/\s+/g, '-'), // desk-research
      labelLower.replace(/\s+/g, '_'), // desk_research
      toCamel(label),                   // deskResearch
      toPascal(label),                  // DeskResearch
      // Also derive from the id to be safe
      keyId,
      fromIdNoHyphen,
      toCamel(fromIdNoHyphen),
      toPascal(fromIdNoHyphen),
      fromIdNoHyphen.replace(/\s+/g, ''),
      fromIdNoHyphen.replace(/\s+/g, '_'),
      fromIdNoHyphen.replace(/\s+/g, '-'),
    ].filter(Boolean);

    // Find first matching non-empty value, allowing rich-text objects
    let raw = '';
    for (const k of variants) {
      if (Object.prototype.hasOwnProperty.call(contentItem, k) && contentItem[k]) {
        raw = contentItem[k];
        break;
      }
    }
    if (!raw) return '';

    // Coerce to string if Builder returns a rich-text object
    let html = '';
    if (typeof raw === 'string') html = raw;
    else if (raw && typeof raw === 'object') html = raw.html || raw.text || raw.value || '';
    if (!html) return '';

    return `
      <section id="${keyId}" class="scroll-mt-24 pt-10 mt-10">
        <div class="my-8">
          <div class="w-2/3 border-b-2 border-black pb-1 dark:border-zinc-700">
            <h2 class="text-left text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black dark:text-white">${label}</h2>
          </div>
        </div>
        <div class="prose max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300">${normalizeArticleHtml(html)}</div>
      </section>`;
  }

  const chaptersHtml = CHAPTERS.map(([id, label]) => chapterHtml(id, label)).filter(Boolean).join('');

  // Assemble final body
  const articleHtmlRaw = normalizeArticleHtml(htmlContent) || '';
  const articleHtml = articleHtmlRaw ? `<div class="pt-10 mt-8 md:pt-12 md:mt-10">${articleHtmlRaw}</div>` : '';
  const bodyHtml = `${articleHtml}${galleryHtml}${chaptersHtml}` || (b.description ? `<p>${b.description}</p>` : '<p></p>');

  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  function typeBadgeForTag(tag) {
    const t = (tag || '').toLowerCase();
    if (t.includes('case')) return 'assets/caseStudyGradient.jpeg';
    return 'assets/BG%20Placeholder.avif';
  }

  // Fix asset paths for blog/ subdir if needed
  const badgePath = (tag) => {
    const t = (tag || '').toLowerCase();
    if (t.includes('case')) return '../assets/caseStudyGradient.jpeg';
    return '../assets/BG%20Placeholder.avif';
  };

  const author = `<strong>Wira Wibisana</strong> in <strong>${firstTag}</strong>
    <img src="${badgePath(firstTag)}" alt="${firstTag} type" class="inline-block align-middle h-[1em] w-[1em] object-cover" loading="lazy" decoding="async"/>`;
  const dateLong = formatBlogDate(b.date);
  const dateShort = formatBlogDateShort(b.date);

  // Pull auxiliary fields from Builder (camelCase first)
  const safeText = (v) => {
    if (!v) return '';
    if (typeof v === 'string') return v.trim();
    if (typeof v === 'object') return (v.text || v.html || v.value || '').toString().trim();
    return '';
  };
  const myRole = safeText(d.myRole || d.role || d['My Role']);
  const team = safeText(d.team || d['Team']);
  const teamComp = safeText(d.teamComposition || d['Team Composition'] || d.TeamComposition);
  const timeline = safeText(d.timeline || d['Timeline']);
  // Skills
  const splitSkills = (s) => (s || '').toString().split(/\s*[-,]\s+|\n+/).map(x => x.trim()).filter(Boolean);
  let skills = [];
  if (Array.isArray(d.skills)) d.skills.forEach(item => { if (typeof item === 'string') skills.push(...splitSkills(item)); });
  // Fallbacks to top-level fields
  ['skill1', 'skill2', 'skill3'].forEach(k => { const v = safeText(d[k]); if (v) skills.push(...splitSkills(v)); });

  const seenSkill = new Set();
  skills = skills.filter(s => { if (seenSkill.has(s.toLowerCase())) return false; seenSkill.add(s.toLowerCase()); return true; });

  function renderLinkPills(links) {
    if (!links || !links.length) return '';

    const getIcon = (url, label) => {
      const u = (url || '').toLowerCase();
      const l = (label || '').toLowerCase();

      // App Store (Apple)
      if (u.includes('apps.apple.com') || l.includes('app store')) {
        return `<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.06.91-2.09.91-3.08-.35-4.85-6.21-1.87-11.45 2.15-11.64.95-.05 1.77.53 2.53.53.7 0 1.91-1 3.23-.74 1.48.28 2.37 1.09 3.23 2.15-2.61 1.48-2.09 5.86.35 6.91-.49 1.41-1.41 3.41-2.26 4.41l.01-.01zM13.03 5.48c-.7.84-1.84 1.41-2.84 1.27-.14-1.2.56-2.61 1.48-3.41.84-.77 2.29-1.34 2.99-1.12.18 1.44-.81 2.64-1.63 3.26z"/></svg>`;
      }
      // Figma
      if (u.includes('figma.com') || l.includes('figma')) {
        return `<svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 25.9863 20.0179 23.5755 21.8297 21.798C23.6415 20.0204 26.0989 19.0219 28.6615 19.0219C31.2242 19.0219 33.6816 20.0204 35.4934 21.798C37.3052 23.5755 38.3231 25.9863 38.3231 28.5C38.3231 31.0137 37.3052 33.4245 35.4934 35.202C33.6816 36.9796 31.2242 37.9781 28.6615 37.9781L19 37.9781V28.5Z" fill="#1ABCFE"/><path d="M0 47.4781C0 44.9644 1.01786 42.5536 2.82966 40.7761C4.64146 38.9985 7.09893 38 9.66154 38C12.2241 38 14.6816 38.9985 16.4934 40.7761C18.3052 42.5536 19.3231 44.9644 19.3231 47.4781C19.3231 50.0827 18.271 52.5413 16.3242 54.4507C14.5422 56.1264 12.1873 57.0396 9.66154 56.9562C4.34893 56.9562 0 52.6898 0 47.4781Z" fill="#0ACF83"/><path d="M19 0V18.9781L28.6615 18.9781C31.2242 18.9781 33.6816 17.9796 35.4934 16.202C37.3052 14.4245 38.3231 12.0137 38.3231 9.5C38.3231 6.9863 37.3052 4.57548 35.4934 2.79796C33.6816 1.02045 31.2242 0.021946 28.6615 0L19 0Z" fill="#FF7262"/><path d="M0 9.5C0 12.0137 1.01786 14.4245 2.82966 16.202C4.64146 17.9796 7.09893 18.9781 9.66154 18.9781L19 18.9781V0L9.66154 0C7.09893 0.021946 4.64146 1.02045 2.82966 2.79796C1.01786 4.57548 0 6.9863 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 31.0137 1.01786 33.4245 2.82966 35.202C4.64146 36.9796 7.09893 37.9781 9.66154 37.9781L19 37.9781V19.0219L9.66154 19.0219C7.09893 19.0219 4.64146 20.0204 2.82966 21.798C1.01786 23.5755 0 25.9863 0 28.5Z" fill="#A259FF"/></svg>`;
      }
      // GitHub
      if (u.includes('github.com') || l.includes('github')) {
        return `<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>`;
      }
      // Default (External Link)
      return `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`;
    };

    return `
      <div class="flex flex-wrap gap-3 pt-3">
        ${links.map(l => {
      const u = (l.url || '').toLowerCase();
      const label = (l.label || '').toLowerCase();
      const isPrimary = u.includes('apps.apple.com') || label.includes('app store') || label.includes('download') || label.includes('get app');

      if (isPrimary) {
        return `
               <a href="${l.url}" target="_blank" rel="noopener" 
                  class="inline-flex items-center gap-2.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 shadow-sm">
                  ${getIcon(l.url, l.label)}
                  <span>${l.label}</span>
               </a>`;
      } else {
        return `
               <a href="${l.url}" target="_blank" rel="noopener" 
                  class="inline-flex items-center gap-2.5 rounded-full bg-white text-zinc-900 border border-zinc-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:border-white/10 dark:hover:bg-zinc-800">
                  ${getIcon(l.url, l.label)}
                  <span>${l.label}</span>
               </a>`;
      }
    }).join('')}
      </div>
    `;
  }
  const linksPills = renderLinkPills(b.links);

  // Assemble top hero image list for lightbox (thumbnail first)
  const allImages = [b.thumbnail, ...galleryImages].filter(Boolean);

  root.innerHTML = `
    <div class="min-h-screen pb-48 md:pb-32 lg:ml-[348px]">
      <!-- Sticky Breadcrumb Nav -->
      <div class="sticky top-[60px] md:top-0 z-[100] w-full bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/50 transition-all dark:bg-zinc-900/80 dark:border-white/5">
         <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 py-3 flex items-center gap-4">
            <a href="index.html" aria-label="Back to Blogs"
               class="group inline-flex items-center justify-center -ml-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800">
              <img src="../assets/Chevron%20Icon.png" alt="" class="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" draggable="false"/>
            </a>
            <span class="font-medium text-sm text-zinc-900 truncate pr-4 dark:text-white">${b.title}</span>
         </div>
      </div>

      <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 pt-12 pb-8 md:pt-24 md:pb-16 relative">
        <div id="back-sentinel" class="hidden md:block h-0"></div>
            <header class="mb-8 md:mb-12">
              
              <div class="space-y-5 md:space-y-6">
                 
                 ${(() => {
      const u = urlFrom(d.heroImage || d['Hero image']);
      return u ? `<div class="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 dark:border-zinc-800"><img src="${u}" alt="" class="w-full h-full object-cover" loading="eager" /></div>` : '';
    })()}

                <!-- Title & Subtitle Group -->
                <div class="space-y-4">
                   <p class="text-sm font-medium text-zinc-400 uppercase tracking-wider dark:text-zinc-500">${formatBlogDateShort(b.date)}</p>
                   <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 leading-[1.1] text-balance dark:text-white">${b.title}</h1>
                   ${b.description ? `<p class="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl text-balance dark:text-zinc-400">${b.description}</p>` : ''}
                </div>

                <!-- Meta Data Chips Row -->
                ${(myRole || team || timeline) ? `
                  <div class="flex flex-wrap gap-3 text-sm">
                    ${myRole ? `
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Role</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${myRole}</span>
                    </div>` : ''}
                    ${team ? `
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Team</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${team}</span>
                    </div>` : ''}
                    ${timeline ? `
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Timeline</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${timeline}</span>
                    </div>` : ''}
                  </div>
                ` : ''}
                
                <div class="flex flex-wrap items-center gap-4 pt-2">
                  ${skills.length ? `<div class="flex flex-wrap gap-2">${skills.map(s => `<span class="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-500">${s}</span>`).join('')}</div>` : ''}
                  ${linksPills ? `<div class="">${linksPills}</div>` : ''}
                </div>
              </div>
            </header>

            <!-- Overview Grid: Challenge / Solution / Impact -->
            ${(() => {
      // Extract fields with support for structured "projectOverviewGrid" list
      let challenge = '', solution = '', impact = '';

      // 1. Try the structured list "projectOverviewGrid" (taking the first item)
      const gridList = d.projectOverviewGrid || d['Project overview grid'] || d.projectOverview;
      if (Array.isArray(gridList) && gridList.length > 0) {
        const item = gridList[0];
        // Screenshot implies fields: "Challenge text", "Solution text", "Impact text"
        // Builder usually normalizes names to camelCase: challengeText
        const findVal = (p, keys) => {
          for (const k of keys) {
            if (p[k]) return safeText(p[k]);
          }
          return '';
        };
        challenge = findVal(item, ['challengeText', 'Challenge text', 'challenge', 'Challenge']);
        solution = findVal(item, ['solutionText', 'Solution text', 'solution', 'Solution']);
        impact = findVal(item, ['impactText', 'Impact text', 'impact', 'Impact']);
      }

      // 2. Fallback to top-level fields if missing
      const getField = (k) => safeText(d[k] || d[k.toLowerCase()] || d[k.charAt(0).toUpperCase() + k.slice(1)]);

      if (!challenge) challenge = getField('Challenge');
      if (!solution) solution = getField('Solution');
      if (!impact) impact = getField('Impact');

      if (!challenge && !solution && !impact) return '';

      const card = (title, content, isDark = false) => {
        if (!content) return '';
        const bg = isDark ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-black dark:border-zinc-800' : 'bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
        const labelColor = isDark ? 'text-zinc-400' : 'text-zinc-400 dark:text-zinc-500';
        return `
                   <div class="flex-1 min-w-[240px] rounded-2xl border ${bg} p-6 md:p-8 flex flex-col gap-4">
                     <span class="${labelColor} text-xs font-bold uppercase tracking-wider">${title}</span>
                     <div class="text-sm md:text-base leading-relaxed ${isDark ? 'text-zinc-200' : 'text-zinc-600 dark:text-zinc-300'}">
                       ${normalizeArticleHtml(content)}
                     </div>
                   </div>
                 `;
      };

      return `
                 <div class="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                   ${card('Challenge', challenge)}
                   ${card('Solution', solution)}
                   ${card('Impact', impact, true)}
                 </div>
               `;
    })()}

        <section class="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300">
           ${bodyHtml}
        </section>

        <!-- Fixed floating TOC (Desktop) -->
        <aside class="hidden xl:block">
          <div id="toc-floating" class="group fixed top-1/2 -translate-y-1/2 right-6 z-50 w-12 hover:w-72 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] py-6 overflow-hidden">
             <p class="text-xs uppercase tracking-wide text-zinc-400 mb-4 pl-5 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">Contents</p>
             <nav id="toc-links" class="relative flex flex-col space-y-3 text-sm border-l border-zinc-200 ml-6"></nav>
          </div>
        </aside>

      </div>
    </div>
  `;

  // Add lightbox on hero
  const hero = root.querySelector('img[data-hero]');
  if (hero && allImages.length) hero.addEventListener('click', () => openLightbox(allImages, 0));

  // Build TOC using headings
  const toc = document.getElementById('toc-links');
  if (toc) {
    const slugify = (s) => (s || '').toString().trim().toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z]+;|&#\d+;/gi, '-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';

    const chapterIds = ['overview', 'background', 'empathize', 'desk-research', 'user-interview', 'ideate', 'prototype', 'final-result', 'reflections'];
    const chapterSections = Array.from(document.querySelectorAll('section[id]')).filter(sec => chapterIds.includes(sec.id));

    // Also find H2s in the prose content
    const articleContainer = root.querySelector('section.prose');
    const headingEls = [];
    if (articleContainer) {
      const h2s = Array.from(articleContainer.querySelectorAll('h2'));
      const seenIds = new Set(chapterSections.map(s => s.id));
      const seenLabels = new Set(chapterSections.map(s => (s.querySelector('h2')?.textContent || s.id).trim().toLowerCase()));

      h2s.forEach(h => {
        const text = (h.textContent || 'section').trim();
        const labelLower = text.toLowerCase();

        // Skip if this heading text is already covered by a chapter (title match)
        if (seenLabels.has(labelLower)) return;

        // Generate ID if missing
        let id = h.id || slugify(text);
        if (!h.id && seenIds.has(id)) {
          // If ID collides but label was unique, suffix it
          let suffix = 2;
          while (seenIds.has(id) || document.getElementById(id)) { id = `${id}-${suffix++}`; }
        }

        // If the element already has an ID that matches a chapter, skip it (it's redundant or collision)
        if (h.id && seenIds.has(h.id)) return;

        seenIds.add(id);
        seenLabels.add(labelLower);

        h.id = id;
        h.classList.add('scroll-mt-24');
        headingEls.push(h);
      });
    }

    const entries = [
      ...chapterSections.map(sec => ({ id: sec.id, label: sec.querySelector('h2')?.textContent || sec.id })),
      ...headingEls.map(h => ({ id: h.id, label: h.textContent || h.id }))
    ];

    // Render links with dot indicators
    toc.innerHTML = entries.map(e => `
      <a href="#${e.id}" data-id="${e.id}" class="group/link flex items-center pl-4 relative text-zinc-500 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white">
        <span class="toc-dot absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-200 border-2 border-white ring-1 ring-zinc-200 transition-all duration-300 group-hover/link:bg-zinc-300 group-hover/link:ring-zinc-300 dark:bg-zinc-700 dark:border-zinc-900 dark:ring-zinc-700 dark:group-hover/link:bg-zinc-500 dark:group-hover/link:ring-zinc-500"></span>
        <span class="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 whitespace-nowrap">${e.label}</span>
      </a>
    `).join('');

    toc.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-id]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('data-id');
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const byId = Object.fromEntries([...toc.querySelectorAll('a[data-id]')].map(a => [a.getAttribute('data-id'), a]));
    const observeTargets = [...chapterSections, ...headingEls];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = byId[id];
        if (!link) return;
        if (entry.isIntersecting) {
          // Reset all
          Object.values(byId).forEach(el => {
            el.classList.remove('text-black', 'font-medium');
            el.classList.add('text-zinc-500');
            const dot = el.querySelector('.toc-dot');
            if (dot) {
              dot.classList.remove('bg-black', 'ring-black', 'scale-110');
              dot.classList.add('bg-zinc-200', 'ring-zinc-200');
            }
          });

          // Set active
          link.classList.remove('text-zinc-500');
          link.classList.add('text-black', 'font-medium');
          const dot = link.querySelector('.toc-dot');
          if (dot) {
            dot.classList.remove('bg-zinc-200', 'ring-zinc-200');
            dot.classList.add('bg-black', 'ring-black', 'scale-110');
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });
    observeTargets.forEach(t => obs.observe(t));
  }

  // Back button logic with Sidebar awareness
  const backBtn = document.getElementById('back-button');
  if (backBtn) {
    backBtn.classList.add('back-floating');
    const syncBackSize = () => {
      // Logic to match nav capsule height if present, or default
      backBtn.style.width = '48px';
      backBtn.style.height = '48px';
    };
    const syncBackLeft = () => {
      try {
        const anchor = document.querySelector('#blog-detail header h1')
          || document.querySelector('#blog-detail header p')
          || document.querySelector('#blog-detail article');
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();

        let leftPos = Math.floor(rect.left);
        // If sidebar is visible (lg+), ensure we don't overlap
        if (window.innerWidth >= 1024) {
          // Sidebar is 348px. Give it some breathing room (e.g. 24px)
          const minLeft = 348 + 48;
          if (leftPos < minLeft) {
            // If the content is under sidebar, we push button out?
            // Actually, usually we want it aligned with content. 
            // If content is covered, that's a CSS layout issue.
            // Assuming content is visible, we just want button to be to the left of content but NOT inside sidebar.
            // If rect.left is inside sidebar, pin to minLeft.
            leftPos = Math.max(leftPos, minLeft);
          }
        }
        // Mobile/Tablet: just use content alignment or min padding
        backBtn.style.left = Math.max(16, leftPos - 60) + 'px'; // Shift left of content by 60px if space

        // Refined positioning: on small screens, stick to top-left or use fixed
        if (window.innerWidth < 1024) {
          backBtn.style.left = '1.5rem'; // Fixed left on mobile/tablet
          backBtn.style.top = '1.5rem';
        } else {
          // Desktop: Calculate relative to content but floated
          // Actually, the request "refine" likely implies making it sticky/fixed nicely
          // Let's use the 'minLeft' approach to place it in the gutter
          const gutterCenter = (rect.left + (window.innerWidth >= 1024 ? 348 : 0)) / 2;
          // Let's stick to simple: Align with content left minus offset, bounded by sidebar
          const desired = rect.left - 64;
          const bound = window.innerWidth >= 1024 ? 360 : 16;
          backBtn.style.left = Math.max(bound, desired) + 'px';
          backBtn.style.top = '6rem'; // Fixed top offset on desktop
        }
      } catch { }
    };

    // Initial sync
    syncBackSize();
    syncBackLeft();
    window.addEventListener('resize', () => { syncBackSize(); syncBackLeft(); });
    // Re-check after layout
    setTimeout(syncBackLeft, 100);
  }

  // Click handlers for gallery thumbnails (loadBlogDetail closure)
  root.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
      openLightbox(allImages, idx);
    });
  });

  // Add skeletons
  try { root.querySelectorAll('.prose').forEach(enhanceArticleImages); } catch { }
}

function enhanceArticleImages(scope) {
  const imgs = scope.querySelectorAll('img');
  imgs.forEach((img) => {
    if (img.closest('.img-skel')) return;
    const wrap = document.createElement('div');
    wrap.className = 'img-skel loading';
    // Use current computed height if any
    const ch = Math.round(img.getBoundingClientRect().height);
    if (ch) wrap.style.setProperty('--img-skel-h', `${ch}px`);
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    const markLoaded = () => {
      wrap.classList.remove('loading');
      wrap.classList.add('loaded');
      wrap.style.removeProperty('--img-skel-h');
    };
    if (img.complete && img.naturalWidth > 0) markLoaded();
    else { img.addEventListener('load', markLoaded, { once: true }); img.addEventListener('error', markLoaded, { once: true }); }
  });
}
// Blog List Item Renderer (Horizontal Editorial Card)
function blogRowHTML(b) {
  const thumb = b.thumbnail;
  // Use clean URL for blog
  const href = b.slug ? `/blog/${encodeURIComponent(b.slug)}` : `article.html?id=${encodeURIComponent(b.id)}`;

  // Safe date formatting
  const dateStr = (() => {
    try {
      const d = new Date(b.date);
      return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  })();

  const role = (b.tags && b.tags[0]) ? b.tags[0] : 'Article';

  return `
    <article class="py-12 first:pt-0 last:pb-0">
      <a href="${href}" class="group grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-10 items-start">
        <!-- Thumbnail -->
        <div class="aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
           ${thumb
      ? `<img src="${thumb}" alt="${b.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">`
      : `<div class="w-full h-full flex items-center justify-center text-zinc-300"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`
    }
        </div>
        
        <!-- Content -->
        <div class="flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-500">
           <div class="flex items-center gap-3 text-xs font-medium">
             <span class="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 capitalize">${role.toLowerCase()}</span>
             <span class="text-zinc-400">${dateStr}</span>
           </div>
           
           <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
             ${b.title}
           </h2>
           
           <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
             ${b.description || 'No description available.'}
           </p>
        </div>
      </a>
    </article>
  `;
}

function renderBlogsList(list) {
  // Prefer the inner content column if the sidebar layout is active
  const el = document.getElementById('blogs-list-content') || document.getElementById('blogs-list');
  if (!el) return;
  el.innerHTML = list.map(blogRowHTML).join('');
  // After render, clamp descriptions to thumbnail height
  applyDynamicDescClamps(el);
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
  const state = (window.__blogFilterState = window.__blogFilterState || { active: 'ALL' });
  const canon = (s) => (s || '').toString().trim().toLowerCase();
  const paint = () => {
    const chip = (label, selected = false) => `
      <button type="button" data-tag="${label}" aria-pressed="${selected ? 'true' : 'false'}"
        class="rounded-full px-5 py-2.5 text-base md:text-lg font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-100 dark:focus:ring-offset-zinc-900 ${selected ? 'bg-black text-white border-black hover:bg-black/90 dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-200' : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-black hover:bg-zinc-50 dark:text-zinc-400 dark:border-zinc-700 dark:hover:text-white dark:hover:bg-zinc-800'}">
        ${label}
      </button>`;
    c.innerHTML = [chip('ALL', state.active === 'ALL'), ...tags.map(t => chip(t, state.active === t))].join('');
  };
  const resolveTag = (tag) => {
    const want = canon(tag);
    if (!want || want === 'all') return 'ALL';
    let match = tags.find(t => canon(t) === want);
    if (match) return match;
    match = tags.find(t => canon(t).includes(want) || want.includes(canon(t)));
    return match || 'ALL';
  };
  const applyFilter = (tag) => {
    state.active = resolveTag(tag);
    const filtered = state.active === 'ALL'
      ? items.slice()
      : items.filter(i => (i.tags || []).some(t => canon(t) === canon(state.active)));
    renderBlogsList(filtered);
    paint();
  };
  window.__blogFilters = { setActive: applyFilter, getActive: () => state.active };
  paint();
  c.onclick = (e) => {
    const btn = e.target.closest('button[data-tag]');
    if (!btn) return;
    applyFilter(btn.getAttribute('data-tag'));
  };
}

async function loadBlogsAndRender() {
  const listEl = document.getElementById('blogs-list');
  if (!listEl) return;
  const filtersEl = document.getElementById('blogs-filters');

  // Skeletons
  const skel = () => `
    <div class="py-3 md:py-6">
      <div class="relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 animate-pulse">
        <div class="min-w-0 space-y-2">
          <div class="h-3.5 bg-zinc-200 rounded w-40"></div>
          <div class="h-6 bg-zinc-200 rounded w-4/5"></div>
          <div class="hidden md:block h-4 bg-zinc-200 rounded w-3/5"></div>
        </div>
        <div class="block md:hidden w-24 h-24 bg-zinc-200 rounded-md"></div>
        <div class="hidden md:block w-[320px] h-40 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
    <hr class="border-zinc-200"/>`;
  listEl.innerHTML = skel() + skel() + skel();
  listEl.setAttribute('aria-busy', 'true');
  listEl.style.minHeight = '500px'; // Prevent layout shift

  if (filtersEl) {
    filtersEl.innerHTML = `<div class="flex flex-wrap gap-2 animate-pulse"><div class="h-7 w-20 bg-zinc-200 rounded-full"></div><div class="h-7 w-12 bg-zinc-200 rounded-full"></div></div>`;
    filtersEl.setAttribute('aria-busy', 'true');
  }

  // Be permissive with params; avoid sort keys that may be rejected by Builder when fields contain spaces
  try {
    const raw = await fetchBuilder('blogs', { limit: 100, includeUnpublished: true });
    console.log('[blogs raw]', raw);

    // Separate pinned vs normal if needed, or just fetch pinned separately?
    // User requested "sidebar ... for builder.io articles that have isPinned boolean"
    // So we fetch logic:
    // Main list: All articles (sorted new to old)
    // Sidebar: Pinned articles
    // Note: pinned articles might also appear in main list. This is usually fine.

    const normalized = raw.map(normalizeBlog).sort((a, b) => (new Date(b.date || 0)) - (new Date(a.date || 0)));

    // Filter out pinned ones for sidebar and sort newest -> oldest
    const pinnedItems = raw
      .filter(r => isTruthyPinned(r?.data))
      .sort((a, b) => {
        const da = new Date(a.data?.date || a.data?.Date || 0);
        const db = new Date(b.data?.date || b.data?.Date || 0);
        return db - da;
      });

    if (!normalized.length && !pinnedItems.length) {
      if (filtersEl) { filtersEl.innerHTML = ''; filtersEl.removeAttribute('aria-busy'); }
      listEl.innerHTML = `<div class="px-6 py-8 text-zinc-400 space-y-2">No blog posts found.</div>`;
      listEl.removeAttribute('aria-busy');
      listEl.style.minHeight = '';
      return;
    }

    // Render Pinned Items Helper (Horizontal Lockup)
    const renderPinnedSide = (item) => {
      const p = normalizeBlog(item);
      const q = p.slug ? `/blog/${encodeURIComponent(p.slug)}` : `article.html?id=${encodeURIComponent(p.id)}`;
      return `
          <a href="${q}" class="group flex items-start gap-4">
            <div class="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
               ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.title}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">` : ''}
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-black dark:group-hover:text-white leading-snug transition-colors">${p.title}</h4>
              <p class="hidden text-xs text-zinc-500 dark:text-zinc-500">${formatBlogDateShort(p.date)}</p>
            </div>
          </a>
        `;
    };

    // We need to inject the layout structure into listEl.
    // Since renderBlogsList expects to just dump rows into listEl, we need to change how renderBlogsList works OR wrap the content here.
    // But `renderBlogsList` is also called by filtering.
    // So `listEl` acts as the root. We should probably restructure `listEl` once to have a grid, and `renderBlogsList` targets the main column.
    // BUT `filtering` might clear `listEl`.

    // Strategy: Modify `renderBlogsList` to target a specific container IF it exists, or create it.
    // Actually, `renderBlogsList` implementation (lines 1488-1494) targets `blogs-list` ID directly and overwrites innerHTML.
    // This is problematic if we want a permanent sidebar.

    // I will redefine `renderBlogsList` inside `loadBlogsAndRender` scope or global if possible?
    // `renderBlogsList` is global (line 1488).

    // Let's UPDATE `renderBlogsList` first to respect the new structure, or simply handle the layout setup here and make `renderBlogsList` target a sub-container.

    // Better: split the layout creation from list rendering.
    // 1. Create the grid layout in `listEl`.
    // 2. Add an ID to the main column, e.g., `blogs-list-content`.
    // 3. Update `renderBlogsList` to look for `blogs-list-content` first, falling back to `blogs-list`.

    const pinnedHtml = pinnedItems.length ? `
        <div class="space-y-6">
            ${pinnedItems.map(renderPinnedSide).join('')}
        </div>
    ` : '<p class="text-sm text-zinc-400">No featured articles.</p>';

    listEl.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20 items-start relative">
         <div id="blogs-list-content" class="divide-y divide-zinc-200 dark:divide-zinc-800 min-w-0">
            <!-- Blog rows go here -->
         </div>
         
         <!-- Sticky Sidebar -->
         <aside class="hidden lg:block sticky top-0 h-screen overflow-y-auto pl-8 py-24 pb-12 border-l border-zinc-200 dark:border-zinc-800">
           <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6 font-['Inter']">Featured</h3>
           ${pinnedHtml}
         </aside>
      </div>
    `;

    listEl.removeAttribute('aria-busy');
    listEl.style.minHeight = '';

    // Now call separate render function or the global one if updated
    // I need to update global `renderBlogsList` to prefer `blogs-list-content`
    window.__currentBlogList = normalized; // Store for filtering
    renderBlogsList(normalized); // This needs to check for #blogs-list-content

    if (filtersEl) {
      renderBlogFilters(normalized);
      filtersEl.removeAttribute('aria-busy');
    }

  } catch (e) {
    console.error(e);
    listEl.innerHTML = `<p class="px-6 py-12 text-zinc-500">Failed to load content.</p>`;
    listEl.removeAttribute('aria-busy');
    listEl.style.minHeight = '';
    if (filtersEl) { filtersEl.innerHTML = ''; filtersEl.removeAttribute('aria-busy'); }
  }
}

// Updated renderBlogsList (overwriting the previous global function if I could, but I'll likely need to replace it in a separate block or here if it's close)
// Wait, `renderBlogsList` is defined at line 1488. I am editing `loadBlogsAndRender` at line 1547.
// I will just use a step to update `renderBlogsList` as well.


function computeLineHeightPx(el) {
  const cs = getComputedStyle(el);
  let lh = cs.lineHeight;
  if (lh === 'normal' || !lh) {
    const fs = parseFloat(cs.fontSize) || 16;
    return Math.round(fs * 1.5);
  }
  const n = parseFloat(lh);
  return Number.isFinite(n) ? n : 20;
}

function clampDescForCard(card) {
  const img = card.querySelector('img[data-thumb]');
  const desc = card.querySelector('[data-desc]');
  const title = card.querySelector('[data-title]');
  if (!desc) return;
  const descCS = getComputedStyle(desc);
  if (descCS.display === 'none' || descCS.visibility === 'hidden') return;

  desc.style.webkitLineClamp = '';
  desc.style.display = '';

  let lines = Infinity;
  if (img) {
    const imgH = img.getBoundingClientRect().height;
    if (imgH) {
      let remaining = imgH;
      if (title) {
        const titleCS = getComputedStyle(title);
        if (titleCS.display !== 'none' && titleCS.visibility !== 'hidden') {
          remaining -= title.getBoundingClientRect().height;
        }
      }
      const mt = parseFloat(descCS.marginTop) || 0;
      remaining -= mt;
      const lh = computeLineHeightPx(desc);
      lines = Math.floor(remaining / lh);
    }
  }

  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    lines = Math.min(3, Number.isFinite(lines) ? lines : 3);
  }

  if (!Number.isFinite(lines) || lines < 1) {
    desc.style.display = 'none';
    return;
  }

  desc.style.display = '-webkit-box';
  desc.style.webkitBoxOrient = 'vertical';
  desc.style.overflow = 'hidden';
  desc.style.webkitLineClamp = String(lines);
}

document.addEventListener('DOMContentLoaded', () => {
  // Intro greeting (first visit in session, render on actual Home only)
  try {
    const here = currentFilename();
    const onHomeDom = !!document.getElementById('home-pinned-grid');
    const firstTime = !sessionStorage.getItem('intro_greeted');
    const preShown = document.documentElement.classList.contains('show-intro') && document.getElementById('intro-greeting');
    // Render only on Home, but also handle case where overlay was pre-shown via index.html
    if ((here === 'index.html') && onHomeDom && (firstTime || preShown)) {
      // Use pre-rendered overlay if present; otherwise create it.
      let overlay = document.getElementById('intro-greeting');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'intro-greeting';
        overlay.innerHTML = `
          <div class="bubble">
            <div style="font-size: clamp(22px,4vw,36px); font-weight: 600; letter-spacing: .2px;">Om Swastyastu 🙏🏻</div>
          </div>
        `;
        document.body.appendChild(overlay);
      }
      // Show for a bit longer, then fade (allow time to read)
      requestAnimationFrame(() => {
        setTimeout(() => {
          try { document.documentElement.classList.remove('show-intro'); } catch { }
          overlay.classList.add('hide');
          setTimeout(() => overlay.remove(), 700);
        }, 3500);
      });
      // Ensure flag is set (may already be set by early script)
      try { sessionStorage.setItem('intro_greeted', '1'); } catch { }
      // Hard fallback: in case timers are paused or tab is backgrounded,
      // forcibly remove any lingering overlay after ~2.5s
      setTimeout(() => {
        try {
          const ov = document.getElementById('intro-greeting');
          if (ov) ov.remove();
          document.documentElement.classList.remove('show-intro');
        } catch { }
      }, 6000);
    }
    // If on Home but not first time, ensure no overlay is visible (handles bfcache restores)
    if ((here === 'index.html') && onHomeDom && !firstTime) {
      try {
        document.documentElement.classList.remove('show-intro');
        const ov = document.getElementById('intro-greeting');
        if (ov) { ov.classList.add('hide'); }
      } catch { }
    }
    // Hard guard: ensure overlay never appears off-Home
    if (here !== 'index.html' || !onHomeDom) {
      try {
        document.documentElement.classList.remove('show-intro');
        const stray = document.getElementById('intro-greeting');
        if (stray) stray.remove();
      } catch { }
    }
  } catch { }

  // renderGlobalNav(); // Replaced by Sidebar
  renderSidebar();
  initConnectPageAccordion();
  initConnectPageCarousel();

  function initConnectPageCarousel() {
    const container = document.getElementById('testimonials-container');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');

    if (!container || !prevBtn || !nextBtn) return;

    const updateButtons = () => {
      // 10px buffer for rounding errors
      const isAtStart = container.scrollLeft <= 10;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

      prevBtn.disabled = isAtStart;
      prevBtn.style.opacity = isAtStart ? '0.3' : '1';
      prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

      nextBtn.disabled = isAtEnd;
      nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
      nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
    };

    const scrollAmount = 340;

    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    container.addEventListener('scroll', () => {
      // Debounce slightly if needed, but direct update is usually fine for UI buttons
      requestAnimationFrame(updateButtons);
    });

    // Initial check
    updateButtons();
    // Re-check on window resize
    window.addEventListener('resize', updateButtons);
  }
  // Home: render pinned case studies (blogs with a truthy "is pinned" field)
  if (document.getElementById('home-pinned-grid')) {
    loadHomePinnedCaseStudies().catch(err => console.error('[Home pinned] failed:', err));
  }
  if (document.getElementById('projects-grid-3col')) {
    loadProjectsAndRender().catch(err => {
      console.error('[Builder projects] failed:', err);
      const el = document.getElementById('projects-grid-3col');
      if (el) el.innerHTML = `<p class="text-sm text-red-600">Failed to load projects.</p>`;
    });
  }
  loadBlogsAndRender().catch(err => console.error('[Blogs] failed:', err));
  loadBlogDetail().catch(err => console.error('[Blog detail] failed:', err));
  loadProjectDetail().catch(err => console.error('[Project detail] failed:', err));
  if (currentFilename() === 'index.html') initProjectVideoModals();

  // Re-clamp on resize (debounced via rAF)
  let __clampRaf = 0;
  window.addEventListener('resize', () => {
    if (__clampRaf) return;
    __clampRaf = requestAnimationFrame(() => {
      __clampRaf = 0;
      applyDynamicDescClamps(document);
    });
  });
});

// Footer removed for sidebar layout
