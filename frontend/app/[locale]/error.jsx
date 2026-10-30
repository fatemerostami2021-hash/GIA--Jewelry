'use client';

export default function Error({ reset }) {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 pt-24 text-center">
      <div>
        <p className="font-display text-3xl font-black">Something went wrong</p>
        <button onClick={reset} className="mt-6 rounded-full bg-gold px-8 py-3 font-black text-ink">Try again</button>
      </div>
    </div>
  );
}
