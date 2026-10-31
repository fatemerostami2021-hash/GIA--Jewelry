'use client';
import { useEffect, useState } from 'react';

/**
 * TypeText — typewriter effect.
 *   <TypeText words={['rubies','emeralds']} />            loops: types, pauses, deletes, next word
 *   <TypeText text="The ruby necklace" once />            types once whenever `text` changes
 * Respects prefers-reduced-motion (shows the full text immediately).
 */
export default function TypeText({ words, text, once = false, speed = 55, hold = 1500, className = '' }) {
  const list = words || [text || ''];
  const key = list.join('|');
  const [out, setOut] = useState('');

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setOut(list[0]); return; }
    let i = 0, n = 0, dir = 1, t;
    const tick = () => {
      const w = list[i];
      n += dir;
      setOut(w.slice(0, n));
      if (dir === 1 && n === w.length) {
        if (once) return;
        dir = -1; t = setTimeout(tick, hold); return;
      }
      if (dir === -1 && n === 0) { dir = 1; i = (i + 1) % list.length; t = setTimeout(tick, 350); return; }
      t = setTimeout(tick, dir === 1 ? speed : speed / 2);
    };
    setOut('');
    t = setTimeout(tick, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, once, speed, hold]);

  return (
    <span className={className} aria-label={list[0]}>
      <span aria-hidden>{out || '\u200b'}</span>
      <span className="type-caret" aria-hidden />
    </span>
  );
}
