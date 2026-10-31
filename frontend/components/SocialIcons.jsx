import { socials } from '@/lib/site';

const PATHS = {
  telegram: <path d="M22 2 2 10l7 3 2 8 3-5 5 4z" fill="currentColor" />,
  whatsapp: <><path d="M12 2.500a9.500 9.500 0 0 0-8.100 14.400L2.600 21.400l4.600-1.200A9.500 9.500 0 1 0 12 2.500z" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinejoin="round" /><path d="M8.600 7.800c-.4.900.2 2.800 2 4.600s3.700 2.400 4.600 2l.7-1.100-1.800-1-.8.700c-.7-.3-1.700-1.300-2-2l.7-.8-1-1.800z" fill="currentColor" /></>,
  instagram: <><rect x="3.500" y="3.500" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.800" /><circle cx="12" cy="12" r="3.900" fill="none" stroke="currentColor" strokeWidth="1.800" /><circle cx="17" cy="7" r="1.100" fill="currentColor" /></>,
  linkedin: <><rect x="3.500" y="3.500" width="17" height="17" rx="3" fill="none" stroke="currentColor" strokeWidth="1.800" /><path d="M7.500 10.200h1.900V16.500H7.500zM8.450 7.300a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200zM11 10.200h1.800v.9c.4-.7 1.100-1.100 2.100-1.100 1.800 0 2.600 1.100 2.600 3v3.500h-1.900v-3.100c0-.9-.3-1.500-1.100-1.500s-1.600.5-1.600 1.600v3H11z" fill="currentColor" /></>,
};

/** Round gold social buttons — shared by the header and (optionally) other blocks. */
export default function SocialIcons({ className = '', size = 'h-8 w-8' }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`} dir="ltr">
      {socials.map((s) => (
        <li key={s.k}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            title={s.name}
            className={`social-btn grid ${size} place-items-center rounded-full border border-gold/45 text-gold-light`}
            style={{ '--c': s.bg }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>{PATHS[s.k]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
