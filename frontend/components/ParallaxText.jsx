'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Text drifts up and fades as its section scrolls away (scrubbed to the normal scroll, no pinning).
export default function ParallaxText({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(ref.current, { y: -90, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: ref.current.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
