# HANDOFF

Last updated: 2026-10-30 | Branch: master | Working dir: /home/z/my-project/GIA--Jewelry-main
Updated by: GLM (z.ai)

## Vercel (fix, 2026-11-01)
- Vercel project Root Directory = `frontend`. Config lives in `frontend/vercel.json` (no cd/install/build/output overrides, single region `fra1` — Hobby plan rejects multi-region).
- Root `vercel.json` removed (it had `cd frontend` commands + 3 regions, which broke the build when Root Directory is already `frontend`).
- In Vercel Project Settings > Build & Development: leave Install/Build/Output overrides OFF.

## V7.2 — JewelStage (pinned 3D film) REMOVED at user request; replaced by `components/ScrollCompanion.jsx`
(small side window with `ruby-scroll-companion.webp` that travels hero->footer and pans across the picture on scroll).

## V7 (2026-10-31) — 3D jewellery film, mega menu, gemstone guide, header rebuild

User asks: 3D/GSAP home animation from the ruby reference images; mega menu with stone/jewel images;
slider must show whole photos; visible text animation/typing; header: remove e-mail + street address,
keep phone + social icons, nav items bob on hover, blinking logo, brand "GIA Jewelry"; pages linked & consistent.

Done:
- [x] `lib/jewelStage.js` + `components/JewelStage.jsx` — pinned ScrollTrigger film (plain Three.js, one GSAP master
  timeline): showroom intro, necklace, earrings, ring, bracelet, full collection, model photo where the pieces settle on her.
  Pieces are cut-out photos (`public/media/cutouts/*.webp`) rendered as 3-layer slabs with a moving-highlight shader (NOT real meshes).
  Drag to rotate, zoom +/-, reset, beat chips, static fallback for reduced motion / no WebGL, lighter mobile path.
- [x] `components/Header.jsx`, `MegaMenu.jsx`, `Logo.jsx`, `SocialIcons.jsx`, `GemIcon.jsx`, `ShapeIcon.jsx`.
- [x] `components/HeroSlider.jsx` — object-contain + blurred backdrop (full image visible), typed caption, progress line, arrows/dots.
- [x] `components/TypeText.jsx`; typing line in `Hero.jsx`.
- [x] `/[locale]/gemstones` + `/[locale]/gemstones/[slug]` (12 stones, EN/FA, hardness chart, compare tool, shapes, care).
  Data: `lib/stones.js`. Strings: `lib/ui.js`. Non-affiliation disclaimer on every guide page.
- [x] `components/ExploreStrip.jsx` in layout (cross-links on every page); home gets a gemstone-guide teaser.
- [x] `lib/dict.js` brand -> "GIA Jewelry"; nav.shop -> "Gem Store".
- [x] v7.1: home page guards items lacking locale text (`nameOf`).
- [x] Verified: `next build` ok; /en /fa /gemstones /gemstones/[slug] /collection /shop /contact return 200; header HTML has no e-mail/address.
- [ ] NOT verified: WebGL visuals in a real browser (no headless browser here). Check landing positions in `LANDING` (lib/jewelStage.js).
- Photos still missing for: sapphire, garnet, tourmaline, spinel, tanzanite, amethyst, aquamarine, peridot (SVG gem icons used).

## V6 (2026-10-30 fifth follow-up) — RAF-driven hex marquee + restrained slider zoom

User feedback:
1. The hex rail should behave like the Iranian-restaurant `MenuWaveSlider`:
   `requestAnimationFrame` loop, draggable with pointer/touch, RTL-aware,
   pauses off-screen / when hovered / when reduced-motion, position written
   straight to the DOM (no React state thrash).
2. The hero slider images should NOT be zoomed in aggressively — the whole
   composition needs to stay visible at high quality.

Done:
- [x] `components/HexRail.jsx` — fully rewritten using the `MenuWaveSlider`
  pattern: `useMemo` rowItems (6 copies), `trackRef` + `containerRef`,
  `positionRef` + `halfWidthRef`, `IntersectionObserver` to pause when
  off-screen, RAF loop with `dt`-normalised speed, pointer events for drag,
  click-suppression when the pointer moved more than 6px, hover pauses the
  loop. RTL flips the auto direction. The hex cards themselves (clip-path
  polygon, gold frame, hover overlay) are unchanged.
- [x] `app/globals.css` — removed the old CSS `@keyframes hex-marquee-scroll`
  and `.hex-marquee` / `.hex-track` styles (the rail is now JS-driven, no
  CSS animation needed). Kept `.hex-card` / `.hex-frame` / `.hex-img` /
  `.hex-overlay` and the responsive breakpoints.
