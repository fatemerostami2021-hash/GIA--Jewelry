'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TypeText from './TypeText';
import { ui } from '@/lib/ui';

/**
 * Hero — split layout: text on the right (RTL: left), video on the other side.
 * The video plays in its own framed container that covers its half, NOT the
 * full page. Headline rises word-by-word on mount, then the whole block
 * parallaxes upward as the user scrolls past it.
 */
export default function Hero({ t, locale, videoSrc }) {
  const ref = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll('.word-in');
      if (words?.length) {
        gsap.fromTo(
          words,
          { y: 32, opacity: 0, rotateX: -25, filter: 'blur(6px)' },
          {
            y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)',
            duration: 0.85, ease: 'power3.out', stagger: 0.07, delay: 0.25,
          }
        );
      }
      gsap.fromTo(
        ref.current.querySelectorAll('.hero-rise'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.55 }
      );
      // The video panel slides in from the side
      gsap.fromTo(
        ref.current.querySelector('.hero-video'),
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.4 }
      );
      gsap.to(ref.current, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-ink">
    <section
      ref={ref}
      className="mx-auto grid max-w-7xl grid-cols-[34%_1fr] items-stretch gap-3 px-3 pb-12 pt-3 sm:gap-6 sm:px-5 lg:grid-cols-2 lg:gap-10 lg:pb-16 lg:pt-4"
    >
      {/* === TEXT PANEL === */}
      <div className="order-2 rounded-3xl border border-gold/35 bg-ink/75 p-4 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-md sm:p-7 lg:order-1 lg:p-10">
        <p className="hero-rise mb-3 text-[10px] font-black uppercase tracking-[.2em] text-gold-light rtl:tracking-normal sm:mb-5 sm:text-sm sm:tracking-[.3em]">
          <span className="twinkle">✦</span> {t.eyebrow}
        </p>
        <h1
          ref={wordsRef}
          className="max-w-xl font-display text-[clamp(1.25rem,5.4vw,5rem)] font-black leading-[1.1] [text-shadow:0_4px_30px_rgba(0,0,0,.8)]"
        >
          {t.text.split(' ').map((w, i) => (
            <span
              key={i}
              className={`word-in pe-[.25em] ${t.hl.includes(w) ? 'hl' : ''}`}
              style={{ display: 'inline-block', fontWeight: 900 }}
            >
              {w}
            </span>
          ))}
        </h1>
        <p className="hero-rise mt-3 min-h-[1.6rem] font-display text-base font-black text-gold-light sm:mt-6 sm:min-h-[2.2rem] sm:text-2xl md:text-3xl">
          {ui[locale].typingPrefix}{' '}
          <TypeText words={ui[locale].typing} className="hl" />
        </p>
        <p className="hero-rise mt-3 max-w-md text-[13px] font-bold leading-6 sm:mt-5 sm:text-lg sm:font-black sm:leading-8 text-lilac/95 [text-shadow:0_2px_20px_rgba(0,0,0,.9)]">
          {t.sub}
        </p>
        <div className="hero-rise mt-5 flex flex-wrap gap-2 sm:mt-9 sm:gap-4">
          <a
            href="#home-collection"
            className="rounded-full bg-gold px-4 py-2 text-xs sm:px-9 sm:py-3.5 sm:text-sm font-black text-ink transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(242,217,138,.55)]"
          >
            {t.cta}
          </a>
          <Link
            href={`/${locale}/sell`}
            className="rounded-full border-2 border-gold px-4 py-2 text-xs sm:px-9 sm:py-3.5 sm:text-sm font-black text-gold-light transition-all hover:bg-gold/15 hover:shadow-[0_0_30px_rgba(212,175,55,.4)]"
          >
            {t.cta2}
          </Link>
        </div>
      </div>

      {/* === VIDEO PANEL === */}
      <div className="hero-video order-1 h-full lg:order-2">
        <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_0_50px_rgba(212,175,55,.25)] lg:min-h-[520px]">
          {videoSrc ? (
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-plum via-violet/60 to-ink text-gold-light">
              <span className="text-3xl font-black">✦</span>
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
  );
}
