import Link from 'next/link';
import { notFound } from 'next/navigation';
import DetailTabs from '@/components/DetailTabs';
import ProductGallery from '@/components/ProductGallery';
import SafeVideo from '@/components/SafeVideo';
import { dict } from '@/lib/dict';
import { findItem } from '@/lib/collection';

export default async function ProductPage({ params }) {
  const { locale, slug } = await params;
  const p = findItem(slug);
  if (!p) notFound();
  const t = dict[locale], pt = t.product, c = p[locale];
  const specs = (rows) => (
    <dl>
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-gold/15 py-3 last:border-0 rtl:grid-cols-[1fr_8rem]">
          <dt className="text-lilac/60">{k}</dt><dd className="font-bold">{v}</dd>
        </div>
      ))}
    </dl>
  );
  const tabs = [
    { id: 'overview', label: pt.tabs.overview, content: (
      <div>
        <p className="text-lg font-bold leading-8">{c.short}</p>
        <h3 className="mt-5 font-black text-gold-light">{pt.highlights}</h3>
        <ul className="mt-3 grid gap-2">{c.highlights.map((h) => <li key={h}>✦ {h}</li>)}</ul>
      </div>) },
    { id: 'summary', label: pt.tabs.summary, content: (
      <div>
        <p className="leading-8 text-lilac/90">{c.summary}</p>
        <h3 className="mt-5 font-black text-gold-light">{pt.facts}</h3>
        {specs(c.specs.slice(0, 4))}
      </div>) },
    { id: 'details', label: pt.tabs.details, content: (
      <div>
        <h3 className="font-black text-gold-light">{pt.about}</h3>
        <p className="mt-3 leading-8 text-lilac/90">{c.description}</p>
        <h3 className="mt-6 font-black text-gold-light">{pt.specs}</h3>
        {specs(c.specs)}
      </div>) },
  ];
  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 pb-20">
      <Link href={`/${locale}/collection`} className="text-sm font-black text-gold-light">← {pt.back}</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={p.images} video={p.video} alt={c.name} />
        <div>
          <h1 className="font-display text-4xl font-black md:text-5xl">{c.name}</h1>
          <div className="glass mt-6 border border-gold/30 p-6">
            <p className="text-sm text-lilac/60">{pt.price}</p>
            <p className="font-display text-3xl font-black text-gold-light">{p.price ? p.price : pt.onRequest}</p>
            <p className="mt-3 text-sm text-lilac/60">{pt.availability}: <span className="font-bold text-lilac">{pt.available}</span></p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact?gem=${p.slug}`} className="rounded-full bg-gold px-8 py-3 font-black text-ink transition hover:bg-gold-light">{pt.buy}</Link>
              <Link href={`/${locale}/contact?gem=${p.slug}`} className="rounded-full border border-gold px-6 py-3 font-black text-gold-light transition hover:bg-gold/20">{pt.ask}</Link>
            </div>
            <ul className="mt-5 grid gap-1 text-sm text-lilac/70">{pt.assure.map((a) => <li key={a}>✓ {a}</li>)}</ul>
          </div>
          <DetailTabs tabs={tabs} />
        </div>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-3xl font-black text-gold-light">{pt.media}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {p.images.map((src, i) => <img key={i} src={src} alt={`${c.name} ${i + 1}`} loading="lazy" className="glass w-full border border-gold/20 bg-ink/50 object-contain" />)}
          <SafeVideo src={p.video} className="glass w-full border border-gold/20 bg-ink/50" />
        </div>
      </section>
    </div>
  );
}
