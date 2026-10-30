import Link from 'next/link';
import GemCard from '@/components/GemCard';
import Stagger from '@/components/Stagger';
import { getGems } from '@/lib/api';
import { dict } from '@/lib/dict';

export const dynamic = 'force-dynamic';

export default async function Shop({ params, searchParams }) {
  const { locale } = await params;
  const { c } = await searchParams;
  const t = dict[locale];
  const gems = await getGems(c);
  const chip = (active) => `rounded-full border px-4 py-1 text-sm font-black ${active ? 'border-gold bg-gold text-ink' : 'border-white/25 bg-ink/50'}`;
  return (
    <div className="mx-auto max-w-7xl px-5 pt-28">
      <h1 className="font-display text-5xl font-black md:text-7xl"><span className="hl">{t.shop.title}</span></h1>
      <p className="mt-4 max-w-2xl text-lg font-bold text-lilac/80">{t.shop.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/${locale}/shop`} className={chip(!c)}>{t.shop.all}</Link>
        {Object.entries(t.shop.categories).map(([k, v]) => <Link key={k} href={`/${locale}/shop?c=${k}`} className={chip(c === k)}>{v}</Link>)}
      </div>
      {gems.length === 0 && <p className="mt-12 text-lilac/70">{t.shop.empty}</p>}
      <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gems.map((g) => <GemCard key={g.slug} gem={g} locale={locale} />)}
      </Stagger>
    </div>
  );
}
