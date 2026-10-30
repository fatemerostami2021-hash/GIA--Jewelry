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
  const chip = (on) =>
    `rounded-full border px-5 py-1.5 text-sm font-black transition-all ${
      on ? 'border-gold bg-gold text-ink shadow-[0_0_25px_rgba(212,175,55,.45)]' : 'border-white/25 bg-ink/50 text-lilac/80 hover:border-gold/60 hover:text-gold-light'
    }`;

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
        <div className="mt-9 flex flex-wrap gap-3">
          {['all', 'jewellery', 'stone'].map((f) => (
            <Link
              key={f}
              href={f === 'all' ? `/${locale}/collection` : `/${locale}/collection?k=${f}`}
              className={chip((k || 'all') === f)}
            >
              {t.collection.filters[f]}
            </Link>
          ))}
        </div>
      </Stagger>

      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} p={p} locale={locale} view={t.collection.view} index={i} />
        ))}
      </div>
    </div>
  );
}
