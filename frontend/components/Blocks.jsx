import Reveal from './Reveal';
import Stagger from './Stagger';

// Renders page blocks from the dictionary: steps | cards | faq
export default function Blocks({ blocks }) {
  return blocks.map((b) => (
    <div key={b.h} className="mt-14">
      <Reveal><h2 className="font-display text-3xl font-black md:text-4xl">{b.h}</h2></Reveal>
      {b.kind === 'faq' ? (
        <Stagger className="mt-6 grid gap-3">
          {b.items.map(([q, a]) => (
            <details key={q} className="glass p-5"><summary className="cursor-pointer font-black">{q}</summary><p className="mt-3 leading-7 text-lilac/80">{a}</p></details>
          ))}
        </Stagger>
      ) : (
        <Stagger className={`mt-6 grid gap-4 sm:grid-cols-2 ${b.items.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {b.items.map(([t, d], i) => (
            <div key={t} className="glass p-6">
              {b.kind === 'steps' && <span className="hl font-display text-4xl font-black">{i + 1}</span>}
              <h3 className="mt-2 text-lg font-black text-gold-light">{t}</h3>
              <p className="mt-2 leading-7 text-lilac/80">{d}</p>
            </div>
          ))}
        </Stagger>
      )}
    </div>
  ));
}
