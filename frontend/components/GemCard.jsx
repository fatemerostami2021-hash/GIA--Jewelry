import Link from 'next/link';
import StoneVisual from './StoneVisual';
import { money } from '@/lib/api';

export default function GemCard({ gem, locale }) {
  return (
    <Link href={`/${locale}/shop/${gem.slug}`} className="glass group block p-3 transition hover:border-gold/60 hover:shadow-[0_0_40px_rgba(168,85,247,.4)]">
      <StoneVisual gem={gem} locale={locale} className="aspect-[4/5]" />
      <p className="mt-4 px-1 text-lg font-black">{gem[`name_${locale}`]}</p>
      <p className="px-1 pb-1 font-bold text-gold-light">{money(gem.price_usd, locale)}</p>
    </Link>
  );
}
