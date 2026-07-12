import Link from "next/link";
import { getDocuments } from "outstatic/server";
import { fetchBuilder } from "@/utils/builder";

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

// Estimate reading time
function estimateReadingTime(content) {
  if (!content) return 3;
  const words = content.trim().split(/\s+/).length;
  const wpm = 225;
  return Math.max(3, Math.ceil(words / wpm));
}

export default async function BlogPage() {
  // 1. Fetch local posts from Outstatic
  const localPosts = await getDocuments("posts", [
    "title",
    "description",
    "publishedAt",
    "slug",
    "coverImage",
    "tags",
    "content",
  ]);

  // 2. Fetch remote posts from Builder.io
  const rawBuilder = await fetchBuilder("blogs", { limit: 100 });
  const remotePosts = rawBuilder.map((entry) => {
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
    };
  });

  // 3. Merge posts, letting local Outstatic take precedence for duplicates
  const mergedPosts = [...localPosts];
  remotePosts.forEach((remote) => {
    if (remote.slug && !mergedPosts.some((local) => local.slug === remote.slug)) {
      mergedPosts.push(remote);
    }
  });

  // 4. Sort descending
  const getWhen = (p) => (p.publishedAt ? new Date(p.publishedAt).getTime() : 0);
  mergedPosts.sort((a, b) => getWhen(b) - getWhen(a));

  return (
    <main className="lg:ml-0 mx-auto w-auto max-w-[1400px] px-6 sm:px-8 md:px-12 pt-24 pb-24 space-y-8">
      <header className="mb-12 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Blog & Case Studies
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Thoughts on product design, engineering, and the process of building digital experiences.
          </p>
        </div>
      </header>

      <section id="blogs-list" className="px-0 divide-y divide-zinc-200 dark:divide-zinc-800 bg-white/0">
        {mergedPosts.length === 0 ? (
          <div className="py-12 text-zinc-500 dark:text-zinc-400">
            No articles found. Use the{" "}
            <Link href="/outstatic" className="text-blue-500 hover:underline">
              Outstatic dashboard
            </Link>{" "}
            or Builder.io to publish your first post!
          </div>
        ) : (
          mergedPosts.map((post) => {
            const dateStr = formatDateShort(post.publishedAt);
            const readTimeMin = estimateReadingTime(post.content);
            const role = post.tags && post.tags[0] ? post.tags[0] : "Article";
            const href = `/blog/${post.slug || post.id}`;

            return (
              <article key={post.slug || post.id} className="py-12 first:pt-0 last:pb-0">
                <Link
                  href={href}
                  className="group grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-10 items-start"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 capitalize">
                        {role}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500">
                        {dateStr} • {readTimeMin} min read
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                      {post.title}
                    </h2>

                    <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                      {post.description || "No description available."}
                    </p>

                    <div className="mt-2 text-sm font-medium text-black dark:text-white underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-all">
                      Read Article
                    </div>
                  </div>
                </Link>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
