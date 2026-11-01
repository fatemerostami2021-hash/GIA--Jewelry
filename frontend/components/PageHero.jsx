import HeroVideo from './HeroVideo';
import SafeImg from './SafeImg';

/**
 * PageHero — full-width hero for inner pages: video playing behind, poster frame, gradient for
 * legibility, text on one side and (optionally) a framed photo on the other. `tall` = bigger (used by Sell).
 */
export default function PageHero({ hero, eyebrow, title, text, tall = false, children }) {
  return (
    <section className={`relative isolate overflow-hidden ${tall ? 'min-h-[88vh]' : 'min-h-[64vh] md:min-h-[72vh]'}`}>
      {hero?.poster && <img src={hero.poster} alt="" aria-hidden fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      {hero?.video && <HeroVideo src={hero.video} poster={hero.poster} className="absolute inset-0 -z-10 h-full w-full object-cover" />}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-ink/85 via-ink/40 to-ink/20 rtl:bg-gradient-to-l" />
      <div className="absolute inset-x-0 bottom-0 -z-[5] h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="mx-auto grid h-full max-w-7xl items-end gap-10 px-5 pb-14 pt-36 md:grid-cols-[1.15fr_.85fr] md:items-center">
        <div>
          {eyebrow && <p className="mb-3 text-xs font-black tracking-[.35em] text-gold-light rtl:tracking-normal">✦ {eyebrow}</p>}
          <h1 className="font-display text-5xl font-black md:text-7xl"><span className="hl">{title}</span></h1>
          {text && <p className="mt-6 max-w-2xl text-lg font-bold leading-9 text-lilac/90 md:text-xl">{text}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {hero?.photo && (
          <div className="hidden justify-self-end md:block">
            <SafeImg src={hero.photo} alt="" className="max-h-[52vh] w-full max-w-md rounded-[2rem] border border-gold/40 object-cover shadow-[0_30px_80px_rgba(0,0,0,.6)]" />
          </div>
        )}
      </div>
    </section>
  );
}
