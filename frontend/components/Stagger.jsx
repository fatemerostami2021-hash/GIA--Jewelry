'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Children rise in one after another when the block scrolls into view (cards, lists, headings).
export default function Stagger({ children, className = '', y = 50, stagger = 0.12 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, { opacity: 0, y, rotateX: -10, transformPerspective: 800, duration: 0.8, ease: 'power3.out', stagger, scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, [y, stagger]);
  return <div ref={ref} className={className}>{children}</div>;
}
