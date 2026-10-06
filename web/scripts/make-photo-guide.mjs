// Regenerates public/images/README.md from lib/slots.ts.
// Run:  node scripts/make-photo-guide.mjs
import fs from 'node:fs';

const src = fs.readFileSync(new URL('../lib/slots.ts', import.meta.url), 'utf8');
const row = /^\s*'([a-z0-9-]+)':\s*\{\s*size:\s*'([^']+)',\s*note:\s*'(.*)'\s*\},?\s*$/;
const heading = /^\s*\/\/ ── (.+?) ─+/;

const sections = [];
let current = null;
for (const line of src.split(/\r?\n/)) {
  const h = line.match(heading);
  if (h) {
    current = { title: h[1].trim(), rows: [] };
    sections.push(current);
    continue;
  }
  const m = line.match(row);
  if (m && current) current.rows.push({ slot: m[1], size: m[2], note: m[3].replace(/\\'/g, "'") });
}

let md = `# Photos for KPDS Photo Studio

Every photo on the site has a **slot name**. To add a photo:

1. Export it at the suggested size (JPG is fine, ideally under ~500 KB; PNG, WebP and AVIF also work).
2. Save it in this folder using the slot name, e.g. \`home-hero.jpg\`.
3. Refresh the page. **No code change needed.** Until a file exists, that spot shows a clean empty placeholder.

While \`npm run dev\` is running, each empty placeholder shows its slot name in the corner so you can see exactly
which file goes where. Those labels never appear on the live site.

Some photos are reused on several pages (for example the \`cat-*\` photos appear on Home and on the Services page),
so one file fills all of those spots.

> This file is generated from \`lib/slots.ts\`. After adding a slot there, run \`node scripts/make-photo-guide.mjs\`.

`;

for (const s of sections) {
  if (!s.rows.length) continue;
  md += `## ${s.title}\n\n| File name | Size (px) | What goes there |\n|---|---|---|\n`;
  for (const r of s.rows) md += `| \`${r.slot}.jpg\` | ${r.size} | ${r.note} |\n`;
  md += '\n';
}

fs.writeFileSync(new URL('../public/images/README.md', import.meta.url), md);
console.log(sections.map((s) => `${s.title}: ${s.rows.length}`).join('\n'));
