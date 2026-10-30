import { notFound } from 'next/navigation';
import Blocks from '@/components/Blocks';
import Stagger from '@/components/Stagger';
import InquiryForm from '@/components/InquiryForm';
import { dict, sections } from '@/lib/dict';
import { site, labs, media } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function Section({ params, searchParams }) {
  const { locale, section } = await params;
  const { gem } = await searchParams;
  if (!sections.includes(section)) notFound();
  const t = dict[locale];
  const s = t.sec[section];
  return (
    <div className="mx-auto max-w-5xl px-5 pb-8 pt-28">
      <Stagger y={30} stagger={0.15}>
        <h1 className="font-display text-5xl font-black md:text-7xl"><span className="hl">{s.title}</span></h1>
        <p className="mt-6 max-w-3xl text-xl font-bold leading-9 text-lilac/85">{s.body}</p>
      </Stagger>
      {section === 'labs' && (
        <>
          <img src={media.giaHq} alt="Gemological Institute of America" className="mt-8 aspect-[16/7] w-full rounded-3xl border border-white/15 object-cover" />
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
      <Blocks blocks={s.blocks} />
      {(section === 'contact' || section === 'sell') && (
        <div className="glass mt-14 p-6 md:p-8"><InquiryForm t={t.form} type={section} gem={gem} /></div>
      )}
    </div>
  );
}
