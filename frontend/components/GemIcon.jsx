import { useId } from 'react';

/**
 * GemIcon — a faceted gemstone drawn in SVG, tinted per stone. Used wherever we have no
 * photograph (mega menu, gemstone guide). `hex` is the body colour, `hex2` the highlight.
 */
export default function GemIcon({ hex = '#c8102e', hex2 = '#ff8a9a', size = 40, className = '', title }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hex2} />
          <stop offset=".55" stopColor={hex} />
          <stop offset="1" stopColor={hex} stopOpacity=".78" />
        </linearGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* crown */}
      <path d="M18 12h28l12 15H6z" fill={`url(#g${id})`} />
      {/* pavilion */}
      <path d="M6 27h52L32 58z" fill={hex} fillOpacity=".92" />
      <path d="M6 27h52L32 58z" fill={`url(#g${id})`} fillOpacity=".55" />
      {/* facets */}
      <g stroke="#fff" strokeOpacity=".55" strokeWidth="1" fill="none" strokeLinejoin="round">
        <path d="M18 12 25 27 32 12 39 27 46 12M25 27 32 58 39 27M6 27h52" />
        <path d="M18 12h28l12 15L32 58 6 27z" strokeOpacity=".9" />
      </g>
      <path d="M20 14h10l-4 11z" fill={`url(#h${id})`} />
      <circle className="gem-glint" cx="44" cy="17" r="2.2" fill="#fff" />
    </svg>
  );
}
