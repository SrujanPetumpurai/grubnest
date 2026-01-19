import Btn from "./Btn"
import FreeDelivery from "./FreeDeliveryIcon";
export default function Hero(){
    return (
            <div
                className="w-full lg:w-[1200px] mt-6 mx-auto h-auto lg:h-[420px] rounded-2xl relative overflow-hidden flex flex-col lg:flex-row items-center"
                style={{ backgroundImage: "url('/foodbackground1.jpg')" }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-[#810D17]/90" />

                {/* left */}
                <div className="w-full lg:w-1/2 px-6 lg:px-16 relative z-10 text-white text-center lg:text-left">
                <FreeDelivery></FreeDelivery>
                <h1 className="text-3xl lg:text-5xl leading-tight font-bold font-body">
                    We deliver <span className="text-orange-400">groceries</span><br />
                    to your doorstep
                </h1>

                <p className="mt-5 text-sm lg:text-md text-white/80">
                    Get freshest groceries delivered right to your home. Save time, skip the lines, and enjoy the convenience of quick, efficient delivery.
                </p>

                <div className="mt-6 lg:mt-8">
                    <Btn
                    svgColor="white"
                    text="Shop Now"
                    textColor="white"
                    bgColor="orange"
                    />
                </div>
                </div>

                {/* right */}
                <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end items-end pr-0 lg:pr-10 mt-8 lg:mt-0">
                <img
                    src="/man_with_vegetables.png"
                    alt=""
                    className="h-[280px] lg:h-[460px] drop-shadow-2xl translate-y-0 lg:translate-y-17"
                />
                </div>
</div>

            );

}