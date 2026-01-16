
import { fetchBuilder } from '../api.js';
import { normalizeBlog } from './blog.js';
import { formatBlogDate, formatBlogDateShort, wordsPerMinuteEstimate } from '../utils.js';
import { openLightbox } from '../components/lightbox.js';

// Helper: Rich Text Normalizer (Logic recovered from app.js.bak)
// Note: Styles are now in src/input.css to be cleaner.
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

function enhanceArticleImages(scope) {
    const imgs = scope.querySelectorAll('img');
    imgs.forEach((img) => {
        if (img.closest('.img-skel')) return;
        const wrap = document.createElement('div');
        wrap.className = 'img-skel loading';
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

export async function loadProjectDetail() {
    const root = document.getElementById('project-detail') || document.getElementById('blog-detail');
    if (!root) return;

    const params = new URLSearchParams(location.search);
    let slug = params.get('slug');
    let id = params.get('id');

    // Fallback: parse from pathname
    if (!slug && !id) {
        try {
            const parts = location.pathname.split('/').filter(Boolean);
            if (parts.length > 1) slug = parts[parts.length - 1];
        } catch { }
    }

    if (!slug && !id) {
        // If no slug/id, we check if there's a demo meta tag, else we error.
        if (!document.querySelector('meta[data-demo]'))
            root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Missing slug or id.</p>`;
        return;
    }

    let rows = [];
    try {
        if (slug) rows = await fetchBuilder('blogs', { limit: 1, 'query.data.slug': slug });
        if ((!rows || !rows.length) && id) rows = await fetchBuilder('blogs', { limit: 1, id: id });
        if (!rows || !rows.length) {
            // Deep search
            const all = await fetchBuilder('blogs', { limit: 200, includeUnpublished: true });
            if (slug) rows = all.filter(r => (r.data.slug || '').toString().toLowerCase() === slug.toLowerCase());
            else if (id) rows = all.filter(r => r.id === id);
        }
    } catch (e) {
        console.error(e);
    }

    if (!rows || !rows.length) {
        root.innerHTML = `<p class="px-6 py-8 text-zinc-600">Article not found.</p>`;
        return;
    }

    const raw = rows[0];
    const b = normalizeBlog(raw);
    const d = raw?.data || {};

    // Extract richer content if present
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

        const toCamel = (s = '') => s.toString().toLowerCase().replace(/[\s_-]+([a-z0-9])/g, (_m, c) => c.toUpperCase());
        const toPascal = (s = '') => { const c = toCamel(s); return c ? c[0].toUpperCase() + c.slice(1) : c; };

        const labelLower = (label || '').toString().toLowerCase();
        const fromLabelNoSpaces = (label || '').toString().replace(/\s+/g, '');
        const fromIdNoHyphen = (keyId || '').toString().replace(/[-_]+/g, ' ');

        const variants = [
            label, labelLower, fromLabelNoSpaces,
            labelLower.replace(/\s+/g, '-'), labelLower.replace(/\s+/g, '_'),
            toCamel(label), toPascal(label),
            keyId, fromIdNoHyphen, toCamel(fromIdNoHyphen), toPascal(fromIdNoHyphen),
            fromIdNoHyphen.replace(/\s+/g, ''), fromIdNoHyphen.replace(/\s+/g, '_'), fromIdNoHyphen.replace(/\s+/g, '-'),
        ].filter(Boolean);

        let raw = '';
        for (const k of variants) {
            if (Object.prototype.hasOwnProperty.call(contentItem, k) && contentItem[k]) {
                raw = contentItem[k];
                break;
            }
        }
        if (!raw) return '';

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

    const safeText = (v) => {
        if (!v) return '';
        if (typeof v === 'string') return v.trim();
        if (typeof v === 'object') return (v.text || v.html || v.value || '').toString().trim();
        return '';
    };

    const myRole = safeText(d.myRole || d.role || d['My Role']);
    const team = safeText(d.team || d['Team']);
    const timeline = safeText(d.timeline || d['Timeline']);

    // Skills
    const splitSkills = (s) => (s || '').toString().split(/\s*[-,]\s+|\n+/).map(x => x.trim()).filter(Boolean);
    let skills = [];
    if (Array.isArray(d.skills)) d.skills.forEach(item => { if (typeof item === 'string') skills.push(...splitSkills(item)); });
    ['skill1', 'skill2', 'skill3'].forEach(k => { const v = safeText(d[k]); if (v) skills.push(...splitSkills(v)); });
    const seenSkill = new Set();
    skills = skills.filter(s => { if (seenSkill.has(s.toLowerCase())) return false; seenSkill.add(s.toLowerCase()); return true; });


    function renderLinkPills(links) {
        if (!links || !links.length) return '';
        const getIcon = (url, label) => {
            const u = (url || '').toLowerCase();
            const l = (label || '').toLowerCase();
            if (u.includes('apps.apple.com') || l.includes('app store')) return `<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.06.91-2.09.91-3.08-.35-4.85-6.21-1.87-11.45 2.15-11.64.95-.05 1.77.53 2.53.53.7 0 1.91-1 3.23-.74 1.48.28 2.37 1.09 3.23 2.15-2.61 1.48-2.09 5.86.35 6.91-.49 1.41-1.41 3.41-2.26 4.41l.01-.01zM13.03 5.48c-.7.84-1.84 1.41-2.84 1.27-.14-1.2.56-2.61 1.48-3.41.84-.77 2.29-1.34 2.99-1.12.18 1.44-.81 2.64-1.63 3.26z"/></svg>`;
            if (u.includes('figma.com') || l.includes('figma')) return `<svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 25.9863 20.0179 23.5755 21.8297 21.798C23.6415 20.0204 26.0989 19.0219 28.6615 19.0219C31.2242 19.0219 33.6816 20.0204 35.4934 21.798C37.3052 23.5755 38.3231 25.9863 38.3231 28.5C38.3231 31.0137 37.3052 33.4245 35.4934 35.202C33.6816 36.9796 31.2242 37.9781 28.6615 37.9781L19 37.9781V28.5Z" fill="#1ABCFE"/><path d="M0 47.4781C0 44.9644 1.01786 42.5536 2.82966 40.7761C4.64146 38.9985 7.09893 38 9.66154 38C12.2241 38 14.6816 38.9985 16.4934 40.7761C18.3052 42.5536 19.3231 44.9644 19.3231 47.4781C19.3231 50.0827 18.271 52.5413 16.3242 54.4507C14.5422 56.1264 12.1873 57.0396 9.66154 56.9562C4.34893 56.9562 0 52.6898 0 47.4781Z" fill="#0ACF83"/><path d="M19 0V18.9781L28.6615 18.9781C31.2242 18.9781 33.6816 17.9796 35.4934 16.202C37.3052 14.4245 38.3231 12.0137 38.3231 9.5C38.3231 6.9863 37.3052 4.57548 35.4934 2.79796C33.6816 1.02045 31.2242 0.021946 28.6615 0L19 0Z" fill="#FF7262"/><path d="M0 9.5C0 12.0137 1.01786 14.4245 2.82966 16.202C4.64146 17.9796 7.09893 18.9781 9.66154 18.9781L19 18.9781V0L9.66154 0C7.09893 0.021946 4.64146 1.02045 2.82966 2.79796C1.01786 4.57548 0 6.9863 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 31.0137 1.01786 33.4245 2.82966 35.202C4.64146 36.9796 7.09893 37.9781 9.66154 37.9781L19 37.9781V19.0219L9.66154 19.0219C7.09893 19.0219 4.64146 20.0204 2.82966 21.798C1.01786 23.5755 0 25.9863 0 28.5Z" fill="#A259FF"/></svg>`;
            return `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`;
        };

        return `
      <div class="flex flex-wrap gap-3 pt-3">
        ${links.map(l => {
            const u = (l.url || '').toLowerCase();
            const label = (l.label || '').toLowerCase();
            const isPrimary = u.includes('apps.apple.com') || label.includes('app store') || label.includes('download') || label.includes('get app');
            const cls = isPrimary
                ? "inline-flex items-center gap-2.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 shadow-sm"
                : "inline-flex items-center gap-2.5 rounded-full bg-white text-zinc-900 border border-zinc-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:border-white/10 dark:hover:bg-zinc-800";
            return `
               <a href="${l.url}" target="_blank" rel="noopener" class="${cls}">
                  ${getIcon(l.url, l.label)}
                  <span>${l.label}</span>
               </a>`;
        }).join('')}
      </div>`;
    }
    const linksPills = renderLinkPills(b.links);

    // Overview Grid
    let overviewGridHtml = '';
    const gridList = d.projectOverviewGrid || d['Project overview grid'] || d.projectOverview;
    if (Array.isArray(gridList) && gridList.length > 0) {
        const item = gridList[0];
        const findVal = (p, keys) => { for (const k of keys) if (p[k]) return safeText(p[k]); return ''; };
        let challenge = findVal(item, ['challengeText', 'Challenge text', 'challenge', 'Challenge']);
        let solution = findVal(item, ['solutionText', 'Solution text', 'solution', 'Solution']);
        let impact = findVal(item, ['impactText', 'Impact text', 'impact', 'Impact']);

        // Fallback to top level
        if (!challenge) challenge = safeText(d.Challenge);
        if (!solution) solution = safeText(d.Solution);
        if (!impact) impact = safeText(d.Impact);

        if (challenge || solution || impact) {
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
            overviewGridHtml = `
             <div class="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               ${card('Challenge', challenge)}
               ${card('Solution', solution)}
               ${card('Impact', impact, true)}
             </div>
           `;
        }
    }

    // Hero Image Logic
    const heroUrl = urlFrom(d.heroImage || d['Hero image']);
    const heroImgHtml = heroUrl ? `<div class="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 dark:border-zinc-800"><img src="${heroUrl}" alt="" class="w-full h-full object-cover" loading="eager" /></div>` : '';

    // Correct absolute path for chevron to avoid ../ issues
    const chevronPath = '/assets/Chevron%20Icon.png';

    // Assemble Full HTML
    root.innerHTML = `
    <div class="min-h-screen pb-48 md:pb-32 lg:ml-[348px]">
       <!-- Sticky Breadcrumb Nav -->
      <div class="sticky top-[60px] md:top-0 z-[100] w-full bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/50 transition-all dark:bg-zinc-900/80 dark:border-white/5">
         <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 py-3 flex items-center gap-4">
            <a href="/blog" aria-label="Back to Blogs" id="back-button"
               class="group inline-flex items-center justify-center -ml-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800">
              <img src="${chevronPath}" alt="" class="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" draggable="false"/>
            </a>
            <span class="font-medium text-sm text-zinc-900 truncate pr-4 dark:text-white">${b.title}</span>
         </div>
      </div>

      <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 pt-12 pb-8 md:pt-24 md:pb-16 relative">
      
        <div id="back-sentinel" class="hidden md:block h-0"></div>

        <header class="mb-8 md:mb-12">
            <div class="space-y-5 md:space-y-6">
                ${heroImgHtml}

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

        ${overviewGridHtml}

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

    // Back button logic removed to revert to simple sticky header position.
    // The HTML element inside the sticky header remains and works as a standard link.


    // TOC Logic
    setTimeout(() => {
        const toc = document.getElementById('toc-links');
        if (toc) {
            const slugify = (s) => (s || '').toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'sec';
            const chapterSections = Array.from(root.querySelectorAll('section[id]')).filter(s => CHAPTERS.some(c => c[0] === s.id));
            const headings = Array.from(root.querySelectorAll('.prose h2'));

            // Build full list of targets
            let entries = [];
            chapterSections.forEach(s => entries.push({ id: s.id, label: s.querySelector('h2')?.textContent || s.id, el: s }));
            headings.forEach(h => {
                if (!h.id) h.id = slugify(h.textContent);
                entries.push({ id: h.id, label: h.textContent, el: h });
            });

            // unique defaults
            entries = entries.filter((e, i, a) => a.findIndex(t => t.id === e.id) === i);

            toc.innerHTML = entries.map(e => `
                <a href="#${e.id}" data-id="${e.id}" class="group/link flex items-center pl-4 relative text-zinc-500 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white">
                    <span class="toc-dot absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-200 border-2 border-white ring-1 ring-zinc-200 transition-all duration-300 group-hover/link:bg-zinc-300 group-hover/link:ring-zinc-300 dark:bg-zinc-700 dark:border-zinc-900 dark:ring-zinc-700 dark:group-hover/link:bg-zinc-500 dark:group-hover/link:ring-zinc-500"></span>
                    <span class="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 whitespace-nowrap">${e.label}</span>
                </a>`).join('');

            toc.addEventListener('click', (e) => {
                const a = e.target.closest('a');
                if (a) {
                    e.preventDefault();
                    const id = a.dataset.id;
                    const target = document.getElementById(id);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }, 100);

    // Lightbox for everything
    const allImages = [b.thumbnail, ...galleryImages].filter(Boolean);
    root.querySelectorAll('img').forEach(img => {
        if (img.closest('button')) return; // handled by gallery buttons
        if (img.closest('.prose')) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox([img.src], 0));
        }
    });
    root.querySelectorAll('button[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx || '0');
            openLightbox(allImages, Math.max(0, idx - 1)); // adjust index? Gallery logic in app.js used complex mapping. 
            // Simplified: just show the image itself.
            const img = btn.querySelector('img');
            if (img) openLightbox([img.src], 0);
        });
    });

}
