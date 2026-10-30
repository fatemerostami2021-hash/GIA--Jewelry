'use client';
import { useEffect, useState } from 'react';
import { socials } from '@/lib/site';

const ICONS = {
  telegram: <path d="M22 2 2 10l7 3 2 8 3-5 5 4z" fill="#fff" />,
  whatsapp: (
    <>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" fill="#fff" />
      <path
        d="M8.5 7.5c-.5 1 .2 3.2 2.2 5.2s4.200 2.700 5.200 2.200l.8-1.300-2-1.200-.9.800c-.8-.3-2-1.500-2.300-2.300l.8-.9-1.200-2z"
        fill="currentColor"
      />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
      <circle cx="17.500" cy="6.500" r="1.200" fill="#fff" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" />
      <path
        d="M7 10h2v7H7zM8 6.800a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400zM11 10h2v1c.4-.7 1.200-1.200 2.300-1.200 2 0 2.700 1.200 2.700 3.200V17h-2v-3.500c0-1-.3-1.600-1.200-1.600s-1.800.6-1.800 1.700V17h-2z"
        fill="currentColor"
      />
    </>
  ),
};

/**
 * FloatingSocial — refined: a single WhatsApp button (the primary contact)
 * that expands on hover into a small vertical stack of all social channels.
 * No looping animation, no ping — quiet and professional.
 */
export default function FloatingSocial() {
  const [open, setOpen] = useState(false);
  const primary = socials.find((s) => s.k === 'whatsapp') || socials[0];
  const others = socials.filter((s) => s.k !== primary.k);

  return (
    <div
      className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-2.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {others.map((s) => (
        <a
          key={s.k}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={s.name}
          className={`grid h-11 w-11 place-items-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,.4)] transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
          style={{ background: s.bg, color: s.bg.startsWith('#') ? s.bg : '#dc2743' }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            {ICONS[s.k]}
          </svg>
        </a>
      ))}
      <a
        href={primary.url}
        target="_blank"
        rel="noreferrer"
        aria-label={primary.name}
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-14 w-14 place-items-center rounded-full shadow-[0_6px_30px_rgba(37,211,102,.55)] transition-transform duration-300 hover:scale-105"
        style={{ background: primary.bg }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
          {ICONS[primary.k]}
        </svg>
        <span className="absolute end-full me-3 hidden whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 text-xs font-black text-lilac backdrop-blur-sm lg:block">
          {open ? (others.length ? 'Channels' : primary.name) : primary.name}
        </span>
      </a>
    </div>
  );
}
