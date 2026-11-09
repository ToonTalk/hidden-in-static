// Build the claude.ai artifact version of the app from index.html.
//
// claude.ai wraps a published page in its own <!doctype html><head>…<body> skeleton
// (with charset and viewport metas), so the artifact is the same page without that
// outer document: the head's contents (minus charset/viewport) followed by the body's.
//
//   node tools/build-artifact.mjs      → dist/artifact.html

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const src = readFileSync(new URL('index.html', root), 'utf8');

function once(re, what) {
  const all = src.match(new RegExp(re.source, 'g')) || [];
  if (all.length !== 1) throw new Error(`expected exactly one ${what}, found ${all.length}`);
  return src.match(re)[1];
}

const head = once(/<head>([\s\S]*?)<\/head>/, '<head>');
const body = once(/<body>([\s\S]*?)<\/body>/, '<body>');

const charset = /^<meta charset[^>]*>\r?\n/m;
const viewport = /^<meta name="viewport"[^>]*>\r?\n/m;
if (!charset.test(head) || !viewport.test(head)) throw new Error('charset or viewport meta not found in <head>');
const headInner = head.replace(charset, '').replace(viewport, '').trim();
if (!headInner.startsWith('<title>')) throw new Error('the artifact must start with its <title>');

const out = headInner + '\n\n' + body.trim() + '\n';

for (const must of ['id="screen"', 'id="gif"', 'id="source"', "claude.use('downloads')", '</script>']) {
  if (!out.includes(must)) throw new Error(`built artifact is missing ${must}`);
}
for (const mustNot of ['<!doctype', '<html', '<head>', '<body>']) {
  if (out.toLowerCase().includes(mustNot)) throw new Error(`built artifact still contains ${mustNot}`);
}

mkdirSync(new URL('dist/', root), { recursive: true });
writeFileSync(new URL('dist/artifact.html', root), out);
console.log(`dist/artifact.html written (${(out.length / 1024).toFixed(1)} KB)`);
