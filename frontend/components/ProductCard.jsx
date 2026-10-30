import Link from 'next/link';

export default function ProductCard({ p, locale, view }) {
  const c = p[locale];
  return (
    <Link href={`/${locale}/collection/${p.slug}`} className="glass group block p-3 transition hover:border-gold/60 hover:shadow-[0_0_40px_rgba(168,85,247,.4)]">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-plum to-ink">
        <img src={p.cover.thumb} alt={c.name} loading="lazy" className="h-full w-full object-contain transition duration-700 group-hover:scale-105" />
      </div>
      <h3 className="mt-4 px-1 text-lg font-black">{c.name}</h3>
      <p className="mt-1 px-1 text-sm leading-6 text-lilac/70">{c.short}</p>
      <p className="px-1 pb-1 pt-3 text-sm font-black text-gold-light">{view} →</p>
    </Link>
  );
}
