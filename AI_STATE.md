# AI State

## Purpose & stack
- Personal portfolio site for Assi Maimon (DevOps engineer): home page + one detail page per project.
- Static multi-page HTML styled with Tailwind CSS v3 (CLI build), deployed to S3 (`www.maimons.dev`) via GitHub Actions.

## Key files
- `index.html` — home page; project/tool cards link to the detail pages.
- `*.html` (others) — project detail pages, self-contained.
- `src/input.css` — Tailwind entry + shared CSS: default color/radius variables, `color-scheme`, cross-document view transitions.
- `tailwind.config.js` — maps every color token to `rgb(var(--c-<name>) / <alpha-value>)` and radii to `var(--r*)`.
- `styles.css` — **generated** by `npx -y tailwindcss@3.4.17 -i src/input.css -o styles.css --minify`. Committed for local preview; CI rebuilds it before deploying.
- `.github/workflows/deploy.yml` — builds CSS, then `aws s3 sync` (excludes `src/`, `*.md`, config, `scaler/`).

## Conventions
- Rebuild `styles.css` after adding Tailwind classes to any HTML, or local preview will lack them.
- Per-page themes: `kube-man`, `scaler`, `settings` (own palettes) and `dmarcer` override `--c-*` / `--r*` in a `:root {}` inside the page's inline `<style>`. Other pages use the defaults from `src/input.css`.
- `styles.css` link must come **after** the Google Fonts links, otherwise the icon font's `font-size: 24px` overrides Tailwind `text-*` on icons.
- Material Symbols are loaded per page with `&icon_names=` (subset, ~11 KB instead of ~1.1 MB). When adding an icon, add its name to that page's link (alphabetical order) or it renders as plain text.
- Every Material Symbols `<span>` is decorative and carries `aria-hidden="true"`; adjacent text provides the meaning.
- Motion is opt-in: CSS animations live inside `@media (prefers-reduced-motion: no-preference)`; Tailwind scale/spin utilities use `motion-safe:`.
- Each page has `color-scheme`/`theme-color` meta, OG/Twitter tags, and a `speculationrules` prerender (moderate) for same-origin links.
- Images: local WebP with explicit `width`/`height`; hero image has `fetchpriority="high"`; below-fold images `loading="lazy"`.

## Decisions
- `font-size-adjust` was tried for font-fallback stability and removed: values from font metadata shrank the loaded fonts in Chrome and the inherited value shrank icons.
- `images/3d-logo.jpeg` is kept for `og:image` (broadest crawler support); `favicon.jpeg` is no longer referenced.

## Session Log
### 2026-11-16 — Modern web guidance pass
- Replaced Tailwind Play CDN with CLI build (`styles.css`), CSS-variable theming; verified pixel-identical render before other changes.
- Added color-scheme, view transitions, speculation rules, OG tags, icon subsetting + aria-hidden, reduced-motion gating, landmark/heading fixes, aria-current breadcrumbs, 11px minimum label size, local WebP images, PNG favicons, deploy workflow build step and `images/**` trigger.
- Follow-up: `.DS_Store` and `favicon.jpeg` may still exist in the S3 bucket (excluded files aren't removed by `--delete`).
