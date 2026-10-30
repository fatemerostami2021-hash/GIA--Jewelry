'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { pageVideos } from '@/lib/site';

// One background video per page (only the current page's file is loaded). Missing file -> purple gradient only.
export default function BackgroundVideo() {
  const key = usePathname().split('/')[2] || 'home';
  const src = pageVideos[key];
  const ref = useRef(null);
  const [badSrc, setBadSrc] = useState('');
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.pause();
  }, [src]);
  return (
    <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#3d1d63,#0a0610_70%)]">
      {src && badSrc !== src && (
        <video key={src} ref={ref} src={src} autoPlay muted loop playsInline preload="auto" onError={() => setBadSrc(src)} className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-plum/30 to-ink/80" />
    </div>
  );
}
