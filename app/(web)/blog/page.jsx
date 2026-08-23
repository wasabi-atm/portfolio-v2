import { getDocuments } from "outstatic/server";
import { fetchBuilder } from "@/utils/builder";
import ScrollReveal from "@/components/ScrollReveal";
import BlogFilter from "@/components/BlogFilter";

export const metadata = {
  title: "Blog & Case Studies | Wira Wibisana",
  description: "Essays on product craft, design systems, interface architecture, and digital mechanics.",
};

export default async function BlogPage() {
  // 1. Fetch local posts from Outstatic (Case Studies and Opinions)
  let localCaseStudies = [];
  let localOpinions = [];

  try {
    localCaseStudies = await getDocuments("case-studies", [
      "title",
      "description",
      "publishedAt",
      "slug",
      "coverImage",
      "tags",
      "content",
    ]);
  } catch (e) {
    console.error("Failed to fetch local case studies:", e);
  }

  try {
    localOpinions = await getDocuments("opinions", [
      "title",
      "description",
      "publishedAt",
      "slug",
      "coverImage",
      "tags",
      "content",
    ]);
  } catch (e) {
    console.error("Failed to fetch local opinions:", e);
  }

  // Map to common structure with explicit article roles
  const mappedCaseStudies = (localCaseStudies || []).map((p) => ({
    ...p,
    articleType: "Case Study",
    category: "case-studies",
    isCaseStudy: true,
  }));

  const mappedOpinions = (localOpinions || []).map((p) => ({
    ...p,
    articleType: "Opinion",
    category: "opinions",
    isCaseStudy: false,
  }));

  const localPosts = [...mappedCaseStudies, ...mappedOpinions];

  // 2. Fetch remote posts from Builder.io
  let remotePosts = [];
  try {
    const rawBuilder = await fetchBuilder("blogs", { limit: 100 });
    remotePosts = (rawBuilder || []).map((entry) => {
      const d = entry?.data || {};
      const title = d["Blog title"] || d.blogTitle || d.title || d.name || "Untitled";
      const description = d["Blog description"] || d.blogDescription || d.description || "";
      const publishedAt = d["Blog date"] || d.blogDate || d.date || entry?.createdDate || null;
      const slug = d.slug || d.Slug || d.url || d.Url || "";

      let tags = d["Blog tags"] || d.blogTags || d.tags || [];
      if (Array.isArray(tags)) {
        tags = tags
          .map((t) => (typeof t === "string" ? t : t?.value || t?.name || ""))
          .map((s) => (s || "").trim())
          .filter(Boolean);
      } else {
        tags = [];
      }

      let coverImage = d.Thumbnail || d.thumbnail || d.coverImage || d.image || "";
      if (coverImage && typeof coverImage === "object") {
        coverImage = coverImage.url || coverImage.src || "";
      }

      const typeField = (d["Blog type"] || d.blogType || d["Article Type"] || d.articleType || d.type || d.category || "").toLowerCase();
      const titleLower = title.toLowerCase();
      const slugLower = slug.toLowerCase();
      const tagsStr = tags.map((t) => t.toLowerCase()).join(" ");

      const isCaseStudy =
        typeField.includes("case") ||
        typeField.includes("project") ||
        tagsStr.includes("case-study") ||
        tagsStr.includes("case study") ||
        tagsStr.includes("project") ||
        titleLower.includes("case study") ||
        slugLower.includes("case-study");

      return {
        id: entry.id,
        title,
        description,
        publishedAt,
        slug,
        coverImage,
        tags,
        content: typeof d["Blog article"] === "string" ? d["Blog article"] : typeof d.blogArticle === "string" ? d.blogArticle : "",
        isBuilder: true,
        articleType: isCaseStudy ? "Case Study" : "Opinion",
        category: isCaseStudy ? "case-studies" : "opinions",
        isCaseStudy,
      };
    });
  } catch (e) {
    console.error("Failed to fetch remote builder posts:", e);
  }

  // 3. Merge posts, letting local Outstatic take precedence for duplicates
  const mergedPosts = [...localPosts];
  remotePosts.forEach((remote) => {
    if (remote.slug && !mergedPosts.some((local) => local.slug === remote.slug)) {
      mergedPosts.push(remote);
    }
  });

  // 4. Sort descending by publishedAt
  const getWhen = (p) => (p.publishedAt ? new Date(p.publishedAt).getTime() : 0);
  mergedPosts.sort((a, b) => getWhen(b) - getWhen(a));

  return (
    <main className="w-full max-w-[1600px] px-6 md:px-12 pt-24 pb-16 lg:py-16 space-y-20 lg:space-y-24 overflow-x-hidden">
      {/* Clean Editorial Masthead */}
      <header className="space-y-8">
        <ScrollReveal>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.06]">
              Blog & Case Studies
            </h1>

            <p className="text-xl md:text-2xl font-serif text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed">
              Writings on product craft, design systems, interface architecture, and building digital products.
            </p>
          </div>
        </ScrollReveal>
      </header>

      {/* Filterable Editorial Content */}
      <BlogFilter posts={mergedPosts} />
    </main>
  );
}