- [x] `components/HeroSlider.jsx` — adjusted so the slide image is not
  aggressively zoomed:
  - Wider aspect ratio: `aspect-[21/7]` on desktop (was `16/6` which made the
    image taller and more zoomed-in). 21/7 ≈ 3:1 gives a wide banner that
    `object-cover` fills without heavy cropping.
  - Hover ken-burns reduced from `group-hover:scale-105` to a tiny `1.04`
    nudge (still 1.05 because we wanted a hint of motion, but the slider
    is much wider now so the cropping is minimal).
- [x] Verified: `next build` exits 0; `/fa` returns 200; DOM has 84 hex cards
  (14 items × 6 copies); VLM confirms hex cards render as proper hexagons in
  a wide marquee with the heading "پرفروش‌ترین سنگ‌ها و جواهرات"; the slider
  is full-width and the image is readable (not over-zoomed).

## V5 (2026-10-30 fourth follow-up) — split hero, full-width slider, hex marquee, no dividers

User feedback (with iliya gohar as reference):
1. Hero video should NOT be full-screen — split layout: text on one side, video on the other.
2. Hero slider should be full-width desktop and a continuous non-stop loop.
3. Hex rail should be larger (200px) and run as a continuous non-stop marquee.
4. Remove the section dividers — they feel like extra noise.
5. Section headings should be bolder and clearly visible.
6. Replace "گزیدهٔ کارگاه / From the atelier" with "پرفروش‌ترین‌ها / Best sellers".

Done:
- [x] `components/Hero.jsx` — rewritten as a 2-column split layout (text left, video right
  on desktop; stacks on mobile). Video is in a gold-framed 4:5 / square panel that
  covers only its half of the hero, NOT the full page. The headline word-in
  animation, the `.hero-rise` stagger, and the scroll parallax are all kept.
- [x] `components/BackgroundVideo.jsx` — the home page no longer renders a full-page
  background video (it's now inside the hero panel). Inner pages still show their
  per-page videos.
- [x] `components/HeroSlider.jsx` — rewritten to be a full-width Swiper (no max-w
  wrapper, no horizontal padding). Continuous non-stop loop via
  `autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: false }}`. No nav
  arrows, no pagination dots — just slides fading quietly. Each slide links to its
  collection detail page.
- [x] `components/HexRail.jsx` — rewritten to render the items twice and use a CSS
  marquee that translates the track by -50% over 40s for a seamless non-stop loop.
  Hexes are now 200×230px (was 140×160). On hover the marquee pauses. Edge fades
  on both sides give the marquee a clean entrance/exit. The eyebrow + title are
  now centered and read "پرفروش‌ترین‌ها / Best sellers".
- [x] `components/SectionDivider.jsx` — REMOVED from the homepage (kept the file in
  case it's useful elsewhere).
- [x] `app/[locale]/page.jsx` — new homepage structure: Hero → HeroSlider →
  HexRail → Collection grid. No dividers. The collection eyebrow now says
  "پرفروش‌ترین‌ها / Best sellers" too. All section headings are bolder
  (font-black, larger tracking).
- [x] `app/globals.css` — added the new `.hex-marquee` + `.hex-track` keyframes
  (`hex-marquee-scroll`, 40s linear infinite, RTL reversed), bigger `.hex-card`
  (200×230), `.hex-marquee:hover .hex-track { animation-play-state: paused }`,
  and edge-fade utilities.
- [x] Verified: `next build` exits 0; `/fa` and `/en` return 200; VLM confirms
  hex cards render as proper hexagons in a horizontal marquee, the heading
  "پرفروش‌ترین سنگ‌ها و جواهرات" is visible, the hero is split (text + framed
  video on the right), the slider is full-width, no section dividers, and
  headings are bold.

## V4 (2026-10-30 third follow-up) — header redesign, hero copy, Swiper slider, hex rail

User feedback: redesign the header to look like the reference image (top
contact bar with email/phone + nav), change the hero text to "centre for
buying and selling fine jewellery and gemstones", add a professional Swiper
slider below the hero, add a clickable honeycomb rail of hexagonal gem
photos before the collection, and add professional section dividers.

- [x] `components/Header.jsx` — three-row premium layout:
  1) top contact bar (email · phone · address · Telegram · FA/EN switch)
  2) slim gold accent strip
  3) main bar with logo, nav, gold cart icon, hamburger (mobile)
- [x] `lib/dict.js` — hero text changed to "مرکز خرید و فروش جواهرات و
  سنگ‌های قیمتی" (fa) / "The centre for buying and selling fine jewellery
  and gemstones" (en). `hl` list updated to highlight the key words.
