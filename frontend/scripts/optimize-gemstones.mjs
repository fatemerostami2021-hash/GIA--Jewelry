// Step 1 for the gemstone photos: converts every image in public/media/images/gemstone
// to a light WebP (max 1200px, ~60–150 KB) and builds a numbered contact sheet so each
// stone can be identified and named. Originals are never touched or deleted.
// Usage (Git Bash):  cd frontend && node scripts/optimize-gemstones.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const src = path.join(process.cwd(), 'public', 'media', 'images', 'gemstone');
const out = path.join(process.cwd(), 'public', 'media', 'images', 'gemstone-web');
fs.mkdirSync(out, { recursive: true });

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort((a, b) => a.localeCompare(b));
if (!files.length) { console.error('No images found in', src); process.exit(1); }

const T = 320, COLS = 7;
const tiles = [];
const map = [];
let i = 0;
for (const f of files) {
  i += 1;
  const id = `gem-${String(i).padStart(2, '0')}`;
  const input = path.join(src, f);
  try {
    await sharp(input).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(path.join(out, `${id}.webp`));
    const thumb = await sharp(input).rotate().resize(T, T, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
    const label = Buffer.from(`<svg width="${T}" height="${T}"><rect x="0" y="0" width="92" height="46" fill="#000" fill-opacity=".75"/><text x="10" y="33" font-family="Arial" font-size="30" font-weight="bold" fill="#f2d98a">${String(i).padStart(2, '0')}</text></svg>`);
    tiles.push({ input: await sharp(thumb).composite([{ input: label }]).jpeg().toBuffer(), left: ((i - 1) % COLS) * T, top: Math.floor((i - 1) / COLS) * T });
    const kb = Math.round(fs.statSync(path.join(out, `${id}.webp`)).size / 1024);
    map.push(`${id}.webp  <-  ${f}  (${kb} KB)`);
    console.log('OK', id, `${kb} KB`);
  } catch (e) { console.warn('SKIP', f, e.message); }
}
const rows = Math.ceil(tiles.length / COLS);
await sharp({ create: { width: COLS * T, height: rows * T, channels: 3, background: '#0a0610' } })
  .composite(tiles).jpeg({ quality: 82 }).toFile(path.join(out, '_contact-sheet.jpg'));
fs.writeFileSync(path.join(out, '_map.txt'), map.join('\n') + '\n');
console.log('\nContact sheet:', path.join(out, '_contact-sheet.jpg'));
