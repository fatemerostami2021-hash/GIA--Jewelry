'use client';
import { useEffect, useRef } from 'react';
import { globalVideo, globalPoster } from '@/lib/site';

/**
 * BackgroundVideo — ONE video behind every page. It lives in the layout, so navigating never
 * restarts it. It starts after the page has loaded (idle), skips Data-Saver and reduced-motion.
 */
export default function BackgroundVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.connection && navigator.connection.saveData)) return;
    const start = () => { v.src = globalVideo; v.play().catch(() => {}); };
    const run = () => (window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 800));
    if (document.readyState === 'complete') run(); else window.addEventListener('load', run, { once: true });
  }, []);
  return (
    <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#2a1530_0%,#0a0610_70%)]">
      <video ref={ref} muted loop playsInline preload="none" poster={globalPoster} aria-hidden className="h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-plum/40 to-ink/90" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,.07), transparent 55%)' }} />
    </div>
  );
}
