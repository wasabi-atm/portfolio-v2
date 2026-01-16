export function currentFilename() {
    try {
        const path = (location.pathname || '/').replace(/\/+$/, ''); // strip trailing slashes
        const segs = path.split('/').filter(Boolean);
        if (segs.length === 0) return 'index.html';

        // Map clean URLs to their source HTML files
        const first = segs[0];
        if (first === 'blog') return 'blog.html'; // Treat /blog/* as blog.html context
        if (first === 'project') return 'project.html';
        if (first === 'connect') return 'connect.html';
        if (first === 'showcase') return 'showcase.html';
        if (first === 'carte') return 'carte.html';

        const last = segs[segs.length - 1];
        if (last && last.includes('.')) return last;
        return 'index.html';
    } catch {
        return 'index.html';
    }
}

export function stripHtml(html = '') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

export function wordsPerMinuteEstimate(text) {
    if (!text) return 1;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
}

export function formatBlogDate(input) {
    if (!input) return '';
    try {
        const d = new Date(input);
        if (isNaN(d)) return '';
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
}

export function formatBlogDateShort(input) {
    if (!input) return '';
    try {
        const d = new Date(input);
        if (isNaN(d)) return '';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
}

export function formatDateHuman(input) {
    if (!input) return '';
    try {
        const d = new Date(input);
        if (isNaN(d)) return '';
        const m = d.toLocaleDateString('en-US', { month: 'short' });
        const y = d.getFullYear();
        return `${m} ${y}`;
    } catch { return ''; }
}

export function svgIcon(name, cls = '') {
    // Simple map or lookup if needed, but existing code used literal returns mostly.
    // If app.js had a giant svgIcon function, we'd paste it here.
    // Checking app.js content, it had a specific implementation.
    // pasting the implementation:

    if (name === 'arrow-right') {
        return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`;
    }
    return '';
}

// ==================== Dynamic multi-line clamp (bound to image height) ====================
export function computeLineHeightPx(el) {
    const style = window.getComputedStyle(el);
    const lh = style.lineHeight;
    if (lh === 'normal') {
        // approx 1.2 * fontSize
        const fs = parseFloat(style.fontSize);
        return fs * 1.2;
    }
    return parseFloat(lh);
}
