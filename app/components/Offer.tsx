import Btn from "./Btn";
export default function Offer({text,bgColor,img,btnBgColor,bgImg}:{bgImg:string,btnBgColor:string,text:string,bgColor:string,img:string}){
    return(
        <div className='flex relative bg-contain bg-no-repeat rounded-xl h-[280px] w-[33vw] sm:w-[45vw] md:w-[33vw] px-4 sm:px-6 pt-4 pb-2' style={{backgroundImage:`url(${bgImg})`}}>
            <div style={{backgroundColor:`${bgColor}`}} className="absolute rounded-xl inset-0 z-2 opacity-[0.8]"></div>
            <div className="h-full z-5 pt-10 sm:pt-14 text-lg sm:text-2xl font-bold text-teal-900 w-[55%] sm:w-[45%]">
                <span>
                {text}
                </span>
                <span className="inline-block mt-3 sm:mt-4">
                <Btn svgColor="white" textColor="white" bgColor={btnBgColor} text='Shop Now'></Btn>
                </span>
            </div> 
            <img className="w-[45%] sm:w-[55%] z-5 h-full object-contain" src={`${img}`} alt="" />
        </div>
    )
}