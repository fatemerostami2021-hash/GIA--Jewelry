'use client';
import { useEffect, useRef } from 'react';

/** HeroVideo — muted, looping, inline video that starts once the page is idle; poster shows first. */
export default function HeroVideo({ src, poster, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const save = navigator.connection && navigator.connection.saveData;
    if (reduce || save) return;
    const start = () => { v.src = src; v.play().catch(() => {}); };
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300));
    const id = idle(start);
    return () => { (window.cancelIdleCallback || clearTimeout)(id); };
  }, [src]);
  return <video ref={ref} muted loop playsInline preload="none" poster={poster} className={className} aria-hidden />;
}
