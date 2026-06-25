// generatePreviewSource (package shape) — emits the preview wrapper body
// (written to the generated cache, .design-sync/.cache/previews/<Name>.tsx)
// for one component, or null when there is nothing real to compose from.
// No stories exist in this shape, so preview quality comes from AUTHORED
// sources, in order:
//   1. a user-authored .design-sync/previews/<Name>.tsx — owned by location,
//      always wins, and this generator is never consulted for it
//   2. cfg.previewArgs.<Name> — props supplied via config; compiled into a
//      real preview module like any authored file
//   3. null — the html ships the floor card (a single render attempt with
//      a typographic fallback), which is honest about being unauthored
// No guessed variant grids or namespace stubs: with no reference render to
// verify against, an elaborate guess and a simple one are equally
// unverifiable, and a guess styled like a real preview reads as more
// finished than it is.

import { exportName } from './common.mjs';

// smartDefaultProps $raw values — a small closed set of literal expressions.
// Whitelist-gated so config-sourced previewArgs can't inject arbitrary JS.
const RAW_OK = /^(?:\(\)\s*=>\s*(?:null|undefined|\{\})|new Date\(\))$/;

// JSON props → JSX attribute string. Functions / React elements drop out.
// `$raw` values (smartDefaultProps' crash-prevention stubs) emit as bare
// expression containers; everything else as `{JSON.stringify(v)}`.
export function propsToJsx(args) {
  const out = [];
  for (const [k, v] of Object.entries(args)) {
    if (typeof v === 'function' || (v && typeof v === 'object' && v.$$typeof)) continue;
    // Dotted argType keys (`Title.as`) are sub-component addressing — not a
    // valid JSX attr name on the root.
    if (k === 'children' || k.includes('.')) continue;
    if (v && typeof v === 'object' && typeof v.$raw === 'string') {
      if (RAW_OK.test(v.$raw)) out.push(` ${k}={${v.$raw}}`);
    } else if (v && typeof v === 'object' && v.$jsx) {
      // floor-card-only marker — not expressible as a JSX attr here
    } else if (v === true) out.push(` ${k}`);
    else {
      try { out.push(` ${k}={${JSON.stringify(v)}}`); } catch { /* skip uncloneable */ }
    }
  }
  return out.join('');
}

// Children between `>`/`<` — wrap in `{JSON.stringify(...)}` so a value
// containing `{ } < >` doesn't reopen the parser. `{"plain"}` renders the
// same as `plain`, so always-wrap is correct.
const jsxChildren = (s) => `{${JSON.stringify(s)}}`;

// Generate the preview .tsx body for one component (marker is prepended by
// writePreviewFiles so its hash covers this body only), or null → floor card.
export function generatePreviewSource(c, { smart, exported, pkg, previewArgs }) {
  if (!previewArgs) return null;
  // smart.props carries crash-prevention stubs from the .d.ts (required
  // callbacks → {$raw:'()=>null'}, arrays → [], open/visible → true). Spread
  // under explicit args so stubs fill gaps without overriding real values.
  const stubs = smart?.props ?? {};
  const stubKids = typeof stubs.children === 'string' ? stubs.children : null;
  const used = new Set(exported);
  const kids = (typeof previewArgs.children === 'string' ? previewArgs.children : null) ?? stubKids;
  const attrs = propsToJsx({ ...stubs, ...previewArgs });
  const jsx = kids
    ? `<${c.name}${attrs}>${jsxChildren(kids)}</${c.name}>`
    : `<${c.name}${attrs} />`;
  return `import { ${c.name} } from '${pkg}';\n\nexport const ${exportName('Preview', used)} = () => ${jsx};\n`;
}
