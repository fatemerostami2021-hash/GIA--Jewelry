'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ProductCard — gold-themed luxury collection card.
 *   - Scroll-triggered fade-up + subtle 3D rise when it enters the viewport
 *   - Pointer-driven 3D tilt + gold glow when hovered
 *   - Gold frame, gold corner accents, gold "View details" line
 */
export default function ProductCard({ p, locale, view, index = 0 }) {
  const ref = useRef(null);
  const c = p[locale];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0, rotateX: -8, transformPerspective: 900 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.85, ease: 'power3.out',
          delay: (index % 4) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    }, el);

    // Pointer tilt
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: px * 10,
        rotateX: -py * 10,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 900,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      ctx.revert();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [index]);

  return (
    <Link
      ref={ref}
      href={`/${locale}/collection/${p.slug}`}
      className="card-3d group relative block rounded-2xl border-2 border-gold/25 bg-gradient-to-b from-plum/70 via-ink/85 to-ink p-3 transition-all duration-500 hover:border-gold hover:shadow-[0_0_50px_rgba(212,175,55,.45)]"
      style={{ willChange: 'transform' }}
    >
      {/* gold corner accents */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute left-0 top-0 h-7 w-7 rounded-tl-2xl border-l-[3px] border-t-[3px] border-gold" />
        <span className="absolute right-0 top-0 h-7 w-7 rounded-tr-2xl border-r-[3px] border-t-[3px] border-gold" />
        <span className="absolute bottom-0 left-0 h-7 w-7 rounded-bl-2xl border-b-[3px] border-l-[3px] border-gold" />
        <span className="absolute bottom-0 right-0 h-7 w-7 rounded-br-2xl border-b-[3px] border-r-[3px] border-gold" />
      </span>

      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-ink via-plum/60 to-ink">
        {/* gold radial sheen behind the gem */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,.18),transparent_60%)]" />
        <img
          src={p.cover.thumb}
          alt={c.name}
          loading="lazy"
          className="relative h-full w-full object-contain transition-transform duration-[1100ms] ease-out group-hover:scale-110"
        />
        {/* gold bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-gold/60 bg-ink/80 px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-gold-light backdrop-blur-sm rtl:tracking-normal">
          {p.kind === 'stone' ? (locale === 'fa' ? 'سنگ' : 'Stone') : (locale === 'fa' ? 'جواهر' : 'Jewel')}
        </span>
      </div>

      <h3 className="mt-4 px-1 text-lg font-black leading-tight text-lilac group-hover:text-gold-light">{c.name}</h3>
      <p className="mt-1.5 px-1 text-sm leading-6 text-lilac/70 line-clamp-2">{c.short}</p>
      <p className="mt-3 px-1 pb-1 text-sm font-black text-gold-light">
        <span className="relative inline-block">
          {view}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full rtl:left-auto rtl:right-0" />
        </span>{' '}
        →
      </p>
    </Link>
  );
}
