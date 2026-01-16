export function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.getElementById('modal-backdrop');

    if (!modal) return;

    const openModal = (e) => {
        e.preventDefault();
        const link = e.currentTarget;
        if (link.dataset.title) {
            const titleEl = document.getElementById('modal-title');
            if (titleEl) titleEl.textContent = link.dataset.title;
        }

        // Update Modal Content (Videos or Images)
        const mediaSlots = [
            { idBase: 'modal-iframe-main', idVideo: 'modal-video-main', idImg: 'modal-img-main', src: link.getAttribute('data-video-main') },
            { idBase: 'modal-iframe-1', idVideo: 'modal-video-1', idImg: 'modal-img-1', src: link.getAttribute('data-video-1') },
            { idBase: 'modal-iframe-2', idVideo: 'modal-video-2', idImg: 'modal-img-2', src: link.getAttribute('data-video-2') },
            { idBase: 'modal-iframe-3', idVideo: 'modal-video-3', idImg: 'modal-img-3', src: link.getAttribute('data-video-3') },
            { idBase: 'modal-iframe-4', idVideo: 'modal-video-4', idImg: 'modal-img-4', src: link.getAttribute('data-video-4') },
        ];

        mediaSlots.forEach(slot => {
            const vidEl = document.getElementById(slot.idVideo);
            const imgEl = document.getElementById(slot.idImg);

            // Source is already URL-encoded from HTML attributes
            const source = slot.src || '';

            // Reset state
            if (vidEl) {
                vidEl.classList.add('hidden');
                vidEl.pause();
                vidEl.removeAttribute('src');
                vidEl.load();
            }
            if (imgEl) {
                imgEl.classList.add('hidden');
                imgEl.src = '';
            }

            if (source) {
                // Check if image (decode for extension check only)
                const decodedSource = decodeURIComponent(source);
                const isImage = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(decodedSource);

                if (isImage) {
                    // Show Image - use the already-encoded source
                    if (imgEl) {
                        imgEl.src = source;
                        imgEl.classList.remove('hidden');
                    }
                } else {
                    // Show Video - use the already-encoded source
                    if (vidEl) {
                        vidEl.classList.remove('hidden');
                        vidEl.src = source;
                        vidEl.load(); // Critical for some browsers to pick up new source immediately
                        const playPromise = vidEl.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.warn('Auto-play prevented:', error);
                            });
                        }
                    }
                }
            }
        });

        // Update Website Button
        const websiteBtn = document.getElementById('modal-website-btn');
        const websiteLabel = document.getElementById('modal-website-label');
        const websiteLink = link.getAttribute('data-link');
        const websiteText = link.getAttribute('data-link-label') || 'Visit Website';

        if (websiteBtn) {
            if (websiteLink) {
                websiteBtn.href = websiteLink;
                websiteBtn.classList.remove('hidden');
                if (websiteLabel) websiteLabel.textContent = websiteText;
            } else {
                websiteBtn.classList.add('hidden');
            }
        }

        modal.classList.remove('hidden');
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';

        // Pause all videos
        const vids = modal.querySelectorAll('video');
        vids.forEach(v => {
            v.pause();
            v.removeAttribute('src');
            v.load();
        });
    };

    // Attach click listeners to all project cards
    // We look for any <a> that starts with /showcase (local) or has data-title (if used elsewhere)
    // Re-selecting based on the current index.html structure
    const projectLinks = document.querySelectorAll('a.group[href^="/showcase"], a.group[href^="/project"], a[data-trigger="modal"]');
    projectLinks.forEach(l => l.addEventListener('click', openModal));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
