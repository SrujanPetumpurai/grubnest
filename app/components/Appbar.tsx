'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import GetLocation from '@/app/components/GetLocation'
import Profile from './Profile';
import Link from 'next/link';
type item = {
  name:string;
  cost:number;
  type:string;
  img:string;
}
export default function AppBar() {
  const {data:session} = useSession();
  const name = session?.user.name || ''
  const [open,setOpen] = useState<boolean>(false);
  return (
    <div className="w-full lg:w-[1200px] mx-auto sticky top-0 z-50 opacity-100 h-14 lg:h-20 mt-2 bg-white text-black flex items-center justify-between border-b shadow-sm px-2 lg:px-6 gap-2">
        <div className="md:h-20 md:w-20 h-12 w-14 lg:h-26 lg:w-26 pt-4">
                    <img src="/logo.png" className='w-full h-[80%]' alt="" />
        </div>

        <div className="sm:block  md:block">
          <CategoryDropdown></CategoryDropdown>
        </div>

        <div className='flex w-[380px] sm:w-[450px] lg:w-[500px] items-center h-[25px]'>
          <SearchBar></SearchBar>
        </div>
        
        <div className="hidden md:block">
          <GetLocation></GetLocation>
        </div>

        <div className="hidden md:block">
          <Signin></Signin>
        </div>
        <div className='inline-block md:hidden'>
          <span onClick={()=>setOpen(prev=>!prev)}> ☰</span>
          {open && (
              <ul className={`flex flex-col items-start w-[40px] transition-all duration-200 ease-in-out absolute z-5 top-10 right-2 bg-gray-300 border border-black rounded-lg ${open?'opacity-100 scale-100':'opacity-0 scale-95 pointer-events-none'}`}>
                <li>
                <Profile name={name}></Profile>
                </li>
                <li><GetLocation></GetLocation></li>
                <li><Cart></Cart></li>
              </ul>
          )
          }
        </div>
        <div className='hidden md:inline-block'> 
        <Cart></Cart>
        </div>
  </div>

  );
}
function Cart(){
  return(
   <Link href={'/cart'}>
    <div  className='md:inline-block w-8 h-8 lg:w-[35px] lg:h-[35px] hover:bg-gray-200 rounded-lg'>
          <svg className='w-7 h-7'
            fill="#000000"
            viewBox="0 0 902.86 902.86"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path>
              <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path>
            </g>
          </svg>
        </div>
    </Link>
  )
}
function Signin() {
  const { data: session,status } = useSession();
  const router = useRouter()
  const name = session?.user.name || ''
  if(status=='loading') return null
  if (session)
    return (
      <div className='flex items-top'>
        <div><Profile name={name}></Profile></div>
      </div>
    );

  return (
    <div className='flex'>
      <button onClick={() => signIn()} className="px-3 py-1 border rounded-lg hover:bg-gray-200">
        Sign in
      </button>
      <button onClick={()=>router.push('/signup')} className='ml-1 px-3 py-1 border rounded-lg hover:bg-gray-200'>
        Singup
      </button>
    </div>  
  );
}