'use client';
import {useSession} from 'next-auth/react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderSummary from '@/app/components/OrderSummary';
  type User ={
    name:string,
    email:string,
    surname:string,
    phNumber:number,
    address:{
      houseNo:string,
    street:string,
    landmark:string,
    city:string,
    state:string,
    zipcode:string,
    deliveryInstruction:string
    }
    
  }
export default function Checkout() {
  const [user,setUser] = useState<User>()
  const router = useRouter();
  const {data:session,status} = useSession();
  useEffect(() => {
  if (status === 'unauthenticated') {
    router.push('/signup');
  }
    }, [status, router]);
    if (status === 'loading') return null;

   useEffect(()=>{
    async function getUserDetails(){
      const response = await fetch('/api/user')
      const data = await response.json()
      setUser(data)
    }
    getUserDetails();
  },[])
  async function saveAddress(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form = e.currentTarget 
    const data = new FormData(form);
    await fetch('/api/user',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({
          houseNo: data.get('houseNo'),
          street: data.get('street'),
          landmark: data.get('landmark'),
          city: data.get('city'),
          state: data.get('state'),
          phNumber: data.get('phNumber'),
          zipcode:data.get('zipcode'),
          deliveryInstruction:data.get('instruction')
        })
    })
  }
  
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="mx-30 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <p className="text-sm text-gray-500 mb-4">Cart  &gt;  Shipping  &gt;  Payment</p>

          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form onSubmit={saveAddress}>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" readOnly className="input" defaultValue={user?.name ?? ''} />
              <input name="surname" readOnly className="input" defaultValue={user?.surname ?? ''} />
              <input name="email" readOnly className="input col-span-2" defaultValue={user?.email ?? ''} />
              <input name="phNumber" className="input col-span-2" defaultValue={user?.phNumber?.toString() ?? ''} />
              <input name="houseNo" className="input"  defaultValue={user?.address?.houseNo??''} />
              <input name="street" className="input" defaultValue={user?.address?.street??''} />
              <input name="landmark" className="input col-span-2" defaultValue={user?.address?.landmark??''} />
              <input name="city" className="input" defaultValue={user?.address?.city ?? ''} />
              <input name="state" className="input" defaultValue={user?.address?.state ?? ''} />
              <input name="zipcode" className="input" defaultValue={user?.address?.zipcode ?? ''} />
              <textarea name="instruction" className="input col-span-2" defaultValue={user?.address?.deliveryInstruction??''}/>
            </div>
            <button className='bg-black rounded-lg hover:bg-gray-800' type='submit'>Save Adress</button>
          </form>
          <h2 className="text-xl font-semibold mt-8 mb-4">Shipping Method</h2>

          <div className="grid grid-cols-2 gap-4">
            <label className="border rounded-lg p-4 flex justify-between cursor-pointer">
              <div>
                <input type="radio" name="ship" defaultChecked />
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-500">4hrs</p>
              </div>
              <p className="font-semibold">Rs 0</p>
            </label>

            <label className="border rounded-lg p-4 flex justify-between cursor-pointer">
              <div>
                <input type="radio" name="ship" />
                <p className="font-medium">Express Shipping</p>
                <p className="text-sm text-gray-500">1hr</p>
              </div>
              <p className="font-semibold">Rs 9</p>
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border w-[450px] h-fit">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <OrderSummary ctaText='payment'></OrderSummary>
        </div>
      </div>

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 6px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
