'use client';

/**
 * SectionDivider — a refined horizontal divider with a centered diamond
 * motif, used between major sections on the homepage. Pure decorative.
 */
export default function SectionDivider({ label, className = '' }) {
  return (
    <div className={`relative mx-auto my-12 max-w-7xl px-5 ${className}`}>
      <div className="flex items-center justify-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <span className="text-gold">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2 L22 12 L12 22 L2 12 Z" />
          </svg>
        </span>
        {label && (
          <span className="px-3 text-[10px] font-black uppercase tracking-[.4em] text-gold-light rtl:tracking-normal">
            {label}
          </span>
        )}
        <span className="text-gold">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2 L22 12 L12 22 L2 12 Z" />
          </svg>
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
      </div>
    </div>
  );
}
