// ==================== Global Navigation Renderer ====================
const NAV_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: (isCurrent = false) => `
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 md:hidden ${isCurrent ? 'text-black' : 'text-neutral-500 group-hover:text-black aria-[current=page]:text-black'}"
           viewBox="0 0 24 24" ${isCurrent ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2h-5v-6h-4v6H5a2 2 0 0 1-2-2v-9.5z"/>
      </svg>
    `
  },
  {
    href: '/blogs',
    label: 'Blogs',
    icon: (isCurrent = false) => `
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 md:hidden ${isCurrent ? 'text-black' : 'text-neutral-500 group-hover:text-black aria-[current=page]:text-black'}"
           viewBox="0 0 24 24" ${isCurrent ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">
        <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM15 2v6h6"/>
      </svg>
    `
  }
];

function currentFilename() {
  try {
    const path = (location.pathname || '/').replace(/\/+$/, ''); // strip trailing slashes
    const segs = path.split('/').filter(Boolean);
    if (segs.length === 0) return 'index.html';

    // Map clean URLs to their source HTML files
    const first = segs[0];
    if (first === 'blogs') {
      // /blogs or /blogs/article/:id
      if (segs[1] === 'article') return 'article.html';
      return 'blogs.html';
    }
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

function renderGlobalNav() {
  const mount = document.getElementById('site-nav');
  if (!mount) return; // page can opt-out by omitting the mount node

  try {
    // Normalize current page; treat article detail as part of Blogs
    const hereRaw = currentFilename();
    const onArticlePage = !!document.getElementById('blog-detail');
    const here = onArticlePage ? 'article.html' : hereRaw;
    const links = NAV_ITEMS.map(item => {
      const isCurrent = (
        (item.href === '/' && here === 'index.html') ||
        (item.href === '/blogs' && (here === 'blogs.html' || here === 'article.html'))
      );
      const currentAttr = isCurrent ? 'aria-current="page"' : '';
      return (
        `<a role="tab" href="${item.href}" ${currentAttr}
            class="group flex-none px-0 md:px-0 grid place-items-center [grid-auto-flow:row] md:[grid-auto-flow:column] gap-1 md:gap-0 text-center font-normal">
          ${item.icon(isCurrent)}
          <span class="px-4 sm:px-4 py-0.5 sm:py-1 rounded-full transition-colors text-neutral-500 md:text-neutral-500 aria-[current=page]:text-black group-hover:bg-zinc-100 group-hover:text-black text-sm md:text-l nav-underline">${item.label}</span>
        </a>`
      );
    }).join('');

    const connectActive = (here === 'connect.html');
    const connectAvatar = (
      '<a href="/connect" class="group inline-flex items-center justify-center p-1.5 rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] ring-2 '
      + (connectActive ? 'ring-green-600' : 'ring-white') + ' overflow-hidden transition-all duration-200 hover:bg-zinc-50 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]" aria-label="Connect" id="connect-avatar">'
      + '<img src="assets/profilePinkGreen.png" alt="" class="h-full w-full object-cover rounded-full ring-2 ' + (connectActive ? 'ring-black' : 'ring-transparent') + ' ring-inset transition-transform duration-200 group-hover:scale-[1.03]"/>'
      + '<span class="sr-only">Connect</span>'
      + '</a>'
    );

    mount.innerHTML = (
      '<div class="fixed inset-x-0 z-50 bottom-6 md:bottom-auto md:top-6">'
      + '<div class="w-full flex justify-center">'
      + '<div class="flex items-center gap-2 sm:gap-3 nav-wrap">'
      + '<fieldset role="tablist" aria-label="Primary navigation" id="primary-nav"'
      + '  class="w-auto max-w-[94vw] sm:max-w-[88vw] md:w-[180px] flex items-center justify-center rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-3 sm:px-4 py-3 sm:py-3.5 md:px-4 md:py-4 gap-2 sm:gap-3 md:gap-2">'
      + '<legend class="sr-only">Navigation</legend>'
      + links
      + '</fieldset>'
      + connectAvatar
      + '</div>'
      + '</div>'
      + '</div>'
    );

    // Ensure full-width fading gradient backdrop behind nav for separation
    try {
      let nb = document.getElementById('nav-backdrop');
      if (!nb) {
        nb = document.createElement('div');
        nb.id = 'nav-backdrop';
        document.body.appendChild(nb);
      }
    } catch {}

    // Intercept clicks on current page to avoid reload and give feedback
    const intercept = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const dest = href.split('#')[0];
      // Normalize destination to our internal filename mapping
      const toPage = (path = '') => {
        try {
          const p = path.replace(/[?#].*$/, '').replace(/\/+$/, '');
          if (!p || p === '/') return 'index.html';
          if (/^(https?:)?\/\//.test(p)) {
            const u = new URL(p, location.origin);
            return toPage(u.pathname);
          }
          const segs = p.split('/').filter(Boolean);
          const first = segs[0];
          if (first === 'blogs') {
            if (segs[1] === 'article') return 'article.html';
            return 'blogs.html';
          }
          if (first === 'connect') return 'connect.html';
          if (first === 'showcase') return 'showcase.html';
          if (p.endsWith('.html')) return p.split('/').pop();
          return 'index.html';
        } catch { return 'index.html'; }
      };
      const samePage = dest && ((onArticlePage ? 'article.html' : here) === toPage(dest));
      // Only block when this click would reload the same page,
      // or when clicking the connect avatar while already on connect.html
      const isConnectAvatar = (here === 'connect.html') && (a.id === 'connect-avatar' || /(?:connect\.html|\/connect)$/.test(dest));
      if (!(samePage || isConnectAvatar)) return;
      e.preventDefault();
      // If already on Blogs and the Blogs tab is clicked, reset filters to ALL
      try {
        // If on Blogs index and clicking Blogs, reset filters; if on article and clicking Blogs, allow navigation back to /blogs
        if ((here === 'blogs.html' || onArticlePage) && /(?:blogs\.html|\/blogs)$/.test(dest)) {
          if (window.__blogFilters && typeof window.__blogFilters.setActive === 'function') {
            window.__blogFilters.setActive('ALL');
            // Clean the URL params for a canonical ALL state
            const url = '/blogs' + (location.hash || '');
            history.replaceState(null, '', url);
          }
        }
      } catch {}
      const fs = mount.querySelector('#primary-nav');
      if (fs) {
        fs.classList.remove('shake-x');
        void fs.offsetWidth; // restart animation
        fs.classList.add('shake-x');
        setTimeout(() => fs.classList.remove('shake-x'), 520);
      }
      // Also shake the avatar for extra feedback
      const avatar = mount.querySelector('#connect-avatar');
      if (avatar) {
        avatar.classList.remove('shake-x');
        void avatar.offsetWidth;
        avatar.classList.add('shake-x');
        setTimeout(() => avatar.classList.remove('shake-x'), 520);
      }
      let toast = document.getElementById('already-here-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'already-here-toast';
        toast.className = 'ios-toast';
        toast.textContent = "You're already here";
        document.body.appendChild(toast);
      }
      // Position toast relative to nav: below when nav on top; above when nav at bottom
      const navWrap = mount.querySelector('.nav-wrap');
      const rect = (navWrap || fs).getBoundingClientRect();
      toast.style.bottom = 'auto';
      toast.style.top = '0px';
      toast.style.left = (rect.left + rect.width / 2) + 'px';
      toast.style.transform = 'translateX(-50%)';
      toast.classList.remove('hide');
      // Ensure in DOM then measure height
      requestAnimationFrame(() => {
        const tRect = toast.getBoundingClientRect();
        const isTopNav = window.innerWidth >= 768; // nav at top on md+
        const top = isTopNav ? (rect.bottom + 10) : (rect.top - tRect.height - 10);
        toast.style.top = Math.max(10, top) + 'px';
        toast.classList.add('show');
        setTimeout(() => { toast.classList.add('hide'); toast.classList.remove('show'); }, 1400);
      });
    };
    mount.addEventListener('click', intercept);
    // Make avatar and capsule responsive (avoid overflow on very small widths)
    try {
      const fs = mount.querySelector('#primary-nav');
      const avatarEl = mount.querySelector('#connect-avatar');
      const wrap = mount.querySelector('.nav-wrap');
      const syncNavSizes = () => {
        if (!fs || !avatarEl || !wrap) return;
        // Avatar height follows capsule height (use offsetHeight to ignore transforms)
        const h = Math.max(40, Math.round(fs.offsetHeight || fs.getBoundingClientRect().height));
        avatarEl.style.height = h + 'px';
        avatarEl.style.width = h + 'px';
        // Capsule max width = viewport - avatar - gap - small margin buffer
        const gap = parseFloat(getComputedStyle(wrap).columnGap) || 8;
        const buffer = 16; // small side breathing room
        const avail = Math.floor(window.innerWidth - avatarEl.getBoundingClientRect().width - gap - buffer);
        const min = 160;
        const cap = window.innerWidth >= 768 ? 180 : 240;
        fs.style.maxWidth = Math.min(cap, Math.max(min, avail)) + 'px';
      };
      syncNavSizes();
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(syncNavSizes);
        ro.observe(fs);
      }
      window.addEventListener('resize', syncNavSizes);
    } catch {}

    // Subtle 3D hover tilt for nav capsule (desktop only, reduced motion aware)
    try {
      const fs = mount.querySelector('#primary-nav');
      const wrap = mount.querySelector('.nav-wrap');
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pointerFine = window.matchMedia && window.matchMedia('(hover:hover)').matches;
      if (fs && wrap && !prefersReduced && pointerFine) {
        wrap.style.perspective = '900px';
        fs.style.transformStyle = 'preserve-3d';
        fs.style.willChange = 'transform';
        let raf = 0;
        const max = 9; // slightly stronger tilt
        const onMove = (e) => {
          if (window.innerWidth < 768) return; // disable on mobile
          const r = fs.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const dx = (x - r.width / 2) / (r.width / 2);
          const dy = (y - r.height / 2) / (r.height / 2);
          const rx = -(dy * max);
          const ry = dx * max;
          if (!raf) {
            raf = requestAnimationFrame(() => {
              raf = 0;
              const intensity = Math.min(1, Math.hypot(dx, dy));
              fs.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
              fs.style.boxShadow = `0 10px 28px rgba(0,0,0,${(0.14 + 0.06 * intensity).toFixed(3)})`;
            });
          }
        };
        const onEnter = () => {
          if (window.innerWidth < 768) return;
          fs.style.transition = 'transform 120ms ease-out, box-shadow 150ms ease-out';
        };
        const onLeave = () => {
          fs.style.transition = 'transform 220ms ease, box-shadow 200ms ease';
          fs.style.transform = 'rotateX(0deg) rotateY(0deg)';
          fs.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
        };
        fs.addEventListener('mousemove', onMove);
        fs.addEventListener('mouseenter', onEnter);
        fs.addEventListener('mouseleave', onLeave);
      }
    } catch {}

    // Subtle magnetic translation for the whole nav capsule (desktop)
    try {
      const fs = mount.querySelector('#primary-nav');
      const wrap = mount.querySelector('.nav-wrap');
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pointerFine = window.matchMedia && window.matchMedia('(hover:hover)').matches;
      if (fs && wrap && !prefersReduced && pointerFine) {
        let raf2 = 0;
        let hovering = false;
        const maxT = 1; // max 1px translate (very subtle)
        // augment existing handlers if present
        const onEnter = () => { if (window.innerWidth < 768) return; hovering = true; };
        const onLeave = () => { hovering = false; };
        fs.addEventListener('mouseenter', onEnter);
        fs.addEventListener('mouseleave', onLeave);

        const onMag = (e) => {
          if (hovering) return; // tilt handler will compose translation itself
          if (raf2) return;
          raf2 = requestAnimationFrame(() => {
            raf2 = 0;
            const r = fs.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const radius = 120;
            if (dist < radius && window.innerWidth >= 768) {
              const t = 1 - dist / radius;
              const mag = maxT * t;
              const inv = dist === 0 ? 0 : (mag / dist);
              const tx = dx * inv;
              const ty = dy * inv;
              fs.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
            } else {
              fs.style.transform = '';
            }
          });
        };
        window.addEventListener('mousemove', onMag, { passive: true });
      }
    } catch {}

  } catch (e) {
    console.error('[nav] render failed, using fallback', e);
    const onConnect = (currentFilename() === 'connect.html');
    mount.innerHTML = `
      <div class="fixed inset-x-0 z-50 bottom-[calc(env(safe-area-inset-bottom)+36px)] md:bottom-auto md:top-6">
        <div class="w-full flex justify-center">
          <div class="flex items-center gap-2 nav-wrap">
            <nav id="primary-nav-fallback" class="w-auto max-w-[94vw] sm:max-w-[88vw] md:w-[180px] flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-3 sm:px-4 py-3 sm:py-3.5 md:px-4 md:py-4">
              <a href="/" class="px-4 sm:px-4 py-0.5 sm:py-1 rounded-full text-sm text-neutral-600 hover:bg-zinc-100 transition-colors nav-underline">Home</a>
              <a href="/blogs" class="px-4 sm:px-4 py-0.5 sm:py-1 rounded-full text-sm text-neutral-600 hover:bg-zinc-100 transition-colors nav-underline">Blogs</a>
            </nav>
            <a href="/connect" class="group inline-flex items-center justify-center p-1.5 rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] ring-2 ${onConnect ? 'ring-green-600' : 'ring-white'} overflow-hidden transition-all duration-200 hover:bg-zinc-50 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]" aria-label="Connect" id="connect-avatar-fallback">
                <img src="assets/profilePinkGreen.png" alt="" class="h-full w-full object-cover rounded-full ring-2 ring-inset ring-transparent transition-transform duration-200 group-hover:scale-[1.03]"/>
                <span class="sr-only">Connect</span>
            </a>
          </div>
        </div>
      </div>`;

    // Ensure gradient backdrop exists in fallback too
    try {
      let nb = document.getElementById('nav-backdrop');
      if (!nb) {
        nb = document.createElement('div');
        nb.id = 'nav-backdrop';
        document.body.appendChild(nb);
      }
    } catch {}

    // Fallback: responsive sizing
    try {
      const fs = mount.querySelector('#primary-nav-fallback');
      const avatarEl = mount.querySelector('#connect-avatar-fallback');
      const wrap = mount.querySelector('.nav-wrap');
      const syncNavSizes = () => {
        if (!fs || !avatarEl || !wrap) return;
        const h = Math.max(40, Math.round(fs.offsetHeight || fs.getBoundingClientRect().height));
        avatarEl.style.height = h + 'px';
        avatarEl.style.width = h + 'px';
        const gap = parseFloat(getComputedStyle(wrap).columnGap) || 8;
        const buffer = 16;
        const avail = Math.floor(window.innerWidth - avatarEl.getBoundingClientRect().width - gap - buffer);
        const min = 160;
        const cap = window.innerWidth >= 768 ? 180 : 240;
        fs.style.maxWidth = Math.min(cap, Math.max(min, avail)) + 'px';
      };
      syncNavSizes();
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(syncNavSizes);
        ro.observe(fs);
      }
      window.addEventListener('resize', syncNavSizes);
      // Fallback tilt (desktop)
      try {
        const fsFb = mount.querySelector('#primary-nav-fallback');
        const wrapFb = mount.querySelector('.nav-wrap');
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointerFine = window.matchMedia && window.matchMedia('(hover:hover)').matches;
        if (fsFb && wrapFb && !prefersReduced && pointerFine) {
          wrapFb.style.perspective = '900px';
          fsFb.style.transformStyle = 'preserve-3d';
          fsFb.style.willChange = 'transform';
          let raf = 0;
          const max = 9;
          const onMove = (e) => {
            if (window.innerWidth < 768) return;
            const r = fsFb.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const dx = (x - r.width / 2) / (r.width / 2);
            const dy = (y - r.height / 2) / (r.height / 2);
            const rx = -(dy * max);
            const ry = dx * max;
            if (!raf) {
              raf = requestAnimationFrame(() => {
                raf = 0;
                const intensity = Math.min(1, Math.hypot(dx, dy));
                fsFb.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
                fsFb.style.boxShadow = `0 10px 28px rgba(0,0,0,${(0.14 + 0.06 * intensity).toFixed(3)})`;
              });
            }
          };
          const onEnter = () => { if (window.innerWidth < 768) return; fsFb.style.transition = 'transform 120ms ease-out, box-shadow 150ms ease-out'; };
          const onLeave = () => { fsFb.style.transition = 'transform 220ms ease, box-shadow 200ms ease'; fsFb.style.transform = 'rotateX(0deg) rotateY(0deg)'; fsFb.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'; };
          fsFb.addEventListener('mousemove', onMove);
          fsFb.addEventListener('mouseenter', onEnter);
          fsFb.addEventListener('mouseleave', onLeave);
      }
    } catch {}

    // Fallback: subtle magnetic translation for nav capsule
    try {
      const fsFb = mount.querySelector('#primary-nav-fallback');
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pointerFine = window.matchMedia && window.matchMedia('(hover:hover)').matches;
      if (fsFb && !prefersReduced && pointerFine) {
        let raf2 = 0;
        let hovering = false;
        const maxT = 1; // subtler
        fsFb.addEventListener('mouseenter', () => { if (window.innerWidth < 768) return; hovering = true; });
        fsFb.addEventListener('mouseleave', () => { hovering = false; });
        const onMag = (e) => {
          if (hovering) return;
          if (raf2) return;
          raf2 = requestAnimationFrame(() => {
            raf2 = 0;
            const r = fsFb.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            const radius = 120;
            if (dist < radius && window.innerWidth >= 768) {
              const t = 1 - dist / radius;
              const mag = maxT * t;
              const inv = dist === 0 ? 0 : (mag / dist);
              const tx = dx * inv;
              const ty = dy * inv;
              fsFb.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
            } else {
              fsFb.style.transform = '';
            }
          });
        };
        window.addEventListener('mousemove', onMag, { passive: true });
      }
    } catch {}

    // Fallback: intercept clicks on current link
    try {
      const here = currentFilename();
      const intercept = (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        const dest = href.split('#')[0];
        const samePage = dest && here === dest;
        const isConnectAvatar = (here === 'connect.html') && (a.id === 'connect-avatar-fallback' || /connect\.html$/.test(dest));
        if (!(samePage || isConnectAvatar)) return;
        e.preventDefault();
        const fs = mount.querySelector('#primary-nav-fallback');
        if (fs) {
          fs.classList.remove('shake-x');
          void fs.offsetWidth;
          fs.classList.add('shake-x');
          setTimeout(() => fs.classList.remove('shake-x'), 520);
        }
        const avatar = mount.querySelector('#connect-avatar-fallback');
        if (avatar) {
          avatar.classList.remove('shake-x');
          void avatar.offsetWidth;
          avatar.classList.add('shake-x');
          setTimeout(() => avatar.classList.remove('shake-x'), 520);
        }
        let toast = document.getElementById('already-here-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'already-here-toast';
          toast.className = 'ios-toast';
          toast.textContent = "You're already here";
          document.body.appendChild(toast);
        }
        // Position relative to bottom nav (fallback is identical layout)
        const navWrap = mount.querySelector('.nav-wrap');
        const rect = (navWrap || fs).getBoundingClientRect();
        toast.style.bottom = 'auto';
        toast.style.top = '0px';
        toast.style.left = (rect.left + rect.width / 2) + 'px';
        toast.style.transform = 'translateX(-50%)';
        toast.classList.remove('hide');
        requestAnimationFrame(() => {
          const tRect = toast.getBoundingClientRect();
          // Fallback nav is also bottom on mobile and top on desktop; mirror logic
          const isTopNav = window.innerWidth >= 768;
          const top = isTopNav ? (rect.bottom + 10) : (rect.top - tRect.height - 10);
          toast.style.top = Math.max(10, top) + 'px';
          toast.classList.add('show');
          setTimeout(() => { toast.classList.add('hide'); toast.classList.remove('show'); }, 1400);
        });
      };
      mount.addEventListener('click', intercept);
    } catch {}
    } catch {}
  }
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

// Helpers to render richer article content from plain text inputs
function normalizeArticleHtml(input) {
  let s = (input || '').toString();
  if (!s) return '';

  // 1) Unescape specifically-escaped <img> tags (e.g., &lt;img ...&gt;)
  s = s.replace(/&lt;(img\b[^>]*?)\/?&gt;/gi, '<$1>');
  s = s.replace(/&lt;(img\b[^>]*?)\s*\/?&gt;/gi, '<$1>');

  // 2) Convert plain text to simple HTML blocks and images when no tags present
  const hasHtml = /<[^>]+>/.test(s);
  if (!hasHtml) {
    // Markdown image: ![alt](url)
    s = s.replace(/!\[(.*?)\]\((https?:[^\s)]+)\)/g, (_m, alt, url) => `<img src="${url}" alt="${alt || ''}">`);
    // Bare image URLs -> <img>
    s = s.replace(/(https?:\/\/[^\s)]+\.(?:png|jpe?g|gif|webp|svg|avif)(?:\?[^\s)]+)?)/gi, (m) => `<img src="${m}" alt="">`);
    // Paragraphs: split on blank lines; single newlines become <br>
    const parts = s.split(/\n{2,}/).map(t => t.trim()).filter(Boolean);
    if (parts.length) s = parts.map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
  }

  // 3) Enforce reasonable image sizing on desktop for any <img> tags
  // Add or extend class to include responsive constraints (no forced corner radius)
  const injectImgClasses = (attrs = '') => {
    const needed = 'mx-auto block max-w-full h-auto md:max-h-[40vh] object-contain';
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

  // Removed forced 40px border radius to avoid clipping issues on resized images

  return s;
}

function blogRowHTML(b) {
  const firstTag = (b.tags && b.tags[0]) ? b.tags[0] : 'General';
  function typeBadgeForTag(tag) {
    const t = (tag || '').toLowerCase();
    if (t.includes('case')) return 'assets/caseStudyGradient.jpeg';
    return 'assets/BG%20Placeholder.avif';
  }
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

  const BLOG_BASE = 'https://wirawibisana.com';
  const q = b.slug ? `slug=${encodeURIComponent(b.slug)}` : `id=${encodeURIComponent(b.id)}`;
  return `
    <article class="py-3 md:py-6">
      <a href="${BLOG_BASE}/article.html?${q}" class="group relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 rounded-xl px-3 py-2 md:px-3 md:py-3 transition-colors duration-200 hover:bg-zinc-200/60 hover:ring-1 hover:ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:bg-zinc-200/50" data-card="blog-row">
        <div class="relative z-10 min-w-0 space-y-1 md:space-y-2">
          <p class="text-xs md:text-sm text-zinc-600">
            ${author}
            <img src="${typeBadgeForTag(firstTag)}" alt="${firstTag} type"
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
  const BLOG_BASE = 'https://wirawibisana.com';
  const q = b.slug ? `slug=${encodeURIComponent(b.slug)}` : `id=${encodeURIComponent(b.id)}`;
  return `
    <a href="${BLOG_BASE}/article.html?${q}" aria-label="Read case study: ${b.title}"
       class="group h-full flex flex-col overflow-hidden rounded-2xl ring-1 ring-zinc-200/70 bg-white/60 hover:ring-zinc-300 hover:bg-white transition-shadow shadow-sm hover:shadow-md" data-card="case-card">
      <div class="relative overflow-hidden">${img}</div>
      <div class="p-3 md:p-4 flex-1 flex flex-col gap-2">
        <h3 class="text-base md:text-lg leading-snug text-black font-semibold line-clamp-2" data-title>${b.title}</h3>
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

// ==================== BLOG DETAIL SUPPORT ====================
async function loadBlogDetail() {
  const root = document.getElementById('blog-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  let slug = params.get('slug');
  let id = params.get('id');
  if (!slug && !id) {
    try {
      const segs = (location.pathname || '').split('/').filter(Boolean);
      const idx = segs.findIndex(s => s === 'blogs');
      if (idx !== -1 && segs[idx + 1] === 'article' && segs[idx + 2]) {
        slug = segs[idx + 2];
      }
    } catch {}
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
    } catch {}
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

  // Assemble final body: optional raw Html article first, then gallery, then chapters
  const bodyHtml = `${normalizeArticleHtml(htmlContent) || ''}${galleryHtml}${chaptersHtml}` || (b.description ? `<p>${b.description}</p>` : '<p></p>');

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
    ['skill1','skill2','skill3','Skill 1','Skill 2','Skill 3'].forEach(k => {
      const v = safeText(skillsList[k]);
      if (v) skills.push(...splitSkills(v));
    });
  }
  // Fallbacks to top-level fields
  if (!skills.length) {
    ['skill1','skill2','skill3','Skill 1','Skill 2','Skill 3'].forEach(k => {
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
              <a href="/blogs" id="back-button" aria-label="Back to Blogs"
                 class="back-floating z-50 inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-lg backdrop-saturate-150 border border-zinc-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)] text-black">
                <img src="assets/Chevron%20Icon.png" alt="" class="w-5 h-5" draggable="false"/>
              </a>
              <p class="text-sm text-zinc-400">${author}</p>
              <h1 class="text-3xl md:text-4xl font-semibold">${b.title}</h1>
              ${b.description ? `<div class="mb-1"><p class="text-zinc-400 text-lg leading-relaxed">${b.description}</p><div class="mt-2 w-1/4 border-b border-zinc-200/80"></div></div>` : ''}
              ${(myRole || team || timeline) ? `
                <div class="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  ${myRole ? `<div class="text-zinc-600 inline-flex items-center gap-1">${svgIcon('role','text-zinc-400')}<span class="text-zinc-400">My Role:</span> <span class="text-zinc-800">${myRole}</span></div>` : ''}
                  ${team ? `<div class="text-zinc-600 relative inline-flex items-center gap-1 group">
                    ${svgIcon('team','text-zinc-400')}<span class="text-zinc-400">Team:</span>
                    <span class="underline underline-offset-4 decoration-zinc-400 group-hover:decoration-black cursor-help text-zinc-800">${team}</span>
                    ${teamComp ? `<span role="tooltip" class="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[min(90vw,260px)] -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                      <span class="block rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 shadow-md">${teamComp}</span>
                    </span>` : ''}
                  </div>` : ''}
                  ${timeline ? `<div class="text-zinc-600 inline-flex items-center gap-1">${svgIcon('timeline','text-zinc-400')}<span class="text-zinc-400">Timeline:</span> <span class="text-zinc-800">${timeline}</span></div>` : ''}
                </div>
              ` : ''}
              ${skills && skills.length ? `<div class="mt-2 flex flex-wrap items-center gap-2">${svgIcon('skills','text-zinc-400')} ${skills.map(s => `<span class="inline-flex items-center rounded-full border border-zinc-300/70 bg-white/80 px-2 py-0.5 text-xs text-zinc-700">${s}</span>`).join(' ')}</div>` : ''}
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
    const chapterIds = ['overview','background','empathize','desk-research','user-interview','ideate','prototype','final-result','reflections'];
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
      } catch {}
    };
    const syncBackLeft = () => {
      try {
        // Align left edge to the article text column (use first header text as anchor)
        const anchor = document.querySelector('#blog-detail header h1')
          || document.querySelector('#blog-detail header p')
          || document.querySelector('#blog-detail article')
          || document.querySelector('#blog-detail');
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        // Fixed positioning uses viewport; rect.left is viewport-relative
        backBtn.style.left = Math.max(8, Math.floor(rect.left)) + 'px';
      } catch {}
    };
    syncBackSize();
    syncBackLeft();
    const fs = document.getElementById('primary-nav') || document.getElementById('primary-nav-fallback');
    if (fs && window.ResizeObserver) {
      const ro = new ResizeObserver(syncBackSize);
      ro.observe(fs);
    }
    const onResize = () => { syncBackSize(); syncBackLeft(); };
    window.addEventListener('resize', onResize);
    // Re-align after fonts/layout settle
    setTimeout(syncBackLeft, 50);
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
  } catch {}
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

function renderBlogsList(list) {
  const el = document.getElementById('blogs-list');
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
        class="rounded-full px-3 py-1 text-sm transition-colors border focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-100 ${selected ? 'bg-black text-white border-black hover:bg-black/90' : 'bg-white/70 text-zinc-400 border-zinc-300/60 hover:bg-zinc-100 hover:text-black hover:border-zinc-400'}">
        ${label}
      </button>`;
    c.innerHTML = [chip('ALL', state.active === 'ALL'), ...tags.map(t => chip(t, state.active === t))].join('');
  };
  const resolveTag = (tag) => {
    const want = canon(tag);
    if (!want || want === 'all') return 'ALL';
    // exact match first
    let match = tags.find(t => canon(t) === want);
    if (match) return match;
    // then partial match (contains)
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
  // Expose global controls for navbar and deep links
  window.__blogFilters = {
    setActive: applyFilter,
    getActive: () => state.active,
  };
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
  // Filters skeleton (rounded chips) while loading
  if (filtersEl) {
    const filterSkel = () => `
      <div class="flex flex-wrap items-center gap-2 animate-pulse" aria-busy="true">
        <div class="h-7 w-20 bg-zinc-200 rounded-full"></div>
        <div class="h-7 w-12 bg-zinc-200 rounded-full"></div>
        <div class="h-7 w-16 bg-zinc-200 rounded-full"></div>
        <div class="h-7 w-24 bg-zinc-200 rounded-full"></div>
        <div class="h-7 w-14 bg-zinc-200 rounded-full"></div>
        <div class="h-7 w-10 bg-zinc-200 rounded-full"></div>
      </div>`;
    filtersEl.innerHTML = filterSkel();
    filtersEl.setAttribute('aria-busy', 'true');
  }
  // Render skeleton rows to match list layout while loading
  const skel = () => `
    <div class="py-3 md:py-6">
      <div class="relative grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 animate-pulse" aria-busy="true">
        <div class="min-w-0 space-y-2">
          <div class="h-3.5 bg-zinc-200 rounded w-40"></div>
          <div class="h-6 bg-zinc-200 rounded w-4/5"></div>
          <div class="hidden md:block h-4 bg-zinc-200 rounded w-3/5"></div>
          <div class="h-3 bg-zinc-200 rounded w-24"></div>
        </div>
        <div class="block md:hidden w-24 h-24 bg-zinc-200 rounded-md"></div>
        <div class="hidden md:block w-[320px] h-40 bg-zinc-200 rounded-md"></div>
      </div>
    </div>
    <hr class="border-zinc-200"/>
  `;
  listEl.innerHTML = skel() + skel() + skel() + skel() + skel();
  listEl.style.minHeight = '480px';
  listEl.setAttribute('aria-busy', 'true');
  await new Promise(res => requestAnimationFrame(() => setTimeout(res, 150)));
  // Be permissive with params; avoid sort keys that may be rejected by Builder when fields contain spaces
  try {
    const raw = await fetchBuilder('blogs', { limit: 100, includeUnpublished: true });
    console.log('[blogs raw]', raw);
    const normalized = raw.map(normalizeBlog).sort((a, b) => (new Date(b.date || 0)) - (new Date(a.date || 0)));
    if (!normalized.length) {
      if (filtersEl) { filtersEl.innerHTML = ''; filtersEl.removeAttribute('aria-busy'); }
      listEl.innerHTML = `<div class="px-6 py-8 text-zinc-400 space-y-2">
        <p>No blog posts found.</p>
        <ul class="list-disc pl-5 text-sm">
          <li>Make sure your entry is <strong>Published</strong> in Builder (not a Draft).</li>
          <li>Confirm the model name is <code>blogs</code> and the model ID matches.</li>
          <li>Fields used: <em>Thumbnail</em>, <em>Blog title</em>, <em>Blog description</em>, <em>Blog date</em>, <em>Blog tags</em>.</li>
        </ul>
      </div>`;
      return;
    }
    if (filtersEl) { filtersEl.removeAttribute('aria-busy'); }
    // Initialize filters and optionally apply URL-provided tag
    renderBlogFilters(normalized);
    const params = new URLSearchParams(location.search);
    const initialTag = params.get('tag');
    if (window.__blogFilters && typeof window.__blogFilters.setActive === 'function') {
      window.__blogFilters.setActive(initialTag || 'ALL');
    } else {
      renderBlogsList(normalized);
    }
  } catch (e) {
    console.error('[blogs] fetch failed', e);
    if (filtersEl) { filtersEl.innerHTML = ''; filtersEl.removeAttribute('aria-busy'); }
    listEl.innerHTML = `<div class="px-6 py-8 text-red-600">Failed to load blogs.</div>`;
  } finally {
    listEl.style.minHeight = '';
    listEl.removeAttribute('aria-busy');
  }
}

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
    'ring-1 ring-zinc-200/70 bg-white/60 hover:ring-zinc-300 hover:bg-white',
    'transition-shadow shadow-sm hover:shadow-md',
    'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white'
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
  #blog-detail { --font-serif: var(--font-sans); }
  #blog-detail h1, #blog-detail h2, #blog-detail h3,
  #blog-detail h4, #blog-detail h5, #blog-detail h6 {
    font-family: 'Roboto', ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
    letter-spacing: .1px;
  }
  #blog-detail .prose,
  #blog-detail .prose p,
  #blog-detail .prose li,
  #blog-detail .prose span,
  #blog-detail .prose div {
    font-family: 'Roboto', ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
  }
  /* Ensure any Tailwind font-serif utility inside article is neutralized */
  #blog-detail .font-serif { font-family: 'Roboto', ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif !important; }

  /* TOC: floating at right edge on md+; right-aligned links */
  @media (min-width: 768px) {
    #toc-floating { position: fixed; top: 50%; transform: translateY(-50%); right: 24px; width: 260px; text-align: right; }
  }
  #toc-floating a.toc-active, #toc a.toc-active { color: #000; font-weight: 600; }
`;
document.head.appendChild(style);

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
          try { document.documentElement.classList.remove('show-intro'); } catch {}
          overlay.classList.add('hide');
          setTimeout(() => overlay.remove(), 700);
        }, 2000);
      });
      // Ensure flag is set (may already be set by early script)
      try { sessionStorage.setItem('intro_greeted', '1'); } catch {}
      // Hard fallback: in case timers are paused or tab is backgrounded,
      // forcibly remove any lingering overlay after ~2.5s
      setTimeout(() => {
        try {
          const ov = document.getElementById('intro-greeting');
          if (ov) ov.remove();
          document.documentElement.classList.remove('show-intro');
        } catch {}
      }, 4500);
    }
    // If on Home but not first time, ensure no overlay is visible (handles bfcache restores)
    if ((here === 'index.html') && onHomeDom && !firstTime) {
      try {
        document.documentElement.classList.remove('show-intro');
        const ov = document.getElementById('intro-greeting');
        if (ov) { ov.classList.add('hide'); }
      } catch {}
    }
    // Hard guard: ensure overlay never appears off-Home
    if (here !== 'index.html' || !onHomeDom) {
      try {
        document.documentElement.classList.remove('show-intro');
        const stray = document.getElementById('intro-greeting');
        if (stray) stray.remove();
      } catch {}
    }
  } catch {}

  renderGlobalNav();
  initConnectPageAccordion();
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
  loadProjectDetail();
  loadBlogsAndRender();
  loadBlogDetail();

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

