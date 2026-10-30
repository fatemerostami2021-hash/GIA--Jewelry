'use client';
import { useState } from 'react';

export default function SafeVideo({ src, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return null;
  return <video src={src} controls muted loop playsInline preload="metadata" onError={() => setBad(true)} className={className} />;
}
