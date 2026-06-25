# Design-sync notes — WorldCupGZM

## Repo quirks

- **No dist/ folder** — app repo (Next.js 16 App Router), not a DS package. Converter runs in synth-entry mode via `_ds_entry.tsx` (custom barrel with `export { default as Name }` re-exports — required because `export *` doesn't re-export `export default`).
- **Next.js imports** — `next/link`, `next/navigation`, `next/image` are shimmed in `.design-sync/overrides/bundle.mjs` (forked from lib/bundle.mjs). The symlink `.design-sync/node_modules → ../.ds-sync/node_modules` must exist for the fork to resolve bare esbuild import — recreate it after a fresh clone: `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`.
- **Tailwind CSS** — no standalone CLI, compiled via Next.js Turbopack dev build. CSS lives in `ds-build-css/styles.css` (fonts + CSS variables inlined directly, no `@import './utilities.css'` — all in one file to avoid the `[CSS_IMPORT_MISSING]` error).
- **Self-referencing package** — `node_modules/worldcupgzm → ../` symlink needed so converter can find the package. Already created; survives `npm install` but not `npm ci --prefer-offline` which prunes non-registry symlinks. Recreate if missing: `ln -sfn ../ node_modules/worldcupgzm`.
- **`@/` path aliases** — resolved via `tsconfig.json` paths; `--tsconfig tsconfig.json` flag picks it up automatically.

## Preview notes

- **HomePalpitesSection + LeaderboardSection** — data-fetching components that call `/api/` endpoints. In preview they get `SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input` (non-blocking `[RENDER_ERRORS]`). Both are now authored with dark background wrappers — they render their empty/loading states, which is honest.
- **MatchCard** — needs dark background wrapper in previews (`background: "#060d1e"`); white text on white preview page is invisible.
- **Lucide icons** — bundled inline, no separate icon package needed.
- **Google Fonts** — Geist, Geist Mono, Bebas Neue loaded via CDN `@import url(...)` in `styles.css`. Fonts load at runtime from Google's CDN; `[FONT_REMOTE]` is expected and non-blocking.

## Re-sync risks

- **Tailwind CSS changes** — if new Tailwind utilities are added to the app, `ds-build-css/utilities.css` (and thus `styles.css`) needs regenerating. Process: start Next.js dev server (`npm run dev`), copy `.next/dev/static/chunks/src_app_globals_css_*.single.css` over `ds-build-css/utilities.css`, then rebuild `styles.css` (inline the file content after the font imports + `:root` block — no separate `@import`).
- **New components** — add to `_ds_entry.tsx` barrel AND `componentSrcMap` in `design-sync.config.json`. Without both, the component won't appear in the bundle.
- **`@/lib/flags`, `@/lib/matches-data`** — compiled into the bundle at sync time. If team names or flag URLs change, re-run the converter.
- **Node/esbuild version** — `.ds-sync/` scripts use the esbuild version installed at sync time. A major esbuild upgrade could change bundle output. The `.ds-sync/` dir is gitignored and re-staged on each sync from the bundled skill.
