import Link from 'next/link';
import Hero from '@/components/Hero';
import HeroBanner from '@/components/HeroBanner';
import HexRail from '@/components/HexRail';
import ScrollCompanion from '@/components/ScrollCompanion';
import GemIcon from '@/components/GemIcon';
import ProductCard from '@/components/ProductCard';
import Stagger from '@/components/Stagger';
import { dict } from '@/lib/dict';
import { getCollection } from '@/lib/collection';
import { pageVideos } from '@/lib/site';
import { stones } from '@/lib/stones';
import { ui } from '@/lib/ui';

/**
 * Home page — clean luxury layout, no section dividers.
 *
 * Sections:
 *   1. Hero — split layout: text on one side, video on the other
 *   2. HeroSlider — full-width Swiper fade carousel, non-stop auto loop
 *   3. HexRail — clickable honeycomb marquee (always moving)
 *   4. Collection preview — gold-themed cards grid
 */
export default async function Home({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  // keep only items that have text for this locale (guards against incomplete entries)
  const nameOf = (p) => (p[locale] || p.en || p.fa || {}).name || p.slug;
  const items = getCollection().filter((p) => p && p.cover);

  // Hex rail — every jewellery piece + a selection of stones (max ~14)
  const hexItems = items
    .filter((i) => i.kind === 'jewellery')
    .concat(items.filter((i) => i.kind === 'stone').slice(0, 10))
    .slice(0, 14)
    .map((p) => ({ thumb: p.cover.thumb, slug: p.slug, name: nameOf(p) }));

  // Hero video — the same home reel as before, but now framed inside the hero
  const heroVideoSrc = pageVideos.home;

  return (
    <>
      {/* Hero slider directly under the header: automatic fade, no arrows / dots / bar */}
      <HeroBanner locale={locale} />

      <Hero t={t.hero} locale={locale} videoSrc={heroVideoSrc} />

      {/* Small ruby showcase that travels down the side while scrolling (hero -> footer) */}
      <ScrollCompanion href={`/${locale}/collection`} label={t.collection.title} />

      {/* 2b — Hexagonal clickable marquee rail */}
      <HexRail items={hexItems} locale={locale} />

      {/* 3 — Gemstone guide teaser (links to /gemstones and each stone) */}
      <section className="mx-auto max-w-7xl px-5 pt-20">
        <Stagger className="mb-8 flex flex-wrap items-end justify-between gap-4" y={30}>
          <div>
            <h2 className="font-display text-3xl font-black md:text-5xl"><span className="hl">{ui[locale].homeGuide.title}</span></h2>
            <p className="mt-3 max-w-xl text-base font-bold leading-7 text-lilac/80">{ui[locale].homeGuide.sub}</p>
          </div>
          <Link href={`/${locale}/gemstones`} className="rounded-full border-2 border-gold/60 px-6 py-2.5 text-sm font-black text-gold-light transition-all hover:bg-gold/15">{ui[locale].mega.all} →</Link>
        </Stagger>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
          {stones.map((s) => (
            <li key={s.slug}>
              <Link href={`/${locale}/gemstones/${s.slug}`} className="stone-card flex flex-col items-center gap-1.5 rounded-2xl border border-gold/25 bg-ink/60 px-2 py-4 text-center">
                <GemIcon hex={s.hex} hex2={s.hex2} size={44} className="gem-float" />
                <span className="text-xs font-black text-lilac/85">{s[locale].name.split(' (')[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — Full collection grid */}
      <section id="home-collection" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20">
        <Stagger className="mb-12 flex flex-wrap items-end justify-between gap-6" y={30}>
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.4em] text-gold-light rtl:tracking-normal">
              ✦ {locale === 'fa' ? 'پرفروش‌ترین‌ها' : 'Best sellers'}
            </p>
            <h2 className="font-display text-4xl font-black md:text-6xl">
              <span className="hl">{t.collection.title}</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg font-black leading-8 text-lilac/85">{t.collection.sub}</p>
          </div>
          <Link
            href={`/${locale}/collection`}
            className="rounded-full border-2 border-gold/60 px-6 py-2.5 text-sm font-black text-gold-light transition-all hover:bg-gold/15"
          >
            {t.collection.all} ({items.length}) →
          </Link>
        </Stagger>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} p={p} locale={locale} view={t.collection.view} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
