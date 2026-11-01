'use client';
import { useEffect, useState } from 'react';

/**
 * CatFilter — instant client-side filter chips (no page reload, no server round trip).
 * Every grid child must carry data-cat="<category>". The active chip is mirrored in ?param=.
 */
export default function CatFilter({ chips, allLabel, param = 'c', tone = 'gold', children }) {
  const [active, setActive] = useState('all');
  useEffect(() => { setActive(new URLSearchParams(location.search).get(param) || 'all'); }, [param]);
  const pick = (k) => {
    setActive(k);
    const u = new URL(location.href);
    k === 'all' ? u.searchParams.delete(param) : u.searchParams.set(param, k);
    history.replaceState(null, '', u);
  };
  const chip = (on) => `rounded-full border-2 px-5 py-1.5 text-sm font-black transition-all ${on ? 'border-gold bg-gold text-ink shadow-[0_0_25px_rgba(212,175,55,.45)]' : 'border-gold/40 bg-ink/50 text-lilac/80 hover:border-gold hover:text-gold-light'}`;
  return (
    <>
      <style>{chips.map((c) => `.cat-grid[data-active="${c.k}"]>[data-cat]:not([data-cat="${c.k}"]){display:none}`).join('')}</style>
      <div className="mt-9 flex flex-wrap gap-3" role="group">
        <button type="button" onClick={() => pick('all')} className={chip(active === 'all')} aria-pressed={active === 'all'}>{allLabel}</button>
        {chips.map((c) => (
          <button key={c.k} type="button" onClick={() => pick(c.k)} className={chip(active === c.k)} aria-pressed={active === c.k}>{c.label}</button>
        ))}
      </div>
      <div data-active={active} className="cat-grid mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </>
  );
}
