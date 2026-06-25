// The render-contract hash recipe — single source of truth for THREE
// consumers that must agree byte-for-byte:
//   - package-build.mjs writes the recipe's outputs into _ds_sync.json (the
//     uploaded sidecar future syncs diff against),
//   - package-capture.mjs / compare.mjs key their local grade lifecycle on
//     gradeKeyFrom(styleSha, renderHash),
//   - lib/remote-diff.mjs compares a fetched sidecar against a fresh build.
// "Verified" carry-forward is sound only because all three compute the same
// hashes from the same recipe — never fork this logic into a harness.
//
// Factorization: styleSha is the GLOBAL styling surface (a change re-verifies
// everything); renderHash is the PER-COMPONENT contract (a change re-verifies
// that component). gradeKey = H(styleSha, renderHash).

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function hashFile(h, p, label) {
  h.update(label);
  try { h.update(readFileSync(p)); } catch { h.update('∅'); }
}
function hashDir(h, dir, prefix) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { h.update('∅'); return; }
  for (const e of entries.sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (e.name.startsWith('.')) continue;
    if (e.isDirectory()) hashDir(h, join(dir, e.name), `${prefix}${e.name}/`);
    else hashFile(h, join(dir, e.name), `${prefix}${e.name}`);
  }
}

// Global styling surface. The package shape includes the compiled DS bundle
// body (no reference render exists, so a DS change must invalidate absolute
// judgments); the storybook shape excludes it (preview and reference render
// the same compiled code — they move in lockstep, and the comparison verdict
// is unaffected).
export function styleShaFor(OUT, { includeBundleBody }) {
  const h = createHash('sha256');
  if (includeBundleBody) {
    // Body only — the first-line @ds-bundle header embeds per-file hashes,
    // so including it would invalidate everything whenever anything changes.
    h.update('bundlejs');
    try {
      const src = readFileSync(join(OUT, '_ds_bundle.js'), 'utf8');
      h.update(src.slice(src.indexOf('\n') + 1));
    } catch { h.update('∅'); }
  }
  hashFile(h, join(OUT, '_ds_bundle.css'), 'bundlecss');
  hashFile(h, join(OUT, 'styles.css'), 'styles');
  hashDir(h, join(OUT, 'fonts'), 'fonts/');
  hashDir(h, join(OUT, 'tokens'), 'tokens/');
  // The whole vendor runtime, not just the decorators: every preview card
  // loads _vendor/react.js, so a React version bump changes what a verified
  // render meant even when the DS source is byte-identical.
  hashDir(h, join(OUT, '_vendor'), '_vendor/');
  return h.digest('hex');
}

// Per-component render contract. The card html is hashed MINUS its first-line
// @dsCard marker — the marker embeds the display group, and a pure regroup
// must not read as a contract change (the viewport attr does belong: capture
// honors it). For storybook components the story contract (names/export keys,
// NOT the title-embedding storybook id) and the story-file fingerprint join —
// an owned preview doesn't recompile when its story file changes, but the
// contract must move either way.
export function renderHashFor(OUT, c, { stories, srcSha } = {}) {
  const h = createHash('sha256');
  hashFile(h, join(OUT, '_preview', `${c.name}.js`), 'preview');
  hashFile(h, join(OUT, '_preview', `${c.name}.css`), 'previewcss');
  h.update('html');
  try {
    const html = readFileSync(join(OUT, 'components', c.group, c.name, `${c.name}.html`), 'utf8');
    const nl = html.indexOf('\n');
    h.update(/viewport="[^"]*"/.exec(html.slice(0, nl))?.[0] ?? '');
    h.update(html.slice(nl + 1));
  } catch { h.update('∅'); }
  if (stories) h.update(JSON.stringify(stories.map((s) => [s.name, s.exportKey ?? null, s.emitted ?? null])));
  if (srcSha !== undefined) h.update(String(srcSha ?? ''));
  return h.digest('hex').slice(0, 16);
}

// Auxiliary docs surface — guidelines/, README.md. Neither affects renders
// (no verification impact) but both upload, and without a hash a docs-only
// edit would be invisible to the diff and never ship.
export function auxShaFor(OUT) {
  const h = createHash('sha256');
  hashDir(h, join(OUT, 'guidelines'), 'guidelines/');
  hashFile(h, join(OUT, 'README.md'), 'readme');
  return h.digest('hex').slice(0, 16);
}

export function gradeKeyFrom(styleSha, renderHash) {
  return createHash('sha256').update(styleSha).update(renderHash).digest('hex').slice(0, 16);
}
