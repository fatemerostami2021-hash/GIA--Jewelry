import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Stagger from '@/components/Stagger';
import CatFilter from '@/components/CatFilter';
import { dict } from '@/lib/dict';
import { getCollection } from '@/lib/collection';

export default async function CollectionPage({ params }) {
  const { locale } = await params;
  const t = dict[locale];
  const all = getCollection();
  const items = all;
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-24">
      <Stagger y={30} stagger={0.15}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-gold-light rtl:tracking-normal">
          ✦ {locale === 'fa' ? 'کالکشن کامل' : 'Full catalogue'}
        </p>
        <h1 className="font-display text-5xl font-black md:text-7xl">
          <span className="hl">{t.collection.title}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-lilac/80">{t.collection.intro}</p>
      </Stagger>

      <CatFilter chips={[{ k: 'jewellery', label: t.collection.filters.jewellery }, { k: 'stone', label: t.collection.filters.stone }]} allLabel={t.collection.filters.all} param="k">
        {items.map((p, i) => (
          <div key={p.slug} data-cat={p.kind}>
            <ProductCard p={p} locale={locale} view={t.collection.view} index={i} />
          </div>
        ))}
      </CatFilter>
    </div>
  );
}
