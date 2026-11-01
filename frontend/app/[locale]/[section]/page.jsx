import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Blocks from '@/components/Blocks';
import Stagger from '@/components/Stagger';
import InquiryForm from '@/components/InquiryForm';
import PageHero from '@/components/PageHero';
import { dict, sections, locales } from '@/lib/dict';
import { site, labs, media, pageHeroes } from '@/lib/site';
import { extraBlocks } from '@/lib/extra';

export const generateStaticParams = () => locales.flatMap((locale) => sections.map((section) => ({ locale, section })));

export default async function Section({ params }) {
  const { locale, section } = await params;
  if (!sections.includes(section)) notFound();
  const t = dict[locale];
  const s = t.sec[section];
  const blocks = [...(s.blocks || []), ...(extraBlocks[locale][section] || [])];
  const cta = 'rounded-full px-7 py-3 text-sm font-black transition-all';
  return (
    <>
      <PageHero hero={pageHeroes[section]} eyebrow={t.nav[section]} title={s.title} text={s.body} tall={section === 'sell'}>
        {(section === 'sell' || section === 'private-sales' || section === 'auctions') && (
          <a href="#inquiry" className={`${cta} bg-gold text-ink hover:bg-gold-light`}>{t.nav.contact}</a>
        )}
        <a href={`/${locale}/shop`} className={`${cta} border-2 border-gold/60 text-gold-light hover:bg-gold/15`}>{t.nav.shop}</a>
        <a href={`/${locale}/gemstones`} className={`${cta} border border-white/30 text-lilac/90 hover:border-gold`}>{locale === 'fa' ? 'راهنمای سنگ‌ها' : 'Gemstone guide'}</a>
      </PageHero>
      <div className="mx-auto max-w-5xl px-5 pb-8 pt-4">
        {section === 'labs' && (
          <>
            <img src={media.giaHq} alt="Gemological Institute of America" loading="lazy" className="mt-8 aspect-[16/7] w-full rounded-3xl border border-white/15 object-cover" />
            <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
              {labs.map((l) => (
                <div key={l.url} className="glass p-5">
                  <a href={l.url} target="_blank" rel="noreferrer" dir="ltr" className="block font-black text-gold-light">↗ {l.name}</a>
                  <p className="mt-1 text-lilac/75">{l[locale]}</p>
                </div>
              ))}
            </Stagger>
          </>
        )}
        {section === 'contact' && (
          <div className="glass mt-8 grid gap-1 p-6 text-lg font-bold">
            <a href={site.tel} dir="ltr" className="w-fit hover:text-gold-light">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="w-fit hover:text-gold-light">{site.email}</a>
            <a href={site.telegram} target="_blank" rel="noreferrer" className="w-fit hover:text-gold-light">Telegram</a>
            <span className="text-lilac/70">{t.footer.address}</span>
          </div>
        )}
        <Blocks blocks={blocks} />
        {(section === 'contact' || section === 'sell') && (
          <div id="inquiry" className="glass mt-14 scroll-mt-32 p-6 md:p-8">
            <Suspense fallback={null}><InquiryForm t={t.form} type={section} /></Suspense>
          </div>
        )}
      </div>
    </>
  );
}
