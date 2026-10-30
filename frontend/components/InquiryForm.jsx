'use client';
import { useState } from 'react';
import { postInquiry } from '@/lib/api';

export default function InquiryForm({ t, type, gem }) {
  const [state, setState] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    setState('sending');
    const body = { ...Object.fromEntries(new FormData(e.currentTarget)), type, gem_slug: gem || null };
    try {
      const r = await postInquiry(body);
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }
  const field = 'w-full rounded-xl border border-white/20 bg-ink/50 px-4 py-3 text-lilac outline-none placeholder:text-lilac/50 focus:border-gold';
  if (state === 'done') return <p className="text-xl font-bold text-gold-light">{t.done}</p>;
  return (
    <form onSubmit={submit} className="grid gap-4">
      <input name="name" required placeholder={t.name} className={field} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" placeholder={t.email} className={field} dir="ltr" />
        <input name="phone" placeholder={t.phone} className={field} dir="ltr" />
      </div>
      <textarea name="message" rows={5} placeholder={t.message} className={field} />
      <button disabled={state === 'sending'} className="rounded-full bg-gold px-8 py-3 font-black text-ink disabled:opacity-60 sm:w-fit">{state === 'sending' ? t.sending : t.send}</button>
      {state === 'error' && <p className="font-bold text-magenta">{t.error}</p>}
    </form>
  );
}
