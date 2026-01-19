import Btn from "./Btn"
import './DeliveryBanner.css'
export default function DeliveryBanner(){
    return(
       <div className="flex flex-col md:flex-row relative mt-8 bg-[url(/delivery_bg.jpg)] rounded-3xl z-5 w-[1200px] max-w-[95vw] mx-auto h-auto md:h-100">
        <div className="absolute inset-0 bg-[#0F172A] z-0 rounded-3xl opacity-[0.6]"></div>
          <div className='pt-12 md:pt-24 w-full md:w-[60%] text-white pr-6 md:pr-16 pl-6 md:pl-26'>
            <h2 className="text-2xl md:text-4xl leading-tight md:leading-12 relative font-bold">Get 100% Free Delivery Upto 5km with a Subscription!</h2>
            <p className="text-base md:text-xl pb-6 md:pb-8 pt-2 relative font-light">On all groccery shoping.</p>
            <button className="py-2 transition-all duration-200 ease hover:-translate-y-1 relative bg-gray-800 px-3 text-white z-12 rounded-xl">Get subscription →</button>
          </div>
          <div className="w-full md:w-[40%] flex justify-center md:justify-end">
            <img className="pr-0 md:pr-16 relative w-[70%] md:w-auto" src="/DeliveryBoy.png" alt="" />
          </div>
       </div>
    )
}