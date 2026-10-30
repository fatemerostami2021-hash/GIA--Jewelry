'use client';
import { useState } from 'react';

export default function SafeImg({ src, alt, className }) {
  const [bad, setBad] = useState(false);
  if (bad) return null;
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} />;
}
