import Link from 'next/link';
import { ui } from '@/lib/ui';

const IMG = {
  collection: '/media/cutouts/necklace.webp',
  gemstones: null,
  shop: '/media/images/optimized/ruby-faceted-oval-640.webp',
  sell: '/media/cutouts/ring.webp',
  contact: '/media/cutouts/earrings.webp',
};

/** ExploreStrip — shared cross-link block shown above the footer on every page. */
export default function ExploreStrip({ locale }) {
  const e = ui[locale].explore;
  return (
    <section className="relative mx-auto mt-24 max-w-7xl px-5" aria-label={e.title}>
      <h2 className="mb-6 font-display text-2xl font-black text-gold-light md:text-3xl">{e.title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {e.items.map(([k, name, text]) => (
          <li key={k}>
            <Link href={`/${locale}/${k}`} className="stone-card group flex h-full flex-col items-center gap-3 rounded-2xl border border-gold/30 bg-ink/60 p-5 text-center backdrop-blur">
              <span className="grid h-20 w-full place-items-center">
                {IMG[k] ? <img src={IMG[k]} alt="" loading="lazy" className="gem-float max-h-20 max-w-[90%] object-contain" /> : <span className="gem-float text-5xl text-gold-light">✦</span>}
              </span>
              <span className="font-display text-lg font-black text-lilac group-hover:text-gold-light">{name}</span>
              <span className="text-xs font-bold leading-5 text-lilac/65">{text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
