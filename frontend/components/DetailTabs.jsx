'use client';
import { useState } from 'react';

// Three levels of detail: overview (short) -> summary -> full details.
export default function DetailTabs({ tabs }) {
  const [id, setId] = useState(tabs[0].id);
  return (
    <div className="mt-8">
      <div role="tablist" className="flex gap-2 border-b border-white/15">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={id === t.id} onClick={() => setId(t.id)} className={`-mb-px border-b-2 px-4 py-3 font-black transition ${id === t.id ? 'border-gold text-gold-light' : 'border-transparent text-lilac/60 hover:text-lilac'}`}>{t.label}</button>
        ))}
      </div>
      <div role="tabpanel" className="glass mt-5 p-6">{tabs.find((t) => t.id === id).content}</div>
    </div>
  );
}
