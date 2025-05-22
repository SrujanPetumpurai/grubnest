'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemCard from '@/app/components/ItemCard';
import SelectCategory from '@/app/components/SelectCategory';
import { useRouter } from 'next/navigation';

type Item = {
  _id: string;
  name: string;
  image: string;
  cost: number;
  type: string;
};

export default function Products() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/products?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [query]);
  

  return (
    <div className="flex mt-32 mx-auto w-[900px]">
      <hr className="border-t-2 left-75 absolute top-42 border-gray-200 w-[900px]" />
      <div className='flex w-1/3'>

      </div>
      <div className="w-2/3">
        <h1 className="font-semibold text-lg">Search Results for: {query}</h1>
        <div className="flex flex-wrap">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="w-1/3" key={item._id}>
                <ItemCard name={item.name} img={item.image} cost={item.cost} itemId={item._id} />
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}
