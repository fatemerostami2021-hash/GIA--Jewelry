// Converts the 5 hero PNGs in public/media/images/hero to named WebP files (1920px + 960px).
// Usage (Git Bash):  cd frontend && node scripts/optimize-hero.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'media', 'images', 'hero');
const map = [
  ['Ruby Gold Elegance in Velvet.png', 'ruby-gold-velvet'],
  ['Royal Blue Sapphire Jewelry Glamour.png', 'royal-blue-sapphire'],
  ['Emerald Elegance in a Gilded Salon.png', 'emerald-gilded-salon'],
  ['Amethyst Elegance_ A Glamorous Jewelry Showcase.png', 'amethyst-glamour'],
  ['ChatGPT Image Oct 31, 2026, 09_04_27 PM.png', 'ruby-showcase-hero'],
];

for (const [src, name] of map) {
  const input = path.join(dir, src);
  if (!fs.existsSync(input)) { console.warn('MISSING  ', src); continue; }
  await sharp(input).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dir, `${name}.webp`));
  await sharp(input).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dir, `${name}-960.webp`));
  console.log('OK       ', src, '->', `${name}.webp`);
}
