import SafeImg from './SafeImg';
import { num } from '@/lib/api';

// Photo of the stone if /media/images/<image> exists; otherwise a purple card with the carat weight.
export default function StoneVisual({ gem, locale, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet via-plum to-ink ${className}`}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, ${gem.hex}55, transparent 65%)` }} />
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="hl font-display text-5xl font-black">{num(gem.carat, locale)}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[.3em] text-gold-light rtl:tracking-normal">{gem[`stone_type_${locale}`]}</p>
        </div>
      </div>
      <SafeImg src={`/media/images/${gem.image}`} alt={gem[`name_${locale}`]} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}
