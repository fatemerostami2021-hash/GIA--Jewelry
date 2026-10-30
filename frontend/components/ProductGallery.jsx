'use client';
import { useState } from 'react';
import SafeVideo from './SafeVideo';

export default function ProductGallery({ images, video, alt }) {
  const items = [...images.map((src) => ({ type: 'img', src })), ...(video ? [{ type: 'video', src: video }] : [])];
  const [i, setI] = useState(0);
  const cur = items[i];
  return (
    <div className="lg:sticky lg:top-24">
      <div className="glass aspect-square overflow-hidden bg-ink/50">
        {cur.type === 'img' ? <img src={cur.src} alt={alt} className="h-full w-full object-contain" /> : <SafeVideo src={cur.src} className="h-full w-full object-contain" />}
      </div>
      {items.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {items.map((it, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`${alt} ${k + 1}`} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-ink/50 ${k === i ? 'border-gold' : 'border-white/15'}`}>
              {it.type === 'img' ? <img src={it.src} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-2xl">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
