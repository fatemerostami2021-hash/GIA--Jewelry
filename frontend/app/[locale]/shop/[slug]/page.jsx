import Link from 'next/link';
import { notFound } from 'next/navigation';
import DetailTabs from '@/components/DetailTabs';
import StoneVisual from '@/components/StoneVisual';
import { getGem, money, num } from '@/lib/api';
import { dict } from '@/lib/dict';

export const dynamic = 'force-dynamic';

/**
 * Gem detail page (`/shop/[slug]`). Same structure as the Collection detail
 * page: gold back-link, gold-framed visual on the left, name + price box +
 * DetailTabs (Overview / Summary / Full details) on the right.
 *
 * The gem record from `lib/gems.json` has a different shape than the
 * collection item, so we build the same `c.{short,highlights,summary,
 * description,specs}` shape here from the gem fields before rendering.
 */
export default async function GemPage({ params }) {
  const { locale, slug } = await params;
  const t = dict[locale];
  const pt = t.product;
  const g = await getGem(slug);
  if (!g) notFound();
  const f = (k) => g[`${k}_${locale}`];

  // Build the same shape used by the Collection detail page so both pages
  // render with identical layout and identical field ordering.
  const c = {
    name: f('name'),
    short: `${f('stone_type')} · ${f('color')} · ${num(g.carat, locale)}${locale === 'fa' ? ' قیراط' : ' ct'}`,
    highlights: [
      `${t.gem.spec.stone_type}: ${f('stone_type')}`,
      `${t.gem.spec.color}: ${f('color')}`,
      `${t.gem.spec.carat}: ${num(g.carat, locale)}`,
      `${t.gem.spec.cut}: ${f('cut')}`,
      g.is_natural ? t.gem.natural : t.gem.labgrown,
    ],
    summary: f('description'),
    description: f('description'),
    specs: [
      [pt.specs === 'Specifications' ? 'Stone type' : 'نوع سنگ', f('stone_type')],
      [pt.specs === 'Specifications' ? 'Colour' : 'رنگ', f('color')],
      [pt.specs === 'Specifications' ? 'Carat weight' : 'وزن (قیراط)', num(g.carat, locale)],
      [pt.specs === 'Specifications' ? 'Clarity' : 'شفافیت', f('clarity')],
      [pt.specs === 'Specifications' ? 'Cut' : 'نوع تراش', f('cut')],
      [pt.specs === 'Specifications' ? 'Origin' : 'منشأ', f('origin')],
      [pt.specs === 'Specifications' ? 'Where it was made' : 'محل ساخت و تراش', f('made')],
      [pt.specs === 'Specifications' ? 'Natural / laboratory-grown' : 'طبیعی یا آزمایشگاهی', g.is_natural ? t.gem.natural : t.gem.labgrown],
      [pt.specs === 'Specifications' ? 'Treatment' : 'درمان', f('treatment')],
      [pt.specs === 'Specifications' ? 'Certificate no.' : 'شمارهٔ گواهی', g.cert_no || t.gem.onReport],
      [pt.specs === 'Specifications' ? 'Issuing laboratory' : 'آزمایشگاه صادرکننده', g.lab],
      [pt.specs === 'Specifications' ? 'Price' : 'قیمت', `${money(g.price_usd, locale)} — ${f('price_note')}`],
      [pt.specs === 'Specifications' ? 'Availability' : 'موجودی', f('stock')],
    ],
  };

  const specs = (rows) => (
    <dl>
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-gold/15 py-3 last:border-0 rtl:grid-cols-[1fr_8.5rem]">
          <dt className="text-lilac/60">{k}</dt>
          <dd className="font-bold">{v}</dd>
        </div>
      ))}
    </dl>
  );

  const tabs = [
    {
      id: 'overview', label: pt.tabs.overview, content: (
        <div>
          <p className="text-lg font-bold leading-8">{c.short}</p>
          <h3 className="mt-5 font-black text-gold-light">{pt.highlights}</h3>
          <ul className="mt-3 grid gap-2">{c.highlights.map((h) => <li key={h}>✦ {h}</li>)}</ul>
        </div>
      ),
    },
    {
      id: 'summary', label: pt.tabs.summary, content: (
        <div>
          <p className="leading-8 text-lilac/90">{c.summary}</p>
          <h3 className="mt-5 font-black text-gold-light">{pt.facts}</h3>
          {specs(c.specs.slice(0, 6))}
        </div>
      ),
    },
    {
      id: 'details', label: pt.tabs.details, content: (
        <div>
          <h3 className="font-black text-gold-light">{pt.about}</h3>
          <p className="mt-3 leading-8 text-lilac/90">{c.description}</p>
          <h3 className="mt-6 font-black text-gold-light">{pt.specs}</h3>
          {specs(c.specs)}

          {g.links?.length > 0 && (
            <>
              <h3 className="mt-8 font-black text-gold-light">{t.gem.links}</h3>
              <ul className="mt-3 grid gap-2">
                {g.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-gold-light underline-offset-4 hover:underline">
                      ↗ {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pt-28 pb-20">
      <Link href={`/${locale}/shop`} className="text-sm font-black text-gold-light">
        ← {t.gem.back}
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 self-start">
          <StoneVisual gem={g} locale={locale} className="aspect-square w-full rounded-2xl border-2 border-gold/30" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-black md:text-5xl">{c.name}</h1>
          <div className="glass mt-6 p-6">
            <p className="text-sm text-lilac/60">{pt.price}</p>
            <p className="font-display text-3xl font-black text-gold-light">
              {g.price_usd ? money(g.price_usd, locale) : pt.onRequest}
            </p>
            <p className="mt-3 text-sm text-lilac/60">
              {pt.availability}: <span className="font-bold text-lilac">{pt.available}</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact?gem=${g.slug}`}
                className="rounded-full bg-gold px-8 py-3 font-black text-ink transition hover:bg-gold-light"
              >
                {t.gem.inquire}
              </Link>
              <Link
                href={`/${locale}/contact?gem=${g.slug}`}
                className="rounded-full border border-gold px-6 py-3 font-black text-gold-light transition hover:bg-gold/20"
              >
                {pt.ask}
              </Link>
            </div>
            <ul className="mt-5 grid gap-1 text-sm text-lilac/70">
              {pt.assure.map((a) => <li key={a}>✓ {a}</li>)}
            </ul>
          </div>
          <DetailTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
