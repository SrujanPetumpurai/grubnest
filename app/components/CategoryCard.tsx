import { StaticImageData } from "next/image";

export default function CategoryCard({name,img,bgColor}:{bgColor:string,name:string,img:string | StaticImageData}){
return(
      <div className="flex w-[135px] h-[200px] flex-col">
         <div className="w-full h-[130px] rounded-xl w-full" style={{backgroundColor:bgColor}}>
            <img className="w-full h-full" src={`${img}`} alt="" />
         </div>
         <div className="w-full h-[30px] text-teal-900 font-semibold">
            {name}
         </div>
      </div>
)
}