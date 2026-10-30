import Link from 'next/link';
import { notFound } from 'next/navigation';
import StoneVisual from '@/components/StoneVisual';
import { getGem, money, num } from '@/lib/api';
import { dict } from '@/lib/dict';

export const dynamic = 'force-dynamic';

export default async function GemPage({ params }) {
  const { locale, slug } = await params;
  const t = dict[locale];
  const g = await getGem(slug);
  if (!g) notFound();
  const f = (k) => g[`${k}_${locale}`];
  const rows = [
    ['stone_type', f('stone_type')], ['color', f('color')], ['carat', num(g.carat, locale)],
    ['clarity', f('clarity')], ['cut', f('cut')], ['origin', f('origin')], ['made', f('made')],
    ['natural', g.is_natural ? t.gem.natural : t.gem.labgrown], ['treatment', f('treatment')],
    ['cert_no', g.cert_no || t.gem.onReport], ['lab', g.lab],
    ['price', `${money(g.price_usd, locale)} — ${f('price_note')}`], ['stock', f('stock')],
  ];
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-28 lg:grid-cols-2">
      <StoneVisual gem={g} locale={locale} className="aspect-square w-full self-start rounded-3xl" />
      <div>
        <Link href={`/${locale}/shop`} className="text-sm font-black text-gold-light">← {t.gem.back}</Link>
        <h1 className="mt-4 font-display text-4xl font-black md:text-6xl">{f('name')}</h1>
        <p className="mt-5 text-lg leading-8 text-lilac/85">{f('description')}</p>
        <dl className="glass mt-8 px-5">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-white/10 py-3 last:border-0">
              <dt className="text-lilac/60">{t.gem.spec[k]}</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-10 font-display text-2xl font-black">{t.gem.links}</h2>
        <ul className="mt-3 grid gap-2">
          {g.links.map((l) => (
            <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer" className="text-gold-light underline-offset-4 hover:underline">↗ {l.label}</a></li>
          ))}
        </ul>
        <Link href={`/${locale}/contact?gem=${g.slug}`} className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-black text-ink">{t.gem.inquire}</Link>
      </div>
    </div>
  );
}
