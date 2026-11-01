import Link from 'next/link';
import GemCard from '@/components/GemCard';
import CatFilter from '@/components/CatFilter';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Stagger from '@/components/Stagger';
import { getGems } from '@/lib/api';
import { dict } from '@/lib/dict';
import { pageHeroes } from '@/lib/site';
import { shopNotes } from '@/lib/extra';
import { stoneBySlug } from '@/lib/stones';

/**
 * Gem Store — static page (fast). Hero with video + photo, instant category filter, a stone-guide link
 * for every category, buying notes, and links onward to the collection and the gemstone guide.
 */
export default async function Shop({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  const n = shopNotes[locale];
  const gems = await getGems();
  const cats = Object.entries(t.shop.categories).map(([k, label]) => ({ k, label }));
  return (
    <>
      <PageHero hero={pageHeroes.shop} eyebrow={n.eyebrow} title={t.shop.title} text={t.shop.intro}>
        <Link href={`/${locale}/collection?k=jewellery`} className="rounded-full bg-gold px-7 py-3 text-sm font-black text-ink hover:bg-gold-light">{n.collection}</Link>
        <Link href={`/${locale}/gemstones`} className="rounded-full border-2 border-gold/60 px-7 py-3 text-sm font-black text-gold-light hover:bg-gold/15">{n.guide}</Link>
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6">
        <CatFilter chips={cats} allLabel={t.shop.all} param="c">
          {gems.map((g, i) => (
            <div key={g.slug} data-cat={g.category}>
              <GemCard gem={g} locale={locale} index={i} view={t.collection.view} />
              {stoneBySlug(g.category) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 px-1 text-xs font-black text-gold">
                  <Link href={`/${locale}/gemstones/${g.category}`} className="hover:text-gold-light">✦ {n.learn}</Link>
                  <Link href={`/${locale}/collection?k=jewellery`} className="hover:text-gold-light">✦ {n.collection}</Link>
                </div>
              )}
            </div>
          ))}
        </CatFilter>

        <section className="mt-20">
          <Reveal><h2 className="font-display text-3xl font-black md:text-4xl"><span className="hl">{n.h}</span></h2></Reveal>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {n.items.map(([h, d]) => (
              <div key={h} className="glass p-6">
                <h3 className="text-lg font-black text-gold-light">{h}</h3>
                <p className="mt-2 leading-7 text-lilac/80">{d}</p>
              </div>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="rounded-full border-2 border-gold/60 px-7 py-3 text-sm font-black text-gold-light hover:bg-gold/15">{n.ask}</Link>
            <Link href={`/${locale}/auctions`} className="rounded-full border border-white/30 px-7 py-3 text-sm font-black text-lilac/90 hover:border-gold">{t.nav.auctions}</Link>
          </div>
        </section>
      </div>
    </>
  );
}
