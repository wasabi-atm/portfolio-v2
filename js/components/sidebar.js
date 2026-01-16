import { currentFilename } from '../utils.js';
import { initProjectModal } from './modal.js';

export function renderSidebar() {
  const mount = document.getElementById('sidebar-root');
  if (!mount) return;

  // Calculate active states
  const filename = currentFilename();
  // If we are in /blog/ folder, filename might be 'blog.html' or 'article.html' based on currentFilename() logic
  const isConnect = filename === 'connect.html';
  const isBlog = filename === 'blog.html' || filename === 'article.html';
  const isHome = !isConnect && !isBlog && filename === 'index.html';

  const inBlogDir = location.pathname.includes('/blog/');

  const resolveLink = (target) => {
    if (inBlogDir) {
      if (target === 'index.html') return '../index.html';
      if (target === 'connect.html') return '../connect.html';
      if (target === 'blog/') return 'index.html'; // link to blog index while in blog dir
    }
    return target;
  };

  const baseLinkClass = "block w-fit px-6 py-2 text-lg font-medium transition-colors rounded-full";
  const activeClass = "bg-black text-white dark:bg-white dark:text-black";
  const inactiveClass = "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white";

  const homeClass = `${baseLinkClass} ${isHome ? activeClass : inactiveClass}`;
  const aboutClass = `${baseLinkClass} ${isConnect ? activeClass : inactiveClass}`;
  const blogClass = `${baseLinkClass} ${isBlog ? activeClass : inactiveClass}`;

  // Mobile menu classes
  const mobileBaseClass = "block w-full text-center py-4 rounded-full text-2xl font-medium transition-colors";
  const mobileActive = "bg-black text-white dark:bg-white dark:text-black";
  const mobileInactive = "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900";

  const mHomeClass = `${mobileBaseClass} ${isHome ? mobileActive : mobileInactive}`;
  const mAboutClass = `${mobileBaseClass} ${isConnect ? mobileActive : mobileInactive}`;
  const mBlogClass = `${mobileBaseClass} ${isBlog ? mobileActive : mobileInactive}`;

  // Shared Socials HTML generator
  const renderSocials = (isMobileFooter = false) => {
    const containerClass = isMobileFooter
      ? 'px-6 py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-10'
      : 'mt-12 space-y-8';

    const iconSize = isMobileFooter ? 'h-8' : 'h-6';
    const linkClass = isMobileFooter
      ? 'p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity dark:invert'
      : 'opacity-40 hover:opacity-100 transition-opacity dark:invert';

    const textClass = isMobileFooter
      ? 'text-base font-medium text-zinc-500 dark:text-zinc-400 mb-4'
      : 'text-sm text-zinc-500 dark:text-zinc-400 mb-3';

    const blogTextClass = isMobileFooter ? 'text-sm' : 'text-xs';
    const arrowSize = isMobileFooter ? 'w-4 h-4' : 'w-3 h-3';

    // Fix asset paths if in blog dir
    const assetPath = (path) => inBlogDir ? `../${path}` : path;

    return `
    <div class="${containerClass}">
        <div class="flex gap-8 ${blogTextClass} font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
          <a href="https://medium.com/@wirawibisana" target="_blank" rel="noopener" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Medium <img src="${assetPath('assets/Sidebar Icons/Arrow Up Icon.svg')}" class="${arrowSize} dark:invert"></a>
          <a href="https://drive.google.com/uc?export=download&id=1yYLOBPcRKCmqCmS25Kql7Hf--xY9Ep_L" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Resume <img src="${assetPath('assets/Sidebar Icons/Arrow Up Icon.svg')}" class="${arrowSize} dark:invert"></a>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <div>
          <p class="${textClass}">I post videos about design</p>
          <div class="flex gap-6">
            <a href="https://www.instagram.com/wira.wibisana/reels/" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Instagram SVG Icon.svg')}" class="${iconSize} w-auto"></a>
            <a href="https://www.youtube.com/@wiraa.wibisana7777" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/YouTube SVG Icons (1).svg')}" class="${iconSize} w-auto"></a>
            <a href="https://www.tiktok.com/@wira.wibisana" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Tiktok SVG Icons (1).svg')}" class="${iconSize} w-auto"></a>
          </div>
        </div>

        <div>
          <p class="${textClass}">Contact me here!</p>
          <div class="flex gap-6">
            <a href="https://linkedin.com/in/wira29" target="_blank" rel="noopener" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/LinkedIn SVG Icon.svg')}" class="${iconSize} w-auto"></a>
            <a href="mailto:atmanawiera@gmail.com" class="${linkClass}"><img src="${assetPath('assets/Sidebar Icons/Mail SVG Icon (1).svg')}" class="${iconSize} w-auto"></a>
          </div>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <button id="${isMobileFooter ? 'theme-toggle-mobile' : 'theme-toggle'}" class="opacity-40 hover:opacity-100 transition-opacity p-2 -m-2">
          <img src="${assetPath('assets/Sidebar Icons/Moon Stars Icon.svg')}" class="${iconSize} w-6 dark:hidden">
          <img src="${assetPath('assets/Sidebar Icons/Sun SVG Icon.svg')}" class="${iconSize} w-6 hidden dark:block invert">
        </button>
      </div>
  `;
  };

  mount.innerHTML = `
    <!-- Desktop Sidebar (Hidden on Mobile) -->
    <aside class="hidden lg:flex fixed top-0 left-0 w-[348px] h-screen bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col p-12 overflow-y-auto z-50 transition-colors duration-300">
      <!-- Header -->
      <a href="/" class="mb-12 block group">
        <h1 class="text-3xl font-semibold text-black dark:text-white tracking-tight mb-2 group-hover:opacity-70 transition-opacity">Wira Wibisana</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Product Designer</p>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Based in Bali</p>
      </a>

      <hr class="border-zinc-200 dark:border-zinc-800 mb-12">

      <!-- Nav -->
      <nav class="space-y-4 flex-1">
        <a href="/" class="${homeClass}">Projects</a>
        <a href="/connect.html" class="${aboutClass}">Why Hire Me?</a>
        <a href="/blog/" class="${blogClass}">Blog & Case Studies</a>
      </nav>

      <!-- Bottom Details (Desktop) -->
      ${renderSocials(false)}
    </aside>

    <!-- Mobile Top Bar (Hidden on Desktop) -->
    <header class="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[60] px-6 py-4 flex justify-between items-center transition-colors">
      <a href="${resolveLink('index.html')}" class="font-semibold text-lg text-black dark:text-white">Wira Wibisana</a>
      <button id="mobile-menu-btn" class="p-2 -mr-2 text-black dark:text-white focus:outline-none">
        <!-- Menu Icon -->
        <svg id="icon-menu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <!-- Close Icon (Hidden) -->
        <svg id="icon-close" class="hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </header>

    <!-- Mobile Menu Dropdown (Hugs content) -->
     <div id="mobile-menu-overlay" class="lg:hidden fixed top-[69px] left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[55] hidden flex-col p-6 space-y-4 transition-all shadow-xl">
       <nav class="space-y-2 flex flex-col w-full">
        <a href="/" class="${mHomeClass}">Projects</a>
        <a href="/connect.html" class="${mAboutClass}">Why Hire Me?</a>
        <a href="/blog/" class="${mBlogClass}">Blog & Case Studies</a>
      </nav>
    </div>
  `;

  // Render Mobile Footer into specific root
  const mobileFooterRoot = document.getElementById('mobile-footer-root');
  if (mobileFooterRoot) {
    mobileFooterRoot.innerHTML = renderSocials(true);
  }

  // --- Theme Toggle Logic (Shared) ---
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    } catch (e) { }
  };

  // Bind to Desktop Toggle
  const deskToggle = document.getElementById('theme-toggle');
  if (deskToggle) deskToggle.addEventListener('click', toggleTheme);

  // Bind to Mobile Toggle
  const mobToggle = document.getElementById('theme-toggle-mobile');
  if (mobToggle) mobToggle.addEventListener('click', toggleTheme);

  // Initial Check
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // --- Mobile Menu Logic ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = !menuOverlay.classList.contains('hidden');
      if (isExpanded) {
        // Close
        menuOverlay.classList.add('hidden');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else {
        // Open
        menuOverlay.classList.remove('hidden');
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });
  }

  initProjectModal();
}
