import Btn from "./Btn"
import './DeliveryBanner.css'
export default function DeliveryBanner(){
    return(
       <div className="flex relative mt-8 z-10 w-[1200px] mx-auto h-100  ">
        <div className="absolute inset-0 bump-clamp  bg-darkRed z-0"></div>
          <div className='pt-24  w-[60%]  text-white pr-16 pl-26'>
            <h2 className="text-4xl leading-12 relative font-bold">We ship on the following day from 10:00 AM to 08:00 PM</h2>
            <p className="text-xl pb-8 pt-2 relative font-light">For Purchases over 100 Rs</p>
            <Btn svgColor="red" textColor="red" text="Order Now" bgColor="white"></Btn>
          </div>
          <div className="w-[40%]">
            <img className="pr-16 relative " src="/DeliveryBoy.png" alt="" />
          </div>
       </div>
    )
}