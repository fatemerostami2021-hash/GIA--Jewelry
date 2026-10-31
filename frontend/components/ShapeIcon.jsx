/** ShapeIcon — outline of a gemstone cut (round, oval, cushion, emerald, pear, marquise, heart). */
const P = {
  round: <circle cx="24" cy="24" r="15" />,
  oval: <ellipse cx="24" cy="24" rx="11" ry="17" />,
  cushion: <rect x="9" y="9" width="30" height="30" rx="9" />,
  emerald: <path d="M15 8h18l6 6v20l-6 6H15l-6-6V14z" />,
  pear: <path d="M24 6C31 16 38 22 38 30a14 14 0 0 1-28 0c0-8 7-14 14-24z" />,
  marquise: <path d="M24 5c10 8 14 14 14 19s-4 11-14 19C14 35 10 29 10 24S14 13 24 5z" />,
  heart: <path d="M24 40C10 30 8 22 8 18a8.5 8.5 0 0 1 16-4 8.5 8.5 0 0 1 16 4c0 4-2 12-16 22z" />,
};
export default function ShapeIcon({ k, size = 28, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
      {P[k]}
      <path d="M24 14v20M14 24h20" strokeOpacity=".25" />
    </svg>
  );
}
