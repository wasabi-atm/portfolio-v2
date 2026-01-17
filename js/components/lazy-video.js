/**
 * Lazy Video Loader
 * Uses IntersectionObserver to defer video loading until they enter viewport
 * On mobile: shows poster with play button, loads video on tap
 */

const isMobile = () => window.matchMedia('(max-width: 1023px)').matches;

export function initLazyVideos() {
    const videos = document.querySelectorAll('video[data-src]');

    if (!videos.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '100px', // Start loading slightly before entering viewport
        threshold: 0
    };

    const loadVideo = (video) => {
        const src = video.dataset.src;
        if (!src) return;

        video.src = src;
        video.removeAttribute('data-src');
        video.load();

        // On desktop, try to autoplay if it has autoplay attribute
        if (!isMobile() && video.hasAttribute('autoplay')) {
            video.play().catch(() => {
                // Autoplay blocked, that's fine
            });
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadVideo(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    videos.forEach(video => {
        // For mobile: disable autoplay and ensure poster is shown
        if (isMobile()) {
            video.removeAttribute('autoplay');
            video.setAttribute('preload', 'none');

            // Add play button overlay if not already present
            const parent = video.parentElement;
            if (parent && !parent.querySelector('.video-play-overlay')) {
                const overlay = document.createElement('button');
                overlay.className = 'video-play-overlay absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity z-10';
                overlay.innerHTML = `
                    <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                `;
                overlay.setAttribute('aria-label', 'Play video');

                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loadVideo(video);
                    video.play();
                    overlay.remove();
                });

                // Only add if parent is positioned
                if (getComputedStyle(parent).position === 'static') {
                    parent.style.position = 'relative';
                }
                parent.appendChild(overlay);
            }
        }

        observer.observe(video);
    });
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyVideos);
} else {
    initLazyVideos();
}
