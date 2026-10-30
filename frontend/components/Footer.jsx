import { site } from '@/lib/site';

export default function Footer({ t }) {
  return (
    <footer className="metal mt-24 border-t border-gold/30 px-5 py-12 text-lilac/80">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p dir="ltr" className="font-display text-3xl font-black tracking-[.3em] text-gold-light">{t.brand}</p>
          <p className="mt-3 text-sm text-lilac/60">{t.footer.address}</p>
        </div>
        <div className="grid content-start gap-1 text-sm">
          <a href={site.tel} dir="ltr" className="w-fit hover:text-gold-light">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="w-fit hover:text-gold-light">{site.email}</a>
          <a href={site.telegram} target="_blank" rel="noreferrer" className="w-fit hover:text-gold-light">Telegram</a>
        </div>
        <a href={site.designer} target="_blank" rel="noreferrer" className="text-sm text-lilac/60 hover:text-gold-light">{t.footer.design}</a>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-lilac/50">© {new Date().getFullYear()} {t.brand}. {t.footer.rights} {t.footer.note}</p>
    </footer>
  );
}
