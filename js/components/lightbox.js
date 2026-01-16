export function openLightbox(images, startAt = 0) {
    if (!images || !images.length) return;

    // Create or get lightbox DOM
    let box = document.getElementById('lightbox-overlay');
    if (!box) {
        box = document.createElement('div');
        box.id = 'lightbox-overlay';
        box.className = 'fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none';
        box.innerHTML = `
      <button id="lb-close" class="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[102]">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <button id="lb-prev" class="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[102] hidden md:block">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button id="lb-next" class="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[102] hidden md:block">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
         <img id="lb-img" class="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-300 scale-95 opacity-0" src="" alt=""/>
         <div id="lb-counter" class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest uppercase"></div>
      </div>
    `;
        document.body.appendChild(box);

        box.querySelector('#lb-close').onclick = cleanup;
        box.querySelector('#lb-prev').onclick = (e) => { e.stopPropagation(); show(currIdx - 1); };
        box.querySelector('#lb-next').onclick = (e) => { e.stopPropagation(); show(currIdx + 1); };
        box.onclick = (e) => { if (e.target === box) cleanup(); }; // click outside
    }

    let currIdx = startAt;
    const imgEl = box.querySelector('#lb-img');
    const cntEl = box.querySelector('#lb-counter');

    // Show function
    function show(i) {
        if (i < 0) i = images.length - 1;
        if (i >= images.length) i = 0;
        currIdx = i;

        // Reset anim state
        imgEl.style.transform = 'scale(0.95)';
        imgEl.style.opacity = '0';

        setTimeout(() => {
            imgEl.src = images[currIdx];
            cntEl.textContent = `${currIdx + 1} / ${images.length}`;
            imgEl.onload = () => {
                imgEl.style.transform = 'scale(1)';
                imgEl.style.opacity = '1';
            };
        }, 150);
    }

    function onKey(e) {
        if (e.key === 'Escape') cleanup();
        if (e.key === 'ArrowLeft') show(currIdx - 1);
        if (e.key === 'ArrowRight') show(currIdx + 1);
    }

    function cleanup() {
        box.classList.remove('opacity-100', 'pointer-events-auto');
        box.classList.add('opacity-0', 'pointer-events-none');
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
    }

    // Open
    box.classList.remove('opacity-0', 'pointer-events-none');
    box.classList.add('opacity-100', 'pointer-events-auto');
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    show(currIdx);
}
