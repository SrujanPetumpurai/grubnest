    'use client'
    import { useEffect,useState } from "react"
    import { Item } from "../(dashboard)/cart/page";
    import { useRouter } from "next/navigation";

    export default function OrderSummary({ctaText,payment}:{ctaText:string,payment:boolean}){
        const router = useRouter();
        const [items,setItems] = useState<Item[]>([]);
        const [subTotal,setSubTotal] = useState(0);
        const [discount,setDiscount] = useState<number>(0);
        const [total,setTotal] = useState<number>(0);
        async function handleCheckout(e:any){
            e.preventDefault();
            if(!payment) {
                return router.push('/checkout')
            }
            const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }) 
        });
            if (!res.ok) {
            const text = await res.text();
            console.error("API ERROR:", text);
            return;
            }

            const data = await res.json();
        const options = {
                            key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
                            amount: data.amount, 
                            currency: "INR",
                            order_id: data.razorpayOrderId,
                            name: "Grubnest",
                            handler: function (response: any) {
                            console.log(response);
                            }
                            };
            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                console.error(response.error);
                });
            rzp.open();
        }
        useEffect(()=>{
            const totalCart = async()=>{
                const res = await fetch('/api/cart',{ 
                    method:"GET"
                })
                const body = await res.json();
                if(!res.ok){
                    console.log(body.message)
                    return
                }
                setItems(body.items)
            } 
            totalCart()
        },[])
        useEffect(()=>{
            if(!items.length)return;
            if(!items)return console.log("no items")
                const sub = items.reduce((sum,item)=>sum+((item.cost)*(item.quantity||1)),0)
                setSubTotal(sub)
                const totDiscount = items.reduce((sum,item)=>{
                    if(!item.discount) return sum
                    return sum+((parseFloat(item.discount)*item.cost)/100)*(item.quantity||1)},0)
                    setDiscount(totDiscount)
                const tot = (sub - totDiscount)
                setTotal(tot)

        },[items])
        return(
            <div className="w-[400px] mt-16 h-[350px] border py-4 px-4 rounded-xl">
                <h1 className="font-bold w-full mb-4  text-xl">Order Summary</h1>
                <div className="flex w-full flex-col">
                    <div className="flex font-light pb-3 justify-between">
                        <span className="inline-block">Subtotal</span>
                        <span className="inline-block font-bold">Rs {subTotal}</span>
                    </div>
                    <div className="flex justify-between pb-3 font-light">
                        <span className="inline-block">Discount (-20%)</span>
                        <span className="inline-block font-bold text-red-500">-Rs {discount}</span>
                    </div>
                    <div className="flex border-b justify-between pb-3 font-light">
                        <span className="inline-block">Delivery Fee</span>
                        <span className="inline-block font-bold">Rs 15</span>
                    </div>
                    <div className="flex  mt-4 justify-between font-semibold">
                        <span className="inline-block">Total</span>
                        <span className="inline-block font-bold">Rs {total}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="flex items-center border w-[250px] rounded-full bg-white px-3 py-2">
                            <span className="flex items-center">
                                <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                >
                                <path
                                    d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                                    stroke="#7f7f7fff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Add promo code"
                                className="ml-2 flex-1 outline-none bg-transparent text-sm"
                            />
                            </div>
                        <button className="text-white text-sm w-[100px] bg-black py-1 px-2 rounded-xl ">Apply</button>
                    </div>
                    <button className="flex mx-auto gap-1 items-center justify-center mt-4 bg-black h-[45px] text-md text-white w-[350px] rounded-full">
                        
                        <span className="pb-2" onClick={(e)=>handleCheckout(e)}>Continue to {ctaText}</span>
                        <span>
                            <svg    
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#ffffff"
                            className="w-6 h-6"
                            >
                            <path
                                d="M6 12H18M18 12L13 7M18 12L13 17"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        )
    }