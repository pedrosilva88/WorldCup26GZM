# WorldCupGZM (worldcupgzm@0.1.0)

This design system is the published worldcupgzm React library, bundled as a single
browser global. All 7 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.WorldCupGZM`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.WorldCupGZM.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Header } = window.WorldCupGZM;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Header />);
```

## Tokens

115 CSS custom properties from worldcupgzm. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (29): `--tw-border-style`, `--tw-shadow-color`, `--tw-inset-shadow-color`, …
- **spacing** (5): `--tw-space-y-reverse`, `--tw-inset-shadow`, `--tw-inset-shadow-alpha`, …
- **typography** (17): `--font-geist-sans`, `--font-geist-mono`, `--font-bebas`, …
- **radius** (3): `--radius-lg`, `--radius-xl`, `--radius-2xl`
- **shadow** (7): `--tw-shadow`, `--tw-shadow-alpha`, `--tw-ring-shadow`, …
- **other** (54): `--tw-translate-x`, `--tw-translate-y`, `--tw-translate-z`, …

## Components

### general
- `Header`
- `HeroSection`
- `HomePalpitesSection`
- `Leaderboard`
- `LeaderboardSection`
- `MatchCard`
- `RegisterSection`
