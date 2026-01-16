export function initConnectPageAccordion() {
    const container = document.getElementById('connect-accordions');
    if (!container) return;

    const items = container.querySelectorAll('.accordion-item');
    const portrait = document.getElementById('connect-portrait');
    const defaultPortrait = portrait ? portrait.getAttribute('src') : '';

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            items.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-body').style.maxHeight = '0';
            });
            if (!isOpen) {
                item.classList.add('open');
                const body = item.querySelector('.accordion-body');
                body.style.maxHeight = body.scrollHeight + 'px';

                // Update portrait if data-img exists
                const img = item.dataset.img;
                if (img && portrait) portrait.src = img;
            } else {
                if (portrait) portrait.src = defaultPortrait;
            }
        });
    });
}

export function initTestimonialsCarousel() {
    const container = document.getElementById('testimonials-container');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');

    if (!container || !prevBtn || !nextBtn) return;

    // Get the width of one card including gap
    const getScrollAmount = () => {
        const firstCard = container.querySelector('.snap-start');
        if (!firstCard) return 320; // fallback
        const cardWidth = firstCard.offsetWidth;
        const gap = 16; // gap-4 = 1rem = 16px
        return cardWidth + gap;
    };

    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });
}
