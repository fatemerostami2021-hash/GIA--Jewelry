'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
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
  return (
    <section className="relative w-full pt-[110px]" aria-label="Featured">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        speed={1300}
        allowTouchMove={false}
        dir={locale === 'fa' ? 'rtl' : 'ltr'}
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={s.n}>
            <div className="relative aspect-[16/9] max-h-[82vh] w-full overflow-hidden bg-ink">
              <img src={`${DIR}/${s.n}-960.webp`} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl" />
              <img
                src={`${DIR}/${s.n}.webp`}
                srcSet={`${DIR}/${s.n}-960.webp 960w, ${DIR}/${s.n}.webp 1920w`}
                sizes="100vw"
                alt={s[locale]}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                className="relative mx-auto h-full w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-ink to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
