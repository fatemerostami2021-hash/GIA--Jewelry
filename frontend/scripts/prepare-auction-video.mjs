// Renames + (if ffmpeg is installed) compresses the new auction video.
// Usage (Git Bash):  cd frontend && node scripts/prepare-auction-video.mjs
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const dir = path.join(process.cwd(), 'public', 'media', 'videos');
const src = path.join(dir, 'Creating_3D_jewelry_experience_adae3e6e.mp4');
const out = path.join(dir, 'auction-hero.mp4');
if (!fs.existsSync(src)) { console.error('Not found:', src); process.exit(1); }

const has = spawnSync('ffmpeg', ['-version']).status === 0;
if (has) {
  const r = spawnSync('ffmpeg', ['-y', '-i', src, '-an', '-vf', 'scale=960:-2,fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status || 1);
  spawnSync('ffmpeg', ['-y', '-ss', '1.5', '-i', out, '-frames:v', '1', '-vf', 'scale=960:-2', '-c:v', 'libwebp', '-quality', '72', path.join(dir, 'auction-hero-poster.webp')], { stdio: 'inherit' });
  console.log('Compressed ->', out, '(+ poster)');
} else {
  fs.copyFileSync(src, out);
  console.log('ffmpeg not found: copied as-is ->', out, '(', Math.round(fs.statSync(out).size / 1048576), 'MB ). Compress it at a site like cloudconvert/handbrake to ~1–3 MB if it is big.');
}
