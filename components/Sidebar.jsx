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

  const baseLinkClass = "flex items-center justify-between w-full px-4 py-2.5 text-base font-medium transition-all rounded-xl";
  const activeClass = "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm";
  const inactiveClass = "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60";

  const homeClass = `${baseLinkClass} ${isHome ? activeClass : inactiveClass}`;
  const connectClass = `${baseLinkClass} ${isConnect ? activeClass : inactiveClass}`;
  const blogClass = `${baseLinkClass} ${isBlog ? activeClass : inactiveClass}`;

  // Mobile menu classes
  const mobileBaseClass = "flex items-center justify-between w-full px-4 py-2.5 text-base font-medium transition-colors rounded-xl";
  const mobileActive = "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold";
  const mobileInactive = "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white";

  const mHomeClass = `${mobileBaseClass} ${isHome ? mobileActive : mobileInactive}`;
  const mConnectClass = `${mobileBaseClass} ${isConnect ? mobileActive : mobileInactive}`;
  const mBlogClass = `${mobileBaseClass} ${isBlog ? mobileActive : mobileInactive}`;

  const renderSocials = (isMobileFooter = false) => {
    const containerClass = isMobileFooter
      ? "px-6 py-10 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-8"
      : "mt-auto pt-8 space-y-6";

    const iconSize = isMobileFooter ? "h-6" : "h-5";
    const linkClass = isMobileFooter
      ? "p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity dark:invert"
      : "opacity-50 hover:opacity-100 transition-all hover:scale-110 dark:invert";

    const sectionTitleClass = "text-[11px] font-mono font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-2.5";
    const arrowSize = "w-3.5 h-3.5";

    return (
      <div className={containerClass}>
        <div>
          <div className={sectionTitleClass}>Writing & Archive</div>
          <div className="flex gap-6 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="https://medium.com/@wirawibisana"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors py-1 group"
            >
              <span>Medium</span>
              <img
                src="/assets/Sidebar Icons/Arrow Up Icon.svg"
                className={`${arrowSize} opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform dark:invert`}
                alt="External link"
              />
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1yYLOBPcRKCmqCmS25Kql7Hf--xY9Ep_L"
              className="hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-colors py-1 group"
            >
              <span>Resume</span>
              <img
                src="/assets/Sidebar Icons/Arrow Up Icon.svg"
                className={`${arrowSize} opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform dark:invert`}
                alt="External link"
              />
            </a>
          </div>
        </div>

        <hr className="border-zinc-200/80 dark:border-zinc-800/80" />

        <div>
          <div className={sectionTitleClass}>I post videos about design</div>
          <div className="flex gap-5 items-center">
            <a
              href="https://www.instagram.com/wira.wibisana/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              title="Instagram"
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
              title="YouTube"
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
              title="TikTok"
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
          <div className={sectionTitleClass}>Direct Inquiries</div>
          <div className="flex gap-5 items-center">
            <a
              href="https://linkedin.com/in/wira29"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              title="LinkedIn"
            >
              <img
                src="/assets/Sidebar Icons/LinkedIn SVG Icon.svg"
                className={`${iconSize} w-auto`}
                alt="LinkedIn"
              />
            </a>
            <a
              href="mailto:atmanawiera@gmail.com"
              className={linkClass}
              title="Email"
            >
              <img
                src="/assets/Sidebar Icons/Mail SVG Icon (1).svg"
                className={`${iconSize} w-auto`}
                alt="Mail"
              />
            </a>
          </div>
        </div>

        <hr className="border-zinc-200/80 dark:border-zinc-800/80" />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Theme Mode
          </span>
          <button
            onClick={toggleTheme}
            className="opacity-60 hover:opacity-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800 transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            <img
              src="/assets/Sidebar Icons/Moon Stars Icon.svg"
              className="w-4 h-4 dark:hidden"
              alt="Dark Mode"
            />
            <img
              src="/assets/Sidebar Icons/Sun SVG Icon.svg"
              className="w-4 h-4 hidden dark:block invert"
              alt="Light Mode"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[348px] h-screen bg-zinc-100/60 dark:bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-200/80 dark:border-zinc-800/80 flex-col p-10 overflow-y-auto z-50 transition-colors duration-300">
        {/* Header / Masthead */}
        <Link href="/" className="mb-10 block group">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for work
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:opacity-75 transition-opacity">
            Wira Wibisana
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Product Designer & Engineer
          </p>
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-0.5">
            Based in Bali, Indonesia
          </p>
        </Link>

        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 px-1">
          Navigation
        </div>

        {/* Nav */}
        <nav className="space-y-2 mb-8">
          <Link href="/" className={homeClass}>
            <span>Projects</span>
            <span className="text-xs font-mono opacity-60">01</span>
          </Link>
          <Link href="/connect" className={connectClass}>
            <span>Why Hire Me?</span>
            <span className="text-xs font-mono opacity-60">02</span>
          </Link>
          <Link href="/blog" className={blogClass}>
            <span>Blog & Case Studies</span>
            <span className="text-xs font-mono opacity-60">03</span>
          </Link>
        </nav>

        {/* Bottom Details (Desktop) */}
        {renderSocials(false)}
      </aside>

      {/* Mobile Top Bar (Hidden on Desktop) */}
      <header className="lg:hidden fixed top-0 left-0 w-full bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 z-[60] px-6 py-4 flex justify-between items-center transition-colors">
        <Link href="/" className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">
          Wira Wibisana
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -mr-2 text-zinc-900 dark:text-white focus:outline-none"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile Slide-in Sidebar Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[65] transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Sidebar Panel */}
      <aside
        className={`lg:hidden fixed top-0 left-0 w-[320px] max-w-[85vw] h-full bg-zinc-50 dark:bg-zinc-950 z-[70] flex flex-col p-8 overflow-y-auto transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-start justify-between mb-8">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block group">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for work
            </span>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:opacity-70 transition-opacity">
              Wira Wibisana
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Product Designer & Engineer • Bali
            </p>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 -mr-1.5 -mt-1 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 px-1">
          Navigation
        </div>
        <nav className="space-y-1.5 mb-8">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mHomeClass}>
            <span>Projects</span>
            <span className="text-xs font-mono opacity-60">01</span>
          </Link>
          <Link href="/connect" onClick={() => setMobileMenuOpen(false)} className={mConnectClass}>
            <span>Why Hire Me?</span>
            <span className="text-xs font-mono opacity-60">02</span>
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={mBlogClass}>
            <span>Blog & Case Studies</span>
            <span className="text-xs font-mono opacity-60">03</span>
          </Link>
        </nav>

        {/* Socials & Theme Toggle */}
        {renderSocials(false)}
      </aside>
    </>
  );
}
