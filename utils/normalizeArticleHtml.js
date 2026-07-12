export default function normalizeArticleHtml(input) {
  let s = (input || "").toString();
  if (!s) return "";

  // 1) Unescape specifically-escaped <img> tags
  s = s.replace(/&lt;(img\b[^>]*?)\/?&gt;/gi, "<$1>");
  s = s.replace(/&lt;(img\b[^>]*?)\s*\/?&gt;/gi, "<$1>");

  // 2) Convert plain text to simple HTML blocks and images when no HTML tags are present
  const hasHtml = /<[^>]+>/.test(s);
  if (!hasHtml) {
    // Markdown image: ![alt](url)
    s = s.replace(
      /!\[(.*?)\]\((https?:[^\s)]+)\)/g,
      (_m, alt, url) => `<img src="${url}" alt="${alt || ""}">`
    );
    // Bare image URLs -> <img>
    s = s.replace(
      /(https?:\/\/[^\s)]+\.(?:png|jpe?g|gif|webp|svg|avif)(?:[?][^\s)]+)?)/gi,
      (m) => `<img src="${m}" alt="">`
    );
    // Paragraphs
    const parts = s.split(/\n{2,}/).map((t) => t.trim()).filter(Boolean);
    if (parts.length) {
      s = parts
        .map((p) => `<p class="dark:text-zinc-300">${p.replace(/\n/g, "<br/>")}</p>`)
        .join("");
    }
  }

  // 3) Editorial Typography & Components
  let h1Count = 0;
  // H1 -> Section Marker (Small, Technical, Numbered)
  s = s.replace(/<h1\b[^>]*>(.*?)<\/h1>/gi, (_, content) => {
    h1Count++;
    const num = h1Count.toString().padStart(2, "0");
    return `<h1 class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mt-16 mb-3 border-none select-none">${num} / ${content}</h1>`;
  });

  // H2 -> Display Headline (Massive, Bold, Tight)
  s = s.replace(/<h2\b[^>]*>(.*?)<\/h2>/gi, (_, content) => {
    return `<h2 class="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-8 mt-2">${content}</h2>`;
  });

  // OL -> Editorial Ordered (+ Protect Nested ULs)
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    const processedInner = inner.replace(/<ul\b/gi, '<ul class="editorial-nested"');
    return `<ol class="editorial-ordered not-prose">${processedInner}</ol>`;
  });

  // UL -> Insights Grid (Feature Highlights - Bento Style)
  s = s.replace(
    /<ul(?![^>]*class=["']editorial-nested["'])\b[^>]*>([\s\S]*?)<\/ul>/gi,
    (_, inner) => {
      const gridItems = inner.replace(/<li\b[^>]*>(.*?)<\/li>/gi, (_, itemContent) => {
        return `
          <div class="group relative flex items-center bg-[#F5F5F7] dark:bg-zinc-800 rounded-2xl p-5 overflow-hidden transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div class="text-base font-medium text-zinc-900 dark:text-zinc-100 leading-snug pl-3">
              ${itemContent.trim()}
            </div>
          </div>
        `;
      });
      return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">${gridItems}</div>`;
    }
  );

  // 4) Enforce reasonable image sizing
  const injectImgClasses = (attrs = "") => {
    const needed = "mx-auto block max-w-full h-auto md:max-h-[80vh] object-contain rounded-lg shadow-sm";
    const clsRe = /\bclass\s*=\s*"([^"]*)"/i;
    const m = attrs.match(clsRe);
    if (m) {
      const current = m[1] || "";
      const merged = `${current} ${needed}`.trim();
      return attrs.replace(clsRe, `class="${merged}"`);
    }
    return `${attrs} class="${needed}"`;
  };
  s = s.replace(/<img\b([^>]*)>/gi, (_m, attrs) => `<img ${injectImgClasses((attrs || "").trim())}>`);

  // Final pass: Ensure all <p> tags have dark mode text class
  s = s.replace(/<p((?![^>]*dark:text-)[^>]*)>/gi, (match, attrs) => {
    if (/class="/.test(attrs)) {
      return `<p${attrs.replace('class="', 'class="dark:text-zinc-300 ')}>`;
    }
    return `<p class="dark:text-zinc-300"${attrs}>`;
  });

  return s;
}
