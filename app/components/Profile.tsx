'use client'
import { useState,useRef,useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Profile() {
  const ref = useRef<HTMLDivElement|null>(null)  
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    function handleClickOutside(e:any){
      if(!ref.current) return null
      if(!ref.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])
  return (
    <div ref={ref} className="relative inline-block text-left">
      <button onClick={() => setOpen(o => !o)}>
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
        >
            <g clipPath="url(#clip0)">
            <path
                d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z"
                fill="currentColor"
            />
            </g>
            <defs>
            <clipPath id="clip0">
                <rect width="24" height="24" />
            </clipPath  >
            </defs>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-md">
          <ul className="py-1 text-sm text-gray-700">
            <li onClick={()=>router.push('/profile')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>
            <li onClick={()=>router.push('/cart')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cart</li>
            <li onClick={()=>router.push('/orders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Order History</li>
            <li onClick={()=>window.scrollTo({
              top:document.body.scrollHeight,
              behavior:'smooth'
            })} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact Us</li>
            <li>
              <button
                onClick={()=>signOut()}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}


