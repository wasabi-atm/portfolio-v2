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

            let source = slot.src;

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

            // Fallback only for explicit Clamby title
            if (!source) {
                if (link.dataset.title === 'Clamby') {
                    if (slot.idVideo === 'modal-video-main') source = 'assets/Clamby/Clamby Achievement.webm';
                    if (slot.idVideo === 'modal-video-1') source = 'assets/Clamby/Clamby Data 1.webm';
                    if (slot.idVideo === 'modal-video-2') source = 'assets/Clamby/Clamby Data 2.webm';
                    if (slot.idVideo === 'modal-video-3') source = 'assets/Clamby/Clamby Data 3.webm';
                    if (slot.idVideo === 'modal-video-4') source = 'assets/Clamby/Clamby Data 4.webm';
                }
            }

            if (source) {
                // Check if image
                const isImage = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(source);

                if (isImage) {
                    // Show Image
                    if (imgEl) {
                        imgEl.src = source;
                        imgEl.classList.remove('hidden');
                    }
                } else {
                    // Show Video
                    if (vidEl) {
                        vidEl.classList.remove('hidden');
                        vidEl.src = source;
                        vidEl.play().catch(() => { });
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
    const projectLinks = document.querySelectorAll('a.group[href^="/showcase"], a.group[href^="/project"]');
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
