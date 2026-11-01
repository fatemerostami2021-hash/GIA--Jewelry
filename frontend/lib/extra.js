// Extra page content (v8). General, factual guidance only — no invented prices, dates or house names.
// Same block format as dict.sec[*].blocks: { h, kind: 'steps' | 'cards' | 'faq', items: [[title, text], ...] }.
export const extraBlocks = {
  en: {
    auctions: [
      { h: 'Before you bid', kind: 'cards', items: [
        ['Read the condition notes', 'Each lot lists treatments, repairs and wear. Ask for extra photos or a video before bidding.'],
        ['Check the laboratory report', 'Look for origin and treatment statements from an independent laboratory, and verify the report number with the issuer.'],
        ['Set your limit', 'Decide your maximum including buyer’s premium and shipping, and stay inside it.'],
        ['Plan payment and delivery', 'Agree payment method, insurance and who clears customs before the sale closes.'],
      ] },
      { h: 'Auction questions', kind: 'faq', items: [
        ['Can I bid without attending?', 'Yes. Leave an absentee bid in advance, or join the sale online while it is live.'],
        ['What is a reserve?', 'The minimum price the seller will accept. A lot that does not reach it may go unsold.'],
        ['Are the stones treated?', 'Many natural stones are heated or oiled. Treatments are stated in the lot description and the laboratory report.'],
        ['How is my purchase delivered?', 'Insured, tracked shipping with signature on receipt. Collection by appointment is also possible.'],
        ['Can I return a lot?', 'Lots are sold as described in the catalogue. Read the terms for each sale before you register.'],
      ] },
    ],
    'private-sales': [
      { h: 'Questions', kind: 'faq', items: [
        ['How is a private sale priced?', 'Each piece is priced individually from independent valuation and current market evidence. You see the terms in writing.'],
        ['Can you find a specific stone?', 'Yes. Tell us the species, size, colour and budget and we search our network.'],
        ['Is my enquiry confidential?', 'Yes. Details are shared only with the people working on your request.'],
      ] },
    ],
    sell: [
      { h: 'Prepare your piece', kind: 'cards', items: [
        ['Gather paperwork', 'Laboratory reports, receipts, appraisals and any history of ownership.'],
        ['Take clear photos', 'Daylight, plain background, front, back and any marks. A short video helps.'],
        ['Note the details', 'Weight, measurements, metal marks and any repairs you know of.'],
      ] },
      { h: 'Selling questions', kind: 'faq', items: [
        ['What does it cost to sell?', 'We explain every fee in writing before you agree to anything.'],
        ['How long does it take?', 'It depends on the piece and the sale it suits. We give you a realistic timeline with the valuation.'],
        ['Is my information private?', 'Yes. Your details and photographs are used only for your valuation and sale.'],
      ] },
    ],
    finance: [
      { h: 'Questions', kind: 'faq', items: [
        ['Do I keep my stone while borrowing?', 'Terms vary. Secured arrangements normally hold the stone safely until repayment.'],
        ['Who values the stone?', 'An independent valuation, shared with you before any offer.'],
      ] },
    ],
  },
  fa: {
    auctions: [
      { h: 'پیش از پیشنهاد دادن', kind: 'cards', items: [
        ['یادداشت‌های وضعیت را بخوانید', 'هر لات، درمان‌ها، تعمیرها و ساییدگی را فهرست می‌کند. پیش از پیشنهاد، عکس یا ویدیوی بیشتر بخواهید.'],
        ['گزارش آزمایشگاه را ببینید', 'به‌دنبال اظهارنظر دربارهٔ منشأ و درمان از آزمایشگاه مستقل باشید و شمارهٔ گزارش را از صادرکننده راستی‌آزمایی کنید.'],
        ['سقف خود را تعیین کنید', 'بیشینهٔ مبلغ را با کارمزد خریدار و هزینهٔ ارسال حساب کنید و از آن فراتر نروید.'],
        ['پرداخت و تحویل را برنامه‌ریزی کنید', 'روش پرداخت، بیمه و مسئول ترخیص گمرکی را پیش از پایان حراج توافق کنید.'],
      ] },
      { h: 'پرسش‌های مزایده', kind: 'faq', items: [
        ['بدون حضور هم می‌توانم پیشنهاد بدهم؟', 'بله. می‌توانید پیشنهاد غیرحضوری ثبت کنید یا هنگام برگزاری، آنلاین شرکت کنید.'],
        ['قیمت پایه (Reserve) یعنی چه؟', 'کمترین قیمتی که فروشنده می‌پذیرد. لاتی که به آن نرسد ممکن است فروخته نشود.'],
        ['آیا سنگ‌ها درمان شده‌اند؟', 'بسیاری از سنگ‌های طبیعی حرارت یا روغن می‌بینند. درمان‌ها در توضیح لات و گزارش آزمایشگاه ذکر می‌شوند.'],
        ['خرید من چطور تحویل داده می‌شود؟', 'ارسال بیمه‌شده و قابل‌پیگیری با امضای تحویل‌گیرنده. تحویل حضوری با قرار قبلی هم ممکن است.'],
        ['آیا می‌توانم لات را برگردانم؟', 'لات‌ها مطابق توضیح کاتالوگ فروخته می‌شوند. شرایط هر حراج را پیش از ثبت‌نام بخوانید.'],
      ] },
    ],
    'private-sales': [
      { h: 'پرسش‌ها', kind: 'faq', items: [
        ['قیمت در فروش خصوصی چگونه تعیین می‌شود؟', 'قیمت هر قطعه جداگانه و بر پایهٔ ارزیابی مستقل و شواهد بازار تعیین می‌شود و شرایط را کتبی می‌بینید.'],
        ['می‌توانید سنگ مشخصی را پیدا کنید؟', 'بله. نوع سنگ، اندازه، رنگ و بودجه را بگویید تا در شبکهٔ ما جست‌وجو شود.'],
        ['درخواست من محرمانه است؟', 'بله. جزئیات فقط با افرادی که روی درخواست شما کار می‌کنند در میان گذاشته می‌شود.'],
      ] },
    ],
    sell: [
      { h: 'قطعهٔ خود را آماده کنید', kind: 'cards', items: [
        ['مدارک را جمع کنید', 'گزارش‌های آزمایشگاه، فاکتورها، ارزیابی‌ها و هر سابقهٔ مالکیت.'],
        ['عکس‌های واضح بگیرید', 'در نور روز، پس‌زمینهٔ ساده، از روبه‌رو، پشت و هر نشانه. یک ویدیوی کوتاه کمک می‌کند.'],
        ['جزئیات را یادداشت کنید', 'وزن، ابعاد، نشان فلز و هر تعمیری که می‌دانید.'],
      ] },
      { h: 'پرسش‌های فروش', kind: 'faq', items: [
        ['فروش چقدر هزینه دارد؟', 'هر کارمزد را پیش از هر توافقی کتبی توضیح می‌دهیم.'],
        ['چقدر طول می‌کشد؟', 'به قطعه و حراج مناسب آن بستگی دارد. با ارزیابی، زمان‌بندی واقع‌بینانه می‌دهیم.'],
        ['اطلاعاتم محرمانه می‌ماند؟', 'بله. مشخصات و عکس‌های شما فقط برای ارزیابی و فروش خودتان استفاده می‌شود.'],
      ] },
    ],
    finance: [
      { h: 'پرسش‌ها', kind: 'faq', items: [
        ['هنگام دریافت وام، سنگ نزد من می‌ماند؟', 'شرایط فرق می‌کند. در ترتیبات وثیقه‌ای معمولاً سنگ تا بازپرداخت در امانت می‌ماند.'],
        ['چه کسی سنگ را ارزیابی می‌کند؟', 'ارزیابی مستقل، که پیش از هر پیشنهاد با شما در میان گذاشته می‌شود.'],
      ] },
    ],
  },
};

