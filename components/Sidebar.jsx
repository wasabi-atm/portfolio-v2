"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
      
      setTheme(isDark ? "dark" : "light");
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };

  const isHome = pathname === "/";
  const isConnect = pathname === "/connect";
  const isBlog = pathname.startsWith("/blog");

  const baseLinkClass = "block w-fit px-6 py-2 text-lg font-medium transition-colors rounded-full";
  const activeClass = "bg-black text-white dark:bg-white dark:text-black";
  const inactiveClass = "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white";

  const homeClass = `${baseLinkClass} ${isHome ? activeClass : inactiveClass}`;
  const connectClass = `${baseLinkClass} ${isConnect ? activeClass : inactiveClass}`;
  const blogClass = `${baseLinkClass} ${isBlog ? activeClass : inactiveClass}`;

  // Mobile menu classes — minimal left-aligned text links
  const mobileBaseClass = "block w-fit text-lg font-medium transition-colors py-1.5";
  const mobileActive = "text-black dark:text-white";
  const mobileInactive = "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white";

  const mHomeClass = `${mobileBaseClass} ${isHome ? mobileActive : mobileInactive}`;
  const mConnectClass = `${mobileBaseClass} ${isConnect ? mobileActive : mobileInactive}`;
  const mBlogClass = `${mobileBaseClass} ${isBlog ? mobileActive : mobileInactive}`;

  const renderSocials = (isMobileFooter = false) => {
    const containerClass = isMobileFooter
      ? "px-6 py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-10"
      : "mt-12 space-y-8";

    const iconSize = isMobileFooter ? "h-8" : "h-6";
    const linkClass = isMobileFooter
      ? "p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity dark:invert"
      : "opacity-40 hover:opacity-100 transition-opacity dark:invert";

    const textClass = isMobileFooter
      ? "text-base font-medium text-zinc-500 dark:text-zinc-400 mb-4"
      : "text-sm text-zinc-500 dark:text-zinc-400 mb-3";

    const blogTextClass = isMobileFooter ? "text-sm" : "text-xs";
    const arrowSize = isMobileFooter ? "w-4 h-4" : "w-3 h-3";

    return (
      <div className={containerClass}>
        <div className={`flex gap-8 ${blogTextClass} font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide`}>
          <a
            href="https://medium.com/@wirawibisana"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2"
          >
            Medium{" "}
            <img
              src="/assets/Sidebar Icons/Arrow Up Icon.svg"
              className={`${arrowSize} dark:invert`}
              alt="Arrow Up"
            />
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1yYLOBPcRKCmqCmS25Kql7Hf--xY9Ep_L"
            className="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2"
          >
            Resume{" "}
            <img
              src="/assets/Sidebar Icons/Arrow Up Icon.svg"
              className={`${arrowSize} dark:invert`}
              alt="Arrow Up"
            />
          </a>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <div>
          <p className={textClass}>I post videos about design</p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/wira.wibisana/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <img
                src="/assets/Sidebar Icons/Instagram SVG Icon.svg"
                className={`${iconSize} w-auto`}
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.youtube.com/@wiraa.wibisana7777"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <img
                src="/assets/Sidebar Icons/YouTube SVG Icons (1).svg"
                className={`${iconSize} w-auto`}
                alt="YouTube"
              />
            </a>
            <a
              href="https://www.tiktok.com/@wira.wibisana"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <img
                src="/assets/Sidebar Icons/Tiktok SVG Icons (1).svg"
                className={`${iconSize} w-auto`}
                alt="TikTok"
              />
            </a>
          </div>
        </div>

        <div>
          <p className={textClass}>Contact me here!</p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/wira29"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <img
                src="/assets/Sidebar Icons/LinkedIn SVG Icon.svg"
                className={`${iconSize} w-auto`}
                alt="LinkedIn"
              />
            </a>
            <a href="mailto:atmanawiera@gmail.com" className={linkClass}>
              <img
                src="/assets/Sidebar Icons/Mail SVG Icon (1).svg"
                className={`${iconSize} w-auto`}
                alt="Mail"
              />
            </a>
          </div>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <button
          onClick={toggleTheme}
          className="opacity-45 hover:opacity-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-850 p-2 rounded-full border border-transparent hover:border-zinc-200/60 dark:hover:border-zinc-800/80 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="Toggle theme"
        >
          <img
            src="/assets/Sidebar Icons/Moon Stars Icon.svg"
            className={`${iconSize} w-6 dark:hidden`}
            alt="Dark Mode"
          />
          <img
            src="/assets/Sidebar Icons/Sun SVG Icon.svg"
            className={`${iconSize} w-6 hidden dark:block invert`}
            alt="Light Mode"
          />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[348px] h-screen bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col p-12 overflow-y-auto z-50 transition-colors duration-300">
        {/* Header */}
        <Link href="/" className="mb-12 block group">
          <h1 className="text-3xl font-semibold text-black dark:text-white tracking-tight mb-2 group-hover:opacity-70 transition-opacity">
            Wira Wibisana
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">
            Product Designer
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">
            Based in Bali
          </p>
        </Link>

        <hr className="border-zinc-200 dark:border-zinc-800 mb-12" />

        {/* Nav */}
        <nav className="space-y-4 flex-1">
          <Link href="/" className={homeClass}>
            Projects
          </Link>
          <Link href="/connect" className={connectClass}>
            Why Hire Me?
          </Link>
          <Link href="/blog" className={blogClass}>
            Blog & Case Studies
          </Link>
        </nav>

        {/* Bottom Details (Desktop) */}
        {renderSocials(false)}
      </aside>

      {/* Mobile Top Bar (Hidden on Desktop) */}
      <header className="lg:hidden fixed top-0 left-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 z-[60] px-6 py-4 flex justify-between items-center transition-colors">
        <Link href="/" className="font-semibold text-lg text-black dark:text-white">
          Wira Wibisana
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -mr-2 text-black dark:text-white focus:outline-none"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile Slide-in Sidebar Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[65] transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Sidebar Panel */}
      <aside
        className={`lg:hidden fixed top-0 left-0 w-[300px] max-w-[85vw] h-full bg-white dark:bg-zinc-950 z-[70] flex flex-col p-8 overflow-y-auto transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-start justify-between mb-10">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block group">
            <h2 className="text-xl font-semibold text-black dark:text-white tracking-tight group-hover:opacity-70 transition-opacity">
              Wira Wibisana
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">
              Product Designer
            </p>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 -mr-1.5 -mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1 flex-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mHomeClass}>
            Projects
          </Link>
          <Link href="/connect" onClick={() => setMobileMenuOpen(false)} className={mConnectClass}>
            Why Hire Me?
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={mBlogClass}>
            Blog & Case Studies
          </Link>
        </nav>

        {/* Socials & Theme Toggle */}
        {renderSocials(false)}
      </aside>
    </>
  );
}
