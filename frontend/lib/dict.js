export const locales = ['fa', 'en'];
export const sections = ['auctions', 'private-sales', 'sell', 'finance', 'labs', 'contact'];

// Page blocks: kind = steps | cards | faq; items = [title, text]
export const dict = {
  en: {
    meta: { title: 'GIA — Fine Gemstones & Jewellery', desc: 'Certified gemstones and signature jewellery, curated in Shiraz.' },
    brand: 'GIA',
    nav: { collection: 'Collection', shop: 'Gemstones', auctions: 'Auctions', 'private-sales': 'Private Sales', sell: 'Sell', finance: 'Finance', labs: 'Labs & Sources', contact: 'Contact' },
    hero: { eyebrow: 'Fine gemstones & jewellery · Shiraz', text: 'Every gemstone holds a fire older than empires', hl: ['fire', 'older'], sub: 'Certified stones and signature jewellery, documented by independent laboratories and the world’s leading auction houses.', cta: 'Explore the shop', cta2: 'Sell with us' },
    collection: { title: 'Collection', sub: 'Signature pieces, shaped by hand and set with exceptional stones.', view: 'View details', filters: { all: 'All', jewellery: 'Jewellery', stone: 'Gemstones' }, all: 'View the full collection', intro: 'Every piece, with its details, photos and video.' },
    product: { tabs: { overview: 'Overview', summary: 'Summary', details: 'Full details' }, price: 'Price', onRequest: 'Price on request', availability: 'Availability', available: 'Available to order', buy: 'Request to buy', ask: 'Ask a question', highlights: 'Highlights', facts: 'Key facts', about: 'About this piece', specs: 'Specifications', media: 'Photos & video', back: 'Back to collection', assure: ['Insured delivery', 'Every detail confirmed in writing before purchase'] },
    features: { title: 'Why choose us', items: [['Documented origin', 'Every stone lists its mine, treatment and laboratory.'], ['Laboratory reports', 'Independent reports from GIA, SSEF and Gübelin.'], ['Private & confidential', 'Discreet sales and a personal advisor.']] },
    trust: { title: 'Verified, not just described', body: 'Every stone lists its laboratory, origin and treatment, with links to the original sources so you can check each claim yourself.', cta: 'Labs & sources' },
    cta: { title: 'Buy, sell or borrow against fine stones' },
    shop: { title: 'Gemstones', intro: 'Four landmark stones, each documented by laboratories and auction houses.', all: 'All', empty: 'No stones found.', categories: { ruby: 'Ruby', emerald: 'Emerald', sapphire: 'Sapphire', diamond: 'Diamond' } },
    gem: { spec: { stone_type: 'Stone type', color: 'Colour', carat: 'Carat weight', clarity: 'Clarity', cut: 'Cut', origin: 'Origin', made: 'Where it was made', natural: 'Natural / laboratory-grown', treatment: 'Treatment', cert_no: 'Certificate no.', lab: 'Issuing laboratory', price: 'Price', stock: 'Availability' }, natural: 'Natural', labgrown: 'Laboratory-grown', onReport: 'Printed on the physical report — request a copy', links: 'Verified sources', carat: 'Carat', origin: 'Origin', price: 'Price', inquire: 'Inquire about this stone', back: 'Back to gemstones' },
    form: { name: 'Full name', email: 'Email', phone: 'Phone', message: 'Message', send: 'Send', sending: 'Sending…', done: 'Thank you — we will be in touch.', error: 'Something went wrong. Please try again.' },
    sec: {
      auctions: { title: 'Auctions', body: 'Live and online sales of rare stones and signature jewellery, each lot with documented provenance.', blocks: [
        { h: 'How an auction works', kind: 'steps', items: [['Browse the catalogue', 'Review each lot, its condition notes and laboratory reports.'], ['Register to bid', 'Verify your identity and agree your bidding limit.'], ['Bid live or absentee', 'Join the sale online or leave a written bid in advance.']] },
        { h: 'Buyer terms', kind: 'cards', items: [["Buyer's premium", 'Stated in the catalogue before the sale opens.'], ['Payment and insurance', 'Arranged before the lot is released to you.'], ['Insured delivery', 'Shipped fully insured, with signature on receipt.']] }] },
      'private-sales': { title: 'Private Sales', body: 'Discreet, one-to-one acquisition of exceptional pieces, away from the saleroom.', blocks: [
        { h: 'Why buy privately', kind: 'cards', items: [['Discretion', 'Offers are handled one-to-one and kept confidential.'], ['A personal advisor', 'A specialist guides your selection from first call to delivery.'], ['Documented provenance', 'Every piece arrives with its laboratory report and history.']] },
        { h: 'How it works', kind: 'steps', items: [['Tell us what you seek', 'Share the stone, budget and timeline.'], ['We source and present', 'We bring you matching pieces with full documentation.'], ['Agree and deliver', 'Terms are confirmed in writing before payment.']] }] },
      sell: { title: 'Sell', body: 'Consign your gemstones or jewellery. Send details and photos and we will respond with a valuation.', blocks: [
        { h: 'The process', kind: 'steps', items: [['Send details and photos', 'Tell us everything you know about the stone or piece.'], ['Appraisal and authentication', 'Our specialists examine the piece and confirm its authenticity.'], ['Placement in the right sale', 'We offer it in the market and moment that suit it best.']] },
        { h: 'What we accept', kind: 'cards', items: [['Coloured gemstones', 'Ruby, sapphire, emerald and rarer species.'], ['Diamonds', 'Natural and laboratory-grown, with or without reports.'], ['Signed jewellery', 'Pieces by recognised houses and makers.']] }] },
      finance: { title: 'Finance', body: 'Flexible ways to buy, or to borrow against fine stones.', blocks: [
        { h: 'Options', kind: 'cards', items: [['Instalment plans', 'Spread the cost of a purchase over an agreed period.'], ['Loans secured by stones', 'Borrow against a stone you own, based on independent valuation.'], ['Independent valuation', 'An impartial value for insurance, sale or lending.']] },
        { h: 'Questions', kind: 'faq', items: [['Are the terms fixed?', 'No. Every arrangement is quoted individually and confirmed in writing before you commit.'], ['Do I need a laboratory report?', 'A report helps valuation. If a stone has none, we can arrange testing.']] }] },
      labs: { title: 'Labs & Sources', body: 'Every stone is documented by independent gemmological laboratories and leading auction houses. Verify each claim at the source.', blocks: [
        { h: 'The 4Cs, as GIA defines them', kind: 'cards', items: [['Colour', 'Hue, tone and saturation; for diamonds, the absence of colour.'], ['Clarity', 'How free the stone is of internal and surface features.'], ['Cut', 'How well the facets shape the stone’s brilliance and fire.'], ['Carat weight', 'The stone’s weight; one carat is 0.2 grams.']] },
        { h: 'How to verify a report', kind: 'steps', items: [['Find the report number', 'It is printed on the report and, on many diamonds, laser-inscribed on the girdle.'], ['Check it online', 'Enter it in the laboratory’s report-check tool.'], ['Compare the details', 'Weight, colour, clarity and origin must match the stone.']] }] },
      contact: { title: 'Contact', body: 'Visit us on Zargari Street, Shiraz, or send a message.', blocks: [
        { h: 'After your message', kind: 'steps', items: [['We reply', 'Your message is reviewed and we get back to you.'], ['Viewing or appraisal', 'We agree a time to see the stone or piece together.'], ['Guidance to the result', 'We stay with you through the purchase or sale.']] }] },
    },
    footer: { rights: 'All rights reserved.', address: 'Zargari Street, Shiraz', design: 'Website design', note: 'Independent retailer. Not affiliated with the Gemological Institute of America.' },
  },
  fa: {
    meta: { title: 'GIA — سنگ‌های قیمتی و جواهرات', desc: 'سنگ‌های گواهی‌دار و جواهرات خاص، گزینش‌شده در شیراز.' },
    brand: 'GIA',
    nav: { collection: 'کالکشن', shop: 'سنگ‌های قیمتی', auctions: 'مزایده‌ها', 'private-sales': 'فروش خصوصی', sell: 'فروش جواهر', finance: 'تأمین مالی', labs: 'آزمایشگاه‌ها و منابع', contact: 'تماس' },
    hero: { eyebrow: 'سنگ‌های قیمتی و جواهرات · شیراز', text: 'هر سنگ قیمتی آتشی قدیمی‌تر از امپراتوری‌ها دارد', hl: ['آتشی', 'قدیمی‌تر'], sub: 'سنگ‌های گواهی‌دار و جواهرات خاص، مستند به آزمایشگاه‌های مستقل و برترین خانه‌های مزایده جهان.', cta: 'ورود به فروشگاه', cta2: 'فروش به ما' },
    collection: { title: 'کالکشن', sub: 'قطعات خاص، ساخته‌شده با دست و نشانده با سنگ‌های استثنایی.', view: 'مشاهدهٔ جزئیات', filters: { all: 'همه', jewellery: 'جواهرات', stone: 'سنگ‌ها' }, all: 'مشاهدهٔ کل کالکشن', intro: 'هر قطعه، با جزئیات، عکس و ویدیو.' },
    product: { tabs: { overview: 'نگاه کلی', summary: 'خلاصه', details: 'جزئیات کامل' }, price: 'قیمت', onRequest: 'قیمت با استعلام', availability: 'موجودی', available: 'امکان سفارش', buy: 'درخواست خرید', ask: 'پرسش دربارهٔ این قطعه', highlights: 'ویژگی‌های برجسته', facts: 'اطلاعات کلیدی', about: 'دربارهٔ این قطعه', specs: 'مشخصات', media: 'عکس و ویدیو', back: 'بازگشت به کالکشن', assure: ['ارسال بیمه‌شده', 'همهٔ جزئیات پیش از خرید کتباً تأیید می‌شود'] },
    features: { title: 'چرا ما', items: [['منشأ مستند', 'برای هر سنگ، معدن، درمان و آزمایشگاه ذکر شده است.'], ['گزارش آزمایشگاهی', 'گزارش‌های مستقل از GIA، SSEF و Gübelin.'], ['محرمانه و اختصاصی', 'فروش محرمانه و مشاور شخصی.']] },
    trust: { title: 'مستند، نه فقط توصیف‌شده', body: 'برای هر سنگ، آزمایشگاه، منشأ و درمان ذکر شده و لینک منابع اصلی هست تا خودتان هر ادعا را بررسی کنید.', cta: 'آزمایشگاه‌ها و منابع' },
    cta: { title: 'بخرید، بفروشید یا با وثیقهٔ سنگ وام بگیرید' },
    shop: { title: 'سنگ‌های قیمتی', intro: 'چهار سنگ شاخص، هرکدام مستند به آزمایشگاه‌ها و خانه‌های مزایده.', all: 'همه', empty: 'سنگی پیدا نشد.', categories: { ruby: 'یاقوت سرخ', emerald: 'زمرد', sapphire: 'یاقوت کبود', diamond: 'الماس' } },
    gem: { spec: { stone_type: 'نوع سنگ', color: 'رنگ', carat: 'وزن (قیراط)', clarity: 'شفافیت', cut: 'نوع تراش', origin: 'منشأ', made: 'محل ساخت و تراش', natural: 'طبیعی یا آزمایشگاهی', treatment: 'درمان‌شده یا بدون درمان', cert_no: 'شمارهٔ گواهی', lab: 'آزمایشگاه صادرکننده', price: 'قیمت', stock: 'موجودی' }, natural: 'طبیعی', labgrown: 'آزمایشگاهی', onReport: 'روی گواهی فیزیکی درج شده — نسخه درخواست کنید', links: 'منابع معتبر', carat: 'قیراط', origin: 'منشأ', price: 'قیمت', inquire: 'استعلام این سنگ', back: 'بازگشت به سنگ‌ها' },
    form: { name: 'نام و نام خانوادگی', email: 'ایمیل', phone: 'تلفن', message: 'پیام', send: 'ارسال', sending: 'در حال ارسال…', done: 'سپاس — به‌زودی با شما تماس می‌گیریم.', error: 'مشکلی پیش آمد. دوباره تلاش کنید.' },
    sec: {
      auctions: { title: 'مزایده‌ها', body: 'مزایده حضوری و آنلاین سنگ‌های کمیاب و جواهرات خاص؛ هر لات با سابقهٔ مالکیت مستند.', blocks: [
        { h: 'مزایده چگونه برگزار می‌شود', kind: 'steps', items: [['مرور کاتالوگ', 'هر لات، یادداشت وضعیت و گزارش آزمایشگاه آن را بررسی کنید.'], ['ثبت‌نام برای مزایده', 'هویت خود را تأیید و سقف مزایده را مشخص کنید.'], ['مزایدهٔ حضوری یا غیرحضوری', 'آنلاین در مزایده شرکت کنید یا پیشنهاد کتبی از قبل بدهید.']] },
        { h: 'شرایط خریدار', kind: 'cards', items: [['کارمزد خریدار', 'پیش از شروع مزایده در کاتالوگ اعلام می‌شود.'], ['پرداخت و بیمه', 'پیش از تحویل لات هماهنگ می‌شود.'], ['ارسال بیمه‌شده', 'با بیمهٔ کامل و امضای تحویل‌گیرنده ارسال می‌شود.']] }] },
      'private-sales': { title: 'فروش خصوصی', body: 'خرید محرمانه و اختصاصی قطعات استثنایی، دور از سالن مزایده.', blocks: [
        { h: 'چرا خرید خصوصی', kind: 'cards', items: [['محرمانگی', 'پیشنهادها یک‌به‌یک و محرمانه بررسی می‌شود.'], ['مشاور اختصاصی', 'یک کارشناس از اولین تماس تا تحویل همراه شماست.'], ['سابقهٔ مستند', 'هر قطعه با گزارش آزمایشگاه و تاریخچه‌اش تحویل می‌شود.']] },
        { h: 'روند کار', kind: 'steps', items: [['بگویید چه می‌خواهید', 'سنگ، بودجه و زمان‌بندی را به ما بگویید.'], ['ما پیدا و ارائه می‌کنیم', 'قطعات مناسب را با مستندات کامل نشان می‌دهیم.'], ['توافق و تحویل', 'شرایط پیش از پرداخت کتباً تأیید می‌شود.']] }] },
      sell: { title: 'فروش جواهر', body: 'سنگ‌ها و جواهرات خود را به ما بسپارید. مشخصات و عکس‌ها را بفرستید تا ارزیابی کنیم.', blocks: [
        { h: 'روند فروش', kind: 'steps', items: [['ارسال مشخصات و عکس', 'هر چه از سنگ یا جواهر دارید برایمان بفرستید.'], ['ارزیابی و اصالت‌سنجی', 'کارشناسان ما قطعه را بررسی و اصالتش را تأیید می‌کنند.'], ['عرضه در مزایده مناسب', 'قطعه را در بهترین بازار و زمان عرضه می‌کنیم.']] },
        { h: 'چه چیزهایی می‌پذیریم', kind: 'cards', items: [['سنگ‌های رنگی', 'یاقوت سرخ، یاقوت کبود، زمرد و گونه‌های کمیاب‌تر.'], ['الماس', 'طبیعی و آزمایشگاهی، با گزارش یا بدون آن.'], ['جواهرات امضادار', 'قطعاتی از برندها و استادان شناخته‌شده.']] }] },
      finance: { title: 'تأمین مالی', body: 'راه‌های انعطاف‌پذیر برای خرید، یا دریافت وام با وثیقهٔ سنگ‌های قیمتی.', blocks: [
        { h: 'گزینه‌ها', kind: 'cards', items: [['خرید اقساطی', 'هزینهٔ خرید را در بازهٔ توافق‌شده تقسیم کنید.'], ['وام با وثیقهٔ سنگ', 'بر پایهٔ ارزیابی مستقل، روی سنگ خود وام بگیرید.'], ['ارزیابی مستقل', 'ارزش بی‌طرفانه برای بیمه، فروش یا وام.']] },
        { h: 'پرسش‌ها', kind: 'faq', items: [['آیا شرایط ثابت است؟', 'خیر. هر قرارداد جداگانه قیمت‌گذاری و پیش از تعهد کتباً تأیید می‌شود.'], ['گزارش آزمایشگاه لازم است؟', 'گزارش به ارزیابی کمک می‌کند. اگر سنگ گزارش ندارد، آزمایش آن را هماهنگ می‌کنیم.']] }] },
      labs: { title: 'آزمایشگاه‌ها و منابع', body: 'هر سنگ توسط آزمایشگاه‌های مستقل گوهرشناسی و خانه‌های مزایده معتبر مستند شده است. هر ادعا را در منبع اصلی بررسی کنید.', blocks: [
        { h: '۴C به تعریف GIA', kind: 'cards', items: [['رنگ', 'فام، تیرگی و اشباع؛ در الماس، نبودِ رنگ.'], ['شفافیت', 'میزان عاری‌بودن سنگ از ناخالصی‌های درونی و سطحی.'], ['تراش', 'اینکه وجوه تراش چقدر درخشش و آتش سنگ را شکل می‌دهند.'], ['وزن قیراط', 'وزن سنگ؛ هر قیراط ۰٫۲ گرم است.']] },
        { h: 'اعتبارسنجی گزارش', kind: 'steps', items: [['شمارهٔ گزارش را پیدا کنید', 'روی گزارش چاپ شده و در بسیاری از الماس‌ها روی کمربند سنگ حکاکی لیزری است.'], ['آنلاین بررسی کنید', 'شماره را در ابزار اعتبارسنجی همان آزمایشگاه وارد کنید.'], ['مشخصات را مقایسه کنید', 'وزن، رنگ، شفافیت و منشأ باید با سنگ بخواند.']] }] },
      contact: { title: 'تماس با ما', body: 'به ما در شیراز، خیابان زرگری سر بزنید یا پیام بفرستید.', blocks: [
        { h: 'بعد از پیام شما', kind: 'steps', items: [['پاسخ به شما', 'پیام شما بررسی می‌شود و با شما تماس می‌گیریم.'], ['بازدید یا ارزیابی', 'زمانی برای دیدن سنگ یا قطعه با هم تعیین می‌کنیم.'], ['همراهی تا نتیجه', 'تا خرید یا فروش کنار شما هستیم.']] }] },
    },
    footer: { rights: 'تمامی حقوق محفوظ است.', address: 'شیراز، خیابان زرگری', design: 'طراحی وب‌سایت', note: 'فروشگاه مستقل؛ وابسته به مؤسسهٔ گوهرشناسی آمریکا (GIA) نیست.' },
  },
};
