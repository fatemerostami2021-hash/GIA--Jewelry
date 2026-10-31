'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Logo — a gem that draws itself, then keeps blinking: facets light up one after another and
 * four little stars twinkle at different speeds. "GIA" shimmers in gold and "Jewelry" sits
 * beside it. Under prefers-reduced-motion the logo is static.
 */
export default function Logo({ name = 'GIA', sub = 'Jewelry' }) {
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
        .to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.out' })
        .to('[data-fill]', { opacity: 1, duration: 0.5 }, '-=0.4');
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <span ref={ref} className="logo group flex items-center gap-2.5" aria-label={`${name} ${sub}`}>
      <svg viewBox="0 0 48 48" className="logo-gem h-10 w-10 overflow-visible" fill="none" stroke="#d4af37" strokeWidth="1.8" aria-hidden>
        <path data-fill d="M24 4 40 16 24 44 8 16Z" fill="#a855f7" fillOpacity=".5" stroke="none" />
        <path className="facet f1" d="M8 16 18 16 24 4Z" fill="#fff" stroke="none" />
        <path className="facet f2" d="M18 16 30 16 24 4Z" fill="#f2d98a" stroke="none" />
        <path className="facet f3" d="M30 16 40 16 24 4Z" fill="#fff" stroke="none" />
        <path className="facet f4" d="M18 16 24 44 8 16Z" fill="#f2d98a" stroke="none" />
        <path className="facet f5" d="M30 16 40 16 24 44Z" fill="#fff" stroke="none" />
        <path data-line d="M24 4 40 16 24 44 8 16Z" />
        <path data-line d="M8 16H40M18 16 24 44 30 16M18 16 24 4 30 16" />
        <g fill="#fff6d6" stroke="none">
          <path className="logo-star s1" d="M41 3l1.100 2.900L45 7l-2.900 1.100L41 11l-1.100-2.900L37 7l2.900-1.100z" />
          <path className="logo-star s2" d="M6 22l.8 2.200L9 25l-2.200.8L6 28l-.8-2.200L3 25l2.200-.8z" />
          <path className="logo-star s3" d="M30 38l.7 1.800L32.500 40.500l-1.800.7L30 43l-.7-1.800-1.800-.7 1.800-.7z" />
        </g>
      </svg>
      <span dir="ltr" className="flex items-baseline gap-1.5 leading-none">
        <span className="logo-word font-display text-2xl font-black tracking-[.22em] sm:text-[1.7rem]">{name}</span>
        <span className="font-display text-sm font-bold italic tracking-[.12em] text-gold-light/90 transition-colors group-hover:text-white sm:text-base">{sub}</span>
      </span>
    </span>
  );
}
