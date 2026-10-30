'use client';
import { useEffect, useRef } from 'react';

// Photo-based 3D layer behind the home page. Skipped on phones / touch / reduced-motion (the video stays).
export default function StoneField({ images }) {
  const ref = useRef(null);
  const key = images.join('|');
  useEffect(() => {
    const lite = matchMedia('(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;
    if (lite || !key) return;
    let dispose, cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const { createStoneField } = await import('@/lib/stonefield');
        if (!cancelled) dispose = createStoneField(ref.current, key.split('|'));
      } catch {}
    }, 600);
    return () => { cancelled = true; clearTimeout(timer); dispose?.(); };
  }, [key]);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-[5] opacity-0 transition-opacity duration-1000" />;
}
