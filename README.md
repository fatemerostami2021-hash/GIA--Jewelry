# GIA — luxury gemstones & jewellery (Next.js + Express + PostgreSQL)

## Run
```bash
cd /e/GIA-Jewelry/frontend && npm install && npm run dev   # opens Chrome at http://127.0.0.1:4010/fa
```
The site works without the backend (it uses the bundled data). Backend (optional): see `backend/`.

## Images -> optimized WebP
Put new photos in `frontend/public/media/images`, then:
```bash
cd /e/GIA-Jewelry/frontend && npm run images
```
Creates `public/media/images/optimized/<name>.webp` (+ `-640.webp`), skips duplicates and files already done, and updates `lib/imageManifest.js`. Originals are untouched.

## Edit content
- Collection pieces (photos, text, price, video): `frontend/lib/products.js`
- Background video per page: `frontend/lib/site.js` -> `pageVideos` (files in `public/media/videos`)
- Texts, both languages: `frontend/lib/dict.js`
- Social links (floating button): `frontend/lib/site.js` -> `socials`
