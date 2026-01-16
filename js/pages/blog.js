import { fetchBuilder } from '../api.js';
import { formatBlogDate, formatBlogDateShort, stripHtml, wordsPerMinuteEstimate } from '../utils.js';


export function normalizeBlog(entry) {
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

  return {
    id: entry.id,
    title,
    description,
    date,
    slug,
    thumbnail: thumb,
    tags,
    links: normalizeBlogLinks(d.Links || d.links) // Pass raw links field
  };
}

function normalizeBlogLinks(val) {
  if (!val) return [];
  // Basic normalization for links if needed in future
  if (Array.isArray(val)) return val;
  return [];
}

export function blogRowHTML(b) {
  const thumb = b.thumbnail;
  // Use clean URL for blog
  const href = b.slug ? `/blog/${encodeURIComponent(b.slug)}` : `article.html?id=${encodeURIComponent(b.id)}`;
  const dateStr = formatBlogDateShort(b.date);
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
           
           <div class="mt-2 text-sm font-medium text-black dark:text-white underline decoration-zinc-300 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-all">
             Read Case Study
           </div>
        </div>
      </a>
    </article>
  `;
}

export async function loadBlogsAndRender() {
  const list = document.getElementById('blogs-list');
  if (!list) return; // not on blog page

  // Skeleton
  list.innerHTML = `<div class="animate-pulse space-y-12">
    <div class="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
    <div class="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
  </div>`;

  try {
    const raw = await fetchBuilder('blogs', { limit: 100 });
    // Sort
    const getWhen = (r) => {
      const d = r.data || {};
      const rawDate = d.date || r.createdDate;
      return rawDate ? new Date(rawDate).getTime() : 0;
    };
    raw.sort((a, b) => getWhen(b) - getWhen(a));

    const items = raw.map(normalizeBlog);

    // Render
    list.innerHTML = items.map(blogRowHTML).join('');

  } catch (e) {
    console.error(e);
    list.innerHTML = `<p class="text-red-500">Failed to load articles.</p>`;
  }
}