// Inject footer
document.addEventListener("DOMContentLoaded", function () {
  const footer = `
    <footer class="w-full border-t border-zinc-200 mt-12 bg-zinc-200/40">
      <div class="mx-auto w-full max-w-[1100px] px-6 sm:px-8 md:px-12 lg:px-24 xl:px-28 2xl:px-32 pt-6 pb-28 md:pt-8 md:pb-32">
        <p class="text-lg md:text-xl text-black mb-4">
          I'm available to chat and collaborate
        </p>
        <nav aria-label="Connect links" class="flex flex-wrap gap-4 text-base md:text-lg text-zinc-500">
          <a href="mailto:hello@wirawibisana.com" class="underline-offset-4 hover:underline hover:text-black">Contact</a>
          <a href="https://www.linkedin.com/in/wira29/" target="_blank" rel="noopener" class="underline-offset-4 hover:underline hover:text-black">LinkedIn</a>
          <a href="https://www.threads.com/@wira.wibisana" target="_blank" rel="noopener" class="underline-offset-4 hover:underline hover:text-black">Threads</a>
          <a href="https://github.com/wasabi-atm" target="_blank" rel="noopener" class="underline-offset-4 hover:underline hover:text-black">GitHub</a>
        </nav>
      </div>
    </footer>
  `;

  // Append footer to body
  document.body.insertAdjacentHTML("beforeend", footer);
});
