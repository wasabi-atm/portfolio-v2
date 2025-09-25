# Repository Guidelines

## Project Structure & Module Organization
- Root HTML: `index.html`, `blogs.html`, `connect.html`, `showcase.html`, `article.html`
- Scripts: `app.js` (navigation, Builder.io data, UI behaviors)
- Styles: `src/input.css` (Tailwind source) → `dist/output.css` (compiled)
- Assets: `assets/` (images, media)

## Build, Test, and Development Commands
- Install deps: `npm install`
- Build CSS once: `npx @tailwindcss/cli -i src/input.css -o dist/output.css`
- Watch CSS: `npx @tailwindcss/cli -i src/input.css -o dist/output.css --watch`
- Run locally: open `index.html` in a browser, or use any static server (e.g., `npx http-server .`).
- Tests: none yet (`npm test` is a placeholder).

## Coding Style & Naming Conventions
- JavaScript: ES2015+, 2‑space indent, semicolons, single quotes.
- HTML: filenames are kebab‑case; prefer semantic elements; use Tailwind utility classes.
- CSS: authored via Tailwind v4 (`@import "tailwindcss";` in `src/input.css`). Avoid custom CSS unless necessary; if needed, place it in `src/input.css`.
- Paths: reference compiled CSS as `/dist/output.css` from HTML.

## Testing Guidelines
- No automated framework configured. Perform manual QA:
  - Load pages and confirm navigation renders.
  - Projects/Blogs content loads from Builder.io without console errors.
  - Check responsive layouts at mobile, tablet, desktop breakpoints.

## Commit & Pull Request Guidelines
- Commits: short, imperative style (e.g., “add blogs list”, “fix nav state”).
- PRs should include:
  - What/why summary; link issues if applicable.
  - Screenshots or screen recordings for UI changes.
  - Notes on build impact (e.g., “recompile Tailwind”).
  - Kept focused and small; update `dist/output.css` when styles change.

## Security & Configuration Tips
- Do not commit secrets. The Builder API key in `app.js` is intended for public client usage; keep any private keys out of the repo.
- This is a static site; prefer environment‑agnostic changes and avoid adding server code without discussion.

## Agent‑Specific Instructions
- Make minimal, targeted changes; do not rename files or restructure without need.
- If you alter build or tooling, update this document and `package.json` scripts accordingly.
