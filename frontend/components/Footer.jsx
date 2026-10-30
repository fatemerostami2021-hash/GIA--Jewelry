import { site } from '@/lib/site';

/**
 * Footer — refined gold-accented dark theme.
 * - Top gold divider
 * - Brand block (GIA + address), contact block, design credit
 * - Bottom bar with copyright and disclaimer
 */
export default function Footer({ t }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-gold/40 bg-ink/90 px-5 py-14 text-lilac/80">
      {/* Faint gold radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,.10), transparent 60%)' }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p
            dir="ltr"
            className="font-display text-3xl font-black tracking-[.3em] text-gold-light"
          >
            {t.brand}
          </p>
          <p className="mt-3 text-sm text-lilac/60">
            <span className="me-1.5">✦</span>
            {t.footer.address}
          </p>
        </div>
        {/* Contact */}
        <div className="grid content-start gap-2 text-sm">
          <a href={site.tel} dir="ltr" className="w-fit text-gold-light transition-colors hover:text-lilac">
            <span className="me-1.5">✦</span>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="w-fit transition-colors hover:text-gold-light">
            <span className="me-1.5">✦</span>
            {site.email}
          </a>
          <a href={site.telegram} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-gold-light">
            <span className="me-1.5">✦</span>
            Telegram
          </a>
        </div>
        {/* Design credit */}
        <div className="grid content-start gap-2 text-sm">
          <a
            href={site.designer}
            target="_blank"
            rel="noreferrer"
            className="w-fit text-lilac/60 transition-colors hover:text-gold-light"
          >
            <span className="me-1.5">✦</span>
            {t.footer.design}
          </a>
        </div>
      </div>
      <div className="relative mx-auto mt-10 max-w-7xl">
        <div className="border-t border-gold/20 pt-6 text-xs text-lilac/50">
          <p className="leading-6">
            © {year} {t.brand}. {t.footer.rights}
          </p>
          <p className="mt-2 leading-6">{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
