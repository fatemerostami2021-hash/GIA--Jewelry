import express from 'express';
import { pool } from './db.js';

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/gems', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM gems WHERE ($1::text IS NULL OR category = $1) ORDER BY featured DESC, id',
    [req.query.category || null]
  );
  res.json(rows);
});

app.get('/api/gems/:slug', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM gems WHERE slug = $1', [req.params.slug]);
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

app.post('/api/inquiries', async (req, res) => {
  const { type = 'contact', name, email, phone, message, gem_slug } = req.body || {};
  if (!name || !(email || phone)) return res.status(400).json({ error: 'name_and_contact_required' });
  await pool.query(
    'INSERT INTO inquiries (type, name, email, phone, message, gem_slug) VALUES ($1,$2,$3,$4,$5,$6)',
    [String(type).slice(0, 30), String(name).slice(0, 120), email || null, phone || null, message || null, gem_slug || null]
  );
  res.status(201).json({ ok: true });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error' });
});

app.listen(process.env.PORT || 4000, () => console.log('API on port', process.env.PORT || 4000));
