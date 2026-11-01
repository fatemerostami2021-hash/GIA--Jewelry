import { locales } from '@/lib/dict';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GemIcon from '@/components/GemIcon';
import Stagger from '@/components/Stagger';
import { stones, stoneBySlug, faDigits } from '@/lib/stones';
import { ui } from '@/lib/ui';


export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const s = stoneBySlug(slug);
  return s ? { title: `${s[locale].name} — GIA Jewelry`, description: s[locale].tag } : {};
}

/** Gemstone guide — one stone: key properties, about, care, and links onward. */
export const generateStaticParams = () => locales.flatMap((locale) => stones.map((s) => ({ locale, slug: s.slug })));

export default async function StonePage({ params }) {
  const { locale, slug } = await params;
  const s = stoneBySlug(slug);
  if (!s) notFound();
  const g = ui[locale].guide;
  const c = s[locale];
  const fa = locale === 'fa';
  const n = (v) => (fa ? faDigits(v) : v);
  const mohs = s.mohs[0] === s.mohs[1] ? `${s.mohs[0]}` : `${s.mohs[0]}-${s.mohs[1]}`;
  const facts = [
    ['family', c.family], ['system', c.system], ['mohs', n(mohs).replace('-', '–')], ['ri', n(s.ri)], ['sg', n(s.sg)],
    ['colors', c.colors], ['sources', c.sources], ['treatments', c.treatments], ['month', fa ? s.month[2] : s.month[1]],
  ];
  const others = stones.filter((x) => x.slug !== s.slug).slice(0, 4);
  const idx = stones.findIndex((x) => x.slug === s.slug);
  const next = stones[(idx + 1) % stones.length];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-36">
      <Link href={`/${locale}/gemstones`} className="text-sm font-black text-gold hover:text-gold-light">← {g.back}</Link>

      <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-br from-plum via-ink to-black">
          <div className="pointer-events-none absolute inset-8 rounded-full opacity-70 blur-3xl" style={{ background: s.hex }} />
          {s.photo ? (
            <img src={s.photo} alt={c.name} className="relative h-[78%] w-[78%] rounded-2xl border border-gold/40 object-cover shadow-[0_0_60px_rgba(0,0,0,.6)]" />
          ) : (
            <GemIcon hex={s.hex} hex2={s.hex2} size={260} className="gem-float relative drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]" title={c.name} />
          )}
        </div>
        <Stagger y={30} stagger={0.14}>
          <p className="mb-3 text-xs font-black tracking-[.35em] text-gold-light rtl:tracking-normal">✦ {g.eyebrow}</p>
          <h1 className="font-display text-4xl font-black sm:text-5xl md:text-7xl"><span className="hl">{c.name}</span></h1>
          <p className="mt-4 text-xl font-bold leading-9 text-lilac/90">{c.tag}</p>
          <h2 className="mt-8 font-display text-2xl font-black text-gold-light">{g.aboutTitle}</h2>
          <p className="mt-2 text-base font-bold leading-8 text-lilac/80">{c.about}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {s.shop && <Link href={`/${locale}/shop?c=${s.shop}`} className="rounded-full bg-gold px-7 py-3 text-sm font-black text-ink transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(242,217,138,.55)]">{g.inShop}</Link>}
            <Link href={`/${locale}/contact?gem=${s.slug}`} className="rounded-full border-2 border-gold px-7 py-3 text-sm font-black text-gold-light hover:bg-gold/15">{g.inquire}</Link>
            <Link href={`/${locale}/collection?k=jewellery`} className="rounded-full border border-gold/40 px-7 py-3 text-sm font-black text-lilac/85 hover:border-gold hover:text-gold-light">{g.collection}</Link>
          </div>
        </Stagger>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-gold/30 bg-ink/60 p-6 backdrop-blur md:p-8">
          <h2 className="font-display text-2xl font-black text-gold-light">{g.factsTitle}</h2>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 bg-ink/90 p-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-xs font-black text-gold">{g.f[k]}</dt>
                <dd className="text-sm font-bold leading-7 text-lilac/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-gold/30 bg-ink/60 p-6 backdrop-blur md:p-8">
          <h2 className="font-display text-2xl font-black text-gold-light">{g.careTitle}</h2>
          <ul className="mt-5 grid gap-4">
            {c.care.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm font-bold leading-7 text-lilac/85"><span className="mt-1 text-gold twinkle">✦</span>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-black text-gold-light">{g.related}</h2>
          <Link href={`/${locale}/gemstones/${next.slug}`} className="text-sm font-black text-gold hover:text-gold-light">{next[locale].name.split(' (')[0]} →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/${locale}/gemstones/${o.slug}`} className="stone-card flex flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-ink/60 p-4 text-center">
              <GemIcon hex={o.hex} hex2={o.hex2} size={64} className="gem-float" />
              <span className="font-display text-lg font-black text-lilac">{o[locale].name.split(' (')[0]}</span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-14 max-w-3xl border-t border-gold/20 pt-5 text-xs font-bold leading-6 text-lilac/50">{g.disclaimer}</p>
    </div>
  );
}
