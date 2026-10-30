'use client';
import { useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ============================================================
   HexRail — Single Row Marquee (RTL-Safe + Draggable/Touch)
   Adapted from the Iranian-restaurant MenuWaveSlider pattern:
   - Position is written straight to the DOM (no React state), so the page
     does not re-render 60 times per second.
   - The loop pauses when off-screen / tab hidden / reduced-motion / hovered
     / dragged.
   - Works on both LTR (en) and RTL (fa, ar) — the auto-scroll direction is
     flipped for RTL so the marquee still reads naturally.
   - Hexagons are pure CSS clip-path; the rail is full-bleed so the hexes can
     slide edge-to-edge.
   ============================================================ */

// px per 16.7ms frame — slower than the food rail so the gems feel luxurious
const AUTO_SPEED = 0.45;
const DRAG_THRESHOLD = 6;

export default function HexRail({ items = [], locale }) {
  const isRtl = locale === 'fa';
  const autoDirection = isRtl ? 1 : -1;

  // 6 copies: half the track is 3 copies, wider than any screen — guarantees
  // a seamless loop no matter how wide the viewport is.
  const rowItems = useMemo(
    () => Array.from({ length: 6 }, () => items).flat(),
    [items]
  );

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const positionRef = useRef(0);
  const halfWidthRef = useRef(0);
  const rafRef = useRef(null);
  const visibleRef = useRef(true);

  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const movedDistanceRef = useRef(0);
  const pointerIdRef = useRef(null);

  const recalcWidth = useCallback(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  useEffect(() => {
    recalcWidth();
    window.addEventListener('resize', recalcWidth);
    return () => window.removeEventListener('resize', recalcWidth);
  }, [recalcWidth, rowItems]);

  const normalizePosition = (pos) => {
    const half = halfWidthRef.current;
    if (!half) return pos;
    let p = pos;
    while (p <= -half) p += half;
    while (p > 0) p -= half;
    return p;
  };

  const applyPosition = (p) => {
    positionRef.current = p;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${p}px,0,0)`;
    }
  };

  // Pause the loop when the marquee is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // RAF loop — runs forever, but only moves the track when conditions allow
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!reduce && visibleRef.current && !document.hidden && !draggingRef.current && !pausedRef.current) {
        applyPosition(
          normalizePosition(positionRef.current + autoDirection * AUTO_SPEED * (dt / 16.67))
        );
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDirection]);

  // ===== Drag / touch handlers (pointer events) ============================
  const handlePointerDown = (e) => {
    draggingRef.current = true;
    movedDistanceRef.current = 0;
    startXRef.current = e.clientX;
    startPosRef.current = positionRef.current;
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    movedDistanceRef.current = Math.abs(dx);
    applyPosition(normalizePosition(startPosRef.current + dx));
  };

  const endDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (pointerIdRef.current != null) {
      e.currentTarget.releasePointerCapture?.(pointerIdRef.current);
      pointerIdRef.current = null;
    }
  };

  const handleClickCapture = (e) => {
    if (movedDistanceRef.current > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    endDrag({ currentTarget: containerRef.current, pointerId: pointerIdRef.current });
  };

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden py-16">
      {/* Gold ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,.08), transparent 70%)' }}
      />
      <div className="relative">
        {/* Eyebrow + title — centered, bolder */}
        <div className="mb-10 px-5 text-center">
          <p className="mb-2 text-xs font-black uppercase tracking-[.4em] text-gold-light rtl:tracking-normal">
            ✦ {locale === 'fa' ? 'پرفروش‌ترین‌ها' : 'Best sellers'}
          </p>
          <h2 className="font-display text-4xl font-black text-lilac md:text-5xl">
            {locale === 'fa' ? 'پرفروش‌ترین سنگ‌ها و جواهرات' : 'Best-selling stones & jewels'}
          </h2>
        </div>

        {/* ===== Honeycomb marquee — single row, draggable with touch/mouse ===== */}
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          dir="ltr"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ width: 'max-content' }}
          >
            {rowItems.map((it, i) => (
              <Link
                key={`${it.slug}-${i}`}
                href={`/${locale}/collection/${it.slug}`}
                draggable={false}
                className="hex-card group inline-flex flex-col items-center mx-4 sm:mx-5"
                onClickCapture={handleClickCapture}
                aria-label={it.name}
              >
                <div className="hex-frame" />
                <img
                  src={it.thumb}
                  alt={it.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="hex-img transition-transform duration-[1200ms] ease-out group-hover:scale-110 pointer-events-none"
                />
                <div className="hex-overlay">
                  <p className="px-3 text-center text-sm font-black leading-tight text-lilac">
                    {it.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Edge fades for a clean entrance/exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
        </div>
      </div>
    </section>
  );
}
