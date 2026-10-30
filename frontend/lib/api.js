import local from './gems.json';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function get(path) {
  try {
    const r = await fetch(`${API}${path}`, { cache: 'no-store' });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

// Falls back to the bundled data when the API / database is not running.
export const getGems = async (category) =>
  (await get(`/api/gems${category ? `?category=${encodeURIComponent(category)}` : ''}`)) || local.filter((g) => !category || g.category === category);
export const getGem = async (slug) => (await get(`/api/gems/${encodeURIComponent(slug)}`)) || local.find((g) => g.slug === slug) || null;
export const postInquiry = (body) =>
  fetch(`${API}/api/inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

export const money = (n, locale) =>
  new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n));
export const num = (n, locale) => new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(Number(n));
