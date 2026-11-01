'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GemIcon from './GemIcon';
import { stones, faDigits } from '@/lib/stones';
import { ui } from '@/lib/ui';

const nm = (s, locale) => s[locale].name.split(' (')[0];
const mohsText = (s, locale) => {
  const v = s.mohs[0] === s.mohs[1] ? `${s.mohs[0]}` : `${s.mohs[0]}-${s.mohs[1]}`;
  return locale === 'fa' ? faDigits(v) : v.replace('-', '–');
};

/** Horizontal bars (Mohs hardness) that grow when scrolled into view. */
export function HardnessChart({ locale }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const g = ui[locale].guide;
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const sorted = [...stones].sort((a, b) => b.mohs[1] - a.mohs[1]);
  return (
    <div ref={ref} className="min-w-0 rounded-3xl border border-gold/30 bg-ink/60 p-6 backdrop-blur md:p-8">
      <h3 className="font-display text-2xl font-black text-gold-light">{g.hardness}</h3>
      <p className="mt-1 text-sm font-bold text-lilac/65">{g.hardnessSub}</p>
      <ul className="mt-6 grid gap-3">
        {sorted.map((s, i) => (
          <li key={s.slug}>
            <Link href={`/${locale}/gemstones/${s.slug}`} className="group grid grid-cols-[6rem_minmax(0,1fr)_2.2rem] items-center gap-2 sm:grid-cols-[7.5rem_minmax(0,1fr)_3rem] sm:gap-3 text-sm font-bold">
              <span className="flex items-center gap-2 text-lilac/85 group-hover:text-gold-light"><GemIcon hex={s.hex} hex2={s.hex2} size={20} />{nm(s, locale)}</span>
              <span className="relative h-3 overflow-hidden rounded-full bg-white/10">
                <span
                  className="hardness-bar absolute inset-y-0 start-0 block rounded-full"
                  style={{
                    width: `${(s.mohs[1] / 10) * 100}%`,
                    background: `linear-gradient(90deg, ${s.hex}, ${s.hex2})`,
                    transform: on ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 1s cubic-bezier(.2,.8,.2,1) ${i * 70}ms`,
                  }}
                />
              </span>
              <span className="text-end text-gold-light">{mohsText(s, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tick up to three stones and compare their properties side by side. */
export function CompareTable({ locale }) {
  const g = ui[locale].guide;
  const [sel, setSel] = useState(['ruby', 'sapphire']);
  const toggle = (slug) => setSel((cur) => (cur.includes(slug) ? cur.filter((x) => x !== slug) : cur.length >= 3 ? [...cur.slice(1), slug] : [...cur, slug]));
  const rows = [
    ['family', (s) => s[locale].family],
    ['mohs', (s) => mohsText(s, locale)],
    ['ri', (s) => (locale === 'fa' ? faDigits(s.ri) : s.ri)],
    ['sg', (s) => (locale === 'fa' ? faDigits(s.sg) : s.sg)],
    ['colors', (s) => s[locale].colors],
    ['sources', (s) => s[locale].sources],
    ['treatments', (s) => s[locale].treatments],
  ];
  const chosen = sel.map((k) => stones.find((s) => s.slug === k)).filter(Boolean);
  return (
    <div className="min-w-0 rounded-3xl border border-gold/30 bg-ink/60 p-6 backdrop-blur md:p-8">
      <h3 className="font-display text-2xl font-black text-gold-light">{g.compare}</h3>
      <p className="mt-1 text-sm font-bold text-lilac/65">{g.compareHint}</p>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={g.compare}>
        {stones.map((s) => {
          const on = sel.includes(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(s.slug)}
              className={`stage-chip flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-black ${on ? 'border-gold bg-gold text-ink' : 'border-gold/35 text-lilac/85 hover:border-gold'}`}
            >
              <GemIcon hex={s.hex} hex2={s.hex2} size={18} />{nm(s, locale)}
            </button>
          );
        })}
      </div>
      {chosen.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-36 p-3 text-start text-xs font-black text-gold" />
                {chosen.map((s) => (
                  <th key={s.slug} className="p-3 text-start">
                    <Link href={`/${locale}/gemstones/${s.slug}`} className="flex items-center gap-2 font-display text-lg font-black text-gold-light hover:text-white">
                      <GemIcon hex={s.hex} hex2={s.hex2} size={26} />{nm(s, locale)}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, fn]) => (
                <tr key={k} className="odd:bg-white/[.04]">
                  <th scope="row" className="p-3 text-start align-top text-xs font-black text-gold">{g.f[k]}</th>
                  {chosen.map((s) => <td key={s.slug} className="p-3 align-top font-bold leading-6 text-lilac/85">{fn(s)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
