import Link from 'next/link';
import ParallaxText from './ParallaxText';

// Text only: the video is the background, the animation is a separate layer. No photos on top of the video.
export default function Hero({ t, locale }) {
  return (
    <section className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-16 pt-28">
      <ParallaxText>
      <p className="mb-5 text-xs font-bold uppercase tracking-[.3em] text-gold-light rtl:tracking-normal sm:text-sm"><span className="twinkle">✦</span> {t.eyebrow}</p>
      <h1 className="max-w-4xl font-display text-[clamp(2.4rem,6.5vw,6rem)] font-black leading-[1.15] [text-shadow:0_4px_30px_rgba(0,0,0,.7)]">
        {t.text.split(' ').map((w, i) => (
          <span key={i} className={`word-in pe-[.25em] ${t.hl.includes(w) ? 'hl' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>{w}</span>
        ))}
      </h1>
      <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-lilac/90 [text-shadow:0_2px_20px_rgba(0,0,0,.8)]">{t.sub}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#collection" className="rounded-full bg-gold px-8 py-3 text-sm font-black text-ink transition hover:bg-gold-light">{t.cta}</a>
        <Link href={`/${locale}/sell`} className="rounded-full border border-gold px-8 py-3 text-sm font-black text-gold-light transition hover:bg-gold/20">{t.cta2}</Link>
      </div>
      </ParallaxText>
    </section>
  );
}
