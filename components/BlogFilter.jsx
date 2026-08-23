"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

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

function estimateReadingTime(content) {
  if (!content) return 3;
  const words = content.trim().split(/\s+/).length;
  const wpm = 225;
  return Math.max(3, Math.ceil(words / wpm));
}

function checkIsCaseStudy(post) {
  if (post.isCaseStudy !== undefined) return Boolean(post.isCaseStudy);
  const type = (post.articleType || "").toLowerCase();
  const cat = (post.category || "").toLowerCase();
  const tags = Array.isArray(post.tags) ? post.tags.map((t) => String(t).toLowerCase()) : [];
  return (
    cat === "case-studies" ||
    cat === "case-study" ||
    type === "case study" ||
    type === "projects" ||
    tags.some((t) => t.includes("case") || t.includes("project"))
  );
}

export default function BlogFilter({ posts = [] }) {
  const [filter, setFilter] = useState("all");

  const caseStudiesCount = posts.filter((p) => checkIsCaseStudy(p)).length;
  const opinionsCount = posts.filter((p) => !checkIsCaseStudy(p)).length;

  const filteredPosts = posts.filter((post) => {
    if (filter === "case-studies") return checkIsCaseStudy(post);
    if (filter === "opinions") return !checkIsCaseStudy(post);
    return true;
  });

  // Hierarchy segmentation based on NN/g content feed architecture:
  // Tier 1: Lead Story (Top Primary Feature)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;

  // Tier 2: Vertical 2-Column Grid (Visual High-Impact Case Studies)
  let verticalPosts = [];
  // Tier 3: Horizontal List Rows (Scannable Article List)
  let horizontalPosts = [];

  if (filter === "case-studies") {
    verticalPosts = filteredPosts.slice(1);
  } else if (filter === "opinions") {
    horizontalPosts = filteredPosts.slice(1);
  } else {
    // "all": First post is Hero, next 2 are Vertical 2-Col Cards, remainder are Horizontal Rows
    verticalPosts = filteredPosts.slice(1, 3);
    horizontalPosts = filteredPosts.slice(3);
  }

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              filter === "all"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            ALL ({posts.length})
          </button>
          <button
            onClick={() => setFilter("case-studies")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              filter === "case-studies"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            CASE STUDIES ({caseStudiesCount})
          </button>
          <button
            onClick={() => setFilter("opinions")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              filter === "opinions"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            OPINIONS & ESSAYS ({opinionsCount})
          </button>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="text-zinc-500 dark:text-zinc-400 font-serif text-xl italic">
            No entries found under this section.
          </p>
          <button
            onClick={() => setFilter("all")}
            className="inline-block text-xs font-mono tracking-widest uppercase text-zinc-900 dark:text-white underline underline-offset-4 cursor-pointer"
          >
            View all entries
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* ── Tier 1: Lead Story (Horizontal Split Layout) ── */}
          {featuredPost && (
            <ScrollReveal>
              <div className="group relative">
                <Link
                  href={`/blog/${featuredPost.slug || featuredPost.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-300 group"
                >
                  {/* Lead Cover Image */}
                  <div className="lg:col-span-7 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono text-sm">
                        [COVER IMAGE]
                      </div>
                    )}
                  </div>

                  {/* Lead Content */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          {checkIsCaseStudy(featuredPost) ? "Case Study" : "Opinion"}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                          {formatDateShort(featuredPost.publishedAt)}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                          &bull; {estimateReadingTime(featuredPost.content)} MIN READ
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-950 dark:text-white tracking-tight leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {featuredPost.description || "Detailed overview and exploration."}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-zinc-950 dark:text-white group-hover:translate-x-1 transition-transform">
                      <span>{checkIsCaseStudy(featuredPost) ? "READ CASE STUDY" : "READ ARTICLE"} &rarr;</span>
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          )}

          {/* ── Tier 2: Featured Visual Case Studies (Vertical 2-Column Card Grid) ── */}
          {verticalPosts.length > 0 && (
            <div className="space-y-8">
              <ScrollReveal>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    FEATURED CASE STUDIES
                  </span>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {verticalPosts.map((post, idx) => {
                  const dateStr = formatDateShort(post.publishedAt);
                  const readTime = estimateReadingTime(post.content);

                  return (
                    <ScrollReveal key={post.slug || post.id} delay={idx * 80}>
                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="group flex flex-col justify-between space-y-4 h-full"
                      >
                        {/* Top: Aspect Ratio Image */}
                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono text-xs">
                              [CASE STUDY COVER]
                            </div>
                          )}
                        </div>

                        {/* Middle: Metadata & Typography */}
                        <div className="space-y-2.5 flex-1">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                              {checkIsCaseStudy(post) ? "Case Study" : "Opinion"}
                            </span>
                            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                              {dateStr} &bull; {readTime}M READ
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                            {post.title}
                          </h3>

                          {post.description && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>

                        {/* Bottom: Action Link */}
                        <div className="pt-1 flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-zinc-950 dark:text-white group-hover:translate-x-1 transition-transform">
                          <span>{checkIsCaseStudy(post) ? "READ CASE STUDY" : "READ ARTICLE"} &rarr;</span>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Tier 3: Articles List (Left-Anchored Horizontal Rows) ── */}
          {horizontalPosts.length > 0 && (
            <div className="space-y-8">
              <ScrollReveal>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    ARTICLES ({horizontalPosts.length})
                  </span>
                </div>
              </ScrollReveal>

              <div className="space-y-8">
                {horizontalPosts.map((post, idx) => {
                  const dateStr = formatDateShort(post.publishedAt);
                  const readTime = estimateReadingTime(post.content);

                  return (
                    <ScrollReveal
                      key={post.slug || post.id}
                      delay={Math.min(idx * 50, 300)}
                    >
                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 transition-all"
                      >
                        {/* 1. Left Visual Anchor: Thumbnail Image */}
                        <div className="w-full sm:w-44 md:w-56 aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono text-xs">
                              [ARTICLE]
                            </div>
                          )}
                        </div>

                        {/* 2. Middle Content: Direct Proximity Flow (Meta -> Title -> Excerpt) */}
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                              {checkIsCaseStudy(post) ? "Case Study" : "Opinion"}
                            </span>
                            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                              {dateStr} &bull; {readTime}M READ
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-serif font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                            {post.title}
                          </h3>

                          {post.description && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>

                        {/* 3. Right Action Arrow */}
                        <div className="hidden sm:flex w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-all shrink-0">
                          <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
