'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import MegaMenu from './MegaMenu';
import TypeText from './TypeText';
import GemIcon from './GemIcon';
import { site } from '@/lib/site';
import { stones } from '@/lib/stones';
import { ui } from '@/lib/ui';

// main nav; `gemstones` opens the mega menu, `more` opens a small dropdown
const primary = ['collection', 'gemstones', 'shop', 'auctions', 'sell', 'contact'];
const secondary = ['private-sales', 'finance', 'labs'];

/**
 * Header — phone + social icons on the slim top bar (no e-mail, no street address),
 * a sparkling logo, nav items that bob up and down on hover, and a mega menu for gemstones.
 */
export default function Header({ locale, t }) {
  const path = usePathname();
  const u = ui[locale];
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null); // 'gemstones' | 'more' | null
  const timer = useRef(null);
  const other = locale === 'fa' ? 'en' : 'fa';
  const label = (k) => (k === 'gemstones' ? u.nav.gemstones : t.nav[k]);
  const href = (k) => `/${locale}/${k}`;
  const isActive = (k) => path === href(k) || path.startsWith(`${href(k)}/`);

  const show = (k) => { clearTimeout(timer.current); setMenu(k); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMenu(null), 160); };
  useEffect(() => { setMenu(null); setOpen(false); }, [path]);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; return () => { document.documentElement.style.overflow = ''; }; }, [open]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenu(null);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer.current); };
  }, []);

  const navLink = (k) => (
    <Link
      key={k}
      href={href(k)}
      className={`nav-bob relative px-0.5 py-1 transition-colors hover:text-gold-light ${isActive(k) ? 'text-gold-light' : 'text-lilac/85'}`}
    >
      <span className="nav-bob-text inline-block">{label(k)}</span>
      {isActive(k) && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gold-light rtl:left-auto rtl:right-0" />}
    </Link>
  );

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/90 backdrop-blur-md" onMouseLeave={hide}>
      {/* ===== Row 1 — phone · socials · language ===== */}
      <div className="hidden border-b border-gold/20 bg-black/40 text-xs md:block">
        <div dir="ltr" className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-5 text-lilac/80">
          <a href={site.tel} dir="ltr" className="phone-link flex items-center gap-2 font-bold text-gold-light transition-colors hover:text-white" aria-label={u.top.call}>
            <svg viewBox="0 0 24 24" className="phone-ring h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {site.phone}
          </a>
          <div className="flex items-center gap-4">
            <SocialIcons />
            <Link
              href={path.replace(/^\/(fa|en)/, `/${other}`)}
              className="rounded-full border border-gold/50 px-2.5 py-0.5 font-black text-gold-light transition-all hover:bg-gold/15"
            >
              {other.toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      {/* ===== Row 2 — logo + nav ===== */}
      <div dir="ltr" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-5">
        <Link href={`/${locale}`} className="flex items-center" aria-label="GIA Jewelry">
          <Logo name="GIA" sub="Jewelry" />
        </Link>

        <nav dir={locale === 'fa' ? 'rtl' : 'ltr'} className="hidden items-center gap-6 text-sm font-bold xl:flex" aria-label="Main">
          {primary.map((k) =>
            k === 'gemstones' ? (
              <div key={k} onMouseEnter={() => show('gemstones')} className="relative">
                <Link
                  href={href(k)}
                  aria-haspopup="true"
                  aria-expanded={menu === 'gemstones'}
                  onFocus={() => show('gemstones')}
                  className={`nav-bob relative flex items-center gap-1 px-0.5 py-1 transition-colors hover:text-gold-light ${isActive(k) || menu === 'gemstones' ? 'text-gold-light' : 'text-lilac/85'}`}
                >
                  <GemIcon hex="#c8102e" hex2="#ff8a9a" size={16} />
                  <span className="nav-bob-text inline-block">{label(k)}</span>
                  <span className={`text-[10px] transition-transform ${menu === 'gemstones' ? 'rotate-180' : ''}`}>▾</span>
                </Link>
              </div>
            ) : (
              <div key={k} onMouseEnter={() => setMenu(null)}>{navLink(k)}</div>
            )
          )}
          <div className="relative" onMouseEnter={() => show('more')}>
            <button type="button" aria-haspopup="true" aria-expanded={menu === 'more'} onClick={() => setMenu(menu === 'more' ? null : 'more')} className="nav-bob flex items-center gap-1 py-1 text-lilac/85 transition-colors hover:text-gold-light">
              <span className="nav-bob-text inline-block">{u.nav.more}</span>
              <span className={`text-[10px] transition-transform ${menu === 'more' ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {menu === 'more' && (
              <div className="mega-panel absolute end-0 top-full mt-2 grid min-w-48 gap-1 rounded-2xl border border-gold/30 bg-ink/97 p-2 shadow-2xl backdrop-blur-xl">
                {secondary.map((k) => (
                  <Link key={k} href={href(k)} className="rounded-xl px-3 py-2 text-lilac/85 transition-colors hover:bg-gold/10 hover:text-gold-light">{label(k)}</Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={`/${locale}/collection`} aria-label="collection" className="hidden h-9 w-9 place-items-center sm:grid rounded-full border border-gold/40 text-gold-light transition-all hover:bg-gold/15">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.680 13.390a2 2 0 0 0 2 1.610h9.720a2 2 0 0 0 2-1.610L23 6H6" />
            </svg>
          </Link>
          <Link href={path.replace(/^\/(fa|en)/, `/${other}`)} className="rounded-full border-2 border-gold/70 px-3.5 py-1 text-xs font-black text-gold-light transition-all hover:bg-gold/15 md:hidden">
            {other.toUpperCase()}
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold-light xl:hidden" aria-label="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="text-lg leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menu === 'gemstones' && (
        <div onMouseEnter={() => show('gemstones')} className="hidden xl:block">
          <MegaMenu locale={locale} onClose={() => setMenu(null)} />
        </div>
      )}

    </header>
      {/* ===== mobile menu: opens full, never scrolls, closes on any tap outside the links ===== */}
      {open && (
        <nav
          onClick={(e) => { if (e.target === e.currentTarget || e.target.dataset.close) setOpen(false); }}
          className="fixed inset-x-0 bottom-0 top-[70px] z-40 flex flex-col justify-center overflow-hidden bg-ink/[.97] px-7 md:top-[112px] xl:hidden"
          aria-label="Menu"
        >
          <div data-close="1" className="pointer-events-none absolute -top-10 end-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <ul className="relative flex flex-col" data-close="1">
            {[...primary, ...secondary].map((k, i) => (
              <li key={k} data-close="1">
                <Link href={href(k)} onClick={() => setOpen(false)} className={`menu-outline inline-block ${isActive(k) ? 'is-active' : ''}`}>
                  <TypeText text={label(k)} once speed={32} delay={i * 120} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative mt-[2.2vh] flex flex-wrap items-center gap-3 border-t border-gold/25 pt-[2.2vh]" data-close="1">
            <a href={site.tel} dir="ltr" className="text-lg font-black text-gold-light">{site.phone}</a>
            <SocialIcons size="h-9 w-9" />
          </div>
        </nav>
      )}
    </>
  );
}
