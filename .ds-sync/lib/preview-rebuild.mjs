#!/usr/bin/env node
// Targeted preview recompile — the fast inner loop for the compare/grading
// workflow, and the ONLY rebuild parallel subagents may run. Recompiles
// the component's preview .tsx (owned .design-sync/previews/ first, else
// generated .design-sync/.cache/previews/) → <out>/_preview/<Name>.js and re-emits the
// module-variant <Name>.html for just the named components. It does NOT touch
// _ds_bundle.js, styles.css, .d.ts, .prompt.md, or any other component — and
// it never wipes --out — so concurrent invocations over disjoint component
// sets are safe (package-build.mjs rm -rf's the whole bundle and must stay
// orchestrator-only).
//
// Reads resolved build facts (namespace, pkg, extraEntries, groups) from
// <out>/.stories-map.json, written by package-build.mjs, so this script can't
// drift from what the full build resolved. The .tsx ownership marker is NOT
// consulted here — whatever is in the file is compiled verbatim (marker
// handling only matters at generation time, in the full build).
//
// Usage:
//   node lib/preview-rebuild.mjs --config design-sync.config.json \
//     --node-modules <nm> --out ./ds-bundle --components Button,Tabs

import { existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { renderHashFor } from './sync-hashes.mjs';

// Honor repo forks of the lib modules, same as package-build's loadLib — a
// targeted rebuild must compile with identical import rules AND identical
// build options, or full builds and rebuilds produce different
// _preview/<Name>.js bytes (which also churns the compare gradeKey). That
// parity is why emit/bundle also route through here even though forking
// them is unsupported (app-contract surface): if a repo forks one anyway,
// both build paths at least see the same code. sync-hashes stays a static
// import — it is fork-banned outright.
async function loadLib(name) {
  const fork = resolve('.design-sync', 'overrides', `${name}.mjs`);
  if (existsSync(fork)) return import(pathToFileURL(fork).href);
  return import(`./${name}.mjs`);
}

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i < 0 ? d : argv[i + 1]; };

