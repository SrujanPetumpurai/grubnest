'use client';
import { useEffect, useState } from 'react';
import AddCart from './AddCart';
export default function Search() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setItems([]);
      return;
    }
    const t = setTimeout(async () => {
      setLoading(true);
      const r = await fetch(`/api/Items/search?q=${encodeURIComponent(q)}`);
      const data = await r.json();
      setItems(data.items);
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="w-[500px] mx-auto relative">
      <img
        src="/search.jpg"
        alt="search"
        className="absolute left-3 top-2.5 w-4 h-4"
      />
      <input
        id="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search fruits, brands…"
        className="w-full rounded-xl border pl-9 pr-3 py-2"
        autoComplete="off"
      />
      {loading && q && <div className="mt-2 text-sm">Searching…</div>}
      <ul className="absolute bg-white w-full mt-1  rounded-lg">
        {items.map((i) => (
            <li key={i._id} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
            <img src={i.image} alt={i.name} className="w-10 h-10 rounded object-cover" />
            <span className="text-sm font-medium">{i.name}</span>
            <span className="ml-[5px] text-sm text-gray-600">₹{i.cost}</span>
            <AddCart id={i._id.toString()}Inquantity={0}bg={'#7BF1A8'}cl={'white'} ></AddCart>
            <span className="ml-auto text-sm text-gray-600">{i.measurement}</span>
            </li>
        ))}
        </ul>   
    </div>
  );
}
