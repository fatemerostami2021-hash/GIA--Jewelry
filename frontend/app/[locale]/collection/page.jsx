import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Stagger from '@/components/Stagger';
import { dict } from '@/lib/dict';
import { getCollection } from '@/lib/collection';

export default async function CollectionPage({ params, searchParams }) {
  const { locale } = await params;
  const { k } = await searchParams;
  const t = dict[locale];
  const all = getCollection();
  const items = k === 'jewellery' || k === 'stone' ? all.filter((i) => i.kind === k) : all;
  const chip = (on) => `rounded-full border px-4 py-1 text-sm font-black ${on ? 'border-gold bg-gold text-ink' : 'border-white/25 bg-ink/50'}`;
  return (
    <div className="mx-auto max-w-7xl px-5 pt-28">
      <Stagger y={30} stagger={0.15}>
        <h1 className="font-display text-5xl font-black md:text-7xl"><span className="hl">{t.collection.title}</span></h1>
        <p className="mt-4 max-w-2xl text-lg font-bold text-lilac/80">{t.collection.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {['all', 'jewellery', 'stone'].map((f) => (
            <Link key={f} href={f === 'all' ? `/${locale}/collection` : `/${locale}/collection?k=${f}`} className={chip((k || 'all') === f)}>{t.collection.filters[f]}</Link>
          ))}
        </div>
      </Stagger>
      <Stagger key={k || 'all'} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} p={p} locale={locale} view={t.collection.view} />)}
      </Stagger>
    </div>
  );
}
