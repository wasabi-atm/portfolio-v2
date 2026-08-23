"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // 1. Gather all H2 headings inside .prose and case study chapters
    const elements = Array.from(document.querySelectorAll(".prose h2, h2.text-left"));

    const slugify = (text) =>
      (text || "")
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "sec";

    const entries = elements.map((el, idx) => {
      if (!el.id) el.id = slugify(el.textContent);
      return { id: el.id, label: el.textContent, index: String(idx + 1).padStart(2, "0"), el };
    });

    setHeadings(entries);

    // 2. IntersectionObserver to update active heading
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((observedEntries) => {
      observedEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div
        id="toc-floating"
        className="group fixed top-1/2 -translate-y-1/2 right-6 z-50 w-10 hover:w-72 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] py-6 overflow-hidden bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg px-2"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 pl-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
          INDEX OF SECTIONS
        </p>
        <nav
          id="toc-links"
          className="relative flex flex-col space-y-2.5 text-xs font-mono border-l border-zinc-200 dark:border-zinc-800 ml-3"
        >
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  h.el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group/link flex items-center pl-3 relative transition-colors ${
                  isActive
                    ? "text-zinc-950 dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <span
                  className={`toc-dot absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-zinc-950 dark:bg-white -left-[5px]"
                      : "w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 -left-[3px] group-hover/link:bg-zinc-500"
                  }`}
                />
                <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 whitespace-nowrap truncate pr-2 flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">{h.index}</span>
                  <span>{h.label}</span>
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
