'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

/**
 * HeroSlider — full-width Swiper carousel that runs as a continuous non-stop
 * fade slideshow. No nav arrows, no pagination dots — the slides change
 * quietly in the background. Each slide is clickable and links to its own
 * collection detail page.
 *
 * Image quality rules:
 *   - `object-cover` BUT kept at a wide aspect (21/7 ≈ 3:1) so the image
 *     fills the slider without being zoomed in aggressively.
 *   - The hover ken-burns scale is tiny (1.04) so the picture stays readable.
 *   - The hero image is NOT cropped to a tiny zoom — the whole composition
 *     stays visible.
 */
export default function HeroSlider({ slides = [] }) {
  if (!slides.length) return null;
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false }}
        loop
        speed={1200}
        allowTouchMove={false}
        className="!pb-0"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <Link
              href={s.href}
              className="group relative block aspect-[21/7] w-full md:aspect-[24/7]"
            >
              <img
                src={s.src}
                alt={s.alt}
                className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              {/* Bottom gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              {/* Slide label */}
              <div className="absolute inset-x-0 bottom-0 px-8 py-6 md:px-16 md:py-8">
                <p className="text-xs font-black uppercase tracking-[.4em] text-gold-light rtl:tracking-normal">
                  ✦ {s.eyebrow || (i + 1).toString().padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-2xl font-black text-lilac drop-shadow-[0_4px_20px_rgba(0,0,0,.9)] md:text-4xl">
                  {s.alt}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
