'use client';
import { useSession, signOut, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import GetLocation from '@/app/components/GetLocation'
import Profile from './Profile';
type item = {
  name:string;
  cost:number;
  type:string;
  img:string;
}
export default function AppBar() {
  const router = useRouter();
  
  return (
    <div className="w-[1200px] mx-auto sticky top-0 z-50 opacity-100  h-20 mt-2 bg-white text-black flex items-center justify-between  border-b shadow-sm px-6">
      <div className="h-26 mt-10 w-26">
        <Image  alt='logo of the company(eggsy)' width={104} height={104} src='/logo.png' />
      </div>
      <div>
        <CategoryDropdown></CategoryDropdown>
      </div>
       <div className='w-[500px] flex items-center h-[25px]'>
                    <SearchBar></SearchBar>
       </div>
       
        <div>
          <GetLocation></GetLocation>
        </div>
        <div>
          <Signin></Signin>
        </div>
        <div onClick={()=>router.push('/cart')} className='w-[35px] h-[35px]'>
                 <svg className='w-full h-full'
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
    </div>
  );
}

function Signin() {
  const { data: session,status } = useSession();
  const router = useRouter()
  if(status=='loading') return null
  if (session)
    return (
      <button>
        <Profile></Profile>
      </button>
    );

  return (
    <div className='flex'>
      <button onClick={() => signIn()} className="px-3 py-1 border rounded">
        Sign in
      </button>
      <button onClick={()=>router.push('/signup')}>
        Singup
      </button>
    </div>
  );
}