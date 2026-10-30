'use client';
import { useEffect, useRef } from 'react';

/**
 * Hero3DScene — professional 3D scene behind the hero.
 * - A central rotating "gem disc" made from a faceted cylinder geometry using gemstone photos as faces
 * - A swarm of small floating gem cards orbiting on a tilted ring, each textured with a real gemstone photo
 * - Scroll-driven rotation (GSAP ScrollTrigger), pointer parallax, and slow ambient drift
 * - Skipped entirely on touch / reduced-motion / very small screens (the purple gradient stays)
 */
export default function Hero3DScene({ images = [] }) {
  const ref = useRef(null);
  const key = images.slice(0, 14).join('|');

  useEffect(() => {
    const el = ref.current;
    if (!el || !key) return;
    const mq = matchMedia('(max-width: 640px), (pointer: coarse), (prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let dispose, cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const mod = await import('@/lib/hero3d');
        if (!cancelled) dispose = mod.createHero3DScene(el, key.split('|'));
      } catch (e) { /* swallow — the page still works without 3D */ }
    }, 350);
    return () => { cancelled = true; clearTimeout(timer); dispose?.(); };
  }, [key]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] opacity-0 transition-opacity duration-[1400ms]"
    />
  );
}
