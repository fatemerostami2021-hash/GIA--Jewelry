'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import { site } from '@/lib/site';

const links = ['collection', 'shop', 'auctions', 'private-sales', 'sell', 'finance', 'labs', 'contact'];

/**
 * Header — three-row premium layout inspired by high-jewelry editorial sites:
 *   1. Slim top contact bar: email · phone · language switch
 *   2. Main bar: logo + nav links + cart icon
 *   3. (Mobile only) hamburger menu
 *
 * The brand color stays gold-on-dark; the top bar uses an even darker ink so
 * the contact info reads as secondary metadata.
 */
export default function Header({ locale, t }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const other = locale === 'fa' ? 'en' : 'fa';
  const isActive = (k) => path === `/${locale}/${k}` || path.startsWith(`/${locale}/${k}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/90 backdrop-blur-md">
      {/* ===== Row 1 — Top contact bar ===== */}
      <div className="hidden border-b border-gold/20 bg-black/40 text-xs md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-5 text-lilac/70">
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
              dir="ltr"
            >
              <span className="text-gold">✦</span>
              {site.email}
            </a>
            <a
              href={site.tel}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
              dir="ltr"
            >
              <span className="text-gold">☎</span>
              {site.phone}
            </a>
            <span className="flex items-center gap-1.5 text-lilac/50">
              <span className="text-gold">✦</span>
              {t.footer.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold-light"
            >
              Telegram
            </a>
            <span className="text-lilac/30">·</span>
            <Link
              href={path.replace(/^\/(fa|en)/, `/${other}`)}
              className="rounded-full border border-gold/50 px-2.5 py-0.5 font-black text-gold-light transition-all hover:bg-gold/15"
            >
              {other.toUpperCase()}
            </Link>
          </div>
        </div>
      </div>

      {/* Slim gold accent strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      {/* ===== Row 2 — Main nav bar ===== */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Logo name={t.brand} />
        </Link>
        <nav className="hidden gap-6 text-sm font-bold xl:flex">
          {links.map((k) => (
            <Link
              key={k}
              href={`/${locale}/${k}`}
              className={`relative transition-colors hover:text-gold-light ${
                isActive(k) ? 'text-gold-light' : 'text-lilac/85'
              }`}
            >
              {t.nav[k]}
              {isActive(k) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold-light rtl:left-auto rtl:right-0" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Cart icon (decorative, links to collection for now) */}
          <Link
            href={`/${locale}/collection`}
            aria-label="cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold-light transition-all hover:bg-gold/15"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
          <Link
            href={path.replace(/^\/(fa|en)/, `/${other}`)}
            className="rounded-full border-2 border-gold/70 px-3.5 py-1 text-xs font-black text-gold-light transition-all hover:bg-gold/15 md:hidden"
          >
            {other.toUpperCase()}
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold-light xl:hidden"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            <span className="text-lg leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-gold/20 bg-ink/95 px-5 py-6 text-base font-bold xl:hidden">
          {links.map((k) => (
            <Link
              key={k}
              href={`/${locale}/${k}`}
              onClick={() => setOpen(false)}
              className={isActive(k) ? 'text-gold-light' : 'text-lilac/85'}
            >
              {t.nav[k]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
