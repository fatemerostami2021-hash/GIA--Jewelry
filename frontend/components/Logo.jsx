'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Logo({ name }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const paths = ref.current.querySelectorAll('path[data-line]');
      paths.forEach((p) => {
        const l = p.getTotalLength();
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      });
      gsap.timeline()
        .to(paths, { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: 'power2.out' })
        .to('[data-fill]', { opacity: 1, duration: 0.6 }, '-=0.4');
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <span ref={ref} className="flex items-center gap-2">
      <svg viewBox="0 0 48 48" className="h-9 w-9 overflow-visible" fill="none" stroke="#d4af37" strokeWidth="1.8" aria-hidden>
        <path data-fill d="M24 4 40 16 24 44 8 16Z" fill="#a855f7" fillOpacity=".45" stroke="none" />
        <path data-line d="M24 4 40 16 24 44 8 16Z" />
        <path data-line d="M8 16H40M18 16 24 44 30 16M18 16 24 4 30 16" />
        <circle className="twinkle" cx="40" cy="5" r="2.4" fill="#f2d98a" stroke="none" />
      </svg>
      <span dir="ltr" className="font-display text-2xl font-black tracking-[.3em] text-gold-light">{name}</span>
    </span>
  );
}