const CONFIG_PATH = flag('config');
let cfg = {};
if (CONFIG_PATH) {
  try { cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); }
  catch (e) { console.error(`[CONFIG] ${CONFIG_PATH}: ${e.message}`); process.exit(1); }
}
const NODE_MODULES = flag('node-modules') && resolve(flag('node-modules'));
const OUT = flag('out') && resolve(flag('out'));
const NAMES = (flag('components') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
if (!NODE_MODULES || !OUT || !NAMES.length) {
  console.error('required: --node-modules --out --components A,B [--config design-sync.config.json]');
  process.exit(1);
}

// Build facts from the manifest package-build wrote (authoritative over cfg —
// the namespace is normalized and extraEntries include auto-detected icon
// siblings). Fail loudly when absent: a missing manifest means there was no
// prior full build to rebuild against.
const mapPath = join(OUT, '.stories-map.json');
if (!existsSync(mapPath)) {
  console.error(`[NO_MANIFEST] ${mapPath} not found — run package-build.mjs first.`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(mapPath, 'utf8'));
const GLOBAL = manifest.global;
const PKG = manifest.pkg ?? cfg.pkg;
const PKG_DIR = manifest.pkgDir;
const extraEntries = manifest.extraEntries ?? cfg.extraEntries ?? [];
const byName = new Map((manifest.components ?? []).map((c) => [c.name, c]));

// Group lookup: manifest first, else find the existing component dir.
function groupOf(name) {
  const m = byName.get(name);
  if (m) return m.group;
  const root = join(OUT, 'components');
  try {
    for (const g of readdirSync(root)) {
      if (existsSync(join(root, g, name, `${name}.html`))) return g;
    }
  } catch { /* fall through */ }
  return null;
}

const targets = [];
for (const n of NAMES) {
  const group = groupOf(n);
  if (!group) { console.error(`! ${n}: not in .stories-map.json and no components/*/${n}/ dir — skipped`); continue; }
  if (!existsSync(resolve('.design-sync', 'previews', `${n}.tsx`)) &&
      !existsSync(resolve('.design-sync', '.cache', 'previews', `${n}.tsx`))) {
    console.error(`! ${n}: no ${n}.tsx in .design-sync/previews/ (owned) or .design-sync/.cache/previews/ (generated) — skipped`);
    continue;
  }
  targets.push({ name: n, group });
}
if (!targets.length) { console.error('[ZERO_MATCH] nothing to rebuild'); process.exit(1); }

const { storyImportPlugins } = await loadLib('story-imports');
const { buildPreviews } = await loadLib('previews');
const { reactShim, tsconfigPathsPlugin } = await loadLib('bundle');
const { previewHtmlModule, providerWrapper } = await loadLib('emit');
const { gitWorkspaceRoot } = await loadLib('common');

// cfg.tsconfig is package-relative and bounded the way package-build's
// cfgPath bounds it (realpath inside the workspace root, so symlinks can't
// escape) — full builds and targeted rebuilds must compile with identical
// options from identically-vetted config.
let tsconfigPath = cfg.tsconfig && PKG_DIR ? resolve(PKG_DIR, cfg.tsconfig) : null;
if (tsconfigPath) {
  try {
    const r = relative(gitWorkspaceRoot(realpathSync(dirname(NODE_MODULES))), realpathSync(tsconfigPath));
    if (r.startsWith('..') || isAbsolute(r)) {
      console.error(`  ! tsconfig: ${cfg.tsconfig} resolves outside the workspace root — skipped`);
      tsconfigPath = null;
    }
  } catch { tsconfigPath = null; } // missing/unreadable — same as absent
}
const pathsPlugin = tsconfigPath ? tsconfigPathsPlugin(tsconfigPath) : null;
const storyImports = storyImportPlugins({
  PKG, GLOBAL, extraEntries,
  exported: new Set(manifest.exported ?? []),
  cfg,
  pkgDir: PKG_DIR,
});
const built = await buildPreviews({
  components: targets,
  previewDir: resolve('.design-sync', 'previews'),
  genDir: resolve('.design-sync', '.cache', 'previews'),
  OUT, reactShim, NODE_MODULES, pathsPlugin,
  importPlugins: storyImports.plugins,
  loaders: storyImports.loaders,
});

// Re-emit the module-variant html for each successfully compiled preview.
// Needed when the component previously fell back to the floor-card html
// (its .tsx didn't compile then) — that html doesn't load _preview/<Name>.js.
// Provider wrap mirrors emitPerComponent exactly, including its exportedness
// gate (a cfg.provider naming a non-exported component is dropped, same as
// the full build — the manifest carries the exported set for this purpose).
const hasDecorators = existsSync(join(OUT, '_vendor', 'preview-decorators.js'));
const exportedSet = new Set(manifest.exported ?? []);
const providerHead = cfg.provider?.component?.split('.')[0];
const provider = cfg.provider && (exportedSet.size === 0 || exportedSet.has(providerHead)) ? cfg.provider : null;
const wrap = providerWrapper(provider, GLOBAL, hasDecorators);
const decoratorScript = hasDecorators ? '\n  <script src="../../../_vendor/preview-decorators.js"></script>' : '';
const bundleCssLink = existsSync(join(OUT, '_ds_bundle.css'))
  ? '\n  <link rel="stylesheet" href="../../../_ds_bundle.css">' : '';
let failed = 0;
// Card options mirror emit.mjs's derivation exactly (single-mode cards declare
// the grading viewport).
const OVERRIDES = cfg.overrides ?? {};
for (const t of targets) {
  if (!built.has(t.name)) { failed++; continue; } // buildPreviews already printed the esbuild error
  const previewCssLink = existsSync(join(OUT, '_preview', `${t.name}.css`))
    ? `\n  <link rel="stylesheet" href="../../../_preview/${t.name}.css">` : '';
  const ov = OVERRIDES[t.name] ?? {};
  const card = ov.cardMode === 'single'
    ? { cardMode: 'single', primaryStory: ov.primaryStory, viewport: ov.viewport ?? '900x700' }
    : ov.viewport ? { viewport: ov.viewport } : {};
  const html = previewHtmlModule(t.group, t.name, GLOBAL, wrap, decoratorScript, bundleCssLink, previewCssLink, card);
  const dir = join(OUT, 'components', t.group, t.name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${t.name}.html`), html);
}
// Patch the sidecar entries this rebuild invalidated — _ds_sync.json must
// always describe what's on disk. styleSha and bundleSha are untouched by a
// preview rebuild, so only renderHashes move. CONCURRENCY: this is a plain
// read-modify-write — two concurrent scoped rebuilds can lose one side's
// patch. That's tolerated, not solved: package-validate recomputes every
// render hash from disk and hard-fails on any mismatch, so a lost update is
// caught at the gate, and the orchestrator's final full build rewrites the
// sidecar wholesale anyway.
try {
  const sidecarPath = join(OUT, '_ds_sync.json');
  const sidecar = JSON.parse(readFileSync(sidecarPath, 'utf8'));
  const byName = new Map(manifest.components.map((c) => [c.name, c]));
  for (const t of targets) {
    if (!built.has(t.name)) continue;
    const c = byName.get(t.name);
    if (!c) { console.error(`! ${t.name}: not in the manifest — sidecar entry not patched; run a full package-build before validate/upload`); continue; }
    sidecar.renderHashes[t.name] = renderHashFor(OUT, { name: t.name, group: t.group },
      sidecar.shape === 'storybook'
        ? { stories: (c.stories ?? []).map((st) => ({ name: st.name, exportKey: st.exportKey ?? null, emitted: st.emitted ?? null })), srcSha: c.srcSha ?? null }
        : {});
  }
  writeFileSync(sidecarPath, JSON.stringify(sidecar, null, 2) + '\n');
} catch (e) { console.error(`! _ds_sync.json not updated (${String(e.message ?? e).split('\n')[0]}) — run a full package-build before validate/upload`); }

console.error(`✓ rebuilt ${built.size}/${targets.length} preview(s)${failed ? ` — ${failed} failed to compile (fix the .tsx and re-run)` : ''}`);
process.exit(failed ? 1 : 0);
