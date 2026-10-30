import { products } from './products';
import { imageManifest } from './imageManifest';
import { labels } from './collectionLabels';

// Photos that are not collection pieces.
const SKIP = new Set(['gia-headquarters', 'ruby-showroom-render', 'ruby-showcase-board']);
const faDigits = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

function stoneTexts(id, n) {
  const label = labels[id];
  const num = String(n).padStart(2, '0');
  return {
    en: {
      name: label?.en || `Gemstone ${num}`,
      short: 'Gemstone photographed for the collection; details to be confirmed.',
      highlights: ['Photographed for the collection', 'Full specifications on request', 'Laboratory report to be attached'],
      summary: 'A gemstone from the collection. Its identity, weight, colour grade, origin and treatment will be listed here once the laboratory report is attached.',
      description: 'Photographs and details for this stone are being prepared. Ask us for the laboratory report and current availability.',
      specs: [['Piece', 'Gemstone'], ['Stone type', 'To be confirmed by laboratory report'], ['Weight', 'To be confirmed'], ['Colour and clarity', 'To be confirmed'], ['Origin', 'To be confirmed'], ['Treatment', 'To be confirmed'], ['Documentation', 'To be listed once the laboratory report is attached']],
    },
    fa: {
      name: label?.fa || `سنگ شمارهٔ ${faDigits(n)}`,
      short: 'سنگی که برای کالکشن عکاسی شده؛ جزئیات باید تأیید شود.',
      highlights: ['عکاسی‌شده برای کالکشن', 'مشخصات کامل با درخواست', 'گزارش آزمایشگاه پیوست می‌شود'],
      summary: 'سنگی از کالکشن. نوع، وزن، درجهٔ رنگ، منشأ و درمان آن پس از پیوست گزارش آزمایشگاه اینجا درج می‌شود.',
      description: 'عکس‌ها و جزئیات این سنگ در حال آماده‌سازی است. گزارش آزمایشگاه و موجودی فعلی را از ما بپرسید.',
      specs: [['نوع قطعه', 'سنگ'], ['نوع سنگ', 'باید با گزارش آزمایشگاه تأیید شود'], ['وزن', 'باید تأیید شود'], ['رنگ و شفافیت', 'باید تأیید شود'], ['منشأ', 'باید تأیید شود'], ['درمان', 'باید تأیید شود'], ['مستندات', 'پس از پیوست گزارش آزمایشگاه درج می‌شود']],
    },
  };
}

// Curated pieces (lib/products.js) + every other photo found by `npm run images`.
export function getCollection() {
  const used = new Set(products.flatMap((p) => p.images));
  const stones = imageManifest
    .filter((i) => !SKIP.has(i.id) && !used.has(i.url))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((i, k) => ({
      slug: i.id, kind: 'stone', cover: { full: i.url, thumb: i.thumb }, images: [i.url], video: null, price: null,
      ...stoneTexts(i.id, Number(i.id.match(/^gemstone-(\d+)$/)?.[1]) || k + 1),
    }));
  return [...products.map((p) => ({ ...p, kind: 'jewellery' })), ...stones];
}

export const findItem = (slug) => getCollection().find((x) => x.slug === slug);
