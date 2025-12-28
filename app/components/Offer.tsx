import Btn from "./Btn";
export default function Offer({text,bgColor,img,btnBgColor}:{btnBgColor:string,text:string,bgColor:string,img:string}){
    return(
        <div className='flex  rounded-xl h-[280px] w-[33vw] px-6 pt-4 pb-2 ' style={{backgroundColor:bgColor}}>
            <div className="h-full pt-14  text-2xl font-bold text-teal-900 w-[45%]">
                <span>
                {text}
                </span>
                <span className="inline-block mt-4">
                <Btn svgColor="white" textColor="white" bgColor={btnBgColor} text='Shop Now'></Btn>
                </span>
            </div> 
            <img className="w-[55%] h-full" src={`${img}`} alt="" />
        </div>
    )
}