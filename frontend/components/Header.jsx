'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

const links = ['collection', 'shop', 'auctions', 'private-sales', 'sell', 'finance', 'labs', 'contact'];

export default function Header({ locale, t }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const other = locale === 'fa' ? 'en' : 'fa';
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link href={`/${locale}`}><Logo name={t.brand} /></Link>
        <nav className="hidden gap-5 text-sm font-bold xl:flex">
          {links.map((k) => <Link key={k} href={`/${locale}/${k}`} className="transition hover:text-gold-light">{t.nav[k]}</Link>)}
        </nav>
        <div className="flex items-center gap-4">
          <Link href={path.replace(/^\/(fa|en)/, `/${other}`)} className="rounded-full border border-gold px-3 py-1 text-xs font-black text-gold-light">{other.toUpperCase()}</Link>
          <button className="text-2xl xl:hidden" aria-label="menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-ink px-5 py-5 text-lg font-bold xl:hidden">
          {links.map((k) => <Link key={k} href={`/${locale}/${k}`} onClick={() => setOpen(false)}>{t.nav[k]}</Link>)}
        </nav>
      )}
    </header>
  );
}
