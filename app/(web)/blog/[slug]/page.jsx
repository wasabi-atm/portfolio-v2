import { getDocumentBySlug, getDocuments } from "outstatic/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import markdownToHtml from "@/utils/markdownToHtml";
import normalizeArticleHtml from "@/utils/normalizeArticleHtml";
import TableOfContents from "@/components/TableOfContents";
import { fetchBuilder } from "@/utils/builder";
import MdxContent from "@/components/MdxContent";
import ScrollReveal from "@/components/ScrollReveal";

// Helper to format short date
function formatDateShort(dateString) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return "";
  }
}

// Helper to guarantee a real JavaScript Array from an array or array-like object dictionary
function ensureArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object") {
    const keys = Object.keys(data).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (keys.length > 0) {
      return keys.map(k => data[k]);
    }
  }
  return [];
}

// Helper to safely get the first item of an array or array-like object dictionary
function getFirstItem(data) {
  const arr = ensureArray(data);
  return arr.length > 0 ? arr[0] : null;
}

// Normalize Builder.io links
function normalizeBlogLinks(val) {
  const arr = ensureArray(val);
  if (arr.length === 0) return [];

  const results = [];
  arr.forEach((item) => {
    if (!item || typeof item !== "object") return;
    Object.entries(item).forEach(([key, url]) => {
      if (!url || typeof url !== "string") return;

      const keyLower = key.toLowerCase();
      let label = "Link";

      if (keyLower.includes("appstore") || keyLower.includes("app store") || keyLower.includes("apple")) {
        label = "App Store";
      } else if (keyLower.includes("figma")) {
        label = "Figma";
      } else if (keyLower.includes("github")) {
        label = "GitHub";
      } else if (keyLower.includes("website") || keyLower.includes("web")) {
        label = "Website";
      } else if (keyLower.includes("prototype")) {
        label = "Prototype";
      } else if (keyLower.includes("demo")) {
        label = "Demo";
      } else if (keyLower.includes("youtube")) {
        label = "YouTube";
      } else if (keyLower.includes("link")) {
        label = key.replace(/link/gi, "").replace(/([A-Z])/g, " $1").trim() || "Link";
      }

      results.push({ url: String(url), label });
    });
  });

  return results;
}

function urlFrom(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return val.url || val.src || val.image?.url || "";
  return "";
}

