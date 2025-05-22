'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CartItem from '@/app/components/cartItem';
  export default function Cart() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<any>(null);
  const [fullCart,setFullCart]=useState<any>(null);

  
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/cart`)
        .then((res) => res.json())
        .then((data) =>{ 
          setCart(data.items)
          setFullCart(data.cart)
        }
          
        )
        .catch((err) => console.error('Error fetching cart:', err));
    }
  }, [session]);

  if (!session) return <p>Please log in to view your cart.</p>;
  if (!cart) return <p>Loading cart...</p>;
  const completePrice = fullCart.totalPrice +8.90+30;
  const totalItems = cart.length;

  return (
    <div>
      {cart.length === 0 ? (
        <p >Your cart is empty.</p>
      ) : (<div className='flex mt-4 mx-auto flex-col rounded-xl bg-gray-100 w-[1000px] h-[600px]'>
        <h1 className='text-center mt-4 text-lg font-semibold self-start ml-6'>Review your Order</h1>
            <div className='mt-4 bg-white mx-5 rounded-xl'>
              <div className='text-end mr-6 text-sm text-gray-500 font-semibold mt-4 '>{totalItems}     item</div>
              <hr className="border-t-2 border-dotted border-gray-200 mt-2 w-[930px] mx-auto" />

        <ul>

         {cart.map((item:any,idx:number)=>(
          <li> 
            <CartItem key={idx} name={item.name} itemId={item.itemId} quantity={item.quantity} img={item.image} price={item.cost}></CartItem>
             </li>
         ))}
        </ul>
         </div>
         <h2 className='ml-4 mt-5'>Bill Details</h2>
         <div className='flex flex-col mt-2 mx-5 w-[96%] h-[250px]  bg-white rounded-xl text-gray-500'>
          <div className='flex justify-between mx-4'>
            <div>
              <h1>Item Total</h1>
              <div className='underline decoration-dashed decoration-1 underline-offset-4'>Handling fee</div>
            </div>
            <div>
              <h1>${fullCart.totalPrice}</h1>
              <div>$8.90</div>
            </div>
          </div>
          <hr className="border-t-2 border-dotted border-gray-200 my-2 w-[930px] mx-auto" />
          <div className='flex justify-between mx-4'>
            <div>Delivery Tip</div>
            <div className='text-red-500'>Add a tip</div>
          </div>
          <hr className="border-t-2 border-dotted border-gray-200 my-2 w-[930px] mx-auto" />

          <div className='flex justify-between mx-4'>
            <div className='flex flex-col'>
            <div className="underline decoration-dashed decoration-1 underline-offset-4 mb-1">Delivery fee</div>
            <div className='text-sm mb-2'>Pay only $16.0 as Delivery fee by ordering above 199.0</div>
               <div className='underline decoration-dashed decoration-1 underline-offset-4 mb-2'>GST and Charges</div>
            </div>
            <div className='flex flex-col justify-between'>
              <div>$30 </div>
              <div className='mb-2'>$1.60</div>
               </div>
          </div>
          <hr className="border-t-2 border-dotted border-gray-200 my-2 w-[930px] mx-auto" />

          <div className='flex justify-between mx-4'>
            <div className='font-bold '>To Pay</div>
            <div className='font-bold '>${completePrice}</div>
          </div>
         </div>
        </div>
      )}
      <div  className='fixed w-[900px] bg-green-600 text-lg text-center pt-3 rounded-xl text-white h-[55px] bottom-4 mx-auto left-1/2 -translate-x-1/2'>
        Proceed to Pay
      </div>
    </div>
  );
}
