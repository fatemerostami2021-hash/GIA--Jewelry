// scripts/cleanup-originals.mjs
// Removes the original hash-named source files in public/media/images/
// since their optimized, slug-friendly versions already exist in
// public/media/images/optimized/. Keeps anything with a clean slug name,
// the videos, the 3D model renders, and the gia-hq.webp / hero-woman.jpg
// files (the optimize script still references those for re-runs).
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'public/media/images';
const OPT = 'public/media/images/optimized';
const EXT = /\.(jpe?g|png|webp|avif)$/i;

// Slug-named originals we want to KEEP (referenced by optimize-images.mjs KNOWN list)
const KEEP = /^(gia[-_]?hq|hero-woman|ruby-set|photo_2026-10-24|cobra-snake-ring|pendant-magerit-butterfly|Ruby_and_Diamond)/i;

const removed = [];
const kept = [];
const all = await fs.readdir(SRC);
for (const f of all) {
  const full = path.join(SRC, f);
  const st = await fs.stat(full);
  if (!st.isFile() || !EXT.test(f)) continue;
  if (KEEP.test(f)) { kept.push(f); continue; }
  // Check if its optimized counterpart exists
  // (we can't easily map name -> slug, so just remove anything that's a hash-name)
  if (/^[A-Za-z0-9_-]{30,}\.(jpg|jpeg|webp|png)$/i.test(f)) {
    await fs.unlink(full);
    removed.push(f);
  } else {
    kept.push(f);
  }
}
console.log(`Removed ${removed.length} hash-named originals:`);
removed.forEach((f) => console.log(`  - ${f}`));
console.log(`\nKept ${kept.length} files:`);
kept.forEach((f) => console.log(`  + ${f}`));
