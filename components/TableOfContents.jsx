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

    const entries = elements.map((el) => {
      if (!el.id) el.id = slugify(el.textContent);
      return { id: el.id, label: el.textContent, el };
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
        className="group fixed top-1/2 -translate-y-1/2 right-6 z-50 w-12 hover:w-72 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] py-6 overflow-hidden"
      >
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-4 pl-5 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
          Contents
        </p>
        <nav
          id="toc-links"
          className="relative flex flex-col space-y-3 text-sm border-l border-zinc-200 dark:border-zinc-800 ml-6"
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
                className={`group/link flex items-center pl-4 relative transition-colors ${
                  isActive
                    ? "text-black dark:text-white font-medium"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span
                  className={`toc-dot absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-black dark:bg-white -left-[5px]"
                      : "w-2 h-2 bg-zinc-350 dark:bg-zinc-700 -left-[4px] group-hover/link:bg-zinc-400 dark:group-hover/link:bg-zinc-500"
                  }`}
                />
                <span className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 whitespace-nowrap">
                  {h.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
