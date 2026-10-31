'use client';
import Link from 'next/link';
import { useState } from 'react';
import GemIcon from './GemIcon';
import ShapeIcon from './ShapeIcon';
import { stones, shapes, jewelTypes } from '@/lib/stones';
import { ui } from '@/lib/ui';

/**
 * MegaMenu — opened from the "Gemstones" nav item. Three link columns (stones, jewellery,
 * shapes), each entry with its own icon or photo, plus a large preview panel that follows the
 * hovered/focused entry. Every link goes to a real page (/gemstones/[slug], /collection, /gemstones#shapes).
 */
export default function MegaMenu({ locale, onClose }) {
  const m = ui[locale].mega;
  const [hv, setHv] = useState({ type: 'stone', slug: 'ruby' });

  const stone = hv.type === 'stone' ? stones.find((s) => s.slug === hv.slug) : null;
  const jewel = hv.type === 'jewel' ? jewelTypes.find((j) => j.k === hv.slug) : null;
  const shape = hv.type === 'shape' ? shapes.find((s) => s.k === hv.slug) : null;

  const item = 'mega-item flex items-center gap-3 rounded-xl px-2.5 py-1.5 text-sm font-bold text-lilac/85 outline-none transition-colors hover:bg-gold/10 hover:text-gold-light focus-visible:bg-gold/15 focus-visible:text-gold-light';

  return (
    <div className="mega-panel absolute inset-x-0 top-full border-y border-gold/30 bg-ink/97 shadow-[0_30px_60px_rgba(0,0,0,.55)] backdrop-blur-xl" role="region" aria-label={ui[locale].nav.gemstones}>
      <div className="mx-auto grid max-w-7xl grid-cols-[1.35fr_1fr_.9fr_1.15fr] gap-x-6 px-5 py-6">
        {/* ---- stones ---- */}
        <div>
          <h3 className="mb-3 border-b border-gold/25 pb-2 font-display text-lg font-black text-gold-light">{m.byStone}</h3>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
            {stones.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${locale}/gemstones/${s.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setHv({ type: 'stone', slug: s.slug })}
                  onFocus={() => setHv({ type: 'stone', slug: s.slug })}
                  className={item}
                >
                  {s.photo ? (
                    <img src={s.photo} alt="" loading="lazy" className="h-8 w-8 rounded-full border border-gold/40 object-cover" />
                  ) : (
                    <GemIcon hex={s.hex} hex2={s.hex2} size={32} />
                  )}
                  <span>{s[locale].name.split(' (')[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/gemstones`} onClick={onClose} className="mt-3 inline-block text-sm font-black text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-light">
            {m.all} →
          </Link>
        </div>

        {/* ---- jewellery ---- */}
        <div>
          <h3 className="mb-3 border-b border-gold/25 pb-2 font-display text-lg font-black text-gold-light">{m.byJewel}</h3>
          <ul className="grid gap-0.5">
            {jewelTypes.map((j) => (
              <li key={j.k}>
                <Link
                  href={`/${locale}/collection?k=jewellery`}
                  onClick={onClose}
                  onMouseEnter={() => setHv({ type: 'jewel', slug: j.k })}
                  onFocus={() => setHv({ type: 'jewel', slug: j.k })}
                  className={item}
                >
                  <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-gold/30 bg-black/40">
                    <img src={j.img} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                  </span>
                  <span>{j[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/collection`} onClick={onClose} className="mt-3 inline-block text-sm font-black text-gold underline decoration-gold/40 underline-offset-4 hover:text-gold-light">
            {m.allJewel} →
          </Link>
        </div>

        {/* ---- shapes ---- */}
        <div>
          <h3 className="mb-3 border-b border-gold/25 pb-2 font-display text-lg font-black text-gold-light">{m.byShape}</h3>
          <ul className="grid gap-0.5">
            {shapes.map((s) => (
              <li key={s.k}>
                <Link
                  href={`/${locale}/gemstones#shapes`}
                  onClick={onClose}
                  onMouseEnter={() => setHv({ type: 'shape', slug: s.k })}
                  onFocus={() => setHv({ type: 'shape', slug: s.k })}
                  className={item}
                >
                  <ShapeIcon k={s.k} size={26} className="text-gold" />
                  <span>{s[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- live preview ---- */}
        <aside className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-plum via-ink to-black p-4" aria-live="polite">
          <div className="mega-glow pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full" style={{ background: `radial-gradient(circle, ${stone ? stone.hex : '#d4af37'}88, transparent 70%)` }} />
          <div key={`${hv.type}-${hv.slug}`} className="mega-preview relative grid place-items-center">
            <div className="grid h-44 w-full place-items-center">
              {stone && (stone.photo ? (
                <img src={stone.photo} alt={stone[locale].name} className="h-44 w-44 rounded-2xl border border-gold/40 object-cover shadow-[0_0_40px_rgba(212,175,55,.3)]" />
              ) : (
                <GemIcon hex={stone.hex} hex2={stone.hex2} size={150} className="drop-shadow-[0_0_28px_rgba(255,255,255,.25)]" />
              ))}
              {jewel && <img src={jewel.img} alt={jewel[locale]} className="max-h-44 w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,.6)]" />}
              {shape && <ShapeIcon k={shape.k} size={140} className="text-gold-light drop-shadow-[0_0_22px_rgba(242,217,138,.5)]" />}
            </div>
            <p className="mt-3 text-center font-display text-xl font-black text-gold-light">
              {stone ? stone[locale].name : jewel ? jewel[locale] : shape[locale]}
            </p>
            <p className="mt-1 text-center text-sm font-bold leading-6 text-lilac/75">
              {stone ? stone[locale].tag : jewel ? (locale === 'fa' ? jewel.tagfa : jewel.tag) : (locale === 'fa' ? shape.dfa : shape.d)}
            </p>
            {stone && (
              <p className="mt-2 text-xs font-bold text-lilac/55">
                {ui[locale].guide.f.mohs}: {locale === 'fa' ? String(stone.mohs[0] === stone.mohs[1] ? stone.mohs[0] : `${stone.mohs[0]}–${stone.mohs[1]}`).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]).replace('.', '٫') : stone.mohs[0] === stone.mohs[1] ? stone.mohs[0] : `${stone.mohs[0]}–${stone.mohs[1]}`}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