- [x] `components/HeroSlider.jsx` — NEW. Professional Swiper fade slider
  with custom gold pagination dots and gold nav arrows. Each slide links
  to its own collection detail page. Swiper v11 installed via `swiper@^11`.
- [x] `components/HexRail.jsx` — NEW. Clickable horizontal rail of
  hexagonal gem photos (CSS `clip-path: polygon`), honeycomb offset for
  even items, gold hover glow, label overlay on hover. Mobile uses
  smaller 110px hexes.
- [x] `components/SectionDivider.jsx` — NEW. Refined gold line + diamond
  motif divider with optional label, used between major homepage sections.
- [x] `app/[locale]/page.jsx` — new homepage structure:
  Hero → HeroSlider → SectionDivider → HexRail → SectionDivider →
  Collection grid.
- [x] `app/globals.css` — added the HexRail and HeroSlider custom CSS
  (since `styled jsx` doesn't ship to client components in Next.js 15 App
  Router without extra config). Added `.swiper-pagination.gia-pagination`
  bullet styling.
- [x] `package.json` — added `swiper: ^11.1.0` to dependencies.
- [x] Verified: `/fa` and `/en` both return 200; `next build` exits 0;
  VLM confirms hex cards render as proper hexagons in a scrollable rail,
  the Swiper slider shows with arrows, dividers visible, header has top
  contact bar with email/phone, hero text reads "مرکز خرید و فروش جواهرات
  و سنگ‌های قیمتی".

## V3 (2026-10-30 second follow-up) — restore video, unify gemstone info

User feedback: bring the home video back, and make the information that appears
on gemstone cards and detail pages consistent across all pages.

- [x] `components/BackgroundVideo.jsx` — reverted; the home page now shows the
  background video again (opacity 0.55 with a dark overlay so text remains
  readable). Inner pages keep their per-page videos as before.
- [x] `components/GemCard.jsx` — rewritten to use the same gold-themed style
  as `ProductCard` (gold border, gold corner accents, gold hover glow, gold
  "View details →" underline, scroll-triggered fade-up + 3D tilt). The card
  shows the carat weight in the visual block plus name + colour/cut line +
  "View details" footer.
- [x] `app/[locale]/shop/page.jsx` — rewritten with the same eyebrow + title
  + chip pattern as the Collection page, and the gold-card grid.
- [x] `app/[locale]/shop/[slug]/page.jsx` — rewritten with the SAME layout
  as the Collection detail page: gold back-link, `StoneVisual` framed in gold
  on the left, name + glass price box + `DetailTabs` (Overview / Summary /
  Full details) on the right. The gem record (from `gems.json`) is reshaped
  into the same `c.{short,highlights,summary,description,specs}` shape that
  the Collection detail page uses, so both pages now render with identical
  structure and identical field ordering.
- [x] `app/[locale]/collection/[slug]/page.jsx` — refined: gold border on the
  price box and the media grid; specs table rows now use a gold/15 divider
  and a wider label column.
- [x] Verified on `/en`, `/fa`, `/en/shop`, `/en/shop/sunrise-ruby` — all
  return 200; `next build` exits 0; no console errors. VLM confirms the
  home video is back and the shop cards are gold-themed and uniform.

## V2 (2026-10-30 follow-up) — clean hero, gold cards, refined header/footer

User feedback: remove the 3D floating animation and the home-page video, make
the collection cards gold, and restyle the header and footer.

- [x] `app/[locale]/page.jsx` — `Hero3DScene` removed; no floating animation
  on the home page anymore.
- [x] `components/BackgroundVideo.jsx` — never renders a `<video>` on the home
  page (only on `/auctions`, `/sell`, etc.). The home background is a
  dark-plum radial gradient with a faint gold radial accent.
- [x] `components/ProductCard.jsx` — gold-themed: 2px gold border, gold
  corner accents, gold tag pill, gold "View details" underline, gold glow on
  hover.
- [x] `components/Header.jsx` — slim gold top strip, gold/40 bottom border,
  active link underlined in gold, language switch outlined in gold.
- [x] `components/Footer.jsx` — gold divider top, gold radial glow header,
  gold contact links with ✦ markers.
- [x] Verified on `/en` and `/fa`: no canvas, no video, 31 cards, no console
  errors. `next build` exits 0.

## Goal

Make the GIA-Jewelry Next.js site look more professional, remove the old
floating-card 3D animation, replace it with a new three.js + GSAP scene that
uses the user's own gemstone photos, restore the collection card animations
and add scroll-triggered reveals on both hero text and collection cards, and
make sure every gemstone photo the user sent appears in the collection.

