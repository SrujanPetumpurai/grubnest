'use client';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import logo from '@/public/logo.png';

type item = {
  name:string;
  cost:number;
  type:string;
  img:string;
}
export default function AppBar() {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<item[]>([]);
  const router = useRouter();

  const handleSearch = async (value:string) => {
    setQuery(value);
    if (value.trim()) {
      const response = await fetch(`/api/search?query=${value}`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };
  const handleClick = (selection:string)=>{
    router.push(`/Products?query=${selection}`)
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/Products?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 opacity-100  h-20 mt-2 bg-white text-black flex items-center justify-between  border-b shadow-md px-6">
      <div className="h-26 mt-10 w-26">
        <Image alt='logo of the company(eggsy)' src={logo} />
      </div>
      
      <form onSubmit={handleSubmit} className="relative w-[50%] flex items-center">
        
        <input
          type="text"
          placeholder="Search for products or categories..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100">
                {item.name} ({item.type})
              </li>
            ))}
          </ul>
        )}
        
       
      </form>

      <div className='flex flex-row w-[130px] justify-between'>
        <div className='w-8 h-8'>
          <Link href={'/cart'}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </Link>
        </div>
        {session ? (
          <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-500 px-4 py-2 rounded">Sign In</button>
        )}
      </div>
    </div>
  );
}
