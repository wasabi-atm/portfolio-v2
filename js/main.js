import { renderSidebar } from './components/sidebar.js';
import { loadProjectsAndRender, loadHomePinnedCaseStudies } from './pages/project-list.js';
import { loadBlogsAndRender } from './pages/blog.js';
import { loadProjectDetail } from './pages/detail.js';
import { initConnectPageAccordion } from './pages/connect.js';
import { currentFilename } from './utils.js';
import { initProjectModal } from './components/modal.js';

// Init Prefetch
function initPrefetch() {
    const links = document.querySelectorAll('aside a[href^="/"], a[href^="/"]');
    const seen = new Set();

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#') || seen.has(href)) return;

            seen.add(href);
            const linkEl = document.createElement('link');
            linkEl.rel = 'prefetch';
            linkEl.href = href;
            document.head.appendChild(linkEl);
        });
    });
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

    if (document.getElementById('project-detail')) {
        loadProjectDetail();
    }

    if (document.getElementById('connect-accordions')) {
        initConnectPageAccordion();
    }

    // If index.html, ensure modals are init (handled by renderSidebar > initProjectModal, but good to ensure)
    // initProjectModal is called in renderSidebar, so we are good.
});