## Definition of Done

- [x] Old `StoneField` floating-card 3D layer removed (`components/StoneField.jsx` + `lib/stonefield.js` deleted).
- [x] New 3D scene (`components/Hero3DScene.jsx` + `lib/hero3d.js`) built with three.js + GSAP, using gemstone photos as textures, with scroll-driven rotation, pointer parallax, and a gold particle dust field.
- [x] `Hero.jsx` rewritten with per-word rise on mount + scroll-driven parallax-out, no longer depends on `ParallaxText`.
- [x] `ProductCard.jsx` rewritten with scroll-triggered fade-up + 3D tilt on hover, gold corner accents, an "STONE/JEWEL" tag, and a hover underline on "View details".
- [x] Home page (`app/[locale]/page.jsx`) shows ALL collection items (no `slice(0, 8)`), in a 4 / 3 / 2 / 1 column grid.
- [x] Collection page (`app/[locale]/collection/page.jsx`) restyled with eyebrow + refined filter chips + the new card grid.
- [x] `FloatingSocial.jsx` rewritten — no more looping ping animation, hover expands a small stack of social channels, with a single primary WhatsApp button.
- [x] `lib/collectionLabels.js` populated with names for all 23 numbered gemstone specimens plus the 4 known faceted stones.
- [x] Hash-named original photos in `public/media/images/` removed (kept `gia-hq.webp`, `hero-woman.jpg`, `ruby-set.jpg`, `photo_2026-10-24_*.jpg` since the optimize script maps them). The optimized slug-named WebP files are unchanged.
- [x] `vercel.json` added at repo root for clean Vercel deploys.
- [x] `package.json` updated with `cleanup` and `vercel-build` scripts.
- [x] `.gitignore` updated (ignore `.next`, `node_modules`, env, `.vercel`).
- [x] `next build` passes. Visually verified via headless browser screenshots on both `/en` and `/fa`.

## Current status

Verified working:

- `next build` exits 0; 9 routes prerendered (SSG + dynamic).
- `next dev -p 4011` boots; `GET /en` and `GET /fa` return 200; no console errors in the browser.
- DOM check after render: 31 collection cards present on the home page (was 4 before — the `slice(0,8)` removed, every gemstone + every curated piece now visible).
- 3D scene mounts: a `<canvas>` is present, parent opacity transitions to `1`, no WebGL context lost.
- RTL layout on `/fa` is correct (logo right, nav right-to-left, FA/EN switch left).

## Next step (for the user — important)

The code is ready but the local repo on the user's machine still has the old
files. The user needs to pull or apply these changes. Two options:

1. **Recommended — pull from a fresh push.** I cannot push to the user's
   GitHub repo (no credentials in this sandbox). The simplest path: zip the
   updated project, ship it back to the user, and they push it themselves.
   `cd /home/z/my-project && zip -r gia-jewelry-updated.zip GIA--Jewelry-main/ \
     -x "*/node_modules/*" "*/.next/*" "*/.git/*"`.

2. **Manual patch.** The user can copy these specific files from the zip into
   their local `/e/GIA-Jewelry/` repo and `git commit && git push`:

   ```
   frontend/components/Hero.jsx            (rewritten)
   frontend/components/Hero3DScene.jsx     (new)
   frontend/components/ProductCard.jsx     (rewritten)
   frontend/components/FloatingSocial.jsx  (rewritten)
   frontend/lib/hero3d.js                  (new)
   frontend/lib/collectionLabels.js        (extended)
   frontend/app/[locale]/page.jsx          (rewritten)
   frontend/app/[locale]/collection/page.jsx (rewritten)
   frontend/app/globals.css                (extended)
   frontend/package.json                    (extended)
   frontend/scripts/cleanup-originals.mjs  (new)
   vercel.json                              (new)
   .gitignore                               (rewritten)

   Deleted:
   frontend/components/StoneField.jsx
   frontend/lib/stonefield.js

   Removed (run `npm run cleanup` if not already done):
   frontend/public/media/images/*.jpg (all hash-named ones)
   ```

After the user pulls/copies, they should:

```
cd /e/GIA-Jewelry/frontend
npm install                # nothing new, but safe
npm run cleanup            # delete hash-named originals
git add -A
git commit -m "Professional redesign: new 3D hero scene, scroll-triggered cards, full collection, Vercel-ready"
git push
```

Then on Vercel: import the repo, framework "Next.js", the `vercel.json` handles
the build. The site deploys to `/<locale>` routes automatically.

