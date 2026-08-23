"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";

export default function ProjectModal({ isOpen, onClose, project }) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const isImage = (url) => {
    if (!url) return false;
    const cleanUrl = url.split("?")[0];
    return /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(cleanUrl);
  };

  const renderMedia = (src, id) => {
    if (!src) return <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800" />;
    
    if (isImage(src)) {
      return (
        <img
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Project Media"
        />
      );
    }

    // Video poster generation: replace .webm with _poster.jpg
    const poster = src.replace(/\.webm$/i, "_poster.jpg");

    return (
      <video
        key={src}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  };

  return (
    <div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="absolute inset-0 p-8 flex items-center justify-center pointer-events-none">
        {/* Card */}
        <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative">
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-950 dark:text-white truncate lg:max-w-md">
                {project.title}
              </h2>
              {(project.link || project.appStoreLink || project.caseStudySlug) && (
                <div className="flex gap-3 shrink-0 flex-wrap">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-black text-white hover:bg-zinc-600 dark:bg-white dark:text-black dark:hover:bg-zinc-300 rounded-full text-base font-medium flex items-center gap-2 whitespace-nowrap transition-all active:scale-95 hover:scale-105"
                    >
                      <span>{project.linkLabel || "Website"}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}

                  {project.appStoreLink && (
                    <a
                      href={project.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-full text-base font-medium flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105 active:scale-95"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                      </svg>
                      <span>App Store</span>
                    </a>
                  )}

                  {project.caseStudySlug && (
                    <Link
                      href={`/blog/${project.caseStudySlug}`}
                      onClick={onClose}
                      className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full text-base font-medium flex items-center gap-2 whitespace-nowrap transition-all dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white hover:scale-105 active:scale-95"
                    >
                      <span>Case Study</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors shrink-0 -mt-2 -mr-2 cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                className="w-8 h-8 text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Non-scrollable Content */}
          <div className="flex-1 p-4 flex flex-col gap-4 min-h-0">
            {/* Achievement Block (Flex grow to fill space) */}
            <div className="w-full flex-[2] bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center min-h-0 overflow-hidden relative group">
              {renderMedia(project.videoMain, "main")}
            </div>

            {/* Data Grid */}
            <div className="w-full flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 min-h-0">
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                {renderMedia(project.video1, "1")}
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                {renderMedia(project.video2, "2")}
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                {renderMedia(project.video3, "3")}
              </div>
              <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                {renderMedia(project.video4, "4")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
