import fs from 'node:fs';
import { pool } from '../src/db.js';

const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
await pool.query(read('./schema.sql'));
const gems = JSON.parse(read('../data/gems.json'));
for (const g of gems) {
  const cols = Object.keys(g);
  const vals = cols.map((c) => (g[c] !== null && typeof g[c] === 'object' ? JSON.stringify(g[c]) : g[c]));
  await pool.query(`INSERT INTO gems (${cols.join(',')}) VALUES (${cols.map((_, i) => `$${i + 1}`).join(',')})`, vals);
}
console.log(`Seeded ${gems.length} gems`);
await pool.end();