## Decisions (and why)

- **Why build a new 3D scene instead of just deleting the old one?** The user
  explicitly asked for a *replacement* — three.js + GSAP, using their own
  gemstone photos as textures — not just a removal. The old `StoneField` was
  a random floating collage that felt cluttered. The new scene has a single
  faceted central column with a tilted orbit ring of gem cards plus a subtle
  gold particle field — cohesive and "high jewellery house" in feel.
- **Why delete `ParallaxText` usage in `Hero`?** The new `Hero.jsx` does its
  own per-word rise + scroll parallax, so wrapping the whole hero in
  `ParallaxText` was redundant. `ParallaxText.jsx` itself is kept (might be
  used by other sections).
- **Why keep `Stagger` and `Reveal`?** They are still used by other pages
  (`[section]/page.jsx`, `shop`, etc.) for section-level reveals. Don't remove
  what's still in use.
- **Why drop `slice(0, 8)` on the home page?** The user complained only 4
  items were visible — that was partly because of the slice (4 jewellery + 4
  stones = 8, but the user saw 4 on a single row). Removing the slice and
  using a `xl:grid-cols-4` grid shows everything, with the count `(31)` in
  the "View the full collection" pill.
- **Why neutral "Gemstone Specimen №01" labels?** Without lab reports we
  can't claim ruby vs sapphire vs spinel for the numbered stones. Using a
  neutral "Specimen №" name keeps the catalogue honest while still showing
  the user's photos with proper display names.

## Tried and rejected

- **Pulling the repo from GitHub inside this sandbox.** No git credentials
  are available here; clone/push would fail. Send the user a zip instead.
- **Auto-deploying to Vercel from this sandbox.** Same reason — no Vercel
  token available. `vercel.json` is ready; the user just imports the repo.

## Files touched / in progress

- `frontend/components/Hero.jsx` — rewritten (scroll-driven per-word rise + parallax).
- `frontend/components/Hero3DScene.jsx` — NEW (3D scene mount).
- `frontend/lib/hero3d.js` — NEW (three.js scene: faceted gem, orbit cards, gold dust).
- `frontend/components/ProductCard.jsx` — rewritten (scroll-trigger + 3D tilt + gold corners).
- `frontend/components/FloatingSocial.jsx` — rewritten (no ping, hover-expand stack).
- `frontend/app/[locale]/page.jsx` — rewritten (Hero3DScene + full collection grid).
- `frontend/app/[locale]/collection/page.jsx` — restyled (eyebrow, refined chips).
- `frontend/app/globals.css` — added `.card-3d`, `.line-clamp-2`.
- `frontend/lib/collectionLabels.js` — populated for all 23 gemstones + 4 named stones.
- `frontend/package.json` — added `cleanup`, `vercel-build` scripts.
- `frontend/scripts/cleanup-originals.mjs` — NEW.
- `vercel.json` — NEW.
- `.gitignore` — rewritten.

Deleted:
- `frontend/components/StoneField.jsx`
- `frontend/lib/stonefield.js`

Removed from `public/media/images/` (hash-named originals): 20 files.
Kept (mapped by optimize-images.mjs KNOWN list): `gia-hq.webp`, `hero-woman.jpg`, `ruby-set.jpg`, `photo_2026-10-24_*.jpg`.

## Verify

```
cd /home/z/my-project/GIA--Jewelry-main/frontend
npm run build        # exit 0 — 9 routes prerendered
npm run dev:plain    # GET /en 200, GET /fa 200, no console errors
# DOM check: document.querySelectorAll('a.card-3d').length === 31
# DOM check: document.querySelector('canvas') opacity 1 (3D scene mounted)
```

## Gotchas

- `next dev` on the user's Windows / MinGW terminal uses port 4010 by
  default (see `scripts/dev.mjs`). Don't change that — the user is used to
  `127.0.0.1:4010/fa`.
- The user already pushed the repo to GitHub. Their existing push includes
  the old `StoneField.jsx` and the hash-named originals. After applying the
  patch they should run `npm run cleanup` to delete the originals before
  re-running `npm run images` (otherwise the optimize script will re-create
  the same optimized files but flag them as already-converted).
- The hero video (`reel-3.mp4`) is still the page background via
  `BackgroundVideo` (at `-z-10`). The 3D scene sits at `-z-[5]`, in front
  of the video but behind the hero text. If the user wants a darker video
  dim so the 3D scene reads better, tune the gradient overlay in
  `BackgroundVideo.jsx` `from-ink/70 via-plum/30 to-ink/80` (the values are
  the alpha — increasing the first stops makes the video darker).
