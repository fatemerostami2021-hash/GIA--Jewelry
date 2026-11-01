'use client';
import { useEffect, useState } from 'react';

const T = {
  en: { h: 'Your privacy, protected', p: 'GIA Jewelry deals in high-value stones, so we keep things strict. Essential cookies keep the site secure and remember your language. With your permission we also use optional cookies to understand how the site is used. You can change this at any time.', all: 'Accept and enter', ess: 'Essential only', note: 'We never sell your data.' },
  fa: { h: 'حریم خصوصی شما، محفوظ', p: 'GIA Jewelry با سنگ‌ها و جواهرات باارزش سروکار دارد، پس سخت‌گیر هستیم. کوکی‌های ضروری امنیت سایت را حفظ می‌کنند و زبان شما را به یاد می‌سپارند. با اجازهٔ شما، از کوکی‌های اختیاری هم برای فهمیدن نحوهٔ استفاده از سایت بهره می‌گیریم. هر زمان می‌توانید این انتخاب را عوض کنید.', all: 'پذیرش و ورود', ess: 'فقط ضروری', note: 'اطلاعات شما هرگز فروخته نمی‌شود.' },
};

/** CookieGate — first-visit consent dialog. Choice is saved in a 1-year cookie (gia_consent). */
export default function CookieGate({ locale = 'en' }) {
  const [show, setShow] = useState(false);
  const t = T[locale] || T.en;
  useEffect(() => { if (!/(?:^|; )gia_consent=/.test(document.cookie)) setShow(true); }, []);
  useEffect(() => {
    document.documentElement.style.overflow = show ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [show]);
  const choose = (v) => {
    document.cookie = `gia_consent=${v}; max-age=31536000; path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="ck-h">
      <div className="cookie-in relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold/50 bg-gradient-to-br from-plum via-ink to-black p-7 shadow-[0_30px_100px_rgba(0,0,0,.7),0_0_60px_rgba(212,175,55,.2)] md:p-9">
        <div className="pointer-events-none absolute -top-16 start-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />
        <p className="text-3xl" aria-hidden>🔒</p>
        <h2 id="ck-h" className="mt-3 font-display text-3xl font-black text-gold-light">{t.h}</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-lilac/80">{t.p}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => choose('all')} className="flex-1 rounded-full bg-gold px-6 py-3 text-sm font-black text-ink transition-all hover:bg-gold-light hover:shadow-[0_0_30px_rgba(242,217,138,.55)]">{t.all}</button>
          <button type="button" onClick={() => choose('essential')} className="flex-1 rounded-full border-2 border-gold/60 px-6 py-3 text-sm font-black text-gold-light transition-all hover:bg-gold/15">{t.ess}</button>
        </div>
        <p className="mt-4 text-xs font-bold text-lilac/50">{t.note}</p>
      </div>
    </div>
  );
}
