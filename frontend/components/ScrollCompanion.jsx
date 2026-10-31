'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IMG = '/media/images/optimized/ruby-scroll-companion.webp';

/**
 * ScrollCompanion — a small framed window fixed to one side of the page. While the visitor
 * scrolls from the hero to the footer, it travels down the side of the screen and pans across
 * the ruby showcase picture (jewellery spiral first, the model last), with a gold progress ring
 * and a slight 3D tilt. Fast scrolling is smoothed (scrub). Reduced motion: static, bottom corner.
 */
export default function ScrollCompanion({ href, label }) {
  const box = useRef(null);
  const img = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || hidden) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { gsap.set(el, { y: 0 }); return; }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const travel = () => Math.max(0, window.innerHeight - el.offsetHeight - 120 - 8);
      gsap.fromTo(el, { y: 0, opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.2 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      });
      tl.to(el, { y: () => travel(), rotateY: -14, duration: 1 }, 0)
        .fromTo(img.current, { objectPosition: '0% 50%', scale: 1.05 }, { objectPosition: '100% 50%', scale: 1.15, duration: 1 }, 0)
        ;
    });
    return () => ctx.revert();
  }, [hidden]);

  if (hidden) return null;
  return (
    <div
      ref={box}
      className="pointer-events-none fixed start-2 top-[120px] z-40 hidden opacity-0 sm:block md:start-4 [perspective:800px]"
      style={{ opacity: 0 }}
    >
      <div className="group pointer-events-auto relative h-[260px] w-[170px] md:h-[360px] md:w-[240px] lg:h-[400px] lg:w-[270px]">
        <Link href={href} aria-label={label} className="absolute inset-0 block transition-transform duration-300 hover:scale-105">
          <img
            ref={img}
            src={IMG}
            alt=""
            className="h-full w-full object-cover"
            style={{ WebkitMaskImage: 'radial-gradient(ellipse 62% 62% at 50% 50%, #000 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse 62% 62% at 50% 50%, #000 55%, transparent 100%)' }}
            loading="lazy"
          />
        </Link>
        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label="Close"
          className="absolute end-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-ink/70 text-xs font-black text-gold-light opacity-0 transition-opacity hover:bg-gold hover:text-ink group-hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
