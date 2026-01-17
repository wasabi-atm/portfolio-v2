import { renderSidebar } from './components/sidebar.js';
import { loadProjectsAndRender, loadHomePinnedCaseStudies } from './pages/project-list.js';
import { loadBlogsAndRender } from './pages/blog.js';
import { loadProjectDetail } from './pages/detail.js';
import { initConnectPageAccordion, initTestimonialsCarousel } from './pages/connect.js';
import { currentFilename } from './utils.js';
import { initProjectModal } from './components/modal.js';
import { initLazyVideos } from './components/lazy-video.js';

// Init Prefetch
function initPrefetch() {
    // Aggressively prefetch sidebar links and other internal links
    const prefetchLinks = () => {
        const links = document.querySelectorAll('aside a[href^="/"], a[href^="/"]');
        const seen = new Set();

        links.forEach(link => {
            let href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript')) return;

            // Normalize
            if (href.endsWith('/') && href.length > 1) href = href + 'index.html';

            if (seen.has(href)) return;
            seen.add(href);

            const linkEl = document.createElement('link');
            linkEl.rel = 'prefetch';
            linkEl.href = href;
            document.head.appendChild(linkEl);
            console.log('Prefetching:', href);
        });
    };

    // Run after main load to prioritize critical resources
    if (document.readyState === 'complete') {
        setTimeout(prefetchLinks, 1000);
    } else {
        window.addEventListener('load', () => setTimeout(prefetchLinks, 1000));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    initPrefetch();

    const file = currentFilename();

    if (document.getElementById('home-pinned-grid')) {
        loadHomePinnedCaseStudies();
    }

    if (document.getElementById('projects-grid-3col')) {
        loadProjectsAndRender();
    }

    if (document.getElementById('blogs-list')) {
        loadBlogsAndRender();
    }

    if (document.getElementById('project-detail') || document.getElementById('blog-detail')) {
        loadProjectDetail();
    }

    if (document.getElementById('connect-accordions')) {
        initConnectPageAccordion();
    }

    if (document.getElementById('testimonials-container')) {
        initTestimonialsCarousel();
    }

    // If index.html, ensure modals are init (handled by renderSidebar > initProjectModal, but good to ensure)
    // initProjectModal is called in renderSidebar, so we are good.
});
