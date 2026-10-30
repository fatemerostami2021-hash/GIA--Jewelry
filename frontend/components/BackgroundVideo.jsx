'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { pageVideos } from '@/lib/site';

// One background video per page (only the current page's file is loaded).
// The HOME page never shows a background video — its hero has its own
// framed video on the right side of the text. The home background is just
// the dark-plum gradient with a faint gold radial accent.
const NO_VIDEO = new Set(['home', '', undefined]);

export default function BackgroundVideo() {
  const path = usePathname();
  const key = path.split('/')[2] || 'home';
  const src = NO_VIDEO.has(key) ? null : pageVideos[key];
  const ref = useRef(null);
  const [badSrc, setBadSrc] = useState('');
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.pause();
  }, [src]);

  return (
    <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#2a1530_0%,#0a0610_70%)]">
      {src && badSrc !== src && (
        <video
          key={src}
          ref={ref}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setBadSrc(src)}
          className="h-full w-full object-cover opacity-55"
        />
      )}
      {/* A darkening overlay so the text remains readable above the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-plum/40 to-ink/90" />
      {/* Subtle gold radial accent to keep the brand warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(212,175,55,.07), transparent 55%)',
        }}
      />
    </div>
  );
}
