// Collection pieces. Edit freely: add images/video, fill in confirmed stone data, set a price.
// Every spec is [label, value]. Do not state stone identity, origin or certificates until a laboratory report exists.
const o = (n) => ({ full: `/media/images/optimized/${n}.webp`, thumb: `/media/images/optimized/${n}-640.webp` });

export const products = [
  {
    slug: 'cobra-ruby-ring', type: 'ring', cover: o('cobra-ruby-ring'), images: [o('cobra-ruby-ring').full], video: null, price: null,
    en: {
      name: 'Cobra Ruby Ring', short: 'Two silver-toned cobras guard a red oval centre stone.',
      highlights: ['Animal-inspired serpent design', 'Openwork gold-toned shank', 'Red oval centre stone with small red accents'],
      summary: 'A statement ring in which two silver-toned cobras frame a large red oval stone, set above a pierced gold-toned shank with small red accent stones.',
      description: 'Serpent motifs have a long history in jewellery. Here two cobras rise on either side of the centre stone, their scaled bodies modelled in fine detail, while the pierced shank lets light pass through the ring.',
      specs: [['Piece', 'Ring'], ['Design', 'Two cobras flanking an oval centre stone; openwork shank'], ['Metal', 'Gold-toned and silver-toned metal — purity to be confirmed'], ['Centre stone', 'Red oval stone — identity, weight and origin to be confirmed by laboratory report'], ['Accent stones', 'Small red stones'], ['Style', 'Animal-inspired, serpent motif'], ['Documentation', 'To be listed once the laboratory report is attached']],
    },
    fa: {
      name: 'انگشتر کبرا با سنگ سرخ', short: 'دو کبرای نقره‌ای نگهبان سنگ بیضی قرمز مرکزی‌اند.',
      highlights: ['طرح الهام‌گرفته از مار', 'بدنهٔ مشبک طلایی‌رنگ', 'سنگ مرکزی بیضی قرمز با سنگ‌های ریز قرمز'],
      summary: 'انگشتری خاص که در آن دو کبرای نقره‌ای‌رنگ، سنگ بیضی قرمز بزرگ را در میان گرفته‌اند؛ سنگ روی بدنهٔ مشبک طلایی‌رنگ با سنگ‌های ریز قرمز نشسته است.',
      description: 'نقش مار سابقهٔ طولانی در جواهرسازی دارد. در این قطعه دو کبرا از دو سوی سنگ مرکزی بالا آمده‌اند، فلس‌های بدنشان با ظرافت کار شده و بدنهٔ مشبک اجازه می‌دهد نور از میان انگشتر بگذرد.',
      specs: [['نوع قطعه', 'انگشتر'], ['طرح', 'دو کبرا در دو سوی سنگ بیضی مرکزی؛ بدنهٔ مشبک'], ['فلز', 'فلز طلایی‌رنگ و نقره‌ای‌رنگ — عیار باید تأیید شود'], ['سنگ مرکزی', 'سنگ بیضی قرمز — نوع، وزن و منشأ باید با گزارش آزمایشگاه تأیید شود'], ['سنگ‌های جانبی', 'سنگ‌های ریز قرمز'], ['سبک', 'الهام‌گرفته از حیوانات، نقش مار'], ['مستندات', 'پس از پیوست گزارش آزمایشگاه درج می‌شود']],
    },
  },
  {
    slug: 'butterfly-pendant', type: 'pendant', cover: o('butterfly-pendant'), images: [o('butterfly-pendant').full], video: null, price: null,
    en: {
      name: 'Butterfly Pendant', short: 'Two figures embrace within butterfly wings set with green stones.',
      highlights: ['Butterfly silhouette with openwork wings', 'Wings set with green stones', 'Rose-gold-toned figures, on a chain'],
      summary: 'A pendant in the form of a butterfly whose openwork wings are set with green stones, enclosing a sculpted pair of figures in rose-gold-toned metal.',
      description: 'The wings are built from fine, curving frames paved with stones, framing the two figures at the centre. A small cluster of clear stones and a chain complete the piece.',
      specs: [['Piece', 'Pendant with chain'], ['Design', 'Butterfly wings framing a sculpted pair of figures'], ['Metal', 'Rose-gold-toned and silver-toned metal — purity to be confirmed'], ['Stones', 'Green stones across the wings and small clear accents — identity to be confirmed by laboratory report'], ['Style', 'Butterfly-inspired, figurative'], ['Documentation', 'To be listed once the laboratory report is attached']],
    },
    fa: {
      name: 'آویز پروانه', short: 'دو پیکر در آغوش هم، میان بال‌های پروانه با سنگ‌های سبز.',
      highlights: ['سیمای پروانه با بال‌های مشبک', 'بال‌ها با سنگ‌های سبز نشانده شده‌اند', 'پیکرهای رزگلد‌رنگ، همراه زنجیر'],
      summary: 'آویزی به شکل پروانه که بال‌های مشبکش با سنگ‌های سبز نشانده شده و دو پیکر مجسمه‌وار از فلز رزگلد‌رنگ را در میان گرفته است.',
      description: 'بال‌ها از قاب‌های ظریف و خمیده ساخته شده و با سنگ پوشیده‌اند و دو پیکر مرکزی را در بر می‌گیرند. چند سنگ شفاف ریز و یک زنجیر قطعه را کامل می‌کند.',
      specs: [['نوع قطعه', 'آویز همراه زنجیر'], ['طرح', 'بال‌های پروانه که دو پیکر مجسمه‌وار را در میان گرفته‌اند'], ['فلز', 'فلز رزگلد‌رنگ و نقره‌ای‌رنگ — عیار باید تأیید شود'], ['سنگ‌ها', 'سنگ‌های سبز روی بال‌ها و سنگ‌های ریز شفاف — نوع باید با گزارش آزمایشگاه تأیید شود'], ['سبک', 'الهام‌گرفته از پروانه، پیکره‌ای'], ['مستندات', 'پس از پیوست گزارش آزمایشگاه درج می‌شود']],
    },
  },
  {
    slug: 'red-white-stone-parure', type: 'set', cover: o('ruby-parure-model'), images: [o('ruby-parure-model').full], video: null, price: null,
    en: {
      name: 'Red & White Stone Parure', short: 'Necklace, earrings, ring and bracelet in red and brilliant clear stones.',
      highlights: ['Four matching pieces', 'Red stones alternating with brilliant clear stones', 'Central red motif with a drop pendant'],
      summary: 'A matching parure of necklace, chandelier earrings, ring and bracelet, combining red stones with brilliant clear stones in white-metal settings.',
      description: 'The necklace follows the neckline with rows of red stones separated by clear stones, ending in a central motif and a red drop. The earrings, ring and bracelet repeat the same language so the set reads as one design.',
      specs: [['Piece', 'Necklace, earrings, ring and bracelet'], ['Design', 'Rows of red and clear stones; central motif with drop pendant'], ['Metal', 'White-toned metal — purity to be confirmed'], ['Stones', 'Red and brilliant clear stones — identity, weights and origin to be confirmed by laboratory report'], ['Style', 'High-jewellery parure'], ['Documentation', 'To be listed once the laboratory reports are attached']],
    },
    fa: {
      name: 'ست جواهر سنگ قرمز و سفید', short: 'گردنبند، گوشواره، انگشتر و دستبند با سنگ‌های قرمز و شفاف درخشان.',
      highlights: ['چهار قطعهٔ هماهنگ', 'سنگ‌های قرمز به‌صورت یک‌درمیان با سنگ‌های شفاف', 'نقش مرکزی قرمز با آویز قطره‌ای'],
      summary: 'ستی هماهنگ شامل گردنبند، گوشوارهٔ آویز، انگشتر و دستبند که سنگ‌های قرمز را با سنگ‌های شفاف درخشان در قاب فلز سفید‌رنگ ترکیب می‌کند.',
      description: 'گردنبند با ردیف‌های سنگ قرمز و شفاف دور گردن می‌نشیند و به یک نقش مرکزی و یک آویز قرمز می‌رسد. گوشواره، انگشتر و دستبند همین زبان طراحی را تکرار می‌کنند تا ست یک طرح واحد به نظر برسد.',
      specs: [['نوع قطعه', 'گردنبند، گوشواره، انگشتر و دستبند'], ['طرح', 'ردیف‌های سنگ قرمز و شفاف؛ نقش مرکزی با آویز'], ['فلز', 'فلز سفید‌رنگ — عیار باید تأیید شود'], ['سنگ‌ها', 'سنگ‌های قرمز و شفاف درخشان — نوع، وزن و منشأ باید با گزارش آزمایشگاه تأیید شود'], ['سبک', 'ست جواهر پیشرفته'], ['مستندات', 'پس از پیوست گزارش‌های آزمایشگاه درج می‌شود']],
    },
  },
  {
    slug: 'violet-collar-necklace', type: 'necklace', cover: o('violet-necklace-model'), images: [o('violet-necklace-model').full], video: null, price: null,
    en: {
      name: 'Violet Collar Necklace', short: 'Layered collar of violet oval and round stones, with matching drop earrings.',
      highlights: ['Layered collar silhouette', 'Violet oval and round stones', 'Matching drop earrings'],
      summary: 'A wide collar necklace of violet oval and round stones in gold-toned settings, worn with matching drop earrings.',
      description: 'Rows of round violet stones form the neckline, falling into larger oval stones that fan across the collarbone. The earrings echo the oval shapes of the necklace.',
      specs: [['Piece', 'Collar necklace with matching drop earrings'], ['Design', 'Layered rows of round and oval stones'], ['Metal', 'Gold-toned settings — purity to be confirmed'], ['Stones', 'Violet stones — type, weights and origin to be confirmed by laboratory report'], ['Style', 'Statement collar'], ['Documentation', 'To be listed once the laboratory report is attached']],
    },
    fa: {
      name: 'گردنبند یقه‌ای بنفش', short: 'یقهٔ لایه‌لایه از سنگ‌های بنفش بیضی و گرد، همراه گوشوارهٔ هماهنگ.',
      highlights: ['سیمای یقه‌ای لایه‌لایه', 'سنگ‌های بنفش بیضی و گرد', 'گوشوارهٔ آویز هماهنگ'],
      summary: 'گردنبند یقه‌ای پهن از سنگ‌های بنفش بیضی و گرد در قاب‌های طلایی‌رنگ، همراه گوشوارهٔ آویز هماهنگ.',
      description: 'ردیف‌هایی از سنگ‌های گرد بنفش خط یقه را می‌سازند و به سنگ‌های بیضی بزرگ‌تر می‌رسند که روی استخوان ترقوه باز می‌شوند. گوشواره‌ها شکل بیضی گردنبند را تکرار می‌کنند.',
      specs: [['نوع قطعه', 'گردنبند یقه‌ای با گوشوارهٔ آویز هماهنگ'], ['طرح', 'ردیف‌های لایه‌لایهٔ سنگ گرد و بیضی'], ['فلز', 'قاب طلایی‌رنگ — عیار باید تأیید شود'], ['سنگ‌ها', 'سنگ‌های بنفش — نوع، وزن و منشأ باید با گزارش آزمایشگاه تأیید شود'], ['سبک', 'یقهٔ خاص'], ['مستندات', 'پس از پیوست گزارش آزمایشگاه درج می‌شود']],
    },
  },
];
