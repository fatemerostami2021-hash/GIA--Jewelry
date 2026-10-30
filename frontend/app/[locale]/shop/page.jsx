import Link from 'next/link';
import GemCard from '@/components/GemCard';
import Stagger from '@/components/Stagger';
import { getGems } from '@/lib/api';
import { dict } from '@/lib/dict';

export const dynamic = 'force-dynamic';

/**
 * Shop (Gemstones) page. Same visual language as the Collection page:
 * eyebrow, big title, refined gold chips, gold cards grid.
 */
export default async function Shop({ params, searchParams }) {
  const { locale } = await params;
  const { c } = await searchParams;
  const t = dict[locale];
  const gems = await getGems(c);
  const chip = (active) =>
    `rounded-full border-2 px-5 py-1.5 text-sm font-black transition-all ${
      active ? 'border-gold bg-gold text-ink shadow-[0_0_25px_rgba(212,175,55,.45)]' : 'border-gold/40 bg-ink/50 text-lilac/80 hover:border-gold hover:text-gold-light'
    }`;
  return (
    <div className="mx-auto max-w-7xl px-5 pt-32 pb-24">
      <Stagger y={30} stagger={0.15}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-gold-light rtl:tracking-normal">
          ✦ {locale === 'fa' ? 'سنگ‌های شاخص' : 'Landmark stones'}
        </p>
        <h1 className="font-display text-5xl font-black md:text-7xl">
          <span className="hl">{t.shop.title}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-lilac/80">{t.shop.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={`/${locale}/shop`} className={chip(!c)}>{t.shop.all}</Link>
          {Object.entries(t.shop.categories).map(([k, v]) => (
            <Link key={k} href={`/${locale}/shop?c=${k}`} className={chip(c === k)}>{v}</Link>
          ))}
        </div>
      </Stagger>

      {gems.length === 0 && <p className="mt-12 text-lilac/70">{t.shop.empty}</p>}

      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gems.map((g, i) => (
          <GemCard key={g.slug} gem={g} locale={locale} index={i} view={t.collection.view} />
        ))}
      </div>
    </div>
  );
}
