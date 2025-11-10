# Carte Landing Page Export

This folder packages everything needed to host Carte as its own static site.

## Structure

- `index.html` – standalone HTML (copied from `carte.html`).
- `src/input.css` – Tailwind source. Update utilities here.
- `dist/output.css` – compiled CSS (run the build before deploying).
- `assets/` – only the images/videos Carte references.
- `package.json` – Tailwind CLI + helper scripts.

## Setup

```bash
npm install
npm run build:css
npx http-server .
```

Or run `npm run watch:css` during development.

## Deploying

Upload `index.html`, `dist/output.css`, and `assets/` to any static host (Vercel, Netlify, S3, etc.). No other scripts are required; the only runtime JS is at the bottom of `index.html`.
