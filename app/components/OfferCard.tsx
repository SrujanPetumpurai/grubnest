import './Offer.css'
export default function OfferCard({Offer,type,image,bgColor,btnColor,txtColor,btnTxtColor}:{Offer:string,type:string,image:string,bgColor:string,btnColor:string,txtColor:string,btnTxtColor:string}){
    return(
        <div className='flex justify-between w-[280px] h-[130px] rounded-xl' style={{backgroundColor:bgColor}}>
            <div className="m-5 flex flex-col ">
                <span className='text-green-500 text-xs font-bold' style={{color:txtColor}}>{Offer}</span>
                <span className='text-sm font-semibold mt-1'>{type}</span>
                <button className='rounded w-[60px] h-[20px] py-1 text-xs mt-5' style={{backgroundColor:btnColor,color:btnTxtColor}}>Shop  Now</button>
            </div>
            <div className='m-5 w-[80px] h-[70px]'>
                <img src={image} alt="" />
            </div>
        </div>
    )
}