export const shopNotes = {
  en: {
    eyebrow: 'Landmark stones', h: 'Buying a stone with confidence',
    items: [
      ['Documented provenance', 'Each stone is presented with its history and an independent laboratory report where one exists.'],
      ['Viewing by appointment', 'See the stone in person, or request detailed photos and a video under different lighting.'],
      ['Insured delivery', 'Fully insured, tracked shipping with signature on receipt.'],
      ['Honest disclosure', 'Origin and treatments are stated plainly, so you know exactly what you are buying.'],
    ],
    learn: 'Learn about the stone', collection: 'See matching jewellery', guide: 'Gemstone guide', ask: 'Ask about a stone',
  },
  fa: {
    eyebrow: 'سنگ‌های شاخص', h: 'خرید مطمئن یک سنگ',
    items: [
      ['منشأ مستند', 'هر سنگ با تاریخچه‌اش و، در صورت وجود، گزارش آزمایشگاه مستقل عرضه می‌شود.'],
      ['بازدید با قرار قبلی', 'سنگ را حضوری ببینید یا عکس‌های دقیق و ویدیو در نورهای مختلف بخواهید.'],
      ['تحویل بیمه‌شده', 'ارسال کاملاً بیمه‌شده و قابل‌پیگیری با امضای تحویل‌گیرنده.'],
      ['شفافیت کامل', 'منشأ و درمان‌ها صریح اعلام می‌شوند تا دقیقاً بدانید چه می‌خرید.'],
    ],
    learn: 'شناخت این سنگ', collection: 'دیدن جواهر هم‌خوان', guide: 'راهنمای سنگ‌ها', ask: 'پرسش دربارهٔ یک سنگ',
  },
};
