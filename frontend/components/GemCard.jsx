'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { money, num } from '@/lib/api';

/**
 * GemCard — gold-themed card for the Shop page, matching the look and feel of
 * ProductCard on the Collection page. Same gold border, same gold corner
 * accents, same hover glow, same "View details" treatment.
 */
export default function GemCard({ gem, locale, index = 0, view }) {
  const ref = useRef(null);
  const name = gem[`name_${locale}`];
  const stoneType = gem[`stone_type_${locale}`];

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

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: px * 10, rotateX: -py * 10,
        duration: 0.5, ease: 'power2.out', transformPerspective: 900,
      });
    };
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
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
      href={`/${locale}/shop/${gem.slug}`}
      className="card-3d group relative block rounded-2xl border-2 border-gold/25 bg-gradient-to-b from-plum/70 via-ink/85 to-ink p-3 transition-all duration-500 hover:border-gold hover:shadow-[0_0_50px_rgba(212,175,55,.45)]"
      style={{ willChange: 'transform' }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute left-0 top-0 h-7 w-7 rounded-tl-2xl border-l-[3px] border-t-[3px] border-gold" />
        <span className="absolute right-0 top-0 h-7 w-7 rounded-tr-2xl border-r-[3px] border-t-[3px] border-gold" />
        <span className="absolute bottom-0 left-0 h-7 w-7 rounded-bl-2xl border-b-[3px] border-l-[3px] border-gold" />
        <span className="absolute bottom-0 right-0 h-7 w-7 rounded-br-2xl border-b-[3px] border-r-[3px] border-gold" />
      </span>

      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-ink via-plum/60 to-ink">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 40%, ${gem.hex || '#7b4bb7'}33, transparent 65%)` }}
        />
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="hl font-display text-5xl font-black">{num(gem.carat, locale)}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[.2em] text-gold-light rtl:tracking-normal">{stoneType}</p>
          </div>
        </div>
        {/* Note: gem.image is a file like "stone-ruby.jpg" that may not exist for the
            landmark stones — keep the carat-badge visual as the canonical preview */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-gold/60 bg-ink/80 px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-gold-light backdrop-blur-sm rtl:tracking-normal">
          {locale === 'fa' ? 'سنگ' : 'Stone'}
        </span>
      </div>

      <h3 className="mt-4 px-1 text-lg font-black leading-tight text-lilac group-hover:text-gold-light">{name}</h3>
      <p className="mt-1.5 px-1 text-sm font-bold leading-6 text-gold-light/85 line-clamp-2">
        {gem[`color_${locale}`]} · {gem[`cut_${locale}`]}
      </p>
      <p className="mt-3 px-1 pb-1 text-sm font-black text-gold-light">
        <span className="relative inline-block">
          {view || (locale === 'fa' ? 'مشاهدهٔ جزئیات' : 'View details')}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full rtl:left-auto rtl:right-0" />
        </span>{' '}
        →
      </p>
    </Link>
  );
}
