import Link from 'next/link';
import GemIcon from '@/components/GemIcon';
import ShapeIcon from '@/components/ShapeIcon';
import Stagger from '@/components/Stagger';
import TypeText from '@/components/TypeText';
import { HardnessChart, CompareTable } from '@/components/GuideParts';
import { stones, shapes, faDigits } from '@/lib/stones';
import { ui } from '@/lib/ui';


export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: `${ui[locale].guide.title} — GIA Jewelry`, description: ui[locale].guide.intro };
}

/** Gemstone guide — index: stone cards, hardness chart, comparison tool, shapes, care. */
export default async function Gemstones({ params }) {
  const { locale } = await params;
  const g = ui[locale].guide;
  const mohs = (s) => { const v = s.mohs[0] === s.mohs[1] ? `${s.mohs[0]}` : `${s.mohs[0]}-${s.mohs[1]}`; return locale === 'fa' ? faDigits(v) : v.replace('-', '–'); };
  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-36">
      <Stagger y={30} stagger={0.15}>
        <p className="mb-3 text-xs font-black tracking-[.35em] text-gold-light rtl:tracking-normal">✦ {g.eyebrow}</p>
        <h1 className="font-display text-5xl font-black md:text-7xl"><span className="hl">{g.title}</span></h1>
        <p className="mt-5 min-h-[2rem] font-display text-2xl font-black text-gold-light">
          <TypeText words={ui[locale].typing} />
        </p>
        <p className="mt-4 max-w-2xl text-lg font-bold leading-8 text-lilac/80">{g.intro}</p>
      </Stagger>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stones.map((s) => (
          <Link key={s.slug} href={`/${locale}/gemstones/${s.slug}`} className="stone-card group relative overflow-hidden rounded-3xl border border-gold/30 bg-ink/65 p-5 backdrop-blur">
            <div className="pointer-events-none absolute -top-12 start-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-100" style={{ background: s.hex }} />
            <div className="relative grid h-36 place-items-center">
              {s.photo ? (
                <img src={s.photo} alt={s[locale].name} loading="lazy" className="gem-float h-32 w-32 rounded-2xl border border-gold/40 object-cover" />
              ) : (
                <GemIcon hex={s.hex} hex2={s.hex2} size={112} className="gem-float drop-shadow-[0_8px_24px_rgba(0,0,0,.5)]" />
              )}
            </div>
            <h2 className="relative mt-3 font-display text-2xl font-black text-lilac group-hover:text-gold-light">{s[locale].name}</h2>
            <p className="relative mt-1 min-h-[3rem] text-sm font-bold leading-6 text-lilac/70">{s[locale].tag}</p>
            <div className="relative mt-3 flex items-center justify-between text-xs font-black text-gold-light">
              <span>{g.f.mohs}: {mohs(s)}</span>
              <span>{locale === 'fa' ? s.month[2] : s.month[1]}</span>
            </div>
            <span className="relative mt-4 inline-block text-sm font-black text-gold">{g.view} →</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <HardnessChart locale={locale} />
        <CompareTable locale={locale} />
      </div>

      <section id="shapes" className="mt-20 scroll-mt-32">
        <h2 className="font-display text-4xl font-black"><span className="hl">{g.shapesTitle}</span></h2>
        <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7" y={30}>
          {shapes.map((s) => (
            <div key={s.k} className="stone-card rounded-2xl border border-gold/30 bg-ink/60 p-4 text-center">
              <ShapeIcon k={s.k} size={56} className="gem-float mx-auto text-gold-light" />
              <h3 className="mt-2 font-display text-lg font-black text-lilac">{s[locale]}</h3>
              <p className="mt-1 text-xs font-bold leading-5 text-lilac/65">{locale === 'fa' ? s.dfa : s.d}</p>
            </div>
          ))}
        </Stagger>
      </section>

      <p className="mt-16 max-w-3xl border-t border-gold/20 pt-5 text-xs font-bold leading-6 text-lilac/50">{g.disclaimer}</p>
    </div>
  );
}
