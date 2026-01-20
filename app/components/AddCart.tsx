'use client'
import { useRef,useEffect,useState } from "react"

export default function AddCart({id,Inquantity,bg,cl}:{id:string,Inquantity:number,bg:string,cl:string}){
    const [quantity,setQuantity] = useState<number>(Inquantity);
    const firstRender = useRef(true)
    useEffect(()=>{
        if(firstRender.current){
            firstRender.current = false
            return;
        }
        const addItem = async()=>{
            const response = await fetch('/api/cart',{
                method:'POST',
                headers:{
                    'Content-Type':"Application/json",
                },
                body:JSON.stringify({id,quantity})  
            })
            if(!response){
                console.error("Not able to get a response from the api")
            }
        }
        addItem()
    },[quantity])
     function AddtoCart(symbol:string|null){
        if(!symbol){
            if(quantity==0){
            setQuantity(prev=>prev+1)
        }
        }else{
            if(symbol=='+' && quantity>=0){
                setQuantity(prev=>prev+1)
            }
            else if(symbol=='-' && quantity>0){
                setQuantity(prev=>prev-1)
            }else{
                return
            }
        }
        
    }
    return(
        <div>
            {quantity===0 && <div onClick={()=>AddtoCart(null)} style={{color:cl,backgroundColor:bg}} className=" flex items-center justify-center w-[90px] h-[25px]  sm:w-[120px] h-[30px] md:w-[190px] md:h-[35px] rounded-md">
                <span style={{color:cl}} className="inline-block text-xs font-bold text-white  sm:pr-1 ">ADD TO CART</span>
                       <svg className="h-[16px] w-[16px]"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                            >
                                <g id="handbag">
                                <path
                                    d="M3.41 7.23H20.59v12a3.23 3.23 0 0 1-3.23 3.23H6.64a3.23 3.23 0 0 1-3.23-3.23v-12Z"
                                    stroke={`green`}
                                    strokeWidth="2.21"
                                    strokeMiterlimit="10"
                                    fill="none"
                                />
                                <path
                                    d="M8.18 10.09V5.32A3.82 3.82 0 0 1 12 1.5a3.82 3.82 0 0 1 3.82 3.82v4.77"
                                    stroke={`green`}
                                    strokeWidth="1.91"
                                    strokeMiterlimit="10"
                                    fill="none"
                                />
                                </g>
                        </svg>
            </div> }
            {quantity > 0 && <div style={{backgroundColor:`${bg}`}} className="flex font-bold items-center text-md px-2  w-[190px] h-[35px] justify-between  rounded-md">
                <div className="text-white w-[20px] scale-x-150 pl-1 text-lg h-[30px]" onClick={()=>AddtoCart('-')}>-</div>
                <div className="bg-white inline-flex items-center justify-center h-[30px] w-[65px] rounded font-semibold">{quantity}</div>
                <div className='text-white w-[20px] pl-1 text-lg h-[30px]' onClick={()=>AddtoCart('+')}>+</div>
            </div> }
        </div>
    )
}