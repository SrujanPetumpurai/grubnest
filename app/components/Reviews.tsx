'use client';
import { useEffect, useRef, useState } from 'react';

type Review = { body: string; rating: number; name: string; avatar?: string };

export default function ReviewsCarousel({ url = '/api/reviews' }: { url?: string }) {
  const [data, setData] = useState<Review[]>([]);
  const [i, setI] = useState(0);
  const fetching = useRef(false);

  useEffect(() => {
    if (fetching.current) return;
    fetching.current = true;
    (async () => {
      const res = await fetch(url, { cache: 'no-store' });
      const json: Review[] = await res.json();
      setData(json);
    })();
  }, [url]);

  if (!data.length) return null;

  const prev = () => setI((v) => (v - 1 + data.length) % data.length);
  const next = () => setI((v) => (v + 1) % data.length);
  const r = data[i];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-center gap-3">
        <Stars value={r.rating} />
        <span className="text-emerald-900/70 text-sm">({r.rating.toFixed(1)})</span>
      </div>

      <div className="relative mt-6">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-emerald-300 text-emerald-800"
          aria-label="Previous"
        >
          ‹
        </button>
        <blockquote className="mx-14 text-center text-xl md:text-2xl font-semibold text-emerald-900">
          “{r.body}”
        </blockquote>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-emerald-300 text-emerald-800"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-emerald-200 flex items-center justify-center">
          {r.avatar ? (
            <img alt={r.name} src={r.avatar} className="h-full w-full object-cover" />
          ) : (
            <span className="text-emerald-900 font-bold">{initials(r.name)}</span>
          )}
        </div>
        <div className="font-medium text-emerald-900">{r.name}</div>
        <div className="mt-1 flex gap-2">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${i === idx ? 'bg-emerald-900' : 'bg-emerald-300'}`}
              aria-label={`Go to ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');
}

function Stars({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = value - i;
    const fill = diff >= 1 ? 100 : diff > 0 ? Math.round(diff * 100) : 0;
    return (
      <span key={i} className="inline-block h-5 w-5 relative">
        <StarOutline className="absolute inset-0" />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
          <StarSolid />
        </span>
      </span>
    );
  });
  return <div className="flex">{stars}</div>;
}

function StarOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.9 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    </svg>
  );
}

function StarSolid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-400" fill="currentColor">
      <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.9 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    </svg>
  );
}
