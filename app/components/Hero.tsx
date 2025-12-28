import Btn from "./Btn"
export default function Hero(){
    return(
        <div className="w-[1200px] mx-auto h-[500px] rounded-xl  flex relative items-center justify-center bg-contain" style={{background:"url('/foodbackground1.jpg')"}}>
            <div className="absolute rounded-4xl inset-0 bg-teal-900/90"/>
            <div className="w-1/2 h-full relative z-10"><img className="w-full px-16 h-full" src="/man.png" alt="" /></div>
            <div className="w-1/2 h-full pr-44 pt-32 relative z-10 text-white">
                <h1 className="text-5xl font-bold ">Don't Miss Out On Tasty Grocery Deals!</h1>
                <p className="mt-4 text-xl mb-8">Save up to 50% off on your first buy</p>
                <Btn svgColor="teal" text="Shop Now" textColor="teal" bgColor="white"></Btn>
            </div>
        </div>

    )
}