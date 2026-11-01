'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import TypeText from './TypeText';
import { ui } from '@/lib/ui';
import 'swiper/css';
import 'swiper/css/effect-fade';

const SLIDES = [
  { n: 'ruby-gold-velvet', en: 'Ruby and gold in velvet', fa: 'یاقوت و طلا در مخمل' },
  { n: 'royal-blue-sapphire', en: 'Royal blue sapphire jewellery', fa: 'جواهرات یاقوت کبود سلطنتی' },
  { n: 'emerald-gilded-salon', en: 'Emerald elegance in a gilded salon', fa: 'شکوه زمرد در سالنی طلایی' },
  { n: 'amethyst-glamour', en: 'Amethyst glamour', fa: 'جلوهٔ آمتیست' },
  { n: 'ruby-showcase-hero', en: 'Ruby showcase', fa: 'نمایشگاه یاقوت' },
];
const DIR = '/media/images/hero';

/**
 * HeroBanner — full-width hero slider directly under the header.
 * Automatic cross-fade only: no arrows, no dots, no progress bar. Each photo is shown complete
 * (object-contain over a blurred copy of itself), so nothing is cropped.
 */
export default function HeroBanner({ locale = 'en' }) {
  const [active, setActive] = useState(0);
  const lines = ui[locale].heroLines;
  return (
    <section className="relative w-full bg-ink pt-[70px] md:pt-[111px]" aria-label="Featured">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        speed={1300}
        allowTouchMove={false}
        onSlideChange={(sw) => setActive(sw.realIndex)}
        dir={locale === 'fa' ? 'rtl' : 'ltr'}
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={s.n}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink md:max-h-[88vh]">
              <img
                src={`${DIR}/${s.n}.webp`}
                srcSet={`${DIR}/${s.n}-960.webp 960w, ${DIR}/${s.n}.webp 1920w`}
                sizes="100vw"
                alt={s[locale]}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                className="h-full w-full object-cover"
              />
              {/* the beautiful sentence for this slide */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/35 to-transparent px-4 pb-4 pt-14 sm:px-10 sm:pb-8 sm:pt-24 lg:px-16">
                <p className="cap-in text-[9px] font-black tracking-[.3em] text-gold-light rtl:tracking-normal sm:text-xs">✦ GIA Jewelry</p>
                <p className="cap-in d2 mt-1 max-w-3xl font-display text-[15px] font-black leading-snug text-lilac [text-shadow:0_3px_24px_rgba(0,0,0,.9)] sm:mt-2 sm:text-3xl lg:text-5xl">
                  {i === active ? <TypeText text={lines[i]} once speed={38} /> : lines[i]}
                </p>
                <p className="cap-in d3 mt-1 hidden text-sm font-bold text-gold-light/90 sm:block">{ui[locale].heroSub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