// Extract chapters from Builder contentItem
function getChapterHtml(contentItem, keyId, label) {
  if (!contentItem) return "";

  const toCamel = (s = "") =>
    s
      .toString()
      .toLowerCase()
      .replace(/[\s_-]+([a-z0-9])/g, (_m, c) => c.toUpperCase());
  const toPascal = (s = "") => {
    const c = toCamel(s);
    return c ? c[0].toUpperCase() + c.slice(1) : c;
  };

  const labelLower = (label || "").toString().toLowerCase();
  const fromLabelNoSpaces = (label || "").toString().replace(/\s+/g, "");
  const fromIdNoHyphen = (keyId || "").toString().replace(/[-_]+/g, " ");

  const variants = [
    label,
    labelLower,
    fromLabelNoSpaces,
    labelLower.replace(/\s+/g, "-"),
    labelLower.replace(/\s+/g, "_"),
    toCamel(label),
    toPascal(label),
    keyId,
    fromIdNoHyphen,
    toCamel(fromIdNoHyphen),
    toPascal(fromIdNoHyphen),
    fromIdNoHyphen.replace(/\s+/g, ""),
    fromIdNoHyphen.replace(/\s+/g, "_"),
    fromIdNoHyphen.replace(/\s+/g, "-"),
  ].filter(Boolean);

  let raw = "";
  for (const k of variants) {
    if (Object.prototype.hasOwnProperty.call(contentItem, k) && contentItem[k]) {
      raw = contentItem[k];
      break;
    }
  }
  if (!raw) return "";

  let html = "";
  if (typeof raw === "string") html = raw;
  else if (raw && typeof raw === "object") html = raw.html || raw.text || raw.value || "";
  return html;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post = null;

  // 1. Try to fetch from Outstatic first (Case Studies then Opinions)
  try {
    post = await getDocumentBySlug("case-studies", slug, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "content",
      "description",
      "tags",
      "author",
      "myRole",
      "team",
      "timeline",
      "skills",
      "links",
      "challengeText",
      "solutionText",
      "impactText",
    ]);
    if (post) {
      post.articleType = "Projects";
    } else {
      post = await getDocumentBySlug("opinions", slug, [
        "title",
        "publishedAt",
        "slug",
        "coverImage",
        "content",
        "description",
        "tags",
        "author",
      ]);
      if (post) {
        post.articleType = "Personal Blog";
      }
    }
  } catch (e) {
    console.error("Local document lookup failed, trying Builder.io:", e);
  }

  let isBuilder = false;
  let builderData = null;

  // 2. Try to fetch from Builder.io if not found locally
  if (!post) {
    const rawBuilder = await fetchBuilder("blogs", {
      limit: 1,
      "query.data.slug": slug,
    });
    
    // Fallback search by ID if slug did not match (sometimes slugs are IDs)
    let entry = rawBuilder?.[0];
    if (!entry) {
      const rawBuilderById = await fetchBuilder("blogs", {
        limit: 1,
        id: slug,
      });
      entry = rawBuilderById?.[0];
    }

    if (entry) {
      const bData = entry.data || {};
      const slugVal = bData.slug || bData.Slug || bData.url || bData.Url || "";
      
      if (slugVal === slug || entry.id === slug) {
        isBuilder = true;
        builderData = bData;
        
        const title = builderData["Blog title"] || builderData.blogTitle || builderData.title || builderData.name || "Untitled";
        const description = builderData["Blog description"] || builderData.blogDescription || builderData.description || "";
        const publishedAt = builderData["Blog date"] || builderData.blogDate || builderData.date || entry?.createdDate || null;

        let tags = builderData["Blog tags"] || builderData.blogTags || builderData.tags || [];
        tags = ensureArray(tags)
          .map((t) => (typeof t === "string" ? t : t?.value || t?.name || ""))
          .map((s) => (s || "").trim())
          .filter(Boolean);

        let coverImage = builderData.Thumbnail || builderData.thumbnail || builderData.coverImage || builderData.image || "";
        if (coverImage && typeof coverImage === "object") {
          coverImage = coverImage.url || coverImage.src || "";
        }

        post = {
          title,
          publishedAt,
          slug: slugVal,
          coverImage,
          description,
          tags,
          content: typeof builderData["Blog article"] === "string" ? builderData["Blog article"] : typeof builderData.blogArticle === "string" ? builderData.blogArticle : "",
        };
      }
    }
  }

  if (!post) {
    return notFound();
  }

  // ── Content processing: split by source ──
  let contentHtml = "";
  let mdxRawSource = null;

  if (isBuilder) {
    // Legacy Builder.io: HTML rendering pipeline (unchanged)
    const parsedHtml = post.content;
    contentHtml = normalizeArticleHtml(parsedHtml);
  } else {
    // Outstatic: pass raw MDX source to MdxContent (RSC renderer)
    mdxRawSource = post.content || "";
  }

  const dateStr = formatDateShort(post.publishedAt);

  // ── Builder.io-specific metadata (legacy) ──
  let myRole = "";
  let team = "";
  let timeline = "";
  let links = [];
  let skills = [];
  let challenge = "";
  let solution = "";
  let impact = "";
  let showOverviewGrid = false;

  if (isBuilder) {
    myRole = builderData.myRole || builderData.role || builderData["My Role"] || (post.tags?.[0] || "Article");
    team = builderData.team || builderData["Team"] || "";
    timeline = builderData.timeline || builderData["Timeline"] || "";
    links = normalizeBlogLinks(builderData.Links || builderData.links);

    const splitSkills = (s) =>
      (s || "").toString().split(/\s*[-,]\s+|\n+/).map((x) => x.trim()).filter(Boolean);
    ensureArray(builderData.skills).forEach((item) => {
      if (typeof item === "string") skills.push(...splitSkills(item));
    });
    ["skill1", "skill2", "skill3"].forEach((k) => {
      const v = builderData[k];
      if (v) skills.push(...splitSkills(v));
    });
    const seenSkill = new Set();
    skills = skills.filter((s) => {
      if (seenSkill.has(s.toLowerCase())) return false;
      seenSkill.add(s.toLowerCase());
      return true;
    });

    const gridList = ensureArray(builderData.projectOverviewGrid || builderData["Project overview grid"] || builderData.projectOverview);
    if (gridList.length > 0) {
      const item = gridList[0];
      const findVal = (p, keys) => {
        for (const k of keys) if (p[k]) return p[k].toString().trim();
        return "";
      };
      challenge = findVal(item, ["challengeText", "Challenge text", "challenge", "Challenge"]);
      solution = findVal(item, ["solutionText", "Solution text", "solution", "Solution"]);
      impact = findVal(item, ["impactText", "Impact text", "impact", "Impact"]);
    }
    if (!challenge) challenge = builderData.Challenge || "";
    if (!solution) solution = builderData.Solution || "";
    if (!impact) impact = builderData.Impact || "";
    showOverviewGrid = !!(challenge || solution || impact);
    challenge = challenge ? normalizeArticleHtml(challenge) : "";
    solution = solution ? normalizeArticleHtml(solution) : "";
    impact = impact ? normalizeArticleHtml(impact) : "";
  }

  // ── Outstatic case-study metadata ──
  const isCaseStudy = !isBuilder && post.articleType === "Projects";
  const projectType = post.projectType || "";
  const oustaticRole = post.myRole || "";
  const platform = post.platform || "";
  const designTools = post.designTools || "";
  const pullQuote = post.pullQuote || post.description || "";
  const prototypeUrl = post.prototypeUrl || "";
  const prototypeLabel = post.prototypeLabel || "Explore Prototype";

  // Gallery images
  const contentItem = isBuilder
    ? getFirstItem(builderData["Blog content"] || builderData.blogContent)
    : null;

  const galleryImages = contentItem
    ? [
        urlFrom(contentItem["Blog image 0"]),
        urlFrom(contentItem["Blog image 1"]),
        urlFrom(contentItem["Blog image 2"]),
        urlFrom(contentItem["Blog image 3"]),
        urlFrom(contentItem["Blog image 4"]),
      ].filter(Boolean)
    : [];

  // Chapters
  const CHAPTER_CONFIGS = [
    ["overview", "Overview"],
    ["background", "Background"],
    ["empathize", "Empathize"],
    ["desk-research", "Desk research"],
    ["user-interview", "User interview"],
    ["ideate", "Ideate"],
    ["prototype", "Prototype"],
    ["final-result", "Final result"],
    ["reflections", "Reflections"],
  ];

  const chapters = contentItem
    ? CHAPTER_CONFIGS.map(([id, label]) => {
        const rawHtml = getChapterHtml(contentItem, id, label);
        const html = normalizeArticleHtml(rawHtml);
        return { id, label, html };
      }).filter((c) => !!c.html)
    : [];

  // Chevron path helper
  const chevronPath = "/assets/Chevron Icon.png";

  const getLinkIcon = (url, label) => {
    const u = (url || "").toLowerCase();
    const l = (label || "").toLowerCase();
    if (u.includes("apps.apple.com") || l.includes("app store")) {
      return (
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
      );
    }
    if (u.includes("figma.com") || l.includes("figma")) {
      return (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 25.9863 20.0179 23.5755 21.8297 21.798C23.6415 20.0204 26.0989 19.0219 28.6615 19.0219C31.2242 19.0219 33.6816 20.0204 35.4934 21.798C37.3052 23.5755 38.3231 25.9863 38.3231 28.5C38.3231 31.0137 37.3052 33.4245 35.4934 35.202C33.6816 36.9796 31.2242 37.9781 28.6615 37.9781L19 37.9781V28.5Z" fill="#1ABCFE" />
          <path d="M0 47.4781C0 44.9644 1.01786 42.5536 2.82966 40.7761C4.64146 38.9985 7.09893 38 9.66154 38C12.2241 38 14.6816 38.9985 16.4934 40.7761C18.3052 42.5536 19.3231 44.9644 19.3231 47.4781C19.3231 50.0827 18.271 52.5413 16.3242 54.4507C14.5422 56.1264 12.1873 57.0396 9.66154 56.9562C4.34893 56.9562 0 52.6898 0 47.4781Z" fill="#0ACF83" />
          <path d="M19 0V18.9781L28.6615 18.9781C31.2242 18.9781 33.6816 17.9796 35.4934 16.202C37.3052 14.4245 38.3231 12.0137 38.3231 9.5C38.3231 6.9863 37.3052 4.57548 35.4934 2.79796C33.6816 1.02045 31.2242 0.021946 28.6615 0L19 0Z" fill="#FF7262" />
          <path d="M0 9.5C0 12.0137 1.01786 14.4245 2.82966 16.202C4.64146 17.9796 7.09893 18.9781 9.66154 18.9781L19 18.9781V0L9.66154 0C7.09893 0.021946 4.64146 1.02045 2.82966 2.79796C1.01786 4.57548 0 6.9863 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 31.0137 1.01786 33.4245 2.82966 35.202C4.64146 36.9796 7.09893 37.9781 9.66154 37.9781L19 37.9781V19.0219L9.66154 19.0219C7.09893 19.0219 4.64146 20.0204 2.82966 21.798C1.01786 23.5755 0 25.9863 0 28.5Z" fill="#A259FF" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  };

  // ── Render: Outstatic post (new layout) ──
  if (!isBuilder) {
    return (
      <div className="min-h-screen pb-48 md:pb-32 lg:ml-0">
        {/* Sticky Breadcrumb Nav */}
        <div className="sticky top-[60px] md:top-0 z-[100] w-full bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/50 transition-all dark:bg-zinc-900/80 dark:border-white/5">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 py-3 flex items-center gap-4">
            <Link
              href="/blog"
              aria-label="Back to Blogs"
              className="group inline-flex items-center justify-center -ml-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
            >
              <img
                src={chevronPath}
                alt="Back"
                className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
                draggable="false"
              />
            </Link>
            <span className="font-medium text-sm text-zinc-900 truncate pr-4 dark:text-white">
              {post.title}
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 pt-12 pb-8 md:pt-24 md:pb-16 relative">
          {/* ── Hero Section ── */}
          <header className="mb-12 md:mb-20">
            <ScrollReveal>
              <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 dark:text-zinc-500">
                {dateStr}
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 leading-[1.05] text-balance dark:text-white">
                {post.title}
              </h1>
            </ScrollReveal>

            {/* Hero Image */}
            {post.coverImage && (
              <ScrollReveal delay={100}>
                <div className="mt-8 md:mt-12 w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Two-Column Metadata (Ellen Covey-style) */}
            {isCaseStudy && (projectType || oustaticRole || platform || designTools || pullQuote) && (
              <ScrollReveal delay={200}>
                <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
                  {/* Left: Metadata pairs */}
                  <div className="space-y-5">
                    {projectType && (
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Type</div>
                        <div className="text-sm text-zinc-700 dark:text-zinc-300">{projectType}</div>
                      </div>
                    )}
                    {oustaticRole && (
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Role</div>
                        <div className="text-sm text-zinc-700 dark:text-zinc-300">{oustaticRole}</div>
                      </div>
                    )}
                    {platform && (
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Platform</div>
                        <div className="text-sm text-zinc-700 dark:text-zinc-300">{platform}</div>
                      </div>
                    )}
                    {designTools && (
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Design Tools</div>
                        <div className="text-sm text-zinc-700 dark:text-zinc-300">{designTools}</div>
                      </div>
                    )}
                  </div>

                  {/* Right: Pull quote + CTA */}
                  <div className="flex flex-col justify-between">
                    {pullQuote && (
                      <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-light text-balance">
                        {pullQuote}
                      </p>
                    )}
                    {prototypeUrl && (
                      <a
                        href={prototypeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-3 self-start rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium transition-all hover:bg-zinc-700 hover:scale-[1.02] active:scale-[0.98] shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                      >
                        <span>{prototypeLabel}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Non-case-study description (Opinions / Personal Blog) */}
            {!isCaseStudy && post.description && (
              <ScrollReveal delay={150}>
                <p className="mt-6 text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl text-balance dark:text-zinc-400">
                  {post.description}
                </p>
              </ScrollReveal>
            )}
          </header>

          {/* ── Progress bar ── */}
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mb-12 md:mb-16" />

          {/* ── Article Body (MDX) ── */}
          {mdxRawSource ? (
            <article className="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300">
              <MdxContent source={mdxRawSource} />
            </article>
          ) : null}

          {/* Floating Table of Contents */}
          <TableOfContents />
        </div>
      </div>
    );
  }

  // ── Render: Legacy Builder.io post (unchanged) ──
  return (
    <div className="min-h-screen pb-48 md:pb-32 lg:ml-0">
      {/* Sticky Breadcrumb Nav */}
      <div className="sticky top-[60px] md:top-0 z-[100] w-full bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/50 transition-all dark:bg-zinc-900/80 dark:border-white/5">
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 py-3 flex items-center gap-4">
          <Link
            href="/blog"
            aria-label="Back to Blogs"
            className="group inline-flex items-center justify-center -ml-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
          >
            <img
              src={chevronPath}
              alt="Back"
              className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
              draggable="false"
            />
          </Link>
          <span className="font-medium text-sm text-zinc-900 truncate pr-4 dark:text-white">
            {post.title}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 pt-12 pb-8 md:pt-24 md:pb-16 relative">
        <header className="mb-8 md:mb-12">
          <div className="space-y-5 md:space-y-6">
            {post.coverImage && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" loading="eager" />
              </div>
            )}
            <div className="space-y-4">
              <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider dark:text-zinc-500">{dateStr}</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 leading-[1.1] text-balance dark:text-white">{post.title}</h1>
              {post.description && (
                <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl text-balance dark:text-zinc-400">{post.description}</p>
              )}
            </div>

            {(myRole || team || timeline) && (
              <div className="flex flex-wrap gap-3 text-sm">
                {myRole && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                    <span className="text-zinc-400 font-medium whitespace-nowrap">Role</span>
                    <span className="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100 capitalize">{myRole}</span>
                  </div>
                )}
                {team && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                    <span className="text-zinc-400 font-medium whitespace-nowrap">Team</span>
                    <span className="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">{team}</span>
                  </div>
                )}
                {timeline && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
                    <span className="text-zinc-400 font-medium whitespace-nowrap">Timeline</span>
                    <span className="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">{timeline}</span>
                  </div>
                )}
              </div>
            )}

            {(skills.length > 0 || links.length > 0) && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, idx) => (
                      <span key={idx} className="inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{s}</span>
                    ))}
                  </div>
                )}
                {links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {links.map((l, idx) => {
                      const u = (l.url || "").toLowerCase();
                      const label = (l.label || "").toLowerCase();
                      const isPrimary = u.includes("apps.apple.com") || label.includes("app store") || label.includes("download") || label.includes("get app");
                      const cls = isPrimary
                        ? "inline-flex items-center gap-2.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 shadow-sm dark:bg-white dark:text-black"
                        : "inline-flex items-center gap-2.5 rounded-full bg-white text-zinc-900 border border-zinc-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:border-white/10 dark:hover:bg-zinc-800";
                      return (
                        <a key={idx} href={l.url} target="_blank" rel="noopener noreferrer" className={cls}>
                          {getLinkIcon(l.url, l.label)}
                          <span>{l.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {showOverviewGrid && (
          <div className="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenge && (
              <div className="flex-1 min-w-[240px] rounded-2xl border bg-white border-zinc-200 p-6 md:p-8 flex flex-col gap-4 dark:bg-zinc-800 dark:border-zinc-700">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider">Challenge</span>
                <div className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: challenge }} />
              </div>
            )}
            {solution && (
              <div className="flex-1 min-w-[240px] rounded-2xl border bg-white border-zinc-200 p-6 md:p-8 flex flex-col gap-4 dark:bg-zinc-800 dark:border-zinc-700">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider">Solution</span>
                <div className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: solution }} />
              </div>
            )}
            {impact && (
              <div className="flex-1 min-w-[240px] rounded-2xl border bg-zinc-900 text-white border-zinc-900 p-6 md:p-8 flex flex-col gap-4 dark:bg-black dark:border-zinc-850">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Impact</span>
                <div className="text-sm md:text-base leading-relaxed text-zinc-200" dangerouslySetInnerHTML={{ __html: impact }} />
              </div>
            )}
          </div>
        )}

        {contentHtml && (
          <article className="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        )}

        {galleryImages.length > 0 && (
          <section className="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
            <div className="rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800">
              {galleryImages.length === 1 ? (
                <div className="relative aspect-square w-full">
                  <img src={galleryImages[0]} alt="Case Study Gallery" className="block w-full h-full object-cover" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-0">
                  <div className="relative aspect-square w-full">
                    <img src={galleryImages[0]} alt="Case Study Gallery Big" className="block w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-rows-3 gap-0">
                    {galleryImages.slice(1, 4).map((url, idx) => (
                      <div key={idx} className="relative aspect-square w-full overflow-hidden border-t md:border-t-0 md:border-l border-zinc-200/40 dark:border-zinc-800/40">
                        <img src={url} alt={`Gallery small ${idx}`} className="block w-full h-full object-cover" />
                        {idx === 2 && galleryImages.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 text-white grid place-items-center text-2xl font-medium">+{galleryImages.length - 4}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {chapters.length > 0 && (
          <div className="space-y-12 divide-y divide-zinc-200/45 dark:divide-zinc-800/45">
            {chapters.map((chap) => (
              <section key={chap.id} id={chap.id} className="scroll-mt-24 pt-10 mt-10">
                <div className="my-8">
                  <div className="w-2/3 border-b-2 border-black pb-1 dark:border-zinc-700">
                    <h2 className="text-left text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black dark:text-white">{chap.label}</h2>
                  </div>
                </div>
                <div className="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: chap.html }} />
              </section>
            ))}
          </div>
        )}

        <TableOfContents />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const localCaseStudies = await getDocuments("case-studies", ["slug"]);
    const localOpinions = await getDocuments("opinions", ["slug"]);
    const localParams = [...localCaseStudies, ...localOpinions].map((p) => ({ slug: p.slug }));

    const rawBuilder = await fetchBuilder("blogs", { limit: 100 });
    const remoteParams = rawBuilder.map((entry) => {
      const d = entry?.data || {};
      const slug = d.slug || d.Slug || d.url || d.Url || "";
      return { slug: slug || entry.id };
    }).filter(p => !!p.slug);

    return [...localParams, ...remoteParams];
  } catch (e) {
    console.error("Failed to generate static params:", e);
    return [];
  }
}
