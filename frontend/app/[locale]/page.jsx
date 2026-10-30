import Link from 'next/link';
import Hero from '@/components/Hero';
import HeroSlider from '@/components/HeroSlider';
import HexRail from '@/components/HexRail';
import ProductCard from '@/components/ProductCard';
import Stagger from '@/components/Stagger';
import { dict } from '@/lib/dict';
import { getCollection } from '@/lib/collection';
import { pageVideos } from '@/lib/site';

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
  const items = getCollection();

  // Slider picks — the 6 most "showy" items
  const sliderItems = items
    .filter((i) => i.kind === 'jewellery' || ['ruby-faceted-oval', 'emerald-faceted', 'diamond-faceted', 'opal-black-boulder', 'violet-necklace-model', 'ruby-parure-model'].includes(i.slug))
    .slice(0, 6)
    .map((p) => ({
      src: p.cover.full,
      href: `/${locale}/collection/${p.slug}`,
      alt: p[locale].name,
      eyebrow: p.kind === 'jewellery' ? (locale === 'fa' ? 'جواهر' : 'Jewel') : (locale === 'fa' ? 'سنگ' : 'Stone'),
    }));

  // Hex rail — every jewellery piece + a selection of stones (max ~14)
  const hexItems = items
    .filter((i) => i.kind === 'jewellery')
    .concat(items.filter((i) => i.kind === 'stone').slice(0, 10))
    .slice(0, 14)
    .map((p) => ({ thumb: p.cover.thumb, slug: p.slug, name: p[locale].name }));

  // Hero video — the same home reel as before, but now framed inside the hero
  const heroVideoSrc = pageVideos.home;

  return (
    <>
      <Hero t={t.hero} locale={locale} videoSrc={heroVideoSrc} />

      {/* 1 — Full-width Swiper slider, non-stop auto loop */}
      <HeroSlider slides={sliderItems} />

      {/* 2 — Hexagonal clickable marquee rail */}
      <HexRail items={hexItems} locale={locale} />

      {/* 3 — Full collection grid */}
      <section id="collection" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20">
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
