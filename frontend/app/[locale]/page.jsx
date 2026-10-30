import Link from 'next/link';
import Hero from '@/components/Hero';
import StoneField from '@/components/StoneField';
import ProductCard from '@/components/ProductCard';
import Stagger from '@/components/Stagger';
import { dict } from '@/lib/dict';
import { getCollection } from '@/lib/collection';

// Two sections: 1) video hero with the photo-based 3D layer, 2) the Collection.
export default async function Home({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  const items = getCollection();
  return (
    <>
      <StoneField images={items.map((i) => i.cover.thumb)} />
      <Hero t={t.hero} locale={locale} />
      <section id="collection" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <Stagger className="mb-10 flex flex-wrap items-end justify-between gap-4" y={30}>
          <div>
            <h2 className="font-display text-4xl font-black md:text-6xl"><span className="hl">{t.collection.title}</span></h2>
            <p className="mt-3 max-w-xl text-lg font-bold text-lilac/80">{t.collection.sub}</p>
          </div>
          <Link href={`/${locale}/collection`} className="font-black text-gold-light">{t.collection.all} ({items.length}) →</Link>
        </Stagger>
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 8).map((p) => <ProductCard key={p.slug} p={p} locale={locale} view={t.collection.view} />)}
        </Stagger>
      </section>
    </>
  );
}
