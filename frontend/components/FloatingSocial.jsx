'use client';
import { useEffect, useState } from 'react';
import { socials } from '@/lib/site';

const icon = {
  telegram: <path d="M22 2 2 10l7 3 2 8 3-5 5 4z" fill="#fff" />,
  whatsapp: (<><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" fill="#fff" /><path d="M8.5 7.5c-.5 1 .2 3.2 2.2 5.2s4.200 2.700 5.200 2.200l.8-1.300-2-1.200-.9.800c-.8-.3-2-1.500-2.300-2.300l.8-.9-1.200-2z" fill="currentColor" /></>),
  instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" /><circle cx="17.500" cy="6.500" r="1.200" fill="#fff" stroke="none" /></>),
  linkedin: (<><rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" /><path d="M7 10h2v7H7zM8 6.800a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400zM11 10h2v1c.4-.7 1.200-1.200 2.300-1.200 2 0 2.700 1.200 2.700 3.200V17h-2v-3.500c0-1-.3-1.600-1.200-1.600s-1.800.6-1.800 1.700V17h-2z" fill="currentColor" /></>),
};

// One round button that keeps cycling Telegram -> WhatsApp -> Instagram -> LinkedIn; tap opens the one shown.
export default function FloatingSocial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % socials.length), 2200);
    return () => clearInterval(id);
  }, [paused]);
  const s = socials[i];
  return (
    <a
      href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      className="fixed bottom-5 end-5 z-50 grid h-16 w-16 place-items-center rounded-full shadow-[0_0_30px_rgba(168,85,247,.7)] transition-[background] duration-500"
      style={{ background: s.bg, color: s.bg.startsWith('#') ? s.bg : '#dc2743' }}
    >
      <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ background: s.bg }} />
      <span className="absolute end-full me-3 hidden whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 text-xs font-black text-lilac sm:block">{s.name}</span>
      <svg key={i} viewBox="0 0 24 24" className="flip relative h-8 w-8" fill="none">{icon[s.k]}</svg>
    </a>
  );
}
